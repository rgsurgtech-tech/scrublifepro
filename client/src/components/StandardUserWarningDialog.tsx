import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle, Calendar, Lock } from "lucide-react";
import { useLocation } from "wouter";

interface StandardUserWarningDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function StandardUserWarningDialog({ open, onOpenChange, onConfirm }: StandardUserWarningDialogProps) {
  const [, setLocation] = useLocation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <DialogTitle className="text-xl">2-Month Lock Period</DialogTitle>
          </div>
          <DialogDescription className="text-base space-y-3 pt-2">
            <p className="font-semibold text-foreground">
              Standard plan specialty selections are locked for 2 consecutive months.
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Lock className="w-4 h-4 mt-0.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <p className="text-sm">
                  Once you save your specialty selections, you <span className="font-semibold text-foreground">cannot change them for 2 months</span>.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 mt-0.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <p className="text-sm">
                  After 2 consecutive months, you'll be able to update your selection up to 6 specialties.
                </p>
              </div>
            </div>
            <p className="text-sm">
              Please choose your specialties carefully as this decision will be locked until the lock period ends.
            </p>
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <h4 className="font-semibold text-sm">Want unlimited flexibility?</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• <span className="font-medium">Premium Plan:</span> Change specialties anytime with no lock period</li>
            <li>• <span className="font-medium">Access:</span> All 20 specialties available to you</li>
          </ul>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button 
            variant="outline"
            onClick={() => setLocation('/subscribe')}
            className="w-full sm:w-auto"
            data-testid="button-view-premium"
          >
            View Premium Plan
          </Button>
          <Button 
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className="w-full sm:w-auto"
            data-testid="button-continue-standard"
          >
            I Understand, Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
