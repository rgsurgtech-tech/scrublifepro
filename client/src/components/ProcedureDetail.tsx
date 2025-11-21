import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Star, Download, Share, Clock, AlertCircle, CheckCircle, Eye, FileText, Wrench, User, Pill, Info, Lightbulb, Play } from "lucide-react";
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
  const [, setLocation] = useLocation();
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

  // Fetch related videos for this procedure
  const { data: relatedVideos, isLoading: videosLoading } = useQuery({
    queryKey: ['/api/videos', 'procedure', procedureId],
    queryFn: async () => {
      const response = await fetch(`/api/videos?procedureId=${procedureId}`);
      if (!response.ok) throw new Error('Failed to fetch related videos');
      return response.json();
    },
    enabled: !!procedureId
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
    // Add shorter name aliases that match mayo setup and procedure steps
    "Trocars": {
      name: "Laparoscopic Trocar System",
      category: "Access Port",
      description: "Disposable access ports for laparoscopic surgery with safety mechanisms and gas seals",
      contents: ["10mm primary trocar with camera port", "Three 5mm working ports", "Safety shields", "CO2 seals", "Retractable blade system"],
      usage: "Creates pneumoperitoneum access and maintains working ports throughout surgery. Primary port for camera, secondary ports for instruments",
      specifications: "Disposable single-use system. 10mm camera port, 5mm working ports. Spring-loaded safety shield, universal threading",
      image: trocarImage,
      setupTips: ["Verify trocar seal integrity", "Use gentle twisting motion during insertion", "Ensure proper angle for optimal visualization", "Have backup trocars available"]
    },
    "Clips": {
      name: "Surgical Clips",
      category: "Hemostatic Device", 
      description: "Titanium and absorbable clips for vessel and duct occlusion with precise application",
      contents: ["Titanium clips (small, medium, large)", "Absorbable clips for temporary occlusion", "Clip applier with reload cartridges", "Clip remover (backup)"],
      usage: "Secure occlusion of cystic artery and duct during cholecystectomy. Provides permanent hemostasis without electrocautery burns",
      specifications: "Titanium clips: MRI safe, permanent implant. Absorbable clips: 7-14 day absorption. Size range: 5-15mm jaw opening",
      setupTips: ["Load clips before procedure starts", "Have multiple sizes available", "Check clip applier jaw alignment", "Keep clips organized by size"]
    },
    "Laparoscope": {
      name: "Laparoscopic Camera System",
      category: "Visualization",
      description: "High-definition laparoscopic camera system with 0° and 30° viewing angles for optimal surgical visualization",
      contents: ["0° laparoscope for direct viewing", "30° laparoscope for angled views", "High-definition camera head", "LED light source", "Anti-fog solution"],
      usage: "Primary visualization tool for laparoscopic surgery. 0° for initial inspection, 30° for viewing behind structures and achieving critical view",
      specifications: "10mm diameter, HD 1080p resolution, autoclavable lens system, LED illumination 5000K color temperature",
      image: laparoscopeImage,
      setupTips: ["White balance before insertion", "Apply anti-fog solution", "Check light intensity", "Have backup laparoscope ready"]
    },
    "Graspers": {
      name: "Atraumatic Graspers",
      category: "Manipulation Tool",
      description: "Precision grasping instruments designed for delicate tissue handling without perforation or trauma",
      contents: ["Maryland dissector graspers", "Fenestrated graspers for gallbladder", "Wave graspers for improved grip", "DeBakey atraumatic tips"],
      usage: "Primary use for gentle tissue manipulation, organ retraction, and gallbladder fundus grasping. Essential for maintaining traction during dissection while minimizing tissue trauma",
      specifications: "Standard 5mm diameter, 34-37cm length (45cm for bariatric). Autoclavable stainless steel construction. Multiple jaw patterns: fenestrated, wave, Maryland dissector",
      image: grasperImage,
      setupTips: ["Have multiple graspers available for assistant", "Check jaw alignment before use", "Ensure proper insulation for electrocautery", "Position within easy reach for frequent use"]
    },
    "Major laparoscopy set": {
      name: "Major Laparoscopy Set",
      category: "Surgical Set",
      description: "Complete instrument set for laparoscopic procedures including all essential tools for minimally invasive surgery",
      contents: ["5mm and 10mm trocars", "Laparoscopic graspers (Maryland, DeBakey, Wave)", "Laparoscopic Metz scissors", "Clip appliers with titanium clips", "L-hook electrocautery", "Suction/irrigation system"],
      usage: "Used for minimally invasive surgical procedures through small keyhole incisions. Provides complete surgical capability for procedures like cholecystectomy, appendectomy, and hernia repair",
      specifications: "Sterile, reusable instruments with autoclave capability. Standard 5mm diameter for working ports, 10-12mm for specimen extraction",
      image: laparoscopicSetImage,
      setupTips: ["Arrange instruments by frequency of use", "Have backup clips readily available", "Test all electrical connections before procedure", "Ensure camera white balance is optimized"]
    },
    "Basic laparotomy set": {
      name: "Basic Laparotomy Set", 
      category: "Surgical Set",
      description: "Essential instruments for open abdominal surgical procedures requiring access to peritoneal cavity and comprehensive surgical capability",
      contents: ["Large Richardson retractors", "Intestinal clamps (Doyen, Allen)", "Long instruments (45cm)", "Laparotomy sponges", "Deep suction devices", "Closure materials", "Large hemostats", "Extended needle holders"],
      usage: "Standard set for open abdominal surgeries, emergency procedures, trauma surgery, and when laparoscopic approach is not suitable. Provides complete surgical capability for major abdominal access",
      specifications: "Extended length instruments 30-45cm, heavy-duty construction for deep tissue work, various retractor sizes for optimal exposure, steam sterilizable, stainless steel construction",
      image: grasperImage,
      setupTips: ["Organize instruments by depth and function", "Check all retractor mechanisms before procedure", "Ensure adequate exposure tools for deep abdominal work", "Have irrigation system ready", "Plan closure materials in advance", "Position large instruments for easy access"]
    },
    "Electrocautery": {
      name: "Electrosurgical Unit (ESU)",
      category: "Energy Device",
      description: "High-frequency electrical current device for cutting tissue and achieving hemostasis. Provides both cutting and coagulation modes for tissue manipulation",
      contents: ["RF generator with digital display", "L-hook electrocautery electrode", "Monopolar and bipolar handpieces", "Foot pedal with dual activation", "Grounding pad for patient safety"],
      usage: "Primary cutting and coagulation for tissue dissection. L-hook electrode ideal for gallbladder dissection from liver bed. Provides precise control of bleeding vessels during laparoscopic procedures",
      specifications: "Adjustable power settings 1-100W. Pure cut, blend, and coag modes. Patient return electrode monitoring. Isolated output for patient safety. Compatible with all laparoscopic instruments",
      image: electrocauteryImage,
      setupTips: ["Verify grounding pad placement", "Set appropriate power levels", "Have suction ready for smoke evacuation", "Check electrode tip condition"]
    },
    "5mm and 10mm trocars (4 total)": {
      name: "Laparoscopic Trocar System",
      category: "Access Port",
      description: "Sharp-pointed cannulated instruments that provide access ports for laparoscopic surgery. Create sealed entry points while maintaining pneumoperitoneum",
      contents: ["One 10-12mm primary umbilical trocar", "Three 5mm secondary working trocars", "Safety shields with spring-loaded tips", "CO2 stopcock valves", "Reduction sleeves for smaller instruments"],
      usage: "Primary trocar inserted at umbilicus for camera. Secondary trocars placed under direct visualization for working instruments. Maintains sealed access while allowing instrument exchange",
      specifications: "Disposable or reusable options. Safety mechanisms include spring-loaded shields and visual confirmation systems. Various tip designs: pyramidal, conical, or bladed for different tissue types",
      image: trocarImage,
      setupTips: ["Check all valves before insertion", "Have various sizes available", "Ensure CO2 connections are secure", "Position for optimal triangulation"]
    },
    "Laparoscope (0° and 30°)": {
      name: "Laparoscopic Camera System",
      category: "Visualization",
      description: "High-definition telescopic camera system providing illuminated visualization of the abdominal cavity. Available in different viewing angles for optimal visualization",
      contents: ["0-degree straight scope for direct viewing", "30-degree angled scope for enhanced visualization", "Fiber optic light cable", "HD camera head with zoom capability", "Anti-fog warming system"],
      usage: "Primary visualization tool inserted through umbilical port. 0-degree scope for initial inspection and general viewing. 30-degree scope for viewing behind organs and into tight spaces",
      specifications: "5mm or 10mm diameter options. Full HD 1080p resolution. Autoclavable lens system. LED or xenon light source compatibility. Anti-fog coating standard",
      image: laparoscopeImage,
      setupTips: ["Warm scope to prevent fogging", "White balance before use", "Have anti-fog solution ready", "Check light source intensity"]
    },
    "Graspers (atraumatic)": {
      name: "Atraumatic Graspers",
      category: "Grasping Instrument",
      description: "Gentle grasping forceps designed to minimize tissue damage during laparoscopic procedures. Features fenestrated or serrated jaws for secure grip without crushing delicate tissues",
      contents: ["5mm diameter shafts", "Fenestrated atraumatic tips", "360-degree rotation capability", "Locking ratchet mechanism", "Insulated shaft for electrocautery safety"],
      usage: "Primary use for gentle tissue manipulation, organ retraction, and gallbladder fundus grasping. Essential for maintaining traction during dissection while minimizing tissue trauma",
      specifications: "Standard 5mm diameter, 34-37cm length (45cm for bariatric). Autoclavable stainless steel construction. Multiple jaw patterns: fenestrated, wave, Maryland dissector",
      image: grasperImage,
      setupTips: ["Have multiple graspers available for assistant", "Check jaw alignment before use", "Ensure proper insulation for electrocautery", "Position within easy reach for frequent use"]
    },
    "Clips (titanium/absorbable)": {
      name: "Surgical Clips",
      category: "Hemostasis",
      description: "Small clips used to occlude blood vessels and ducts",
      contents: ["Titanium clips", "Absorbable clips", "Clip applier"],
      usage: "Vessel ligation and duct occlusion",
      specifications: "MRI-compatible titanium or bioabsorbable materials",
      image: grasperImage,
      setupTips: ["Have multiple clip sizes available", "Test clip applier before use", "Check MRI compatibility if needed", "Prepare both titanium and absorbable options"]
    },
    "Endocatch bag": {
      name: "Specimen Retrieval Bag",
      category: "Retrieval Device",
      description: "Sterile bag for safe specimen removal during laparoscopy",
      contents: ["Deployable bag", "Drawstring closure", "Handle mechanism"],
      usage: "Contains specimens during extraction to prevent contamination",
      specifications: "Various sizes available, puncture-resistant material",
      image: grasperImage,
      setupTips: ["Select appropriate bag size", "Deploy completely before specimen insertion", "Close drawstring securely", "Extract through adequate port size"]
    },
    "Harmonic scalpel or LigaSure": {
      name: "Harmonic Ultrasonic Scalpel",
      category: "Energy Device",
      description: "Advanced ultrasonic cutting and coagulation device that converts electrical energy to mechanical vibration at 55,500 Hz. Provides simultaneous cutting and sealing with minimal thermal spread",
      contents: ["Ultrasonic generator unit", "Piezoelectric handpiece", "Interchangeable blade assemblies (hook, shear, blade)", "Foot pedal activation", "Irrigation capability"],
      usage: "Primary cutting and vessel sealing instrument for laparoscopic procedures. Seals vessels up to 5mm diameter (shears) or 2mm (hook/blade). Eliminates need for clips on smaller vessels",
      specifications: "Operating frequency: 55,500 Hz. Minimal lateral thermal spread (2-3mm). No smoke production. Precise tissue effect with reduced operating time. Compatible with standard 5mm trocars",
      image: harmonicScalpelImage,
      setupTips: ["Test activation before procedure", "Have backup electrocautery available", "Ensure proper blade selection for procedure", "Irrigation ready for tissue cooling"]
    },
    "Veress needle": {
      name: "Veress Insufflation Needle",
      category: "Insufflation",
      description: "Safety needle with spring-loaded mechanism for creating pneumoperitoneum. Designed to prevent organ injury during CO2 insufflation with automatic retraction feature",
      contents: ["Spring-loaded safety needle (2.0mm)", "Luer-lock gas connection", "Stopcock for gas control", "Safety mechanism with tactile feedback", "Disposable sterile packaging"],
      usage: "Primary method for creating pneumoperitoneum by blind insertion technique. Essential for establishing working space before trocar placement in laparoscopic surgery",
      specifications: "2.0mm diameter needle with spring-loaded obturator. Automatic retraction upon entering peritoneal cavity. Maximum insufflation pressure 25 mmHg. Single-use disposable",
      image: laparoscopicSetImage,
      setupTips: ["Test spring mechanism before insertion", "Ensure proper patient positioning for insertion", "Monitor insufflation pressure carefully", "Have alternative access method ready", "Verify proper placement with aspiration test"]
    },
    "CO2 line": {
      name: "CO2 Insufflation Line",
      category: "Insufflation",
      description: "Sterile tubing system for delivering CO2 gas from insufflator to patient. Essential component for creating and maintaining pneumoperitoneum during laparoscopic procedures",
      contents: ["High-pressure CO2 tubing", "Luer-lock connectors", "In-line filter system", "Flow regulator valve", "Pressure monitoring sensors"],
      usage: "Delivers controlled CO2 flow from insufflator to Veress needle or trocars. Maintains pneumoperitoneum pressure at 12-15 mmHg throughout procedure",
      specifications: "Single-use sterile system, pressure rated to 30 mmHg. Temperature compensated for warmed CO2. Includes safety pressure relief valves and flow monitoring",
      image: laparoscopicSetImage,
      setupTips: ["Check all connections for proper seal", "Ensure CO2 cylinder levels are adequate", "Test pressure alarms before procedure", "Prime line to remove air bubbles", "Monitor CO2 flow rates throughout case"]
    },
    "Scissors": {
      name: "Laparoscopic Scissors",
      category: "Cutting Instrument",
      description: "Precision cutting instruments for laparoscopic surgery with electrosurgical capability. Available in monopolar and bipolar configurations for precise tissue cutting and dissection",
      contents: ["Curved laparoscopic scissors (monopolar)", "Straight laparoscopic scissors", "Metzenbaum-type curved tips", "Hook scissors with L-blade", "Micro scissors for fine dissection"],
      usage: "Primary cutting instrument for tissue dissection, adhesiolysis, suture cutting, and fibrous band division. Essential for delicate tissue planes and precision cutting tasks",
      specifications: "5mm shaft diameter, 36cm working length, insulated to jaw tips. Monopolar capability with standard electrocautery generators. Curved or straight jaw options",
      image: laparoscopeImage,
      setupTips: ["Test scissors action before procedure begins", "Ensure electrocautery settings are appropriate", "Have backup scissors available", "Position within easy reach for frequent use", "Check insulation integrity before each case"]
    },
    "Suture": {
      name: "Laparoscopic Surgical Sutures",
      category: "Closure Material",
      description: "Specialized suture materials designed for laparoscopic procedures with enhanced handling characteristics. Available in absorbable and non-absorbable materials for various tissue types",
      contents: ["2-0 Vicryl (polyglactin) absorbable", "0 PDS (polydioxanone) long-term absorbable", "2-0 Silk non-absorbable for ties", "Barbed sutures for continuous closure", "Various needle types (curved, straight, cutting, taper)"],
      usage: "Primary closure of fascial defects, vessel ligation with ties, tissue approximation, and hemostasis. Essential for port site closure and internal suturing during laparoscopic procedures",
      specifications: "Multiple materials: Vicryl (7-14 day absorption), PDS (180+ day absorption), Silk (permanent). Needle types: 1/2 circle taper, 3/8 circle cutting. Lengths 12-36 inches",
      image: grasperImage,
      setupTips: ["Pre-cut sutures to appropriate lengths", "Have various needle types ready", "Use barbed sutures for continuous closure", "Keep sutures organized by type and size", "Consider tissue type when selecting material"]
    },
    // Additional aliases for instruments that appear in the procedure data
    "Laparoscopic set": {
      name: "Major Laparoscopy Set",
      category: "Surgical Set",
      description: "Complete instrument set for laparoscopic procedures including all essential tools for minimally invasive surgery",
      contents: ["5mm and 10mm trocars", "Laparoscopic graspers (Maryland, DeBakey, Wave)", "Laparoscopic Metz scissors", "Clip appliers with titanium clips", "L-hook electrocautery", "Suction/irrigation system"],
      usage: "Used for minimally invasive surgical procedures through small keyhole incisions. Provides complete surgical capability for procedures like cholecystectomy, appendectomy, and hernia repair",
      specifications: "Sterile, reusable instruments with autoclave capability. Standard 5mm diameter for working ports, 10-12mm for specimen extraction",
      image: laparoscopicSetImage,
      setupTips: ["Arrange instruments by frequency of use", "Have backup clips readily available", "Test all electrical connections before procedure", "Ensure camera white balance is optimized"]
    },
    "Bariatric instruments": {
      name: "Bariatric Surgery Set",
      category: "Specialized Set",
      description: "Extended length instruments designed specifically for bariatric surgery with enhanced reach and durability",
      contents: ["45cm length graspers", "Extended electrocautery devices", "Long laparoscopic scissors", "Bariatric clip appliers", "Reinforced suction systems"],
      usage: "Specialized instruments for bariatric procedures requiring extended reach due to increased tissue depth and specialized techniques",
      specifications: "Extended length (45cm) instruments, reinforced construction, compatible with standard trocars",
      image: laparoscopicSetImage,
      setupTips: ["Verify extended length instruments", "Test reinforced components", "Have adequate port sizes", "Prepare backup instruments", "Check reach before procedure"]
    },
    "Clip applier": {
      name: "Surgical Clip Applier",
      category: "Hemostatic Device", 
      description: "Precision clip application device for vessel and duct occlusion during laparoscopic procedures",
      contents: ["Clip applier handle", "Various clip sizes (small, medium, large)", "Reload cartridges", "Clip removal forceps"],
      usage: "Precise application of titanium clips for permanent vessel occlusion during laparoscopic surgery",
      specifications: "Autoclavable, reloadable cartridge system, fits standard 5mm ports",
      image: grasperImage,
      setupTips: ["Load clips before procedure", "Have multiple sizes ready", "Test clip deployment", "Keep reload cartridges available", "Check clip position before release"]
    },
    "Staplers": {
      name: "Linear Staplers",
      category: "Stapling Device",
      description: "Linear cutting staplers for tissue transection and anastomosis in bariatric procedures",
      contents: ["60mm linear stapler", "Various cartridge heights", "Reload cartridges", "Stapler anvil"],
      usage: "Primary tool for gastric sleeve creation and tissue division in bariatric surgery",
      specifications: "60mm staple line, multiple cartridge heights (2.5mm, 3.5mm, 4.8mm), single-use cartridges",
      image: harmonicScalpelImage,
      setupTips: ["Select appropriate cartridge height", "Check tissue thickness", "Fire stapler smoothly", "Inspect staple line", "Have reinforcement available"]
    },
    "Bougie": {
      name: "Bougie Dilator",
      category: "Sizing Tool",
      description: "Calibration tool used to ensure proper gastric sleeve diameter during bariatric procedures",
      contents: ["32-40 French bougie tubes", "Measurement markings", "Flexible tip design"],
      usage: "Inserted through the mouth to calibrate gastric sleeve size and ensure consistent diameter during stapling",
      specifications: "Single-use, graduated markings, flexible design for patient safety",
      image: trocarImage,
      setupTips: ["Select appropriate French size", "Lubricate before insertion", "Advance gently", "Verify position fluoroscopically", "Remove carefully after stapling"]
    },
    "Harmonic device": {
      name: "Harmonic Ultrasonic Scalpel",
      category: "Energy Device",
      description: "Advanced ultrasonic cutting and coagulation device providing superior hemostasis with minimal thermal spread",
      contents: ["Ultrasonic generator", "5mm harmonic scalpel handpiece", "Hook and shears attachments", "Foot pedal activation"],
      usage: "Simultaneous cutting and coagulation for precise tissue dissection. Ideal for thick tissue division with excellent hemostatic control and minimal smoke production",
      specifications: "55.5 kHz ultrasonic frequency, 5mm diameter, minimal lateral thermal spread (2mm), autoclavable handpieces",
      image: harmonicScalpelImage,
      setupTips: ["Test activation before insertion", "Use appropriate power settings for tissue type", "Keep blade clean during procedure", "Have backup energy device available"]
    },
    "Harmonic scalpel": {
      name: "Harmonic Ultrasonic Scalpel",
      category: "Energy Device",
      description: "Advanced ultrasonic cutting and coagulation device that converts electrical energy to mechanical vibration at 55,500 Hz. Provides simultaneous cutting and sealing with minimal thermal spread",
      contents: ["Ultrasonic generator unit", "Piezoelectric handpiece", "Interchangeable blade assemblies (hook, shear, blade)", "Foot pedal activation", "Irrigation capability"],
      usage: "Primary cutting and vessel sealing instrument for laparoscopic procedures. Seals vessels up to 5mm diameter (shears) or 2mm (hook/blade). Eliminates need for clips on smaller vessels",
      specifications: "Operating frequency: 55,500 Hz. Minimal lateral thermal spread (2-3mm). No smoke production. Precise tissue effect with reduced operating time. Compatible with standard 5mm trocars",
      image: harmonicScalpelImage,
      setupTips: ["Test activation before procedure", "Have backup electrocautery available", "Ensure proper blade selection for procedure", "Irrigation ready for tissue cooling"]
    },
    "General surgery set": {
      name: "General Surgery Set",
      category: "Surgical Set",
      description: "Comprehensive instrument set for open general surgical procedures including all essential tools for abdominal and general surgery",
      contents: ["Scalpels with various blade sizes (#10, #11, #15)", "Adson forceps with teeth", "Debakey forceps", "Allis clamps", "Kocher clamps", "Metzenbaum scissors", "Mayo scissors", "Needle holders (Olsen-Hegar, Mayo-Hegar)", "Army-Navy retractors", "Richardson retractors"],
      usage: "Standard instrument set for open general surgery procedures including appendectomy, hernia repair, bowel surgery, and general abdominal procedures",
      specifications: "Stainless steel construction, autoclavable, various sizes available. Includes cutting, grasping, clamping, and retracting instruments",
      image: laparoscopicSetImage,
      setupTips: ["Organize by function", "Check instrument sharpness", "Have extra blades available", "Ensure proper sterilization", "Arrange for surgeon preference"]
    },
    "Morcellator": {
      name: "Power Morcellator",
      category: "Cutting Device",
      description: "Electric surgical device for cutting tissue into smaller pieces for removal through small incisions. Features rotating cylindrical cutting blade with suction",
      contents: ["Electric motor unit", "Cutting blade assembly", "Various diameter tubes (12mm, 15mm)", "Suction attachment", "Safety guards", "Foot pedal control"],
      usage: "Used to divide large tissue specimens into smaller fragments for removal through small laparoscopic ports. Commonly used in appendectomy for specimen extraction",
      specifications: "Variable speed control, disposable cutting blades, integrated suction, safety mechanisms to prevent inadvertent activation",
      image: electrocauteryImage,
      setupTips: ["Test device before use", "Ensure proper blade attachment", "Have backup blades ready", "Check suction function", "Review safety protocols"]
    },
    // Orthopedic Surgery Instruments
    "Oscillating saw": {
      name: "Orthopedic Oscillating Saw",
      category: "Cutting Tool",
      description: "High-speed oscillating saw for precise bone cutting during orthopedic procedures with minimal heat generation",
      contents: ["Electric motor unit", "Various blade attachments", "Depth guides", "Irrigation attachment", "Safety guards"],
      usage: "Primary tool for bone cuts during joint replacement, fracture repair, and osteotomies. Provides precise cuts with minimal bone damage",
      specifications: "Variable speed 0-18,000 oscillations/min, sterile disposable blades, integrated irrigation, ergonomic design",
      image: electrocauteryImage,
      setupTips: ["Test saw before procedure", "Have multiple blade types ready", "Ensure irrigation is functioning", "Check depth guides", "Maintain steady pressure"]
    },
    "Reciprocating saw": {
      name: "Orthopedic Reciprocating Saw",
      category: "Cutting Tool", 
      description: "Heavy-duty reciprocating saw for larger bone cuts and revision procedures requiring aggressive bone removal",
      contents: ["Electric motor", "Reciprocating blade system", "Various blade lengths", "Protective guards", "Suction attachment"],
      usage: "Used for revision surgeries, large bone cuts, and prosthesis removal. Provides powerful cutting for dense bone structures",
      specifications: "High torque motor, variable speed control, sterile single-use blades, safety clutch mechanism",
      image: electrocauteryImage,
      setupTips: ["Select appropriate blade length", "Test motor function", "Ensure secure blade attachment", "Have irrigation ready", "Use proper protective equipment"]
    },
    "Drill and bits": {
      name: "Orthopedic Drill System",
      category: "Drilling Tool",
      description: "Precision drill system for creating holes in bone for screws, pins, and other orthopedic hardware",
      contents: ["High-speed drill motor", "Various drill bit sizes", "Depth control guides", "Pin drivers", "Irrigation sleeves"],
      usage: "Creates precise holes for screw placement, guide pin insertion, and hardware attachment during orthopedic procedures",
      specifications: "Variable speed 0-1200 RPM, sterile single-use bits, depth control, ergonomic handle design",
      image: trocarImage,
      setupTips: ["Organize bits by size", "Test drill speed", "Use depth guides", "Maintain irrigation", "Check bit sharpness"]
    },
    // Cardiac Surgery Instruments
    "Cardioplegia": {
      name: "Cardioplegia Delivery System",
      category: "Perfusion Equipment",
      description: "System for delivering cardioplegic solution to arrest and protect the heart during cardiac surgery",
      contents: ["Delivery cannulas", "Temperature control", "Pressure monitoring", "Solution mixing chamber", "Flow control valves"],
      usage: "Delivers protective solution to arrest heart and maintain myocardial protection during cardiopulmonary bypass",
      specifications: "Temperature range 4-37°C, pressure monitoring, variable flow rates, multiple delivery options",
      image: laparoscopicSetImage,
      setupTips: ["Test temperature control", "Verify solution composition", "Check all connections", "Monitor delivery pressure", "Maintain sterile technique"]
    },
    "Heart-lung machine": {
      name: "Cardiopulmonary Bypass Machine",
      category: "Life Support",
      description: "Extracorporeal circulation device that temporarily takes over heart and lung function during cardiac surgery",
      contents: ["Oxygenator", "Pump heads", "Heat exchanger", "Arterial and venous cannulas", "Monitoring systems"],
      usage: "Maintains circulation and oxygenation while the heart is stopped, allowing for precise cardiac surgical procedures",
      specifications: "Flow rates 1-8 L/min, temperature control, integrated monitoring, safety alarms, gas exchange capability",
      image: laparoscopicSetImage,
      setupTips: ["Complete pre-procedure checklist", "Test all alarms", "Prime tubing system", "Verify gas supply", "Monitor closely throughout procedure"]
    },
    // Neurosurgery Instruments
    "Drill": {
      name: "Neurosurgical Drill System",
      category: "Drilling Tool",
      description: "High-speed precision drill for creating burr holes and craniotomies in neurosurgical procedures",
      contents: ["Variable speed drill motor", "Craniotomy attachments", "Burr hole bits", "Perforator bits", "Footswitch control"],
      usage: "Creates precise openings in skull for craniotomies, burr holes, and hardware placement in neurosurgical procedures",
      specifications: "Variable speed 0-80,000 RPM, irrigation capability, precision depth control, sterile single-use bits",
      image: trocarImage,
      setupTips: ["Test drill speed", "Ensure irrigation flow", "Have multiple bit sizes ready", "Check depth control", "Maintain sterile technique"]
    },
    "Craniotomes": {
      name: "Craniotomy Instruments",
      category: "Cutting Tool",
      description: "Specialized instruments for creating and removing bone flaps during craniotomies",
      contents: ["Craniotomy saw", "Bone rongeurs", "Bone wax", "Dura protectors", "Bone flap clamps"],
      usage: "Safely create cranial openings while protecting underlying brain tissue during neurosurgical access",
      specifications: "Oscillating saw design, integrated dura protection, variable cutting depths, ergonomic handles",
      image: electrocauteryImage,
      setupTips: ["Protect dura during cutting", "Have bone wax ready", "Check saw blade condition", "Ensure hemostasis", "Plan flap replacement"]
    },
    "Brain retractors": {
      name: "Neurosurgical Brain Retractors",
      category: "Retraction System",
      description: "Gentle retraction system for exposing brain tissue while minimizing trauma during neurosurgical procedures",
      contents: ["Self-retaining retractors", "Brain spatulas", "Micro retractors", "Flexible retractor arms", "Table-mounted systems"],
      usage: "Provides optimal surgical exposure while protecting delicate brain tissue from retraction injury",
      specifications: "Atraumatic design, adjustable tension, various blade widths, stable positioning systems",
      image: grasperImage,
      setupTips: ["Use minimal retraction force", "Reposition frequently", "Monitor tissue perfusion", "Have various sizes available", "Check stability"]
    },
    "Ultrasonic aspirator": {
      name: "Neurosurgical Ultrasonic Aspirator",
      category: "Ablation Device",
      description: "Ultrasonic device for fragmenting and aspirating brain tumors while preserving normal tissue",
      contents: ["Ultrasonic generator", "Aspiration handpieces", "Various tip sizes", "Irrigation system", "Suction collection"],
      usage: "Selective removal of abnormal brain tissue (tumors) while preserving normal brain structures and vasculature",
      specifications: "Ultrasonic frequency 25-40 kHz, variable amplitude control, integrated irrigation and suction",
      image: harmonicScalpelImage,
      setupTips: ["Test ultrasonic function", "Select appropriate tip", "Ensure suction flow", "Monitor tissue response", "Have irrigation ready"]
    },
    "Neuronavigation": {
      name: "Stereotactic Navigation System",
      category: "Navigation Technology",
      description: "Computer-guided navigation system for precise localization during neurosurgical procedures",
      contents: ["Navigation computer", "Tracking cameras", "Reference arrays", "Pointing devices", "Registration tools"],
      usage: "Provides real-time 3D guidance for precise targeting of brain lesions and anatomical structures",
      specifications: "Sub-millimeter accuracy, real-time tracking, integration with imaging data, multiple registration methods",
      image: laparoscopicSetImage,
      setupTips: ["Complete system calibration", "Register patient anatomy", "Verify accuracy", "Update registration as needed", "Maintain line of sight"]
    },
    // Additional common aliases for better matching
    "Scalpel": {
      name: "Surgical Scalpel",
      category: "Cutting Instrument",
      description: "Precision cutting instrument with disposable blade for surgical incisions",
      contents: ["Scalpel handle", "Disposable blades (#10, #11, #15)", "Blade remover", "Safety cap"],
      usage: "Primary cutting instrument for making surgical incisions with precise control",
      specifications: "Stainless steel construction, various blade types for different cuts, ergonomic handle design",
      image: grasperImage,
      setupTips: ["Select appropriate blade", "Handle with care", "Dispose properly", "Keep spare blades available", "Test sharpness"]
    },
    // Basic Sets - Common across all specialties
    "Major orthopedic set": {
      name: "Major Orthopedic Instrument Set", 
      category: "Basic Set",
      description: "Comprehensive collection of heavy-duty bone and joint instruments for major orthopedic procedures including joint replacements, fracture repairs, and complex bone work",
      contents: ["Oscillating and reciprocating saws", "Large bone cutting forceps", "Hohmann retractors (various sizes)", "Reduction forceps and clamps", "Bone holding clamps", "Periosteal elevators", "Reamers and rasps", "Osteotomes and chisels"],
      usage: "Essential instrument set for major orthopedic surgeries including total joint replacements, complex fracture repairs, spinal procedures, and any surgery requiring substantial bone work",
      specifications: "Heavy-duty stainless steel construction, multiple sizes for different bone types, reinforced design for high-stress bone work, autoclave compatible, corrosion resistant",
      image: grasperImage,
      setupTips: ["Arrange instruments by surgical sequence", "Check all sharp cutting edges for sharpness", "Ensure complete size range is available", "Test all power tool connections", "Organize implant-specific tools separately by manufacturer"]
    },
    "Cardiovascular set": {
      name: "Cardiovascular Surgery Set",
      category: "Basic Set",
      description: "Comprehensive specialized instruments for cardiac and vascular surgical procedures requiring precision and hemostasis with advanced materials and design",
      contents: ["DeBakey vascular forceps (multiple lengths)", "Potts cardiovascular scissors", "Cardiovascular needle holders", "Satinsky vascular clamps", "Bulldogs clamps (various sizes)", "Valve retractors", "Aortic punches", "Vessel loops"],
      usage: "Essential instrument set for all cardiac surgeries, bypass procedures, valve replacements, vascular reconstructions, and major cardiovascular operations requiring precision handling",
      specifications: "Premium grade stainless steel, atraumatic tips with precision machining, spring-loaded handles, various jaw configurations optimized for different vessel sizes, MRI compatible",
      image: harmonicScalpelImage,
      setupTips: ["Handle with extreme care to maintain precision", "Check clamp alignment and spring tension", "Test all spring mechanisms before procedure", "Organize instruments by vessel size and function", "Have multiple backup instruments readily available"]
    },
    "Craniotomy set": {
      name: "Craniotomy Instrument Set",
      category: "Basic Set",
      description: "Ultra-specialized neurosurgical instruments for cranial procedures requiring maximum precision and brain tissue protection with advanced materials and ergonomic design",
      contents: ["Kerrison rongeurs (various sizes)", "Brain spatulas (flat and curved)", "Micro scissors (straight and curved)", "Bipolar forceps (fine and standard)", "Neurosurgical suction devices", "Aneurysm clips", "Nerve hooks", "Micro retractors"],
      usage: "Primary instrument set for neurosurgical procedures including tumor resection, aneurysm clipping, brain tissue manipulation, and delicate intracranial work requiring ultimate precision",
      specifications: "Ultra-precise titanium and stainless steel construction, minimal magnetic interference for MRI compatibility, ergonomic non-slip handles, various tip configurations for different anatomical areas",
      image: harmonicScalpelImage,
      setupTips: ["Handle with ultimate care to maintain precision", "Check bipolar electrocautery function", "Test all suction systems and pressures", "Organize micro instruments by size", "Maintain absolute sterile field integrity"]
    },
    // Essential Items - Mayo Stand Setup
    "Vascular instruments": {
      name: "Vascular Surgery Instruments",
      category: "Essential Items",
      description: "Precision instruments specifically designed for delicate vascular procedures and anastomoses",
      contents: ["DeBakey forceps", "Potts scissors", "Vascular clamps", "Vessel loops", "Bulldog clamps", "Patch scissors"],
      usage: "Critical for all vascular procedures including arterial repairs, bypass grafts, and microvascular anastomoses",
      specifications: "Atraumatic surfaces, spring-loaded mechanisms, various sizes for different vessel diameters",
      image: harmonicScalpelImage,
      setupTips: ["Handle with extreme delicacy", "Check clamp pressure", "Organize by vessel size", "Test spring mechanisms", "Have irrigation available"]
    },
    "Grafts": {
      name: "Vascular Grafts and Conduits",
      category: "Essential Items", 
      description: "Synthetic and biological conduits used for vascular reconstruction and bypass procedures",
      contents: ["PTFE grafts", "Dacron grafts", "Saphenous vein grafts", "Radial artery grafts", "Umbilical vein grafts"],
      usage: "Used to restore blood flow in vascular reconstruction, bypass surgery, and arterial repair procedures",
      specifications: "Various diameters 4-28mm, different lengths, biocompatible materials, some pre-sealed options",
      image: laparoscopicSetImage,
      setupTips: ["Keep moist until use", "Select appropriate diameter", "Check for leaks", "Handle gently", "Have multiple sizes available"]
    },
    "Cannulae": {
      name: "Surgical Cannulae System",
      category: "Essential Items",
      description: "Tubular instruments for fluid drainage, irrigation, and access during surgical procedures",
      contents: ["Arterial cannulae", "Venous cannulae", "Cardioplegia cannulae", "Suction cannulae", "Irrigation cannulae"],
      usage: "Provides access for perfusion, drainage, irrigation, and medication delivery during complex surgeries",
      specifications: "Various sizes and shapes, biocompatible materials, some with inflatable cuffs, sterile single-use",
      image: trocarImage,
      setupTips: ["Check patency before use", "Select appropriate size", "Test connections", "Ensure secure placement", "Monitor for clotting"]
    },
    "Microsurgical instruments": {
      name: "Microsurgical Instrument Set",
      category: "Essential Items",
      description: "Ultra-precise instruments for microscopic surgical procedures requiring extreme accuracy",
      contents: ["Micro forceps", "Micro scissors", "Micro needle holders", "Vessel dilators", "Micro clamps", "Jeweler's forceps"],
      usage: "Essential for reconstructive surgery, neurosurgery, ophthalmology, and any procedure requiring microscopic precision",
      specifications: "Ultra-fine tips, spring handles, anti-magnetic, various angulations, ultra-smooth surfaces",
      image: harmonicScalpelImage,
      setupTips: ["Handle with utmost care", "Use under magnification", "Keep tips protected", "Check alignment frequently", "Have backup instruments"]
    },
    "Bipolar": {
      name: "Bipolar Electrocautery System",
      category: "Essential Items",
      description: "Precision electrosurgical device for coagulation and cutting with minimal tissue damage and precise control",
      contents: ["Bipolar forceps", "Generator unit", "Foot pedal", "Various tip designs", "Irrigation attachments"],
      usage: "Primary hemostatic device for delicate procedures, especially in neurosurgery, microsurgery, and areas requiring precision",
      specifications: "Variable power settings, precision tips, integrated irrigation, foot pedal control, various tip geometries",
      image: electrocauteryImage,
      setupTips: ["Test power settings", "Check tip condition", "Ensure clean contacts", "Have irrigation ready", "Use lowest effective power"]
    },
    "Hemostatic agents": {
      name: "Hemostatic Agents and Materials",
      category: "Essential Items",
      description: "Advanced materials and agents used to achieve rapid hemostasis and bleeding control during surgery",
      contents: ["Gelfoam", "Surgicel", "Bone wax", "Thrombin", "Fibrin sealant", "Hemostatic powder"],
      usage: "Critical for controlling bleeding from various tissue types including bone, soft tissue, and vascular structures",
      specifications: "Bioabsorbable materials, sterile preparation, various forms (powder, sheets, liquid), rapid action",
      image: harmonicScalpelImage,
      setupTips: ["Keep dry until use", "Apply with pressure", "Don't oversaturate", "Have multiple types ready", "Follow manufacturer instructions"]
    },
    "Fine instruments": {
      name: "Fine Surgical Instruments",
      category: "Essential Items",
      description: "Delicate instruments for procedures requiring precision handling of fine tissues and structures",
      contents: ["Fine forceps", "Micro scissors", "Delicate retractors", "Fine sutures", "Precision clamps", "Nerve hooks"],
      usage: "Essential for endocrine surgery, microsurgery, pediatric procedures, and any surgery requiring delicate tissue handling",
      specifications: "Ultra-fine construction, smooth surfaces, spring mechanisms, various tip configurations, lightweight design",
      image: harmonicScalpelImage,
      setupTips: ["Handle with extreme care", "Use magnification when possible", "Keep tips aligned", "Have multiple sizes", "Protect from damage"]
    },
    "Nerve monitor": {
      name: "Nerve Monitoring System",
      category: "Essential Items",
      description: "Electrophysiological monitoring system for real-time nerve function assessment during surgery",
      contents: ["Monitoring electrodes", "Stimulator probe", "Display unit", "Audio feedback", "Recording cables"],
      usage: "Critical for procedures near critical nerves, especially thyroid, parathyroid, and spinal surgeries",
      specifications: "Real-time monitoring, audio and visual feedback, stimulation parameters, sterile probe covers",
      image: laparoscopicSetImage,
      setupTips: ["Test system before procedure", "Apply electrodes properly", "Check all connections", "Set appropriate thresholds", "Monitor continuously"]
    },
    // Special Instruments across specialties
    "Cutting guides": {
      name: "Surgical Cutting Guides",
      category: "Special Instruments",
      description: "Precision guides for accurate bone cuts and implant placement during orthopedic procedures",
      contents: ["Femoral cutting guides", "Tibial guides", "Angular alignment guides", "Resection blocks", "Drill guides"],
      usage: "Ensures precise bone cuts and proper implant alignment during joint replacement and reconstruction procedures",
      specifications: "Patient-specific options available, stainless steel construction, multiple angle settings, autoclave compatible",
      image: trocarImage,
      setupTips: ["Verify correct size", "Check alignment marks", "Secure properly", "Use steady pressure", "Confirm measurements"]
    },
    "Trials": {
      name: "Trial Implant Components",
      category: "Special Instruments",
      description: "Test components used to verify fit, size, and function before final implant placement",
      contents: ["Trial stems", "Trial heads", "Trial cups", "Spacers", "Size verificators"],
      usage: "Critical for testing implant fit, range of motion, and stability before inserting final prosthetic components",
      specifications: "Exact replica of final implants, various sizes, easy insertion/removal, radiopaque markers",
      image: grasperImage,
      setupTips: ["Test multiple sizes", "Check range of motion", "Verify stability", "Document final size", "Handle carefully to avoid scratching"]
    },
    "Cement supplies": {
      name: "Bone Cement Mixing System",
      category: "Special Instruments",
      description: "Complete system for preparing and applying bone cement during orthopedic implant procedures",
      contents: ["Cement mixer", "Cement gun", "Pressurizer", "Brushes", "Pulse lavage", "Cement restrictors"],
      usage: "Essential for cementing orthopedic implants, ensuring proper cement penetration and implant fixation",
      specifications: "Vacuum mixing capability, various delivery tips, pressure application system, sterile packaging",
      image: laparoscopicSetImage,
      setupTips: ["Prepare cement per protocol", "Work quickly before setting", "Apply pressure evenly", "Remove excess cement", "Maintain position until set"]
    },
    "Energy devices": {
      name: "Advanced Energy Devices",
      category: "Special Instruments", 
      description: "Advanced electrosurgical devices for precise cutting and coagulation with minimal thermal damage",
      contents: ["LigaSure device", "Harmonic scalpel", "PlasmaKinetic device", "Advanced bipolar", "Microwave ablation"],
      usage: "Primary devices for tissue sealing, cutting, and ablation procedures requiring precision and hemostasis",
      specifications: "Multiple energy modalities, precise temperature control, vessel sealing capability, foot pedal control",
      image: harmonicScalpelImage,
      setupTips: ["Select appropriate device", "Test function before use", "Use correct activation time", "Allow cooling between uses", "Follow safety protocols"]
    },
    "Specimen bags": {
      name: "Surgical Specimen Retrieval Bags",
      category: "Special Instruments",
      description: "Sterile containment bags for safe removal of surgical specimens during minimally invasive procedures",
      contents: ["Various sized bags", "Deployment mechanisms", "Closure systems", "Extraction devices", "Specimen containers"],
      usage: "Essential for containing and removing tissue specimens during laparoscopic and robotic procedures",
      specifications: "Various sizes, tear-resistant materials, secure closure systems, transparent options available",
      image: grasperImage,
      setupTips: ["Select appropriate size", "Deploy carefully", "Ensure complete containment", "Check for tears", "Remove through largest port"]
    },
    "Specimen containers": {
      name: "Surgical Specimen Containers",
      category: "Special Instruments",
      description: "Sterile containers for proper handling, preservation, and transport of surgical specimens for pathological examination",
      contents: ["Formalin containers", "Fresh specimen containers", "Frozen section containers", "Culture containers", "Special fixatives"],
      usage: "Critical for proper specimen handling to ensure accurate pathological diagnosis and patient care",
      specifications: "Various sizes, leak-proof design, proper fixative ratios, labeling systems, sterile preparation",
      image: grasperImage,
      setupTips: ["Label immediately", "Use appropriate fixative", "Document specimen source", "Handle gently", "Transport promptly"]
    },
    "Marking sutures": {
      name: "Surgical Marking Sutures",
      category: "Special Instruments",
      description: "Colored sutures used to identify specific anatomical structures or mark surgical margins during procedures",
      contents: ["Various colored sutures", "Different materials", "Multiple sizes", "Marking clips", "Radiopaque markers"],
      usage: "Used to mark surgical margins, identify structures, and provide reference points for pathological examination",
      specifications: "Non-reactive materials, permanent marking, various colors and sizes, biocompatible options",
      image: harmonicScalpelImage,
      setupTips: ["Use consistent color coding", "Document marking system", "Apply securely", "Avoid tissue damage", "Communicate with pathology"]
    },
    "Doppler": {
      name: "Doppler Ultrasound Probe",
      category: "Special Instruments", 
      description: "Ultrasonic device for real-time assessment of blood flow and vessel patency during vascular procedures",
      contents: ["Doppler probe", "Audio amplifier", "Coupling gel", "Sterile probe covers", "Various frequency options"],
      usage: "Essential for verifying blood flow, locating vessels, and confirming anastomotic patency during vascular procedures",
      specifications: "Multiple frequency options, audio feedback, sterile probe covers, battery operation, waterproof design",
      image: laparoscopicSetImage,
      setupTips: ["Apply adequate gel", "Use appropriate frequency", "Listen for flow signals", "Check probe function", "Maintain sterile technique"]
    },
    "Needle holders": {
      name: "Laparoscopic Needle Drivers",
      category: "Suturing Instrument", 
      description: "Precision needle holders designed for laparoscopic suturing with secure needle grip and optimal hand positioning. Essential for intracorporeal and extracorporeal suturing techniques",
      contents: ["Curved jaw needle driver (most common)", "Straight jaw needle driver", "Self-righting needle driver with rotation", "Barbed suture compatible drivers", "Micro needle drivers for fine work"],
      usage: "Precise needle manipulation for suturing, knot tying, and closure techniques. Critical for securing anastomoses, tissue approximation, and hemostasis suturing",
      specifications: "5mm diameter, 36cm length, carbide jaw inserts for durability. Ratchet locking mechanism with precise grip pressure. Compatible with all needle sizes 0-6",
      image: grasperImage,
      setupTips: ["Test jaw alignment and ratchet function", "Have multiple drivers available for continuous suturing", "Position for both surgeon and assistant use", "Check carbide insert condition"]
    },
    // ORTHOPEDIC SURGERY INSTRUMENTS
    "Power tools": {
      name: "Orthopedic Power Tool System",
      category: "Power Equipment",
      description: "High-speed electric and pneumatic tools for bone cutting, drilling, and reaming during orthopedic procedures with precision control and safety features",
      contents: ["Oscillating saw with variable speed", "Reciprocating saw system", "High-speed drill with multiple chuck sizes", "Reaming system with various bit sizes", "Irrigation attachments", "Depth stops and guides"],
      usage: "Essential for bone cutting, drilling pilot holes, reaming medullary canals, and creating precise bone cuts during joint replacements and fracture repairs",
      specifications: "Variable speed control 0-18,000 RPM, sterile disposable attachments, integrated irrigation system, ergonomic design with anti-vibration, autoclave compatible handpieces",
      image: electrocauteryImage,
      setupTips: ["Test all power connections before procedure", "Have backup power sources available", "Check irrigation flow", "Ensure proper bit attachment", "Have multiple bit sizes ready"]
    },
    "Implant-specific instruments": {
      name: "Implant-Specific Instrument Sets",
      category: "Specialized Equipment",
      description: "Manufacturer-specific instruments designed for precise implant placement, sizing, and alignment during joint replacement procedures",
      contents: ["Implant-specific cutting guides", "Trial components and sizers", "Insertion and extraction tools", "Alignment guides and jigs", "Impaction tools", "Specialized reamers"],
      usage: "Critical for accurate implant placement, proper sizing, and optimal alignment during total joint replacements. Ensures implant compatibility and longevity",
      specifications: "Manufacturer-specific designs, precision tolerances, various implant system compatibility, sterile packaging, single-use and reusable options",
      image: grasperImage,
      setupTips: ["Verify implant system compatibility", "Check all trial sizes available", "Ensure instruments are complete", "Have backup sizes ready", "Follow manufacturer protocols"]
    },
    // CARDIOVASCULAR SURGERY INSTRUMENTS
    "Aortic surgery set": {
      name: "Aortic Surgery Instrument Set",
      category: "Cardiovascular Set",
      description: "Specialized instruments for complex aortic procedures including aneurysm repair, valve replacement, and aortic reconstruction requiring precision and hemostatic control",
      contents: ["Aortic cross clamps (various sizes)", "Side-biting vascular clamps", "Aortic punches (3-8mm)", "DeBakey aortic forceps", "Potts aortic scissors", "Aortic root retractors", "Valve retractors", "Aortic cannulae"],
      usage: "Essential for all aortic surgical procedures including valve replacements, aneurysm repairs, root reconstructions, and bypass grafting involving the aortic system",
      specifications: "Premium grade stainless steel, atraumatic jaw surfaces, precise spring mechanisms, various clamp sizes 30-70mm, autoclave compatible, magnetic resonance safe",
      image: harmonicScalpelImage,
      setupTips: ["Test all clamp mechanisms before procedure", "Have multiple clamp sizes readily available", "Check spring tension and alignment", "Organize by size and function", "Handle with extreme care to prevent damage"]
    },
    "Vascular clamps": {
      name: "Vascular Clamp System",
      category: "Hemostatic Device",
      description: "Precision clamping instruments designed for temporary occlusion of blood vessels during vascular procedures with minimal vessel trauma and secure hemostasis",
      contents: ["Bulldog clamps (small vessels)", "DeBakey peripheral vascular clamps", "Satinsky partial occlusion clamps", "Fogarty clamps", "Vessel loops for gentle retraction", "Rubber shods for protection"],
      usage: "Critical for controlling blood flow during vascular anastomoses, bypass procedures, and vessel repairs. Provides temporary hemostasis while maintaining vessel integrity",
      specifications: "Spring-loaded mechanisms, atraumatic serrated jaws, various sizes 20-100mm, precise pressure control, stainless steel construction with smooth action",
      image: harmonicScalpelImage,
      setupTips: ["Test spring action before use", "Select appropriate size for vessel", "Apply minimum pressure necessary", "Use vessel loops when possible", "Have backup clamps available"]
    },
    "Graft materials": {
      name: "Vascular Graft Materials",
      category: "Implant Material",
      description: "Biocompatible conduits and patches used for vascular reconstruction, bypass procedures, and vessel repair with various synthetic and biological options",
      contents: ["PTFE grafts (Gore-Tex) 4-28mm", "Dacron grafts (woven/knitted)", "Saphenous vein grafts (autologous)", "Bovine pericardial patches", "PTFE patches for vessel repair", "Collagen-sealed grafts"],
      usage: "Used for arterial bypass procedures, aneurysm repair, vessel reconstruction, and patch angioplasty. Provides durable blood flow restoration with biocompatible materials",
      specifications: "Various diameters 4-28mm, different lengths available, porosity options for tissue ingrowth, pre-sealed options available, sterilized and ready for implantation",
      image: laparoscopicSetImage,
      setupTips: ["Keep grafts moist until implantation", "Select appropriate diameter", "Handle gently to prevent damage", "Check for leaks before anastomosis", "Have multiple sizes available"]
    },
    "Cardiac surgery set": {
      name: "Cardiac Surgery Instrument Set",
      category: "Cardiovascular Set",
      description: "Comprehensive collection of specialized instruments for cardiac procedures including valve surgery, bypass grafting, and congenital heart repairs",
      contents: ["Cardiovascular scissors (Potts, Metzenbaum)", "DeBakey forceps (various lengths)", "Valve retractors and holders", "Cardioplegia cannulae", "Aortic root retractors", "Sternal retractors", "Internal mammary artery retractors"],
      usage: "Primary instrument set for all cardiac surgical procedures including CABG, valve replacements, septal defect repairs, and complex cardiac reconstructions",
      specifications: "Ultra-precision instruments, magnetic resonance compatible, various lengths for deep cardiac work, spring mechanisms for delicate handling, autoclave compatible",
      image: harmonicScalpelImage,
      setupTips: ["Arrange instruments by procedure phase", "Test all retractor mechanisms", "Have backup instruments readily available", "Organize by surgeon preference", "Check all springs and hinges"]
    },
    "Sternal saw": {
      name: "Sternal Saw System",
      category: "Cutting Device",
      description: "Precision oscillating saw specifically designed for median sternotomy with depth control and safety features to prevent injury to underlying cardiac structures",
      contents: ["Oscillating saw motor", "Sternal saw blades (various widths)", "Depth guards and limiters", "Sternal retractor system", "Bone wax for hemostasis", "Sternal closure wires"],
      usage: "Primary tool for creating median sternotomy incision for cardiac surgery access. Provides precise bone cutting while protecting underlying heart and great vessels",
      specifications: "Variable speed oscillation, depth control mechanisms, sterile disposable blades, integrated safety features, ergonomic design for precise control",
      image: electrocauteryImage,
      setupTips: ["Test saw function before procedure", "Check depth guard settings", "Have backup blades available", "Ensure proper patient positioning", "Have bone wax readily available"]
    },
    "Bypass pump": {
      name: "Cardiopulmonary Bypass System",
      category: "Life Support Equipment",
      description: "Extracorporeal circulation system that temporarily replaces heart and lung function during cardiac surgery, maintaining perfusion and oxygenation",
      contents: ["Heart-lung machine console", "Oxygenator membrane", "Arterial and venous cannulae", "Pump heads and tubing", "Heat exchanger", "Cardioplegia delivery system", "Monitoring systems"],
      usage: "Essential for cardiac procedures requiring cardioplegic arrest. Maintains systemic circulation and oxygenation while allowing surgeon to operate on motionless heart",
      specifications: "Flow rates 1-8 L/min, temperature control 15-40°C, integrated monitoring, safety alarms, biocompatible materials, precise flow and pressure control",
      image: laparoscopicSetImage,
      setupTips: ["Complete comprehensive safety checklist", "Prime all tubing circuits", "Test all monitoring alarms", "Verify blood compatibility", "Maintain constant communication with surgeon"]
    },
    // OPHTHALMOLOGY INSTRUMENTS
    "Phacoemulsification system": {
      name: "Phacoemulsification Surgery System",
      category: "Ophthalmic Equipment",
      description: "Advanced ultrasonic system for cataract removal using high-frequency vibrations to emulsify and aspirate lens material through micro-incisions",
      contents: ["Phacoemulsification console", "Ultrasonic handpiece", "Irrigation/aspiration system", "Various tip sizes and designs", "Foot pedal with multiple functions", "Fluidics management system"],
      usage: "Primary technology for cataract surgery, allowing removal of clouded natural lens through small incisions with minimal trauma and rapid healing",
      specifications: "Ultrasonic frequency 28-40 kHz, variable power settings, advanced fluidics control, multiple tip configurations, integrated monitoring systems",
      image: laparoscopicSetImage,
      setupTips: ["Prime all fluid lines completely", "Test ultrasonic function", "Verify tip attachment", "Check fluidics parameters", "Have backup tips available"]
    },
    "Basic eye instruments": {
      name: "Basic Ophthalmic Instrument Set",
      category: "Ophthalmic Set",
      description: "Essential instruments for basic eye surgery procedures including cataract extraction, corneal procedures, and anterior segment surgery",
      contents: ["Ophthalmic scissors (curved and straight)", "Micro forceps (toothed and smooth)", "Speculum for eye positioning", "Cannulas for irrigation", "Micro needle holders", "Lens manipulation tools"],
      usage: "Standard instrument set for anterior segment eye surgery, providing precise manipulation capabilities for delicate ocular tissues and structures",
      specifications: "Ultra-fine construction, smooth surfaces, spring mechanisms, various tip configurations, autoclave compatible, magnetic resonance safe",
      image: harmonicScalpelImage,
      setupTips: ["Handle with extreme delicacy", "Check tip alignment under magnification", "Use only under operating microscope", "Have multiple sizes available", "Maintain optimal lighting"]
    },
    "Microscope": {
      name: "Surgical Operating Microscope",
      category: "Visualization Equipment",
      description: "High-magnification optical system providing enhanced visualization for microsurgical procedures requiring extreme precision and detail",
      contents: ["Main microscope unit with zoom optics", "Dual-head viewing system", "High-intensity LED illumination", "Video camera attachment", "Motorized focusing system", "Various objective lenses"],
      usage: "Essential for microsurgery, ophthalmology, neurosurgery, and any procedure requiring magnified visualization of fine anatomical structures",
      specifications: "Magnification range 4x-40x, LED illumination with variable intensity, HD video capability, motorized controls, ergonomic design",
      image: laparoscopicSetImage,
      setupTips: ["Complete optical alignment check", "Adjust interpupillary distance", "Test all controls", "Verify camera function", "Ensure proper positioning"]
    },
    // OBSTETRICS & GYNECOLOGY INSTRUMENTS
    "OB/GYN set": {
      name: "Obstetrics & Gynecology Instrument Set",
      category: "Specialty Set",
      description: "Comprehensive instrument set for obstetric and gynecologic procedures including delivery, cesarean section, and gynecologic surgery",
      contents: ["Long instruments for deep pelvic work", "Heaney clamps for vascular control", "Kocher clamps for tissue manipulation", "Long needle holders", "Retractors (Balfour, Richardson)", "Cord clamps and scissors", "Placental forceps"],
      usage: "Essential for cesarean sections, hysterectomies, ovarian procedures, and all obstetric and gynecologic surgical interventions requiring specialized instruments",
      specifications: "Extended length instruments for deep access, robust construction for tissue manipulation, autoclave compatible, various sizes for different procedures",
      image: harmonicScalpelImage,
      setupTips: ["Organize by procedure type", "Have pediatric sizes ready for delivery", "Check clamp mechanisms", "Prepare cord care supplies", "Ensure adequate retraction"]
    },
    "Delivery instruments": {
      name: "Obstetric Delivery Instrument Set",
      category: "Delivery Equipment",
      description: "Specialized instruments for assisted vaginal delivery and immediate newborn care with safety and efficiency focus",
      contents: ["Forceps (various types)", "Vacuum extraction devices", "Episiotomy scissors", "Cord clamps (multiple types)", "Baby blankets and warming devices", "Suction devices for airway"],
      usage: "Used for assisted delivery when complications arise, episiotomy repair, cord clamping, and immediate newborn resuscitation and care",
      specifications: "Atraumatic design for maternal and fetal safety, sterile packaging, various sizes for different clinical situations, rapid deployment capability",
      image: grasperImage,
      setupTips: ["Have multiple forcep sizes ready", "Test vacuum system function", "Prepare warming equipment", "Check suction capability", "Have resuscitation equipment available"]
    },
    "Major gynecologic set": {
      name: "Major Gynecologic Surgery Set",
      category: "Gynecologic Set",
      description: "Comprehensive instrument set for complex gynecologic procedures including hysterectomies, cancer surgeries, and reconstructive procedures",
      contents: ["Long instruments for deep pelvic work", "Heaney clamps and Kocher clamps", "Curved and straight Mayo scissors", "Long needle holders", "Weighted retractors", "Vaginal speculums", "Uterine manipulators"],
      usage: "Essential for total abdominal hysterectomy, radical procedures, ovarian surgeries, and complex gynecologic reconstructions requiring extended reach",
      specifications: "Extended length construction for deep pelvic access, heavy-duty design for tissue manipulation, various clamp sizes, autoclave compatible",
      image: harmonicScalpelImage,
      setupTips: ["Organize instruments by procedure phase", "Have weighted retractors ready", "Check clamp mechanisms thoroughly", "Prepare uterine manipulation tools", "Ensure adequate visualization"]
    },
    // NEUROSURGERY INSTRUMENTS
    "Neuro monitoring": {
      name: "Neurophysiological Monitoring System",
      category: "Monitoring Equipment",
      description: "Advanced electrophysiological monitoring system for real-time assessment of nervous system function during neurosurgical procedures",
      contents: ["EEG monitoring electrodes", "EMG recording systems", "Evoked potential equipment", "Nerve stimulation probes", "Real-time display monitors", "Audio feedback systems"],
      usage: "Critical for monitoring brain and nerve function during neurosurgery, providing immediate feedback on neurological status and preventing injury",
      specifications: "Multi-channel recording capability, real-time processing, audio and visual alarms, sterile electrode systems, integrated data recording",
      image: laparoscopicSetImage,
      setupTips: ["Complete system calibration", "Apply electrodes correctly", "Test all monitoring channels", "Set appropriate alarm thresholds", "Maintain continuous monitoring"]
    },
    // UROLOGY INSTRUMENTS
    "Cystoscopy set": {
      name: "Cystoscopy Instrument Set",
      category: "Endoscopic Equipment",
      description: "Complete cystoscopic system for diagnostic and therapeutic procedures of the urinary tract with advanced visualization and intervention capabilities",
      contents: ["Flexible and rigid cystoscopes", "Light source and camera system", "Irrigation system with flow control", "Biopsy forceps and baskets", "Guidewires and catheters", "Electrocautery attachments"],
      usage: "Essential for urinary tract evaluation, stone removal, tumor biopsy, stent placement, and various therapeutic urological interventions",
      specifications: "High-definition optics, variable angle viewing, integrated irrigation, compatible with multiple working instruments, autoclave compatible components",
      image: laparoscopicSetImage,
      setupTips: ["Test optical clarity", "Check irrigation flow", "Verify camera function", "Have various working instruments ready", "Ensure proper patient positioning"]
    },
    "TURP resectoscope": {
      name: "Transurethral Resection Resectoscope",
      category: "Electrosurgical Device",
      description: "Specialized resectoscope for transurethral resection of prostate with electrocautery capability and continuous irrigation for tissue removal",
      contents: ["Resectoscope with working element", "Loop electrodes (various sizes)", "Continuous flow system", "Electrocautery generator", "Tissue evacuator", "Irrigation fluid management"],
      usage: "Primary instrument for TURP procedures, allowing precise removal of prostate tissue while maintaining hemostasis and clear visualization",
      specifications: "Electrocautery capability with cutting and coagulation modes, continuous irrigation system, various loop sizes, integrated tissue removal",
      image: electrocauteryImage,
      setupTips: ["Test electrocautery settings", "Verify irrigation flow", "Check loop electrode condition", "Prepare tissue evacuation", "Monitor fluid balance"]
    },
    // ENT SURGERY INSTRUMENTS
    "ENT instrument set": {
      name: "Otolaryngology Instrument Set",
      category: "ENT Set",
      description: "Comprehensive instrument set for ear, nose, and throat surgical procedures including microsurgery and endoscopic techniques",
      contents: ["Ear speculums (various sizes)", "Nasal speculums and retractors", "Micro scissors and forceps", "Suction devices with fine tips", "Endoscopes (nasal and laryngeal)", "Adenoid curettes", "Tonsil snares and elevators"],
      usage: "Essential for tonsillectomy, adenoidectomy, sinus surgery, ear procedures, and complex head and neck surgical interventions",
      specifications: "Ultra-fine construction for delicate tissues, various sizes for pediatric and adult patients, endoscopic compatibility, autoclave safe",
      image: harmonicScalpelImage,
      setupTips: ["Organize by anatomical region", "Have pediatric sizes available", "Test endoscopic equipment", "Check suction function", "Prepare hemostatic agents"]
    },
    "Mouth gag": {
      name: "Oral Surgery Mouth Gag System",
      category: "Positioning Device",
      description: "Specialized mouth opening and positioning device for oral and throat surgery providing optimal exposure and airway protection",
      contents: ["Boyle-Davis mouth gag", "Various blade sizes", "Tongue depressors", "Pharyngeal packs", "Bite blocks", "Positioning accessories"],
      usage: "Essential for tonsillectomy, adenoidectomy, and other oral cavity procedures requiring sustained mouth opening and tongue control",
      specifications: "Self-retaining mechanism, atraumatic blade design, various sizes for different age groups, stable positioning, easy adjustment",
      image: grasperImage,
      setupTips: ["Select appropriate size for patient", "Test opening mechanism", "Protect teeth and soft tissues", "Ensure adequate exposure", "Have pharyngeal packing ready"]
    },
    // THORACIC SURGERY INSTRUMENTS
    "Thoracic set": {
      name: "Thoracic Surgery Instrument Set",
      category: "Thoracic Set",
      description: "Specialized instruments for chest surgery including lung procedures, esophageal surgery, and mediastinal operations with enhanced reach and precision",
      contents: ["Long instruments for deep chest work", "Rib retractors and spreaders", "Lung grasping forceps", "Long electrocautery devices", "Chest tube insertion sets", "Stapling devices for lung tissue"],
      usage: "Essential for thoracotomy, lobectomy, pneumonectomy, esophageal procedures, and any surgery requiring access to thoracic cavity structures",
      specifications: "Extended length for deep access, robust construction for tissue manipulation, various sizes, autoclave compatible, ergonomic design",
      image: harmonicScalpelImage,
      setupTips: ["Organize by surgical phase", "Have chest tube equipment ready", "Check retractor function", "Prepare lung isolation equipment", "Ensure adequate instrumentation"]
    },
    "Video equipment": {
      name: "Video-Assisted Surgery System",
      category: "Visualization Equipment",
      description: "Advanced video system for minimally invasive surgery providing high-definition visualization and recording capabilities for various procedures",
      contents: ["HD camera systems", "Various endoscopes and thoracoscopes", "Light sources with adjustable intensity", "Video monitors and recording", "Image enhancement software", "Wireless transmission capability"],
      usage: "Critical for VATS (Video-Assisted Thoracoscopic Surgery), laparoscopy, arthroscopy, and any minimally invasive procedure requiring video guidance",
      specifications: "4K HD resolution capability, multiple input sources, recording and streaming options, enhanced image processing, compatible with various scopes",
      image: laparoscopicSetImage,
      setupTips: ["Test all video connections", "Adjust image quality settings", "Check recording function", "Verify scope compatibility", "Ensure adequate lighting"]
    },
    // ADDITIONAL MISSING INSTRUMENTS FROM DATABASE
    "Aortic clamps": {
      name: "Aortic Cross-Clamps",
      category: "Aortic Clamp",
      description: "Specialized clamps designed specifically for aortic cross-clamping during cardiac surgery with precise jaw design for optimal aortic control",
      contents: ["Aortic cross-clamps (various sizes 30-70mm)", "Angled aortic clamps", "Straight aortic clamps", "Side-biting aortic clamps", "Pediatric aortic clamps"],
      usage: "Essential for aortic valve replacement, aortic root procedures, and any cardiac surgery requiring temporary aortic occlusion for cardioplegic arrest",
      specifications: "Precision-machined jaws for aortic anatomy, spring-loaded mechanism, various sizes 30-70mm, atraumatic serrations, autoclave compatible",
      image: harmonicScalpelImage,
      setupTips: ["Test clamp mechanism before use", "Select appropriate size for aorta", "Handle with extreme care", "Check jaw alignment", "Have multiple sizes available"]
    },
    "Valve replacement instruments": {
      name: "Cardiac Valve Replacement Set",
      category: "Valve Surgery",
      description: "Comprehensive instrument set specifically designed for cardiac valve replacement procedures with precision tools for valve handling and placement",
      contents: ["Valve holders and positioners", "Valve sizers (multiple sizes)", "Suture guides", "Valve retractors", "Pledget forceps", "Valve cutting scissors"],
      usage: "Essential for aortic and mitral valve replacement procedures, providing precise valve positioning and secure implantation",
      specifications: "Precision construction for delicate valve handling, various sizes for different valve types, autoclave compatible, minimal tissue trauma design",
      image: harmonicScalpelImage,
      setupTips: ["Organize by valve type", "Have complete sizer sets", "Check valve holders", "Prepare suture materials", "Handle prostheses carefully"]
    },
    "Cardiopulmonary bypass": {
      name: "Cardiopulmonary Bypass Circuit",
      category: "Life Support System",
      description: "Complete extracorporeal circulation system providing heart and lung function during cardiac surgery with comprehensive monitoring and safety features",
      contents: ["Heart-lung machine", "Oxygenator", "Arterial and venous cannulae", "Pump tubing", "Heat exchanger", "Cardioplegia delivery", "Safety monitoring"],
      usage: "Essential for cardiac procedures requiring cardioplegic arrest, maintaining systemic circulation while allowing complex cardiac repairs",
      specifications: "Complete bypass capability, temperature control, integrated monitoring, safety alarms, biocompatible materials, precise flow control",
      image: laparoscopicSetImage,
      setupTips: ["Complete safety checklist", "Prime all circuits", "Test monitoring systems", "Verify cannula sizes", "Maintain constant communication"]
    },
    "Aortic valve prostheses": {
      name: "Aortic Valve Prostheses",
      category: "Implant Device",
      description: "Replacement aortic valve prostheses including mechanical and bioprosthetic options for aortic valve replacement procedures",
      contents: ["Mechanical valves (various sizes)", "Bioprosthetic valves", "Valve sizers", "Implantation tools", "Suture guides", "Valve holders"],
      usage: "Primary implants for aortic valve replacement in patients with aortic stenosis or regurgitation requiring valve replacement therapy",
      specifications: "Various sizes 19-29mm, mechanical and tissue options, CE marked, sterile packaging, comprehensive sizing system",
      image: grasperImage,
      setupTips: ["Verify correct size", "Handle with extreme care", "Use proper holders", "Check valve function", "Follow manufacturer protocols"]
    },
    "Valve sizers": {
      name: "Cardiac Valve Sizers",
      category: "Sizing Device",
      description: "Precision sizing instruments for determining optimal valve prosthesis size during cardiac valve replacement procedures",
      contents: ["Aortic valve sizers (19-29mm)", "Mitral valve sizers", "Tricuspid sizers", "Measuring guides", "Reference charts"],
      usage: "Critical for determining correct prosthetic valve size, ensuring optimal fit and function during valve replacement procedures",
      specifications: "Precise sizing increments, easy-to-read markings, autoclave compatible, various valve types, color-coded sizing",
      image: grasperImage,
      setupTips: ["Use gentle pressure", "Try multiple sizes", "Document selected size", "Handle carefully", "Follow sizing protocols"]
    },
    "Cardioplegia setup": {
      name: "Cardioplegia Delivery System",
      category: "Cardiac Protection",
      description: "Comprehensive system for delivering cardioplegic solution to arrest and protect the myocardium during cardiac procedures",
      contents: ["Cardioplegia cannulae", "Delivery tubing", "Temperature monitoring", "Pressure controls", "Solution mixing", "Flow regulators"],
      usage: "Essential for myocardial protection during cardiac surgery, delivering protective solution to arrest heart and maintain tissue viability",
      specifications: "Temperature controlled delivery, pressure monitoring, multiple delivery routes, integrated mixing, safety alarms",
      image: laparoscopicSetImage,
      setupTips: ["Test temperature control", "Check all connections", "Verify solution composition", "Monitor delivery pressure", "Prime system completely"]
    },
    "Deairing needles": {
      name: "Cardiac Deairing Needle System",
      category: "Air Removal",
      description: "Specialized needles and suction systems for removing air from cardiac chambers and great vessels during cardiac surgery",
      contents: ["Deairing needles (various sizes)", "Suction tubing", "Needle holders", "Air evacuation system", "Positioning devices"],
      usage: "Critical for removing air emboli from cardiac chambers and vessels, preventing neurological complications during cardiac procedures",
      specifications: "Various needle sizes, high-flow suction capability, precise positioning, sterile system, rapid air removal",
      image: trocarImage,
      setupTips: ["Test suction pressure", "Have multiple needle sizes", "Position for optimal access", "Monitor air removal", "Use systematic approach"]
    },
    // ADDITIONAL MISSING INSTRUMENTS FOR DIFFERENT PROCEDURE VARIATIONS
    "Valve retractors": {
      name: "Cardiac Valve Retractors",
      category: "Retraction System",
      description: "Specialized retraction instruments designed for optimal exposure during cardiac valve procedures with atraumatic blade design",
      contents: ["Mitral valve retractors", "Aortic valve retractors", "Self-retaining retractors", "Adjustable blade retractors", "Table-mounted systems"],
      usage: "Essential for providing optimal surgical exposure during valve replacement and repair procedures, ensuring clear visualization of valve structures",
      specifications: "Atraumatic blade design, various sizes for different valve types, self-retaining capability, stable positioning, easy adjustment",
      image: grasperImage,
      setupTips: ["Select appropriate retractor for valve type", "Position for optimal exposure", "Use minimal retraction force", "Check stability", "Have multiple sizes available"]
    },
    "Prosthetic valves": {
      name: "Cardiac Prosthetic Valves",
      category: "Implant Device",
      description: "Artificial heart valves for replacement of diseased native valves, available in mechanical and biological options with comprehensive sizing",
      contents: ["Mechanical valves (various sizes)", "Bioprosthetic valves", "Valve sizers", "Insertion tools", "Suture guides", "Valve holders"],
      usage: "Replacement of diseased mitral, aortic, tricuspid, or pulmonary valves to restore proper cardiac function and improve patient outcomes",
      specifications: "Various sizes 19-33mm, mechanical or bioprosthetic options, MRI compatible designs available, sterile packaging, comprehensive sizing system",
      image: grasperImage,
      setupTips: ["Verify correct valve size", "Handle with extreme care", "Keep sterile until insertion", "Have multiple sizes available", "Test valve function before implantation"]
    },
    "Suture materials": {
      name: "Cardiac Surgery Suture Materials",
      category: "Closure Materials",
      description: "Specialized suture materials designed for cardiac surgery with enhanced handling characteristics and biocompatibility",
      contents: ["Pledgeted sutures for valve surgery", "Non-pledgeted sutures", "Various needle types", "Suture scissors", "Suture organizers", "Temporary sutures"],
      usage: "Critical for secure closure of cardiac structures, valve attachment, and hemostasis during cardiac surgical procedures",
      specifications: "Various materials (Prolene, Ethibond, Ti-Cron), multiple sizes, pledgeted and non-pledgeted options, cardiovascular needles",
      image: harmonicScalpelImage,
      setupTips: ["Organize by suture type", "Have pledgeted options ready", "Pre-cut appropriate lengths", "Keep sutures organized", "Have multiple needle types available"]
    },
    "Valve instruments": {
      name: "General Valve Surgery Instruments",
      category: "Valve Surgery Set",
      description: "Comprehensive instrument set for general valve procedures including repair and replacement with precision handling tools",
      contents: ["Valve scissors", "Valve forceps", "Commissurotomy knife", "Valve dilators", "Measuring devices", "Valve hooks"],
      usage: "Essential for valve repair procedures, commissurotomy, valve assessment, and general valve manipulation during cardiac surgery",
      specifications: "Precision construction, various sizes, autoclave compatible, designed for delicate valve tissue handling",
      image: harmonicScalpelImage,
      setupTips: ["Organize by procedure type", "Have repair and replacement tools ready", "Check instrument sharpness", "Handle with care", "Have backup instruments available"]
    },
    "Bypass equipment": {
      name: "Cardiopulmonary Bypass Equipment",
      category: "Life Support Equipment",
      description: "Essential equipment for establishing and maintaining cardiopulmonary bypass during cardiac surgery procedures",
      contents: ["Bypass cannulae", "Pump tubing", "Oxygenator", "Heat exchanger", "Arterial and venous lines", "Monitoring equipment"],
      usage: "Provides complete cardiopulmonary support during cardiac surgery, allowing for precise surgical procedures on the arrested heart",
      specifications: "Complete bypass capability, integrated monitoring, temperature control, biocompatible materials, safety systems",
      image: laparoscopicSetImage,
      setupTips: ["Complete equipment check", "Prime all lines", "Test monitoring systems", "Verify connections", "Have backup equipment ready"]
    },
    // GENERAL SURGERY INSTRUMENTS - BATCH 1
    "Retractors": {
      name: "Surgical Retractors Set",
      category: "Exposure Tools",
      description: "Comprehensive collection of retractors for tissue retraction and surgical field exposure during general surgical procedures",
      contents: ["Richardson retractors", "Deaver retractors", "Army-Navy retractors", "Ribbon retractors", "Self-retaining retractors", "Balfour retractors"],
      usage: "Essential for maintaining surgical exposure by holding back tissue, organs, and wound edges during all general surgical procedures",
      specifications: "Various sizes and types, stainless steel construction, autoclavable, manual and self-retaining options available",
      image: grasperImage,
      setupTips: ["Have multiple sizes available", "Test self-retaining mechanisms", "Organize by size", "Ensure clean surfaces", "Check for proper function"]
    },
    "Hemostats": {
      name: "Hemostatic Forceps",
      category: "Clamping Instruments",
      description: "Essential clamping instruments for controlling bleeding and grasping vessels during surgical procedures",
      contents: ["Kelly clamps", "Mosquito clamps", "Crile clamps", "Curved and straight hemostats", "Pean clamps"],
      usage: "Used for clamping blood vessels, controlling bleeding, and grasping tissue during all types of surgical procedures",
      specifications: "Various sizes 5-8 inches, curved and straight options, ratcheted handles, stainless steel, autoclavable",
      image: grasperImage,
      setupTips: ["Test ratchet mechanisms", "Have multiple sizes ready", "Organize by size and curve", "Ensure tips align properly", "Keep in pairs"]
    },
    "Forceps": {
      name: "Surgical Forceps Set",
      category: "Grasping Instruments",
      description: "Precision grasping instruments for tissue handling and manipulation during surgical procedures",
      contents: ["Adson forceps", "DeBakey forceps", "Russian forceps", "Tissue forceps", "Dressing forceps", "Toothed and non-toothed options"],
      usage: "Essential for gentle tissue handling, grasping delicate structures, and precise manipulation during surgery",
      specifications: "Various sizes 4-12 inches, toothed and non-toothed tips, stainless steel, autoclavable, ergonomic design",
      image: grasperImage,
      setupTips: ["Check tip alignment", "Have both toothed and smooth options", "Organize by size", "Test gripping action", "Handle with care"]
    },
    "Suction": {
      name: "Surgical Suction System",
      category: "Fluid Management",
      description: "Complete suction apparatus for removing blood, fluids, and debris from the surgical field",
      contents: ["Yankauer suction tips", "Frazier suction tips", "Poole suction", "Suction tubing", "Various tip sizes", "Suction canister"],
      usage: "Critical for maintaining clear surgical field by removing blood, irrigation fluid, and debris during all surgical procedures",
      specifications: "Multiple tip sizes, adjustable suction pressure, sterile disposable tips, compatible with standard suction units",
      image: laparoscopicSetImage,
      setupTips: ["Test suction pressure", "Have multiple tip sizes available", "Check tubing connections", "Ensure adequate canister size", "Keep tips clear"]
    },
    "Bowel clamps": {
      name: "Intestinal Clamps",
      category: "Bowel Instruments",
      description: "Specialized atraumatic clamps designed for gentle handling and occlusion of bowel segments during gastrointestinal surgery",
      contents: ["Doyen clamps", "Allen clamps", "Soft bowel clamps", "Intestinal clamps", "Non-crushing clamps"],
      usage: "Essential for bowel resection, anastomosis, and temporary occlusion of intestinal segments while minimizing tissue trauma",
      specifications: "Atraumatic design, various lengths, gentle compression, stainless steel, autoclavable, non-crushing jaws",
      image: grasperImage,
      setupTips: ["Use gentle pressure only", "Have multiple sizes ready", "Check jaw alignment", "Avoid prolonged clamping", "Test before use"]
    },
    "Anastomotic staplers": {
      name: "Surgical Staplers for Anastomosis",
      category: "Stapling Devices",
      description: "Advanced stapling devices for creating secure anastomoses during bowel and gastrointestinal surgical procedures",
      contents: ["Circular staplers (various sizes)", "Linear staplers", "End-to-end anastomosis staplers", "Cartridges (various sizes)", "Sizing instruments"],
      usage: "Used for creating bowel anastomoses, gastrointestinal connections, and secure tissue approximation during resection procedures",
      specifications: "Multiple sizes (21mm-33mm), single-use devices, integrated cutting mechanism, color-coded cartridges, leak-test capability",
      image: harmonicScalpelImage,
      setupTips: ["Select appropriate size", "Test fire mechanism", "Have backup available", "Check cartridge loading", "Follow manufacturer protocol"]
    },
    "Drainage systems": {
      name: "Surgical Drain Systems",
      category: "Post-operative Drainage",
      description: "Complete drainage systems for removing fluid collections and preventing accumulation post-operatively",
      contents: ["Jackson-Pratt drains", "Blake drains", "Penrose drains", "Hemovac drains", "Chest tubes", "Drainage bags"],
      usage: "Essential for post-operative fluid management, preventing seroma/hematoma formation, and monitoring surgical site drainage",
      specifications: "Various sizes and types, closed suction systems, passive drainage options, sterile packaging, easy-to-monitor collection",
      image: trocarImage,
      setupTips: ["Select appropriate drain type", "Check vacuum function", "Ensure secure connections", "Document placement", "Test suction capability"]
    },
    "Mesh (polypropylene)": {
      name: "Surgical Mesh for Hernia Repair",
      category: "Implant Material",
      description: "Biocompatible polypropylene mesh used for reinforcement during hernia repairs and abdominal wall reconstruction",
      contents: ["Various mesh sizes", "Lightweight mesh", "Medium-weight mesh", "Pre-shaped mesh", "Fixation devices"],
      usage: "Essential for hernia repair providing strong reinforcement and reducing recurrence rates in inguinal, umbilical, and ventral hernias",
      specifications: "Polypropylene material, various sizes 6x11cm to 30x30cm, monofilament or multifilament, porous design for tissue ingrowth",
      image: harmonicScalpelImage,
      setupTips: ["Select appropriate size", "Trim to fit if needed", "Handle with sterile technique", "Have fixation devices ready", "Avoid contamination"]
    },
    "Colonoscope": {
      name: "Flexible Colonoscope",
      category: "Endoscopic Equipment",
      description: "Flexible endoscopic instrument for visualization and diagnostic/therapeutic procedures of the colon and large intestine",
      contents: ["Flexible colonoscope", "Light source", "Video processor", "Biopsy forceps", "Polypectomy snares", "Irrigation system"],
      usage: "Used for diagnostic colonoscopy, polyp removal, biopsy collection, and therapeutic interventions in the colon",
      specifications: "Variable stiffness, 4-way tip deflection, HD imaging, 160cm length, integrated water jet, compatible biopsy channel",
      image: laparoscopicSetImage,
      setupTips: ["Test all functions before procedure", "Ensure proper cleaning", "Check light source", "Have biopsy tools ready", "Verify irrigation"]
    },
    "Endoscope": {
      name: "Flexible Endoscope System",
      category: "Endoscopic Equipment",
      description: "Versatile flexible endoscope for various diagnostic and therapeutic endoscopic procedures",
      contents: ["Flexible endoscope", "Video system", "Light source", "Working channel tools", "Irrigation equipment", "Image capture system"],
      usage: "Essential for minimally invasive visualization and intervention in gastrointestinal, respiratory, and urological procedures",
      specifications: "HD imaging, variable working length, multiple channel options, autoclavable or high-level disinfection, ergonomic controls",
      image: laparoscopicSetImage,
      setupTips: ["Complete functional check", "Test image quality", "Check working channels", "Ensure proper sterilization", "Have backup scope ready"]
    },
    // COMMONLY USED INSTRUMENTS - BATCH 2
    "Linear staplers": {
      name: "Linear Cutting Staplers",
      category: "Stapling Devices",
      description: "Advanced linear stapling devices for tissue division and sealing in open and laparoscopic procedures",
      contents: ["Linear stapler handles", "Various cartridge sizes (30mm-100mm)", "Reloads", "Articulating options", "Vascular cartridges"],
      usage: "Essential for tissue transection with simultaneous stapling, used in bowel resection, lung resection, and gastric procedures",
      specifications: "Multiple sizes, color-coded cartridges for tissue thickness, integrated cutting mechanism, manual and powered options",
      image: harmonicScalpelImage,
      setupTips: ["Select appropriate cartridge for tissue thickness", "Test firing mechanism", "Have backup cartridges", "Check staple formation", "Follow manufacturer guidelines"]
    },
    "GIA staplers": {
      name: "Gastrointestinal Anastomosis Staplers",
      category: "Stapling Devices",
      description: "Specialized staplers for creating side-to-side anastomoses in gastrointestinal surgery",
      contents: ["GIA stapler", "Various cartridge lengths", "Reload cartridges", "Loading units", "Sizing instruments"],
      usage: "Used for creating gastrointestinal anastomoses, bowel resections, and lung resections with simultaneous stapling and cutting",
      specifications: "Multiple lengths 60mm-100mm, color-coded for tissue thickness, disposable loading units, consistent staple formation",
      image: harmonicScalpelImage,
      setupTips: ["Choose correct cartridge length", "Verify proper loading", "Test before use", "Have multiple reloads available", "Check staple line integrity"]
    },
    "Endoscopic staplers": {
      name: "Laparoscopic Stapling Devices",
      category: "Minimally Invasive Staplers",
      description: "Advanced endoscopic staplers for laparoscopic and thoracoscopic tissue division and anastomosis",
      contents: ["Endoscopic stapler", "Articulating head options", "Various cartridges", "Reload units", "5mm and 12mm options"],
      usage: "Essential for minimally invasive surgery including bariatric, colorectal, and thoracic procedures requiring tissue stapling",
      specifications: "360° articulation, multiple cartridge colors, 45mm-60mm lengths, compatible with standard ports, powered and manual options",
      image: harmonicScalpelImage,
      setupTips: ["Select appropriate articulation", "Test rotation mechanism", "Have adequate reloads", "Check firing mechanism", "Ensure proper port placement"]
    },
    "Circular staplers": {
      name: "Circular Anastomosis Staplers",
      category: "Stapling Devices",
      description: "Specialized circular staplers for creating end-to-end or end-to-side anastomoses in gastrointestinal surgery",
      contents: ["Circular stapler", "Anvils (various sizes 21mm-33mm)", "Sizing instruments", "Loading unit", "Test firing mechanism"],
      usage: "Critical for creating circular anastomoses in colorectal surgery, esophageal surgery, and gastrointestinal reconstructions",
      specifications: "Sizes 21mm-33mm diameter, integrated cutting mechanism, single-use devices, leak-test capability, consistent staple formation",
      image: harmonicScalpelImage,
      setupTips: ["Select appropriate anvil size", "Test anastomosis integrity", "Have backup sizes", "Verify staple formation", "Perform leak test"]
    },
    "Drain": {
      name: "Surgical Drain",
      category: "Drainage Device",
      description: "Post-operative drainage device for removing fluid collections and monitoring surgical site drainage",
      contents: ["Drain tube", "Collection reservoir", "Fixation device", "Connector tubing", "Drainage bag"],
      usage: "Used for preventing fluid accumulation, monitoring post-operative bleeding, and facilitating healing after surgical procedures",
      specifications: "Various sizes and types, closed suction or passive drainage, sterile packaging, easy emptying and monitoring",
      image: trocarImage,
      setupTips: ["Select appropriate drain type and size", "Secure properly", "Document output", "Monitor for complications", "Maintain sterility"]
    },
    "Drains": {
      name: "Surgical Drainage Set",
      category: "Drainage Devices",
      description: "Comprehensive set of drainage devices for various surgical applications and post-operative management",
      contents: ["Multiple drain types", "Various sizes", "Collection systems", "Fixation sutures", "Drainage bags"],
      usage: "Essential for managing post-operative fluid collections across all surgical specialties",
      specifications: "Jackson-Pratt, Blake, Hemovac, and Penrose drains, various sizes, closed suction systems available",
      image: trocarImage,
      setupTips: ["Have multiple drain types ready", "Select based on procedure", "Ensure proper placement", "Secure adequately", "Monitor output carefully"]
    },
    "Irrigation": {
      name: "Surgical Irrigation System",
      category: "Irrigation Equipment",
      description: "Complete irrigation system for surgical site cleansing and debris removal during procedures",
      contents: ["Irrigation fluid (saline)", "Bulb syringes", "Pulsed lavage system", "Irrigation tubing", "Splash basin"],
      usage: "Critical for wound cleansing, debris removal, maintaining clear surgical field, and preventing infection",
      specifications: "Sterile normal saline, adjustable pressure delivery, pulsatile or continuous irrigation, various volume options",
      image: laparoscopicSetImage,
      setupTips: ["Use warm irrigation fluid", "Test pressure settings", "Have adequate fluid volume", "Maintain sterility", "Use appropriate delivery system"]
    },
    "Self-retaining retractors": {
      name: "Self-Retaining Retractor System",
      category: "Retraction Equipment",
      description: "Advanced retractor systems that maintain exposure without manual holding, freeing surgical team hands",
      contents: ["Balfour retractor", "Bookwalter retractor", "Iron Intern", "Various blade sizes", "Table attachment systems"],
      usage: "Essential for maintaining sustained surgical exposure in abdominal, thoracic, and pelvic procedures",
      specifications: "Multiple blade configurations, ratcheted arms, stable positioning, autoclavable components, modular systems",
      image: grasperImage,
      setupTips: ["Assemble before draping", "Select appropriate blades", "Position securely", "Test locking mechanisms", "Adjust gradually"]
    },
    "Hysteroscope": {
      name: "Hysteroscopy System",
      category: "Gynecologic Endoscopy",
      description: "Specialized endoscopic system for visualization and treatment of intrauterine pathology",
      contents: ["Hysteroscope (rigid or flexible)", "Light source", "Video system", "Distention media", "Operative instruments", "Fluid management system"],
      usage: "Used for diagnostic and operative hysteroscopy including polyp removal, fibroid resection, and endometrial ablation",
      specifications: "Diagnostic and operative scopes, various angles (0°, 12°, 30°), continuous flow systems, integrated electrosurgery",
      image: laparoscopicSetImage,
      setupTips: ["Check distention system", "Test visualization", "Prepare operative instruments", "Monitor fluid balance", "Have backup equipment"]
    },
    "Resectoscope": {
      name: "Urologic Resectoscope",
      category: "Endoscopic Equipment",
      description: "Specialized endoscopic instrument for transurethral resection procedures in urology",
      contents: ["Resectoscope", "Working element", "Loop electrodes", "Irrigation system", "Video equipment", "Electrosurgical unit"],
      usage: "Essential for TURP (transurethral resection of prostate) and TURBT (bladder tumor resection) procedures",
      specifications: "Continuous flow design, various loop sizes, integrated video, monopolar or bipolar options, precise cutting control",
      image: laparoscopicSetImage,
      setupTips: ["Test loop function", "Check irrigation flow", "Verify electrosurgical settings", "Have backup loops", "Monitor fluid balance"]
    },
    // ADDITIONAL CRITICAL INSTRUMENTS - BATCH 3
    "Chest tube set": {
      name: "Thoracic Drainage System",
      category: "Chest Drainage",
      description: "Complete system for chest tube insertion and management of pneumothorax or hemothorax",
      contents: ["Chest tubes (various sizes 28-40Fr)", "Trocar", "Kelly clamps", "Suture material", "Drainage system", "Water seal chamber"],
      usage: "Essential for evacuating air or fluid from pleural space in trauma, thoracic surgery, or spontaneous pneumothorax",
      specifications: "Multiple sizes, radiopaque markings, fenestrated design, sterile packaging, compatible with standard drainage systems",
      image: trocarImage,
      setupTips: ["Select appropriate tube size", "Have insertion tray ready", "Test water seal system", "Prepare securing sutures", "Check drainage system"]
    },
    "Chest tubes": {
      name: "Thoracostomy Tubes",
      category: "Drainage Equipment",
      description: "Specialized tubes for draining air, blood, or fluid from the pleural cavity",
      contents: ["Various sized chest tubes", "Insertion equipment", "Securing devices", "Connection tubing", "Collection systems"],
      usage: "Critical for managing pneumothorax, hemothorax, pleural effusions, and post-thoracic surgery drainage",
      specifications: "Sizes 12Fr-40Fr, graduated markings, fenestrated or non-fenestrated, flexible material, radiopaque stripe",
      image: trocarImage,
      setupTips: ["Choose size based on indication", "Prepare insertion site", "Have suture ready", "Connect to drainage", "Monitor output"]
    },
    "Rib spreaders": {
      name: "Thoracic Rib Retractors",
      category: "Thoracic Retraction",
      description: "Specialized retractors for spreading ribs and providing thoracic cavity exposure",
      contents: ["Finochietto rib spreader", "Various blade sizes", "Ratchet mechanism", "Padding options"],
      usage: "Essential for thoracotomy procedures providing wide exposure of thoracic cavity for lung and cardiac surgery",
      specifications: "Stainless steel, self-retaining mechanism, various opening widths, protective padding available, autoclavable",
      image: grasperImage,
      setupTips: ["Apply gradually", "Use rib protection pads", "Check ratchet function", "Position carefully", "Have multiple sizes available"]
    },
    "Lung retractors": {
      name: "Pulmonary Retraction Instruments",
      category: "Lung Retraction",
      description: "Specialized instruments for gentle retraction and manipulation of lung tissue during thoracic procedures",
      contents: ["Lung retractors", "Malleable retractors", "Deaver retractors", "Sponge sticks", "Lung clamps"],
      usage: "Used for atraumatic lung retraction during lobectomy, pneumonectomy, and thoracic surgical procedures",
      specifications: "Smooth edges, various sizes, flexible options, atraumatic design, prevents lung tissue damage",
      image: grasperImage,
      setupTips: ["Use gentle retraction", "Protect lung tissue", "Have sponge sticks ready", "Multiple sizes available", "Avoid excessive pressure"]
    },
    "Arthroscope": {
      name: "Arthroscopic Camera System",
      category: "Joint Visualization",
      description: "Specialized endoscope for minimally invasive joint visualization and arthroscopic procedures",
      contents: ["Arthroscope (2.7mm, 4mm)", "30° and 70° scopes", "Camera head", "Light source", "Irrigation system", "Video monitor"],
      usage: "Essential for diagnostic and therapeutic arthroscopy of knee, shoulder, hip, and other joints",
      specifications: "HD imaging, various angles, integrated irrigation, autoclavable, rod lens system, excellent optics",
      image: laparoscopicSetImage,
      setupTips: ["Test camera before draping", "Check irrigation flow", "Have multiple angle scopes", "Verify light source", "Ensure clear visualization"]
    },
    "Arthroscope (30° and 70°)": {
      name: "Angled Arthroscopic Scopes",
      category: "Joint Endoscopy",
      description: "Multiple angle arthroscopes for comprehensive joint visualization during arthroscopic procedures",
      contents: ["30-degree arthroscope", "70-degree arthroscope", "Camera system", "Light cable", "Irrigation cannula"],
      usage: "Provides varied viewing angles for complete joint examination and treatment during arthroscopic surgery",
      specifications: "2.7mm and 4mm diameters, HD optics, autoclavable, rod lens design, integrated irrigation channel",
      image: laparoscopicSetImage,
      setupTips: ["Start with 30° scope", "Use 70° for posterior viewing", "Check optics clarity", "Maintain irrigation", "Have both angles ready"]
    },
    "Arthroscope and camera": {
      name: "Complete Arthroscopy Visualization System",
      category: "Arthroscopic Equipment",
      description: "Integrated arthroscope and camera system for high-definition joint visualization",
      contents: ["Arthroscope", "HD camera head", "Light source", "Video processor", "Monitor", "Recording capability"],
      usage: "Complete system for arthroscopic procedures providing crystal-clear visualization of joint structures",
      specifications: "4K HD capability, multiple scope angles, touchscreen controls, image enhancement, video documentation",
      image: laparoscopicSetImage,
      setupTips: ["White balance camera", "Check all connections", "Test image quality", "Adjust brightness", "Verify recording if needed"]
    },
    "Burr and shaver": {
      name: "Arthroscopic Burr and Shaver System",
      category: "Arthroscopic Power Tools",
      description: "Powered instruments for bone and soft tissue removal during arthroscopic procedures",
      contents: ["Power console", "Burr handpiece", "Shaver handpiece", "Various burr and blade sizes", "Foot pedal control"],
      usage: "Essential for bone shaping, soft tissue debridement, and meniscal/labral trimming during arthroscopy",
      specifications: "Variable speed 0-12,000 RPM, forward/reverse/oscillate modes, sterile disposable blades, ergonomic handpieces",
      image: electrocauteryImage,
      setupTips: ["Test power unit", "Select appropriate blade", "Check rotation direction", "Use oscillate for soft tissue", "Have multiple blade sizes"]
    },
    "Meniscal instruments": {
      name: "Meniscus Repair and Resection Tools",
      category: "Knee Arthroscopy",
      description: "Specialized instruments for meniscal surgery including repair and partial meniscectomy",
      contents: ["Meniscal graspers", "Biters", "Punches", "Suture passers", "Basket forceps", "Meniscal arrows"],
      usage: "Used for meniscal tear repair, partial meniscectomy, and meniscal transplantation during knee arthroscopy",
      specifications: "Various jaw configurations, precise cutting edges, suture passing capability, disposable and reusable options",
      image: grasperImage,
      setupTips: ["Have complete set available", "Test grasping function", "Organize by function", "Check cutting edges", "Prepare suture passers"]
    },
    "ACL reconstruction instruments": {
      name: "Anterior Cruciate Ligament Reconstruction Set",
      category: "Ligament Surgery",
      description: "Complete instrument set for ACL reconstruction including tunnel preparation and graft fixation",
      contents: ["Drill guides", "Reamers", "Guidewires", "Graft preparation tools", "Interference screws", "Fixation devices"],
      usage: "Essential for ACL reconstruction surgery providing precise tunnel placement and secure graft fixation",
      specifications: "Adjustable drill guides, various reamer sizes, graft sizing tools, bioabsorbable and titanium fixation options",
      image: electrocauteryImage,
      setupTips: ["Verify graft size", "Check drill guide angles", "Have appropriate fixation", "Test reamers", "Prepare graft station"]
    },
    "Rotator cuff repair instruments": {
      name: "Shoulder Rotator Cuff Repair Set",
      category: "Shoulder Surgery",
      description: "Specialized instruments for arthroscopic rotator cuff repair and reconstruction",
      contents: ["Suture anchors", "Anchor inserters", "Suture passers", "Knot pushers", "Graspers", "Tissue punches"],
      usage: "Used for arthroscopic repair of rotator cuff tears with suture anchor fixation and tissue mobilization",
      specifications: "Various anchor sizes, bioabsorbable and metal options, knotless and knotted techniques, specialized passers",
      image: harmonicScalpelImage,
      setupTips: ["Select appropriate anchors", "Test inserters", "Have multiple passers", "Organize sutures", "Prepare knot pushers"]
    },
    "Hip replacement instruments": {
      name: "Total Hip Arthroplasty Instrument Set",
      category: "Joint Replacement",
      description: "Comprehensive instrument set for total hip replacement surgery",
      contents: ["Acetabular reamers", "Femoral broaches", "Trial components", "Impaction tools", "Cup inserters", "Stem inserters"],
      usage: "Essential for total hip arthroplasty providing precise bone preparation and component implantation",
      specifications: "Multiple sizes, sequential sizing, calibrated impactors, modular trial components, navigation compatible",
      image: electrocauteryImage,
      setupTips: ["Organize by sizing sequence", "Have complete trial sets", "Check impactors", "Verify component sizes", "Prepare cement if needed"]
    },
    "Femoral and acetabular reamers": {
      name: "Hip Reaming System",
      category: "Joint Preparation Tools",
      description: "Precision reamers for acetabular and femoral bone preparation during hip replacement",
      contents: ["Acetabular reamers (various sizes)", "Femoral reamers", "T-handle drivers", "Power reamer attachment", "Sizing guides"],
      usage: "Used for precise bone preparation creating optimal fit for hip replacement components",
      specifications: "1mm incremental sizing, hemispherical design, sharp cutting flutes, autoclavable, compatible with power tools",
      image: electrocauteryImage,
      setupTips: ["Start with smaller sizes", "Increase incrementally", "Check reamer sharpness", "Use power reamer option", "Monitor bone quality"]
    },
    "Implant components": {
      name: "Prosthetic Implant Components",
      category: "Joint Replacement Implants",
      description: "Complete set of prosthetic components for joint replacement procedures",
      contents: ["Femoral stems", "Acetabular cups", "Tibial trays", "Femoral components", "Polyethylene inserts", "Modular heads"],
      usage: "Primary implants for total joint arthroplasty restoring function in hip, knee, and shoulder joints",
      specifications: "Various sizes, cemented and cementless options, modular designs, biocompatible materials, long-term durability",
      image: grasperImage,
      setupTips: ["Verify correct size", "Handle with care", "Check component compatibility", "Avoid contamination", "Have backup sizes"]
    },
    "Orthopedic cement system": {
      name: "Bone Cement Preparation System",
      category: "Orthopedic Cement",
      description: "Complete system for mixing and delivering bone cement during joint replacement procedures",
      contents: ["PMMA cement powder", "Liquid monomer", "Mixing bowl", "Cement gun", "Pressurizer", "Cement restrictors"],
      usage: "Essential for cemented joint arthroplasty providing secure fixation of prosthetic components to bone",
      specifications: "Antibiotic-loaded options, controlled mixing, vacuum mixing systems, timed polymerization, radiopaque markers",
      image: harmonicScalpelImage,
      setupTips: ["Mix in ventilated area", "Follow timing protocol", "Use vacuum mixing", "Load cement gun properly", "Work during doughy phase"]
    },
    // CARDIOVASCULAR INSTRUMENTS - BATCH 4
    "Cardioplegia delivery system": {
      name: "Myocardial Protection System",
      category: "Cardiac Perfusion",
      description: "System for delivering cardioplegia solution to arrest and protect the heart during cardiac surgery",
      contents: ["Cardioplegia pump", "Delivery catheter", "Pressure monitor", "Temperature probe", "Retrograde cannula", "Antegrade root cannula"],
      usage: "Essential for myocardial protection during cardiac surgery by delivering cold or warm cardioplegic solution",
      specifications: "Programmable delivery, pressure-regulated, integrated temperature control, retrograde and antegrade capability",
      image: harmonicScalpelImage,
      setupTips: ["Prime system completely", "Check temperature control", "Verify pressure limits", "Test both delivery methods", "Monitor K+ concentration"]
    },
    "Aortic cross-clamp": {
      name: "Aortic Occlusion Clamp",
      category: "Vascular Occlusion",
      description: "Specialized clamp for occluding the ascending aorta during cardiopulmonary bypass",
      contents: ["Aortic clamp", "Glover clamp", "Cooley clamp", "Various jaw lengths", "Atraumatic tips"],
      usage: "Critical for isolating the heart during cardioplegic arrest, allowing safe performance of cardiac procedures",
      specifications: "Stainless steel, atraumatic design, various sizes, secure locking mechanism, minimal vessel trauma",
      image: grasperImage,
      setupTips: ["Apply smoothly", "Avoid intimal damage", "Verify complete occlusion", "Position carefully", "Have backup clamps available"]
    },
    "Vascular clamps and occluders": {
      name: "Vascular Control Instruments",
      category: "Vascular Occlusion",
      description: "Comprehensive set of clamps for temporary vascular occlusion during cardiac and vascular procedures",
      contents: ["Satinsky clamps", "DeBakey clamps", "Bulldog clamps", "Vessel loops", "Umbilical tapes", "Rumel tourniquets"],
      usage: "Used for controlled vascular occlusion, bypass graft construction, and vessel isolation during surgery",
      specifications: "Atraumatic jaws, various sizes, partial and complete occlusion options, delicate vessel handling",
      image: grasperImage,
      setupTips: ["Select appropriate size", "Use minimal pressure", "Protect vessel intima", "Have multiple options available", "Check clamp function"]
    },
    "Cell saver": {
      name: "Autologous Blood Recovery System",
      category: "Blood Conservation",
      description: "Device for collecting, filtering, and reinfusing patient's own blood during surgery",
      contents: ["Collection reservoir", "Centrifuge bowl", "Wash solution", "Reinfusion bag", "Suction tubing", "Anticoagulant"],
      usage: "Essential for blood conservation in cardiac and vascular surgery, reducing need for allogeneic transfusion",
      specifications: "Automated processing, removes debris and free hemoglobin, produces washed RBCs, hematocrit optimization",
      image: harmonicScalpelImage,
      setupTips: ["Prime system early", "Add anticoagulant to reservoir", "Monitor bowl fill", "Check wash solution", "Label reinfusion bag"]
    },
    "Defibrillator paddles": {
      name: "Internal Cardiac Defibrillation System",
      category: "Cardiac Resuscitation",
      description: "Sterile internal paddles for direct cardiac defibrillation during open heart surgery",
      contents: ["Internal paddles", "Pediatric paddles", "Defibrillator unit", "Conductive gel", "Sterile cables"],
      usage: "Used for internal cardiac defibrillation when external defibrillation is inadequate or during open procedures",
      specifications: "Various sizes, 5-50 joules capability, pediatric and adult options, insulated handles, sterile presentation",
      image: electrocauteryImage,
      setupTips: ["Test before draping", "Have gel ready", "Know energy settings", "Ensure good contact", "Charge appropriately"]
    },
    "Pacemaker leads and generator": {
      name: "Temporary Pacing System",
      category: "Cardiac Pacing",
      description: "Temporary pacing system for postoperative cardiac rhythm support",
      contents: ["Epicardial pacing wires", "Temporary pacemaker generator", "Atrial and ventricular leads", "Connection cables"],
      usage: "Essential for temporary pacing support following cardiac surgery to manage bradycardia or AV block",
      specifications: "Bipolar and unipolar options, adjustable rate and output, sensing capability, battery-powered",
      image: harmonicScalpelImage,
      setupTips: ["Place epicardial wires", "Test capture threshold", "Secure connections", "Label atrial/ventricular", "Set appropriate parameters"]
    },
    "Coronary shunts": {
      name: "Intracoronary Bypass Shunts",
      category: "Coronary Perfusion",
      description: "Temporary shunts for maintaining coronary perfusion during off-pump cardiac surgery",
      contents: ["Various sized shunts", "Insertion tools", "Securing devices", "Flushing solution", "Storage case"],
      usage: "Used in off-pump CABG to maintain distal coronary perfusion while performing anastomosis",
      specifications: "Multiple diameters (1.0-2.5mm), silicone material, atraumatic tips, easy insertion and removal",
      image: trocarImage,
      setupTips: ["Size vessel appropriately", "Heparinize shunt", "Verify flow", "Secure properly", "Monitor for displacement"]
    },
    "Sternal retractor": {
      name: "Median Sternotomy Retractor",
      category: "Chest Retraction",
      description: "Self-retaining retractor for maintaining sternal separation during cardiac surgery",
      contents: ["Retractor frame", "Sternal blades", "Ratchet mechanism", "Sternal pads", "Various blade sizes"],
      usage: "Essential for exposing mediastinum and heart during median sternotomy cardiac procedures",
      specifications: "Self-retaining design, adjustable opening width, protective blade covers, stable platform",
      image: grasperImage,
      setupTips: ["Open gradually", "Use sternal protection", "Secure table mount", "Verify stable position", "Adjust as needed"]
    },
    "Rib spreader": {
      name: "Thoracic Access Retractor",
      category: "Chest Wall Retraction",
      description: "Retractor for spreading ribs during thoracotomy and minimally invasive cardiac procedures",
      contents: ["Finochietto retractor", "Various sizes", "Rib protection pads", "Ratchet mechanism", "Blade attachments"],
      usage: "Used for rib spreading in thoracotomy approaches to heart, lungs, and mediastinal structures",
      specifications: "Multiple sizes, self-retaining, gradual opening, rib protection, autoclavable",
      image: grasperImage,
      setupTips: ["Apply gradually", "Protect ribs", "Check patient tolerance", "Secure position", "Have multiple sizes"]
    },
    "Angioplasty balloon catheter": {
      name: "Percutaneous Transluminal Angioplasty Catheter",
      category: "Endovascular Intervention",
      description: "Balloon catheter for dilating stenotic vessels in angioplasty procedures",
      contents: ["Balloon catheter", "Inflation device", "Guidewire", "Introducer sheath", "Contrast medium"],
      usage: "Used for percutaneous coronary and peripheral angioplasty to restore vessel patency",
      specifications: "Various diameters and lengths, rated burst pressure, radiopaque markers, rapid exchange or over-the-wire",
      image: trocarImage,
      setupTips: ["Select appropriate size", "Prep inflation device", "Check balloon integrity", "Use appropriate pressure", "Monitor fluoroscopy"]
    },
    "Cardiac ablation catheters": {
      name: "Radiofrequency Ablation System",
      category: "Electrophysiology",
      description: "Catheter system for cardiac arrhythmia ablation using radiofrequency energy",
      contents: ["Ablation catheter", "RF generator", "Mapping system", "Temperature probe", "Irrigated tip option"],
      usage: "Essential for treating cardiac arrhythmias through targeted tissue ablation of abnormal conduction pathways",
      specifications: "4mm or 8mm tip, irrigated or non-irrigated, force sensing, contact monitoring, temperature controlled",
      image: electrocauteryImage,
      setupTips: ["Test catheter function", "Set power parameters", "Monitor tissue contact", "Check irrigation if applicable", "Verify mapping integration"]
    },
    "Electrophysiology mapping system": {
      name: "3D Cardiac Mapping System",
      category: "Cardiac Electrophysiology",
      description: "Advanced system for 3D electroanatomic mapping during electrophysiology procedures",
      contents: ["Mapping catheters", "Computer workstation", "Recording system", "Stimulation device", "3D reconstruction software"],
      usage: "Used for precise mapping of cardiac electrical activity to guide ablation of arrhythmogenic substrates",
      specifications: "High-density mapping, 3D visualization, real-time integration, activation and voltage mapping capabilities",
      image: harmonicScalpelImage,
      setupTips: ["Calibrate system", "Position reference catheter", "Create geometry map", "Verify catheter signals", "Document baseline rhythm"]
    },
    "IABP (Intra-aortic Balloon Pump)": {
      name: "Intra-aortic Balloon Counterpulsation Device",
      category: "Mechanical Circulatory Support",
      description: "Mechanical circulatory support device using balloon inflation/deflation synchronized with cardiac cycle",
      contents: ["IABP catheter", "Console", "ECG cables", "Pressure transducer", "Insertion kit", "Helium tank"],
      usage: "Essential for temporary hemodynamic support in cardiogenic shock, high-risk PCI, or perioperative cardiac support",
      specifications: "Various balloon sizes, ECG or pressure-triggered, adjustable augmentation ratios, fiber-optic pressure monitoring",
      image: harmonicScalpelImage,
      setupTips: ["Position correctly in aorta", "Verify timing on console", "Monitor augmentation", "Check helium supply", "Assess hemodynamic response"]
    },
    "ECMO circuit": {
      name: "Extracorporeal Membrane Oxygenation System",
      category: "Advanced Life Support",
      description: "Complete circuit for extracorporeal life support providing cardiac and/or respiratory support",
      contents: ["Membrane oxygenator", "Centrifugal pump", "Cannulae", "Tubing circuit", "Heat exchanger", "Blood gas monitor"],
      usage: "Critical for severe cardiopulmonary failure providing temporary mechanical support for heart and/or lung function",
      specifications: "VA or VV configuration, flow rates up to 7L/min, integrated monitoring, biocompatible surfaces, minimal priming volume",
      image: harmonicScalpelImage,
      setupTips: ["Prime circuit completely", "De-air thoroughly", "Check all connections", "Verify pump function", "Monitor ACT closely"]
    },
    "Left ventricular assist device (LVAD)": {
      name: "Mechanical Ventricular Support System",
      category: "Mechanical Circulatory Support",
      description: "Implantable pump for long-term mechanical support of failing left ventricle",
      contents: ["LVAD pump", "Inflow cannula", "Outflow graft", "Driveline", "Controller", "Power source"],
      usage: "Used as bridge to transplant, destination therapy, or bridge to recovery in end-stage heart failure",
      specifications: "Continuous flow design, flow rates 3-10 L/min, portable controllers, alarm systems, battery backup",
      image: harmonicScalpelImage,
      setupTips: ["Handle pump carefully", "De-air completely", "Secure all connections", "Test controller", "Position driveline appropriately"]
    },
    // NEUROSURGERY INSTRUMENTS - BATCH 5
    "Cranial drill": {
      name: "Neurosurgical Cranial Drill System",
      category: "Neurosurgical Power Tools",
      description: "High-speed drill system for cranial bone work during neurosurgical procedures",
      contents: ["Drill console", "Handpiece", "Various drill bits", "Burr attachments", "Perforator", "Craniotome"],
      usage: "Essential for creating burr holes, craniotomy bone flaps, and precise bone removal in neurosurgery",
      specifications: "Variable speed 0-80,000 RPM, irrigation capability, autoclavable handpiece, torque control, ergonomic design",
      image: electrocauteryImage,
      setupTips: ["Test drill function", "Have multiple bits ready", "Check irrigation", "Verify foot pedal", "Prepare backup handpiece"]
    },
    "Burr holes": {
      name: "Cranial Burr Hole Instruments",
      category: "Cranial Access",
      description: "Specialized instruments for creating burr holes in the skull for neurosurgical access",
      contents: ["Hudson brace", "Burr drill bits", "Perforator", "Templates", "Measuring guides"],
      usage: "Used for creating precise openings in skull for ICP monitoring, EVD placement, or craniotomy access",
      specifications: "Various bit sizes, depth guards, self-centering tips, manual and powered options",
      image: electrocauteryImage,
      setupTips: ["Mark placement carefully", "Use depth guard", "Irrigate while drilling", "Check dura integrity", "Have hemostatic agents ready"]
    },
    "Craniotomy instruments": {
      name: "Craniotomy Surgical Set",
      category: "Cranial Surgery",
      description: "Complete instrument set for craniotomy procedures and bone flap creation",
      contents: ["Craniotome", "Drill system", "Dural elevators", "Bone rongeurs", "Bone wax", "Cranial plates and screws"],
      usage: "Essential for opening skull, accessing brain, and secure bone flap replacement in cranial surgery",
      specifications: "Precision cutting tools, self-stopping craniotome, sterile implants, various fixation options",
      image: electrocauteryImage,
      setupTips: ["Plan bone flap carefully", "Protect dura", "Save bone dust", "Mark bone orientation", "Have fixation ready"]
    },
    "Bipolar forceps": {
      name: "Neurosurgical Bipolar Coagulation",
      category: "Hemostasis",
      description: "Precision bipolar forceps for delicate neurosurgical hemostasis",
      contents: ["Bipolar forceps (various sizes)", "Bipolar cord", "Foot pedal", "Irrigation system", "Jeweler forceps"],
      usage: "Critical for precise hemostasis in neurosurgery without current spread to surrounding neural tissue",
      specifications: "Bayonet and straight configurations, jeweler tips, irrigation capability, various sizes 0.5-3mm",
      image: electrocauteryImage,
      setupTips: ["Test before use", "Use lowest effective power", "Keep tips clean", "Irrigate frequently", "Have multiple sizes available"]
    },
    "Neurosurgical microscope": {
      name: "Neurosurgical Operating Microscope",
      category: "Magnification System",
      description: "High-magnification surgical microscope for microsurgical neurosurgical procedures",
      contents: ["Microscope", "Various objectives", "Light source", "Assistant scope", "Recording system", "Foot controls"],
      usage: "Essential for microneurosurgery providing magnification and illumination for delicate neural procedures",
      specifications: "Up to 40x magnification, LED illumination, HD recording, motorized focus and zoom, balanced articulating arm",
      image: laparoscopicSetImage,
      setupTips: ["Balance and position early", "Check light intensity", "Test foot controls", "Adjust for surgeon", "Verify assistant scope"]
    },
    "Neuromicrosurgical instruments": {
      name: "Neuromicrosurgery Instrument Set",
      category: "Microsurgery Tools",
      description: "Ultra-fine instruments for microsurgical neurosurgical procedures under magnification",
      contents: ["Microforceps", "Microscissors", "Microdissectors", "Nerve hooks", "Micro-needle holders", "Micro-suction tips"],
      usage: "Used for delicate manipulation of neural tissue, vessels, and nerves during microsurgery",
      specifications: "Precision-machined tips, various angulations, spring handles, titanium or stainless steel, 0.3-1mm tips",
      image: grasperImage,
      setupTips: ["Handle with extreme care", "Check tip alignment", "Organize by size", "Keep tips protected", "Have duplicates available"]
    },
    "CUSA (ultrasonic aspirator)": {
      name: "Cavitron Ultrasonic Surgical Aspirator (CUSA)",
      category: "Tissue Removal",
      description: "Ultrasonic device for selective tissue fragmentation and aspiration in neurosurgery",
      contents: ["CUSA handpiece", "Console", "Various tips", "Irrigation system", "Foot pedal", "Aspiration tubing"],
      usage: "Essential for tumor debulking and tissue removal while preserving vital neurovascular structures",
      specifications: "Ultrasonic frequency 23-36 kHz, adjustable power and suction, precision tip options, integrated irrigation",
      image: harmonicScalpelImage,
      setupTips: ["Prime irrigation system", "Select appropriate tip", "Test power settings", "Check aspiration", "Have backup tips"]
    },
    "Neuronavigation system": {
      name: "Stereotactic Navigation System",
      category: "Surgical Navigation",
      description: "Computer-assisted navigation for precise localization during neurosurgical procedures",
      contents: ["Navigation workstation", "Tracking cameras", "Registration instruments", "Reference array", "Pointer probe"],
      usage: "Provides real-time 3D guidance for precise tumor localization and trajectory planning in brain surgery",
      specifications: "Sub-millimeter accuracy, MRI/CT integration, real-time updates, instrument tracking, multimodality fusion",
      image: harmonicScalpelImage,
      setupTips: ["Register patient early", "Verify accuracy", "Check camera positioning", "Calibrate instruments", "Update for brain shift"]
    },
    "Neurosurgical brain retractors": {
      name: "Neurosurgical Brain Retraction System",
      category: "Neural Retraction",
      description: "Specialized retractors for gentle brain tissue retraction during neurosurgery",
      contents: ["Self-retaining brain retractors", "Spatulas", "Cottonoids", "Retractor arms", "Greenberg system"],
      usage: "Used for atraumatic brain retraction providing surgical corridor while minimizing neural injury",
      specifications: "Multiple sizes and shapes, self-retaining options, adjustable arms, smooth surfaces, minimal pressure",
      image: grasperImage,
      setupTips: ["Use cottonoids for protection", "Apply gradually", "Minimize retraction time", "Adjust as needed", "Monitor brain relaxation"]
    },
    "Aneurysm clips": {
      name: "Neurovascular Clip Appliers",
      category: "Vascular Occlusion",
      description: "Specialized clips and appliers for cerebral aneurysm clipping",
      contents: ["Various clip sizes", "Temporary clips", "Permanent clips", "Clip appliers", "Clip removers"],
      usage: "Critical for definitive aneurysm treatment by occluding aneurysm neck while preserving parent vessel",
      specifications: "Titanium construction, MRI compatible, various configurations (straight, curved, fenestrated), closing pressures",
      image: grasperImage,
      setupTips: ["Have multiple clip options", "Test appliers", "Prepare temporary clips", "Check closing force", "Have clip remover ready"]
    },
    "Spinal instrumentation": {
      name: "Spinal Fixation System",
      category: "Spinal Surgery",
      description: "Complete hardware system for spinal stabilization and fusion procedures",
      contents: ["Pedicle screws", "Rods", "Connectors", "Bone graft materials", "Insertion instruments", "Rod benders"],
      usage: "Essential for spinal fusion, deformity correction, and stabilization of spinal injuries",
      specifications: "Titanium or stainless steel, various screw diameters and lengths, polyaxial heads, top-loading or side-loading",
      image: electrocauteryImage,
      setupTips: ["Verify correct levels", "Have multiple screw sizes", "Test rod bender", "Prepare bone graft", "Check screw placement"]
    },
    "Laminectomy instruments": {
      name: "Spinal Decompression Instrument Set",
      category: "Spinal Decompression",
      description: "Specialized instruments for laminectomy and spinal decompression procedures",
      contents: ["Kerrison rongeurs", "Laminectomy rongeurs", "Curettes", "Nerve root retractors", "Pituitary rongeurs"],
      usage: "Used for removing lamina and decompressing neural elements in spinal stenosis and disc herniation",
      specifications: "Various rongeur sizes (1mm-5mm), angled and straight, sharp cutting edges, protective footplates",
      image: grasperImage,
      setupTips: ["Have full range of sizes", "Check cutting edges", "Use sequential sizing", "Protect neural structures", "Have nerve retractors ready"]
    },
    "Neuroendoscope": {
      name: "Neurosurgical Endoscope System",
      category: "Minimally Invasive Neuro",
      description: "Rigid endoscope system for minimally invasive neurosurgical procedures",
      contents: ["Rigid endoscope", "Camera system", "Light source", "Working channels", "Irrigation system", "Various angles"],
      usage: "Essential for minimally invasive procedures including third ventriculostomy and skull base approaches",
      specifications: "0° to 70° viewing angles, HD imaging, integrated working channel, 2.7-4mm diameter, autoclavable",
      image: laparoscopicSetImage,
      setupTips: ["Test camera function", "Check irrigation", "Have multiple angles", "Verify working channel", "Ensure clear visualization"]
    },
    "Stereotactic frame": {
      name: "Stereotactic Localization Frame",
      category: "Stereotactic Surgery",
      description: "Precision frame for stereotactic localization and biopsy procedures",
      contents: ["Stereotactic frame", "Arc system", "Localizing rods", "Biopsy instruments", "Fixation pins"],
      usage: "Provides precise 3D localization for deep brain biopsies, electrode placement, and functional neurosurgery",
      specifications: "Sub-millimeter accuracy, MRI/CT compatible, multiple trajectory options, secure skull fixation",
      image: harmonicScalpelImage,
      setupTips: ["Apply frame carefully", "Verify imaging alignment", "Calculate coordinates accurately", "Check trajectory", "Have backup plan"]
    },
    "Ventricular catheter": {
      name: "External Ventricular Drain System",
      category: "CSF Drainage",
      description: "Catheter system for temporary ventricular drainage and ICP monitoring",
      contents: ["Ventricular catheter", "Drainage system", "Pressure transducer", "Collection bag", "Tunneling device"],
      usage: "Critical for CSF drainage, ICP monitoring, and management of hydrocephalus or intracranial hemorrhage",
      specifications: "Radiopaque catheter, graduated markings, antimicrobial coating options, pressure monitoring capability",
      image: trocarImage,
      setupTips: ["Place at appropriate trajectory", "Tunnel subcutaneously", "Level transducer correctly", "Secure connections", "Set drainage height"]
    },
    // OB/GYN INSTRUMENTS - BATCH 6
    "Obstetric forceps": {
      name: "Assisted Delivery Forceps",
      category: "Obstetric Delivery",
      description: "Specialized forceps for assisted vaginal delivery in obstetrics",
      contents: ["Simpson forceps", "Elliot forceps", "Piper forceps", "Kielland forceps", "Tucker-McLane forceps"],
      usage: "Used for assisted vaginal delivery when maternal effort alone is insufficient or fetal distress occurs",
      specifications: "Various blade designs, cephalic and pelvic curves, articulated shanks, autoclavable stainless steel",
      image: grasperImage,
      setupTips: ["Check articulation", "Know rotation capabilities", "Verify appropriate type", "Have multiple options", "Know application landmarks"]
    },
    "Vacuum extractor": {
      name: "Obstetric Vacuum Assisted Delivery System",
      category: "Assisted Delivery",
      description: "Vacuum device for assisted vaginal delivery using negative pressure",
      contents: ["Vacuum cup", "Suction pump", "Tubing", "Pressure gauge", "Various cup sizes"],
      usage: "Alternative to forceps for assisted delivery using controlled vacuum suction on fetal scalp",
      specifications: "Silicone or metal cups, pressure range 0.2-0.8 kg/cm², various cup sizes, manual or electric pump",
      image: harmonicScalpelImage,
      setupTips: ["Test vacuum pressure", "Select appropriate cup", "Check seal", "Limit application time", "Monitor cup placement"]
    },
    "Cesarean section instruments": {
      name: "C-Section Surgical Set",
      category: "Obstetric Surgery",
      description: "Complete instrument set for cesarean delivery procedures",
      contents: ["Scalpel handles", "Bandage scissors", "Bladder blade", "Richardson retractors", "Russian forceps", "Ring forceps"],
      usage: "Essential for surgical delivery via cesarean section including uterine incision and repair",
      specifications: "Large retractors, long instruments, atraumatic tissue handling, dedicated bladder protection",
      image: grasperImage,
      setupTips: ["Have bladder blade ready", "Prepare uterine incision instruments", "Ready closing instruments", "Organize systematically", "Have extra sponges"]
    },
    "Uterine curettes": {
      name: "Endometrial Curettage Instruments",
      category: "Gynecologic Curettage",
      description: "Specialized curettes for endometrial sampling and D&C procedures",
      contents: ["Sharp curettes", "Suction curettes", "Various sizes", "Endometrial biopsy pipelle", "Tenaculum"],
      usage: "Used for diagnostic endometrial sampling, D&C procedures, and retained products removal",
      specifications: "Various sizes and configurations, sharp and blunt options, disposable and reusable, flexible and rigid",
      image: grasperImage,
      setupTips: ["Sound uterus first", "Start with smaller curette", "Use systematic technique", "Have suction ready", "Check specimen adequacy"]
    },
    "Hysteroscopy system": {
      name: "Uterine Endoscopy System",
      category: "Gynecologic Endoscopy",
      description: "Endoscopic system for visualization and treatment of intrauterine pathology",
      contents: ["Hysteroscope", "Camera system", "Light source", "Distention media", "Working instruments", "Resectoscope loop"],
      usage: "Essential for diagnostic hysteroscopy, polypectomy, myomectomy, and endometrial ablation",
      specifications: "Diagnostic (3-5mm) and operative (7-9mm) diameters, 0° and 30° viewing angles, integrated channels",
      image: laparoscopicSetImage,
      setupTips: ["Check distention system", "Test optics", "Prepare working instruments", "Monitor fluid balance", "Have graspers ready"]
    },
    "Colposcope": {
      name: "Cervical Magnification System",
      category: "Gynecologic Examination",
      description: "Binocular microscope for detailed cervical examination and biopsy guidance",
      contents: ["Colposcope", "Light source", "Green filter", "Camera system", "Various magnifications", "Digital recording"],
      usage: "Used for detailed cervical examination, abnormal Pap follow-up, and directed biopsy of suspicious lesions",
      specifications: "5-40x magnification, LED illumination, green filter for vascular patterns, digital documentation, mobile base",
      image: laparoscopicSetImage,
      setupTips: ["Position properly", "Clean optics", "Test light source", "Apply acetic acid", "Have biopsy instruments ready"]
    },
    // OPHTHALMOLOGY INSTRUMENTS - BATCH 7
    "Phaco system (cataract)": {
      name: "Ultrasonic Cataract Removal System",
      category: "Cataract Surgery",
      description: "Ultrasonic device for cataract fragmentation and removal during phacoemulsification",
      contents: ["Phaco handpiece", "Console", "Irrigation/aspiration tips", "Foot pedal", "Tubing sets", "BSS solution"],
      usage: "Essential for modern cataract surgery using ultrasonic energy to emulsify and aspirate lens material",
      specifications: "Ultrasonic frequency 40kHz, adjustable power and vacuum, torsional and longitudinal modes, fluidic control",
      image: harmonicScalpelImage,
      setupTips: ["Prime tubing completely", "Test handpiece", "Set fluidics parameters", "Check foot pedal", "Have backup tips"]
    },
    "Intraocular lens (IOL)": {
      name: "Artificial Lens Implant",
      category: "Lens Implants",
      description: "Synthetic lens for implantation following cataract extraction",
      contents: ["IOL implant", "Inserter", "Viscoelastic", "Various powers", "Toric and multifocal options"],
      usage: "Replaces natural lens following cataract removal, restoring visual function with precise refractive correction",
      specifications: "Acrylic or silicone material, foldable design, various dioptric powers, UV protection, blue light filtering",
      image: grasperImage,
      setupTips: ["Verify correct power", "Load carefully", "Use viscoelastic", "Insert smoothly", "Position precisely in capsular bag"]
    },
    "Vitrectomy instruments": {
      name: "Vitreoretinal Surgery System",
      category: "Retinal Surgery",
      description: "Complete system for vitreous removal and retinal surgery",
      contents: ["Vitrector", "Console", "Endoillumination", "Laser probe", "Fluid management", "Various gauge instruments"],
      usage: "Essential for treating retinal detachment, macular holes, vitreous hemorrhage, and diabetic retinopathy",
      specifications: "23G, 25G, or 27G systems, high-speed cutting (up to 10,000 cpm), integrated laser, chandelier lighting",
      image: harmonicScalpelImage,
      setupTips: ["Prime fluidics system", "Test vitrector function", "Check illumination", "Prepare laser", "Verify IOP settings"]
    },
    "Slit lamp": {
      name: "Biomicroscope Examination System",
      category: "Ophthalmic Examination",
      description: "Binocular microscope with slit beam for detailed anterior segment examination",
      contents: ["Slit lamp", "Various magnifications", "Light source", "Tonometer", "Photo documentation", "Laser attachment capability"],
      usage: "Standard for detailed examination of anterior and posterior eye segments, cornea, lens, and retina assessment",
      specifications: "6-40x magnification, adjustable slit width and height, blue cobalt filter, red-free filter, digital imaging",
      image: laparoscopicSetImage,
      setupTips: ["Adjust patient position", "Set appropriate magnification", "Use proper illumination", "Document findings", "Have diagnostic drops ready"]
    },
    "Keratome": {
      name: "Corneal Incision Blade",
      category: "Ophthalmic Blades",
      description: "Precision blade for creating corneal incisions in cataract and refractive surgery",
      contents: ["Various width keratomes", "Angled blades", "Single-use disposable", "Sideport blades"],
      usage: "Creates precise self-sealing corneal incisions for phacoemulsification and IOL implantation",
      specifications: "1.8mm to 3.2mm widths, various blade angles, diamond or steel, disposable, ultra-sharp edges",
      image: grasperImage,
      setupTips: ["Select appropriate size", "Check blade sharpness", "Create proper architecture", "Ensure single-plane incision", "Verify water-tight seal"]
    },
    // ENT INSTRUMENTS - BATCH 8  
    "Microscope (ENT)": {
      name: "Surgical Operating Microscope for ENT",
      category: "ENT Magnification",
      description: "Specialized microscope for otologic and laryngeal microsurgery",
      contents: ["Operating microscope", "Various objectives", "Integrated laser", "Video system", "Foot controls", "Assistant scope"],
      usage: "Essential for ear surgery, vocal cord procedures, and microlaryngeal surgery requiring high magnification",
      specifications: "Up to 25x magnification, 400mm focal length, motorized focus, integrated laser port, HD video",
      image: laparoscopicSetImage,
      setupTips: ["Position and balance early", "Check optics", "Test laser if needed", "Verify foot controls", "Adjust for ear or larynx"]
    },
    "Otoscope": {
      name: "Ear Examination Instrument",
      category: "Diagnostic Otology",
      description: "Handheld device for examining the external auditory canal and tympanic membrane",
      contents: ["Otoscope head", "Light source", "Various specula", "Insufflator attachment", "Magnification lens"],
      usage: "Standard tool for examining ear canal, tympanic membrane, and assessing middle ear pathology",
      specifications: "Halogen or LED light, fiber optic or direct illumination, pneumatic attachment, disposable specula",
      image: laparoscopicSetImage,
      setupTips: ["Select appropriate speculum", "Check light function", "Examine systematically", "Test pneumatic function", "Clean between uses"]
    },
    "Endoscope (Sinus/Nasal)": {
      name: "Rigid Sinus Endoscopy System",
      category: "Sinonasal Endoscopy",
      description: "Rigid endoscope system for sinus surgery and nasal examination",
      contents: ["0° endoscope", "30° endoscope", "45° and 70° scopes", "Camera system", "Light source", "Irrigation"],
      usage: "Essential for functional endoscopic sinus surgery (FESS), diagnosis and treatment of sinus disease",
      specifications: "2.7mm and 4mm diameter, various viewing angles, HD imaging, integrated irrigation, autoclavable",
      image: laparoscopicSetImage,
      setupTips: ["Have multiple angles ready", "Test camera function", "Check irrigation", "Clean lens frequently", "Use defogging solution"]
    },
    "Microdebrider": {
      name: "Powered Sinus Microdebrider",
      category: "ENT Power Tools",
      description: "Powered instrument for precise tissue removal during sinus surgery",
      contents: ["Microdebrider console", "Handpiece", "Various blade types", "Foot pedal", "Irrigation system"],
      usage: "Used for polyp removal, turbinate reduction, and tissue debridement in endoscopic sinus surgery",
      specifications: "Oscillating or rotating blades, variable speed 0-6000 RPM, forward/reverse function, integrated suction",
      image: electrocauteryImage,
      setupTips: ["Select appropriate blade", "Test function", "Set proper speed", "Use controlled passes", "Have irrigation ready"]
    },
    "Tonsil instruments": {
      name: "Tonsillectomy Instrument Set",
      category: "Oropharyngeal Surgery",
      description: "Specialized instruments for tonsillectomy and adenoidectomy procedures",
      contents: ["Mouth gag", "Tonsil snare", "Electrocautery", "Hemostatic clamps", "Suction tips", "Sponge holders"],
      usage: "Complete set for tonsil and adenoid removal using dissection, snare, or electrocautery techniques",
      specifications: "Self-retaining mouth gag, various snare sizes, long instruments for posterior access, pediatric and adult sizes",
      image: grasperImage,
      setupTips: ["Position mouth gag carefully", "Have hemostasis ready", "Prepare suction", "Use proper retraction", "Have tie materials ready"]
    },
    // UROLOGY & ADDITIONAL SPECIALTY INSTRUMENTS - BATCH 9
    "Bladder neck suspension instruments": {
      name: "Urinary Incontinence Repair Set",
      category: "Urogynecology",
      description: "Specialized instruments for bladder neck suspension and sling procedures",
      contents: ["Sling passer", "Mesh material", "Tensioning device", "Cystoscope", "Trocar needles"],
      usage: "Used for surgical treatment of stress urinary incontinence through bladder neck support",
      specifications: "Various sling materials, minimally invasive passers, adjustable tension, biocompatible mesh",
      image: trocarImage,
      setupTips: ["Verify sling type", "Test passers", "Have cystoscope ready", "Check tension device", "Prepare mesh carefully"]
    },
    "Laser (Holmium/Thulium)": {
      name: "Surgical Laser Systems for Urology",
      category: "Urologic Lasers",
      description: "High-powered laser systems for stone fragmentation and tissue ablation",
      contents: ["Laser console", "Fiber delivery system", "Foot pedal", "Safety glasses", "Various power settings"],
      usage: "Essential for laser lithotripsy, BPH treatment, and soft tissue ablation in urology",
      specifications: "Holmium:YAG 2100nm or Thulium 1940nm, adjustable energy 0.2-3.0J, pulse rates up to 80Hz",
      image: electrocauteryImage,
      setupTips: ["Test laser before draping", "Check fiber integrity", "Set appropriate energy", "Verify safety protocols", "Have backup fiber"]
    },
    "Lithotripsy equipment": {
      name: "Extracorporeal Shock Wave Lithotripsy (ESWL)",
      category: "Stone Treatment",
      description: "Non-invasive shock wave system for kidney and ureteral stone fragmentation",
      contents: ["ESWL machine", "Shock wave generator", "Imaging guidance", "Water cushion", "Patient positioning"],
      usage: "Used for non-invasive treatment of renal and ureteral calculi through focused shock waves",
      specifications: "Electromagnetic or electrohydraulic generation, fluoroscopy or ultrasound guidance, 2000-4000 shocks per session",
      image: harmonicScalpelImage,
      setupTips: ["Position patient precisely", "Couple shock head properly", "Set energy levels", "Monitor stone targeting", "Track shock count"]
    },
    "Nephroscope": {
      name: "Percutaneous Nephrolithotomy Scope",
      category: "Percutaneous Urology",
      description: "Large-bore endoscope for percutaneous kidney stone removal",
      contents: ["Rigid nephroscope", "Access sheath", "Stone extraction forceps", "Lithotripsy device", "Irrigation system"],
      usage: "Essential for percutaneous nephrolithotomy (PCNL) treating large renal calculi",
      specifications: "24-30Fr diameter, various offset optics, integrated working channel, high-flow irrigation",
      image: laparoscopicSetImage,
      setupTips: ["Establish tract carefully", "Test optics", "Have stone forceps ready", "Check irrigation flow", "Prepare lithotripsy"]
    },
    "Stone baskets and graspers": {
      name: "Ureteroscopic Stone Retrieval Devices",
      category: "Stone Extraction",
      description: "Specialized instruments for capturing and removing urinary stones",
      contents: ["Nitinol stone baskets", "Dormia basket", "Stone graspers", "Retrieval forceps", "Tipless baskets"],
      usage: "Used during ureteroscopy for capturing and extracting stones from kidney and ureter",
      specifications: "Various basket designs, nitinol wire, tipless options, 2.2-3.0Fr compatibility, helical and flat configurations",
      image: grasperImage,
      setupTips: ["Select appropriate size", "Deploy basket carefully", "Avoid impaction", "Use gentle extraction", "Have multiple types ready"]
    },
    // BARIATRIC SURGERY INSTRUMENTS
    "Gastric stapler": {
      name: "Bariatric Surgical Stapling System",
      category: "Bariatric Stapling",
      description: "Specialized stapling devices for gastric bypass and sleeve gastrectomy",
      contents: ["Linear stapler", "Articulating head", "Various cartridge lengths", "Tissue thickness settings", "Buttressing material"],
      usage: "Essential for creating gastric pouch, sleeve formation, and intestinal anastomosis in bariatric surgery",
      specifications: "Articulating or non-articulating, 60mm or 75mm length, various staple heights, reinforcement options",
      image: harmonicScalpelImage,
      setupTips: ["Select appropriate cartridge", "Check tissue thickness", "Use reinforcement if needed", "Fire smoothly", "Inspect staple line"]
    },
    "Liver retractors": {
      name: "Hepatic Retraction System",
      category: "Abdominal Retraction",
      description: "Specialized retractors for liver mobilization during bariatric and upper GI surgery",
      contents: ["Nathanson retractor", "Self-retaining liver retractor", "Table-mounted systems", "Various blade sizes"],
      usage: "Used for retracting liver to expose gastroesophageal junction during bariatric and foregut surgery",
      specifications: "Self-retaining design, atraumatic blade, table or body wall mounted, adjustable positioning",
      image: grasperImage,
      setupTips: ["Position carefully", "Avoid excessive pressure", "Secure mounting", "Check liver perfusion", "Adjust as needed"]
    },
    // TRANSPLANT SURGERY INSTRUMENTS
    "Vascular anastomosis instruments": {
      name: "Microvascular Anastomosis Set",
      category: "Vascular Surgery",
      description: "Precision instruments for vascular anastomosis in transplant and reconstructive surgery",
      contents: ["Microvascular forceps", "Scissors", "Clamps", "Needle holders", "Vessel dilators", "Background material"],
      usage: "Essential for precise vascular anastomosis during organ transplantation and microsurgery",
      specifications: "Ultra-fine tips, various angulations, atraumatic jaws, spring-loaded handles, jeweler precision",
      image: grasperImage,
      setupTips: ["Handle delicately", "Organize systematically", "Keep tips protected", "Have multiple sizes", "Use proper lighting"]
    },
    "Perfusion cannulas": {
      name: "Organ Preservation Cannulation System",
      category: "Transplant Perfusion",
      description: "Specialized cannulas for organ preservation and perfusion during transplantation",
      contents: ["Various arterial cannulas", "Portal cannulas", "Perfusion tubing", "Connectors", "Securing devices"],
      usage: "Used for establishing perfusion circuits during organ procurement and preservation",
      specifications: "Multiple sizes, atraumatic tips, secure connections, sterile packaging, biocompatible materials",
      image: trocarImage,
      setupTips: ["Select appropriate size", "Secure cannulation", "Check flow", "Verify connections", "Monitor perfusion pressure"]
    },
    // COLORECTAL SURGERY INSTRUMENTS
    "Circular stapler (EEA)": {
      name: "End-to-End Anastomosis Circular Stapler",
      category: "Colorectal Stapling",
      description: "Circular stapling device for creating end-to-end or end-to-side anastomosis",
      contents: ["Circular stapler", "Various diameter sizes", "Trocar anvil", "Sizing rings", "Single-use disposable"],
      usage: "Essential for creating intestinal anastomosis in colorectal surgery, particularly after anterior resection",
      specifications: "21-33mm diameter options, adjustable anvil gap, tissue compression indicator, integrated blade",
      image: harmonicScalpelImage,
      setupTips: ["Size anastomosis carefully", "Check tissue compression", "Fire slowly", "Inspect donuts", "Test anastomosis integrity"]
    },
    "Hemorrhoid instruments": {
      name: "Hemorrhoidectomy Surgical Set",
      category: "Anorectal Surgery",
      description: "Specialized instruments for surgical treatment of hemorrhoids",
      contents: ["Anoscope", "Hemorrhoid ligator", "Ferguson retractor", "Pratt speculum", "Fansler retractor"],
      usage: "Used for various hemorrhoid procedures including banding, excision, and stapled hemorrhoidopexy",
      specifications: "Illuminated anoscopes, various retractor sizes, ligating devices, specialized forceps",
      image: grasperImage,
      setupTips: ["Position patient properly", "Use adequate illumination", "Have banding device ready", "Multiple retractor sizes", "Ensure hemostasis"]
    },
    "Rectal retractors": {
      name: "Anorectal Exposure System",
      category: "Rectal Surgery",
      description: "Specialized retractors for anorectal surgical procedures",
      contents: ["Lone Star retractor", "Hill-Ferguson retractor", "Parks retractor", "Fansler retractor", "Pratt anal speculum"],
      usage: "Provides optimal exposure for hemorrhoidectomy, fistulotomy, and anorectal procedures",
      specifications: "Self-retaining options, various blade configurations, 360-degree exposure capability, illumination options",
      image: grasperImage,
      setupTips: ["Choose appropriate type", "Position for optimal exposure", "Use gentle retraction", "Ensure patient comfort", "Have multiple sizes"]
    },
    // PLASTIC/RECONSTRUCTIVE SURGERY INSTRUMENTS
    "Skin grafting instruments": {
      name: "Split-Thickness Skin Graft Set",
      category: "Reconstructive Surgery",
      description: "Complete instrument set for harvesting and placing skin grafts",
      contents: ["Dermatome", "Skin graft mesher", "Graft carrier", "Mineral oil", "Compression bolster materials"],
      usage: "Essential for harvesting split-thickness skin grafts and preparing them for wound coverage",
      specifications: "Adjustable dermatome thickness settings, various mesh ratios (1:1.5, 1:3), electric or manual options",
      image: grasperImage,
      setupTips: ["Set appropriate thickness", "Lubricate skin", "Use smooth technique", "Mesh if needed", "Protect donor site"]
    },
    "Dermatome": {
      name: "Powered Skin Graft Harvester",
      category: "Graft Harvesting",
      description: "Motorized device for harvesting uniform split-thickness skin grafts",
      contents: ["Dermatome handpiece", "Battery or electric power", "Various blade widths", "Depth guards", "Lubricating oil"],
      usage: "Used for precise harvesting of split-thickness skin grafts for burn and wound reconstruction",
      specifications: "Adjustable depth 0.008-0.040 inches, blade widths 2-4 inches, oscillating or rotary, battery or AC powered",
      image: electrocauteryImage,
      setupTips: ["Check blade sharpness", "Set correct depth", "Lubricate skin well", "Use even pressure", "Maintain angle"]
    },
    "Tissue expanders": {
      name: "Soft Tissue Expansion System",
      category: "Tissue Expansion",
      description: "Inflatable devices for gradual soft tissue expansion in reconstruction",
      contents: ["Tissue expander", "Fill valve", "Inflation port", "Saline for filling", "Various shapes and sizes"],
      usage: "Used for creating additional tissue for breast reconstruction, scalp coverage, and other reconstructive needs",
      specifications: "Various volumes 50-800cc, textured or smooth, integrated or remote ports, anatomical shapes",
      image: grasperImage,
      setupTips: ["Create proper pocket", "Position fill port", "Initial fill appropriately", "Mark expansion schedule", "Monitor for complications"]
    },
    // VASCULAR SURGERY INSTRUMENTS
    "Doppler ultrasound": {
      name: "Intraoperative Vascular Doppler",
      category: "Vascular Assessment",
      description: "Handheld ultrasound for intraoperative vascular flow assessment",
      contents: ["Doppler probe", "Audio unit", "Sterile probe covers", "Gel", "Various frequency probes"],
      usage: "Essential for confirming vascular patency and detecting flow during vascular and transplant surgery",
      specifications: "8-10 MHz frequency, sterile probe options, audio and visual output, continuous or pulsed wave",
      image: harmonicScalpelImage,
      setupTips: ["Use sterile probe cover", "Apply gel liberally", "Check all vessels", "Verify flow signals", "Document findings"]
    },
    "Embolectomy catheters": {
      name: "Fogarty Balloon Embolectomy System",
      category: "Thrombectomy",
      description: "Balloon-tipped catheters for removing arterial emboli and thrombus",
      contents: ["Various sized Fogarty catheters", "Inflation syringe", "Heparinized saline", "Vessel loops"],
      usage: "Used for emergency thromboembolectomy removing acute arterial occlusions",
      specifications: "2Fr to 7Fr sizes, latex or silicone balloons, various balloon volumes, over-the-wire capable",
      image: trocarImage,
      setupTips: ["Select appropriate size", "Test balloon", "Use gentle technique", "Heparinize beforehand", "Multiple passes if needed"]
    },
    "Shunt tubing": {
      name: "Temporary Vascular Shunt System",
      category: "Vascular Temporary Bypass",
      description: "Sterile tubing for temporary vascular bypass during trauma or complex vascular surgery",
      contents: ["Argyle or Javid shunt", "Various diameters", "Clamps", "Heparinized solution", "Securing devices"],
      usage: "Provides temporary perfusion during vascular repair in trauma or carotid surgery",
      specifications: "4-16mm diameters, heparin-bonded options, radiopaque markers, secure connection design",
      image: trocarImage,
      setupTips: ["Size vessel appropriately", "Heparinize shunt", "Secure proximally first", "Verify flow", "Monitor for displacement"]
    },
    // FINAL BATCH - CRITICAL MISCELLANEOUS INSTRUMENTS
    "Argon beam coagulator": {
      name: "Argon Plasma Coagulation System",
      category: "Hemostasis Device",
      description: "Non-contact thermal coagulation device using ionized argon gas for surface hemostasis",
      contents: ["Argon console", "Handpiece", "Argon gas tank", "Various probes", "Foot pedal control"],
      usage: "Provides superficial tissue coagulation for liver resection, spleen trauma, and diffuse oozing",
      specifications: "Adjustable power 30-90W, gas flow control, non-contact application, smoke evacuation capability",
      image: electrocauteryImage,
      setupTips: ["Check argon supply", "Set appropriate power", "Maintain proper distance", "Use sweeping motion", "Ensure smoke evacuation"]
    },
    "Bone cement mixing system": {
      name: "Polymethylmethacrylate (PMMA) Cement Mixer",
      category: "Orthopedic Cement",
      description: "Vacuum mixing system for preparing bone cement with reduced porosity",
      contents: ["Vacuum mixer", "Cement cartridges", "Delivery gun", "Mixing tips", "Cement restrictors"],
      usage: "Prepares low-porosity bone cement for implant fixation in joint replacement surgery",
      specifications: "Vacuum mixing reduces porosity, antibiotic-loaded options, timed curing, measured delivery",
      image: harmonicScalpelImage,
      setupTips: ["Mix under vacuum", "Follow timing protocol", "Load gun at dough stage", "Work efficiently", "Monitor polymerization"]
    },
    "Tourniquet system": {
      name: "Pneumatic Tourniquet System",
      category: "Limb Ischemia",
      description: "Pneumatic system for creating bloodless surgical field in extremity surgery",
      contents: ["Tourniquet console", "Cuffs (various sizes)", "Pressure tubing", "Limb protection", "Timer"],
      usage: "Creates bloodless field for orthopedic and extremity surgery, controls intraoperative bleeding",
      specifications: "Automated pressure control, dual-cuff capability, timer alarm, limb occlusion pressure calculation",
      image: harmonicScalpelImage,
      setupTips: ["Size cuff appropriately", "Pad limb properly", "Set safe pressure", "Monitor time limits", "Document inflation time"]
    },
    "Nerve stimulator": {
      name: "Peripheral Nerve Stimulator",
      category: "Nerve Identification",
      description: "Electrical stimulation device for identifying and testing nerve function intraoperatively",
      contents: ["Stimulator console", "Monopolar and bipolar probes", "Ground pad", "Variable output control"],
      usage: "Essential for nerve identification during surgery to prevent iatrogenic nerve injury",
      specifications: "Adjustable current 0.1-5.0 mA, monopolar and bipolar modes, battery or AC powered, audio/visual feedback",
      image: electrocauteryImage,
      setupTips: ["Place ground pad", "Start with low current", "Use appropriate probe", "Document responses", "Test systematically"]
    },
    "Headlight and loupes": {
      name: "Surgical Magnification and Illumination System",
      category: "Visualization",
      description: "Wearable magnification loupes with integrated LED headlight for enhanced visualization",
      contents: ["Surgical loupes", "LED headlight", "Battery pack", "Adjustable frames", "Various magnifications"],
      usage: "Provides magnification and focused illumination for microsurgery and detailed surgical procedures",
      specifications: "2.5x to 6.0x magnification, LED headlight 50,000+ lux, adjustable focus, wireless battery options",
      image: laparoscopicSetImage,
      setupTips: ["Adjust to working distance", "Center optics", "Test light brightness", "Ensure comfort", "Have backup battery"]
    },
    "Smoke evacuator": {
      name: "Surgical Smoke Evacuation System",
      category: "OR Safety Equipment",
      description: "Active filtration system for removing surgical smoke and aerosols from the surgical field",
      contents: ["Evacuation unit", "Filtration system", "Tubing", "Nozzles", "ULPA filters"],
      usage: "Protects surgical team from hazardous surgical smoke containing carcinogens and viable cellular material",
      specifications: "HEPA/ULPA filtration, adjustable suction, quiet operation, disposable filters, footswitch control",
      image: harmonicScalpelImage,
      setupTips: ["Position nozzle close to source", "Activate when using energy devices", "Change filters regularly", "Minimize noise", "Ensure proper capture"]
    },
    "Harmonic device (ultrasonic)": {
      name: "Ultrasonic Cutting and Coagulation Device",
      category: "Energy Device",
      description: "Ultrasonic surgical device providing simultaneous cutting and coagulation with minimal thermal spread",
      contents: ["Generator", "Handpiece", "Various blade configurations", "Foot pedal", "Irrigation capability"],
      usage: "Provides precise dissection and hemostasis in laparoscopic and open surgery with minimal collateral damage",
      specifications: "55.5 kHz frequency, adjustable power levels, minimal smoke, reduced lateral thermal damage <2mm",
      image: harmonicScalpelImage,
      setupTips: ["Select appropriate blade", "Test activation", "Use appropriate power", "Maintain blade contact", "Allow cooling between uses"]
    },
    "LigaSure device": {
      name: "Bipolar Vessel Sealing System",
      category: "Vessel Sealing",
      description: "Advanced bipolar energy device for sealing vessels up to 7mm without clips or ties",
      contents: ["LigaSure generator", "Handpieces", "Various jaw configurations", "Foot pedal", "Blunt tip sealer"],
      usage: "Seals vessels and tissue bundles quickly and reliably in open and laparoscopic surgery",
      specifications: "Seals vessels up to 7mm, burst pressure >3x systolic, minimal thermal spread, tissue feedback sensing",
      image: harmonicScalpelImage,
      setupTips: ["Choose appropriate jaw", "Achieve proper tissue compression", "Complete seal cycle", "Verify feedback tone", "No pre-coagulation needed"]
    },
    "Surgical robot components": {
      name: "Robotic Surgical System Instruments",
      category: "Robotic Surgery",
      description: "Robotic instrument arms and accessories for minimally invasive robotic-assisted surgery",
      contents: ["Robotic arms", "EndoWrist instruments", "Camera system", "Patient cart", "Surgeon console"],
      usage: "Enables precision minimally invasive surgery with enhanced dexterity and 3D visualization",
      specifications: "7 degrees of freedom, tremor filtration, motion scaling, 3D HD vision, wristed instruments",
      image: laparoscopicSetImage,
      setupTips: ["Dock robot carefully", "Test all arms", "Verify camera", "Check instrument articulation", "Emergency undocking ready"]
    },
    "Image intensifier (C-arm)": {
      name: "Intraoperative Fluoroscopy System",
      category: "Imaging Equipment",
      description: "Mobile fluoroscopy unit for real-time intraoperative imaging guidance",
      contents: ["C-arm unit", "Image intensifier", "Monitor", "Radiation shields", "Sterile drapes"],
      usage: "Provides real-time fluoroscopic imaging for orthopedic, vascular, and interventional procedures",
      specifications: "High-resolution imaging, pulsed and continuous modes, dose reduction features, image storage capability",
      image: harmonicScalpelImage,
      setupTips: ["Position before draping", "Use radiation protection", "Minimize exposure time", "Optimize image quality", "Document radiation dose"]
    },
    "Wound VAC system": {
      name: "Negative Pressure Wound Therapy",
      category: "Wound Management",
      description: "Vacuum-assisted closure system for complex wound management and healing",
      contents: ["Vacuum pump", "Foam dressing", "Adhesive drape", "Tubing", "Canister"],
      usage: "Promotes wound healing through negative pressure, removes exudate, and prepares wound bed",
      specifications: "Adjustable pressure -50 to -200 mmHg, continuous or intermittent modes, portable units available",
      image: harmonicScalpelImage,
      setupTips: ["Size foam appropriately", "Ensure seal integrity", "Set correct pressure", "Position away from vessels", "Monitor output"]
    },
    "Insufflator": {
      name: "Laparoscopic CO2 Insufflation System",
      category: "Laparoscopic Equipment",
      description: "High-flow CO2 insufflator for creating and maintaining pneumoperitoneum",
      contents: ["Insufflator console", "CO2 tank", "Pressure regulator", "Tubing", "Filters"],
      usage: "Essential for laparoscopic surgery creating working space through controlled pneumoperitoneum",
      specifications: "High-flow up to 40 L/min, pressure monitoring, warming capability, automatic pressure regulation",
      image: harmonicScalpelImage,
      setupTips: ["Verify CO2 supply", "Set pressure limit", "Use warming if available", "Monitor intra-abdominal pressure", "Have backup tank"]
    },
    "Specimen retrieval bags": {
      name: "Laparoscopic Specimen Extraction System",
      category: "Specimen Retrieval",
      description: "Sterile bags for safe removal of specimens during minimally invasive surgery",
      contents: ["Various sized bags", "Deployment systems", "Opening mechanism", "Drawstring closure"],
      usage: "Contains specimens during laparoscopic extraction preventing port site contamination or seeding",
      specifications: "10mm to 15mm introducers, expandable to accommodate large specimens, tear-resistant material",
      image: grasperImage,
      setupTips: ["Select appropriate size", "Deploy completely", "Secure specimen fully", "Close bag carefully", "Extract through appropriate port"]
    },
    "Bone wax and hemostatic agents": {
      name: "Surgical Hemostatic Materials",
      category: "Hemostasis Adjuncts",
      description: "Topical hemostatic agents for controlling bone and soft tissue bleeding",
      contents: ["Bone wax", "Gelfoam", "Surgicel", "Floseal", "Thrombin", "Tranexamic acid"],
      usage: "Provides topical hemostasis when conventional methods are insufficient or impractical",
      specifications: "Various formulations, absorbable and non-absorbable, flowable and sheet forms, topical application",
      image: harmonicScalpelImage,
      setupTips: ["Choose appropriate agent", "Apply to dry field if possible", "Use minimal amount", "Avoid intravascular use", "Document usage"]
    },
    "Irrigation and suction systems": {
      name: "Surgical Irrigation and Aspiration System",
      category: "Fluid Management",
      description: "Complete system for surgical field irrigation and fluid/debris aspiration",
      contents: ["Suction units", "Irrigation bottles", "Tubing", "Various suction tips", "Splash shields"],
      usage: "Maintains clear surgical field through irrigation and removes blood, fluids, and debris via suction",
      specifications: "Variable suction pressure, large capacity canisters, graduated measurement, sterile irrigation solutions",
      image: harmonicScalpelImage,
      setupTips: ["Set appropriate suction", "Have adequate irrigation", "Use correct tip size", "Measure blood loss", "Prevent clogging"]
    },
    // ADDITIONAL MISSING INSTRUMENTS IDENTIFIED IN TESTING
    "Vascular surgery set": {
      name: "Vascular Surgical Instrument Set",
      category: "Vascular Surgery",
      description: "Complete instrument set for vascular surgical procedures",
      contents: ["DeBakey forceps", "Vascular clamps", "Potts scissors", "Bulldog clamps", "Vessel dilators", "Castro-Viejo needle holder"],
      usage: "Comprehensive set for arterial and venous surgery including bypass, endarterectomy, and vascular repairs",
      specifications: "Atraumatic design, delicate tissue handling, various clamp pressures, fine-tipped instruments",
      image: grasperImage,
      setupTips: ["Organize by function", "Have multiple clamp sizes", "Check instrument tips", "Prepare vessel loops", "Have sutures ready"]
    },
    "Vessel loops": {
      name: "Silastic Vessel Loops",
      category: "Vascular Control",
      description: "Silicone elastomer loops for atraumatic vessel isolation and retraction",
      contents: ["Various colors (red, yellow, blue, green)", "Different widths", "Vascular tapes", "Umbilical tapes"],
      usage: "Used for atraumatic vessel isolation, identification, and temporary occlusion during vascular surgery",
      specifications: "Color-coded for identification, various widths (2-6mm), soft silicone material, reusable or disposable",
      image: grasperImage,
      setupTips: ["Select appropriate size", "Use color coding", "Apply without tension", "Secure with snaps or clamps", "Have multiple colors ready"]
    },
    "Microscissors": {
      name: "Microvascular Scissors",
      category: "Microsurgery",
      description: "Ultra-fine scissors for delicate microvascular and microsurgical procedures",
      contents: ["Spring-handled microscissors", "Various tip configurations", "Straight and curved", "0.3-1mm tips"],
      usage: "Essential for precise cutting in microsurgery, nerve repair, and delicate vascular work",
      specifications: "Ultra-sharp tips, spring-loaded handles, various angulations, titanium or stainless steel",
      image: grasperImage,
      setupTips: ["Handle with extreme care", "Check tip alignment", "Use under magnification", "Keep tips protected", "Have backup available"]
    },
    "Fine forceps": {
      name: "Microsurgical Forceps",
      category: "Precision Instruments",
      description: "Delicate forceps for microsurgical tissue manipulation",
      contents: ["Jeweler forceps", "DeBakey forceps", "Adson forceps", "Gerald forceps", "Various tip designs"],
      usage: "Used for precise tissue handling in microsurgery, plastic surgery, and delicate procedures",
      specifications: "0.3-1mm tips, spring or standard handles, smooth or toothed, various lengths",
      image: grasperImage,
      setupTips: ["Check tip alignment", "Handle delicately", "Use appropriate tip type", "Keep multiple available", "Protect tips when not in use"]
    },
    "Vascular sutures": {
      name: "Cardiovascular Suture Materials",
      category: "Suture Materials",
      description: "Specialized sutures for vascular and cardiac anastomosis",
      contents: ["Prolene (polypropylene)", "Various sizes 3-0 to 7-0", "Cardiovascular needles", "Double-armed sutures"],
      usage: "Primary suture material for vascular anastomosis, cardiac surgery, and vessel repairs",
      specifications: "Non-absorbable monofilament, minimal tissue reactivity, excellent tensile strength, blue color for visibility",
      image: grasperImage,
      setupTips: ["Select appropriate size", "Use cardiovascular needles", "Handle carefully", "Avoid kinking", "Have multiple sizes available"]
    },
    "Clamps": {
      name: "Surgical Clamps Assortment",
      category: "General Instruments",
      description: "Various surgical clamps for tissue control and hemostasis",
      contents: ["Kelly clamps", "Mosquito forceps", "Right-angle clamps", "Kocher clamps", "Allis clamps", "Babcock clamps"],
      usage: "Multi-purpose clamps for tissue grasping, vessel occlusion, and surgical field control",
      specifications: "Various sizes and jaw configurations, locking mechanisms, straight and curved, traumatic and atraumatic",
      image: grasperImage,
      setupTips: ["Organize by size and type", "Check locking mechanism", "Have adequate numbers", "Select appropriate jaw type", "Prepare for various uses"]
    },
    "Drill bits": {
      name: "Surgical Drill Bit Set",
      category: "Orthopedic Tools",
      description: "Various drill bits for bone preparation in orthopedic and neurosurgical procedures",
      contents: ["Twist drill bits", "K-wires", "Various diameters", "Depth gauges", "Quick-release chuck"],
      usage: "Used for bone drilling, screw pilot holes, wire placement, and bone tunneling",
      specifications: "Stainless steel, various diameters 1.0-4.5mm, sharp flutes, autoclavable, self-centering tips",
      image: electrocauteryImage,
      setupTips: ["Have complete size range", "Check bit sharpness", "Use irrigation", "Measure depth carefully", "Have backup bits"]
    },
    "Graft fixation devices": {
      name: "Ligament Graft Fixation Systems",
      category: "Sports Medicine",
      description: "Devices for securing tendon grafts in ligament reconstruction",
      contents: ["Interference screws", "Endobuttons", "Cross-pins", "Suture anchors", "Washers and posts"],
      usage: "Essential for ACL/PCL reconstruction providing secure graft fixation in bone tunnels",
      specifications: "Bioabsorbable and titanium options, various diameters, minimal graft damage, secure fixation",
      image: grasperImage,
      setupTips: ["Size graft appropriately", "Select correct fixation", "Have multiple options", "Check insertion tools", "Verify graft tension"]
    },
    "Tensioning devices": {
      name: "Graft Tensioning and Fixation Tools",
      category: "Ligament Surgery",
      description: "Instruments for applying and measuring graft tension during ligament reconstruction",
      contents: ["Tensioning boards", "Spring scales", "Fixation clamps", "Graft positioning devices"],
      usage: "Used to apply appropriate tension to ligament grafts before final fixation",
      specifications: "Calibrated tension measurement, secure graft holding, adjustable tension settings",
      image: grasperImage,
      setupTips: ["Set appropriate tension", "Cycle knee through ROM", "Verify graft position", "Secure before fixation", "Document tension used"]
    },
    "Fusion hardware": {
      name: "Spinal Fusion Implant System",
      category: "Spine Surgery",
      description: "Complete hardware system for spinal fusion procedures",
      contents: ["Pedicle screws", "Rods", "Interbody cages", "Bone graft", "Connectors", "Set screws"],
      usage: "Provides rigid fixation for spinal fusion procedures across various spinal levels",
      specifications: "Titanium or PEEK materials, various screw diameters and lengths, modular rod systems",
      image: electrocauteryImage,
      setupTips: ["Verify correct levels", "Have size options", "Check screw placement", "Contour rods appropriately", "Secure all connections"]
    },
    "Plate and screws": {
      name: "Orthopedic Plating System",
      category: "Fracture Fixation",
      description: "Plates and screws for fracture fixation and bone stabilization",
      contents: ["Various plate designs", "Cortical screws", "Locking screws", "Compression plates", "Reconstruction plates"],
      usage: "Used for internal fixation of fractures providing stable construct for bone healing",
      specifications: "Titanium or stainless steel, locking and non-locking options, various plate profiles and lengths",
      image: electrocauteryImage,
      setupTips: ["Select appropriate plate", "Contour to bone", "Use correct screw length", "Achieve compression if needed", "Verify stable fixation"]
    },
    "Disc instruments": {
      name: "Intervertebral Disc Surgery Set",
      category: "Spine Surgery",
      description: "Specialized instruments for disc removal and preparation",
      contents: ["Pituitary rongeurs", "Curettes", "Disc shavers", "End plate preparation", "Discectomy tools"],
      usage: "Used for discectomy, disc preparation for fusion, and nucleus pulposus removal",
      specifications: "Various angles and sizes, sharp cutting edges, long handles for deep access",
      image: grasperImage,
      setupTips: ["Have complete size range", "Use sequential sizing", "Protect neural structures", "Complete disc removal", "Prepare end plates appropriately"]
    },
    "Bone graft/cage": {
      name: "Interbody Fusion Cage System",
      category: "Spinal Implants",
      description: "Structural cages and bone graft materials for spinal fusion",
      contents: ["PEEK or titanium cages", "Bone graft materials", "Cage inserters", "Impactors", "Trial cages"],
      usage: "Provides structural support and promotes fusion in interbody spinal fusion procedures",
      specifications: "Various footprints and heights, lordotic angles, large graft windows, radiolucent or radiopaque",
      image: grasperImage,
      setupTips: ["Size with trials", "Pack with bone graft", "Insert carefully", "Verify position fluoroscopically", "Achieve proper lordosis"]
    },
    "Anterior cervical plate": {
      name: "Anterior Cervical Plating System",
      category: "Cervical Spine",
      description: "Plate and screw system for anterior cervical spine stabilization",
      contents: ["Cervical plates", "Variable angle screws", "Locking screws", "Plate holders", "Screwdrivers"],
      usage: "Provides anterior cervical fixation following discectomy and fusion (ACDF)",
      specifications: "Titanium construction, variable screw angles, translational or static designs, low profile",
      image: electrocauteryImage,
      setupTips: ["Select appropriate length", "Center on vertebral bodies", "Use locking screws", "Avoid esophagus", "Verify screw trajectory"]
    },
    "Drill and burr": {
      name: "Powered Drilling and Burring System",
      category: "Bone Preparation",
      description: "High-speed drill and burr system for bone work",
      contents: ["Drill handpiece", "Burr handpiece", "Various drill bits", "Cutting and diamond burrs", "Irrigation"],
      usage: "Used for bone preparation, shaping, and removal in orthopedic and neurosurgical procedures",
      specifications: "Variable speed control, irrigation capability, multiple handpiece options, autoclavable",
      image: electrocauteryImage,
      setupTips: ["Select appropriate speed", "Use irrigation", "Have multiple bits and burrs", "Protect soft tissues", "Change instruments as needed"]
    },
    // PLASTIC & RECONSTRUCTIVE SURGERY INSTRUMENTS
    "Plastic surgery set": {
      name: "Plastic & Reconstructive Surgery Set",
      category: "Plastic Surgery",
      description: "Delicate instruments for plastic and reconstructive surgical procedures requiring fine precision",
      contents: ["Fine scissors", "Micro forceps", "Skin hooks", "Undermining scissors", "Fine needle holders", "Various retractors"],
      usage: "Essential for breast reconstruction, facial surgery, hand surgery, and all plastic surgical procedures requiring delicate tissue handling",
      specifications: "Fine-tipped instruments, atraumatic design, various sizes for different anatomical sites, autoclavable stainless steel",
      image: grasperImage,
      setupTips: ["Handle instruments delicately", "Organize by size", "Have magnification available", "Ensure sharp cutting instruments", "Keep fine instruments protected"]
    },
    // PEDIATRIC SURGERY INSTRUMENTS
    "Pediatric surgery set": {
      name: "Pediatric Surgical Instrument Set",
      category: "Pediatric Surgery",
      description: "Scaled-down instruments specifically designed for pediatric surgical procedures",
      contents: ["Small retractors", "Fine scissors", "Pediatric clamps", "Mini needle holders", "Delicate forceps"],
      usage: "Essential for all pediatric surgical procedures requiring appropriately sized instruments for smaller anatomical structures",
      specifications: "Reduced size for pediatric anatomy, gentle tissue handling, various sizes for different age groups, autoclavable",
      image: grasperImage,
      setupTips: ["Select age-appropriate sizes", "Handle with extreme care", "Have full size range available", "Use gentle technique", "Prepare pediatric-specific equipment"]
    },
    // ORAL & MAXILLOFACIAL SURGERY INSTRUMENTS
    "Maxillofacial surgery set": {
      name: "Oral & Maxillofacial Surgery Set",
      category: "Maxillofacial Surgery",
      description: "Specialized instruments for oral, jaw, and facial skeletal surgery",
      contents: ["Bone reduction forceps", "Arch bars", "Wire twisters", "Maxillary elevators", "Mandibular retractors", "Fixation plates"],
      usage: "Essential for facial fracture repair, orthognathic surgery, TMJ procedures, and maxillofacial reconstructive surgery",
      specifications: "Titanium fixation hardware, specialized reduction instruments, various plate and screw options, autoclavable",
      image: electrocauteryImage,
      setupTips: ["Have complete plate and screw sets", "Verify proper reduction", "Check occlusion frequently", "Prepare MMF equipment", "Have imaging available"]
    },
    // COLORECTAL SURGERY INSTRUMENTS
    "Colorectal surgery set": {
      name: "Colorectal Surgical Instrument Set",
      category: "Colorectal Surgery",
      description: "Comprehensive set for colorectal and anorectal surgical procedures",
      contents: ["Proctoscopes", "Anal retractors", "Hemorrhoidal clamps", "Fistula probes", "Bowel clamps", "Circular staplers"],
      usage: "Essential for hemorrhoidectomy, fistulotomy, colorectal resection, and all anorectal surgical procedures",
      specifications: "Various retractor sizes, specialized anal instruments, atraumatic bowel handling, autoclavable stainless steel",
      image: grasperImage,
      setupTips: ["Prepare patient positioning equipment", "Have full range of retractors", "Check stapler sizes", "Prepare irrigation", "Have hemostatic agents ready"]
    },
    // TRAUMA SURGERY INSTRUMENTS
    "Trauma surgery set": {
      name: "Emergency Trauma Surgical Set",
      category: "Trauma Surgery",
      description: "Comprehensive rapid-access instruments for emergency trauma procedures",
      contents: ["Large Richardson retractors", "Vascular clamps", "Rapid infusion equipment", "Chest tube trays", "Damage control packing"],
      usage: "Essential for damage control laparotomy, emergency thoracotomy, and rapid life-saving trauma interventions",
      specifications: "Rapid deployment design, versatile use, heavy-duty construction for emergency use, complete hemostasis capability",
      image: laparoscopicSetImage,
      setupTips: ["Have everything ready immediately", "Prepare vascular instruments", "Stock hemostatic agents", "Have rapid transfusion ready", "Prepare damage control supplies"]
    },
    // TRANSPLANT SURGERY INSTRUMENTS
    "Transplant surgery set": {
      name: "Organ Transplantation Surgical Set",
      category: "Transplant Surgery",
      description: "Specialized instruments for organ procurement and transplantation procedures",
      contents: ["Vascular clamps", "Perfusion cannulas", "Organ preservation solutions", "Microsurgical instruments", "Specialized retractors"],
      usage: "Essential for kidney, liver, pancreas, and other organ transplantation procedures requiring meticulous vascular anastomosis",
      specifications: "Vascular-specific instruments, organ preservation equipment, microsurgical capability, cold storage systems",
      image: harmonicScalpelImage,
      setupTips: ["Coordinate with procurement team", "Have preservation solutions ready", "Prepare vascular anastomosis instruments", "Check perfusion equipment", "Time management critical"]
    },
    // SURGICAL ONCOLOGY INSTRUMENTS
    "Oncology surgery set": {
      name: "Surgical Oncology Instrument Set",
      category: "Oncology Surgery",
      description: "Comprehensive instruments for cancer resection and lymph node dissection",
      contents: ["En bloc resection instruments", "Lymph node dissection tools", "Sentinel node localization equipment", "Electrocautery devices", "Specimen containers"],
      usage: "Essential for wide local excision, radical resection, lymphadenectomy, and oncologic surgical procedures",
      specifications: "Instruments for wide margins, lymphatic dissection capability, specimen handling equipment, hemostasis devices",
      image: electrocauteryImage,
      setupTips: ["Plan margins carefully", "Prepare sentinel node detection", "Have frozen section capability", "Label specimens properly", "Prepare reconstruction options"]
    },
    // ENDOCRINE SURGERY INSTRUMENTS  
    "Endocrine surgery set": {
      name: "Endocrine Surgical Instrument Set",
      category: "Endocrine Surgery",
      description: "Delicate instruments for thyroid, parathyroid, and adrenal surgery",
      contents: ["Fine thyroid retractors", "Delicate forceps", "Nerve monitoring equipment", "Hemostatic devices", "Small vascular clamps"],
      usage: "Essential for thyroidectomy, parathyroidectomy, adrenalectomy requiring nerve preservation and delicate dissection",
      specifications: "Fine-tipped instruments, nerve monitoring capability, delicate vascular control, minimal tissue trauma design",
      image: grasperImage,
      setupTips: ["Set up nerve monitoring", "Have delicate instruments ready", "Prepare hemostatic agents", "Check parathyroid localization", "Have calcium replacement available"]
    }
  };

  // Helper function to get instrument details with case-insensitive matching
  const getInstrumentDetails = (instrumentName: string) => {
    // First try exact match
    if (instrumentDetails[instrumentName as keyof typeof instrumentDetails]) {
      return instrumentDetails[instrumentName as keyof typeof instrumentDetails];
    }
    
    // Try case-insensitive match
    const normalizedName = instrumentName.toLowerCase().trim();
    const matchingKey = Object.keys(instrumentDetails).find(
      key => key.toLowerCase().trim() === normalizedName
    );
    
    if (matchingKey) {
      return instrumentDetails[matchingKey as keyof typeof instrumentDetails];
    }
    
    return null;
  };

  // Get instrument image directly from instrumentDetails
  const getInstrumentImage = (instrument: any) => {
    return instrument?.image || null;
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
  // Safely merge procedure data with defaults to prevent undefined errors
  const procedure_data = procedure ? {
    ...mockDetailedProcedure,
    ...procedure,
    tips: procedure.tips || [],
    complications: procedure.complications || [],
    positioning: procedure.positioning || mockDetailedProcedure.positioning,
    draping: procedure.draping || mockDetailedProcedure.draping,
    instruments: procedure.instruments || mockDetailedProcedure.instruments,
    mayoSetup: procedure.mayoSetup || mockDetailedProcedure.mayoSetup,
    procedureSteps: procedure.procedureSteps || mockDetailedProcedure.procedureSteps,
    medications: procedure.medications || mockDetailedProcedure.medications
  } : mockDetailedProcedure;

  // Helper functions to check if tabs have content
  const hasOverviewContent = procedure_data.description || 
    (procedure_data.tips && procedure_data.tips.length > 0) ||
    (procedure_data.complications && procedure_data.complications.length > 0);

  const hasSetupContent = 
    (procedure_data.positioning && procedure_data.positioning.steps && procedure_data.positioning.steps.length > 0) ||
    (procedure_data.draping && procedure_data.draping.steps && procedure_data.draping.steps.length > 0) ||
    (procedure_data.instruments && (procedure_data.instruments.basicSet?.length > 0 || procedure_data.instruments.specialInstruments?.length > 0)) ||
    (procedure_data.mayoSetup && procedure_data.mayoSetup.essentials && procedure_data.mayoSetup.essentials.length > 0);

  const hasProcedureContent = 
    (procedure_data.procedureSteps && procedure_data.procedureSteps.steps && procedure_data.procedureSteps.steps.length > 0) ||
    (procedure_data.medications && procedure_data.medications.items && procedure_data.medications.items.length > 0);

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
          <TabsList className="grid w-full mb-6" style={{gridTemplateColumns: `repeat(${[true, hasSetupContent, hasProcedureContent, !!(relatedVideos && relatedVideos.length > 0), true].filter(Boolean).length}, minmax(0, 1fr))`}}>
            <TabsTrigger value="overview" className="text-xs" data-testid="tab-overview">
              <Eye className="h-3 w-3 mr-1" />
              Overview
            </TabsTrigger>
            {hasSetupContent && (
              <TabsTrigger value="setup" className="text-xs" data-testid="tab-setup">
                <Wrench className="h-3 w-3 mr-1" />
                Setup
              </TabsTrigger>
            )}
            {hasProcedureContent && (
              <TabsTrigger value="procedure" className="text-xs" data-testid="tab-procedure">
                <FileText className="h-3 w-3 mr-1" />
                Procedure
              </TabsTrigger>
            )}
            {relatedVideos && relatedVideos.length > 0 && (
              <TabsTrigger value="videos" className="text-xs" data-testid="tab-videos">
                <Play className="h-3 w-3 mr-1" />
                Videos
              </TabsTrigger>
            )}
            <TabsTrigger value="notes" className="text-xs" data-testid="tab-notes">
              <User className="h-3 w-3 mr-1" />
              Notes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Description */}
            {procedure_data.description && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{procedure_data.description}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Key Points */}
                {procedure_data.tips && procedure_data.tips.length > 0 && (
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
                )}

                {/* Potential Complications */}
                {procedure_data.complications && procedure_data.complications.length > 0 && (
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
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="setup" className="space-y-4">
            {!hasSetupContent ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Setup details for this procedure are being added. Check back soon!</p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Patient Positioning */}
                {procedure_data.positioning && procedure_data.positioning.steps && procedure_data.positioning.steps.length > 0 && (
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
            )}

            {/* Draping */}
            {procedure_data.draping && procedure_data.draping.steps && procedure_data.draping.steps.length > 0 && (
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
            )}

            {/* Instrumentation */}
            {procedure_data.instruments && (procedure_data.instruments.basicSet?.length > 0 || procedure_data.instruments.specialInstruments?.length > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{procedure_data.instruments.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {procedure_data.instruments.basicSet && procedure_data.instruments.basicSet.length > 0 && (
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
                  )}
                  {procedure_data.instruments.specialInstruments && procedure_data.instruments.specialInstruments.length > 0 && (
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
                  )}
                </CardContent>
              </Card>
            )}

            {/* Mayo Stand Setup */}
            {procedure_data.mayoSetup && procedure_data.mayoSetup.essentials && procedure_data.mayoSetup.essentials.length > 0 && (
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
            )}
              </>
            )}
          </TabsContent>

          <TabsContent value="procedure" className="space-y-4">
            {!hasProcedureContent ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Detailed procedure steps for this procedure are being added. Check back soon!</p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Procedure Steps */}
                {procedure_data.procedureSteps && procedure_data.procedureSteps.steps && procedure_data.procedureSteps.steps.length > 0 && (
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
                        {step.instruments && step.instruments.length > 0 && (
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
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Medications */}
            {procedure_data.medications && procedure_data.medications.items && procedure_data.medications.items.length > 0 && (
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
            )}
              </>
            )}
          </TabsContent>

          <TabsContent value="videos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Related Videos</CardTitle>
                <CardDescription className="text-xs">
                  Educational videos and demonstrations related to this procedure
                </CardDescription>
              </CardHeader>
              <CardContent>
                {videosLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="bg-muted rounded-md aspect-video mb-2"></div>
                        <div className="h-4 bg-muted rounded mb-1"></div>
                        <div className="h-3 bg-muted rounded w-2/3"></div>
                      </div>
                    ))}
                  </div>
                ) : relatedVideos && relatedVideos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {relatedVideos.map((video: any) => (
                      <Card key={video.id} className="overflow-hidden hover-elevate cursor-pointer">
                        <div className="relative">
                          <div className="aspect-video bg-muted flex items-center justify-center">
                            <Play className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                            {video.duration || '10:30'}
                          </div>
                        </div>
                        <CardContent className="p-3">
                          <h4 className="font-medium text-sm mb-1 line-clamp-2">{video.title}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">{video.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {video.category?.name || 'Procedure'}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {video.views || 0} views
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Play className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <h3 className="font-medium text-sm mb-1">No Related Videos</h3>
                    <p className="text-xs text-muted-foreground mb-4">
                      There are currently no videos available for this procedure.
                    </p>
                    <Button variant="outline" size="sm" onClick={() => setLocation('/videos')}>
                      Browse Video Library
                    </Button>
                  </div>
                )}
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
        <DialogContent className="max-w-lg max-h-[85vh] p-0">
          <div className="p-6 pb-4">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Instrument Details
              </DialogTitle>
              <DialogDescription>
                Detailed information about this surgical instrument
              </DialogDescription>
            </DialogHeader>
          </div>
          
          <div className="max-h-[calc(85vh-8rem)] overflow-y-auto px-6 pb-6">
            {selectedInstrument && getInstrumentDetails(selectedInstrument) && (
              <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{getInstrumentDetails(selectedInstrument)!.name}</h3>
                <Badge variant="outline" className="mt-1">
                  {getInstrumentDetails(selectedInstrument)!.category}
                </Badge>
              </div>

              {/* Instrument Image */}
              {getInstrumentDetails(selectedInstrument) && (getInstrumentDetails(selectedInstrument) as any).image && (
                <div>
                  <img 
                    src={getInstrumentImage(getInstrumentDetails(selectedInstrument)) || ''} 
                    alt={getInstrumentDetails(selectedInstrument)!.name}
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                </div>
              )}
              
              <div>
                <h4 className="font-semibold text-sm mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">
                  {getInstrumentDetails(selectedInstrument)!.description}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm mb-2">Contents/Components</h4>
                <div className="space-y-1">
                  {getInstrumentDetails(selectedInstrument)!.contents.map((item: string, index: number) => (
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
                  {getInstrumentDetails(selectedInstrument)!.usage}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm mb-2">Specifications</h4>
                <p className="text-sm text-muted-foreground">
                  {getInstrumentDetails(selectedInstrument)!.specifications}
                </p>
              </div>

              {/* Setup Tips */}
              {getInstrumentDetails(selectedInstrument)?.setupTips && (
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    Setup Tips
                  </h4>
                  <div className="space-y-1">
                    {getInstrumentDetails(selectedInstrument)!.setupTips!.map((tip: string, index: number) => (
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
          
            {selectedInstrument && !getInstrumentDetails(selectedInstrument) && (
              <div className="text-center py-6">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Information Not Available</h3>
                <p className="text-sm text-muted-foreground">
                  Detailed information for "{selectedInstrument}" is not currently available in our database.
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}