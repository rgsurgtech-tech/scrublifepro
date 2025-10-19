import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowLeft } from "lucide-react";

export default function Subscribe() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedTier, setSelectedTier] = useState<'standard' | 'premium'>('standard');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual'); // Default to annual (best value)
  const [isLoading, setIsLoading] = useState(false);

  // Subscription tiers with both monthly and annual pricing
  const tiers = [
    {
      id: 'standard' as const,
      name: 'Standard',
      monthlyPrice: 14.99,
      annualPrice: 149.90,
      monthlyPriceId: import.meta.env.VITE_STRIPE_STANDARD_PRICE_ID || '', 
      annualPriceId: import.meta.env.VITE_STRIPE_STANDARD_ANNUAL_PRICE_ID || '',
      description: 'Access to 200+ procedures, 10 specialties, full community forum',
      features: [
        'Access to 200+ surgical procedures',
        'Access to 10 specialties',
        'Community forum (full access)',
        'Complete instrument database',
        'Personal notes (unlimited)',
        'Procedure favorites'
      ],
      badge: 'Best Value'
    },
    {
      id: 'premium' as const,
      name: 'Premium',
      monthlyPrice: 29.99,
      annualPrice: 299.90,
      monthlyPriceId: import.meta.env.VITE_STRIPE_PREMIUM_PRICE_ID || '',
      annualPriceId: import.meta.env.VITE_STRIPE_PREMIUM_ANNUAL_PRICE_ID || '',
      description: 'Unlimited procedures, all specialties, video library, priority support',
      features: [
        'Unlimited surgical procedures',
        'All 20 specialties',
        'Community forum (verified badge)',
        'Complete instrument database',
        'Video library (full access)',
        'Unlimited notes & favorites',
        'CST verification badge',
        'Early access to new content',
        'Priority support'
      ],
      badge: 'Pro Choice'
    }
  ];

  const selectedTierData = tiers.find(tier => tier.id === selectedTier);

  // Calculate savings for annual billing
  const calculateSavings = (tier: typeof tiers[0]) => {
    const monthlyTotal = tier.monthlyPrice * 12;
    const savings = monthlyTotal - tier.annualPrice;
    return savings.toFixed(2);
  };

  // Get the display price based on billing period
  const getDisplayPrice = (tier: typeof tiers[0]) => {
    if (billingPeriod === 'monthly') {
      return `$${tier.monthlyPrice.toFixed(2)}/month`;
    } else {
      const monthlyEquivalent = tier.annualPrice / 12;
      return `$${monthlyEquivalent.toFixed(2)}/month`;
    }
  };

  // Get the full annual price
  const getAnnualPrice = (tier: typeof tiers[0]) => {
    return `$${tier.annualPrice.toFixed(2)}/year`;
  };

  const createSubscription = async () => {
    if (!selectedTierData) return;
    
    setIsLoading(true);
    
    try {
      // Get the appropriate price ID based on billing period
      const priceId = billingPeriod === 'monthly' 
        ? selectedTierData.monthlyPriceId 
        : selectedTierData.annualPriceId;

      console.log('Creating checkout session for tier:', selectedTier);
      console.log('Billing period:', billingPeriod);
      console.log('Price ID:', priceId);
      
      // Call backend to create Stripe Checkout session
      const response = await apiRequest(
        'POST',
        '/api/create-checkout-session',
        { priceId }
      );

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      // Redirect to Stripe Checkout (must open in new tab, not iframe)
      if (data.url) {
        console.log('Redirecting to:', data.url);
        window.location.href = data.url;
      } else {
        toast({
          title: "Error",
          description: "Unable to start checkout. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create checkout session",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-slate-800 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
            <p className="text-muted-foreground mb-4">
              Please sign in to subscribe to a plan.
            </p>
            <Button onClick={() => setLocation('/auth')} data-testid="button-signin">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation('/')}
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Choose Your Plan</h1>
            <p className="text-muted-foreground">
              Upgrade your experience with premium features
            </p>
          </div>
        </div>

        {/* Current Plan */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>
              You are currently on the <strong className="capitalize">{user.subscriptionTier}</strong> plan
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Billing Period Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-4 p-1 bg-slate-200 dark:bg-slate-800 rounded-lg">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-md transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-white dark:bg-slate-700 shadow-sm'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700/50'
              }`}
              data-testid="toggle-monthly"
            >
              <span className="font-medium">Monthly</span>
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-6 py-2 rounded-md transition-all flex items-center gap-2 ${
                billingPeriod === 'annual'
                  ? 'bg-white dark:bg-slate-700 shadow-sm'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700/50'
              }`}
              data-testid="toggle-annual"
            >
              <span className="font-medium">Annual</span>
              <Badge variant="default" className="bg-green-600 dark:bg-green-600 text-white">
                Save 17%
              </Badge>
            </button>
          </div>
        </div>

        {/* Plan Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {tiers.map((tier) => (
            <Card 
              key={tier.id}
              className={`cursor-pointer transition-all hover-elevate ${
                selectedTier === tier.id ? 'ring-2 ring-primary' : ''
              } ${user.subscriptionTier === tier.id ? 'opacity-50' : ''}`}
              onClick={() => user.subscriptionTier !== tier.id && setSelectedTier(tier.id)}
              data-testid={`card-tier-${tier.id}`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-bold text-primary">
                        {getDisplayPrice(tier)}
                      </span>
                      {billingPeriod === 'annual' && (
                        <span className="text-sm text-muted-foreground">
                          ({getAnnualPrice(tier)})
                        </span>
                      )}
                    </div>
                    {billingPeriod === 'annual' && (
                      <Badge variant="secondary" className="mt-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                        Save ${calculateSavings(tier)} per year
                      </Badge>
                    )}
                  </div>
                  <Badge variant="secondary">{tier.badge}</Badge>
                </div>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {user.subscriptionTier === tier.id && (
                  <div className="mt-4 p-2 bg-green-100 dark:bg-green-900 rounded text-center">
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">
                      Current Plan
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Subscribe Button */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={createSubscription}
            disabled={!selectedTierData || user.subscriptionTier === selectedTier || isLoading}
            data-testid="button-subscribe"
          >
            {isLoading ? 'Loading...' : 
             user.subscriptionTier === selectedTier 
              ? 'Already Subscribed' 
              : `Subscribe to ${selectedTierData?.name} - ${billingPeriod === 'monthly' ? getDisplayPrice(selectedTierData!) : getAnnualPrice(selectedTierData!)}`
            }
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            You'll be redirected to a secure payment page to complete your subscription
          </p>
        </div>
      </div>
    </div>
  );
}
