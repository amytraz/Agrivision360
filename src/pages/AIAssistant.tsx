
import React, { useState, useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { Bot, User, Send, RefreshCw, Loader2 } from 'lucide-react';

// Define message types
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

// Sample farming responses for the demo
const farmingResponses: Record<string, string> = {
  "help": "I can help you with information about crops, pests, diseases, farming practices, weather impacts, market prices, and equipment. Just ask me a specific question!",
  "crops": "Some popular crops in India include rice, wheat, cotton, sugarcane, tea, and various fruits and vegetables. What specific crop would you like to know more about?",
  "rice": "Rice cultivation requires warm temperatures (20-35°C), plenty of water, and preferably clay soil with good water retention. Best planting seasons are typically during monsoon. Common varieties include Basmati, IR-36, and Swarna.",
  "wheat": "Wheat grows best in well-drained loamy soil with moderate temperatures (15-25°C). It's typically a rabi crop in India, planted after monsoon. Popular varieties include HD-2967, PBW-550, and DBW-17.",
  "fertilizer": "Fertilizers provide essential nutrients for crop growth. NPK (Nitrogen, Phosphorus, Potassium) is the most common. For organic options, consider compost, vermicompost, or farmyard manure. Always conduct a soil test before application.",
  "pests": "Common agricultural pests include aphids, whiteflies, bollworms, and stem borers. Integrated Pest Management (IPM) combining biological controls, resistant varieties, and judicious pesticide use is recommended for sustainable control.",
  "irrigation": "Irrigation methods include flood, drip, sprinkler, and furrow irrigation. Drip irrigation is water-efficient and suitable for row crops, while sprinklers work well for larger areas. Choose based on your crop, soil type, and water availability.",
  "organic": "Organic farming avoids synthetic inputs and focuses on sustainable practices like crop rotation, green manure, compost, and biological pest control. It often yields premium prices but may have lower initial yields during transition.",
  "weather": "Weather significantly impacts farming. Monitor forecasts for planting decisions. Climate-smart practices include water harvesting, drought-resistant varieties, and protected cultivation techniques for resilience against extremes.",
  "market": "Agricultural markets can be volatile. Consider MSP (Minimum Support Price) schemes, contract farming, or direct marketing through farmer producer organizations. The e-NAM platform connects farmers to markets nationwide.",
  "default": "I don't have specific information on that topic yet. For detailed advice, consider consulting your local agricultural extension officer or the Kisan Call Centre at 1800-180-1551."
};

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AgriVision AI Assistant. How can I help you with your farming questions today?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI thinking and response
    setTimeout(() => {
      const botResponse = generateResponse(inputValue.toLowerCase());
      const botMessage: Message = {
        id: (Date.now() + 100).toString(),
        content: botResponse,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  // Simple response generator for demo purposes
  const generateResponse = (input: string): string => {
    // Check for matching keywords
    if (input.includes('help')) return farmingResponses.help;
    if (input.includes('crop')) return farmingResponses.crops;
    if (input.includes('rice')) return farmingResponses.rice;
    if (input.includes('wheat')) return farmingResponses.wheat;
    if (input.includes('fertilizer') || input.includes('fertiliser')) return farmingResponses.fertilizer;
    if (input.includes('pest') || input.includes('insect')) return farmingResponses.pests;
    if (input.includes('irrigation') || input.includes('water')) return farmingResponses.irrigation;
    if (input.includes('organic')) return farmingResponses.organic;
    if (input.includes('weather') || input.includes('climate')) return farmingResponses.weather;
    if (input.includes('market') || input.includes('price') || input.includes('sell')) return farmingResponses.market;
    
    // Default response
    return farmingResponses.default;
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: '1',
        content: "Hello! I'm your AgriVision AI Assistant. How can I help you with your farming questions today?",
        sender: 'assistant',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">AI Farming Assistant</h1>
        
        <div className="max-w-4xl mx-auto">
          <Card className="border shadow-sm">
            <CardContent className="p-0">
              <div className="flex flex-col h-[70vh]">
                {/* Header section */}
                <div className="p-4 border-b bg-card flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    <span className="font-medium">AgriVision Assistant</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleResetChat}
                    className="flex items-center gap-1 text-xs"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Reset Chat
                  </Button>
                </div>
                
                {/* Messages area */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                          <Avatar className="h-8 w-8 mt-1">
                            {message.sender === 'user' ? (
                              <User className="h-4 w-4" />
                            ) : (
                              <Bot className="h-4 w-4" />
                            )}
                          </Avatar>
                          <div 
                            className={`
                              rounded-lg px-4 py-3 
                              ${message.sender === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted'
                              }
                            `}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-[10px] mt-1 opacity-70">
                              {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex gap-3 max-w-[80%]">
                          <Avatar className="h-8 w-8 mt-1">
                            <Bot className="h-4 w-4" />
                          </Avatar>
                          <div className="rounded-lg px-4 py-3 bg-muted flex items-center gap-1">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <p className="text-sm">Typing...</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                
                {/* Input area */}
                <div className="p-4 border-t bg-background">
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }} 
                    className="flex gap-2"
                  >
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type your farming question here..."
                      className="flex-1"
                    />
                    <Button type="submit" disabled={!inputValue.trim() || isTyping}>
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </form>
                  <p className="text-xs text-muted-foreground mt-2">
                    Try asking about specific crops, pests, farming practices, or market information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AIAssistant;
