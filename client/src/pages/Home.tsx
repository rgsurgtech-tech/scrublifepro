import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Stethoscope, Users, BookOpen, Shield } from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-primary mb-6">SurgiTech Connect</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
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
            <Card className="text-center">
              <CardHeader>
                <Stethoscope className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">Procedure Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Detailed surgical procedures with instrumentation and setup guides
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">Professional Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Connect with certified surgical technologists worldwide
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">Personal Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Create and sync your preference cards across devices
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">HIPAA Compliant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Secure, compliant platform designed for healthcare professionals
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">Choose Your Plan</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Free</CardTitle>
                  <div className="text-3xl font-bold">$0<span className="text-lg font-normal">/month</span></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      ✓ 1 specialty access
                    </p>
                    <p className="flex items-center gap-2">
                      ✓ Basic procedure guides
                    </p>
                    <p className="flex items-center gap-2">
                      ✓ Community access
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary">Most Popular</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">Standard</CardTitle>
                  <div className="text-3xl font-bold">$9.99<span className="text-lg font-normal">/month</span></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      ✓ 3 specialty access
                    </p>
                    <p className="flex items-center gap-2">
                      ✓ Detailed procedure guides
                    </p>
                    <p className="flex items-center gap-2">
                      ✓ Personal notes & sync
                    </p>
                    <p className="flex items-center gap-2">
                      ✓ Offline access
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Premium</CardTitle>
                  <div className="text-3xl font-bold">$19.99<span className="text-lg font-normal">/month</span></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      ✓ Unlimited specialties
                    </p>
                    <p className="flex items-center gap-2">
                      ✓ All procedure content
                    </p>
                    <p className="flex items-center gap-2">
                      ✓ Advanced features
                    </p>
                    <p className="flex items-center gap-2">
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Welcome back, {user.firstName}!
          </h1>
          <p className="text-muted-foreground">
            Ready to enhance your surgical knowledge today?
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover-elevate cursor-pointer" data-testid="card-procedures">
            <CardHeader>
              <Stethoscope className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Browse Procedures</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
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

          <Card className="hover-elevate cursor-pointer" data-testid="card-profile">
            <CardHeader>
              <Shield className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage your account and subscription
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Specialties</h2>
          <div className="flex flex-wrap gap-2">
            {user.selectedSpecialties.map((specialty) => (
              <Badge key={specialty} variant="secondary">
                {specialty}
              </Badge>
            ))}
            {user.selectedSpecialties.length === 0 && (
              <p className="text-muted-foreground">
                No specialties selected. <Button variant="ghost" className="p-0 h-auto">Add specialties</Button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}