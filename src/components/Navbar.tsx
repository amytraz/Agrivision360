
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import ContactForm from './ContactForm';

interface NavbarProps {
  onLoginClick: () => void;
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
          <a href="/" className="flex items-center gap-2 group">
            <div className="size-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <span className="font-semibold text-xl tracking-tight">
              AgriVision <span className="text-primary">360</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-foreground/80 hover:text-primary transition-colors story-link">
              Features
            </a>
            <a href="#marketplace" className="text-foreground/80 hover:text-primary transition-colors story-link">
              Marketplace
            </a>
            <a href="#about" className="text-foreground/80 hover:text-primary transition-colors story-link">
              About
            </a>
            <a href="#contact" className="text-foreground/80 hover:text-primary transition-colors story-link" onClick={handleContactClick}>
              Contact
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
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
              <a
                href="#features"
                className="py-2 text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#marketplace"
                className="py-2 text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Marketplace
              </a>
              <a
                href="#about"
                className="py-2 text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
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
