import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
import { useLocation } from "wouter";

interface FreeUserWarningDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function FreeUserWarningDialog({ open, onOpenChange, onConfirm }: FreeUserWarningDialogProps) {
  const [, setLocation] = useLocation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <DialogTitle className="text-xl">Important: Permanent Selection</DialogTitle>
          </div>
          <DialogDescription className="text-base space-y-3 pt-2">
            <p className="font-semibold text-foreground">
              As a Free tier user, your specialty selection is permanent.
            </p>
            <p>
              Once you select your specialty, you <span className="font-semibold text-foreground">will not be able to change it</span> unless you upgrade to a Standard or Premium plan.
            </p>
            <p>
              Please choose carefully as this decision cannot be undone without upgrading.
            </p>
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <h4 className="font-semibold text-sm">Want more flexibility?</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• <span className="font-medium">Standard Plan:</span> Access 10 specialties and change them anytime</li>
            <li>• <span className="font-medium">Premium Plan:</span> Unlimited access to all specialties</li>
          </ul>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button 
            variant="outline"
            onClick={() => setLocation('/subscribe')}
            className="w-full sm:w-auto"
            data-testid="button-view-plans"
          >
            View Upgrade Plans
          </Button>
          <Button 
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className="w-full sm:w-auto"
            data-testid="button-continue-selection"
          >
            I Understand, Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
