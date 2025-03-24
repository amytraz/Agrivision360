
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
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

  const featuresItems = [
    { name: "Crop Analytics", path: "/crop-analytics", description: "Get insights about your crops and optimize yield" },
    { name: "Weather Forecast", path: "/weather", description: "Real-time weather updates and forecasts for farming" },
    { name: "Soil Analysis", path: "/#soil-analysis", description: "Understand soil health and nutrient requirements" },
    { name: "Pest Detection", path: "/#pest-detection", description: "Identify and manage pests affecting your crops" },
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
                  <Link to="/crop-analytics" className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-1">
                    Features <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
                  </Link>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-0 bg-background/95 backdrop-blur-lg border border-border/50 shadow-lg">
                <div className="grid gap-2 p-2">
                  {featuresItems.map((item) => (
                    <Link 
                      key={item.name} 
                      to={item.path}
                      className="flex flex-col p-3 rounded-md hover:bg-accent transition-colors"
                      onClick={() => {}}
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

          <div className="hidden md:flex items-center gap-4">
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
          </div>

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
            isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
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
                <p className="text-foreground/80 hover:text-primary transition-colors mb-2">Features</p>
                <div className="pl-4 flex flex-col space-y-2">
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
