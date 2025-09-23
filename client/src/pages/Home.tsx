import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Stethoscope, Users, BookOpen, Shield, Search, Heart, Bone, Brain } from 'lucide-react';
import surgicalBg from '@assets/stock_images/surgical_operating_r_269f4a87.jpg';

export default function Home() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div 
        className="min-h-screen relative"
        style={{
          backgroundImage: `url(${surgicalBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 surgical-bg"></div>
        
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-primary/20 backdrop-blur-md">
              <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 10L21 13V11C21 15.97 16.97 20 12 20S3 15.97 3 11V13L9 10L3 7V9C3 14.97 7.03 19 12 19S21 14.97 21 9Z"/>
              </svg>
            </div>
            <h1 className="text-5xl font-bold text-white mb-6">SurgiPrep</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Your professional surgical technology resource and community hub
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => setLocation('/auth')}
                data-testid="button-get-started"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setLocation('/auth')}
                data-testid="button-sign-in"
              >
                Sign In
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="text-center glass-card bg-transparent backdrop-blur-xl border-white/10">
              <CardHeader>
                <Stethoscope className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg text-white">Procedure Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/70">
                  Detailed surgical procedures with instrumentation and setup guides
                </p>
              </CardContent>
            </Card>

            <Card className="text-center glass-card bg-transparent backdrop-blur-xl border-white/10">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg text-white">Professional Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/70">
                  Connect with certified surgical technologists worldwide
                </p>
              </CardContent>
            </Card>

            <Card className="text-center glass-card bg-transparent backdrop-blur-xl border-white/10">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg text-white">Personal Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/70">
                  Create and sync your preference cards across devices
                </p>
              </CardContent>
            </Card>

            <Card className="text-center glass-card bg-transparent backdrop-blur-xl border-white/10">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg text-white">HIPAA Compliant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/70">
                  Secure, compliant platform designed for healthcare professionals
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">Choose Your Plan</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="glass-card bg-transparent backdrop-blur-xl border-white/10" data-testid="card-pricing-free">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Free</CardTitle>
                  <div className="text-3xl font-bold text-white">$0<span className="text-lg font-normal text-white/70">/month</span></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-white/70">
                      ✓ 1 specialty access
                    </p>
                    <p className="flex items-center gap-2 text-white/70">
                      ✓ Basic procedure guides
                    </p>
                    <p className="flex items-center gap-2 text-white/70">
                      ✓ Community access
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card bg-transparent backdrop-blur-xl border-white/10 relative" data-testid="card-pricing-standard">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-white border-primary">Most Popular</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-white">Standard</CardTitle>
                  <div className="text-3xl font-bold text-white">$9.99<span className="text-lg font-normal text-white/70">/month</span></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-white/70">
                      ✓ 3 specialty access
                    </p>
                    <p className="flex items-center gap-2 text-white/70">
                      ✓ Detailed procedure guides
                    </p>
                    <p className="flex items-center gap-2 text-white/70">
                      ✓ Personal notes & sync
                    </p>
                    <p className="flex items-center gap-2 text-white/70">
                      ✓ Offline access
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card bg-transparent backdrop-blur-xl border-white/10" data-testid="card-pricing-premium">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Premium</CardTitle>
                  <div className="text-3xl font-bold text-white">$19.99<span className="text-lg font-normal text-white/70">/month</span></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-white/70">
                      ✓ Unlimited specialties
                    </p>
                    <p className="flex items-center gap-2 text-white/70">
                      ✓ All procedure content
                    </p>
                    <p className="flex items-center gap-2 text-white/70">
                      ✓ Advanced features
                    </p>
                    <p className="flex items-center gap-2 text-white/70">
                      ✓ Priority support
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${surgicalBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 surgical-bg"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between p-4 glass backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 10L21 13V11C21 15.97 16.97 20 12 20S3 15.97 3 11V13L9 10L3 7V9C3 14.97 7.03 19 12 19S21 14.97 21 9Z"/>
            </svg>
            <span className="text-xl font-bold text-white">SurgiPrep</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-sm">{user.firstName} {user.lastName}, CST</span>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" data-testid="button-user-menu">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </Button>
          </div>
        </header>
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome Back, {user.firstName}!
            </h1>
            <p className="text-white/70">
              Ready for today's cases?
            </p>
          </div>

          {/* Your Specialties */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Your Specialties</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {/* Mock specialties based on reference images */}
              <div className="flex flex-col items-center gap-2 min-w-[80px]">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center relative">
                  <Bone className="w-8 h-8 text-white" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <span className="text-xs text-white text-center">Orthopedics</span>
              </div>
              
              <div className="flex flex-col items-center gap-2 min-w-[80px]">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <span className="text-xs text-white text-center">OBGYN</span>
              </div>
              
              <div className="flex flex-col items-center gap-2 min-w-[80px]">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <span className="text-xs text-white text-center">General Surgery</span>
              </div>
            </div>
          </div>

          {/* Quick Access */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Quick Access</h2>
            <div className="grid gap-4">
              <Card className="glass-card bg-transparent backdrop-blur-xl border-white/10 hover-elevate cursor-pointer" data-testid="card-procedures">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Search className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Search Preference Cards</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card bg-transparent backdrop-blur-xl border-white/10 hover-elevate cursor-pointer" data-testid="card-community">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">My Community Forum</h3>
                    </div>
                    <div className="ml-auto">
                      <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Community Highlights */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Community Highlights</h2>
            <div className="space-y-4">
              <Card className="glass-card bg-transparent backdrop-blur-xl border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-green-400 font-medium">HELPFUL HINT</span>
                        <span className="text-sm text-white/60">Verified User: Dr. Chen</span>
                      </div>
                      <p className="text-white mb-2">Always have a long DeBakey ready for arterial cases.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card bg-transparent backdrop-blur-xl border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-white mb-2">Anyone worked with Dr. Lee at St. Jude's? music vibe?</p>
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <span>User: ORTech22</span>
                        <span>•</span>
                        <span>What's his-vibe?</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass-card bg-transparent backdrop-blur-xl border-white/10 hover-elevate cursor-pointer" data-testid="card-procedures-alt">
            <CardHeader>
              <Stethoscope className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-white">Browse Procedures</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70">
                Access surgical procedure guides for your specialties
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate cursor-pointer" data-testid="card-community">
            <CardHeader>
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Community Forum</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Connect with fellow surgical technologists
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate cursor-pointer" data-testid="card-notes">
            <CardHeader>
              <BookOpen className="h-8 w-8 text-primary mb-2" />
              <CardTitle>My Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View and manage your personal procedure notes
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card bg-transparent backdrop-blur-xl border-white/10 hover-elevate cursor-pointer" data-testid="card-notes">
            <CardHeader>
              <BookOpen className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-white">My Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70">
                View and manage your personal procedure notes
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card bg-transparent backdrop-blur-xl border-white/10 hover-elevate cursor-pointer" data-testid="card-profile">
            <CardHeader>
              <Shield className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-white">Profile Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70">
                Manage your account and subscription
              </p>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </div>
  );
}