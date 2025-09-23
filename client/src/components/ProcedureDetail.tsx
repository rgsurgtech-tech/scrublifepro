import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Star, Download, Share, Clock, AlertCircle, CheckCircle, Eye, FileText, Wrench, User, Pill } from "lucide-react";

interface ProcedureDetailProps {
  procedure: any;
  onBack: () => void;
}

export default function ProcedureDetail({ procedure, onBack }: ProcedureDetailProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(procedure?.isFavorite || false);
  const [personalNotes, setPersonalNotes] = useState("");

  // TODO: Remove mock data when implementing real backend
  const mockDetailedProcedure = {
    id: 1,
    name: "Laparoscopic Cholecystectomy",
    specialty: "General Surgery",
    duration: "45-90 min",
    difficulty: "Intermediate",
    description: "Minimally invasive removal of gallbladder using laparoscopic technique",
    positioning: {
      title: "Patient Positioning",
      steps: [
        "Place patient in supine position",
        "Slightly elevate left side with wedge",
        "Reverse Trendelenburg position (15-20 degrees)",
        "Left arm extended, right arm tucked",
        "Secure patient with safety straps"
      ]
    },
    draping: {
      title: "Draping Protocol",
      steps: [
        "Standard prep from xiphoid to pubis",
        "Large laparotomy drape with fenestration",
        "Four corner drapes to isolate surgical field",
        "Camera drape for laparoscope",
        "Light handle covers"
      ]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major laparoscopy set", "Basic laparotomy set", "Electrocautery"],
      specialInstruments: [
        "5mm and 10mm trocars (4 total)",
        "Laparoscope (0° and 30°)",
        "Graspers (atraumatic)",
        "Clips (titanium/absorbable)",
        "Endocatch bag",
        "Harmonic scalpel or LigaSure"
      ]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Standard laparoscopic setup with graspers on left, clips center, cutting instruments right",
      essentials: ["Trocars", "Graspers", "Clips", "Endocatch bag", "Laparoscope"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        {
          step: 1,
          title: "Pneumoperitoneum Creation",
          description: "Veress needle insertion, CO2 insufflation to 12-15 mmHg",
          instruments: ["Veress needle", "CO2 line"]
        },
        {
          step: 2,
          title: "Trocar Placement",
          description: "Primary 10mm umbilical, three 5mm secondary ports",
          instruments: ["10mm trocar", "5mm trocars"]
        },
        {
          step: 3,
          title: "Inspection & Adhesiolysis",
          description: "Laparoscopic inspection, divide adhesions if present",
          instruments: ["Laparoscope", "Graspers", "Electrocautery"]
        },
        {
          step: 4,
          title: "Critical View Achievement",
          description: "Identify Calot's triangle anatomy",
          instruments: ["Graspers", "Dissection tools"]
        },
        {
          step: 5,
          title: "Clipping & Division",
          description: "Clip and divide cystic artery and duct",
          instruments: ["Clips", "Scissors"]
        },
        {
          step: 6,
          title: "Gallbladder Dissection",
          description: "Dissect gallbladder from liver bed",
          instruments: ["Electrocautery", "Graspers"]
        },
        {
          step: 7,
          title: "Specimen Removal",
          description: "Place in endocatch bag, remove through umbilical port",
          instruments: ["Endocatch bag", "Graspers"]
        },
        {
          step: 8,
          title: "Closure",
          description: "Remove trocars under vision, close fascial defects",
          instruments: ["Suture", "Needle holders"]
        }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Normal Saline", use: "Irrigation", amount: "500-1000mL" },
        { name: "Lidocaine 1%", use: "Local anesthesia", amount: "10-20mL" },
        { name: "Epinephrine", use: "Hemostasis (if needed)", amount: "As needed" }
      ]
    },
    complications: [
      "Bleeding from liver bed",
      "Gallbladder perforation",
      "Conversion to open",
      "Bile duct injury"
    ],
    tips: [
      "Ensure critical view before clipping",
      "Use gentle traction to avoid perforation",
      "Irrigate thoroughly if spillage occurs",
      "Have clips readily available"
    ]
  };

  const procedure_data = mockDetailedProcedure;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b p-4 z-10">
        <div className="flex items-center gap-3 mb-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold line-clamp-2">{procedure_data.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">{procedure_data.specialty}</Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {procedure_data.duration}
              </div>
              <Badge 
                variant={procedure_data.difficulty === 'Basic' ? 'secondary' : 
                        procedure_data.difficulty === 'Intermediate' ? 'default' : 'destructive'}
                className="text-xs"
              >
                {procedure_data.difficulty}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFavorite(!isFavorite)}
            data-testid="button-favorite"
          >
            <Star className={`h-4 w-4 ${isFavorite ? 'fill-primary text-primary' : ''}`} />
          </Button>
          <Button variant="ghost" size="icon" data-testid="button-download">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" data-testid="button-share">
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="text-xs" data-testid="tab-overview">
              <Eye className="h-3 w-3 mr-1" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="setup" className="text-xs" data-testid="tab-setup">
              <Wrench className="h-3 w-3 mr-1" />
              Setup
            </TabsTrigger>
            <TabsTrigger value="procedure" className="text-xs" data-testid="tab-procedure">
              <FileText className="h-3 w-3 mr-1" />
              Procedure
            </TabsTrigger>
            <TabsTrigger value="notes" className="text-xs" data-testid="tab-notes">
              <User className="h-3 w-3 mr-1" />
              Notes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{procedure_data.description}</p>
              </CardContent>
            </Card>

            {/* Key Points */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Key Success Factors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {procedure_data.tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{tip}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Potential Complications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Potential Complications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {procedure_data.complications.map((complication, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{complication}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="setup" className="space-y-4">
            {/* Patient Positioning */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{procedure_data.positioning.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  {procedure_data.positioning.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Draping */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{procedure_data.draping.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  {procedure_data.draping.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Instrumentation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{procedure_data.instruments.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Basic Sets</h4>
                  <div className="flex flex-wrap gap-2">
                    {procedure_data.instruments.basicSet.map((instrument, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {instrument}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Special Instruments</h4>
                  <div className="space-y-1">
                    {procedure_data.instruments.specialInstruments.map((instrument, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        {instrument}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mayo Stand Setup */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{procedure_data.mayoSetup.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{procedure_data.mayoSetup.layout}</p>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Essential Items</h4>
                  <div className="flex flex-wrap gap-2">
                    {procedure_data.mayoSetup.essentials.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="procedure" className="space-y-4">
            {/* Procedure Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{procedure_data.procedureSteps.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {procedure_data.procedureSteps.steps.map((step) => (
                    <div key={step.step} className="border-l-2 border-primary pl-4 pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                          {step.step}
                        </span>
                        <h4 className="font-semibold text-sm">{step.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {step.instruments.map((instrument, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {instrument}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Medications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Pill className="h-4 w-4" />
                  {procedure_data.medications.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {procedure_data.medications.items.map((med, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <div>
                        <h4 className="font-semibold text-sm">{med.name}</h4>
                        <p className="text-xs text-muted-foreground">{med.use}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">{med.amount}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Personal Notes</CardTitle>
                <CardDescription className="text-xs">
                  Add your own notes, tips, or reminders for this procedure. Notes are saved to your account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add your personal notes here... (surgeon preferences, setup tips, personal reminders, etc.)"
                  value={personalNotes}
                  onChange={(e) => setPersonalNotes(e.target.value)}
                  className="min-h-[120px]"
                  data-testid="textarea-notes"
                />
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {personalNotes.length}/1000 characters
                  </span>
                  <Button size="sm" data-testid="button-save-notes">
                    Save Notes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* HIPAA Warning */}
            <Card className="border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm text-orange-800 dark:text-orange-200 mb-1">
                      HIPAA Compliance Reminder
                    </h4>
                    <p className="text-xs text-orange-700 dark:text-orange-300">
                      Never include patient-identifying information in your notes. This includes names, 
                      dates of birth, medical record numbers, or any other PHI.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}