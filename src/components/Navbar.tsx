
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

import { 
  CloudRain, 
  Sprout, 
  ShoppingCart, 
  Map, 
  Bot,
  Bell,
  Wheat,
  MessageSquare
} from 'lucide-react';

import Logo from './Logo';
import { ModeToggle } from './ui/ThemeToggle';

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
      window.location.href = '/#features';
    } else {
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const featuresItems = [
    { name: "Weather & Climate", path: "/weather", icon: <CloudRain className="h-4 w-4" /> },
    { name: "Crop Analytics", path: "/crop-analytics", icon: <Sprout className="h-4 w-4" /> },
    { name: "Marketplace", path: "/marketplace", icon: <ShoppingCart className="h-4 w-4" /> },
    { name: "Yield Prediction", path: "/yield-prediction", icon: <Wheat className="h-4 w-4" /> },
    { name: "Farm Monitoring", path: "/farm-map", icon: <Map className="h-4 w-4" /> },
    { name: "AI Assistant", path: "/assistant", icon: <Bot className="h-4 w-4" /> },
    { name: "Govt. Schemes & Alerts", path: "/govt-schemes", icon: <Bell className="h-4 w-4" /> },
    { name: "Community Forum", path: "/community", icon: <MessageSquare className="h-4 w-4" /> },
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
            <Logo />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={cn(
                "text-foreground/80 hover:text-primary transition-colors relative group",
                isActive('/') && "text-primary font-medium"
              )}
            >
              Home
              <span className={cn(
                "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                isActive('/') ? "w-full" : "w-0 group-hover:w-full"
              )}></span>
            </Link>
            
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
              <HoverCardContent className="w-64 p-0 bg-background/95 backdrop-blur-lg border border-border/50 shadow-lg">
                <div className="grid gap-1 p-2">
                  {featuresItems.map((item) => (
                    <Link 
                      key={item.name} 
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-colors",
                        isActive(item.path) && "bg-accent/80 text-primary"
                      )}
                    >
                      {item.icon}
                      <div className="font-medium text-foreground">{item.name}</div>
                    </Link>
                  ))}
                </div>
              </HoverCardContent>
            </HoverCard>
            
            <Link 
              to="/marketplace" 
              className={cn(
                "text-foreground/80 hover:text-primary transition-colors relative group",
                isActive('/marketplace') && "text-primary font-medium"
              )}
            >
              Marketplace
              <span className={cn(
                "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                isActive('/marketplace') ? "w-full" : "w-0 group-hover:w-full"
              )}></span>
            </Link>
            
            <Link 
              to="/about" 
              className={cn(
                "text-foreground/80 hover:text-primary transition-colors relative group",
                isActive('/about') && "text-primary font-medium"
              )}
            >
              About
              <span className={cn(
                "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                isActive('/about') ? "w-full" : "w-0 group-hover:w-full"
              )}></span>
            </Link>
            
            <a 
              href="#contact" 
              className="text-foreground/80 hover:text-primary transition-colors relative group" 
              onClick={handleContactClick}
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <ModeToggle />
          </div>

          <button
            className="md:hidden text-foreground focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

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
                className={cn(
                  "py-2 text-foreground/80 hover:text-primary transition-colors",
                  isActive('/') && "text-primary font-medium"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              
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
                      className={cn(
                        "py-1 text-foreground/80 hover:text-primary transition-colors flex items-center gap-2",
                        isActive(item.path) && "text-primary font-medium"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <div className="font-medium">{item.name}</div>
                    </Link>
                  ))}
                </div>
              </div>
              
              <Link
                to="/marketplace"
                className={cn(
                  "py-2 text-foreground/80 hover:text-primary transition-colors",
                  isActive('/marketplace') && "text-primary font-medium"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Marketplace
              </Link>
              
              <Link
                to="/about"
                className={cn(
                  "py-2 text-foreground/80 hover:text-primary transition-colors",
                  isActive('/about') && "text-primary font-medium"
                )}
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
