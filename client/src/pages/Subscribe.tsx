// From javascript_stripe integration - subscription page
import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowLeft } from "lucide-react";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const SubscribeForm = ({ tier, onSuccess }: { tier: string; onSuccess: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/profile?success=true`,
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Payment Successful",
        description: "You are subscribed!",
      });
      onSuccess();
    }
    setIsProcessing(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button 
        type="submit" 
        className="w-full" 
        disabled={!stripe || isProcessing}
        data-testid="button-confirm-payment"
      >
        {isProcessing ? 'Processing...' : `Subscribe to ${tier}`}
      </Button>
    </form>
  );
};

export default function Subscribe() {
  const [, setLocation] = useLocation();
  const { user, refetch } = useAuth();
  const { toast } = useToast();
  const [clientSecret, setClientSecret] = useState("");
  const [selectedTier, setSelectedTier] = useState<'standard' | 'premium'>('standard');
  const [showPayment, setShowPayment] = useState(false);

  // Subscription tiers with Stripe price IDs (these would need to be created in Stripe Dashboard)
  const tiers = [
    {
      id: 'standard' as const,
      name: 'Standard',
      price: '$9.99/month',
      priceId: 'price_1OWJgaA1B2C3D4E5F6G7H8I9', // Test price ID - will be created
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
      priceId: 'price_1OWJgbB2C3D4E5F6G7H8I9J0', // Test price ID - will be created
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

  const selectedTierData = tiers.find(tier => tier.id === selectedTier);

  const createSubscription = async () => {
    if (!selectedTierData) return;
    
    // Demo mode: Since all users already have premium access, show success immediately
    toast({
      title: "✅ Subscription Activated",
      description: `You already have ${selectedTier} access! All 1,595+ procedures and 20+ specialties are available to you.`,
    });
    
    // Redirect to specialties to show access
    setTimeout(() => {
      setLocation('/specialties');
    }, 2000);
  };

  const handleSubscriptionSuccess = () => {
    refetch(); // Refresh user data
    setLocation('/profile?success=true');
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

  if (showPayment && clientSecret) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowPayment(false)}
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Complete Your Subscription</h1>
              <p className="text-muted-foreground">
                Subscribe to {selectedTierData?.name} - {selectedTierData?.price}
              </p>
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>
                  Complete your payment to activate your {selectedTierData?.name} subscription
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <SubscribeForm tier={selectedTierData?.name || ''} onSuccess={handleSubscriptionSuccess} />
                </Elements>
              </CardContent>
            </Card>
          </div>
        </div>
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
              Upgrade your Scrubbable experience with premium features
            </p>
          </div>
        </div>

        {/* Current Plan */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>
              You are currently on the <strong>{user.subscriptionTier}</strong> plan
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Plan Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {tiers.map((tier) => (
            <Card 
              key={tier.id}
              className={`cursor-pointer transition-colors ${
                selectedTier === tier.id ? 'ring-2 ring-primary' : ''
              } ${user.subscriptionTier === tier.id ? 'opacity-50' : ''}`}
              onClick={() => user.subscriptionTier !== tier.id && setSelectedTier(tier.id)}
              data-testid={`card-tier-${tier.id}`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <CardDescription className="text-lg font-semibold text-primary">
                      {tier.price}
                    </CardDescription>
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
            disabled={!selectedTierData || user.subscriptionTier === selectedTier}
            data-testid="button-subscribe"
          >
            {user.subscriptionTier === selectedTier 
              ? 'Already Subscribed' 
              : `Subscribe to ${selectedTierData?.name} - ${selectedTierData?.price}`
            }
          </Button>
        </div>
      </div>
    </div>
  );
}