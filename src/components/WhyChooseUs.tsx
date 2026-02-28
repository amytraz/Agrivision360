import React from 'react';
import { Check } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    "Real-time data and analytics",
    "AI-powered insights and recommendations",
    "Seamless integration with IoT devices",
    "User-friendly and intuitive interface",
  ];

  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose AgriVision 360?</h2>
            <p className="text-lg text-foreground/80 mb-8">
              AgriVision 360 is a comprehensive farm management solution that empowers farmers to make data-driven decisions and optimize their operations.
            </p>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="bg-primary/20 text-primary rounded-full p-1">
                    <Check className="h-5 w-5" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <img src="/placeholder.svg" alt="Why Choose Us" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
