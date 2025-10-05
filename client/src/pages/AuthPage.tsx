import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { apiRequest } from '@/lib/queryClient';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import surgicalBg from '@assets/stock_images/surgical_operating_r_0bf4ee15.jpg';
import logoImage from '@assets/Gemini_Generated_Image_ne5nqdne5nqdne5n_1759679028939.png';

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { refetch } = useAuth();

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Registration form state
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await apiRequest('POST', '/api/auth/login', credentials);
      return response.json();
    },
    onSuccess: () => {
      refetch();
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.'
      });
      setLocation('/');
    },
    onError: (error: Error) => {
      toast({
        title: 'Login failed',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (userData: any) => {
      if (userData.password !== userData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      const { confirmPassword, ...data } = userData;
      const response = await apiRequest('POST', '/api/auth/register', data);
      return response.json();
    },
    onSuccess: () => {
      refetch();
      toast({
        title: 'Account created!',
        description: 'Welcome to Scrubbable. Please select your specialties to get started.'
      });
      setLocation('/');
    },
    onError: (error: Error) => {
      toast({
        title: 'Registration failed',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginData);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(registerData);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url(${surgicalBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 surgical-bg"></div>
      
      {/* Glass card container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logoImage} alt="Scrubbable" className="h-64 mx-auto mb-4" />
          <p className="text-white/90 text-lg">Your Surgical Readiness Platform</p>
        </div>

        <Card className="glass-card border-0 bg-transparent backdrop-blur-xl">
          <CardContent className="p-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-md border-white/20">
                <TabsTrigger 
                  value="login" 
                  data-testid="tab-login"
                  className="text-white data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger 
                  value="register" 
                  data-testid="tab-register"
                  className="text-white data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Register
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-6 mt-6">
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                      <Input
                        id="email"
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        placeholder="Email Address"
                        required
                        className="glass-input pl-10 h-12 text-white placeholder:text-white/60 border-white/20"
                        data-testid="input-login-email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
                      <Input
                        id="password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        placeholder="Password"
                        required
                        className="glass-input pl-10 h-12 text-white placeholder:text-white/60 border-white/20"
                        data-testid="input-login-password"
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 glass-button text-white font-semibold text-lg tracking-wide"
                    disabled={loginMutation.isPending}
                    data-testid="button-login"
                  >
                    {loginMutation.isPending ? 'SIGNING IN...' : 'LOG IN'}
                  </Button>
                </form>
                
                <div className="mt-6 text-center">
                  <button className="text-primary hover:underline" data-testid="link-forgot-password">
                    Forgot Password?
                  </button>
                </div>
                
                <div className="mt-4 flex justify-between text-center">
                  <button className="text-primary hover:underline" data-testid="link-sign-up">
                    Sign Up
                  </button>
                  <button className="text-primary hover:underline" data-testid="link-learn-more">
                    Learn More
                  </button>
                </div>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4 mt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input
                        id="firstName"
                        value={registerData.firstName}
                        onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                        placeholder="First name"
                        required
                        className="glass-input text-white placeholder:text-white/60 border-white/20"
                        data-testid="input-first-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        id="lastName"
                        value={registerData.lastName}
                        onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                        placeholder="Last name"
                        required
                        className="glass-input text-white placeholder:text-white/60 border-white/20"
                        data-testid="input-last-name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Input
                      id="registerEmail"
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      placeholder="Enter your email"
                      required
                      className="glass-input text-white placeholder:text-white/60 border-white/20"
                      data-testid="input-register-email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      id="registerPassword"
                      type="password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      placeholder="Create a password"
                      required
                      className="glass-input text-white placeholder:text-white/60 border-white/20"
                      data-testid="input-register-password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      placeholder="Confirm your password"
                      required
                      className="glass-input text-white placeholder:text-white/60 border-white/20"
                      data-testid="input-confirm-password"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full glass-button text-white font-semibold"
                    disabled={registerMutation.isPending}
                    data-testid="button-register"
                  >
                    {registerMutation.isPending ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}