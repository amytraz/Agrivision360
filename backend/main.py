import os
import time
import logging
import functools
import numpy as np
from pathlib import Path
from tqdm.notebook import tqdm
from IPython.display import clear_output  

import absl.logging

absl.logging.set_verbosity(absl.logging.ERROR)

# Monkey-patch JAX internal flag if missing.
try:
    import jax._src.config as jax_config  # type: ignore

    if not hasattr(jax_config, "enable_memories"):
        # Create a dummy flag with value False
        class DummyFlag:
            value = False

        jax_config.enable_memories = DummyFlag()
except ImportError:
    pass

# Import JAX and related libraries
import jax
import jax.numpy as jnp
import flax.linen as nn
from flax.training import train_state, checkpoints
from flax import struct  # for custom TrainState
import optax
import tensorflow as tf

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

from fastapi import FastAPI, File, UploadFile, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
from typing import List


app = FastAPI()

# Enable CORS (Cross-Origin Resource Sharing)
origins = [
    # "http://localhost:5173",  # Your React app's development URL
    "http://localhost:8080",  # Your backend url
    # Add other origins if needed (e.g., productionURL)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ... (Your existing Python code: setup_hardware, TrainStateWithBN, TurboDataLoader, FastVisionModel, SpeedTrainer, TrainingProgress, TurboPipeline, ModelInference) ...
# ... (Copy all your existing code here) ...


def setup_hardware():
    try:
        # First try GPU
        gpu_devices = jax.devices('gpu')
        if gpu_devices:
            logger.info(f"Found {len(gpu_devices)} GPU device(s): {gpu_devices}")
            tf.config.experimental.set_visible_devices([], 'GPU')
        else:
            raise RuntimeError("No GPU found")
    except RuntimeError:
        # Fall back to CPU
        logger.warning("No GPU detected. Falling back to CPU.")
        jax.config.update('jax_platform_name', 'cpu')
    
    jax.config.update("jax_enable_x64", True)
    jax.config.update("jax_default_matmul_precision", "float32")  # Changed to float32 for CPU
    devices_info = jax.devices()
    logger.info(f"JAX using devices: {devices_info}")
    return devices_info


# ------------------------------
# Custom TrainState including BatchNorm statistics
# ------------------------------
@struct.dataclass
class TrainStateWithBN(train_state.TrainState):
    batch_stats: dict


# ------------------------------
# Optimized Dataset Pipeline
# ------------------------------
class TurboDataLoader:
    def __init__(self, data_dir, img_size=128, batch_size=64, val_split=0.2, augment=True):
        self.data_dir = Path(data_dir)
        self.img_size = img_size
        self.batch_size = batch_size
        self.val_split = val_split
        self.augment = augment

        if not self.data_dir.exists():
            raise FileNotFoundError(f"Dataset not found: {self.data_dir}")

        logger.info(f"Loading dataset from: {self.data_dir}")
        self._print_dataset_structure()

    def _print_dataset_structure(self):
        class_dirs = [d for d in self.data_dir.iterdir() if d.is_dir()]
        logger.info(f"Found {len(class_dirs)} classes:")
        for class_dir in class_dirs:
            count = len(list(class_dir.glob('*')))
            logger.info(f"  - {class_dir.name}: {count} images")

    def _augmentation_layers(self):
        return tf.keras.Sequential([
            tf.keras.layers.RandomFlip("horizontal"),
            tf.keras.layers.RandomRotation(0.1),
            tf.keras.layers.RandomZoom(0.1),
            tf.keras.layers.RandomContrast(0.1),
        ])

    def _load_dataset(self, subset):
        return tf.keras.utils.image_dataset_from_directory(
            self.data_dir,
            validation_split=self.val_split,
            subset=subset,
            seed=42,
            image_size=(self.img_size, self.img_size),
            batch_size=self.batch_size,
            shuffle=(subset == "training"),
            label_mode='int'
        )

    def _preprocess(self, ds, is_training=True):
        normalize_layer = lambda x, y: (tf.cast(x, tf.float32) / 255.0, y)
        if is_training and self.augment:
            aug_layer = self._augmentation_layers()
            preprocess_fn = lambda x, y: normalize_layer(aug_layer(x, training=True), y)
        else:
            preprocess_fn = normalize_layer

        return ds.map(preprocess_fn, num_parallel_calls=tf.data.AUTOTUNE
                      ).prefetch(buffer_size=tf.data.AUTOTUNE).cache()

    def load(self):
        train_ds = self._load_dataset("training")
        val_ds = self._load_dataset("validation")
        logger.info(f"Training batches: {tf.data.experimental.cardinality(train_ds)}")
        logger.info(f"Validation batches: {tf.data.experimental.cardinality(val_ds)}")
        return (
            self._preprocess(train_ds, is_training=True),
            self._preprocess(val_ds, is_training=False),
            train_ds.class_names
        )


# ------------------------------
# Improved CNN Model with BatchNorm and Dropout
# ------------------------------
class FastVisionModel(nn.Module):
    num_classes: int
    dropout_rate: float = 0.2

    @nn.compact
    def __call__(self, x, training=True):
        # Normalize input to [-1, 1]
        x = (x - 0.5) * 2.0

        # Stem block
        x = nn.Conv(32, (3, 3), strides=2, padding='SAME')(x)
        x = nn.relu(x)
        x = nn.BatchNorm(use_running_average=not training)(x)

        # Main blocks with residual connections
        for filters in [64, 128, 256]:
            residual = x
            x = self._ds_block(x, filters, training)
            if residual.shape[-1] == x.shape[-1] and residual.shape[1:3] == x.shape[1:3]:
                x = x + residual

        # Global pooling and classification head
        x = jnp.mean(x, axis=(1, 2))
        if training:
            x = nn.Dropout(rate=self.dropout_rate)(x, deterministic=not training)
        x = nn.Dense(features=512)(x)
        x = nn.relu(x)
        if training:
            x = nn.Dropout(rate=self.dropout_rate)(x, deterministic=not training)
        x = nn.Dense(features=self.num_classes)(x)
        return x

    def _ds_block(self, x, filters, training):
        x = nn.Conv(features=x.shape[-1], kernel_size=(3, 3),
                    feature_group_count=x.shape[-1], padding='SAME')(x)
        x = nn.Conv(features=filters, kernel_size=(1, 1), padding='SAME')(x)
        x = nn.relu(x)
        x = nn.BatchNorm(use_running_average=not training)(x)
        x = nn.max_pool(x, window_shape=(2, 2), strides=(2, 2), padding='SAME')
        return x


# ------------------------------
# Optimized Trainer with Learning Rate Scheduling and BatchNorm/Dropout handling
# ------------------------------
class SpeedTrainer:
    def __init__(self, num_classes, lr=1e-3, weight_decay=1e-4, dropout_rate=0.2):
        self.num_classes = num_classes
        self.model = FastVisionModel(num_classes=num_classes, dropout_rate=dropout_rate)
        self.lr = lr
        self.weight_decay = weight_decay

    def create_state(self, rng, input_shape=(1, 128, 128, 3)):
        # Initialize model variables; extract both parameters and batch_stats.
        variables = self.model.init(rng, jnp.ones(input_shape))
        params = variables['params']
        batch_stats = variables.get('batch_stats', {})

        def lr_schedule(step):
            warmup_steps = 100
            decay_steps = 5000
            warmup_factor = jnp.minimum(1.0, step / warmup_steps)
            decay_factor = 0.5 * (1 + jnp.cos(jnp.pi * jnp.minimum(step - warmup_steps, decay_steps) / decay_steps))
            return self.lr * warmup_factor * decay_factor

        tx = optax.chain(
            optax.clip_by_global_norm(1.0),
            optax.adamw(learning_rate=lr_schedule, weight_decay=self.weight_decay)
        )

        return TrainStateWithBN.create(
            apply_fn=self.model.apply,
            params=params,
            tx=tx,
            batch_stats=batch_stats
        )

    @staticmethod
    def cross_entropy_loss(logits, labels):
        one_hot = jax.nn.one_hot(labels, logits.shape[-1])
        loss = optax.softmax_cross_entropy(logits=logits, labels=one_hot)
        return loss.mean()

    @functools.partial(jax.jit, static_argnums=(0,))
    def train_step(self, state, batch, dropout_rng):
        images, labels = batch

        def loss_fn(params):
            # Include batch_stats in variables for BatchNorm and pass dropout rng for Dropout.
            variables = {'params': params, 'batch_stats': state.batch_stats}
            (logits, new_model_state) = self.model.apply(
                variables, images, training=True, mutable=['batch_stats'], rngs={'dropout': dropout_rng}
            )
            loss = SpeedTrainer.cross_entropy_loss(logits, labels)
            return loss, (logits, new_model_state)

        (loss, (logits, new_model_state)), grads = jax.value_and_grad(loss_fn, has_aux=True)(state.params)
        state = state.apply_gradients(grads=grads)
        # Update batch_stats with the new values
        state = state.replace(batch_stats=new_model_state['batch_stats'])
        preds = jnp.argmax(logits, axis=-1)
        acc = jnp.mean(preds == labels)
        return state, {'loss': loss, 'acc': acc}

    @functools.partial(jax.jit, static_argnums=(0,))
    def eval_step(self, state, batch):
        images, labels = batch
        variables = {'params': state.params, 'batch_stats': state.batch_stats}
        logits = self.model.apply(variables, images, training=False, mutable=False)
        loss = SpeedTrainer.cross_entropy_loss(logits, labels)
        preds = jnp.argmax(logits, axis=-1)
        acc = jnp.mean(preds == labels)
        return {'loss': loss, 'acc': acc}


# ------------------------------
# Enhanced Progress Tracking with Visualization
# ------------------------------
class TrainingProgress:
    def __init__(self, total_epochs):
        self.total_epochs = total_epochs
        self.epoch_bar = tqdm(total=total_epochs, desc="Training Progress", position=0)
        self.batch_bar = tqdm(desc="Current Batch Progress", position=1, leave=False)
        self.metrics_bar = tqdm(desc="Epoch Metrics", position=2, leave=False, bar_format='{desc}')
        self.history = {
            'train_loss': [],
            'train_acc': [],
            'val_loss': [],
            'val_acc': []
        }

    def update_epoch(self):
        self.epoch_bar.update(1)
        self.epoch_bar.refresh()

    def update_batch(self, metrics, phase="train"):
        self.batch_bar.set_description_str(
            f"{phase.capitalize()} Batch - Loss: {metrics['loss']:.4f} | Acc: {metrics['acc']:.4f}"
        )
        self.batch_bar.refresh()

    def update_metrics(self, train_metrics, val_metrics):
        train_loss = np.mean([m['loss'] for m in train_metrics])
        train_acc = np.mean([m['acc'] for m in train_metrics])
        val_loss = np.mean([m['loss'] for m in val_metrics])
        val_acc = np.mean([m['acc'] for m in val_metrics])
        self.metrics_bar.set_description_str(
            f"Epoch Metrics - Train Loss: {train_loss:.4f} | Train Acc: {train_acc:.4f} | "
            f"Val Loss: {val_loss:.4f} | Val Acc: {val_acc:.4f}"
        )
        self.metrics_bar.refresh()
        self.history['train_loss'].append(train_loss)
        self.history['train_acc'].append(train_acc)
        self.history['val_loss'].append(val_loss)
        self.history['val_acc'].append(val_acc)
        return train_acc, val_acc, train_loss, val_loss

    def close(self):
        self.epoch_bar.close()
        self.batch_bar.close()
        self.metrics_bar.close()
        clear_output(wait=True)

    def plot_history(self):
        try:
            import matplotlib.pyplot as plt
            plt.figure(figsize=(12, 5))
            plt.subplot(1, 2, 1)
            plt.plot(self.history['train_acc'], label='Train Accuracy')
            plt.plot(self.history['val_acc'], label='Validation Accuracy')
            plt.xlabel('Epoch')
            plt.ylabel('Accuracy')
            plt.legend()
            plt.title('Training and Validation Accuracy')
            plt.subplot(1, 2, 2)
            plt.plot(self.history['train_loss'], label='Train Loss')
            plt.plot(self.history['val_loss'], label='Validation Loss')
            plt.xlabel('Epoch')
            plt.ylabel('Loss')
            plt.legend()
            plt.title('Training and Validation Loss')
            plt.tight_layout()
            plt.show()
        except ImportError:
            logger.warning("Matplotlib not available, skipping plot")


# ------------------------------
# Enhanced Turbo Pipeline with Early Stopping
# ------------------------------
class TurboPipeline:
    def __init__(self, data_dir, max_time=7200, img_size=128, batch_size=64,
                 patience=5, epochs=50, dropout_rate=0.2):
        self.data_dir = data_dir
        self.max_time = max_time  # Maximum training time in seconds (set to 7200 for 2 hours)
        self.img_size = img_size
        self.batch_size = batch_size
        self.patience = patience  # Early stopping patience (epochs)
        self.epochs = epochs
        self.dropout_rate = dropout_rate
        self.checkpoint_dir = os.path.abspath("checkpoints")  # Changed to absolute path
        os.makedirs(self.checkpoint_dir, exist_ok=True)

    def _get_num_batches(self, dataset):
        return tf.data.experimental.cardinality(dataset).numpy()

    def run(self):
        progress = None
        try:
            setup_hardware()
            logger.info("Loading and preparing datasets...")
            loader = TurboDataLoader(
                self.data_dir,
                self.img_size,
                self.batch_size,
                augment=True
            )
            train_ds, val_ds, class_names = loader.load()
            logger.info(f"Loaded {len(class_names)} classes: {class_names}")
            progress = TrainingProgress(self.epochs)
            logger.info("Initializing model and training state...")
            trainer = SpeedTrainer(num_classes=len(class_names), dropout_rate=self.dropout_rate)
            rng = jax.random.PRNGKey(int(time.time()))
            state = trainer.create_state(rng, input_shape=(1, self.img_size, self.img_size, 3))
            train_batches = self._get_num_batches(train_ds)
            val_batches = self._get_num_batches(val_ds)
            best_val_acc = 0.0
            early_stop_counter = 0
            start_time = time.time()
            for epoch in range(self.epochs):
                epoch_start = time.time()
                train_iter = iter(train_ds.as_numpy_iterator())
                train_metrics = []
                last_reported = 0  # For progress update every 5%
                for batch_idx in range(train_batches):
                    batch = next(train_iter)
                    # Split rng for dropout
                    dropout_rng, rng = jax.random.split(rng)
                    state, metrics = trainer.train_step(state, batch, dropout_rng)
                    train_metrics.append(metrics)
                    current_percent = int(((batch_idx + 1) / train_batches) * 100)
                    if current_percent >= last_reported + 5:
                        progress.update_batch(metrics, "train")
                        last_reported = current_percent
                val_iter = iter(val_ds.as_numpy_iterator())
                val_metrics = []
                for _ in range(val_batches):
                    batch = next(val_iter)
                    metrics = trainer.eval_step(state, batch)
                    val_metrics.append(metrics)
                train_acc, val_acc, train_loss, val_loss = progress.update_metrics(train_metrics, val_metrics)
                epoch_time = time.time() - epoch_start
                progress.update_epoch()
                # Print a summary line with necessary info after each epoch.
                print(f"Progress: {(epoch + 1) / self.epochs * 100:.1f}% | Epoch: {epoch + 1}/{self.epochs} | "
                      f"Train Acc: {train_acc:.4f} | Val Acc: {val_acc:.4f} | "
                      f"Train Loss: {train_loss:.4f} | Val Loss: {val_loss:.4f} | Epoch Time: {epoch_time:.2f}s")
                if val_acc > best_val_acc:
                    best_val_acc = val_acc
                    early_stop_counter = 0
                    checkpoints.save_checkpoint(
                        ckpt_dir=self.checkpoint_dir,
                        target=state,
                        step=epoch,
                        prefix="best_model_",
                        overwrite=True
                    )
                    logger.info(f"Epoch {epoch + 1}: New best model with val acc: {val_acc:.4f}")
                else:
                    early_stop_counter += 1
                if early_stop_counter >= self.patience:
                    logger.info(f"Early stopping after {epoch + 1} epochs without improvement")
                    break
                elapsed = time.time() - start_time
                if elapsed > self.max_time:
                    logger.info(f"Time limit of {self.max_time}s reached after {epoch + 1} epochs")
                    break
            total_time = time.time() - start_time
            logger.info(f"Training completed in {total_time:.2f}s with best val acc: {best_val_acc:.4f}")
            progress.plot_history()
            progress.close()
            best_state = checkpoints.restore_checkpoint(
                ckpt_dir=self.checkpoint_dir,
                target=state,
                prefix="best_model_"
            )
            return best_state, class_names
        except Exception as e:
            if progress is not None:
                progress.close()
            logger.error(f"Pipeline failed: {str(e)}")
            raise


# ------------------------------
# Model Inference and Visualization
# ------------------------------
@functools.partial(jax.jit, static_argnums=(0,))
def predict_single(apply_fn, params, image: jnp.ndarray):
    logits = apply_fn({'params': params}, image, training=False)
    probs = jax.nn.softmax(logits)
    if not isinstance(image, jnp.ndarray):
        image = jnp.array(image)
    return probs

class ModelInference:
    def __init__(self, state, class_names, img_size=128):
        self.state = state
        self.class_names = class_names
        self.img_size = img_size

    def preprocess_image(self, image_path):
        img = tf.io.read_file(image_path)
        img = tf.image.decode_image(img, channels=3)
        img = tf.image.resize(img, [self.img_size, self.img_size])
        img = tf.cast(img, tf.float32) / 255.0
        return img[tf.newaxis, ...]

    def predict(self, image_path):
        try:
            import matplotlib.pyplot as plt
            img = self.preprocess_image(image_path)
            # Convert TF tensor to JAX array
            img_np = np.array(img)  # First to NumPy
            img_jax = jnp.array(img_np)  # Then to JAX
            probs = predict_single(self.state.apply_fn, self.state.params, img_jax)
            pred_class = jnp.argmax(probs[0])
            pred_prob = probs[0][pred_class]
            plt.figure(figsize=(6, 8))
            plt.subplot(2, 1, 1)
            plt.imshow(img[0])
            plt.title(f"Prediction: {self.class_names[pred_class]} ({pred_prob:.2%})")
            plt.axis('off')
            plt.subplot(2, 1, 2)
            indices = jnp.argsort(probs[0])[::-1]
            top_k = 5 if len(self.class_names) >= 5 else len(self.class_names)
            bars = plt.barh(range(top_k), [probs[0][i] for i in indices[:top_k]], color='skyblue')
            plt.yticks(range(top_k), [self.class_names[i] for i in indices[:top_k]])
            plt.xlabel('Probability')
            plt.title('Top Predictions')
            for i, bar in enumerate(bars):
                plt.text(bar.get_width() + 0.01, bar.get_y() + bar.get_height() / 2,
                         f'{probs[0][indices[i]]:.2%}', va='center')
            plt.tight_layout()
            plt.show()
            return self.class_names[pred_class], pred_prob
        except ImportError:
            logger.warning("Matplotlib not available, returning prediction only")
            img = self.preprocess_image(image_path)
            # Correct call to predict_single
            probs = predict_single(self.state.apply_fn, self.state.params, img)
            pred_class = jnp.argmax(probs[0])
            pred_prob = probs[0][pred_class]
            return self.class_names[pred_class], pred_prob


# ------------------------------
# Main Execution
# ------------------------------
if __name__ == "__main__":
    try:
        DATA_PATH = "D:\Agrivision360\Dataset"
        pipeline = TurboPipeline(
            data_dir=DATA_PATH,
            img_size=128,
            batch_size=64,  # Adjust if needed based on GPU memory
            epochs=50,
            patience=1000,  # Set a very high patience to disable early stopping
            max_time=7200  # Ensure max_time is sufficiently high or set even higher if needed
        )

        final_state, classes = pipeline.run()

        # Save the final model to a file in the DATA_PATH so you can use it later without re-running training.
        final_model_path = os.path.join(DATA_PATH, "final_model.flax")
        final_classes_path = os.path.join(DATA_PATH, "final_classes.txt")
        from flax import serialization

        with open(final_model_path, "wb") as f:
            f.write(serialization.to_bytes(final_state.params))
        logger.info(f"Final model saved to {final_model_path}")

        # Save the class names
        with open(final_classes_path, "w") as f:
            for class_name in classes:
                f.write(class_name + "\n")
        logger.info(f"Class names saved to {final_classes_path}")

        # Example: To make a prediction, update the image path and uncomment below:
        # inference = ModelInference(final_state, classes)
        # predicted_class, confidence = inference.predict("/content/drive/MyDrive/TS- GBC -1/Dataset/Tomato_Bacterial_spot/00416648-be6e-4bd4-bc8d-82f43f8a7240___GCREC_Bact.Sp 3110.JPG")
        # print(f"Predicted class: {predicted_class} with {confidence:.2%} confidence")
    except Exception as e:
        logger.exception("An error occurred during pipeline execution:")

# Load the model (only once at startup)
DATA_PATH = "D:\Agrivision360\Dataset"  # Change this to your dataset path
try:
    # Check if the model exists
    final_model_path = os.path.join(DATA_PATH, "final_model.flax")
    final_classes_path = os.path.join(DATA_PATH, "final_classes.txt")
    if not os.path.exists(final_model_path):
        logger.info("Model not found, training a new one...")
        pipeline = TurboPipeline(
            data_dir=DATA_PATH,
            img_size=128,
            batch_size=64,
            epochs=50,
            patience=1000,
            max_time=7200
        )
        final_state, classes = pipeline.run()
        # Save the model
        from flax import serialization

        with open(final_model_path, "wb") as f:
            f.write(serialization.to_bytes(final_state.params))
        logger.info(f"Final model saved to {final_model_path}")
        # Save the class names
        with open(final_classes_path, "w") as f:
            for class_name in classes:
                f.write(class_name + "\n")
        logger.info(f"Class names saved to {final_classes_path}")
    else:
        logger.info("Loading existing model...")
        # Load the model
        from flax import serialization

        with open(final_model_path, "rb") as f:
            model_params = serialization.from_bytes(None, f.read())
        
        # Load the class names
        with open(final_classes_path, "r", encoding='utf-8') as f:
            classes = [line.strip() for line in f if line.strip()]
        logger.info(f"Class names loaded from {final_classes_path}")

        # Create a dummy state to load the model
        trainer = SpeedTrainer(num_classes=len(classes), dropout_rate=0.2)
        rng = jax.random.PRNGKey(int(time.time()))
        state = trainer.create_state(rng, input_shape=(1, 128, 128, 3))
        final_state = state.replace(params=model_params)
    inference = ModelInference(final_state, classes)
    logger.info("Model loaded successfully.")
except Exception as e:
    logger.error(f"Error loading model: {e}")
    raise


@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data)).convert("RGB")

        # Convert to NumPy array directly
        img_np = np.array(image.resize((128, 128))) / 255.0
        img_np = (img_np - 0.5) * 2.0  # Your normalization

        # Convert to JAX array
        img_jax = jnp.array(img_np[np.newaxis, ...])  # Add batch dim

        # Predict
        logits = inference.state.apply_fn(
            {'params': inference.state.params, 'batch_stats': inference.state.batch_stats},
            img_jax,
            training=False,
            mutable=False
        )
        probs = jax.nn.softmax(logits)

        pred_class = jnp.argmax(probs[0])
        return {
            "class": inference.class_names[pred_class],
            "confidence": float(probs[0][pred_class])
        }
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise HTTPException(500, detail=str(e))

    

@app.get("/health")
async def health_check():
    try:
        # Test prediction with dummy data
        test_input = jnp.ones((1, 128, 128, 3))
        inference.state.apply_fn(
            {'params': inference.state.params},
            test_input, training=False
        )
        return {
            "status": "ready",
            "model": "loaded",
            "device": str(jax.devices()[0])
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Service unavailable: {str(e)}"
        )

@app.get("/classes/")
async def get_classes():
    return {"classes": inference.class_names}
