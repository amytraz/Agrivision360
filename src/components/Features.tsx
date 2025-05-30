
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart, 
  Map, 
  CloudRain, 
  Sprout, 
  ShoppingCart, 
  Activity, 
  MessageSquare, 
  Bot,
  Bell,
  Wheat
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <CloudRain className="h-10 w-10 text-primary" />,
      title: "Weather & Climate",
      description: "Access real-time weather data, forecasts, and historical patterns tailored to your farm's location.",
      url: "/weather"
    },
    {
      icon: <Sprout className="h-10 w-10 text-sage-500" />,
      title: "Crop Analytics",
      description: "Monitor crop health, growth stages, and potential issues using satellite imagery and IoT sensors.",
      url: "/crop-analytics"
    },
    {
      icon: <ShoppingCart className="h-10 w-10 text-earth-600" />,
      title: "Marketplace",
      description: "Buy farm supplies or sell your produce directly to consumers and businesses through our platform.",
      url: "/marketplace"
    },
  
    {
      icon: <Wheat className="h-10 w-10 text-sky-500" />,
      title: "Yield Prediction",
      description: "Estimate crop production using data-driven insights for better planning and decision-making.",
      url: "/yield-prediction"
    },

    {
      icon: <Map className="h-10 w-10 text-earth-500" />,
      title: "Farm Monitoring",
      description: "Visualize your farm with GIS mapping, field boundaries, crop zones, and resource allocation.",
      url: "/farm-map"
    },

    {
      icon: <Bot className="h-10 w-10 text-primary" />,
      title: "AI Assistant",
      description: "Get instant answers to your farming questions from our specialized agricultural chatbot.",
      url: "/assistant"
    },
    {
      icon: <Bell className="h-10 w-10 text-primary" />,
      title: "Govt. Schemes & Alerts",
      description: "Stay updated with the latest government schemes, subsidies, and important agricultural notifications.",
      url: "/govt-schemes"
    },
   
    {
      icon: <MessageSquare className="h-10 w-10 text-sky-600" />,
      title: "Community Forum",
      description: "Connect with fellow farmers to share knowledge, ask questions, and discuss agricultural topics.",
      url: "/community"
    }
   
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,190,120,0.05),transparent_35%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(210,190,110,0.05),transparent_35%)]"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            Comprehensive Smart Farming Solutions
          </h2>
          <p className="text-lg text-foreground/80 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            AgriVision 360 provides all the tools you need to transform your agricultural operations 
            with cutting-edge technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Link 
              to={feature.url}
              key={index} 
              className="bg-card rounded-2xl p-6 shadow-sm border border-border/40 hover:border-primary/20 transition-all duration-300 hover:shadow-md hover:translate-y-[-4px] group animate-fade-in cursor-pointer"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="bg-muted rounded-xl p-4 inline-block mb-5 group-hover:bg-primary/10 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
