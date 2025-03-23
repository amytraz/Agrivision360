
import React, { useState } from 'react';
import { Upload, Leaf, Info, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, buttonVariants } from '@/components/ui/button';
import { BlurImage } from '@/components/ui/blur-image';
import { Separator } from '@/components/ui/separator';
import Footer from '@/components/Footer';

const CropAnalytics = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<null | {
    health: string;
    confidence: number;
    disease: string | null;
    recommendations: string[];
  }>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAnalysisResults(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis with a timeout
    // This will be replaced with actual AI integration later
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResults({
        health: 'Good',
        confidence: 85,
        disease: null,
        recommendations: [
          'Continue with current irrigation schedule',
          'Consider adding nitrogen-rich fertilizer in the next 2 weeks',
          'Monitor for early signs of pest activity'
        ]
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-background/80 backdrop-blur-md py-3 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-1 text-foreground/70 hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-xl font-semibold">Crop Analytics</h1>
          </div>
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
                              accept="image/*" 
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
                      
                      {!selectedImage && (
                        <div className="bg-muted rounded-lg border border-dashed border-border/60 h-64 flex items-center justify-center">
                          <div className="text-center p-6">
                            <Leaf className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                            <p className="text-muted-foreground">
                              Upload an image of your crop to begin analysis
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
                          Our AI is examining the image for signs of health issues or diseases
                        </p>
                      </div>
                    )}
                    
                    {analysisResults && (
                      <div className="bg-card rounded-lg border border-border/50 shadow-sm overflow-hidden">
                        <div className="p-4 bg-primary/5 border-b border-border/50">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">Crop Health Status</h4>
                            <div className="flex items-center gap-2">
                              <span className={`inline-flex h-3 w-3 rounded-full ${
                                analysisResults.health === 'Good' ? 'bg-green-500' :
                                analysisResults.health === 'Fair' ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}></span>
                              <span>{analysisResults.health}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <div className="mb-4">
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-muted-foreground">Confidence</span>
                              <span className="text-sm font-medium">{analysisResults.confidence}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full" 
                                style={{ width: `${analysisResults.confidence}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          {analysisResults.disease && (
                            <div className="mb-4">
                              <h5 className="text-sm font-medium mb-1">Potential Issues</h5>
                              <div className="bg-destructive/10 text-destructive rounded-md px-3 py-2 text-sm">
                                {analysisResults.disease}
                              </div>
                            </div>
                          )}
                          
                          <div>
                            <h5 className="text-sm font-medium mb-2">Recommendations</h5>
                            <ul className="space-y-2">
                              {analysisResults.recommendations.map((rec, index) => (
                                <li key={index} className="text-sm flex items-start gap-2">
                                  <span className="text-primary mt-0.5">•</span>
                                  <span>{rec}</span>
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
              <h2 className="text-2xl font-bold mb-6">Crop Analytics Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card rounded-xl p-6 border border-border/40 shadow-sm">
                  <div className="bg-primary/10 rounded-full p-2 w-10 h-10 flex items-center justify-center mb-4">
                    <Leaf className="text-primary h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Health Monitoring</h3>
                  <p className="text-foreground/70 text-sm">
                    Regular monitoring of crop health using advanced image recognition to detect early signs of stress or disease.
                  </p>
                </div>
                
                <div className="bg-card rounded-xl p-6 border border-border/40 shadow-sm">
                  <div className="bg-primary/10 rounded-full p-2 w-10 h-10 flex items-center justify-center mb-4">
                    <Upload className="text-primary h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Image Analysis</h3>
                  <p className="text-foreground/70 text-sm">
                    AI-powered analysis of crop images to identify nutrient deficiencies, pest infestations, and diseases.
                  </p>
                </div>
                
                <div className="bg-card rounded-xl p-6 border border-border/40 shadow-sm">
                  <div className="bg-primary/10 rounded-full p-2 w-10 h-10 flex items-center justify-center mb-4">
                    <Info className="text-primary h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Actionable Insights</h3>
                  <p className="text-foreground/70 text-sm">
                    Receive practical recommendations based on analysis results to improve crop health and yield.
                  </p>
                </div>
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
