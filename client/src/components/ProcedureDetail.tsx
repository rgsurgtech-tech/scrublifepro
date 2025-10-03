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
      specifications: "Extended length (45cm) instruments, reinforced construction, compatible with standard trocars"
    },
    "Clip applier": {
      name: "Surgical Clip Applier",
      category: "Hemostatic Device", 
      description: "Precision clip application device for vessel and duct occlusion during laparoscopic procedures",
      contents: ["Clip applier handle", "Various clip sizes (small, medium, large)", "Reload cartridges", "Clip removal forceps"],
      usage: "Precise application of titanium clips for permanent vessel occlusion during laparoscopic surgery",
      specifications: "Autoclavable, reloadable cartridge system, fits standard 5mm ports"
    },
    "Staplers": {
      name: "Linear Staplers",
      category: "Stapling Device",
      description: "Linear cutting staplers for tissue transection and anastomosis in bariatric procedures",
      contents: ["60mm linear stapler", "Various cartridge heights", "Reload cartridges", "Stapler anvil"],
      usage: "Primary tool for gastric sleeve creation and tissue division in bariatric surgery",
      specifications: "60mm staple line, multiple cartridge heights (2.5mm, 3.5mm, 4.8mm), single-use cartridges"
    },
    "Bougie": {
      name: "Bougie Dilator",
      category: "Sizing Tool",
      description: "Calibration tool used to ensure proper gastric sleeve diameter during bariatric procedures",
      contents: ["32-40 French bougie tubes", "Measurement markings", "Flexible tip design"],
      usage: "Inserted through the mouth to calibrate gastric sleeve size and ensure consistent diameter during stapling",
      specifications: "Single-use, graduated markings, flexible design for patient safety"
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
    "Cement supplies": {
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
    }
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
          <TabsList className="grid w-full grid-cols-5 mb-6">
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
            <TabsTrigger value="videos" className="text-xs" data-testid="tab-videos">
              <Play className="h-3 w-3 mr-1" />
              Videos
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
                    src={getInstrumentImage(instrumentDetails[selectedInstrument as keyof typeof instrumentDetails]) || ''} 
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
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}