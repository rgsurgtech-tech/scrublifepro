export const batch2Procedures = [
  // Colorectal Surgery (15 procedures)
  {
    name: "Low Anterior Resection (LAR)",
    specialty: "Colorectal Surgery",
    description: "Resection of rectosigmoid colon with colorectal or coloanal anastomosis",
    duration: "180-300 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Modified lithotomy with split legs", "Arms tucked at sides", "Steep Trendelenburg", "Sequential compression devices applied", "Foley catheter insertion"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to mid-thighs and perineum", "Four corner drapes", "Laparoscopic drape with perineal access"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set", "Laparoscopic tower"],
      specialInstruments: ["Circular stapler (EEA)", "Linear staplers", "Energy device", "Self-retaining retractor"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Colorectal resection with stapling devices ready",
      essentials: ["Laparoscopic instruments", "Staplers", "Bowel clamps", "Suction", "Specimen bag"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Port Placement", description: "Insert laparoscopic ports", instruments: ["Trocars", "Veress needle"] },
        { step: 2, title: "Mobilization", description: "Mobilize left colon and splenic flexure", instruments: ["Energy device", "Graspers"] },
        { step: 3, title: "Vascular Division", description: "Ligate IMA with preservation of left colic", instruments: ["Vascular stapler or clips"] },
        { step: 4, title: "Rectal Mobilization", description: "Total mesorectal excision (TME)", instruments: ["Energy device", "Scissors"] },
        { step: 5, title: "Division", description: "Divide proximal colon and distal rectum", instruments: ["Linear staplers"] },
        { step: 6, title: "Anastomosis", description: "Create colorectal anastomosis with circular stapler", instruments: ["EEA stapler"] },
        { step: 7, title: "Testing", description: "Air leak test of anastomosis", instruments: ["Air insufflation", "Saline"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin + Metronidazole", use: "Prophylaxis", amount: "2g + 500mg IV" },
        { name: "Normal Saline", use: "Irrigation", amount: "2000mL" },
        { name: "Heparin", use: "DVT prophylaxis", amount: "5000 units SQ" }
      ]
    },
    complications: ["Anastomotic leak", "Pelvic abscess", "Urinary dysfunction", "Sexual dysfunction", "Bowel obstruction"],
    tips: ["TME technique critical for oncologic outcomes", "Adequate distal margin essential", "Consider diverting loop ileostomy for low anastomosis", "Identify and protect ureters"]
  },
  {
    name: "Right Hemicolectomy",
    specialty: "Colorectal Surgery",
    description: "Resection of right colon with ileocolic anastomosis",
    duration: "120-180 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arms tucked at sides", "Slight reverse Trendelenburg", "SCDs applied"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to groin", "Four corner drapes", "Laparoscopic or open drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set", "Laparoscopic tower"],
      specialInstruments: ["Linear staplers", "Energy device", "Bowel clamps"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Right colectomy instruments organized",
      essentials: ["Staplers", "Graspers", "Energy device", "Bowel instruments"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Access", description: "Laparoscopic or open approach", instruments: ["Trocars or scalpel"] },
        { step: 2, title: "Mobilization", description: "Mobilize right colon and hepatic flexure", instruments: ["Energy device", "Graspers"] },
        { step: 3, title: "Vascular Control", description: "Ligate ileocolic and right colic vessels", instruments: ["Vascular stapler or clips"] },
        { step: 4, title: "Division", description: "Divide terminal ileum and transverse colon", instruments: ["Linear staplers"] },
        { step: 5, title: "Extraction", description: "Remove specimen through enlarged port or incision", instruments: ["Specimen bag"] },
        { step: 6, title: "Anastomosis", description: "Create ileocolic anastomosis", instruments: ["Staplers or hand-sewn"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin + Metronidazole", use: "Prophylaxis", amount: "2g + 500mg IV" },
        { name: "Normal Saline", use: "Irrigation", amount: "1000mL" }
      ]
    },
    complications: ["Anastomotic leak", "Ileus", "Wound infection", "Intra-abdominal abscess", "Bleeding"],
    tips: ["Complete mobilization prevents tension", "Ensure adequate blood supply to anastomosis", "Examine entire colon for synchronous lesions", "Send lymph nodes with specimen"]
  },
  {
    name: "Abdominoperineal Resection (APR)",
    specialty: "Colorectal Surgery",
    description: "Removal of rectum and anus with permanent colostomy for low rectal cancer",
    duration: "240-360 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Modified lithotomy", "Arms tucked", "Steep Trendelenburg for abdominal phase", "Prone jackknife for perineal phase (or simultaneous approach)"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep abdomen and perineum", "Separate abdominal and perineal fields if sequential", "Four corner drapes", "Perineal drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set", "Laparoscopic tower", "Perineal set"],
      specialInstruments: ["Linear staplers", "Energy device", "Self-retaining retractors"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Dual setup for abdominal and perineal phases",
      essentials: ["Laparoscopic instruments", "Staplers", "Perineal instruments", "Ostomy supplies"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Abdominal Phase", description: "Mobilize colon, ligate IMA, TME to levators", instruments: ["Laparoscopic instruments", "Energy device"] },
        { step: 2, title: "Colostomy Creation", description: "Mature end colostomy in LLQ", instruments: ["Bowel clamp", "Suture"] },
        { step: 3, title: "Perineal Phase", description: "Circumferential incision around anus", instruments: ["Scalpel", "Electrocautery"] },
        { step: 4, title: "Specimen Removal", description: "Complete TME and remove specimen", instruments: ["Retractors", "Energy device"] },
        { step: 5, title: "Perineal Closure", description: "Primary or omental flap closure of pelvis", instruments: ["Absorbable suture", "Drains"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin + Metronidazole", use: "Prophylaxis", amount: "2g + 500mg IV" },
        { name: "Normal Saline", use: "Irrigation", amount: "2000mL" }
      ]
    },
    complications: ["Perineal wound complications", "Presacral hemorrhage", "Urinary dysfunction", "Sexual dysfunction", "Phantom rectal pain"],
    tips: ["Cylindrical vs extralevator APR based on tumor location", "Omental flap reduces perineal complications", "Consider pre-op radiation", "Drain presacral space"]
  },
  {
    name: "Total Proctocolectomy with IPAA (J-Pouch)",
    specialty: "Colorectal Surgery",
    description: "Complete removal of colon and rectum with ileal pouch-anal anastomosis",
    duration: "300-420 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Modified lithotomy", "Arms tucked", "Steep Trendelenburg", "SCDs applied"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to mid-thighs and perineum", "Four corner drapes", "Laparoscopic drape with perineal access"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set", "Laparoscopic tower"],
      specialInstruments: ["Linear staplers (75-100mm)", "Circular stapler", "Energy device"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Complex pouch construction instruments",
      essentials: ["Multiple staplers", "Bowel clamps", "Energy device", "Suction"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Total Colectomy", description: "Remove entire colon", instruments: ["Laparoscopic instruments", "Staplers"] },
        { step: 2, title: "Rectal Dissection", description: "TME to pelvic floor", instruments: ["Energy device"] },
        { step: 3, title: "Mucosectomy", description: "Remove rectal mucosa from dentate line", instruments: ["Electrocautery", "Scissors"] },
        { step: 4, title: "J-Pouch Creation", description: "Create 15cm J-pouch from terminal ileum", instruments: ["Linear staplers"] },
        { step: 5, title: "Pouch-Anal Anastomosis", description: "Hand-sewn anastomosis to dentate line", instruments: ["Absorbable suture"] },
        { step: 6, title: "Diverting Ileostomy", description: "Create temporary loop ileostomy", instruments: ["Bowel clamp", "Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin + Metronidazole", use: "Prophylaxis", amount: "2g + 500mg IV" },
        { name: "Normal Saline", use: "Irrigation", amount: "2000mL" }
      ]
    },
    complications: ["Pouchitis", "Pouch failure", "Anastomotic leak", "Bowel obstruction", "Sexual and urinary dysfunction"],
    tips: ["Adequate pouch length critical", "Meticulous hemostasis in pouch", "Diverting ileostomy routine", "Patient selection important"]
  },
  {
    name: "Hartmann's Procedure",
    specialty: "Colorectal Surgery",
    description: "Sigmoid resection with end colostomy and rectal stump closure",
    duration: "120-180 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine or modified lithotomy", "Arms tucked", "Trendelenburg position", "SCDs applied"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to groin", "Four corner drapes", "Laparotomy drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set"],
      specialInstruments: ["Linear staplers", "Bowel clamps", "Self-retaining retractor"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Emergency colorectal resection setup",
      essentials: ["Staplers", "Bowel instruments", "Suction", "Ostomy supplies"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Laparotomy", description: "Midline incision and exploration", instruments: ["Scalpel", "Retractors"] },
        { step: 2, title: "Mobilization", description: "Mobilize sigmoid and descending colon", instruments: ["Electrocautery", "Scissors"] },
        { step: 3, title: "Vascular Control", description: "Ligate IMA or sigmoid vessels", instruments: ["Clamps", "Ties"] },
        { step: 4, title: "Resection", description: "Divide sigmoid and rectum", instruments: ["Linear staplers"] },
        { step: 5, title: "End Colostomy", description: "Mature end colostomy in LLQ", instruments: ["Bowel clamp", "Suture"] },
        { step: 6, title: "Rectal Stump", description: "Close rectal stump and irrigate pelvis", instruments: ["Stapler or suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Broad-spectrum antibiotics", use: "Emergency prophylaxis", amount: "Cefazolin + Metronidazole" },
        { name: "Normal Saline", use: "Irrigation", amount: "2000mL" }
      ]
    },
    complications: ["Rectal stump blowout", "Pelvic abscess", "Wound infection", "Colostomy complications", "Difficulty with reversal"],
    tips: ["Emergency procedure for perforation/obstruction", "Drain pelvis", "Mark stoma site preoperatively", "Plan reversal in 3-6 months"]
  },
  {
    name: "Colostomy Reversal (Hartmann's Reversal)",
    specialty: "Colorectal Surgery",
    description: "Restoration of bowel continuity after Hartmann's procedure",
    duration: "150-240 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine or modified lithotomy", "Arms tucked", "Trendelenburg position", "SCDs applied"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to groin including stoma", "Four corner drapes", "Laparotomy drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set"],
      specialInstruments: ["Circular or linear staplers", "Energy device", "Adhesiolysis instruments"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Adhesiolysis and anastomosis instruments",
      essentials: ["Staplers", "Energy device", "Bowel clamps", "Suction"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Colostomy Mobilization", description: "Free colostomy from abdominal wall", instruments: ["Scalpel", "Electrocautery"] },
        { step: 2, title: "Laparotomy", description: "Enter abdomen via midline or existing scar", instruments: ["Scalpel"] },
        { step: 3, title: "Adhesiolysis", description: "Extensive lysis of adhesions", instruments: ["Scissors", "Energy device"] },
        { step: 4, title: "Rectal Stump Identification", description: "Identify and mobilize rectal stump", instruments: ["Palpation", "Graspers"] },
        { step: 5, title: "Anastomosis", description: "Create colorectal anastomosis", instruments: ["EEA or linear stapler"] },
        { step: 6, title: "Leak Test", description: "Air leak test and closure", instruments: ["Air insufflation", "Saline"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin + Metronidazole", use: "Prophylaxis", amount: "2g + 500mg IV" },
        { name: "Normal Saline", use: "Irrigation", amount: "2000mL" }
      ]
    },
    complications: ["Anastomotic leak", "Bowel injury during adhesiolysis", "Prolonged ileus", "Pelvic abscess", "Inability to complete reversal"],
    tips: ["Extensive adhesions common", "Pre-op contrast enema to locate rectal stump", "Consider diverting loop ileostomy", "May need laparoscopic assistance"]
  },
  {
    name: "Hemorrhoidectomy (Excisional)",
    specialty: "Colorectal Surgery",
    description: "Surgical excision of hemorrhoidal tissue",
    duration: "30-60 min",
    difficulty: "Basic",
    positioning: {
      title: "Patient Positioning",
      steps: ["Prone jackknife position", "Buttocks taped apart", "Foam padding under hips"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Perineal prep", "Fenestrated drape exposing anus"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Anorectal instrument set"],
      specialInstruments: ["Ferguson retractor", "Harmonic scalpel or electrocautery", "Anoscope"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Anorectal instruments ready",
      essentials: ["Anoscope", "Retractors", "Harmonic scalpel", "Sutures"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Examination", description: "Anoscopic examination", instruments: ["Anoscope"] },
        { step: 2, title: "Excision", description: "Excise hemorrhoidal columns", instruments: ["Harmonic scalpel", "Electrocautery"] },
        { step: 3, title: "Hemostasis", description: "Achieve meticulous hemostasis", instruments: ["Electrocautery", "Ties"] },
        { step: 4, title: "Closure", description: "Leave wounds open or partially closed", instruments: ["Absorbable suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Lidocaine with epinephrine", use: "Local anesthesia and hemostasis", amount: "20-30mL" },
        { name: "Marcaine", use: "Long-acting analgesia", amount: "10mL" }
      ]
    },
    complications: ["Pain", "Bleeding", "Urinary retention", "Infection", "Anal stenosis", "Incontinence"],
    tips: ["Preserve anoderm bridges", "Avoid excising too much tissue", "Post-op stool softeners essential", "Sitz baths for comfort"]
  },
  {
    name: "Anal Fistulotomy",
    specialty: "Colorectal Surgery",
    description: "Surgical treatment of anal fistula by laying it open",
    duration: "20-45 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Prone jackknife position", "Buttocks taped apart"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Perineal prep", "Fenestrated drape exposing anus"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Anorectal set"],
      specialInstruments: ["Fistula probe", "Anoscope", "Electrocautery"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Fistula instruments organized",
      essentials: ["Fistula probe", "Scalpel", "Electrocautery", "Curettes"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Examination", description: "Identify internal and external openings", instruments: ["Anoscope", "Palpation"] },
        { step: 2, title: "Probing", description: "Probe fistula tract", instruments: ["Fistula probe"] },
        { step: 3, title: "Fistulotomy", description: "Lay open fistula tract", instruments: ["Scalpel", "Electrocautery"] },
        { step: 4, title: "Curettage", description: "Curette tract and achieve hemostasis", instruments: ["Curette", "Electrocautery"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Lidocaine with epinephrine", use: "Local anesthesia", amount: "10-20mL" },
        { name: "Marcaine", use: "Long-acting analgesia", amount: "10mL" }
      ]
    },
    complications: ["Incontinence if sphincter divided", "Recurrence", "Bleeding", "Infection", "Delayed healing"],
    tips: ["Identify tract carefully", "Don't divide too much sphincter", "Low fistulas safe for fistulotomy", "Consider seton for high fistulas"]
  },
  {
    name: "Laparoscopic Ventral Hernia Repair",
    specialty: "Colorectal Surgery",
    description: "Minimally invasive repair of ventral or incisional hernia with mesh",
    duration: "90-150 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arms tucked", "Reverse Trendelenburg or flat"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to groin", "Four corner drapes", "Laparoscopic drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Laparoscopic tower"],
      specialInstruments: ["Trocars", "Graspers", "Mesh (composite)", "Tack fixation device", "Transfascial sutures"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Laparoscopic hernia instruments",
      essentials: ["Trocars", "Graspers", "Mesh", "Fixation devices", "Sutures"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Port Placement", description: "Insert lateral ports away from hernia", instruments: ["Trocars", "Veress needle"] },
        { step: 2, title: "Adhesiolysis", description: "Lyse adhesions and reduce hernia contents", instruments: ["Scissors", "Energy device"] },
        { step: 3, title: "Hernia Sizing", description: "Measure defect and select mesh size", instruments: ["Ruler"] },
        { step: 4, title: "Mesh Placement", description: "Position mesh with 5cm overlap", instruments: ["Graspers"] },
        { step: 5, title: "Fixation", description: "Fix mesh with tacks and transfascial sutures", instruments: ["Tack device", "Suture passer"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Normal Saline", use: "Irrigation", amount: "500mL" }
      ]
    },
    complications: ["Recurrence", "Seroma", "Mesh infection", "Bowel injury", "Chronic pain"],
    tips: ["Adequate mesh overlap essential", "Defect closure controversial", "Combine tacks and transfascial sutures", "Consider component separation for large defects"]
  },
  {
    name: "Pilonidal Cyst Excision",
    specialty: "Colorectal Surgery",
    description: "Excision of pilonidal sinus with healing by secondary intention or closure",
    duration: "30-60 min",
    difficulty: "Basic",
    positioning: {
      title: "Patient Positioning",
      steps: ["Prone jackknife position", "Buttocks taped apart"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Sacral and gluteal prep", "Fenestrated drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Minor procedure set"],
      specialInstruments: ["Electrocautery", "Curettes", "Probes"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Simple excision instruments",
      essentials: ["Scalpel", "Electrocautery", "Curettes", "Sutures if primary closure"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Marking", description: "Mark extent of disease with methylene blue", instruments: ["Methylene blue", "Probe"] },
        { step: 2, title: "Excision", description: "Excise all sinus tracts and pits", instruments: ["Scalpel", "Electrocautery"] },
        { step: 3, title: "Hemostasis", description: "Achieve hemostasis", instruments: ["Electrocautery"] },
        { step: 4, title: "Closure Decision", description: "Leave open or primary closure", instruments: ["Absorbable suture or packing"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Lidocaine with epinephrine", use: "Local anesthesia", amount: "20mL" },
        { name: "Methylene blue", use: "Tract identification", amount: "5mL" }
      ]
    },
    complications: ["Recurrence", "Wound infection", "Delayed healing", "Chronic draining sinus"],
    tips: ["Remove all hair from wound", "Secondary intention has lower recurrence", "Laser hair removal post-op", "Hygiene education critical"]
  },
  {
    name: "Sigmoid Colectomy for Diverticulitis",
    specialty: "Colorectal Surgery",
    description: "Resection of sigmoid colon for complicated diverticular disease",
    duration: "150-240 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine or modified lithotomy", "Arms tucked", "Trendelenburg", "SCDs applied"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to groin", "Four corner drapes", "Laparoscopic drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set", "Laparoscopic tower"],
      specialInstruments: ["Linear staplers", "Energy device", "Circular stapler"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Sigmoid resection instruments",
      essentials: ["Laparoscopic instruments", "Staplers", "Energy device"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Port Placement", description: "Insert laparoscopic ports", instruments: ["Trocars"] },
        { step: 2, title: "Mobilization", description: "Mobilize sigmoid and splenic flexure", instruments: ["Energy device", "Graspers"] },
        { step: 3, title: "Vascular Control", description: "Ligate IMA or sigmoid vessels", instruments: ["Vascular stapler or clips"] },
        { step: 4, title: "Division", description: "Divide descending colon and upper rectum", instruments: ["Linear staplers"] },
        { step: 5, title: "Anastomosis", description: "Create colorectal anastomosis", instruments: ["EEA or linear stapler"] },
        { step: 6, title: "Leak Test", description: "Test anastomosis integrity", instruments: ["Air insufflation", "Saline"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin + Metronidazole", use: "Prophylaxis", amount: "2g + 500mg IV" },
        { name: "Normal Saline", use: "Irrigation", amount: "2000mL" }
      ]
    },
    complications: ["Anastomotic leak", "Abscess", "Ureteral injury", "Bladder injury", "Bowel obstruction"],
    tips: ["Resect to proximal rectum for adequate margin", "Identify ureters", "Consider on-table colonoscopy", "Drain pelvis if inflammation severe"]
  },
  {
    name: "Rectal Prolapse Repair (Ventral Rectopexy)",
    specialty: "Colorectal Surgery",
    description: "Laparoscopic anterior mesh rectopexy for full-thickness rectal prolapse",
    duration: "120-180 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine or modified lithotomy", "Arms tucked", "Steep Trendelenburg", "SCDs applied"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to perineum", "Four corner drapes", "Laparoscopic drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Laparoscopic tower"],
      specialInstruments: ["Mesh", "Tack fixation device", "Suture passer", "Energy device"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Rectopexy instruments ready",
      essentials: ["Laparoscopic instruments", "Mesh", "Fixation devices", "Sutures"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Port Placement", description: "Insert laparoscopic ports", instruments: ["Trocars"] },
        { step: 2, title: "Rectal Mobilization", description: "Mobilize anterior and lateral rectum", instruments: ["Energy device", "Scissors"] },
        { step: 3, title: "Mesh Placement", description: "Position mesh on anterior rectum", instruments: ["Graspers"] },
        { step: 4, title: "Mesh Fixation", description: "Fix mesh to sacral promontory and rectum", instruments: ["Tack device", "Sutures"] },
        { step: 5, title: "Peritoneal Closure", description: "Close peritoneum over mesh", instruments: ["Absorbable suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin + Metronidazole", use: "Prophylaxis", amount: "2g + 500mg IV" },
        { name: "Normal Saline", use: "Irrigation", amount: "1000mL" }
      ]
    },
    complications: ["Recurrence", "Constipation", "Mesh erosion", "Presacral hemorrhage", "Urinary dysfunction"],
    tips: ["Avoid posterior dissection to preserve nerves", "Adequate rectal mobilization essential", "Non-absorbable mesh preferred", "Cover mesh with peritoneum"]
  },
  {
    name: "Ileostomy Creation",
    specialty: "Colorectal Surgery",
    description: "Creation of temporary or permanent ileostomy",
    duration: "30-60 min",
    difficulty: "Basic",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Access to right lower quadrant"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep abdomen including marked stoma site", "Four corner drapes"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set"],
      specialInstruments: ["Bowel clamps", "Ostomy rod or bridge (if loop)"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Ostomy creation instruments",
      essentials: ["Scalpel", "Bowel clamps", "Sutures", "Retractors"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Site Selection", description: "Identify pre-marked stoma site in RLQ", instruments: ["Skin marker"] },
        { step: 2, title: "Trephine", description: "Create circular skin incision", instruments: ["Scalpel"] },
        { step: 3, title: "Fascial Opening", description: "Open fascia crucially", instruments: ["Scissors"] },
        { step: 4, title: "Bowel Exteriorization", description: "Bring ileum through abdominal wall", instruments: ["Babcock clamp"] },
        { step: 5, title: "Maturation", description: "Mature ileostomy with everted spout", instruments: ["Absorbable sutures"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis if part of larger case", amount: "2g IV" }
      ]
    },
    complications: ["Stomal necrosis", "Retraction", "Prolapse", "Parastomal hernia", "High output", "Skin irritation"],
    tips: ["Mark site preoperatively with ostomy nurse", "Adequate spout length (2-3cm)", "Ensure mesentery not twisted", "Size fascial opening to fit 2 fingers"]
  },
  {
    name: "Ileostomy Reversal",
    specialty: "Colorectal Surgery",
    description: "Closure of temporary loop ileostomy and restoration of continuity",
    duration: "60-90 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arms tucked"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep abdomen including stoma", "Four corner drapes"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set"],
      specialInstruments: ["Linear staplers or hand-sewn instruments", "Bowel clamps"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Ileostomy reversal instruments",
      essentials: ["Staplers or sutures", "Bowel clamps", "Retractors"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Circumferential Incision", description: "Incise around stoma", instruments: ["Scalpel"] },
        { step: 2, title: "Mobilization", description: "Free ileum from abdominal wall", instruments: ["Scissors", "Electrocautery"] },
        { step: 3, title: "Exteriorization", description: "Deliver ileum into wound", instruments: ["Babcock clamp"] },
        { step: 4, title: "Anastomosis", description: "Create ileocolic anastomosis", instruments: ["Staplers or hand-sewn"] },
        { step: 5, title: "Closure", description: "Return bowel and close fascia", instruments: ["Absorbable suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Normal Saline", use: "Irrigation", amount: "500mL" }
      ]
    },
    complications: ["Anastomotic leak", "Bowel obstruction", "Wound infection", "Ileus"],
    tips: ["Confirm distal anastomosis healed", "Excise matured stoma", "Can usually be done locally without laparotomy", "Low complication rate"]
  },
  {
    name: "Colonoscopy with Polypectomy",
    specialty: "Colorectal Surgery",
    description: "Endoscopic removal of colon polyps",
    duration: "30-60 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Left lateral decubitus", "May turn supine during procedure"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Minimal draping", "Pad under patient"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Colonoscope"],
      specialInstruments: ["Snares", "Biopsy forceps", "Argon plasma coagulation", "Clips"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Endoscopic accessories ready",
      essentials: ["Snares", "Forceps", "Clips", "Injection needle"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Scope Insertion", description: "Advance colonoscope to cecum", instruments: ["Colonoscope"] },
        { step: 2, title: "Inspection", description: "Systematically inspect colon on withdrawal", instruments: ["Colonoscope"] },
        { step: 3, title: "Polyp Identification", description: "Identify and characterize polyps", instruments: ["Colonoscope with imaging"] },
        { step: 4, title: "Polypectomy", description: "Remove polyps with snare or forceps", instruments: ["Snare", "Electrocautery"] },
        { step: 5, title: "Retrieval", description: "Retrieve specimens for pathology", instruments: ["Polyp trap"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Propofol", use: "Sedation", amount: "Per anesthesia" },
        { name: "Saline with epinephrine", use: "Submucosal injection for large polyps", amount: "As needed" }
      ]
    },
    complications: ["Perforation", "Bleeding", "Post-polypectomy syndrome", "Incomplete polyp resection"],
    tips: ["Adequate bowel prep essential", "Inject large polyps for safer resection", "Clip if concerned about perforation", "EMR or ESD for large lesions"]
  },

  // Surgical Oncology (15 procedures)
  {
    name: "Wide Local Excision of Melanoma",
    specialty: "Surgical Oncology",
    description: "Wide excision of melanoma with appropriate margins based on Breslow depth",
    duration: "60-120 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Position based on melanoma location", "Ensure access for reconstruction", "Arms positioned appropriately"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Wide prep around lesion", "Mark margins before prep", "Sterile drape with adequate exposure"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Minor or major procedure set"],
      specialInstruments: ["Skin hooks", "Electrocautery", "Measure for margins"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Oncologic excision instruments",
      essentials: ["Scalpel", "Ruler", "Skin hooks", "Retractors", "Sutures"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Margin Marking", description: "Mark appropriate margins (1-2cm based on depth)", instruments: ["Ruler", "Marking pen"] },
        { step: 2, title: "Excision", description: "Full-thickness excision to fascia", instruments: ["Scalpel"] },
        { step: 3, title: "Specimen Orientation", description: "Orient specimen for pathology", instruments: ["Sutures", "Skin marker"] },
        { step: 4, title: "Hemostasis", description: "Achieve hemostasis", instruments: ["Electrocautery"] },
        { step: 5, title: "Closure", description: "Primary closure or flap/graft reconstruction", instruments: ["Sutures"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Lidocaine with epinephrine", use: "Local anesthesia (if local)", amount: "As needed" },
        { name: "Cefazolin", use: "Prophylaxis if reconstruction", amount: "2g IV" }
      ]
    },
    complications: ["Wound dehiscence", "Seroma", "Infection", "Positive margins requiring re-excision", "Skin graft loss"],
    tips: ["Know Breslow depth before excision", "Consider sentinel node biopsy", "Orient specimen carefully", "Plan reconstruction before excision"]
  },
  {
    name: "Sentinel Lymph Node Biopsy (Melanoma/Breast)",
    specialty: "Surgical Oncology",
    description: "Identification and removal of sentinel lymph node(s) for staging",
    duration: "45-90 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Position based on primary tumor location", "Access to nodal basin required"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep primary site and nodal basin", "Wide sterile field"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Minor procedure set"],
      specialInstruments: ["Gamma probe", "Blue dye", "Fine instruments"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Delicate lymph node dissection",
      essentials: ["Gamma probe", "Fine scissors", "Clamps", "Vessel loops"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Injection", description: "Inject radiocolloid (preop) and blue dye (intraop)", instruments: ["Syringe", "Technetium-99", "Blue dye"] },
        { step: 2, title: "Lymphoscintigraphy", description: "Pre-op imaging to identify nodal basin", instruments: ["Nuclear medicine camera"] },
        { step: 3, title: "Incision", description: "Incision over hot spot", instruments: ["Scalpel"] },
        { step: 4, title: "Node Identification", description: "Identify blue and/or hot node", instruments: ["Gamma probe", "Visual inspection"] },
        { step: 5, title: "Excision", description: "Remove sentinel node(s)", instruments: ["Fine scissors", "Clamps"] },
        { step: 6, title: "Ex Vivo Counts", description: "Confirm node hot ex vivo", instruments: ["Gamma probe"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Technetium-99 sulfur colloid", use: "Radiotracer", amount: "0.5-1.0 mCi" },
        { name: "Isosulfan blue dye", use: "Visual identification", amount: "1-5mL" },
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" }
      ]
    },
    complications: ["False negative", "Blue dye anaphylaxis", "Seroma", "Lymphedema (rare)", "Nerve injury"],
    tips: ["Both blue dye and radiocolloid increase detection", "Multiple nodes may be sentinel", "Warn patient about blue urine", "Send for frozen section if indicated"]
  },
  {
    name: "Modified Radical Mastectomy",
    specialty: "Surgical Oncology",
    description: "Removal of breast tissue and axillary lymph nodes for breast cancer",
    duration: "120-180 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Ipsilateral arm abducted on arm board", "Slight reverse Trendelenburg"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from clavicle to umbilicus, shoulder to midline", "Circumferential arm prep", "Sterile drape exposing operative field"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set", "Mastectomy set"],
      specialInstruments: ["Electrocautery", "Self-retaining retractors", "Closed suction drains"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Mastectomy and axillary dissection instruments",
      essentials: ["Scalpel", "Electrocautery", "Retractors", "Clamps", "Drains"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Incision", description: "Elliptical incision encompassing nipple and previous biopsy site", instruments: ["Scalpel"] },
        { step: 2, title: "Flap Creation", description: "Develop skin flaps to clavicle, sternum, latissimus, rectus", instruments: ["Electrocautery", "Scissors"] },
        { step: 3, title: "Breast Removal", description: "Remove breast from pectoralis fascia", instruments: ["Electrocautery"] },
        { step: 4, title: "Axillary Dissection", description: "Level I and II lymph node dissection", instruments: ["Scissors", "Clamps", "Clips"] },
        { step: 5, title: "Hemostasis", description: "Meticulous hemostasis", instruments: ["Electrocautery", "Ties"] },
        { step: 6, title: "Drain Placement", description: "Place closed suction drains and close", instruments: ["Jackson-Pratt drains", "Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Normal Saline", use: "Irrigation", amount: "1000mL" }
      ]
    },
    complications: ["Seroma", "Hematoma", "Wound infection", "Lymphedema", "Nerve injury (long thoracic, thoracodorsal)"],
    tips: ["Thin flaps reduce seroma", "Preserve long thoracic and thoracodorsal nerves", "Drains until output <30mL/day", "Mark specimen orientation"]
  },
  {
    name: "Partial Mastectomy (Lumpectomy)",
    specialty: "Surgical Oncology",
    description: "Breast-conserving surgery with tumor excision and negative margins",
    duration: "45-90 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Ipsilateral arm abducted", "Roll under shoulder if needed"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep entire breast", "Sterile drape with breast exposed"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Minor or major procedure set"],
      specialInstruments: ["Electrocautery", "Skin hooks", "Specimen radiography capability"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Breast conservation instruments",
      essentials: ["Scalpel", "Electrocautery", "Retractors", "Sutures"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Localization", description: "Wire localization if non-palpable", instruments: ["Wire", "Mammography"] },
        { step: 2, title: "Incision", description: "Cosmetic incision over or near tumor", instruments: ["Scalpel"] },
        { step: 3, title: "Excision", description: "Excise tumor with margin of normal tissue", instruments: ["Electrocautery", "Scissors"] },
        { step: 4, title: "Specimen Imaging", description: "Radiograph specimen to confirm wire/calcifications", instruments: ["Specimen radiography"] },
        { step: 5, title: "Margin Assessment", description: "Orient specimen, ink margins, send for frozen if indicated", instruments: ["Sutures", "Ink"] },
        { step: 6, title: "Closure", description: "Re-approximate breast tissue and close skin", instruments: ["Absorbable suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Lidocaine with epinephrine", use: "Local anesthesia and hemostasis", amount: "As needed" },
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" }
      ]
    },
    complications: ["Positive margins requiring re-excision", "Poor cosmesis", "Hematoma", "Infection", "Fat necrosis"],
    tips: ["Oncoplastic techniques improve cosmesis", "Orient specimen with sutures", "Cavity shave margins reduce re-excision", "Clip cavity for radiation planning"]
  },
  {
    name: "Axillary Lymph Node Dissection",
    specialty: "Surgical Oncology",
    description: "Removal of level I, II, and sometimes III axillary lymph nodes",
    duration: "60-120 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arm abducted 90 degrees on arm board"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from clavicle to costal margin, midline to posterior axillary line", "Circumferential arm prep", "Sterile drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set"],
      specialInstruments: ["Electrocautery", "Vessel loops", "Clips", "Closed suction drain"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Axillary dissection instruments",
      essentials: ["Scissors", "Clamps", "Clips", "Vessel loops", "Retractors"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Incision", description: "Transverse or S-shaped axillary incision", instruments: ["Scalpel"] },
        { step: 2, title: "Flap Development", description: "Develop flaps to expose axilla", instruments: ["Electrocautery"] },
        { step: 3, title: "Nerve Identification", description: "Identify and preserve long thoracic and thoracodorsal nerves", instruments: ["Scissors", "Vessel loops"] },
        { step: 4, title: "Node Dissection", description: "Remove level I and II nodes en bloc", instruments: ["Scissors", "Clips"] },
        { step: 5, title: "Hemostasis", description: "Achieve meticulous hemostasis", instruments: ["Electrocautery", "Clips"] },
        { step: 6, title: "Drain & Closure", description: "Place drain and close", instruments: ["Jackson-Pratt drain", "Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Normal Saline", use: "Irrigation", amount: "500mL" }
      ]
    },
    complications: ["Lymphedema", "Seroma", "Nerve injury (winged scapula, arm weakness)", "Numbness", "Restricted shoulder mobility"],
    tips: ["Preserve motor nerves", "Ligate tributaries to axillary vein carefully", "Drain until <30mL/day", "Early shoulder PT to prevent frozen shoulder"]
  },
  {
    name: "Soft Tissue Sarcoma Resection",
    specialty: "Surgical Oncology",
    description: "Wide excision of soft tissue sarcoma with margins and compartmental resection",
    duration: "120-300 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Position based on tumor location", "Ensure access for wide excision", "Tourniquet for extremity if appropriate"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Wide prep beyond anticipated margins", "Sterile drape with large exposure"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set", "Vascular set if needed"],
      specialInstruments: ["Oscillating saw if bone involved", "Electrocautery", "Large retractors"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Oncologic resection instruments",
      essentials: ["Scalpel", "Electrocautery", "Retractors", "Vascular instruments"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Planning", description: "Pre-op MRI to plan resection and critical structures", instruments: ["MRI images"] },
        { step: 2, title: "Incision", description: "Incision encompassing biopsy tract", instruments: ["Scalpel"] },
        { step: 3, title: "Wide Excision", description: "En bloc resection with negative margins", instruments: ["Scalpel", "Electrocautery"] },
        { step: 4, title: "Vascular/Nerve Management", description: "Protect or resect/reconstruct vessels and nerves", instruments: ["Vascular instruments", "Nerve stimulator"] },
        { step: 5, title: "Specimen Orientation", description: "Orient specimen for pathology", instruments: ["Sutures", "Marking"] },
        { step: 6, title: "Reconstruction", description: "Flap reconstruction if needed", instruments: ["Plastic surgery instruments"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Tranexamic acid", use: "Reduce bleeding", amount: "1g IV" }
      ]
    },
    complications: ["Positive margins", "Wound complications", "Vascular injury", "Nerve injury", "Limb dysfunction", "Local recurrence"],
    tips: ["Multidisciplinary planning essential", "Don't violate tumor capsule", "Consider radiation therapy", "Plastic surgery collaboration for reconstruction"]
  },
  {
    name: "Whipple Procedure (Pancreaticoduodenectomy)",
    specialty: "Surgical Oncology",
    description: "Removal of pancreatic head, duodenum, and portions of bile duct and stomach",
    duration: "360-540 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arms extended on arm boards", "Foley catheter and NG tube", "Epidural for post-op pain"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to groin", "Wide sterile field", "Laparotomy drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set", "Vascular set", "GI set"],
      specialInstruments: ["Self-retaining retractor", "Vascular clamps", "Linear staplers"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Complex hepatobiliary instruments",
      essentials: ["Vascular instruments", "Clamps", "Staplers", "Multiple sutures"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Exploration", description: "Exclude metastatic disease", instruments: ["Palpation", "Ultrasound"] },
        { step: 2, title: "Kocherization", description: "Mobilize duodenum and pancreatic head", instruments: ["Scissors", "Electrocautery"] },
        { step: 3, title: "Resection", description: "Divide jejunum, stomach, bile duct, pancreas, remove specimen", instruments: ["Staplers", "Scalpel"] },
        { step: 4, title: "Pancreaticojejunostomy", description: "Anastomose pancreas to jejunum", instruments: ["Fine sutures"] },
        { step: 5, title: "Hepaticojejunostomy", description: "Anastomose bile duct to jejunum", instruments: ["Fine sutures"] },
        { step: 6, title: "Gastrojejunostomy", description: "Anastomose stomach to jejunum", instruments: ["Stapler or hand-sewn"] },
        { step: 7, title: "Drains", description: "Place drains near anastomoses", instruments: ["Closed suction drains"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin + Metronidazole", use: "Prophylaxis", amount: "2g + 500mg IV" },
        { name: "Octreotide", use: "Reduce pancreatic fistula", amount: "100mcg TID" },
        { name: "Normal Saline", use: "Irrigation", amount: "2000mL" }
      ]
    },
    complications: ["Pancreatic fistula", "Delayed gastric emptying", "Hemorrhage", "Bile leak", "Abscess", "Diabetes"],
    tips: ["Meticulous technique critical", "Soft pancreas higher fistula risk", "Octreotide may reduce fistula", "High-volume centers have better outcomes"]
  },
  {
    name: "Hepatic Resection (Right Hepatectomy)",
    specialty: "Surgical Oncology",
    description: "Removal of right lobe of liver for malignancy",
    duration: "240-420 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arms extended", "Slight reverse Trendelenburg", "CVP monitoring"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to groin", "Wide sterile field", "Laparotomy drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set", "Vascular set", "Hepatobiliary set"],
      specialInstruments: ["CUSA (cavitron ultrasonic surgical aspirator)", "Vascular clamps", "Pringle clamp", "Argon beam coagulator"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Hepatic resection instruments ready",
      essentials: ["CUSA", "Vascular instruments", "Argon beam", "Hemostatic agents"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Exploration", description: "Assess resectability and metastases", instruments: ["Intraoperative ultrasound"] },
        { step: 2, title: "Mobilization", description: "Mobilize right lobe", instruments: ["Electrocautery", "Scissors"] },
        { step: 3, title: "Vascular Control", description: "Ligate right hepatic artery and portal vein", instruments: ["Vascular clamps", "Ties"] },
        { step: 4, title: "Parenchymal Transection", description: "Transect liver parenchyma", instruments: ["CUSA", "Clamp-crush", "Staplers"] },
        { step: 5, title: "Biliary Division", description: "Divide right hepatic duct", instruments: ["Scissors", "Clips"] },
        { step: 6, title: "Hemostasis", description: "Achieve hemostasis on cut surface", instruments: ["Argon beam", "Surgicel", "Fibrin glue"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Tranexamic acid", use: "Reduce bleeding", amount: "1g IV" },
        { name: "Fresh frozen plasma", use: "Coagulopathy if needed", amount: "As needed" }
      ]
    },
    complications: ["Hemorrhage", "Bile leak", "Hepatic insufficiency", "Post-hepatectomy liver failure", "Abscess"],
    tips: ["Low CVP anesthesia reduces blood loss", "Pringle maneuver for vascular control", "Adequate future liver remnant essential", "Consider portal vein embolization preop"]
  },
  {
    name: "Gastrectomy (Total) for Gastric Cancer",
    specialty: "Surgical Oncology",
    description: "Complete removal of stomach with lymphadenectomy for gastric adenocarcinoma",
    duration: "240-360 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arms extended on arm boards", "Slight reverse Trendelenburg", "NG tube and Foley"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to groin", "Wide sterile field", "Laparotomy drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set", "GI set"],
      specialInstruments: ["Linear staplers", "Energy device", "Self-retaining retractor"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Gastric resection instruments",
      essentials: ["Staplers", "Energy device", "Clamps", "Sutures"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Exploration", description: "Assess for metastatic disease", instruments: ["Palpation"] },
        { step: 2, title: "Mobilization", description: "Mobilize stomach and take down greater and lesser omenta", instruments: ["Energy device", "Scissors"] },
        { step: 3, title: "Lymphadenectomy", description: "D2 lymph node dissection", instruments: ["Scissors", "Clips"] },
        { step: 4, title: "Division", description: "Divide esophagus and duodenum", instruments: ["Linear staplers"] },
        { step: 5, title: "Reconstruction", description: "Roux-en-Y esophagojejunostomy", instruments: ["Stapler or hand-sewn"] },
        { step: 6, title: "Jejunojejunostomy", description: "Create jejunal anastomosis 40cm below", instruments: ["Stapler or hand-sewn"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin + Metronidazole", use: "Prophylaxis", amount: "2g + 500mg IV" },
        { name: "Normal Saline", use: "Irrigation", amount: "1000mL" }
      ]
    },
    complications: ["Anastomotic leak", "Dumping syndrome", "Nutritional deficiencies", "Delayed gastric emptying", "Abscess"],
    tips: ["D2 lymphadenectomy improves staging and survival", "Roux limb 40-50cm to reduce bile reflux", "Feeding jejunostomy often placed", "Nutritional support critical"]
  },
  {
    name: "Esophagectomy (Ivor Lewis)",
    specialty: "Surgical Oncology",
    description: "Two-stage esophagectomy via laparotomy and right thoracotomy",
    duration: "360-540 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine for abdominal phase", "Left lateral decubitus for thoracic phase", "Double lumen endotracheal tube", "Epidural"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep abdomen and chest", "Re-prep and re-drape between phases"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set", "Thoracic set", "GI set"],
      specialInstruments: ["Linear staplers (GI and TA)", "Self-retaining retractors", "Energy device"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Complex esophagectomy setup",
      essentials: ["Staplers", "Thoracic instruments", "Energy device", "Multiple sutures"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Abdominal Phase", description: "Mobilize stomach, create gastric conduit, feeding jejunostomy", instruments: ["Staplers", "Energy device"] },
        { step: 2, title: "Repositioning", description: "Turn patient to left lateral decubitus", instruments: ["Positioning aids"] },
        { step: 3, title: "Thoracotomy", description: "Right thoracotomy 5th intercostal space", instruments: ["Scalpel", "Rib spreader"] },
        { step: 4, title: "Esophageal Mobilization", description: "Mobilize intrathoracic esophagus and lymph nodes", instruments: ["Energy device", "Scissors"] },
        { step: 5, title: "Esophagogastrectomy", description: "Divide esophagus and stomach, remove specimen", instruments: ["Staplers"] },
        { step: 6, title: "Anastomosis", description: "Gastric conduit anastomosis to esophagus", instruments: ["Circular or linear stapler"] },
        { step: 7, title: "Closure", description: "Chest tube, close thoracotomy and abdomen", instruments: ["Chest tube", "Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin + Metronidazole", use: "Prophylaxis", amount: "2g + 500mg IV" },
        { name: "Normal Saline", use: "Irrigation", amount: "2000mL" }
      ]
    },
    complications: ["Anastomotic leak", "Pneumonia", "Recurrent laryngeal nerve injury", "Conduit necrosis", "Chylothorax", "Mortality 3-5%"],
    tips: ["High-volume centers essential", "Nutritional optimization preop", "Early mobilization and pulmonary toilet", "NG tube across anastomosis controversial"]
  },
  {
    name: "Adrenalectomy (Laparoscopic)",
    specialty: "Surgical Oncology",
    description: "Minimally invasive removal of adrenal gland for tumor",
    duration: "90-180 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Lateral decubitus position", "Kidney rest elevated", "Axillary roll", "Flex table"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to iliac crest", "Four corner drapes", "Laparoscopic drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Laparoscopic tower"],
      specialInstruments: ["Trocars", "Laparoscopic instruments", "Ultrasonic shears", "Clips"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Laparoscopic adrenalectomy instruments",
      essentials: ["Trocars", "Graspers", "Ultrasonic shears", "Clips", "Specimen bag"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Port Placement", description: "Insert 3-4 laparoscopic ports", instruments: ["Trocars"] },
        { step: 2, title: "Mobilization", description: "Mobilize colon and expose adrenal", instruments: ["Graspers", "Ultrasonic shears"] },
        { step: 3, title: "Vascular Control", description: "Identify and clip adrenal vein early", instruments: ["Clips", "Ultrasonic shears"] },
        { step: 4, title: "Dissection", description: "Complete circumferential dissection of gland", instruments: ["Ultrasonic shears", "Maryland dissector"] },
        { step: 5, title: "Extraction", description: "Place gland in specimen bag and remove", instruments: ["Endobag"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Stress-dose steroids", use: "If bilateral or Cushing's", amount: "Hydrocortisone 100mg" }
      ]
    },
    complications: ["Bleeding", "Adrenal insufficiency", "Vena cava injury", "Splenic injury", "Pneumothorax"],
    tips: ["Early vascular control critical", "Right side: beware IVC", "Pheochromocytoma: alpha blockade preop", "Conversion to open if needed"]
  },
  {
    name: "Splenectomy (Open) for Hematologic Malignancy",
    specialty: "Surgical Oncology",
    description: "Removal of spleen for lymphoma or other hematologic cancers",
    duration: "90-150 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Left side elevated with roll", "Arms extended"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to groin", "Four corner drapes", "Laparotomy drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set"],
      specialInstruments: ["Large clamps", "Vascular instruments", "Large specimen bag"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Splenectomy instruments ready",
      essentials: ["Large clamps", "Vascular instruments", "Suction", "Lap sponges"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Incision", description: "Left subcostal or midline incision", instruments: ["Scalpel", "Electrocautery"] },
        { step: 2, title: "Mobilization", description: "Mobilize spleen by dividing peritoneal attachments", instruments: ["Electrocautery", "Scissors"] },
        { step: 3, title: "Hilar Control", description: "Ligate splenic artery and vein", instruments: ["Clamps", "Ties", "Stapler"] },
        { step: 4, title: "Short Gastrics", description: "Divide short gastric vessels", instruments: ["Clips", "Harmonic scalpel"] },
        { step: 5, title: "Removal", description: "Remove spleen in specimen bag", instruments: ["Large bag"] },
        { step: 6, title: "Hemostasis", description: "Ensure hemostasis and close", instruments: ["Electrocautery", "Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Vaccinations", use: "Pneumococcal, H. influenzae, meningococcal (preop)", amount: "Per protocol" }
      ]
    },
    complications: ["Hemorrhage", "Pancreatic injury/fistula", "Gastric injury", "Overwhelming post-splenectomy infection (OPSI)", "Thrombocytosis"],
    tips: ["Vaccinate preoperatively", "Watch for accessory spleens", "Protect pancreatic tail", "Prophylactic antibiotics lifelong in some patients"]
  },
  {
    name: "Retroperitoneal Lymph Node Dissection (RPLND)",
    specialty: "Surgical Oncology",
    description: "Removal of retroperitoneal lymph nodes for testicular cancer",
    duration: "240-420 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arms extended on arm boards", "NG tube and Foley"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to groin", "Wide sterile field", "Laparotomy drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set", "Vascular set"],
      specialInstruments: ["Self-retaining retractor", "Vascular clamps", "Long instruments"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Retroperitoneal dissection instruments",
      essentials: ["Vascular instruments", "Long scissors", "Clamps", "Clips"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Incision", description: "Midline laparotomy xiphoid to pubis", instruments: ["Scalpel"] },
        { step: 2, title: "Mobilization", description: "Mobilize colon medially", instruments: ["Scissors", "Electrocautery"] },
        { step: 3, title: "Template Dissection", description: "Dissect lymph nodes around great vessels (template based on primary tumor)", instruments: ["Scissors", "Clips"] },
        { step: 4, title: "Vascular Management", description: "Protect aorta, IVC, renal vessels", instruments: ["Vascular loops", "Clamps"] },
        { step: 5, title: "Nerve Preservation", description: "Preserve sympathetic nerves if possible", instruments: ["Nerve stimulator", "Fine dissection"] },
        { step: 6, title: "Closure", description: "Return bowel and close", instruments: ["Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Normal Saline", use: "Irrigation", amount: "1000mL" }
      ]
    },
    complications: ["Vascular injury", "Chylous ascites", "Retrograde ejaculation", "Bowel obstruction", "Renal dysfunction"],
    tips: ["Nerve-sparing technique preserves ejaculation", "Modified templates for low-stage disease", "Post-chemotherapy RPLND technically challenging", "High-volume centers preferred"]
  },
  {
    name: "Cytoreductive Surgery with HIPEC",
    specialty: "Surgical Oncology",
    description: "Removal of peritoneal metastases with hyperthermic intraperitoneal chemotherapy",
    duration: "480-720 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arms extended", "Multiple large bore IVs", "Arterial line and CVP"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to groin", "Wide sterile field", "HIPEC perfusion setup"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set", "Multiple specialty sets"],
      specialInstruments: ["HIPEC perfusion machine", "Temperature probes", "Multiple electrocautery devices"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Extensive peritonectomy instruments",
      essentials: ["Electrocautery", "Argon beam", "Peritonectomy instruments", "Staplers"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Exploration", description: "Assess peritoneal cancer index (PCI)", instruments: ["Visual inspection", "PCI scoring"] },
        { step: 2, title: "Cytoreduction", description: "Remove all visible tumor and involved peritoneum", instruments: ["Electrocautery", "Scissors", "Staplers"] },
        { step: 3, title: "Organ Resection", description: "Resect involved organs as needed", instruments: ["Appropriate for each organ"] },
        { step: 4, title: "HIPEC Setup", description: "Place inflow/outflow catheters and temperature probes", instruments: ["HIPEC catheters", "Temp probes"] },
        { step: 5, title: "HIPEC Perfusion", description: "Perfuse heated chemotherapy for 60-90 minutes", instruments: ["HIPEC machine"] },
        { step: 6, title: "Reconstruction", description: "Create anastomoses and close", instruments: ["Staplers", "Sutures"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Mitomycin C or Oxaliplatin", use: "HIPEC chemotherapy", amount: "Per protocol" },
        { name: "Broad-spectrum antibiotics", use: "Prophylaxis", amount: "Per protocol" },
        { name: "Thromboembolic prophylaxis", use: "DVT prevention", amount: "Per protocol" }
      ]
    },
    complications: ["Anastomotic leak", "Fistula", "Bone marrow suppression", "Renal toxicity", "Prolonged ileus", "High mortality"],
    tips: ["Patient selection critical (low PCI)", "Completeness of cytoreduction most important", "High-volume centers essential", "Intensive post-op care required"]
  },
  {
    name: "Thyroidectomy (Total) for Thyroid Cancer",
    specialty: "Surgical Oncology",
    description: "Complete removal of thyroid gland for malignancy",
    duration: "90-180 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Shoulder roll for neck extension", "Arms tucked at sides", "Neuromonitoring electrodes"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from chin to nipples", "Transparent drape if neuromonitoring", "Head drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major or minor instrument set", "Thyroid set"],
      specialInstruments: ["Harmonic scalpel or LigaSure", "Neuromonitoring equipment", "Fine scissors"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Thyroid surgery instruments",
      essentials: ["Harmonic scalpel", "Fine scissors", "Clamps", "Nerve stimulator"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Incision", description: "Low collar incision 2cm above clavicles", instruments: ["Scalpel"] },
        { step: 2, title: "Flap Development", description: "Develop subplatysmal flaps", instruments: ["Electrocautery"] },
        { step: 3, title: "Strap Muscle Division", description: "Divide strap muscles in midline", instruments: ["Electrocautery"] },
        { step: 4, title: "Lobe Mobilization", description: "Mobilize thyroid lobe, identify RLN and parathyroids", instruments: ["Harmonic scalpel", "Nerve stimulator"] },
        { step: 5, title: "Vascular Ligation", description: "Ligate superior and inferior thyroid vessels", instruments: ["Harmonic scalpel", "Clips"] },
        { step: 6, title: "Removal & Closure", description: "Remove gland and close in layers", instruments: ["Absorbable suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Calcium", use: "If hypocalcemia", amount: "Calcium gluconate" }
      ]
    },
    complications: ["Recurrent laryngeal nerve injury", "Hypocalcemia (hypoparathyroidism)", "Hematoma/bleeding", "Hypothyroidism"],
    tips: ["Identify and preserve RLN", "Preserve parathyroids with blood supply", "Neuromonitoring helpful", "Drain controversial"]
  },

  // Thoracic Surgery (15 procedures)
  {
    name: "Lobectomy (Video-Assisted Thoracoscopic Surgery)",
    specialty: "Thoracic Surgery",
    description: "Minimally invasive removal of lung lobe for lung cancer",
    duration: "120-240 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Lateral decubitus position", "Axillary roll", "Flex table", "Double lumen endotracheal tube"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from neck to iliac crest, spine to anterior axillary line", "Four corner drapes", "Thoracoscopic drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Thoracoscopic tower", "Thoracic instrument set"],
      specialInstruments: ["Trocars", "Thoracoscopic instruments", "Endoscopic staplers", "Energy device"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "VATS lobectomy instruments organized",
      essentials: ["Trocars", "Thoracoscopic graspers", "Staplers", "Energy device", "Specimen bag"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Port Placement", description: "Insert 3-4 thoracoscopic ports", instruments: ["Trocars"] },
        { step: 2, title: "Exploration", description: "Assess tumor and pleural cavity", instruments: ["Thoracoscope"] },
        { step: 3, title: "Hilar Dissection", description: "Identify and isolate pulmonary artery, vein, bronchus", instruments: ["Thoracoscopic instruments"] },
        { step: 4, title: "Vascular Division", description: "Divide pulmonary artery and vein with staplers", instruments: ["Endoscopic staplers"] },
        { step: 5, title: "Bronchial Division", description: "Divide bronchus with stapler", instruments: ["Endoscopic stapler"] },
        { step: 6, title: "Fissure Completion", description: "Complete fissure if needed", instruments: ["Staplers", "Energy device"] },
        { step: 7, title: "Lymph Node Sampling", description: "Mediastinal lymph node dissection", instruments: ["Graspers", "Energy device"] },
        { step: 8, title: "Specimen Removal", description: "Remove lobe in specimen bag", instruments: ["Endobag"] },
        { step: 9, title: "Chest Tubes", description: "Place chest tubes and close", instruments: ["Chest tubes", "Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Normal Saline", use: "Irrigation", amount: "500mL" }
      ]
    },
    complications: ["Air leak", "Hemorrhage", "Pneumonia", "Atrial fibrillation", "Empyema", "Bronchopleural fistula"],
    tips: ["Individual ligation of vessels safer than mass ligation", "Check for air leak underwater", "Pain control critical for respiratory mechanics", "Early mobilization"]
  },
  {
    name: "Pneumonectomy",
    specialty: "Thoracic Surgery",
    description: "Complete removal of lung for central lung cancer",
    duration: "180-300 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Lateral decubitus position", "Axillary roll", "Double lumen ETT", "Flex table"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from neck to iliac crest", "Four corner drapes", "Thoracotomy drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Thoracic instrument set", "Vascular set"],
      specialInstruments: ["Rib spreader", "Vascular clamps", "Staplers", "Bronchial stump reinforcement"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Major thoracic resection instruments",
      essentials: ["Vascular clamps", "Staplers", "Bronchial instruments", "Sutures"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Thoracotomy", description: "Posterolateral thoracotomy 5th intercostal space", instruments: ["Scalpel", "Rib spreader"] },
        { step: 2, title: "Assessment", description: "Assess resectability", instruments: ["Palpation", "Visualization"] },
        { step: 3, title: "Hilar Dissection", description: "Dissect pulmonary artery, vein, bronchus", instruments: ["Scissors", "Clamps"] },
        { step: 4, title: "Vascular Division", description: "Ligate and divide pulmonary vessels", instruments: ["Vascular staplers or clamps and ties"] },
        { step: 5, title: "Bronchial Division", description: "Divide main bronchus and close stump", instruments: ["Stapler or hand-sewn closure"] },
        { step: 6, title: "Lymph Node Dissection", description: "Mediastinal lymphadenectomy", instruments: ["Scissors", "Clips"] },
        { step: 7, title: "Closure", description: "Single chest tube, close thoracotomy", instruments: ["Chest tube", "Heavy suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Normal Saline", use: "Irrigation", amount: "1000mL" }
      ]
    },
    complications: ["Bronchopleural fistula", "Empyema", "Cardiac herniation", "Pulmonary edema (contralateral)", "Respiratory failure", "High mortality"],
    tips: ["Bronchial stump buttressing reduces fistula", "Right-sided: avoid IVC injury", "Limit fluid administration", "ICU monitoring essential"]
  },
  {
    name: "Wedge Resection (VATS)",
    specialty: "Thoracic Surgery",
    description: "Minimally invasive removal of lung nodule or small peripheral tumor",
    duration: "45-90 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Lateral decubitus position", "Axillary roll", "Double lumen ETT"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from neck to iliac crest", "Four corner drapes", "Thoracoscopic drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Thoracoscopic tower"],
      specialInstruments: ["Trocars", "Thoracoscopic instruments", "Endoscopic staplers"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "VATS wedge resection setup",
      essentials: ["Trocars", "Graspers", "Staplers", "Specimen bag"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Port Placement", description: "Insert 2-3 thoracoscopic ports", instruments: ["Trocars"] },
        { step: 2, title: "Nodule Localization", description: "Identify lung nodule (wire, dye, or palpation)", instruments: ["Thoracoscope", "Graspers"] },
        { step: 3, title: "Wedge Resection", description: "Resect lung with endoscopic stapler", instruments: ["Endoscopic staplers"] },
        { step: 4, title: "Leak Test", description: "Check for air leak underwater", instruments: ["Saline"] },
        { step: 5, title: "Specimen Removal", description: "Remove specimen in bag", instruments: ["Endobag"] },
        { step: 6, title: "Chest Tube", description: "Place chest tube and close", instruments: ["Chest tube", "Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Normal Saline", use: "Leak test", amount: "500mL" }
      ]
    },
    complications: ["Air leak", "Bleeding", "Inadequate margins", "Conversion to lobectomy"],
    tips: ["Pre-op CT-guided wire localization if deep nodule", "Adequate margin (>1cm for cancer)", "Frozen section confirms diagnosis", "Early chest tube removal if no leak"]
  },
  {
    name: "Mediastinoscopy",
    specialty: "Thoracic Surgery",
    description: "Minimally invasive biopsy of mediastinal lymph nodes for staging",
    duration: "30-60 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Shoulder roll for neck extension", "Arms tucked"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from chin to nipples", "Head drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Minor procedure set"],
      specialInstruments: ["Mediastinoscope", "Biopsy forceps", "Suction"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Mediastinoscopy instruments ready",
      essentials: ["Mediastinoscope", "Biopsy forceps", "Suction", "Electrocautery"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Incision", description: "Small transverse incision above sternal notch", instruments: ["Scalpel"] },
        { step: 2, title: "Dissection", description: "Dissect down to pretracheal plane", instruments: ["Scissors", "Electrocautery"] },
        { step: 3, title: "Scope Insertion", description: "Insert mediastinoscope along trachea", instruments: ["Mediastinoscope"] },
        { step: 4, title: "Lymph Node Biopsy", description: "Biopsy paratracheal and subcarinal nodes", instruments: ["Biopsy forceps"] },
        { step: 5, title: "Hemostasis", description: "Ensure hemostasis and close", instruments: ["Electrocautery", "Absorbable suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" }
      ]
    },
    complications: ["Hemorrhage", "Pneumothorax", "Recurrent laryngeal nerve injury", "Esophageal injury", "Air embolism"],
    tips: ["Identify innominate artery", "Biopsy stations 2R, 2L, 4R, 4L, 7", "EBUS-TBNA alternative", "Post-op CXR to exclude pneumothorax"]
  },
  {
    name: "Esophageal Myotomy (Heller) with Fundoplication",
    specialty: "Thoracic Surgery",
    description: "Laparoscopic myotomy of lower esophageal sphincter for achalasia",
    duration: "90-150 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine with legs split", "Arms extended", "Reverse Trendelenburg"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to groin", "Four corner drapes", "Laparoscopic drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Laparoscopic tower"],
      specialInstruments: ["Trocars", "Laparoscopic instruments", "Harmonic scalpel", "Bougie dilator"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Laparoscopic esophageal instruments",
      essentials: ["Trocars", "Graspers", "Harmonic scalpel", "Sutures"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Port Placement", description: "Insert laparoscopic ports", instruments: ["Trocars"] },
        { step: 2, title: "Mobilization", description: "Mobilize gastroesophageal junction", instruments: ["Harmonic scalpel", "Graspers"] },
        { step: 3, title: "Myotomy", description: "Myotomy of LES extending 6cm esophagus, 2cm stomach", instruments: ["Hook cautery", "Harmonic scalpel"] },
        { step: 4, title: "Fundoplication", description: "Partial (Dor or Toupet) fundoplication", instruments: ["Laparoscopic sutures"] },
        { step: 5, title: "Closure", description: "Remove instruments and close ports", instruments: ["Absorbable suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" }
      ]
    },
    complications: ["Mucosal perforation", "GERD", "Incomplete myotomy", "Pneumothorax"],
    tips: ["Extend myotomy adequately onto stomach", "Recognize and repair mucosal injuries", "Fundoplication reduces reflux", "Post-op barium swallow"]
  },
  {
    name: "Decortication for Empyema",
    specialty: "Thoracic Surgery",
    description: "Removal of fibrous pleural peel to re-expand lung",
    duration: "120-240 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Lateral decubitus position", "Axillary roll", "Flex table", "Double lumen ETT"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from neck to iliac crest", "Four corner drapes", "Thoracotomy drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Thoracic instrument set"],
      specialInstruments: ["Rib spreader", "Electrocautery", "Peanut dissectors"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Pleural debridement instruments",
      essentials: ["Peanut dissectors", "Electrocautery", "Scissors", "Suction"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Thoracotomy", description: "Posterolateral thoracotomy", instruments: ["Scalpel", "Rib spreader"] },
        { step: 2, title: "Peel Identification", description: "Identify fibrous pleural peel", instruments: ["Visualization"] },
        { step: 3, title: "Decortication", description: "Carefully remove visceral pleural peel", instruments: ["Peanut dissectors", "Electrocautery"] },
        { step: 4, title: "Lung Re-expansion", description: "Allow lung to re-expand", instruments: ["Manual re-inflation"] },
        { step: 5, title: "Drainage", description: "Place multiple chest tubes", instruments: ["Chest tubes"] },
        { step: 6, title: "Closure", description: "Close thoracotomy", instruments: ["Heavy suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Broad-spectrum antibiotics", use: "Empyema treatment", amount: "Culture-directed" },
        { name: "Normal Saline", use: "Irrigation", amount: "2000mL" }
      ]
    },
    complications: ["Air leak", "Bleeding", "Lung injury", "Incomplete re-expansion", "Recurrent empyema"],
    tips: ["Early decortication better outcomes", "Careful dissection to avoid lung injury", "Multiple chest tubes for drainage", "Aggressive post-op pulmonary toilet"]
  },
  {
    name: "Thymectomy (VATS)",
    specialty: "Thoracic Surgery",
    description: "Minimally invasive removal of thymus gland for myasthenia gravis or thymoma",
    duration: "90-180 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine or lateral decubitus", "Arms positioned for port access", "Double lumen ETT"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from neck to umbilicus bilaterally", "Four corner drapes", "Thoracoscopic drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Thoracoscopic tower"],
      specialInstruments: ["Trocars", "Thoracoscopic instruments", "Energy device", "Specimen bag"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "VATS thymectomy instruments",
      essentials: ["Trocars", "Graspers", "Energy device", "Clips", "Specimen bag"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Port Placement", description: "Insert bilateral or unilateral thoracoscopic ports", instruments: ["Trocars"] },
        { step: 2, title: "Dissection", description: "Dissect thymus from pericardium and great vessels", instruments: ["Energy device", "Graspers"] },
        { step: 3, title: "Vascular Control", description: "Ligate thymic veins", instruments: ["Clips", "Energy device"] },
        { step: 4, title: "Removal", description: "Remove thymus and anterior mediastinal fat", instruments: ["Specimen bag"] },
        { step: 5, title: "Hemostasis", description: "Ensure hemostasis and place chest tube", instruments: ["Electrocautery", "Chest tube"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Pyridostigmine", use: "Myasthenia management", amount: "Per neurology" }
      ]
    },
    complications: ["Phrenic nerve injury", "Pneumothorax", "Bleeding", "Myasthenic crisis", "Incomplete resection"],
    tips: ["Complete thymectomy includes anterior mediastinal fat", "Avoid phrenic nerves", "Pre-op plasmapheresis if myasthenia", "May worsen myasthenia initially"]
  },
  {
    name: "Pectus Excavatum Repair (Nuss Procedure)",
    specialty: "Thoracic Surgery",
    description: "Minimally invasive correction of pectus excavatum with substernal bar",
    duration: "90-150 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arms abducted 90 degrees", "Roll under shoulders"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from neck to umbilicus, axilla to axilla", "Four corner drapes"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Thoracoscopic tower", "Pectus set"],
      specialInstruments: ["Nuss bar", "Introducer", "Thoracoscope", "Bar stabilizers"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Pectus repair instruments",
      essentials: ["Nuss bars (various sizes)", "Introducer", "Stabilizers", "Thoracoscope"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Incisions", description: "Bilateral lateral chest incisions", instruments: ["Scalpel"] },
        { step: 2, title: "Tunnel Creation", description: "Create substernal tunnel with thoracoscopic guidance", instruments: ["Introducer", "Thoracoscope"] },
        { step: 3, title: "Bar Placement", description: "Pass pre-bent Nuss bar through tunnel", instruments: ["Nuss bar", "Introducer"] },
        { step: 4, title: "Bar Rotation", description: "Flip bar to elevate sternum", instruments: ["Bar rotator"] },
        { step: 5, title: "Stabilization", description: "Secure bar with lateral stabilizers", instruments: ["Stabilizers", "Sutures"] },
        { step: 6, title: "Closure", description: "Close incisions and place temporary drains", instruments: ["Suture", "Small drains"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Ketorolac", use: "Post-op pain", amount: "15-30mg IV" },
        { name: "Epidural analgesia", use: "Pain control", amount: "Per anesthesia" }
      ]
    },
    complications: ["Bar displacement", "Pneumothorax", "Cardiac injury", "Pain", "Bar infection"],
    tips: ["Thoracoscopic guidance prevents cardiac injury", "Aggressive pain control essential", "Bar removed after 2-3 years", "Avoid contact sports with bar in place"]
  },
  {
    name: "Pleurodesis (Talc) for Malignant Effusion",
    specialty: "Thoracic Surgery",
    description: "Creation of pleural symphysis to prevent recurrent malignant effusion",
    duration: "30-60 min",
    difficulty: "Basic",
    positioning: {
      title: "Patient Positioning",
      steps: ["Lateral decubitus or semi-recumbent", "Position for thoracoscopy"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep lateral chest", "Sterile drape around port sites"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Thoracoscopic tower"],
      specialInstruments: ["Trocars", "Thoracoscope", "Sterile talc", "Chest tube"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "VATS pleurodesis setup",
      essentials: ["Trocars", "Thoracoscope", "Talc puffer", "Chest tube"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Port Placement", description: "Insert 1-2 thoracoscopic ports", instruments: ["Trocars"] },
        { step: 2, title: "Drainage", description: "Evacuate pleural fluid", instruments: ["Suction"] },
        { step: 3, title: "Inspection", description: "Inspect pleural surfaces", instruments: ["Thoracoscope"] },
        { step: 4, title: "Talc Application", description: "Insufflate sterile talc over pleural surfaces", instruments: ["Talc puffer"] },
        { step: 5, title: "Chest Tube", description: "Place chest tube and close ports", instruments: ["Chest tube", "Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Sterile talc", use: "Pleurodesis", amount: "4-8g" }
      ]
    },
    complications: ["Empyema", "ARDS (rare)", "Pain", "Failure of pleurodesis", "Trapped lung"],
    tips: ["Lung must re-expand for pleurodesis to work", "Trapped lung is contraindication", "Chest tube until output minimal", "Alternatives: bleomycin, doxycycline"]
  },
  {
    name: "Thoracic Duct Ligation for Chylothorax",
    specialty: "Thoracic Surgery",
    description: "Ligation or clipping of thoracic duct for persistent chyle leak",
    duration: "120-180 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Right lateral decubitus position", "Axillary roll", "Double lumen ETT"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from neck to iliac crest", "Four corner drapes", "Thoracotomy or VATS drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Thoracic instrument set or thoracoscopic tower"],
      specialInstruments: ["Rib spreader or trocars", "Clips", "Fine dissection instruments"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Thoracic duct ligation instruments",
      essentials: ["Fine scissors", "Clips", "Ligatures", "Suction"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Approach", description: "Right thoracotomy or VATS approach", instruments: ["Scalpel or trocars"] },
        { step: 2, title: "Duct Identification", description: "Identify thoracic duct (cream feeding or lymphangiogram)", instruments: ["Visualization"] },
        { step: 3, title: "Ligation", description: "Mass ligation of tissue at diaphragm level", instruments: ["Clips or ties"] },
        { step: 4, title: "Drainage", description: "Ensure adequate chest tube drainage", instruments: ["Chest tubes"] },
        { step: 5, title: "Closure", description: "Close thoracotomy or ports", instruments: ["Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Octreotide", use: "Reduce chyle output", amount: "50-200mcg TID" }
      ]
    },
    complications: ["Persistent leak", "Malnutrition", "Immunosuppression", "Infection"],
    tips: ["Conservative management first (NPO, TPN, octreotide)", "Mass ligation approach if duct not visualized", "Pre-op cream feeding helps identify duct", "Consider thoracic duct embolization"]
  },
  {
    name: "Tracheal Resection and Reconstruction",
    specialty: "Thoracic Surgery",
    description: "Segmental resection of trachea with primary anastomosis",
    duration: "180-300 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Shoulder roll for neck extension", "Arms tucked", "Cross-field ventilation setup"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from chin to nipples, including anterior neck", "Cervical or cervicothoracic drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set", "Thoracic set"],
      specialInstruments: ["Tracheal instruments", "Armored endotracheal tube", "Fine sutures"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Airway reconstruction instruments",
      essentials: ["Tracheal retractors", "Fine scissors", "Needle holders", "Absorbable sutures"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Incision", description: "Cervical or combined cervicothoracic approach", instruments: ["Scalpel"] },
        { step: 2, title: "Tracheal Mobilization", description: "Mobilize trachea circumferentially", instruments: ["Scissors", "Electrocautery"] },
        { step: 3, title: "Resection", description: "Resect diseased tracheal segment", instruments: ["Scalpel"] },
        { step: 4, title: "Anastomosis", description: "Primary end-to-end anastomosis", instruments: ["Absorbable sutures"] },
        { step: 5, title: "Airway Management", description: "Advance ETT across anastomosis", instruments: ["Armored ETT"] },
        { step: 6, title: "Closure", description: "Close with chin-to-chest suture if needed", instruments: ["Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Dexamethasone", use: "Reduce airway edema", amount: "8-10mg IV" }
      ]
    },
    complications: ["Anastomotic dehiscence", "Stenosis", "Recurrent laryngeal nerve injury", "Airway compromise", "Death"],
    tips: ["Maximum resection ~6cm or 50% trachea", "Mobilization techniques to reduce tension", "Chin-to-chest suture for 1 week", "High-volume centers essential"]
  },
  {
    name: "Bronchoscopy with Biopsy",
    specialty: "Thoracic Surgery",
    description: "Flexible or rigid bronchoscopy for diagnosis and biopsy",
    duration: "20-45 min",
    difficulty: "Basic",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Head extended", "Arms at sides"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Minimal draping", "Protect patient's eyes"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Flexible or rigid bronchoscope"],
      specialInstruments: ["Biopsy forceps", "Brush", "Needle for TBNA", "Cryoprobe if needed"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Bronchoscopy accessories",
      essentials: ["Bronchoscope", "Biopsy forceps", "Brush", "Specimen containers"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Airway Access", description: "Insert bronchoscope via ETT or natural airway", instruments: ["Bronchoscope"] },
        { step: 2, title: "Inspection", description: "Systematically inspect airways", instruments: ["Bronchoscope"] },
        { step: 3, title: "Sampling", description: "Biopsy lesions, brush, BAL, or TBNA", instruments: ["Biopsy forceps", "Brush", "TBNA needle"] },
        { step: 4, title: "Hemostasis", description: "Control bleeding if any", instruments: ["Cold saline", "Epinephrine"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Lidocaine", use: "Topical airway anesthesia", amount: "2-4% solution" },
        { name: "Propofol", use: "Sedation", amount: "Per anesthesia" },
        { name: "Epinephrine", use: "Hemostasis if needed", amount: "1:10,000 solution" }
      ]
    },
    complications: ["Hypoxemia", "Bleeding", "Pneumothorax", "Laryngospasm", "Bronchospasm"],
    tips: ["Pre-oxygenate well", "Minimize biopsy passes to reduce bleeding", "EBUS-TBNA for mediastinal nodes", "Post-procedure CXR if transbronchial biopsy"]
  },
  {
    name: "Chest Wall Resection for Tumor",
    specialty: "Thoracic Surgery",
    description: "En bloc resection of chest wall including ribs with reconstruction",
    duration: "180-360 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Lateral decubitus or supine based on location", "Arms positioned for access"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Wide prep including chest wall and potential reconstruction sites", "Large sterile field"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set", "Thoracic set", "Orthopedic set"],
      specialInstruments: ["Rib shears", "Oscillating saw", "Mesh for reconstruction", "Methyl methacrylate"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Chest wall resection and reconstruction",
      essentials: ["Rib instruments", "Saw", "Mesh", "Cement", "Heavy sutures"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Incision", description: "Incision encompassing tumor with margins", instruments: ["Scalpel"] },
        { step: 2, title: "Rib Resection", description: "Resect ribs en bloc with tumor (usually 1 rib above and below)", instruments: ["Rib shears", "Oscillating saw"] },
        { step: 3, title: "Chest Wall Defect", description: "Assess size of defect", instruments: ["Measurement"] },
        { step: 4, title: "Reconstruction", description: "Reconstruct with mesh and/or methyl methacrylate", instruments: ["Prosthetic mesh", "Cement", "Sutures"] },
        { step: 5, title: "Soft Tissue Coverage", description: "Muscle flap if needed", instruments: ["Plastic surgery instruments"] },
        { step: 6, title: "Drainage", description: "Chest tubes and closure", instruments: ["Chest tubes", "Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Normal Saline", use: "Irrigation", amount: "1000mL" }
      ]
    },
    complications: ["Flail chest", "Prosthetic infection", "Seroma", "Recurrence", "Chronic pain"],
    tips: ["Reconstruction needed if >4 ribs or >5cm defect", "Rigid reconstruction prevents paradoxical motion", "Muscle flaps improve outcomes", "Multidisciplinary approach"]
  },
  {
    name: "Lung Volume Reduction Surgery (LVRS)",
    specialty: "Thoracic Surgery",
    description: "Resection of emphysematous lung to improve mechanics",
    duration: "120-240 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arms extended", "Double lumen ETT"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from neck to umbilicus bilaterally", "Sterile drape for bilateral VATS or sternotomy"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Thoracoscopic tower or sternotomy set"],
      specialInstruments: ["Endoscopic staplers", "Bovine pericardium strips", "Energy device"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "LVRS instruments",
      essentials: ["Staplers", "Pericardium strips", "Graspers"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Approach", description: "Bilateral VATS or median sternotomy", instruments: ["Trocars or sternal saw"] },
        { step: 2, title: "Target Identification", description: "Identify most diseased upper lobe regions", instruments: ["Visual inspection"] },
        { step: 3, title: "Resection", description: "Staple resection of 20-30% most diseased lung", instruments: ["Endoscopic staplers with pericardium buttress"] },
        { step: 4, title: "Air Leak Management", description: "Oversew air leaks", instruments: ["Suture", "Sealants"] },
        { step: 5, title: "Drainage", description: "Bilateral chest tubes and close", instruments: ["Chest tubes", "Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Bronchodilators", use: "Perioperative", amount: "As needed" }
      ]
    },
    complications: ["Prolonged air leak", "Respiratory failure", "Pneumonia", "Death", "Limited durability"],
    tips: ["Strict patient selection per NETT trial", "Upper lobe disease best", "Pulmonary rehab essential", "Consider endobronchial valves as alternative"]
  },
  {
    name: "Diaphragmatic Hernia Repair",
    specialty: "Thoracic Surgery",
    description: "Surgical repair of diaphragmatic defect with mesh reinforcement",
    duration: "120-240 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Lateral decubitus or supine for laparoscopic approach", "Axillary roll if lateral", "Arms positioned appropriately", "Foley catheter"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to iliac crest", "Include entire hemithorax and abdomen", "Thoracoscopic or laparoscopic drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Thoracoscopic tower or laparoscopic tower"],
      specialInstruments: ["Trocars", "Energy device", "Mesh for reinforcement", "Tacking device", "Long instruments"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Minimally invasive hernia repair",
      essentials: ["Trocars", "Graspers", "Energy device", "Mesh", "Tacking device", "Sutures"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Access", description: "Thoracoscopic or laparoscopic port placement", instruments: ["Trocars"] },
        { step: 2, title: "Hernia Reduction", description: "Reduce herniated contents back to abdomen", instruments: ["Graspers"] },
        { step: 3, title: "Sac Excision", description: "Excise hernia sac if present", instruments: ["Energy device", "Scissors"] },
        { step: 4, title: "Defect Assessment", description: "Measure diaphragmatic defect", instruments: ["Ruler"] },
        { step: 5, title: "Primary Repair", description: "Primary closure of defect if possible", instruments: ["Heavy non-absorbable suture"] },
        { step: 6, title: "Mesh Reinforcement", description: "Place and secure mesh over repair", instruments: ["Mesh", "Tacking device", "Transfascial sutures"] },
        { step: 7, title: "Drainage", description: "Chest tube if thoracic approach", instruments: ["Chest tube"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Normal Saline", use: "Irrigation", amount: "500mL" }
      ]
    },
    complications: ["Recurrence", "Mesh erosion", "Infection", "Pneumothorax", "Bowel obstruction"],
    tips: ["Mesh reinforcement recommended for large defects", "Adequate mesh overlap (3-5cm)", "Tension-free repair essential", "Consider biologic mesh if contaminated"]
  }
];
