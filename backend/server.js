const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:8080"], // Allow both frontend ports
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    });

// Contact Schema & Model
const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },   // ✅ Added
    subject: { type: String, required: true }, // ✅ Added
    message: { type: String, required: true }
}, { timestamps: true });

const Contact = mongoose.model("Contact", ContactSchema);

// Logging Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Test Route
app.get("/", (req, res) => {
    res.send("✅ API is working! 🚀");
});

// Handle Contact Form Submission
app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Validate input
        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        // Save to MongoDB
        const newContact = new Contact({ name, email, phone, subject, message });
        await newContact.save();

        res.status(201).json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        console.error("❌ Error saving contact form:", error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
