
import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AuthModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthModal = ({ open, setOpen }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<string>('login');
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-2xl">
        <div className="relative w-full h-full">
          {/* Background with blur and gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-sage-100/30 via-background to-earth-100/20 z-0" />
          
          <div className="relative z-10 p-6">
            <div className="absolute top-2 right-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setOpen(false)}
                className="rounded-full h-8 w-8 text-foreground/70 hover:text-foreground"
              >
                <X size={18} />
              </Button>
            </div>
          
            <Tabs 
              defaultValue="login" 
              value={activeTab} 
              onValueChange={handleTabChange}
              className="w-full"
            >
              <div className="flex flex-col items-center mb-8">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <div className="size-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">A</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-center mb-1">
                  Welcome to AgriVision 360
                </h2>
                <p className="text-foreground/70 text-center max-w-xs">
                  {activeTab === 'login' 
                    ? 'Sign in to access your smart farming dashboard'
                    : 'Create an account to start your smart farming journey'}
                </p>
              </div>
            
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="mt-0">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-4 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" />
                        <Input 
                          id="email" 
                          placeholder="you@example.com" 
                          type="email" 
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a 
                          href="#" 
                          className="text-sm text-primary hover:underline"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <div className="relative">
                        <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" />
                        <Input 
                          id="password" 
                          placeholder="••••••••" 
                          type="password" 
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full mb-4" size="lg">
                    Sign In
                  </Button>
                  
                  <div className="relative flex items-center justify-center mb-4">
                    <hr className="w-full border-t border-border" />
                    <span className="absolute bg-background px-2 text-xs text-foreground/50">
                      OR CONTINUE WITH
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {['google', 'apple', 'facebook'].map((provider) => (
                      <Button
                        key={provider}
                        variant="outline"
                        className="flex-1"
                      >
                        {provider === 'google' && (
                          <svg width="18" height="18" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                          </svg>
                        )}
                        {provider === 'apple' && (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5723 12.0664C17.5898 14.5215 19.3125 15.4473 19.3301 15.4561C19.3125 15.5088 19.0136 16.4873 18.3106 17.5078C17.7422 18.3574 17.1328 19.2012 16.1543 19.2188C15.2109 19.2363 14.9033 18.6328 13.8213 18.6328C12.7305 18.6328 12.3887 19.2012 11.5039 19.2363C10.5605 19.2715 9.86328 18.3223 9.28564 17.4814C8.10175 15.7598 7.19337 12.5488 8.40651 10.3477C9.00489 9.25879 10.0518 8.56836 11.1953 8.55113C12.0859 8.5336 12.9062 9.19629 13.4482 9.19629C13.9902 9.19629 14.9775 8.40137 16.0596 8.53613C16.5752 8.55367 17.625 8.77442 18.252 9.60059C18.1816 9.65235 17.5635 10.0117 17.5723 12.0664ZM15.6846 7.06739C16.1651 6.48438 16.5069 5.66016 16.4014 4.83594C15.6759 4.8623 14.7764 5.30274 14.2695 5.87793C13.8213 6.37989 13.4043 7.22412 13.5273 8.0306C14.334 8.09239 15.2041 7.65039 15.6846 7.06739Z" fill="currentColor"/>
                          </svg>
                        )}
                        {provider === 'facebook' && (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" fill="#1877F2"/>
                          </svg>
                        )}
                      </Button>
                    ))}
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="register" className="mt-0">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-4 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" />
                        <Input 
                          id="name" 
                          placeholder="John Doe" 
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" />
                        <Input 
                          id="register-email" 
                          placeholder="you@example.com" 
                          type="email" 
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <div className="relative">
                        <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" />
                        <Input 
                          id="register-password" 
                          placeholder="••••••••" 
                          type="password" 
                          className="pl-10"
                        />
                      </div>
                      <p className="text-xs text-foreground/50">
                        Password must be at least 8 characters long
                      </p>
                    </div>
                  </div>
                  
                  <Button className="w-full mb-4 group" size="lg">
                    Create Account
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                  
                  <div className="relative flex items-center justify-center mb-4">
                    <hr className="w-full border-t border-border" />
                    <span className="absolute bg-background px-2 text-xs text-foreground/50">
                      OR CONTINUE WITH
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {['google', 'apple', 'facebook'].map((provider) => (
                      <Button
                        key={provider}
                        variant="outline"
                        className="flex-1"
                      >
                        {provider === 'google' && (
                          <svg width="18" height="18" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                          </svg>
                        )}
                        {provider === 'apple' && (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5723 12.0664C17.5898 14.5215 19.3125 15.4473 19.3301 15.4561C19.3125 15.5088 19.0136 16.4873 18.3106 17.5078C17.7422 18.3574 17.1328 19.2012 16.1543 19.2188C15.2109 19.2363 14.9033 18.6328 13.8213 18.6328C12.7305 18.6328 12.3887 19.2012 11.5039 19.2363C10.5605 19.2715 9.86328 18.3223 9.28564 17.4814C8.10175 15.7598 7.19337 12.5488 8.40651 10.3477C9.00489 9.25879 10.0518 8.56836 11.1953 8.55113C12.0859 8.5336 12.9062 9.19629 13.4482 9.19629C13.9902 9.19629 14.9775 8.40137 16.0596 8.53613C16.5752 8.55367 17.625 8.77442 18.252 9.60059C18.1816 9.65235 17.5635 10.0117 17.5723 12.0664ZM15.6846 7.06739C16.1651 6.48438 16.5069 5.66016 16.4014 4.83594C15.6759 4.8623 14.7764 5.30274 14.2695 5.87793C13.8213 6.37989 13.4043 7.22412 13.5273 8.0306C14.334 8.09239 15.2041 7.65039 15.6846 7.06739Z" fill="currentColor"/>
                          </svg>
                        )}
                        {provider === 'facebook' && (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" fill="#1877F2"/>
                          </svg>
                        )}
                      </Button>
                    ))}
                  </div>
                  
                  <p className="text-xs text-center mt-6 text-foreground/60">
                    By creating an account, you agree to our{' '}
                    <a href="#" className="text-primary hover:underline">Terms of Service</a> and{' '}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
