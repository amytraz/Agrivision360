
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { BlurImage } from './ui/blur-image';

const MarketplacePreview = () => {
  // Example produce items
  const products = [
      {
        id: 1,
        name: "Organic Red Apples",
        price: "₹290/kg",
        seller: "Green Valley Farms",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=1974&auto=format&fit=crop"
      },
      {
        id: 2,
        name: "Farm Fresh Eggs",
        price: "₹499/dozen",
        seller: "Sunshine Poultry",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?q=80&w=1970&auto=format&fit=crop"
      },
      {
        id: 3,
        name: "Heirloom Tomatoes",
        price: "₹350/kg",
        seller: "Heritage Gardens",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1546094096-0df4bcabd31c?q=80&w=1974&auto=format&fit=crop"
      },
      {
        id: 4,
        name: "Raw Wildflower Honey",
        price: "₹1,080/jar",
        seller: "BeeHaven Apiaries",
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?q=80&w=1980&auto=format&fit=crop"
      }
      
  ];

  return (
    <section id="marketplace" className="py-24 bg-sage-50/50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-earth-100 rounded-full opacity-40 blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full opacity-60 blur-3xl translate-y-1/3 -translate-x-1/4" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/30 text-secondary-foreground text-sm font-medium">
              <span>Marketplace</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Connect Directly with Buyers and Sellers
            </h2>
            
            <p className="text-lg text-foreground/80">
              List your farm products or find quality agricultural supplies in our integrated marketplace.
              Eliminate middlemen and build direct relationships with customers.
            </p>
            
            <ul className="space-y-3">
              {[
                "Direct farmer-to-consumer sales",
                "Verified seller profiles and ratings",
                "Secure payment processing",
                "Local delivery options"
              ].map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3 text-primary">
                    <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button className="group">
              Explore Marketplace
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="lg:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border/40 hover-scale"
                >
                  <div className="h-48 overflow-hidden">
                    <BlurImage
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <span className="text-primary font-medium">{product.price}</span>
                    </div>
                    <p className="text-sm text-foreground/70 mb-3">Seller: {product.seller}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-500 mr-1">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketplacePreview;
