import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="text-foreground/80 mt-4">
              A comprehensive farm management solution.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-foreground/80 hover:text-primary">Home</Link></li>
              <li><Link to="/about" className="text-foreground/80 hover:text-primary">About</Link></li>
              <li><Link to="/marketplace" className="text-foreground/80 hover:text-primary">Marketplace</Link></li>
              <li><Link to="#contact" className="text-foreground/80 hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/80 hover:text-primary"><Facebook /></a>
              <a href="#" className="text-foreground/80 hover:text-primary"><Twitter /></a>
              <a href="#" className="text-foreground/80 hover:text-primary"><Instagram /></a>
              <a href="#" className="text-foreground/80 hover:text-primary"><Linkedin /></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-foreground/80 mb-4">
              Stay up to date with our latest news and updates.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-input border border-border rounded-l-md px-4 py-2 w-full"
              />
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-r-md">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-border/50 mt-8 pt-8 text-center text-foreground/60">
          <p>&copy; {new Date().getFullYear()} AgriVision 360. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
