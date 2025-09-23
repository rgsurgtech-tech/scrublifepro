import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Search, Users, FileText, Star, CheckCircle } from "lucide-react";

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export default function WelcomeScreen({ onGetStarted, onLogin }: WelcomeScreenProps) {
  const [selectedTier, setSelectedTier] = useState<'free' | 'standard' | 'premium'>('free');

  const tiers = [
    {
      id: 'free' as const,
      name: 'Free',
      price: 'Ad-Supported',
      description: 'Access to one surgical specialty of your choice',
      features: [
        'Full access to one specialty',
        'Standard preference cards',
        'Community forum access',
        'Basic procedure guides'
      ],
      badge: 'Most Popular'
    },
    {
      id: 'standard' as const,
      name: 'Standard',
      price: '$9.99/month',
      description: 'Ad-free access to three surgical specialties',
      features: [
        'Access to 3 specialties',
        'Custom preference cards',
        'Personal notes & media',
        'Ad-free experience',
        'Cloud sync'
      ],
      badge: 'Best Value'
    },
    {
      id: 'premium' as const,
      name: 'Premium',
      price: '$19.99/month',
      description: 'Unlimited access to all specialties plus premium features',
      features: [
        'All surgical specialties',
        'Surgeon preference database',
        'Facility insights',
        'Advanced procedures',
        'Duration estimates',
        'Priority support'
      ],
      badge: 'Pro Choice'
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col">
      {/* Header */}
      <div className="text-center py-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Stethoscope className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">SurgiTech Connect</h1>
        </div>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Your digital reference guide and professional community for surgical technology excellence
        </p>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="p-4 text-center">
          <Search className="h-6 w-6 text-primary mx-auto mb-2" />
          <h3 className="font-semibold text-sm">Quick Search</h3>
          <p className="text-xs text-muted-foreground">Find procedures in seconds</p>
        </Card>
        <Card className="p-4 text-center">
          <FileText className="h-6 w-6 text-primary mx-auto mb-2" />
          <h3 className="font-semibold text-sm">Detailed Guides</h3>
          <p className="text-xs text-muted-foreground">Step-by-step instructions</p>
        </Card>
        <Card className="p-4 text-center">
          <Users className="h-6 w-6 text-primary mx-auto mb-2" />
          <h3 className="font-semibold text-sm">Community</h3>
          <p className="text-xs text-muted-foreground">Connect with peers</p>
        </Card>
        <Card className="p-4 text-center">
          <Star className="h-6 w-6 text-primary mx-auto mb-2" />
          <h3 className="font-semibold text-sm">Offline Access</h3>
          <p className="text-xs text-muted-foreground">Works without internet</p>
        </Card>
      </div>

      {/* Subscription Tiers */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-4 text-center">Choose Your Plan</h2>
        <div className="space-y-4">
          {tiers.map((tier) => (
            <Card 
              key={tier.id}
              className={`cursor-pointer transition-colors ${
                selectedTier === tier.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedTier(tier.id)}
              data-testid={`card-tier-${tier.id}`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{tier.name}</CardTitle>
                    <CardDescription className="text-sm font-semibold text-primary">
                      {tier.price}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-xs">{tier.badge}</Badge>
                </div>
                <CardDescription className="text-xs">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <ul className="space-y-1">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-xs">
                      <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-2 pt-6">
        <Button 
          className="w-full" 
          onClick={onGetStarted}
          data-testid="button-get-started"
        >
          Get Started with {tiers.find(t => t.id === selectedTier)?.name}
        </Button>
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={onLogin}
          data-testid="button-login"
        >
          Already have an account? Sign In
        </Button>
      </div>

      {/* HIPAA Notice */}
      <div className="mt-4 p-3 bg-muted rounded-md">
        <p className="text-xs text-muted-foreground text-center">
          🔒 HIPAA Compliant - Never upload patient-identifying information. 
          This app is designed for educational and reference purposes only.
        </p>
      </div>
    </div>
  );
}