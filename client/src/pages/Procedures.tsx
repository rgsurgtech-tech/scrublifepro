import { useAuth } from '@/contexts/AuthContext';
import { useLocation, useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, AlertTriangle, Star, ChevronRight, Heart, Eye, Brain, Bone, Scissors, Baby, Activity, Stethoscope, Zap, Wrench, Target, Wind, Dna, Shield, Truck, Repeat } from 'lucide-react';
import surgicalBg from '@assets/stock_images/surgical_operating_r_269f4a87.jpg';

// Icon mapping for specialties
const iconMap: { [key: string]: React.ReactNode } = {
  'Scissors': <Scissors className="w-5 h-5" />,
  'Bone': <Bone className="w-5 h-5" />,
  'Heart': <Heart className="w-5 h-5" />,
  'Brain': <Brain className="w-5 h-5" />,
  'Eye': <Eye className="w-5 h-5" />,
  'Baby': <Baby className="w-5 h-5" />,
  'Activity': <Activity className="w-5 h-5" />,
  'Stethoscope': <Stethoscope className="w-5 h-5" />,
  'Wrench': <Wrench className="w-5 h-5" />,
  'Target': <Target className="w-5 h-5" />,
  'Wind': <Wind className="w-5 h-5" />,
  'Truck': <Truck className="w-5 h-5" />,
  'Repeat': <Repeat className="w-5 h-5" />,
  'Zap': <Zap className="w-5 h-5" />,
  'Shield': <Shield className="w-5 h-5" />,
  'Dna': <Dna className="w-5 h-5" />,
};

// Difficulty color mapping
const difficultyColors = {
  'Basic': 'bg-green-500/20 text-green-400 border-green-500/20',
  'Intermediate': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20',
  'Advanced': 'bg-red-500/20 text-red-400 border-red-500/20',
};

interface Specialty {
  id: string;
  name: string;
  description: string;
  icon: string;
  procedureCount: number;
  color: string;
}

interface Procedure {
  id: string;
  name: string;
  specialtyId: string;
  description: string;
  duration: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  positioning: any;
  draping: any;
  instruments: any;
  mayoSetup: any;
  procedureSteps: any;
  medications: any;
  complications: string[];
  tips: string[];
  verifiedBy: string | null;
  verifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function Procedures() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [match, params] = useRoute('/procedures/:specialtyId');
  
  const specialtyId = params?.specialtyId;

  const { data: specialty, isLoading: specialtyLoading } = useQuery<Specialty>({
    queryKey: ['/api/specialties', specialtyId],
    queryFn: async () => {
      const response = await fetch(`/api/specialties/${specialtyId}`);
      if (!response.ok) throw new Error('Failed to fetch specialty');
      return response.json();
    },
    enabled: !!user && !!specialtyId,
  });

  const { data: procedures, isLoading: proceduresLoading } = useQuery<Procedure[]>({
    queryKey: ['/api/procedures', specialtyId],
    queryFn: async () => {
      const response = await fetch(`/api/procedures?specialtyId=${specialtyId}`);
      if (!response.ok) throw new Error('Failed to fetch procedures');
      return response.json();
    },
    enabled: !!user && !!specialtyId,
  });

  if (isLoading || specialtyLoading || proceduresLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading procedures...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    setLocation('/auth');
    return null;
  }

  if (!match || !specialtyId) {
    setLocation('/specialties');
    return null;
  }

  const handleProcedureClick = (procedureId: string) => {
    // TODO: Implement individual procedure detail page
    // setLocation(`/procedure/${procedureId}`);
    console.log('Procedure clicked:', procedureId);
  };

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
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setLocation('/specialties')}
            className="text-white hover:bg-white/10 mr-4"
            data-testid="button-back"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex items-center gap-4">
            {specialty && (
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                {iconMap[specialty.icon] || <Stethoscope className="w-6 h-6 text-white" />}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {specialty?.name || 'Procedures'}
              </h1>
              <p className="text-white/80">
                {procedures?.length || 0} procedures available
              </p>
            </div>
          </div>
        </div>

        {/* Procedures Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {procedures?.map((procedure) => (
            <Card 
              key={procedure.id} 
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover-elevate"
              data-testid={`card-procedure-${procedure.id}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold mb-2">
                      {procedure.name}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${difficultyColors[procedure.difficulty]}`}
                      >
                        {procedure.difficulty}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {procedure.duration}
                      </Badge>
                      {procedure.verifiedBy && (
                        <Badge variant="outline" className="text-xs bg-green-500/20 text-green-400 border-green-500/20">
                          <Star className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/60 flex-shrink-0" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 text-sm mb-4 line-clamp-3">
                  {procedure.description}
                </p>
                
                {/* Key Information */}
                <div className="space-y-2">
                  {procedure.complications.length > 0 && (
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <AlertTriangle className="w-3 h-3 text-yellow-400" />
                      <span>{procedure.complications.length} potential complications</span>
                    </div>
                  )}
                  
                  {procedure.tips.length > 0 && (
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <Star className="w-3 h-3 text-primary" />
                      <span>{procedure.tips.length} expert tips</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {procedures?.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="w-8 h-8 text-white/60" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Procedures Available</h3>
            <p className="text-white/80 mb-6">
              Procedures for this specialty are currently being added.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setLocation('/specialties')}
              className="bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              Browse Other Specialties
            </Button>
          </div>
        )}

        {/* Summary Stats */}
        {procedures && procedures.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {procedures.length}
                </div>
                <p className="text-white/80">Total Procedures</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {procedures.filter(p => p.verifiedBy).length}
                </div>
                <p className="text-white/80">Verified by CSTs</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {Math.round(procedures.reduce((sum, p) => {
                    const avg = parseInt(p.duration.split('-')[0]) || 0;
                    return sum + avg;
                  }, 0) / procedures.length) || 0}
                </div>
                <p className="text-white/80">Avg. Duration (min)</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}