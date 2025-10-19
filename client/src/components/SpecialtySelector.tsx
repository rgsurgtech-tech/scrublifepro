import { useState, useEffect } from "react";
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Heart, Eye, Brain, Bone, Scissors, Baby, CheckCircle, Activity, Stethoscope, Zap, Wrench, Target, Wind, Dna, Shield, Truck, Repeat, Loader2 } from "lucide-react";

interface SpecialtySelectorProps {
  onBack: () => void;
  userTier: 'free' | 'standard' | 'premium';
  currentSelections: string[];
  onSave: (selections: string[]) => void;
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

export default function SpecialtySelector({ onBack, userTier, currentSelections, onSave }: SpecialtySelectorProps) {
  const { toast } = useToast();
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(currentSelections);

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
    if (userSpecialties?.selectedSpecialties && currentSelections.length === 0) {
      setSelectedSpecialties(userSpecialties.selectedSpecialties);
    }
  }, [userSpecialties, currentSelections]);

  // Save specialties mutation
  const updateSpecialtiesMutation = useMutation({
    mutationFn: async (specialtyIds: string[]) => {
      const response = await apiRequest('POST', '/api/user/specialties', { specialtyIds });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/specialties'] });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
      toast({
        title: "Success",
        description: "Your specialty selections have been saved.",
      });
      onSave(selectedSpecialties);
      onBack();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update specialties",
        variant: "destructive"
      });
    }
  });

  const maxSelections = userTier === 'free' ? 1 : userTier === 'standard' ? 10 : (specialties?.length || 999);
  const canSelectMore = selectedSpecialties.length < maxSelections;

  const handleSpecialtyToggle = (specialtyId: string) => {
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
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onBack}
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold">Select Specialties</h1>
          <p className="text-sm text-muted-foreground">
            Choose your areas of interest ({selectedSpecialties.length}/{maxSelections === (specialties?.length || 999) ? '∞' : maxSelections} selected)
          </p>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* Tier Information */}
      {!isLoading && (
        <Card className="mb-6 border-primary bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-sm">
                  {userTier === 'free' ? 'Free Tier' : userTier === 'standard' ? 'Standard Plan' : 'Premium Plan'}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {userTier === 'free' 
                    ? 'Access to 1 specialty' 
                    : userTier === 'standard' 
                    ? 'Access to 10 specialties' 
                    : 'Unlimited access to all specialties'
                  }
                </p>
              </div>
              <Badge variant="default">
                {userTier.charAt(0).toUpperCase() + userTier.slice(1)}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Specialty Grid */}
      {!isLoading && (
        <div className="space-y-4 mb-6">
          {specialties?.map((specialty) => {
            const isSelected = selectedSpecialties.includes(specialty.id);
            const isDisabled = !isSelected && !canSelectMore;

            return (
              <Card 
                key={specialty.id}
                className={`cursor-pointer transition-all ${
                  isSelected 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : isDisabled 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover-elevate'
                }`}
                onClick={() => !isDisabled && handleSpecialtyToggle(specialty.id)}
                data-testid={`card-specialty-${specialty.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm">{specialty.name}</h3>
                        {isSelected && <CheckCircle className="h-4 w-4 text-primary" />}
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

      {/* Upgrade Notice */}
      {userTier !== 'premium' && !isLoading && (
        <Card className="mb-6 border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-orange-800 dark:text-orange-200">
              Want access to more specialties?
            </CardTitle>
            <CardDescription className="text-xs text-orange-700 dark:text-orange-300">
              Upgrade to {userTier === 'free' ? 'Standard (10 specialties)' : 'Premium (unlimited specialties)'} 
              for expanded access to all surgical procedures.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button size="sm" variant="outline" data-testid="button-upgrade">
              Learn More
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Selection Summary */}
      {selectedSpecialties.length > 0 && (
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Selected Specialties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedSpecialties.map((specialtyId) => {
                const specialty = specialties?.find(s => s.id === specialtyId);
                return specialty ? (
                  <Badge key={specialtyId} variant="default" className="text-xs">
                    {specialty.name}
                  </Badge>
                ) : null;
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Save Button */}
      <div className="fixed bottom-4 left-4 right-4">
        <Button 
          className="w-full" 
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
      </div>
    </div>
  );
}