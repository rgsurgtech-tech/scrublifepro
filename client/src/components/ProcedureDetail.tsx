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
    "Prosthetic valves": {
      name: "Cardiac Prosthetic Valves",
      category: "Implant Device",
      description: "Artificial heart valves for replacement of diseased native valves, available in mechanical and biological options",
      contents: ["Valve prosthesis", "Sewing ring", "Valve sizers", "Insertion tools", "Sizing guides"],
      usage: "Replacement of diseased mitral, aortic, tricuspid, or pulmonary valves to restore proper cardiac function",
      specifications: "Various sizes 19-33mm, mechanical or bioprosthetic options, MRI compatible designs available",
      image: grasperImage,
      setupTips: ["Verify correct valve size", "Handle with care", "Keep sterile until insertion", "Have multiple sizes available", "Test valve function"]
    },
    "Valve sizers": {
      name: "Cardiac Valve Sizers",
      category: "Measuring Tool",
      description: "Precision measuring devices to determine correct prosthetic valve size during cardiac surgery",
      contents: ["Graduated sizing obturators", "Multiple size options", "Insertion handles", "Size marking system"],
      usage: "Accurate measurement of valve annulus to ensure proper prosthetic valve fit and function",
      specifications: "Graduated sizes 19-33mm, color-coded system, autoclavable stainless steel construction",
      image: grasperImage,
      setupTips: ["Start with estimated size", "Test multiple sizes", "Ensure complete seating", "Note size for prosthesis", "Handle gently to avoid damage"]
    },
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
    "Major laparoscopy set": {
      name: "Major Laparoscopy Set",
      category: "Surgical Set",
      description: "Complete instrument set for laparoscopic procedures including all essential tools for minimally invasive surgery",
      contents: ["5mm and 10mm trocars", "Laparoscopic graspers (Maryland, DeBakey, Wave)", "Laparoscopic Metz scissors", "Clip appliers with titanium clips", "L-hook electrocautery", "Suction/irrigation system"],
      usage: "Used for minimally invasive surgical procedures through small keyhole incisions. Provides complete surgical capability for procedures like cholecystectomy, appendectomy, and hernia repair",
      specifications: "Complete laparoscopic instrument set with 5mm and 10mm instruments, reusable and disposable options, HD camera compatible, CO2 insufflation system",
      image: laparoscopicSetImage,
      setupTips: ["Arrange instruments by frequency of use", "Have backup clips readily available", "Test all electrical connections before procedure", "Ensure camera white balance is optimized"]
    },
    "Major orthopedic set": {
      name: "Major Orthopedic Instrument Set", 
      category: "Basic Set",
      description: "Comprehensive collection of bone and joint instruments for major orthopedic procedures including joint replacements and fracture repairs",
      contents: ["Bone cutting instruments", "Retractors", "Reduction forceps", "Bone holding clamps", "Periosteal elevators", "Reamers", "Rasps"],
      usage: "Essential instrument set for major orthopedic surgeries including total joint replacements, fracture repairs, and spinal procedures",
      specifications: "Stainless steel construction, various sizes, heavy-duty design for bone work, autoclave compatible",
      image: grasperImage,
      setupTips: ["Arrange by procedure sequence", "Check sharp cutting edges", "Ensure all sizes available", "Test power tool connections", "Organize implant-specific tools separately"]
    },
    "Cardiovascular set": {
      name: "Cardiovascular Surgery Set",
      category: "Basic Set",
      description: "Specialized instruments for cardiac and vascular surgical procedures requiring precision and hemostasis",
      contents: ["Vascular clamps", "Cardiovascular scissors", "DeBakey forceps", "Potts scissors", "Aortic punches", "Valve retractors"],
      usage: "Essential for cardiac surgeries, bypass procedures, valve replacements, and major vascular operations",
      specifications: "Precision-machined, atraumatic tips, spring-loaded handles, various jaw configurations for different vessel sizes",
      image: harmonicScalpelImage,
      setupTips: ["Handle with extreme care", "Check clamp alignment", "Test spring mechanisms", "Organize by vessel size", "Have multiple backup instruments"]
    },
    "Craniotomy set": {
      name: "Craniotomy Instrument Set",
      category: "Basic Set",
      description: "Specialized neurosurgical instruments for cranial procedures requiring precision and brain tissue protection",
      contents: ["Cranial rongeurs", "Brain spatulas", "Micro scissors", "Bipolar forceps", "Suction devices", "Hemostatic clips"],
      usage: "Primary set for neurosurgical procedures including tumor resection, aneurysm clipping, and brain tissue manipulation",
      specifications: "Ultra-precise construction, minimal magnetic interference, ergonomic handles, various tip configurations",
      image: harmonicScalpelImage,
      setupTips: ["Handle with ultimate care", "Check bipolar function", "Test suction systems", "Organize micro instruments", "Maintain sterile field integrity"]
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