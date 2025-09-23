import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Heart, Eye, Brain, Bone, Scissors, Baby, CheckCircle, Activity, Stethoscope, Zap, Wrench, Target, Wind, Dna, Shield, Truck, Repeat } from "lucide-react";

interface SpecialtySelectorProps {
  onBack: () => void;
  userTier: 'free' | 'standard' | 'premium';
  currentSelections: string[];
  onSave: (selections: string[]) => void;
}

const specialties = [
  {
    id: 'general',
    name: 'General Surgery',
    icon: Scissors,
    description: 'Appendectomy, Cholecystectomy, Hernia repairs',
    procedures: 150,
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
  },
  {
    id: 'orthopedics', 
    name: 'Orthopedics',
    icon: Bone,
    description: 'Joint replacements, Fracture repairs, Arthroscopy',
    procedures: 120,
    color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
  },
  {
    id: 'cardiovascular',
    name: 'Cardiovascular',
    icon: Heart,
    description: 'Bypass, Valve repair, Pacemaker insertion',
    procedures: 85,
    color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
  },
  {
    id: 'neurosurgery',
    name: 'Neurosurgery', 
    icon: Brain,
    description: 'Craniotomy, Spinal fusion, Tumor resection',
    procedures: 95,
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology',
    icon: Eye, 
    description: 'Cataract surgery, Retinal procedures, LASIK',
    procedures: 65,
    color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
  },
  {
    id: 'obgyn',
    name: 'Obstetrics & Gynecology',
    icon: Baby,
    description: 'C-sections, Hysterectomy, Laparoscopy, Labor & Delivery',
    procedures: 110,
    color: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300'
  },
  {
    id: 'urology',
    name: 'Urology',
    icon: Activity,
    description: 'Prostatectomy, Kidney procedures, Cystoscopy, Transplant',
    procedures: 75,
    color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300'
  },
  {
    id: 'ent',
    name: 'ENT (Otolaryngology)',
    icon: Stethoscope,
    description: 'Tonsillectomy, Sinus surgery, Ear procedures',
    procedures: 55,
    color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
  },
  {
    id: 'plastic',
    name: 'Plastic & Reconstructive',
    icon: Scissors,
    description: 'Reconstruction, Cosmetic, Hand surgery, Microsurgery',
    procedures: 90,
    color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
  },
  {
    id: 'pediatric',
    name: 'Pediatric Surgery',
    icon: Baby,
    description: 'Congenital repairs, Appendectomy, Hernia, Neonatal',
    procedures: 80,
    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
  },
  {
    id: 'bariatric',
    name: 'Bariatric Surgery',
    icon: Target,
    description: 'Gastric bypass, Sleeve gastrectomy, Lap-band',
    procedures: 45,
    color: 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300'
  },
  {
    id: 'thoracic',
    name: 'Thoracic Surgery',
    icon: Wind,
    description: 'Lung resection, Chest wall procedures, Mediastinal',
    procedures: 70,
    color: 'bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300'
  },
  {
    id: 'cardiothoracic',
    name: 'Cardiothoracic',
    icon: Heart,
    description: 'Heart surgery, Valve replacement, CABG, Transplant',
    procedures: 65,
    color: 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300'
  },
  {
    id: 'maxillofacial',
    name: 'Oral & Maxillofacial',
    icon: Wrench,
    description: 'Jaw surgery, TMJ, Facial trauma, Oral pathology',
    procedures: 40,
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
  },
  {
    id: 'colorectal',
    name: 'Colorectal Surgery',
    icon: Activity,
    description: 'Colectomy, Hemorrhoidectomy, Rectal procedures',
    procedures: 85,
    color: 'bg-lime-100 text-lime-700 dark:bg-lime-900 dark:text-lime-300'
  },
  {
    id: 'trauma',
    name: 'Trauma Surgery',
    icon: Truck,
    description: 'Emergency procedures, Polytrauma, Critical care',
    procedures: 120,
    color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
  },
  {
    id: 'transplant',
    name: 'Transplant Surgery',
    icon: Repeat,
    description: 'Organ transplant, Kidney, Liver, Heart, Pancreas',
    procedures: 35,
    color: 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300'
  },
  {
    id: 'vascular',
    name: 'Vascular Surgery',
    icon: Zap,
    description: 'Bypass grafts, Aneurysm repair, Stent placement',
    procedures: 60,
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
  },
  {
    id: 'oncology',
    name: 'Surgical Oncology',
    icon: Shield,
    description: 'Cancer resection, Lymph node dissection, Biopsy',
    procedures: 95,
    color: 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
  },
  {
    id: 'endocrine',
    name: 'Endocrine Surgery',
    icon: Dna,
    description: 'Thyroidectomy, Parathyroid, Adrenal procedures',
    procedures: 55,
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
  }
];

export default function SpecialtySelector({ onBack, userTier, currentSelections, onSave }: SpecialtySelectorProps) {
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(currentSelections);

  const maxSelections = userTier === 'free' ? 1 : userTier === 'standard' ? 3 : specialties.length;
  const canSelectMore = selectedSpecialties.length < maxSelections;

  const handleSpecialtyToggle = (specialtyId: string) => {
    if (selectedSpecialties.includes(specialtyId)) {
      setSelectedSpecialties(prev => prev.filter(id => id !== specialtyId));
    } else if (canSelectMore) {
      setSelectedSpecialties(prev => [...prev, specialtyId]);
    }
  };

  const handleSave = () => {
    console.log('Saving specialties:', selectedSpecialties);
    onSave(selectedSpecialties);
    onBack();
  };

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
            Choose your areas of interest ({selectedSpecialties.length}/{maxSelections === specialties.length ? '∞' : maxSelections} selected)
          </p>
        </div>
      </div>

      {/* Tier Information */}
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
                  ? 'Access to 3 specialties' 
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

      {/* Specialty Grid */}
      <div className="space-y-4 mb-6">
        {specialties.map((specialty) => {
          const Icon = specialty.icon;
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
                  <div className={`p-2 rounded-md ${specialty.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{specialty.name}</h3>
                      {isSelected && <CheckCircle className="h-4 w-4 text-primary" />}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{specialty.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {specialty.procedures} procedures
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

      {/* Upgrade Notice */}
      {userTier !== 'premium' && (
        <Card className="mb-6 border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-orange-800 dark:text-orange-200">
              Want access to more specialties?
            </CardTitle>
            <CardDescription className="text-xs text-orange-700 dark:text-orange-300">
              Upgrade to {userTier === 'free' ? 'Standard (3 specialties)' : 'Premium (unlimited specialties)'} 
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
                const specialty = specialties.find(s => s.id === specialtyId);
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
          disabled={selectedSpecialties.length === 0}
          data-testid="button-save-specialties"
        >
          Save Selection{selectedSpecialties.length > 1 ? 's' : ''} ({selectedSpecialties.length})
        </Button>
      </div>
    </div>
  );
}