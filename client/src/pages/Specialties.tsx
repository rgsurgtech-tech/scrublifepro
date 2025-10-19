import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, Eye, Brain, Bone, Scissors, Baby, Activity, Stethoscope, Zap, Wrench, Target, Wind, Dna, Shield, Truck, Repeat } from 'lucide-react';
import surgicalBg from '@assets/stock_images/surgical_operating_r_269f4a87.jpg';

// Icon mapping for specialties - matches the icon strings in the database
const iconMap: { [key: string]: React.ReactNode } = {
  'Scissors': <Scissors className="w-6 h-6" />,
  'Bone': <Bone className="w-6 h-6" />,
  'Heart': <Heart className="w-6 h-6" />,
  'Brain': <Brain className="w-6 h-6" />,
  'Eye': <Eye className="w-6 h-6" />,
  'Baby': <Baby className="w-6 h-6" />,
  'Activity': <Activity className="w-6 h-6" />,
  'Stethoscope': <Stethoscope className="w-6 h-6" />,
  'Wrench': <Wrench className="w-6 h-6" />,
  'Target': <Target className="w-6 h-6" />,
  'Wind': <Wind className="w-6 h-6" />,
  'Truck': <Truck className="w-6 h-6" />,
  'Repeat': <Repeat className="w-6 h-6" />,
  'Zap': <Zap className="w-6 h-6" />,
  'Shield': <Shield className="w-6 h-6" />,
  'Dna': <Dna className="w-6 h-6" />,
};

interface Specialty {
  id: string;
  name: string;
  description: string;
  icon: string;
  procedureCount: number;
  color: string;
}

type UserSpecialtiesData = {
  selectedSpecialties: string[];
  subscriptionTier: string;
  maxSpecialties: number | null;
};

export default function Specialties() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  const { data: specialties, isLoading: specialtiesLoading } = useQuery<Specialty[]>({
    queryKey: ['/api/specialties'],
  });

  // Fetch user's selected specialties
  const { data: userSpecialties, isLoading: userSpecialtiesLoading } = useQuery<UserSpecialtiesData>({
    queryKey: ['/api/user/specialties'],
    enabled: !!user, // Only fetch if user is logged in
  });

  if (isLoading || specialtiesLoading || userSpecialtiesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading specialties...</p>
        </div>
      </div>
    );
  }

  // Filter specialties based on user's subscription tier
  const displayedSpecialties = user && (user.subscriptionTier === 'free' || user.subscriptionTier === 'standard')
    ? specialties?.filter(s => userSpecialties?.selectedSpecialties?.includes(s.id)) || []
    : specialties || [];

  const hasSelectedSpecialties = userSpecialties?.selectedSpecialties && userSpecialties.selectedSpecialties.length > 0;


  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${surgicalBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 surgical-bg"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setLocation('/')}
              className="text-white hover:bg-white/10 mr-4"
              data-testid="button-back"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Surgical Specialties</h1>
              <p className="text-white/80">
                {user && (user.subscriptionTier === 'free' || user.subscriptionTier === 'standard')
                  ? `Your selected specialties (${displayedSpecialties.length} of ${userSpecialties?.maxSpecialties || 0})`
                  : `Comprehensive coverage of ${specialties?.length || 20} surgical specialties`
                }
              </p>
            </div>
          </div>
          {/* Manage Specialties Button for Free/Standard users */}
          {user && (user.subscriptionTier === 'free' || user.subscriptionTier === 'standard') && (
            <Button
              variant="outline"
              onClick={() => setLocation('/profile')} // Can be changed to a specialty selector page
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              data-testid="button-manage-specialties"
            >
              Manage Specialties
            </Button>
          )}
        </div>

        {/* Empty State for Free/Standard users with no selections */}
        {user && (user.subscriptionTier === 'free' || user.subscriptionTier === 'standard') && !hasSelectedSpecialties && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white p-8 text-center">
            <CardHeader>
              <CardTitle className="text-2xl mb-4">No Specialties Selected</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 mb-6">
                Your {user.subscriptionTier} plan allows you to select up to {userSpecialties?.maxSpecialties || 0} {userSpecialties?.maxSpecialties === 1 ? 'specialty' : 'specialties'}. 
                Please select your specialties to get started.
              </p>
              <Button
                onClick={() => setLocation('/profile')}
                className="bg-primary hover:bg-primary/90 text-white"
                data-testid="button-select-specialties"
              >
                Select Specialties
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedSpecialties?.map((specialty) => (
            <Card 
              key={specialty.id} 
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover-elevate"
              data-testid={`card-specialty-${specialty.id}`}
            >
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                  {iconMap[specialty.icon] || <Stethoscope className="w-6 h-6" />}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold">
                    {specialty.name}
                  </CardTitle>
                  <Badge 
                    variant="secondary" 
                    className="mt-1 cursor-pointer hover:bg-secondary/80" 
                    onClick={() => setLocation(`/procedures/${specialty.id}`)}
                    data-testid={`badge-procedures-${specialty.id}`}
                  >
                    {specialty.procedureCount} procedures
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 text-sm mb-3">
                  {specialty.description}
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10"
                  onClick={() => setLocation(`/procedures/${specialty.id}`)}
                  data-testid={`button-view-procedures-${specialty.id}`}
                >
                  View Procedures
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {specialties?.length || 20}
              </div>
              <p className="text-white/80">Surgical Specialties</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {specialties?.reduce((sum, s) => sum + s.procedureCount, 0) || 1500}
              </div>
              <p className="text-white/80">Total Procedures</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {user?.subscriptionTier === 'premium' ? 'Unlimited' : 
                 user?.subscriptionTier === 'standard' ? '3' : user ? '1' : 'Unlimited'}
              </div>
              <p className="text-white/80">Available to You</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}