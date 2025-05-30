import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Cloud, 
  Droplet, 
  Sprout, 
  Tractor, 
  Wheat, 
  Users, 
  Building, 
  Store 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const schemes = [
  {
    id: 1,
    title: "PM-KISAN",
    category: "income-support",
    icon: <Wheat className="h-10 w-10 text-primary" />,
    description: "Pradhan Mantri Kisan Samman Nidhi provides income support of ₹6,000 per year to all landholding farmer families.",
    eligibility: "All landholding farmers with cultivable land.",
    benefits: "Financial assistance of ₹6,000 per year in three equal installments.",
    url: "https://pmkisan.gov.in/"
  },
  {
    id: 2,
    title: "Pradhan Mantri Fasal Bima Yojana",
    category: "insurance",
    icon: <Cloud className="h-10 w-10 text-sky-500" />,
    description: "Crop insurance scheme to protect farmers from crop failure due to natural calamities, pests & diseases.",
    eligibility: "All farmers including sharecroppers and tenant farmers growing notified crops.",
    benefits: "Insurance coverage and financial support to farmers in case of crop failure.",
    url: "https://pmfby.gov.in/"
  },
  {
    id: 3,
    title: "Pradhan Mantri Krishi Sinchai Yojana",
    category: "irrigation",
    icon: <Droplet className="h-10 w-10 text-blue-600" />,
    description: "Scheme aimed at providing end-to-end solutions in irrigation supply chain.",
    eligibility: "All farmers with focus on drought-prone and water-scarce regions.",
    benefits: "Improved access to irrigation, water-use efficiency, and precision irrigation.",
    url: "https://pmksy.gov.in/"
  },
  {
    id: 4,
    title: "Soil Health Card Scheme",
    category: "soil-health",
    icon: <Sprout className="h-10 w-10 text-green-600" />,
    description: "Government scheme to provide soil health cards to farmers which will carry crop-wise recommendations of nutrients and fertilizers.",
    eligibility: "All farmers across India.",
    benefits: "Information on soil nutrients status and recommendations on fertilizer use.",
    url: "https://soilhealth.dac.gov.in/"
  },
  {
    id: 5,
    title: "Kisan Credit Card",
    category: "credit",
    icon: <Store className="h-10 w-10 text-orange-500" />,
    description: "Provides farmers with affordable credit for their agricultural operations.",
    eligibility: "All farmers, sharecroppers, tenant farmers, and self-help groups.",
    benefits: "Access to short-term loans for cultivation, post-harvest expenses, and more.",
    url: "https://www.india.gov.in/spotlight/kisan-credit-card-empowering-farmers-through-simplified-credit-facility"
  },
  {
    id: 6,
    title: "National Mission for Sustainable Agriculture",
    category: "sustainability",
    icon: <Tractor className="h-10 w-10 text-earth-600" />,
    description: "Promotes sustainable agriculture through climate change adaptation measures.",
    eligibility: "All farmers interested in sustainable agriculture practices.",
    benefits: "Support for adoption of sustainable practices, soil health improvement, etc.",
    url: "https://nmsa.dac.gov.in/"
  },
  {
    id: 7,
    title: "e-NAM (Electronic National Agriculture Market)",
    category: "market-access",
    icon: <Building className="h-10 w-10 text-indigo-600" />,
    description: "Online trading platform for agricultural commodities to create a unified national market.",
    eligibility: "All farmers and trader participants in agriculture markets.",
    benefits: "Better price discovery, transparent trading process, and access to more buyers.",
    url: "https://enam.gov.in/web/"
  },
  {
    id: 8,
    title: "Formation and Promotion of Farmer Producer Organizations",
    category: "collective-farming",
    icon: <Users className="h-10 w-10 text-purple-600" />,
    description: "Scheme to form and promote FPOs to enhance farmers' income and bargaining power.",
    eligibility: "Groups of farmers willing to form producer organizations.",
    benefits: "Financial support, technical assistance, and capacity building for FPOs.",
    url: "https://dmi.gov.in/farmer-organization"
  },
];

const GovernmentSchemes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === 'all' || scheme.category === activeTab;
    
    return matchesSearch && matchesCategory;
  });

  const handleOpenScheme = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Government Agricultural Schemes</h1>
        <p className="text-muted-foreground mb-8">
          Explore various government schemes and programs designed to support farmers and agriculture in India
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="w-full">
            <Input
              placeholder="Search schemes by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 flex flex-wrap">
            <TabsTrigger value="all">All Schemes</TabsTrigger>
            <TabsTrigger value="income-support">Income Support</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
            <TabsTrigger value="irrigation">Irrigation</TabsTrigger>
            <TabsTrigger value="soil-health">Soil Health</TabsTrigger>
            <TabsTrigger value="credit">Credit</TabsTrigger>
            <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
            <TabsTrigger value="market-access">Market Access</TabsTrigger>
            <TabsTrigger value="collective-farming">Collective Farming</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            {filteredSchemes.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredSchemes.map((scheme) => (
                  <Card key={scheme.id} className="overflow-hidden transition-all hover:border-primary/50">
                    <CardHeader className="flex flex-row items-start gap-4 pb-2">
                      <div className="mt-1">{scheme.icon}</div>
                      <div>
                        <CardTitle>{scheme.title}</CardTitle>
                        <CardDescription className="mt-1">{scheme.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm">Eligibility:</h4>
                          <p className="text-muted-foreground text-sm">{scheme.eligibility}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Benefits:</h4>
                          <p className="text-muted-foreground text-sm">{scheme.benefits}</p>
                        </div>
                        <Button 
                          onClick={() => handleOpenScheme(scheme.url)}
                          className="w-full mt-4"
                        >
                          Visit Official Website
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium">No schemes found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GovernmentSchemes;
