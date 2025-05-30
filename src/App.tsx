
import { Toaster } from "@/components/ui/toaster"; 
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import CropAnalytics from "./pages/CropAnalytics";
import Weather from "./pages/Weather";
import About from "./pages/About";
import Marketplace from "./pages/Marketplace";
import NotFound from "./pages/NotFound";
import YieldPrediction from "./pages/YieldPrediction";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import AIAssistant from "./pages/AIAssistant";
import FarmMonitoring from "./pages/FarmMonitoring";
import CommunityForum from "./pages/CommunityForum";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/crop-analytics" element={<CropAnalytics />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/about" element={<About />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/yield-prediction" element={<YieldPrediction />} />
              <Route path="/govt-schemes" element={<GovernmentSchemes />} />
              <Route path="/assistant" element={<AIAssistant />} />
              <Route path="/farm-map" element={<FarmMonitoring />} />
              <Route path="/community" element={<CommunityForum />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
