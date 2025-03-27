
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import ContactForm from './ContactForm';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface NavbarProps {
  onLoginClick?: () => void;
}

const Navbar = ({ onLoginClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsContactModalOpen(true);
  };

  const scrollToFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (location.pathname !== '/') {
      // If not on home page, navigate to home page and then scroll
      window.location.href = '/#features';
    } else {
      // If on home page, just scroll
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  // All 8 features from the Features component
  const featuresItems = [
    { name: "Weather & Climate", path: "/weather", description: "Access weather data and forecasts for your farm" },
    { name: "Crop Analytics", path: "/crop-analytics", description: "Monitor crop health using satellite imagery" },
    { name: "Marketplace", path: "/marketplace", description: "Buy supplies or sell produce directly" },
    { name: "Yield Prediction", path: "/yield-prediction", description: "Estimate crop production with data-driven insights" },
    { name: "Farm Monitoring", path: "/farm-map", description: "Visualize your farm with GIS mapping" },
    { name: "AI Assistant", path: "/assistant", description: "Get instant answers to farming questions" },
    { name: "Govt. Schemes & Alerts", path: "/govt-schemes", description: "Stay updated with agricultural notifications" },
    { name: "Community Forum", path: "/community", description: "Connect with fellow farmers to share knowledge" },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
          isScrolled
            ? 'bg-background/80 backdrop-blur-md py-3 shadow-sm'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="size-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <span className="font-semibold text-xl tracking-tight">
              AgriVision <span className="text-primary">360</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground/80 hover:text-primary transition-colors">
              Home
            </Link>
            
            {/* Features Dropdown with HoverCard for enhanced UI */}
            <HoverCard openDelay={0} closeDelay={100}>
              <HoverCardTrigger asChild>
                <div className="relative group">
                  <a 
                    href="#features" 
                    className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
                    onClick={scrollToFeatures}
                  >
                    Features <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
                  </a>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-0 bg-background/95 backdrop-blur-lg border border-border/50 shadow-lg">
                <div className="grid gap-1 p-2">
                  {featuresItems.map((item) => (
                    <Link 
                      key={item.name} 
                      to={item.path}
                      className="flex flex-col p-3 rounded-md hover:bg-accent transition-colors"
                    >
                      <div className="font-medium text-foreground">{item.name}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </Link>
                  ))}
                </div>
              </HoverCardContent>
            </HoverCard>
            
            <Link to="/marketplace" className="text-foreground/80 hover:text-primary transition-colors relative group">
              Marketplace
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-primary transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <a 
              href="#contact" 
              className="text-foreground/80 hover:text-primary transition-colors relative group" 
              onClick={handleContactClick}
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>

          {/* <div className="hidden md:flex items-center gap-4">
            {onLoginClick && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onLoginClick}
                  className="rounded-full px-5"
                >
                  Log In
                </Button>
                <Button
                  size="sm"
                  onClick={onLoginClick}
                  className="rounded-full px-5 bg-primary hover:bg-primary/90"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div> */}

          <button
            className="md:hidden text-foreground focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="container mx-auto px-4 py-4 bg-background/95 backdrop-blur-md border-t border-border/50">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="py-2 text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              {/* Mobile Features submenu */}
              <div className="py-2">
                <a 
                  href="#features" 
                  className="text-foreground/80 hover:text-primary transition-colors mb-2 flex items-center"
                  onClick={scrollToFeatures}
                >
                  Features <ChevronDown className="h-4 w-4 ml-1" />
                </a>
                <div className="pl-4 flex flex-col space-y-2 mt-2">
                  {featuresItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="py-1 text-foreground/80 hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </Link>
                  ))}
                </div>
              </div>
              
              <Link
                to="/marketplace"
                className="py-2 text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Marketplace
              </Link>
              <Link
                to="/about"
                className="py-2 text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <a
                href="#contact"
                className="py-2 text-foreground/80 hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  setIsContactModalOpen(true);
                }}
              >
                Contact
              </a>
              {onLoginClick && (
                <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
                  <Button
                    variant="outline"
                    onClick={() => {
                      onLoginClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-center"
                  >
                    Log In
                  </Button>
                  <Button
                    onClick={() => {
                      onLoginClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-center bg-primary hover:bg-primary/90"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Contact Form Modal */}
      <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Us</DialogTitle>
            <DialogDescription>
              Fill out the form below and we'll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <ContactForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
