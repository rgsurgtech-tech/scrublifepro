import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Shield, CheckCircle, AlertCircle } from "lucide-react";

export default function AdminSetup() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [setupComplete, setSetupComplete] = useState(false);

  // Check if admin already exists
  const { data: adminStatus, isLoading: checkingAdmin } = useQuery({
    queryKey: ["/api/admin/check-exists"],
    retry: 1,
  });

  // Bootstrap admin mutation
  const bootstrapMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("/api/bootstrap-admin", {
        method: "POST",
      });
    },
    onSuccess: (data: any) => {
      setSetupComplete(true);
      toast({
        title: "Success!",
        description: "Admin account created successfully. You can now log in.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create admin account",
        variant: "destructive",
      });
    },
  });

  if (checkingAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <p>Checking admin status...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const adminExists = adminStatus?.exists;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-10 h-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl mb-2">Admin Account Setup</CardTitle>
          <CardDescription className="text-base">
            Complete the initial setup for Scrub Life Pro
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {adminExists ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Admin Account Already Exists</h3>
                <p className="text-muted-foreground mb-4">
                  The admin account has already been created. You can log in with your credentials.
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium">Login Credentials:</p>
                <p className="text-sm">
                  <span className="font-medium">Email:</span> admin@scrublifepro.com
                </p>
                <p className="text-sm">
                  <span className="font-medium">Password:</span> Admin2025!
                </p>
              </div>
              <Button
                size="lg"
                onClick={() => navigate("/auth")}
                className="w-full"
                data-testid="button-go-to-login"
              >
                Go to Login
              </Button>
            </div>
          ) : setupComplete ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Setup Complete!</h3>
                <p className="text-muted-foreground mb-4">
                  Your admin account has been created successfully.
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium">Your Login Credentials:</p>
                <p className="text-sm">
                  <span className="font-medium">Email:</span> admin@scrublifepro.com
                </p>
                <p className="text-sm">
                  <span className="font-medium">Password:</span> Admin2025!
                </p>
              </div>
              <Button
                size="lg"
                onClick={() => navigate("/auth")}
                className="w-full"
                data-testid="button-go-to-login"
              >
                Go to Login
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="font-medium text-blue-900 dark:text-blue-100">
                      First Time Setup Required
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      This is a one-time setup to create your admin account. Click the button below to create an admin account with full access to all features.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium">Admin account will be created with:</p>
                <p className="text-sm">
                  <span className="font-medium">Email:</span> admin@scrublifepro.com
                </p>
                <p className="text-sm">
                  <span className="font-medium">Password:</span> Admin2025!
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  You can change these credentials after logging in for the first time.
                </p>
              </div>

              <Button
                size="lg"
                onClick={() => bootstrapMutation.mutate()}
                disabled={bootstrapMutation.isPending}
                className="w-full bg-primary hover:bg-primary/90"
                data-testid="button-create-admin"
              >
                {bootstrapMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Creating Admin Account...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Create Admin Account
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                This setup is required only once to initialize your production database
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
