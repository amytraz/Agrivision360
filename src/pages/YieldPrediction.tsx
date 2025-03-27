
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const YieldPrediction = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    cropType: '',
    soilType: '',
    landArea: '',
    seedQuality: '',
    irrigationAvailability: '',
    previousYield: '',
    fertilizerUsage: '',
    pestManagement: '',
  });
  
  const [prediction, setPrediction] = useState<null | { 
    estimatedYield: string;
    yieldRange: string;
    confidenceLevel: string;
    comparisonToAverage: string;
  }>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateYield = () => {
    // Check if all required fields are filled
    const requiredFields = ['cropType', 'soilType', 'landArea'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields marked with *",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Simple algorithm for demonstration
      // In a real app, this would be a more sophisticated ML model
      
      const baseYield = {
        'Rice': 4.5,
        'Wheat': 3.8,
        'Corn': 6.2,
        'Sugarcane': 70,
        'Cotton': 2.5,
        'Soybeans': 3.0,
        'Potatoes': 25,
        'Tomatoes': 35
      }[formData.cropType] || 5;
      
      const soilFactor = {
        'Clay': 0.9,
        'Sandy': 0.8,
        'Loamy': 1.2,
        'Silty': 1.1,
        'Peaty': 0.95
      }[formData.soilType] || 1;
      
      const seedFactor = {
        'High': 1.3,
        'Medium': 1.0,
        'Low': 0.7
      }[formData.seedQuality] || 1;
      
      const irrigationFactor = {
        'Abundant': 1.4,
        'Adequate': 1.2,
        'Limited': 0.8,
        'Minimal': 0.6
      }[formData.irrigationAvailability] || 1;
      
      // Calculate estimated yield (tonnes per hectare)
      const landAreaNum = parseFloat(formData.landArea) || 1;
      const estimatedYield = baseYield * soilFactor * seedFactor * irrigationFactor;
      const totalYield = estimatedYield * landAreaNum;
      
      // Random variance for range (±15%)
      const lowerRange = (totalYield * 0.85).toFixed(2);
      const upperRange = (totalYield * 1.15).toFixed(2);
      
      // Generate prediction object
      setPrediction({
        estimatedYield: totalYield.toFixed(2),
        yieldRange: `${lowerRange} - ${upperRange}`,
        confidenceLevel: "Medium",
        comparisonToAverage: estimatedYield > baseYield ? "Above average" : "Below average"
      });
      
      setIsLoading(false);
      
      toast({
        title: "Prediction Complete",
        description: "Your yield prediction has been calculated.",
      });
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      cropType: '',
      soilType: '',
      landArea: '',
      seedQuality: '',
      irrigationAvailability: '',
      previousYield: '',
      fertilizerUsage: '',
      pestManagement: '',
    });
    setPrediction(null);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Crop Yield Prediction</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Enter Farm Details</CardTitle>
                <CardDescription>
                  Fill in the details below to get an estimated crop yield prediction.
                  Fields marked with * are required.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="cropType" className="text-sm font-medium">
                      Crop Type *
                    </label>
                    <Select
                      value={formData.cropType}
                      onValueChange={(value) => handleSelectChange('cropType', value)}
                    >
                      <SelectTrigger id="cropType">
                        <SelectValue placeholder="Select crop type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Rice">Rice</SelectItem>
                        <SelectItem value="Wheat">Wheat</SelectItem>
                        <SelectItem value="Corn">Corn</SelectItem>
                        <SelectItem value="Sugarcane">Sugarcane</SelectItem>
                        <SelectItem value="Cotton">Cotton</SelectItem>
                        <SelectItem value="Soybeans">Soybeans</SelectItem>
                        <SelectItem value="Potatoes">Potatoes</SelectItem>
                        <SelectItem value="Tomatoes">Tomatoes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="soilType" className="text-sm font-medium">
                      Soil Type *
                    </label>
                    <Select
                      value={formData.soilType}
                      onValueChange={(value) => handleSelectChange('soilType', value)}
                    >
                      <SelectTrigger id="soilType">
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Clay">Clay</SelectItem>
                        <SelectItem value="Sandy">Sandy</SelectItem>
                        <SelectItem value="Loamy">Loamy</SelectItem>
                        <SelectItem value="Silty">Silty</SelectItem>
                        <SelectItem value="Peaty">Peaty</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="landArea" className="text-sm font-medium">
                      Land Area (Hectares) *
                    </label>
                    <Input
                      id="landArea"
                      name="landArea"
                      type="number"
                      value={formData.landArea}
                      onChange={handleInputChange}
                      placeholder="Enter land area"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="seedQuality" className="text-sm font-medium">
                      Seed Quality
                    </label>
                    <Select
                      value={formData.seedQuality}
                      onValueChange={(value) => handleSelectChange('seedQuality', value)}
                    >
                      <SelectTrigger id="seedQuality">
                        <SelectValue placeholder="Select seed quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="irrigationAvailability" className="text-sm font-medium">
                      Irrigation Availability
                    </label>
                    <Select
                      value={formData.irrigationAvailability}
                      onValueChange={(value) => handleSelectChange('irrigationAvailability', value)}
                    >
                      <SelectTrigger id="irrigationAvailability">
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Abundant">Abundant</SelectItem>
                        <SelectItem value="Adequate">Adequate</SelectItem>
                        <SelectItem value="Limited">Limited</SelectItem>
                        <SelectItem value="Minimal">Minimal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="previousYield" className="text-sm font-medium">
                      Previous Yield (tonnes/hectare)
                    </label>
                    <Input
                      id="previousYield"
                      name="previousYield"
                      type="number"
                      value={formData.previousYield}
                      onChange={handleInputChange}
                      placeholder="Enter previous yield"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={resetForm}>Reset</Button>
                <Button onClick={calculateYield} disabled={isLoading}>
                  {isLoading ? "Calculating..." : "Calculate Yield Prediction"}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Prediction Results</CardTitle>
                <CardDescription>
                  {prediction 
                    ? "Based on your input, here's the estimated yield prediction"
                    : "Fill in the form and click 'Calculate' to see prediction results"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {prediction ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-primary">Estimated Yield</h3>
                      <p className="text-3xl font-bold">{prediction.estimatedYield} tonnes</p>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Yield Range:</span>
                        <span className="font-medium">{prediction.yieldRange} tonnes</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Confidence Level:</span>
                        <span className="font-medium">{prediction.confidenceLevel}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Compared to Average:</span>
                        <span className="font-medium">{prediction.comparisonToAverage}</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <p className="text-sm text-muted-foreground italic">
                      Note: This is an estimation based on the provided data. Actual yields may vary
                      due to weather conditions, pest infestations, and other unforeseen factors.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                    <p>No prediction data available yet.</p>
                    <p className="text-sm mt-2">Complete the form to generate a prediction.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default YieldPrediction;
