import React, { useState, useEffect } from 'react';
import { Upload, Leaf, Info, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, buttonVariants } from '@/components/ui/button';
import { BlurImage } from '@/components/ui/blur-image';
import { Separator } from '@/components/ui/separator';
import Footer from '@/components/Footer';
import Navbar from "@/components/Navbar";
import axios, { AxiosError } from 'axios';

interface PredictionResult {
  class: string;
  confidence: number;
}

interface DiseaseInfo {
  name: string;
  description: string;
  treatments: string[];
  prevention: string[];
}

interface AnalysisResult {
  health: "Healthy" | "Unhealthy";
  confidence: number;
  disease: DiseaseInfo | null;
  recommendations: string[];
}

const API_BASE_URL = 'http://localhost:8000'; // Update if deployed elsewhere

const CropAnalytics = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [classNames, setClassNames] = useState<string[]>([]);
  const [diseaseInfo, setDiseaseInfo] = useState<Record<string, DiseaseInfo>>({});

  // Fetch class names and disease information on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch class names
        const classesResponse = await axios.get(`${API_BASE_URL}/classes/`);
        setClassNames(classesResponse.data.classes);
        
        // Create basic disease info for each class
        const diseaseData: Record<string, DiseaseInfo> = {};
        classesResponse.data.classes.forEach((className: string) => {
          const isHealthy = className.toLowerCase().includes('healthy');
          if (!isHealthy) {
            diseaseData[className] = {
              name: className.replace(/_/g, ' '),
              description: `Common disease affecting crops.`,
              treatments: [
                'Apply appropriate fungicides/pesticides',
                'Remove and destroy infected plants',
                'Consult with agricultural expert'
              ],
              prevention: [
                'Practice crop rotation',
                'Ensure proper spacing between plants',
                'Monitor regularly for early signs'
              ]
            };
          }
        });
        setDiseaseInfo(diseaseData);
      } catch (err) {
        console.error('Failed to fetch initial data:', err);
        setError('Could not load disease information');
      }
    };
    
    fetchInitialData();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!file.type.match('image.*')) {
        setError('Please upload an image file (JPEG, PNG)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size should be less than 5MB');
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAnalysisResults(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) {
      setError('Please select an image file.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysisResults(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Step 1: Upload and analyze image
      const response = await axios.post<PredictionResult>(
        `${API_BASE_URL}/predict/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 30000 // 30 second timeout
        }
      );

      const prediction = response.data;
      const isHealthy = prediction.class.toLowerCase().includes('healthy');
      
      // Step 2: Prepare detailed results
      const result: AnalysisResult = {
        health: isHealthy ? "Healthy" : "Unhealthy",
        confidence: prediction.confidence * 100,
        disease: isHealthy ? null : diseaseInfo[prediction.class] || {
          name: prediction.class.replace(/_/g, ' '),
          description: 'A plant disease that affects crop health.',
          treatments: [
            'Consult with agricultural expert',
            'Apply appropriate treatment',
            'Isolate affected plants'
          ],
          prevention: [
            'Practice good crop management',
            'Monitor regularly',
            'Maintain proper soil health'
          ]
        },
        recommendations: isHealthy ? [
          'Continue with current irrigation schedule',
          'Monitor for early signs of pest activity',
          'Maintain current nutrient levels',
        ] : [
          `The crop is showing signs of ${prediction.class.replace(/_/g, ' ')}.`,
          'Isolate affected plants to prevent spread.',
          'Consider adjusting irrigation and nutrient levels',
          'Consult with an agricultural expert for specific treatment options.'
        ]
      };

    setAnalysisResults(result);
    } catch (err) {
      let errorMessage = 'An error occurred during analysis.';
      
      if (axios.isAxiosError(err)) {
        if (err.response) {
          errorMessage = err.response.data?.detail || err.message;
        } else if (err.request) {
          errorMessage = 'No response received from the server. Please try again.';
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      } 
    setError(errorMessage);
    console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-background/80 backdrop-blur-md py-3 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4"></div>
        </div>
      </div>
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-card rounded-xl shadow-sm border border-border/40 overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-primary" />
                      Crop Health Analysis
                    </h2>
                    <p className="text-foreground/70 mb-6">
                      Upload an image of your crop to analyze its health status and identify potential diseases or nutrient deficiencies.
                    </p>

                    <div className="mb-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="inline-block">
                          <label
                            htmlFor="crop-image"
                            className={`${buttonVariants({ variant: "outline" })} cursor-pointer flex items-center gap-2`}
                          >
                            <Upload className="h-4 w-4" />
                            Upload Image
                            <input
                              id="crop-image"
                              type="file"
                              accept="image/png, image/jpeg, image/jpg"
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                          </label>
                        </div>

                        <Button
                          onClick={analyzeImage}
                          disabled={!selectedImage || isAnalyzing}
                          className="relative"
                        >
                          {isAnalyzing ? (
                            <>
                              <span className="absolute inset-0 flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              </span>
                              <span className="opacity-0">Analyze Image</span>
                            </>
                          ) : (
                            <>Analyze Image</>
                          )}
                        </Button>
                      </div>
                      
                      {error && (
                        <div className="bg-destructive/10 text-destructive rounded-md px-4 py-3 mb-4">
                          {error}
                        </div>
                      )}
                      
                      {!selectedImage && (
                        <div className="bg-muted rounded-lg border border-dashed border-border/60 h-64 flex items-center justify-center">
                          <div className="text-center p-6">
                            <Leaf className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                            <p className="text-muted-foreground">
                              Upload an image of your crop to begin analysis
                            </p>
                            <p className="text-muted-foreground text-sm mt-2">
                              Supported formats: JPEG, PNG (max 5MB)
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedImage && (
                        <div className="border border-border rounded-lg overflow-hidden h-64 bg-black">
                          <img
                            src={selectedImage}
                            alt="Uploaded crop"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Info className="h-5 w-5 text-primary" />
                      Analysis Results
                    </h3>

                    {!analysisResults && !isAnalyzing && (
                      <div className="bg-muted rounded-lg p-6 h-full min-h-[16rem] flex items-center justify-center">
                        <p className="text-muted-foreground text-center">
                          Upload and analyze an image to see the results here
                        </p>
                      </div>
                    )}

                    {isAnalyzing && (
                      <div className="bg-muted rounded-lg p-6 h-full min-h-[16rem] flex flex-col items-center justify-center">
                        <svg className="animate-spin h-12 w-12 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-foreground font-medium">Analyzing your crop image...</p>
                        <p className="text-muted-foreground text-sm mt-2">
                          This may take a few moments
                        </p>
                      </div>
                    )}

                    {analysisResults && (
                      <div className="space-y-6">
                        <div className="bg-card rounded-lg border border-border/50 shadow-sm overflow-hidden">
                          <div className="p-4 bg-primary/5 border-b border-border/50">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">Crop Health Status</h4>
                              <div className="flex items-center gap-2">
                                <span className={`inline-flex h-3 w-3 rounded-full ${
                                  analysisResults.health === 'Healthy' ? 'bg-green-500' : 'bg-red-500'
                                }`}></span>
                                <span>{analysisResults.health}</span>
                              </div>
                            </div>
                          </div>

                          <div className="p-4">
                            <div className="mb-4">
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Confidence</span>
                                <span className="text-sm font-medium">{analysisResults.confidence.toFixed(2)}%</span>
                              </div>
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${analysisResults.confidence}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {analysisResults.disease && (
                          <div className="bg-card rounded-lg border border-border/50 shadow-sm overflow-hidden">
                            <div className="p-4 bg-primary/5 border-b border-border/50">
                              <h4 className="font-medium">Disease Information</h4>
                            </div>
                            <div className="p-4 space-y-4">
                              <div>
                                <h5 className="text-sm font-medium mb-1">Name</h5>
                                <p>{analysisResults.disease.name}</p>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium mb-1">Description</h5>
                                <p className="text-sm">{analysisResults.disease.description}</p>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium mb-1">Recommended Treatments</h5>
                                <ul className="space-y-2 text-sm">
                                  {analysisResults.disease.treatments.map((treatment, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <span className="text-primary mt-0.5">•</span>
                                      <span>{treatment}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium mb-1">Prevention Tips</h5>
                                <ul className="space-y-2 text-sm">
                                  {analysisResults.disease.prevention.map((tip, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <span className="text-primary mt-0.5">•</span>
                                      <span>{tip}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="bg-card rounded-lg border border-border/50 shadow-sm overflow-hidden">
                          <div className="p-4 bg-primary/5 border-b border-border/50">
                            <h4 className="font-medium">Recommendations</h4>
                          </div>
                          <div className="p-4">
                            <ul className="space-y-3">
                              {analysisResults.recommendations.map((rec, index) => (
                                <li key={index} className="flex items-start gap-3">
                                  <div className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                                    index < 2 ? 'bg-primary/10 text-primary' : 'bg-muted text-foreground'
                                  }`}>
                                    {index + 1}
                                  </div>
                                  <span className="text-sm">{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Recognizable Diseases</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {classNames.filter(name => !name.toLowerCase().includes('healthy')).map((disease) => (
                  <div key={disease} className="bg-card rounded-lg p-4 border border-border/40 shadow-sm">
                    <h3 className="font-medium">{disease.replace(/_/g, ' ')}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Our model can detect this disease with high accuracy
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CropAnalytics;