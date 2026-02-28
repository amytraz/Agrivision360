import React from 'react';
import { ArrowRight, Zap, LayoutDashboard, Sprout, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onGetStartedClick: () => void;
}

const Hero = ({ onGetStartedClick }: HeroProps) => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex flex-col justify-center bg-background">
      {/* Background gradient & Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto space-y-8 mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2 animate-fade-in border border-primary/20 shadow-sm backdrop-blur-sm">
            <Zap size={14} className="mr-2 fill-primary" />
            <span>Next Gen Smart Farming is Here</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance animate-fade-in bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70" style={{ animationDelay: '0.1s' }}>
            Manage Your Farm Like a <br/>
            <span className="text-primary">Tech Giant</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance animate-fade-in leading-relaxed" style={{ animationDelay: '0.2s' }}>
            AgriVision 360 brings enterprise-grade analytics, AI-driven insights, and real-time monitoring to your fingertips. 
            Transform data into harvest.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button
              size="lg"
              onClick={onGetStartedClick}
              className="rounded-full px-8 h-12 text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all hover:scale-105"
            >
              Launch Dashboard
              <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 h-12 text-base font-semibold border-border/50 bg-background/50 backdrop-blur-sm hover:bg-accent/50"
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Demo
            </Button>
          </div>
        </div>

        {/* Dashboard Preview Mockup */}
        <div className="relative mx-auto max-w-6xl perspective-[2000px] animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="relative rounded-xl border border-border/40 bg-background/40 shadow-2xl backdrop-blur-md transform transition-transform duration-1000 ease-out overflow-hidden group hover:scale-[1.01] hover:shadow-primary/10">
                {/* Fake Browser Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-muted/30">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="mx-auto text-xs text-muted-foreground/70 font-medium bg-background/30 px-3 py-1 rounded-md border border-border/20 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        agrivision360.com/dashboard
                    </div>
                </div>
                
                {/* Dashboard Content Mockup */}
                <div className="grid grid-cols-12 h-[400px] md:h-[600px] bg-background/60">
                    {/* Sidebar */}
                    <div className="hidden md:flex col-span-2 border-r border-border/40 p-4 flex-col gap-4 bg-muted/10">
                        <div className="h-8 w-8 rounded-lg bg-primary/20 mb-2 flex items-center justify-center">
                            <LayoutDashboard className="h-5 w-5 text-primary" />
                        </div>
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className={`h-8 w-full rounded-md ${i === 1 ? 'bg-primary/10 border border-primary/20' : 'bg-transparent hover:bg-muted/30'}`} />
                        ))}
                    </div>
                    
                    {/* Main Content */}
                    <div className="col-span-12 md:col-span-10 p-6 overflow-hidden relative">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-8">
                            <div className="space-y-2">
                                <div className="h-6 w-48 rounded-md bg-foreground/10" />
                                <div className="h-4 w-32 rounded-md bg-foreground/5" />
                            </div>
                            <div className="flex gap-3">
                                <div className="h-9 w-9 rounded-full bg-foreground/5 border border-border/20" />
                                <div className="h-9 w-9 rounded-full bg-foreground/5 border border-border/20" />
                            </div>
                        </div>
                        
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            {[
                                { label: "Total Yield", val: "2,450 kg", trend: "+12%", color: "bg-green-500", icon: Sprout },
                                { label: "Soil Moisture", val: "68%", trend: "Optimal", color: "bg-blue-500", icon: Zap },
                                { label: "Active Alerts", val: "3", trend: "Low Risk", color: "bg-yellow-500", icon: Zap },
                                { label: "Revenue", val: "₹ 1.2L", trend: "+8%", color: "bg-primary", icon: TrendingUp }
                            ].map((stat, i) => (
                                <div key={i} className="rounded-xl border border-border/40 bg-background/50 p-4 shadow-sm backdrop-blur-sm hover:border-primary/30 transition-colors group/card">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className={`h-8 w-8 rounded-lg ${stat.color}/10 flex items-center justify-center`}>
                                            <stat.icon className={`h-4 w-4 ${stat.color.replace('bg-', 'text-')}`} />
                                        </div>
                                        <span className="text-xs font-medium text-green-600 bg-green-500/10 px-2 py-0.5 rounded-full">{stat.trend}</span>
                                    </div>
                                    <div className="text-2xl font-bold text-foreground group-hover/card:text-primary transition-colors">{stat.val}</div>
                                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Main Chart Area */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-64">
                            <div className="col-span-2 rounded-xl border border-border/40 bg-background/50 p-5 shadow-sm backdrop-blur-sm relative overflow-hidden group-hover:border-primary/20 transition-colors">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="h-4 w-32 rounded bg-foreground/10" />
                                    <div className="h-6 w-20 rounded bg-foreground/5" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-40 flex items-end justify-between px-6 pb-6 gap-2">
                                    {[35, 55, 45, 70, 60, 85, 75, 65, 90, 80, 95, 85].map((h, idx) => (
                                        <div key={idx} className="w-full bg-primary/80 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity cursor-pointer hover:scale-y-110 origin-bottom duration-300" style={{ height: `${h}%` }} />
                                    ))}
                                </div>
                                {/* Grid lines */}
                                <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 19px, currentColor 20px)', backgroundSize: '100% 20px' }}></div>
                            </div>
                            
                            <div className="col-span-1 rounded-xl border border-border/40 bg-background/50 p-5 shadow-sm backdrop-blur-sm flex flex-col gap-4">
                                <div className="h-4 w-24 rounded bg-foreground/10 mb-2" />
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                        <div className="h-10 w-10 rounded-lg bg-muted/80" />
                                        <div className="flex-1 space-y-1">
                                            <div className="h-3 w-20 rounded bg-foreground/10" />
                                            <div className="h-2 w-12 rounded bg-foreground/5" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Glow effect behind */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-blue-500/20 to-secondary/30 blur-3xl -z-10 rounded-[3rem] opacity-50 animate-pulse-slow" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
