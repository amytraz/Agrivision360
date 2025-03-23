
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import MarketplacePreview from '@/components/MarketplacePreview';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onLoginClick={handleOpenAuthModal} />
      
      <main className="flex-grow">
        <Hero onGetStartedClick={handleOpenAuthModal} />
        <Features />
        <MarketplacePreview />
        
        {/* This is just a placeholder for the other sections mentioned in the requirements */}
        <section id="about" className="py-24 bg-muted">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About AgriVision 360</h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              A sophisticated platform that bridges technology and agriculture, 
              enabling farmers to optimize resources and increase productivity.
            </p>
          </div>
        </section>
        
        <section id="contact" className="py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto mb-8">
              Have questions or want to learn more about how AgriVision 360 can transform your farm?
              Reach out to our team.
            </p>
            <div className="flex justify-center">
              <button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-medium text-lg transition-colors"
                onClick={() => {
                  // This would open a contact form modal in a complete implementation
                  console.log('Contact form would open here');
                }}
              >
                Get in Touch
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={handleCloseAuthModal} 
      />
    </div>
  );
};

export default Index;
