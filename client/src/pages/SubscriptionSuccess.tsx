import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function SubscriptionSuccess() {
  const [, setLocation] = useLocation();
  const { refetch } = useAuth();

  useEffect(() => {
    // Refetch user data to get updated subscription tier
    refetch();
  }, [refetch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-slate-800 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl">Subscription Activated! 🎉</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            Your payment was successful! Your subscription is now active and you have access to all premium features.
          </p>
          <p className="text-sm text-muted-foreground">
            You can manage your subscription anytime from your profile page.
          </p>
          <div className="flex gap-2 pt-4">
            <Button 
              onClick={() => setLocation('/specialties')} 
              className="flex-1"
              data-testid="button-explore-procedures"
            >
              Explore Procedures
            </Button>
            <Button 
              onClick={() => setLocation('/profile')} 
              variant="outline"
              className="flex-1"
              data-testid="button-view-profile"
            >
              View Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
