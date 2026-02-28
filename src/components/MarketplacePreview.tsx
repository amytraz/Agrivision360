
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const MarketplacePreview = () => {
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
    <section id="marketplace" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">From Our Marketplace</h2>
            <p className="text-lg text-foreground/80 mt-2">Fresh produce and quality supplies, direct from the source.</p>
          </div>
          <Link to="/marketplace">
            <Button variant="outline" className="hidden md:flex">
              View More
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <span className="text-primary font-bold">{product.price}</span>
                </div>
                <p className="text-sm text-foreground/70 mb-4">By {product.seller}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-500 mr-1">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <ShoppingCart size={16} className="mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 md:hidden">
          <Link to="/marketplace">
            <Button variant="outline">
              View More
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MarketplacePreview;
