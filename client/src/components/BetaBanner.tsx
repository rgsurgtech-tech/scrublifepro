import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function BetaBanner() {
  return (
    <Alert 
      className="rounded-none border-x-0 border-t-0 border-b border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 to-purple-950/40 backdrop-blur-sm"
      data-testid="banner-beta"
    >
      <AlertCircle className="h-4 w-4 text-cyan-400" />
      <AlertDescription className="text-sm text-cyan-100/90">
        <span className="font-semibold text-cyan-400">Beta Testing Mode:</span> You're currently testing Scrub Life Pro. All features are available for unlimited access during beta.
      </AlertDescription>
    </Alert>
  );
}
