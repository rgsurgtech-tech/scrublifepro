import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Star, Download, Share, Clock, AlertCircle, CheckCircle, Eye, FileText, Wrench, User, Pill, Info, Lightbulb } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

// Import surgical instrument images
import laparoscopicSetImage from "@assets/stock_images/laparoscopic_surgica_2f77ae4e.jpg";
import grasperImage from "@assets/stock_images/laparoscopic_surgica_d230030e.jpg";
import trocarImage from "@assets/stock_images/laparoscopic_surgica_4e4a2a75.jpg";
import laparoscopeImage from "@assets/stock_images/laparoscopic_surgica_ea48bdf4.jpg";
import electrocauteryImage from "@assets/stock_images/laparoscopic_surgica_47f97ae1.jpg";
import harmonicScalpelImage from "@assets/stock_images/harmonic_scalpel_ult_e37fe3a8.jpg";

interface ProcedureDetailProps {
  procedure: any;
  onBack: () => void;
}

export default function ProcedureDetail({ procedure, onBack }: ProcedureDetailProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(procedure?.isFavorite || false);
  const [personalNotes, setPersonalNotes] = useState("");
  const [selectedInstrument, setSelectedInstrument] = useState<string | null>(null);
  const [showInstrumentDialog, setShowInstrumentDialog] = useState(false);

  // Get procedure ID - handle both mock and real procedure data
  const procedureId = procedure?.id || "mock-procedure-1";

  // Fetch existing notes for this procedure
  const { data: existingNotes } = useQuery({
    queryKey: ['/api/user/notes', procedureId],
    queryFn: async () => {
      if (!user) return null;
      const response = await fetch(`/api/user/notes/${procedureId}`, {
        credentials: 'include'
      });
      if (response.status === 401) return null;
      if (!response.ok) throw new Error('Failed to fetch notes');
      return response.json();
    },
    enabled: !!user && !!procedureId
  });

  // Update local notes state when data is fetched
  useEffect(() => {
    if (existingNotes?.content) {
      setPersonalNotes(existingNotes.content);
    }
  }, [existingNotes]);

  // Save notes mutation
  // Instrument details database with enhanced information
  const instrumentDetails = {
    "Major laparoscopy set": {
      name: "Major Laparoscopy Set",
      category: "Surgical Set",
      description: "Complete instrument set for laparoscopic procedures including all essential tools for minimally invasive surgery",
      contents: ["5mm and 10mm trocars", "Laparoscopic graspers (Maryland, DeBakey, Wave)", "Laparoscopic Metz scissors", "Clip appliers with titanium clips", "L-hook electrocautery", "Suction/irrigation system"],
      usage: "Used for minimally invasive surgical procedures through small keyhole incisions. Provides complete surgical capability for procedures like cholecystectomy, appendectomy, and hernia repair",
      specifications: "Sterile, reusable instruments with autoclave capability. Standard 5mm diameter for working ports, 10-12mm for specimen extraction",
      image: "laparoscopic_surgica_2f77ae4e.jpg",
      setupTips: ["Arrange instruments by frequency of use", "Have backup clips readily available", "Test all electrical connections before procedure", "Ensure camera white balance is optimized"]
    },
    "Basic laparotomy set": {
      name: "Basic Laparotomy Set", 
      category: "Surgical Set",
      description: "Standard open surgical instrument set",
      contents: ["Scalpels", "Forceps", "Hemostats", "Retractors", "Scissors", "Needle holders"],
      usage: "Used for open abdominal surgical procedures",
      specifications: "Sterile, reusable surgical instruments for open surgery"
    },
    "Electrocautery": {
      name: "Electrosurgical Unit (ESU)",
      category: "Energy Device",
      description: "High-frequency electrical current device for cutting tissue and achieving hemostasis. Provides both cutting and coagulation modes for tissue manipulation",
      contents: ["RF generator with digital display", "L-hook electrocautery electrode", "Monopolar and bipolar handpieces", "Foot pedal with dual activation", "Grounding pad for patient safety"],
      usage: "Primary cutting and coagulation for tissue dissection. L-hook electrode ideal for gallbladder dissection from liver bed. Provides precise control of bleeding vessels during laparoscopic procedures",
      specifications: "Adjustable power settings 1-100W. Pure cut, blend, and coag modes. Patient return electrode monitoring. Isolated output for patient safety. Compatible with all laparoscopic instruments",
      image: "laparoscopic_surgica_47f97ae1.jpg",
      setupTips: ["Verify grounding pad placement", "Set appropriate power levels", "Have suction ready for smoke evacuation", "Check electrode tip condition"]
    },
    "5mm and 10mm trocars (4 total)": {
      name: "Laparoscopic Trocar System",
      category: "Access Port",
      description: "Sharp-pointed cannulated instruments that provide access ports for laparoscopic surgery. Create sealed entry points while maintaining pneumoperitoneum",
      contents: ["One 10-12mm primary umbilical trocar", "Three 5mm secondary working trocars", "Safety shields with spring-loaded tips", "CO2 stopcock valves", "Reduction sleeves for smaller instruments"],
      usage: "Primary trocar inserted at umbilicus for camera. Secondary trocars placed under direct visualization for working instruments. Maintains sealed access while allowing instrument exchange",
      specifications: "Disposable or reusable options. Safety mechanisms include spring-loaded shields and visual confirmation systems. Various tip designs: pyramidal, conical, or bladed for different tissue types",
      image: "laparoscopic_surgica_4e4a2a75.jpg",
      setupTips: ["Check all valves before insertion", "Have various sizes available", "Ensure CO2 connections are secure", "Position for optimal triangulation"]
    },
    "Laparoscope (0° and 30°)": {
      name: "Laparoscopic Camera System",
      category: "Visualization",
      description: "High-definition telescopic camera system providing illuminated visualization of the abdominal cavity. Available in different viewing angles for optimal visualization",
      contents: ["0-degree straight scope for direct viewing", "30-degree angled scope for enhanced visualization", "Fiber optic light cable", "HD camera head with zoom capability", "Anti-fog warming system"],
      usage: "Primary visualization tool inserted through umbilical port. 0-degree scope for initial inspection and general viewing. 30-degree scope for viewing behind organs and into tight spaces",
      specifications: "5mm or 10mm diameter options. Full HD 1080p resolution. Autoclavable lens system. LED or xenon light source compatibility. Anti-fog coating standard",
      image: "laparoscopic_surgica_ea48bdf4.jpg",
      setupTips: ["Warm scope to prevent fogging", "White balance before use", "Have anti-fog solution ready", "Check light source intensity"]
    },
    "Graspers (atraumatic)": {
      name: "Atraumatic Graspers",
      category: "Grasping Instrument",
      description: "Gentle grasping forceps designed to minimize tissue damage during laparoscopic procedures. Features fenestrated or serrated jaws for secure grip without crushing delicate tissues",
      contents: ["5mm diameter shafts", "Fenestrated atraumatic tips", "360-degree rotation capability", "Locking ratchet mechanism", "Insulated shaft for electrocautery safety"],
      usage: "Primary use for gentle tissue manipulation, organ retraction, and gallbladder fundus grasping. Essential for maintaining traction during dissection while minimizing tissue trauma",
      specifications: "Standard 5mm diameter, 34-37cm length (45cm for bariatric). Autoclavable stainless steel construction. Multiple jaw patterns: fenestrated, wave, Maryland dissector",
      image: "laparoscopic_surgica_d230030e.jpg",
      setupTips: ["Have multiple graspers available for assistant", "Check jaw alignment before use", "Ensure proper insulation for electrocautery", "Position within easy reach for frequent use"]
    },
    "Clips (titanium/absorbable)": {
      name: "Surgical Clips",
      category: "Hemostasis",
      description: "Small clips used to occlude blood vessels and ducts",
      contents: ["Titanium clips", "Absorbable clips", "Clip applier"],
      usage: "Vessel ligation and duct occlusion",
      specifications: "MRI-compatible titanium or bioabsorbable materials"
    },
    "Endocatch bag": {
      name: "Specimen Retrieval Bag",
      category: "Retrieval Device",
      description: "Sterile bag for safe specimen removal during laparoscopy",
      contents: ["Deployable bag", "Drawstring closure", "Handle mechanism"],
      usage: "Contains specimens during extraction to prevent contamination",
      specifications: "Various sizes available, puncture-resistant material"
    },
    "Harmonic scalpel or LigaSure": {
      name: "Harmonic Ultrasonic Scalpel",
      category: "Energy Device",
      description: "Advanced ultrasonic cutting and coagulation device that converts electrical energy to mechanical vibration at 55,500 Hz. Provides simultaneous cutting and sealing with minimal thermal spread",
      contents: ["Ultrasonic generator unit", "Piezoelectric handpiece", "Interchangeable blade assemblies (hook, shear, blade)", "Foot pedal activation", "Irrigation capability"],
      usage: "Primary cutting and vessel sealing instrument for laparoscopic procedures. Seals vessels up to 5mm diameter (shears) or 2mm (hook/blade). Eliminates need for clips on smaller vessels",
      specifications: "Operating frequency: 55,500 Hz. Minimal lateral thermal spread (2-3mm). No smoke production. Precise tissue effect with reduced operating time. Compatible with standard 5mm trocars",
      image: "harmonic_scalpel_ult_e37fe3a8.jpg",
      setupTips: ["Test activation before procedure", "Have backup electrocautery available", "Ensure proper blade selection for procedure", "Irrigation ready for tissue cooling"]
    },
    "Trocars": {
      name: "Laparoscopic Trocar System",
      category: "Access Device",
      description: "Sharp-pointed cannulated instruments that provide access ports for laparoscopic surgery. Create sealed entry points while maintaining pneumoperitoneum",
      contents: ["One 10-12mm primary umbilical trocar", "Three 5mm secondary working trocars", "Safety shields with spring-loaded tips", "CO2 stopcock valves", "Reduction sleeves for smaller instruments"],
      usage: "Primary trocar inserted at umbilicus for camera. Secondary trocars placed under direct visualization for working instruments. Maintains sealed access while allowing instrument exchange",
      specifications: "Disposable or reusable options. Safety mechanisms include spring-loaded shields and visual confirmation systems. Various tip designs: pyramidal, conical, or bladed for different tissue types",
      image: "laparoscopic_surgica_4e4a2a75.jpg",
      setupTips: ["Check all valves before insertion", "Have various sizes available", "Ensure CO2 connections are secure", "Position for optimal triangulation"]
    },
    "Veress needle": {
      name: "Veress Insufflation Needle",
      category: "Insufflation",
      description: "Safety needle with spring-loaded mechanism for creating pneumoperitoneum. Designed to prevent organ injury during CO2 insufflation with automatic retraction feature",
      contents: ["Spring-loaded safety needle (2.0mm)", "Luer-lock gas connection", "Stopcock for gas control", "Safety mechanism with tactile feedback", "Disposable sterile packaging"],
      usage: "Primary method for creating pneumoperitoneum by blind insertion technique. Essential for establishing working space before trocar placement in laparoscopic surgery",
      specifications: "2.0mm diameter needle with spring-loaded obturator. Automatic retraction upon entering peritoneal cavity. Maximum insufflation pressure 25 mmHg. Single-use disposable",
      image: "laparoscopic_surgica_2f77ae4e.jpg",
      setupTips: ["Test spring mechanism before insertion", "Ensure proper patient positioning for insertion", "Monitor insufflation pressure carefully", "Have alternative access method ready", "Verify proper placement with aspiration test"]
    },
    "CO2 line": {
      name: "CO2 Insufflation Line",
      category: "Insufflation",
      description: "Sterile tubing system for delivering CO2 gas from insufflator to patient. Essential component for creating and maintaining pneumoperitoneum during laparoscopic procedures",
      contents: ["High-pressure CO2 tubing", "Luer-lock connectors", "In-line filter system", "Flow regulator valve", "Pressure monitoring sensors"],
      usage: "Delivers controlled CO2 flow from insufflator to Veress needle or trocars. Maintains pneumoperitoneum pressure at 12-15 mmHg throughout procedure",
      specifications: "Single-use sterile system, pressure rated to 30 mmHg. Temperature compensated for warmed CO2. Includes safety pressure relief valves and flow monitoring",
      image: "laparoscopic_surgica_2f77ae4e.jpg",
      setupTips: ["Check all connections for proper seal", "Ensure CO2 cylinder levels are adequate", "Test pressure alarms before procedure", "Prime line to remove air bubbles", "Monitor CO2 flow rates throughout case"]
    },
    "Scissors": {
      name: "Laparoscopic Scissors",
      category: "Cutting Instrument",
      description: "Precision cutting instruments for laparoscopic surgery with electrosurgical capability. Available in monopolar and bipolar configurations for precise tissue cutting and dissection",
      contents: ["Curved laparoscopic scissors (monopolar)", "Straight laparoscopic scissors", "Metzenbaum-type curved tips", "Hook scissors with L-blade", "Micro scissors for fine dissection"],
      usage: "Primary cutting instrument for tissue dissection, adhesiolysis, suture cutting, and fibrous band division. Essential for delicate tissue planes and precision cutting tasks",
      specifications: "5mm shaft diameter, 36cm working length, insulated to jaw tips. Monopolar capability with standard electrocautery generators. Curved or straight jaw options",
      image: "laparoscopic_surgica_ea48bdf4.jpg",
      setupTips: ["Test scissors action before procedure begins", "Ensure electrocautery settings are appropriate", "Have backup scissors available", "Position within easy reach for frequent use", "Check insulation integrity before each case"]
    },
    "Suture": {
      name: "Laparoscopic Surgical Sutures",
      category: "Closure Material",
      description: "Specialized suture materials designed for laparoscopic procedures with enhanced handling characteristics. Available in absorbable and non-absorbable materials for various tissue types",
      contents: ["2-0 Vicryl (polyglactin) absorbable", "0 PDS (polydioxanone) long-term absorbable", "2-0 Silk non-absorbable for ties", "Barbed sutures for continuous closure", "Various needle types (curved, straight, cutting, taper)"],
      usage: "Primary closure of fascial defects, vessel ligation with ties, tissue approximation, and hemostasis. Essential for port site closure and internal suturing during laparoscopic procedures",
      specifications: "Multiple materials: Vicryl (7-14 day absorption), PDS (180+ day absorption), Silk (permanent). Needle types: 1/2 circle taper, 3/8 circle cutting. Lengths 12-36 inches",
      image: "laparoscopic_surgica_d230030e.jpg",
      setupTips: ["Pre-cut sutures to appropriate lengths", "Have various needle types ready", "Use barbed sutures for continuous closure", "Keep sutures organized by type and size", "Consider tissue type when selecting material"]
    },
    "Needle holders": {
      name: "Laparoscopic Needle Drivers",
      category: "Suturing Instrument", 
      description: "Precision needle holders designed for laparoscopic suturing with secure needle grip and optimal hand positioning. Essential for intracorporeal and extracorporeal suturing techniques",
      contents: ["Curved jaw needle driver (most common)", "Straight jaw needle driver", "Self-righting needle driver with rotation", "Barbed suture compatible drivers", "Micro needle drivers for fine work"],
      usage: "Precise needle manipulation for suturing, knot tying, and closure techniques. Critical for securing anastomoses, tissue approximation, and hemostasis suturing",
      specifications: "5mm diameter, 36cm length, carbide jaw inserts for durability. Ratchet locking mechanism with precise grip pressure. Compatible with all needle sizes 0-6",
      image: "laparoscopic_surgica_d230030e.jpg",
      setupTips: ["Test jaw alignment and ratchet function", "Have multiple drivers available for continuous suturing", "Position for both surgeon and assistant use", "Check carbide insert condition"]
    }
  };

  // Get instrument image based on filename
  const getInstrumentImage = (imageName: string) => {
    const imageMap: Record<string, string> = {
      "laparoscopic_surgica_2f77ae4e.jpg": laparoscopicSetImage,
      "laparoscopic_surgica_d230030e.jpg": grasperImage,
      "laparoscopic_surgica_4e4a2a75.jpg": trocarImage,
      "laparoscopic_surgica_ea48bdf4.jpg": laparoscopeImage,
      "laparoscopic_surgica_47f97ae1.jpg": electrocauteryImage,
      "harmonic_scalpel_ult_e37fe3a8.jpg": harmonicScalpelImage
    };
    return imageMap[imageName] || null;
  };

  // Handle instrument click
  const handleInstrumentClick = (instrumentName: string) => {
    setSelectedInstrument(instrumentName);
    setShowInstrumentDialog(true);
  };

  const saveNotesMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await apiRequest('POST', '/api/user/notes', {
        procedureId,
        content
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/user/notes', procedureId] });
      toast({
        title: 'Notes saved!',
        description: 'Your personal notes have been saved successfully.'
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to save notes',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  const handleSaveNotes = () => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to save notes.',
        variant: 'destructive'
      });
      return;
    }
    
    if (personalNotes.trim().length === 0) {
      toast({
        title: 'No content to save',
        description: 'Please add some notes before saving.',
        variant: 'destructive'
      });
      return;
    }

    saveNotesMutation.mutate(personalNotes);
  };

  // Use real procedure data if available, fallback to mock data for development
  const mockDetailedProcedure = {
    id: "mock-1",
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

  // Use real procedure data if available, fallback to mock data
  const procedure_data = procedure || mockDetailedProcedure;

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
                {procedure_data.tips.map((tip: string, index: number) => (
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
                {procedure_data.complications.map((complication: string, index: number) => (
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
                  {procedure_data.positioning.steps.map((step: string, index: number) => (
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
                  {procedure_data.draping.steps.map((step: string, index: number) => (
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
                    {procedure_data.instruments.basicSet.map((instrument: string, index: number) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="text-xs cursor-pointer hover-elevate transition-colors"
                        onClick={() => handleInstrumentClick(instrument)}
                        data-testid={`badge-instrument-${instrument.toLowerCase().replace(/\s/g, '-')}`}
                      >
                        <Info className="w-3 h-3 mr-1" />
                        {instrument}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Special Instruments</h4>
                  <div className="space-y-1">
                    {procedure_data.instruments.specialInstruments.map((instrument: string, index: number) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-2 text-sm cursor-pointer hover-elevate p-2 rounded-md transition-colors"
                        onClick={() => handleInstrumentClick(instrument)}
                        data-testid={`item-instrument-${instrument.toLowerCase().replace(/\s/g, '-')}`}
                      >
                        <Info className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="underline-offset-4 hover:underline">{instrument}</span>
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
                    {procedure_data.mayoSetup.essentials.map((item: string, index: number) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="text-xs cursor-pointer hover-elevate transition-colors"
                        onClick={() => handleInstrumentClick(item)}
                        data-testid={`badge-mayo-${item.toLowerCase().replace(/\s/g, '-')}`}
                      >
                        <Info className="w-3 h-3 mr-1" />
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
                  {procedure_data.procedureSteps.steps.map((step: any) => (
                    <div key={step.step} className="border-l-2 border-primary pl-4 pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                          {step.step}
                        </span>
                        <h4 className="font-semibold text-sm">{step.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {step.instruments.map((instrument: string, index: number) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="text-xs cursor-pointer hover-elevate transition-colors"
                            onClick={() => handleInstrumentClick(instrument)}
                            data-testid={`badge-step-instrument-${instrument.toLowerCase().replace(/\s/g, '-')}`}
                          >
                            <Info className="w-3 h-3 mr-1" />
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
                  {procedure_data.medications.items.map((med: any, index: number) => (
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
                  <Button 
                    size="sm" 
                    onClick={handleSaveNotes}
                    disabled={saveNotesMutation.isPending}
                    data-testid="button-save-notes"
                  >
                    {saveNotesMutation.isPending ? 'Saving...' : 'Save Notes'}
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

      {/* Instrument Details Modal */}
      <Dialog open={showInstrumentDialog} onOpenChange={setShowInstrumentDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              Instrument Details
            </DialogTitle>
            <DialogDescription>
              Detailed information about this surgical instrument
            </DialogDescription>
          </DialogHeader>
          
          {selectedInstrument && instrumentDetails[selectedInstrument as keyof typeof instrumentDetails] && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{instrumentDetails[selectedInstrument as keyof typeof instrumentDetails].name}</h3>
                <Badge variant="outline" className="mt-1">
                  {instrumentDetails[selectedInstrument as keyof typeof instrumentDetails].category}
                </Badge>
              </div>

              {/* Instrument Image */}
              {(instrumentDetails[selectedInstrument as keyof typeof instrumentDetails] as any).image && (
                <div>
                  <img 
                    src={getInstrumentImage((instrumentDetails[selectedInstrument as keyof typeof instrumentDetails] as any).image) || ''} 
                    alt={instrumentDetails[selectedInstrument as keyof typeof instrumentDetails].name}
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                </div>
              )}
              
              <div>
                <h4 className="font-semibold text-sm mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">
                  {instrumentDetails[selectedInstrument as keyof typeof instrumentDetails].description}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm mb-2">Contents/Components</h4>
                <div className="space-y-1">
                  {instrumentDetails[selectedInstrument as keyof typeof instrumentDetails].contents.map((item: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm mb-2">Usage</h4>
                <p className="text-sm text-muted-foreground">
                  {instrumentDetails[selectedInstrument as keyof typeof instrumentDetails].usage}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm mb-2">Specifications</h4>
                <p className="text-sm text-muted-foreground">
                  {instrumentDetails[selectedInstrument as keyof typeof instrumentDetails].specifications}
                </p>
              </div>

              {/* Setup Tips */}
              {(instrumentDetails[selectedInstrument as keyof typeof instrumentDetails] as any).setupTips && (
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    Setup Tips
                  </h4>
                  <div className="space-y-1">
                    {(instrumentDetails[selectedInstrument as keyof typeof instrumentDetails] as any).setupTips.map((tip: string, index: number) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0 mt-1.5"></div>
                        <span className="text-muted-foreground">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {selectedInstrument && !instrumentDetails[selectedInstrument as keyof typeof instrumentDetails] && (
            <div className="text-center py-6">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Information Not Available</h3>
              <p className="text-sm text-muted-foreground">
                Detailed information for "{selectedInstrument}" is not currently available in our database.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}