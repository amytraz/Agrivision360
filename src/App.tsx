
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import CropAnalytics from "./pages/CropAnalytics";
import Weather from "./pages/Weather";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import AuthModal from "./components/AuthModal";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout onLoginClick={handleLoginClick} />}>
              <Route path="/" element={<Index />} />
              <Route path="/crop-analytics" element={<CropAnalytics />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/about" element={<About />} />
              <Route path="/marketplace" element={<div className="container mx-auto py-12"><h1 className="text-4xl font-bold mb-6">Marketplace</h1><p>Coming soon...</p></div>} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <AuthModal open={isAuthModalOpen} setOpen={setIsAuthModalOpen} />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
