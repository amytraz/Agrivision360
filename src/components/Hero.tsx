
import React from 'react';
import { ArrowRight, Leaf, CloudSun, Droplet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlurImage } from '@/components/ui/blur-image';

interface HeroProps {
  onGetStartedClick: () => void;
}

const Hero = ({ onGetStartedClick }: HeroProps) => {
  // This would normally be a real image path or URL
  const placeholderImageUrl = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop';

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-sage-50/40 via-background to-earth-50/30 z-0" />
      
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <BlurImage
          src={placeholderImageUrl}
          alt="Agriculture background"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Animated circles */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl animate-pulse-light" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl animate-pulse-light" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto space-y-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Leaf size={16} className="mr-2" />
            <span>Revolutionizing Agriculture with AI & IoT</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-balance animate-fade-in" style={{ animationDelay: '0.5s' }}>
            Cultivate Success with <span className="text-primary">AgriVision 360</span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto text-balance animate-fade-in" style={{ animationDelay: '0.7s' }}>
            Harness the power of AI, IoT, and real-time analytics to transform your farming operations. 
            Monitor conditions, optimize resources, and maximize yields with our comprehensive smart farming platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <Button
              size="lg"
              onClick={onGetStartedClick}
              className="rounded-full px-6 bg-primary hover:bg-primary/90 group"
            >
              Get Started
              <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-6"
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Features
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full animate-fade-in" style={{ animationDelay: '1.1s' }}>
            <div className="flex flex-col items-center p-6 rounded-2xl glass-card hover-scale">
              <div className="size-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CloudSun size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Weather Intelligence</h3>
              <p className="text-sm text-foreground/70 text-center">Real-time forecasts and historical patterns for informed decision-making.</p>
            </div>
            
            <div className="flex flex-col items-center p-6 rounded-2xl glass-card hover-scale">
              <div className="size-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-secondary-foreground">
                  <path d="M7 19C5.34315 19 4 17.6569 4 16C4 14.3431 5.34315 13 7 13C8.65685 13 10 14.3431 10 16C10 17.6569 8.65685 19 7 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11 7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7C5 5.34315 6.34315 4 8 4C9.65685 4 11 5.34315 11 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 19C15.3431 19 14 17.6569 14 16C14 14.3431 15.3431 13 17 13C18.6569 13 20 14.3431 20 16C20 17.6569 18.6569 19 17 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Insights</h3>
              <p className="text-sm text-foreground/70 text-center">Advanced algorithms provide customized recommendations for your crops.</p>
            </div>
            
            <div className="flex flex-col items-center p-6 rounded-2xl glass-card hover-scale">
              <div className="size-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Droplet size={24} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Irrigation</h3>
              <p className="text-sm text-foreground/70 text-center">Optimize water usage with automated, precision irrigation systems.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
