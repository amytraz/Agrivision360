import { Toaster } from "@/components/ui/toaster"; 
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

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            {/* <Route element={<Layout />}> */}
              <Route path="/" element={<Index />} />
              <Route path="/crop-analytics" element={<CropAnalytics />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/about" element={<About />} />
              <Route path="/marketplace" element={
                <div className="container mx-auto py-12">
                  <h1 className="text-4xl font-bold mb-6">Marketplace</h1>
                  <p>Coming soon...</p>
                </div>
              } />
              {/* <Route path="*" element={<NotFound />} /> */}
            {/* </Route> */}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
