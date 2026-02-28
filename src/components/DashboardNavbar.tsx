
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Menu, 
  X, 
  Home, 
  CloudRain, 
  Sprout, 
  BarChart, 
  Map, 
  ShoppingCart, 
  Activity, 
  MessageSquare, 
  Bot, 
  User 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import logo from '../../assets/images/Logo.png';

const DashboardNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { icon: <Home className="h-4 w-4 mr-2" />, name: "Home", path: "/" },
    { icon: <CloudRain className="h-4 w-4 mr-2" />, name: "Weather & Climate", path: "/weather" },
    { icon: <Sprout className="h-4 w-4 mr-2" />, name: "Crop Analytics", path: "/crop-analytics" },
    { icon: <BarChart className="h-4 w-4 mr-2" />, name: "Market Insights", path: "/market-insights" },
    { icon: <Map className="h-4 w-4 mr-2" />, name: "Farm Map", path: "/farm-map" },
    { icon: <ShoppingCart className="h-4 w-4 mr-2" />, name: "Marketplace", path: "/marketplace" },
    { icon: <Activity className="h-4 w-4 mr-2" />, name: "Livestock", path: "/livestock" },
    { icon: <MessageSquare className="h-4 w-4 mr-2" />, name: "Community", path: "/community" },
    { icon: <Bot className="h-4 w-4 mr-2" />, name: "AI Assistant", path: "/assistant" },
  ];

  return (
    <nav className="bg-background/80 backdrop-blur-md py-3 shadow-sm border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="AgriVision360" className="h-10 w-10 object-contain" />
          <span className="font-bold text-xl text-primary">AgriVision360</span>
        </Link>

        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid grid-cols-2 gap-3 p-4 md:w-[400px] lg:w-[500px]">
                    {navItems.slice(1).map((item, index) => (
                      <li key={index}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={item.path}
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                              location.pathname === item.path ? "bg-accent text-accent-foreground" : ""
                            )}
                          >
                            <div className="flex items-center">
                              {item.icon}
                              <div className="text-sm font-medium leading-none">{item.name}</div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/#about" className={navigationMenuTriggerStyle()}>About</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/#contact" className={navigationMenuTriggerStyle()}>Contact</Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
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
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="container mx-auto px-4 py-4 bg-background/95 backdrop-blur-md">
          <div className="flex flex-col space-y-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={cn(
                  "flex items-center py-2 px-3 rounded-md text-foreground/80 hover:text-primary hover:bg-accent/50 transition-colors",
                  location.pathname === item.path ? "bg-accent text-primary font-medium" : ""
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="border-t border-border/50 pt-2 mt-2">
              <Link
                to="/#about"
                className="flex items-center py-2 px-3 rounded-md text-foreground/80 hover:text-primary hover:bg-accent/50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/#contact"
                className="flex items-center py-2 px-3 rounded-md text-foreground/80 hover:text-primary hover:bg-accent/50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
