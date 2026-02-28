
import React from 'react';
import { Link } from 'react-router-dom';
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

const Features = () => {
  const features = [
    {
      icon: <CloudRain className="h-10 w-10 text-primary" />,
      title: "Weather & Climate",
      description: "Access real-time weather data, forecasts, and historical patterns tailored to your farm's location.",
      url: "/weather"
    },
    {
      icon: <Sprout className="h-10 w-10 text-primary" />,
      title: "Crop Analytics",
      description: "Monitor crop health, growth stages, and potential issues using satellite imagery and IoT sensors.",
      url: "/crop-analytics"
    },
    {
      icon: <ShoppingCart className="h-10 w-10 text-primary" />,
      title: "Marketplace",
      description: "Buy farm supplies or sell your produce directly to consumers and businesses through our platform.",
      url: "/marketplace"
    },
  
    {
      icon: <Wheat className="h-10 w-10 text-primary" />,
      title: "Yield Prediction",
      description: "Estimate crop production using data-driven insights for better planning and decision-making.",
      url: "/yield-prediction"
    },

    {
      icon: <Map className="h-10 w-10 text-primary" />,
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
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "Community Forum",
      description: "Connect with fellow farmers to share knowledge, ask questions, and discuss agricultural topics.",
      url: "/community"
    }
   
  ];

  return (
    <section id="features" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive Smart Farming Solutions
          </h2>
          <p className="text-lg text-foreground/80">
            AgriVision 360 provides all the tools you need to transform your agricultural operations 
            with cutting-edge technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Link 
              to={feature.url}
              key={index} 
              className="bg-card rounded-2xl p-6 shadow-sm border border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group cursor-pointer"
            >
              <div className="bg-primary/10 rounded-xl p-4 inline-block mb-5">
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
