import { useState, useEffect } from "react";
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Loader2, Lock } from "lucide-react";
import { FreeUserWarningDialog } from "./FreeUserWarningDialog";
import { useLocation } from "wouter";

interface SpecialtySelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Specialty = {
  id: string;
  name: string;
  description: string;
  icon: string;
  procedureCount: number;
  color: string;
};

type UserSpecialtiesData = {
  selectedSpecialties: string[];
  subscriptionTier: string;
  maxSpecialties: number | null;
};

export function SpecialtySelector({ open, onOpenChange }: SpecialtySelectorProps) {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [showFreeUserWarning, setShowFreeUserWarning] = useState(false);
  const [hasSeenWarning, setHasSeenWarning] = useState(false);

  // Fetch specialties from API
  const { data: specialties, isLoading: loadingSpecialties, isError: specialtiesError } = useQuery<Specialty[]>({
    queryKey: ['/api/specialties'],
  });

  // Fetch user specialty data
  const { data: userSpecialties, isLoading: loadingUserSpecialties, isError: userSpecialtiesError } = useQuery<UserSpecialtiesData>({
    queryKey: ['/api/user/specialties'],
  });

  // Show error toast if queries fail
  useEffect(() => {
    if (specialtiesError) {
      toast({
        title: "Error Loading Specialties",
        description: "Unable to load specialties. Please try again.",
        variant: "destructive"
      });
    }
    if (userSpecialtiesError) {
      toast({
        title: "Error Loading Your Selections",
        description: "Unable to load your specialty selections. Please try again.",
        variant: "destructive"
      });
    }
  }, [specialtiesError, userSpecialtiesError, toast]);

  // Update selected specialties when userSpecialties loads
  useEffect(() => {
    if (userSpecialties?.selectedSpecialties) {
      setSelectedSpecialties(userSpecialties.selectedSpecialties);
    }
  }, [userSpecialties]);

  // Show warning dialog for free users on first open (before they have selected)
  useEffect(() => {
    if (open && !hasSeenWarning && userSpecialties?.subscriptionTier === 'free' && (!userSpecialties?.selectedSpecialties || userSpecialties.selectedSpecialties.length === 0)) {
      setShowFreeUserWarning(true);
    }
  }, [open, hasSeenWarning, userSpecialties]);

  // Save specialties mutation
  const updateSpecialtiesMutation = useMutation({
    mutationFn: async (specialtyIds: string[]) => {
      const response = await apiRequest('POST', '/api/user/specialties', { specialtyIds });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/specialties'] });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
      queryClient.invalidateQueries({ queryKey: ['/api/specialties'] });
      toast({
        title: "Success",
        description: "Your specialty selections have been saved.",
      });
      onOpenChange(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update specialties",
        variant: "destructive"
      });
    }
  });

  const userTier = userSpecialties?.subscriptionTier || 'free';
  const maxSelections = userSpecialties?.maxSpecialties || (userTier === 'free' ? 1 : userTier === 'standard' ? 10 : 999);
  const canSelectMore = selectedSpecialties.length < maxSelections;
  const hasExistingSelection = userSpecialties?.selectedSpecialties && userSpecialties.selectedSpecialties.length > 0;
  const isFreeUserWithSelection = userTier === 'free' && hasExistingSelection;

  const handleSpecialtyToggle = (specialtyId: string) => {
    // Free users cannot change their selection once made
    if (isFreeUserWithSelection) {
      toast({
        title: "Selection Locked",
        description: "Free tier users cannot change their specialty selection. Upgrade to Standard or Premium to change specialties.",
        variant: "destructive",
        action: (
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              setLocation('/subscribe');
            }}
          >
            Upgrade
          </Button>
        ),
      });
      return;
    }

    const isSelected = selectedSpecialties.includes(specialtyId);
    
    if (isSelected) {
      setSelectedSpecialties(prev => prev.filter(id => id !== specialtyId));
    } else {
      if (!canSelectMore) {
        toast({
          title: "Specialty Limit Reached",
          description: `Your ${userTier} plan allows a maximum of ${maxSelections} ${maxSelections === 1 ? 'specialty' : 'specialties'}. Upgrade to select more.`,
          variant: "destructive"
        });
        return;
      }
      setSelectedSpecialties(prev => [...prev, specialtyId]);
    }
  };

  const handleSave = () => {
    if (selectedSpecialties.length === 0) {
      toast({
        title: "No Selection",
        description: "Please select at least one specialty.",
        variant: "destructive"
      });
      return;
    }
    updateSpecialtiesMutation.mutate(selectedSpecialties);
  };

  const isLoading = loadingSpecialties || loadingUserSpecialties || updateSpecialtiesMutation.isPending;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isFreeUserWithSelection ? 'Your Selected Specialty (Locked)' : 'Select Specialties'}
            </DialogTitle>
            <DialogDescription>
              {isFreeUserWithSelection 
                ? 'Free tier users cannot change their specialty. Upgrade to change your selection.'
                : `Choose your areas of interest (${selectedSpecialties.length}/${maxSelections === 999 ? '∞' : maxSelections} selected)`
              }
            </DialogDescription>
          </DialogHeader>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {/* Tier Information */}
          {!isLoading && (
            <Card className={isFreeUserWithSelection ? "border-amber-500 bg-amber-50 dark:bg-amber-950" : "border-primary bg-primary/5"}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm">
                        {userTier === 'free' ? 'Free Tier' : userTier === 'standard' ? 'Standard Plan' : 'Premium Plan'}
                      </h3>
                      {isFreeUserWithSelection && (
                        <Lock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {userTier === 'free' 
                        ? isFreeUserWithSelection 
                          ? 'Your specialty selection is permanent. Upgrade to change it.' 
                          : 'Access to 1 specialty (permanent once selected)' 
                        : userTier === 'standard' 
                        ? 'Access to 10 specialties (can be changed anytime)' 
                        : 'Unlimited access to all specialties'
                      }
                    </p>
                  </div>
                  <Badge variant={isFreeUserWithSelection ? "destructive" : "default"}>
                    {isFreeUserWithSelection ? 'Locked' : userTier.charAt(0).toUpperCase() + userTier.slice(1)}
                  </Badge>
                </div>
                {isFreeUserWithSelection && (
                  <Button
                    size="sm"
                    className="mt-3 w-full"
                    onClick={() => {
                      onOpenChange(false);
                      setLocation('/subscribe');
                    }}
                    data-testid="button-upgrade-to-change"
                  >
                    Upgrade to Change Specialty
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Specialty Grid */}
          {!isLoading && (
            <div className="space-y-3 my-4">
              {specialties?.map((specialty) => {
                const isSelected = selectedSpecialties.includes(specialty.id);
                const isDisabled = isFreeUserWithSelection || (!isSelected && !canSelectMore);
                const isLocked = isFreeUserWithSelection && !isSelected;

                return (
                  <Card 
                    key={specialty.id}
                    className={`transition-all ${
                      isSelected 
                        ? isFreeUserWithSelection
                          ? 'ring-2 ring-amber-500 bg-amber-50 dark:bg-amber-950' 
                          : 'ring-2 ring-primary bg-primary/5'
                        : isDisabled 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'cursor-pointer hover-elevate'
                    }`}
                    onClick={() => !isDisabled && handleSpecialtyToggle(specialty.id)}
                    data-testid={`card-specialty-${specialty.id}`}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-sm">{specialty.name}</h3>
                            {isSelected && isFreeUserWithSelection && <Lock className="h-4 w-4 text-amber-600 dark:text-amber-400" />}
                            {isSelected && !isFreeUserWithSelection && <CheckCircle className="h-4 w-4 text-primary" />}
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{specialty.description}</p>
                          <Badge variant="outline" className="text-xs">
                            {specialty.procedureCount} procedures
                          </Badge>
                        </div>
                        <Checkbox 
                          checked={isSelected}
                          disabled={isDisabled}
                          className="pointer-events-none"
                          data-testid={`checkbox-${specialty.id}`}
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Selection Summary */}
          {selectedSpecialties.length > 0 && !isLoading && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">Selected Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {selectedSpecialties.map((specialtyId) => {
                  const specialty = specialties?.find(s => s.id === specialtyId);
                  return specialty ? (
                    <Badge key={specialtyId} variant={isFreeUserWithSelection ? "destructive" : "default"} className="text-xs">
                      {specialty.name}
                      {isFreeUserWithSelection && <Lock className="h-3 w-3 ml-1" />}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={updateSpecialtiesMutation.isPending}
              className="flex-1"
            >
              {isFreeUserWithSelection ? 'Close' : 'Cancel'}
            </Button>
            {!isFreeUserWithSelection && (
              <Button 
                className="flex-1" 
                onClick={handleSave}
                disabled={selectedSpecialties.length === 0 || isLoading}
                data-testid="button-save-specialties"
              >
                {updateSpecialtiesMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Save Selection{selectedSpecialties.length > 1 ? 's' : ''} ({selectedSpecialties.length})
                  </>
                )}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Free User Warning Dialog */}
      <FreeUserWarningDialog
        open={showFreeUserWarning}
        onOpenChange={setShowFreeUserWarning}
        onConfirm={() => setHasSeenWarning(true)}
      />
    </>
  );
}
