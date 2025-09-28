import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Lock, Star } from 'lucide-react';

interface SubscriptionGateProps {
  requiredTier: 'free' | 'standard' | 'premium';
  children: React.ReactNode;
  title?: string;
  description?: string;
  showPreview?: boolean;
}

const tierInfo = {
  free: {
    name: 'Free',
    icon: Star,
    color: 'bg-gray-500',
    price: '$0',
  },
  standard: {
    name: 'Standard',
    icon: Star,
    color: 'bg-blue-500',
    price: '$9.99',
  },
  premium: {
    name: 'Premium',
    icon: Crown,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    price: '$19.99',
  }
};

export default function SubscriptionGate({
  requiredTier,
  children,
  title = "Premium Content",
  description = "This content requires a higher subscription tier to access.",
  showPreview = false
}: SubscriptionGateProps) {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const hasAccess = () => {
    if (!user) return requiredTier === 'free';
    
    const userTier = user.subscriptionTier || 'free';
    const tierLevels = { free: 0, standard: 1, premium: 2 };
    
    return tierLevels[userTier as keyof typeof tierLevels] >= tierLevels[requiredTier];
  };

  if (hasAccess()) {
    return <>{children}</>;
  }

  const tierDetails = tierInfo[requiredTier];
  const Icon = tierDetails.icon;

  return (
    <div className="relative">
      {showPreview && (
        <div className="opacity-30 pointer-events-none blur-sm">
          {children}
        </div>
      )}
      
      <Card className={`${showPreview ? 'absolute inset-0' : ''} bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700`}>
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 relative">
            <div className={`w-16 h-16 rounded-full ${tierDetails.color} flex items-center justify-center mx-auto mb-3`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <Lock className="w-6 h-6 text-slate-400 absolute -bottom-1 -right-1 bg-slate-900 rounded-full p-1" />
          </div>
          
          <Badge className={`${tierDetails.color} text-white border-none mb-2`}>
            {tierDetails.name} Required
          </Badge>
          
          <CardTitle className="text-white text-xl mb-2">{title}</CardTitle>
          <p className="text-slate-300 text-sm">{description}</p>
        </CardHeader>
        
        <CardContent className="text-center space-y-4">
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="text-3xl font-bold text-white mb-1">
              {tierDetails.price}
              <span className="text-lg font-normal text-slate-400">/month</span>
            </div>
            <p className="text-slate-400 text-sm">Upgrade to unlock this content</p>
          </div>
          
          <div className="space-y-2">
            {!user ? (
              <>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => setLocation('/auth?mode=signup')}
                  data-testid="button-signup-gate"
                >
                  Sign Up to Access
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-800"
                  onClick={() => setLocation('/auth?mode=login')}
                  data-testid="button-login-gate"
                >
                  Already have an account? Sign In
                </Button>
              </>
            ) : (
              <Button 
                className={`w-full ${tierDetails.color} text-white hover:opacity-90`}
                onClick={() => setLocation('/subscribe')}
                data-testid="button-upgrade-gate"
              >
                Upgrade to {tierDetails.name}
              </Button>
            )}
          </div>
          
          <p className="text-xs text-slate-500">
            Cancel anytime • 30-day money-back guarantee
          </p>
        </CardContent>
      </Card>
    </div>
  );
}