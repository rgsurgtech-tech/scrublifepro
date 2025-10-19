import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export default function SubscriptionCancel() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-slate-800 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
            <XCircle className="w-10 h-10 text-orange-600 dark:text-orange-400" />
          </div>
          <CardTitle className="text-2xl">Subscription Cancelled</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            Your subscription was not completed. No charges were made.
          </p>
          <p className="text-sm text-muted-foreground">
            You can try again anytime you're ready!
          </p>
          <div className="flex gap-2 pt-4">
            <Button 
              onClick={() => setLocation('/subscribe')} 
              className="flex-1"
              data-testid="button-try-again"
            >
              Try Again
            </Button>
            <Button 
              onClick={() => setLocation('/')} 
              variant="outline"
              className="flex-1"
              data-testid="button-home"
            >
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
