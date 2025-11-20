export const batch1Procedures = [
  // Obstetrics & Gynecology (15 procedures)
  {
    name: "Cesarean Section (C-Section)",
    specialty: "Obstetrics & Gynecology",
    description: "Surgical delivery of infant through abdominal and uterine incisions",
    duration: "45-60 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position with left lateral tilt", "Arms extended on arm boards", "SCDs applied", "Foley catheter placement"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to upper thighs", "Four corner drapes", "Cesarean section drape with pouch"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set", "OB/GYN tray"],
      specialInstruments: ["Bladder blade retractor", "Bandage scissors", "Delivery forceps"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Quick access for delivery instruments",
      essentials: ["Scalpel", "Bandage scissors", "Retractors", "Suction", "Clamps"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Incision", description: "Pfannenstiel or vertical skin incision", instruments: ["Scalpel", "Electrocautery"] },
        { step: 2, title: "Abdominal Entry", description: "Dissect through layers to peritoneum", instruments: ["Scissors", "Retractors"] },
        { step: 3, title: "Uterine Incision", description: "Low transverse uterine incision", instruments: ["Scalpel", "Bandage scissors"] },
        { step: 4, title: "Delivery", description: "Deliver infant and placenta", instruments: ["Delivery forceps", "Bulb syringe"] },
        { step: 5, title: "Uterine Closure", description: "Two-layer closure of uterus", instruments: ["Suture", "Needle holder"] },
        { step: 6, title: "Abdominal Closure", description: "Layer-by-layer closure", instruments: ["Suture", "Stapler or suture for skin"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Oxytocin", use: "Uterine contraction", amount: "20-40 units in IV" },
        { name: "Cefazolin", use: "Antibiotic prophylaxis", amount: "2g IV" },
        { name: "Normal Saline", use: "Irrigation", amount: "1000mL" }
      ]
    },
    complications: ["Hemorrhage", "Uterine atony", "Bladder injury", "Infection", "Thromboembolism"],
    tips: ["Have extra suction ready", "Warm fluids for newborn", "Count sponges meticulously", "Prepare for potential hemorrhage"]
  },
  {
    name: "Total Abdominal Hysterectomy (TAH)",
    specialty: "Obstetrics & Gynecology",
    description: "Surgical removal of uterus and cervix through abdominal incision",
    duration: "60-120 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arms tucked at sides", "Slight Trendelenburg", "SCDs applied"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to mid-thighs", "Vaginal prep if needed", "Four corner drapes", "Laparotomy drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set", "GYN tray"],
      specialInstruments: ["Heaney clamps", "Long instruments", "Self-retaining retractor"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Standard with long instruments accessible",
      essentials: ["Clamps", "Long scissors", "Needle holders", "Retractors"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Incision", description: "Pfannenstiel or midline incision", instruments: ["Scalpel", "Electrocautery"] },
        { step: 2, title: "Exploration", description: "Explore pelvis and abdomen", instruments: ["Retractors", "Sponge sticks"] },
        { step: 3, title: "Ligament Division", description: "Clamp and divide round ligaments", instruments: ["Heaney clamps", "Scissors", "Suture"] },
        { step: 4, title: "Vascular Pedicles", description: "Secure ovarian and uterine vessels", instruments: ["Clamps", "Ties", "Suture ligatures"] },
        { step: 5, title: "Uterine Removal", description: "Remove uterus and cervix", instruments: ["Scalpel", "Scissors"] },
        { step: 6, title: "Closure", description: "Close vaginal cuff and abdomen", instruments: ["Suture", "Needle holder"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Antibiotic prophylaxis", amount: "2g IV" },
        { name: "Normal Saline", use: "Irrigation", amount: "1000mL" },
        { name: "Heparin", use: "DVT prophylaxis", amount: "5000 units SQ" }
      ]
    },
    complications: ["Hemorrhage", "Bladder injury", "Ureteral injury", "Infection", "Bowel injury"],
    tips: ["Identify ureters before clamping", "Have long instruments ready", "Ensure adequate exposure", "Monitor blood loss closely"]
  },
  {
    name: "Dilation and Curettage (D&C)",
    specialty: "Obstetrics & Gynecology",
    description: "Cervical dilation and uterine curettage for diagnostic or therapeutic purposes",
    duration: "15-30 min",
    difficulty: "Basic",
    positioning: {
      title: "Patient Positioning",
      steps: ["Lithotomy position", "Stirrups adjusted", "Arms on arm boards", "Safety strap across thighs"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Vaginal prep", "Leg drapes", "Perineal drape with fluid collection pouch"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["D&C set"],
      specialInstruments: ["Dilators (Hegar or Pratt)", "Curettes (sharp and suction)", "Tenaculum", "Speculum"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Sequential dilator arrangement",
      essentials: ["Speculum", "Tenaculum", "Dilators", "Curettes", "Ring forceps"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Exam", description: "Bimanual examination", instruments: ["Gloved hands"] },
        { step: 2, title: "Speculum Placement", description: "Insert weighted speculum", instruments: ["Speculum"] },
        { step: 3, title: "Cervical Grasp", description: "Grasp cervix with tenaculum", instruments: ["Tenaculum"] },
        { step: 4, title: "Dilation", description: "Dilate cervix progressively", instruments: ["Sequential dilators"] },
        { step: 5, title: "Curettage", description: "Curette uterine cavity", instruments: ["Sharp curette", "Suction curette"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Misoprostol", use: "Cervical softening (preop)", amount: "400mcg" },
        { name: "Oxytocin", use: "Uterine contraction", amount: "10 units IM" },
        { name: "Betadine", use: "Vaginal prep", amount: "As needed" }
      ]
    },
    complications: ["Uterine perforation", "Cervical laceration", "Hemorrhage", "Infection", "Asherman's syndrome"],
    tips: ["Sound uterus before dilation", "Use gentle technique", "Send tissue for pathology", "Monitor for excessive bleeding"]
  },
  {
    name: "Laparoscopic Tubal Ligation",
    specialty: "Obstetrics & Gynecology",
    description: "Minimally invasive permanent sterilization by fallopian tube occlusion",
    duration: "30-45 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine with arms tucked", "Lithotomy or modified lithotomy", "Slight Trendelenburg", "SCDs applied"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep abdomen and vagina", "Four corner drapes", "Laparoscopy drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Laparoscopy tower", "Basic laparoscopic instruments"],
      specialInstruments: ["Falope rings or clips", "Bipolar forceps", "Uterine manipulator"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Laparoscopic instruments organized",
      essentials: ["Trocars", "Graspers", "Clips/rings", "Scissors"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Uterine Manipulator", description: "Insert uterine manipulator", instruments: ["Manipulator", "Speculum"] },
        { step: 2, title: "Pneumoperitoneum", description: "Create CO2 pneumoperitoneum", instruments: ["Veress needle", "Insufflator"] },
        { step: 3, title: "Trocar Insertion", description: "Insert umbilical and accessory trocars", instruments: ["Trocars", "Scalpel"] },
        { step: 4, title: "Tube Identification", description: "Identify and isolate fallopian tubes", instruments: ["Graspers"] },
        { step: 5, title: "Tube Occlusion", description: "Apply clips or rings to tubes", instruments: ["Clip applier or ring applicator"] },
        { step: 6, title: "Closure", description: "Remove instruments and close port sites", instruments: ["Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Methylene Blue", use: "Tube identification (optional)", amount: "10mL" }
      ]
    },
    complications: ["Bowel injury", "Vascular injury", "Uterine perforation", "Failed sterilization", "Conversion to open"],
    tips: ["Verify tube identification", "Ensure complete occlusion", "Document both tubes clipped", "Check for hemostasis"]
  },
  {
    name: "Ovarian Cystectomy",
    specialty: "Obstetrics & Gynecology",
    description: "Surgical removal of ovarian cyst while preserving ovarian tissue",
    duration: "45-90 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arms tucked", "Slight Trendelenburg", "SCDs in place"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to mid-thighs", "Four corner drapes", "Laparoscopy or laparotomy drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major set or laparoscopic set"],
      specialInstruments: ["Atraumatic graspers", "Electrocautery or bipolar", "Endobag for specimen"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Delicate instruments for ovarian tissue",
      essentials: ["Fine scissors", "Graspers", "Needle holder", "Sutures"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Access", description: "Enter abdomen (open or laparoscopic)", instruments: ["Trocars or scalpel"] },
        { step: 2, title: "Cyst Identification", description: "Identify and inspect cyst", instruments: ["Graspers"] },
        { step: 3, title: "Cyst Excision", description: "Enucleate cyst from ovarian tissue", instruments: ["Scissors", "Graspers", "Electrocautery"] },
        { step: 4, title: "Hemostasis", description: "Achieve hemostasis on ovary", instruments: ["Bipolar", "Sutures"] },
        { step: 5, title: "Ovarian Closure", description: "Close ovarian cortex if needed", instruments: ["Absorbable suture"] },
        { step: 6, title: "Specimen Removal", description: "Remove cyst in endobag", instruments: ["Endobag"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Normal Saline", use: "Irrigation", amount: "500mL" }
      ]
    },
    complications: ["Hemorrhage", "Ovarian failure", "Adhesions", "Cyst rupture", "Infection"],
    tips: ["Preserve ovarian tissue", "Send cyst for pathology", "Minimize thermal injury", "Irrigate thoroughly"]
  },
  {
    name: "Myomectomy (Open)",
    specialty: "Obstetrics & Gynecology",
    description: "Surgical removal of uterine fibroids while preserving the uterus",
    duration: "90-180 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arms tucked", "Slight Trendelenburg", "SCDs applied"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to mid-thighs", "Four corner drapes", "Laparotomy drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set", "GYN set"],
      specialInstruments: ["Myoma screw", "Large clamps", "Pitressin dilution"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Heavy instruments for fibroid manipulation",
      essentials: ["Myoma screw", "Clamps", "Large needle holders", "Suction"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Incision", description: "Low transverse or vertical incision", instruments: ["Scalpel", "Electrocautery"] },
        { step: 2, title: "Vasopressin Injection", description: "Inject vasopressin to reduce bleeding", instruments: ["Syringe", "Needle"] },
        { step: 3, title: "Fibroid Identification", description: "Identify all fibroids", instruments: ["Manual palpation"] },
        { step: 4, title: "Myomectomy", description: "Enucleate fibroids from uterus", instruments: ["Scalpel", "Myoma screw", "Clamps"] },
        { step: 5, title: "Uterine Closure", description: "Multi-layer closure of uterine defects", instruments: ["Absorbable suture", "Large needle holders"] },
        { step: 6, title: "Hemostasis & Closure", description: "Ensure hemostasis, close abdomen", instruments: ["Electrocautery", "Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Vasopressin", use: "Reduce uterine bleeding", amount: "20 units in 100mL saline" },
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Oxytocin", use: "Uterine contraction", amount: "20 units in IV" }
      ]
    },
    complications: ["Hemorrhage", "Uterine rupture in pregnancy", "Adhesions", "Infection", "Fibroid recurrence"],
    tips: ["Have cell saver ready", "Type and cross blood", "Minimize thermal injury", "Meticulous hemostasis"]
  },
  {
    name: "Colporrhaphy (Anterior and Posterior Repair)",
    specialty: "Obstetrics & Gynecology",
    description: "Surgical repair of vaginal wall prolapse (cystocele and rectocele)",
    duration: "60-120 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Lithotomy position", "Stirrups properly positioned", "Arms on arm boards", "Safety strap"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Vaginal and perineal prep", "Leg drapes", "Perineal drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Vaginal surgery set"],
      specialInstruments: ["Weighted speculum", "Right-angle retractors", "Long instruments"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Vaginal repair instruments",
      essentials: ["Retractors", "Allis clamps", "Long scissors", "Needle holders"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Exposure", description: "Insert weighted speculum", instruments: ["Weighted speculum"] },
        { step: 2, title: "Anterior Incision", description: "Incise anterior vaginal wall", instruments: ["Scalpel", "Scissors"] },
        { step: 3, title: "Fascial Plication", description: "Plicate endopelvic fascia", instruments: ["Absorbable suture"] },
        { step: 4, title: "Posterior Repair", description: "Repair posterior wall if needed", instruments: ["Scissors", "Suture"] },
        { step: 5, title: "Perineorrhaphy", description: "Repair perineal body", instruments: ["Suture", "Needle holder"] },
        { step: 6, title: "Closure", description: "Close vaginal mucosa", instruments: ["Absorbable suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Betadine", use: "Vaginal prep", amount: "As needed" },
        { name: "Estrogen cream", use: "Postop (optional)", amount: "As prescribed" }
      ]
    },
    complications: ["Urinary retention", "Bladder injury", "Rectal injury", "Dyspareunia", "Recurrence"],
    tips: ["Avoid overtightening", "Protect bladder", "Ensure hemostasis", "Pack vagina postop"]
  },
  {
    name: "Endometrial Ablation",
    specialty: "Obstetrics & Gynecology",
    description: "Destruction of endometrial lining to treat abnormal uterine bleeding",
    duration: "20-40 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Lithotomy position", "Stirrups adjusted", "Arms on arm boards", "Safety strap"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Vaginal prep", "Leg drapes", "Perineal drape with collection pouch"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Hysteroscopy set"],
      specialInstruments: ["Ablation device (rollerball, balloon, or microwave)", "Hysteroscope", "Cervical dilators"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Hysteroscopy equipment ready",
      essentials: ["Speculum", "Tenaculum", "Dilators", "Ablation device"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Cervical Dilation", description: "Dilate cervix to accommodate hysteroscope", instruments: ["Dilators", "Tenaculum"] },
        { step: 2, title: "Hysteroscopy", description: "Inspect uterine cavity", instruments: ["Hysteroscope", "Distension media"] },
        { step: 3, title: "Ablation", description: "Ablate endometrium using chosen method", instruments: ["Ablation device"] },
        { step: 4, title: "Verification", description: "Ensure complete ablation", instruments: ["Hysteroscope"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Glycine or Normal Saline", use: "Uterine distension", amount: "2000mL" },
        { name: "Misoprostol", use: "Cervical ripening (preop)", amount: "400mcg" }
      ]
    },
    complications: ["Uterine perforation", "Fluid overload", "Hemorrhage", "Infection", "Hematometra"],
    tips: ["Monitor fluid deficit", "Ensure pregnancy ruled out", "Pretreat with GnRH agonist if needed", "Patient counseling on permanent nature"]
  },
  {
    name: "Cervical Cerclage",
    specialty: "Obstetrics & Gynecology",
    description: "Placement of suture around cervix to prevent preterm birth",
    duration: "15-30 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Steep Trendelenburg lithotomy", "Stirrups properly positioned", "Arms on arm boards"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Vaginal and perineal prep", "Leg drapes", "Perineal drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Cerclage set"],
      specialInstruments: ["Mersilene tape or heavy suture", "Long needle holder", "Right-angle retractors"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Cerclage materials ready",
      essentials: ["Weighted speculum", "Ring forceps", "Suture material", "Long needle holder"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Exposure", description: "Insert weighted speculum, visualize cervix", instruments: ["Speculum", "Retractors"] },
        { step: 2, title: "Cervical Grasping", description: "Grasp anterior and posterior cervix", instruments: ["Ring forceps"] },
        { step: 3, title: "Suture Placement", description: "Place McDonald or Shirodkar cerclage", instruments: ["Needle", "Mersilene tape", "Long needle holder"] },
        { step: 4, title: "Tying", description: "Secure cerclage with multiple knots", instruments: ["Long instruments"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Betadine", use: "Vaginal prep", amount: "As needed" },
        { name: "Terbutaline", use: "Tocolysis if contractions", amount: "0.25mg SQ" }
      ]
    },
    complications: ["Preterm labor", "Rupture of membranes", "Cervical laceration", "Infection", "Cerclage displacement"],
    tips: ["Avoid bladder injury", "Don't tie too tight", "Document suture location", "Plan removal at term"]
  },
  {
    name: "Hysteroscopy with Polypectomy",
    specialty: "Obstetrics & Gynecology",
    description: "Minimally invasive removal of endometrial polyps via hysteroscope",
    duration: "20-40 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Lithotomy position", "Stirrups adjusted", "Arms on arm boards", "Safety strap"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Vaginal prep", "Leg drapes", "Perineal drape with fluid collection"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Hysteroscopy set"],
      specialInstruments: ["Hysteroscope", "Polyp graspers or scissors", "Resectoscope if needed"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Hysteroscopic instruments organized",
      essentials: ["Speculum", "Tenaculum", "Dilators", "Hysteroscope", "Grasping forceps"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Cervical Dilation", description: "Dilate cervix as needed", instruments: ["Dilators"] },
        { step: 2, title: "Hysteroscope Insertion", description: "Insert hysteroscope into uterine cavity", instruments: ["Hysteroscope", "Distension media"] },
        { step: 3, title: "Polyp Identification", description: "Identify and visualize polyps", instruments: ["Camera system"] },
        { step: 4, title: "Polyp Removal", description: "Grasp and remove polyps", instruments: ["Grasping forceps or scissors"] },
        { step: 5, title: "Verification", description: "Inspect cavity for complete removal", instruments: ["Hysteroscope"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Glycine or Normal Saline", use: "Uterine distension", amount: "1500mL" },
        { name: "Misoprostol", use: "Cervical ripening (optional)", amount: "400mcg" }
      ]
    },
    complications: ["Uterine perforation", "Fluid overload", "Hemorrhage", "Incomplete removal", "Infection"],
    tips: ["Monitor fluid balance", "Send tissue for pathology", "Gentle manipulation", "Document findings"]
  },
  {
    name: "Laparoscopic Salpingectomy",
    specialty: "Obstetrics & Gynecology",
    description: "Minimally invasive removal of fallopian tube (ectopic pregnancy or prophylaxis)",
    duration: "45-75 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine with arms tucked", "Lithotomy or modified lithotomy", "Steep Trendelenburg", "SCDs applied"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep abdomen and vagina", "Four corner drapes", "Laparoscopy drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Laparoscopy tower", "Basic laparoscopic instruments"],
      specialInstruments: ["Bipolar forceps", "Endoscopic scissors or energy device", "Endobag"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Laparoscopic instruments ready",
      essentials: ["Trocars", "Graspers", "Bipolar", "Scissors", "Endobag"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Access", description: "Create pneumoperitoneum and insert trocars", instruments: ["Veress needle", "Trocars"] },
        { step: 2, title: "Tube Identification", description: "Identify affected fallopian tube", instruments: ["Laparoscope", "Graspers"] },
        { step: 3, title: "Mesosalpinx Division", description: "Coagulate and divide mesosalpinx", instruments: ["Bipolar forceps", "Scissors or energy device"] },
        { step: 4, title: "Tube Removal", description: "Divide tube at cornua and remove", instruments: ["Energy device", "Endobag"] },
        { step: 5, title: "Hemostasis", description: "Ensure complete hemostasis", instruments: ["Bipolar", "Irrigation"] },
        { step: 6, title: "Closure", description: "Remove instruments and close ports", instruments: ["Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Normal Saline", use: "Irrigation", amount: "1000mL" }
      ]
    },
    complications: ["Hemorrhage", "Bowel injury", "Bladder injury", "Conversion to open", "Incomplete removal"],
    tips: ["Identify ureter", "Control bleeding before division", "Use endobag for specimen", "Irrigate thoroughly"]
  },
  {
    name: "Vulvectomy",
    specialty: "Obstetrics & Gynecology",
    description: "Surgical removal of vulvar tissue (for cancer or severe dysplasia)",
    duration: "120-240 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Lithotomy position", "Stirrups well-positioned", "Arms on arm boards", "SCDs applied"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from umbilicus to mid-thighs", "Perineal and vaginal prep", "Four corner drapes", "Perineal drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set", "Plastic surgery set"],
      specialInstruments: ["Electrocautery", "Skin hooks", "Advancement flaps if needed"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Oncology and plastic instruments",
      essentials: ["Scalpel", "Electrocautery", "Retractors", "Clamps", "Multiple sutures"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Margins Marked", description: "Mark surgical margins with margin assessment", instruments: ["Marking pen", "Ruler"] },
        { step: 2, title: "Excision", description: "Excise vulvar tissue to fascia", instruments: ["Scalpel", "Electrocautery"] },
        { step: 3, title: "Lymph Node Dissection", description: "Inguinofemoral node dissection if indicated", instruments: ["Scissors", "Clamps", "Ligatures"] },
        { step: 4, title: "Hemostasis", description: "Achieve meticulous hemostasis", instruments: ["Electrocautery", "Ties"] },
        { step: 5, title: "Reconstruction", description: "Primary closure or flap reconstruction", instruments: ["Absorbable suture", "Skin suture"] },
        { step: 6, title: "Drains", description: "Place drains if needed", instruments: ["Closed suction drains"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Normal Saline", use: "Irrigation", amount: "1000mL" },
        { name: "Epinephrine solution", use: "Hemostasis", amount: "1:200,000" }
      ]
    },
    complications: ["Wound dehiscence", "Infection", "Lymphedema", "Urinary retention", "Psychosexual dysfunction"],
    tips: ["Wide margins for malignancy", "Careful hemostasis", "Consider plastic surgery consult", "Drain placement important"]
  },
  {
    name: "Bartholin Gland Cyst Excision",
    specialty: "Obstetrics & Gynecology",
    description: "Surgical removal of Bartholin gland cyst or abscess",
    duration: "20-40 min",
    difficulty: "Basic",
    positioning: {
      title: "Patient Positioning",
      steps: ["Lithotomy position", "Stirrups adjusted", "Arms on arm boards"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Vaginal and perineal prep", "Leg drapes", "Perineal drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Minor procedure set"],
      specialInstruments: ["Small retractors", "Fine scissors", "Electrocautery"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Small procedure setup",
      essentials: ["Scalpel", "Scissors", "Clamps", "Needle holder", "Suture"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Incision", description: "Incise vaginal mucosa over cyst", instruments: ["Scalpel"] },
        { step: 2, title: "Dissection", description: "Carefully dissect cyst from surrounding tissue", instruments: ["Scissors", "Clamps"] },
        { step: 3, title: "Excision", description: "Remove entire cyst intact if possible", instruments: ["Scissors", "Electrocautery"] },
        { step: 4, title: "Hemostasis", description: "Control bleeding", instruments: ["Electrocautery", "Ties"] },
        { step: 5, title: "Closure", description: "Close vaginal mucosa", instruments: ["Absorbable suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Lidocaine with epinephrine", use: "Local anesthesia", amount: "10-20mL" },
        { name: "Betadine", use: "Prep", amount: "As needed" }
      ]
    },
    complications: ["Recurrence", "Hemorrhage", "Infection", "Dyspareunia", "Scarring"],
    tips: ["Avoid gland duct injury", "Consider marsupialization as alternative", "Send tissue for pathology", "Careful dissection"]
  },
  {
    name: "Pelvic Laparoscopy (Diagnostic)",
    specialty: "Obstetrics & Gynecology",
    description: "Minimally invasive visualization of pelvic organs for diagnosis",
    duration: "30-60 min",
    difficulty: "Basic",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine with arms tucked", "Lithotomy or modified lithotomy", "Trendelenburg position", "SCDs applied"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep abdomen and vagina", "Four corner drapes", "Laparoscopy drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Laparoscopy tower", "Basic laparoscopic instruments"],
      specialInstruments: ["Graspers", "Probe", "Uterine manipulator"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Diagnostic laparoscopy setup",
      essentials: ["Trocars", "Graspers", "Probe", "Scissors"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Uterine Manipulator", description: "Insert uterine manipulator if needed", instruments: ["Manipulator"] },
        { step: 2, title: "Pneumoperitoneum", description: "Create CO2 pneumoperitoneum", instruments: ["Veress needle", "Insufflator"] },
        { step: 3, title: "Trocar Insertion", description: "Insert umbilical trocar", instruments: ["Trocar", "Scalpel"] },
        { step: 4, title: "Inspection", description: "Systematic inspection of pelvis", instruments: ["Laparoscope", "Probe"] },
        { step: 5, title: "Documentation", description: "Document findings with photos/video", instruments: ["Camera system"] },
        { step: 6, title: "Closure", description: "Remove instruments and close port", instruments: ["Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Normal Saline", use: "Irrigation", amount: "500mL" },
        { name: "Local anesthetic", use: "Port site infiltration", amount: "10mL" }
      ]
    },
    complications: ["Bowel injury", "Vascular injury", "Bladder injury", "Trocar site hernia", "Subcutaneous emphysema"],
    tips: ["Systematic inspection", "Document all findings", "Check for hemostasis", "Ensure complete desufflation"]
  },
  {
    name: "LEEP (Loop Electrosurgical Excision Procedure)",
    specialty: "Obstetrics & Gynecology",
    description: "Cervical dysplasia treatment via electrosurgical loop excision",
    duration: "10-20 min",
    difficulty: "Basic",
    positioning: {
      title: "Patient Positioning",
      steps: ["Lithotomy position", "Stirrups adjusted", "Arms on arm boards"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Vaginal prep", "Leg drapes", "Perineal drape with smoke evacuation"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Colposcopy set"],
      specialInstruments: ["LEEP device with loops", "Grounding pad", "Smoke evacuator"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "LEEP equipment ready",
      essentials: ["Speculum", "Tenaculum", "LEEP loops", "Lugol's solution", "Ball electrode"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Colposcopy", description: "Visualize cervix with colposcope", instruments: ["Colposcope", "Acetic acid"] },
        { step: 2, title: "Anesthesia", description: "Inject local anesthetic into cervix", instruments: ["Syringe", "Local anesthetic"] },
        { step: 3, title: "Excision", description: "Excise transformation zone with loop", instruments: ["LEEP loop", "Electrosurgical unit"] },
        { step: 4, title: "Hemostasis", description: "Achieve hemostasis with ball electrode", instruments: ["Ball electrode", "Monsel's solution"] },
        { step: 5, title: "Specimen Handling", description: "Orient and send specimen to pathology", instruments: ["Cork or card"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Lidocaine with epinephrine", use: "Local anesthesia and hemostasis", amount: "10mL" },
        { name: "Monsel's solution", use: "Hemostasis", amount: "As needed" },
        { name: "Lugol's solution", use: "Identify margins (optional)", amount: "As needed" }
      ]
    },
    complications: ["Hemorrhage", "Cervical stenosis", "Infection", "Preterm birth in future pregnancy", "Inadequate excision"],
    tips: ["Stay oriented to margins", "Avoid fragmentation", "Document pathology orientation", "Counsel on healing"]
  },

  // Pediatric Surgery (15 procedures)
  {
    name: "Pediatric Appendectomy (Laparoscopic)",
    specialty: "Pediatric Surgery",
    description: "Minimally invasive removal of inflamed appendix in pediatric patient",
    duration: "45-75 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arms tucked at sides", "Slight reverse Trendelenburg", "Foley catheter placement"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to groin", "Four corner drapes", "Laparoscopic drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Pediatric laparoscopy set"],
      specialInstruments: ["3mm or 5mm trocars", "Pediatric graspers", "Endo GIA or clips", "Endobag"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Pediatric laparoscopic instruments organized",
      essentials: ["Small trocars", "Graspers", "Scissors", "Clips", "Endobag"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Access", description: "Create pneumoperitoneum and insert umbilical trocar", instruments: ["Veress needle", "Trocar"] },
        { step: 2, title: "Additional Ports", description: "Place working ports under visualization", instruments: ["5mm trocars"] },
        { step: 3, title: "Appendix Identification", description: "Identify and mobilize appendix", instruments: ["Graspers"] },
        { step: 4, title: "Mesoappendix Division", description: "Divide mesoappendix", instruments: ["Energy device or clips"] },
        { step: 5, title: "Appendix Division", description: "Divide appendix at base", instruments: ["Endo GIA or clips and scissors"] },
        { step: 6, title: "Extraction & Closure", description: "Remove appendix, irrigate, close ports", instruments: ["Endobag", "Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefoxitin or ceftriaxone/metronidazole", use: "Antibiotic prophylaxis", amount: "Weight-based dosing" },
        { name: "Normal Saline", use: "Irrigation", amount: "500mL" }
      ]
    },
    complications: ["Perforation", "Abscess formation", "Ileus", "Wound infection", "Adhesions"],
    tips: ["Use gentle tissue handling", "Irrigate thoroughly if perforated", "Consider drain if contamination", "Age-appropriate port sizes"]
  },
  {
    name: "Umbilical Hernia Repair (Pediatric)",
    specialty: "Pediatric Surgery",
    description: "Surgical repair of congenital or acquired umbilical hernia in children",
    duration: "30-45 min",
    difficulty: "Basic",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arms on arm boards", "Small roll under hips"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to pubis", "Four corner drapes", "Small laparotomy drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Pediatric general set"],
      specialInstruments: ["Small retractors", "Fine scissors", "Absorbable sutures"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Small instruments for pediatric tissue",
      essentials: ["Scalpel", "Fine scissors", "Retractors", "Needle holders", "Sutures"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Incision", description: "Infraumbilical curvilinear incision", instruments: ["Scalpel", "Electrocautery"] },
        { step: 2, title: "Hernia Sac", description: "Identify and reduce hernia sac", instruments: ["Forceps", "Scissors"] },
        { step: 3, title: "Fascial Repair", description: "Primary repair of fascial defect", instruments: ["Absorbable suture", "Needle holder"] },
        { step: 4, title: "Closure", description: "Close subcutaneous tissue and skin", instruments: ["Absorbable suture", "Skin glue or subcuticular"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis (optional)", amount: "Weight-based" },
        { name: "Local anesthetic", use: "Wound infiltration", amount: "5-10mL" }
      ]
    },
    complications: ["Recurrence", "Seroma", "Wound infection", "Umbilical deformity"],
    tips: ["Preserve umbilicus appearance", "Avoid mesh in children", "Check for incarceration", "Gentle tissue handling"]
  },
  {
    name: "Inguinal Hernia Repair (Pediatric)",
    specialty: "Pediatric Surgery",
    description: "High ligation of patent processus vaginalis in pediatric inguinal hernia",
    duration: "30-60 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arms on arm boards", "Frog-leg position"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from umbilicus to mid-thigh", "Four corner drapes", "Small drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Pediatric general set"],
      specialInstruments: ["Small retractors", "Mosquito clamps", "Vessel loops"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Delicate instruments for cord structures",
      essentials: ["Small retractors", "Fine scissors", "Mosquito clamps", "Absorbable sutures"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Incision", description: "Inguinal skin crease incision", instruments: ["Scalpel"] },
        { step: 2, title: "Cord Identification", description: "Identify spermatic cord or round ligament", instruments: ["Forceps", "Retractors"] },
        { step: 3, title: "Sac Isolation", description: "Isolate hernia sac from cord structures", instruments: ["Mosquito clamps", "Vessel loops"] },
        { step: 4, title: "High Ligation", description: "Ligate sac at internal ring", instruments: ["Absorbable suture"] },
        { step: 5, title: "Closure", description: "Close layers", instruments: ["Absorbable suture", "Skin glue"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis (optional)", amount: "Weight-based" },
        { name: "Bupivacaine", use: "Ilioinguinal block", amount: "Weight-based" }
      ]
    },
    complications: ["Recurrence", "Testicular atrophy", "Vas deferens injury", "Wound infection", "Hematoma"],
    tips: ["Protect vas deferens and vessels", "High ligation essential", "Check contralateral side", "Gentle dissection"]
  },
  {
    name: "Pyloric Stenosis Repair (Pyloromyotomy)",
    specialty: "Pediatric Surgery",
    description: "Ramstedt pyloromyotomy for hypertrophic pyloric stenosis in infants",
    duration: "30-45 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arms on arm boards", "NG tube in place"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from xiphoid to groin", "Four corner drapes", "Small laparotomy drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Pediatric general set"],
      specialInstruments: ["Pyloric spreader", "Small retractors", "Fine scissors"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Small delicate instruments",
      essentials: ["Scalpel", "Pyloric spreader", "Small retractors", "Fine sutures"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Incision", description: "Right upper quadrant or umbilical incision", instruments: ["Scalpel"] },
        { step: 2, title: "Pylorus Delivery", description: "Deliver pylorus into wound", instruments: ["Retractors", "Moist sponges"] },
        { step: 3, title: "Myotomy", description: "Incise serosa and muscle longitudinally", instruments: ["Scalpel", "Pyloric spreader"] },
        { step: 4, title: "Mucosal Integrity", description: "Verify intact mucosa", instruments: ["Air/saline test"] },
        { step: 5, title: "Closure", description: "Close fascia and skin", instruments: ["Absorbable suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "Weight-based" },
        { name: "Normal Saline", use: "Hydration/irrigation", amount: "As needed" }
      ]
    },
    complications: ["Incomplete myotomy", "Mucosal perforation", "Duodenal perforation", "Wound infection", "Recurrence (rare)"],
    tips: ["Correct electrolyte imbalance preop", "Verify mucosal integrity", "Adequate myotomy essential", "Resume feeds gradually postop"]
  },
  {
    name: "Nissen Fundoplication (Pediatric)",
    specialty: "Pediatric Surgery",
    description: "Antireflux surgery wrapping gastric fundus around esophagus",
    duration: "90-120 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arms tucked", "Reverse Trendelenburg", "NG tube in place"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to groin", "Four corner drapes", "Laparoscopic drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Pediatric laparoscopic set"],
      specialInstruments: ["Liver retractor", "Atraumatic graspers", "Energy device"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Laparoscopic fundoplication instruments",
      essentials: ["Trocars", "Graspers", "Scissors", "Needle driver", "Sutures"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Access", description: "Create pneumoperitoneum and place trocars", instruments: ["Trocars"] },
        { step: 2, title: "Hiatal Dissection", description: "Dissect crura and mobilize esophagus", instruments: ["Graspers", "Energy device"] },
        { step: 3, title: "Fundus Mobilization", description: "Mobilize gastric fundus, divide short gastrics", instruments: ["Energy device"] },
        { step: 4, title: "Wrap Creation", description: "Create 360-degree fundoplication wrap", instruments: ["Graspers", "Sutures"] },
        { step: 5, title: "Crural Closure", description: "Close crural defect posterior to esophagus", instruments: ["Sutures"] },
        { step: 6, title: "Closure", description: "Remove instruments and close ports", instruments: ["Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "Weight-based" },
        { name: "Normal Saline", use: "Irrigation", amount: "500mL" }
      ]
    },
    complications: ["Dysphagia", "Gas bloat syndrome", "Wrap herniation", "Recurrent reflux", "Splenic injury"],
    tips: ["Floppy wrap (loose)", "Adequate esophageal mobilization", "Short gastrics division important", "Calibrate wrap size carefully"]
  },
  {
    name: "Gastrostomy Tube Placement (Pediatric)",
    specialty: "Pediatric Surgery",
    description: "Surgical placement of feeding tube into stomach",
    duration: "30-45 min",
    difficulty: "Basic",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arms on arm boards", "NG tube in place"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to groin", "Four corner drapes", "Laparoscopic or open drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Pediatric general set or laparoscopic set"],
      specialInstruments: ["G-tube kit", "Purse-string sutures", "Trocars if laparoscopic"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "G-tube placement instruments",
      essentials: ["Scalpel", "Retractors", "G-tube", "Sutures", "Clamps"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Access", description: "Left upper quadrant incision or laparoscopic", instruments: ["Scalpel or trocars"] },
        { step: 2, title: "Stomach Identification", description: "Identify anterior gastric wall", instruments: ["Graspers"] },
        { step: 3, title: "Gastrotomy", description: "Create small gastrotomy", instruments: ["Scalpel", "Electrocautery"] },
        { step: 4, title: "Tube Placement", description: "Insert G-tube through gastrotomy", instruments: ["G-tube"] },
        { step: 5, title: "Gastropexy", description: "Secure stomach to abdominal wall", instruments: ["Purse-string sutures"] },
        { step: 6, title: "Closure", description: "Close fascia and secure tube", instruments: ["Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "Weight-based" },
        { name: "Normal Saline", use: "Irrigation", amount: "250mL" }
      ]
    },
    complications: ["Tube dislodgement", "Infection", "Peritonitis", "Bleeding", "Granulation tissue"],
    tips: ["Secure gastropexy important", "Confirm placement before use", "Leave to gravity initially", "Parent education crucial"]
  },
  {
    name: "Malrotation with Volvulus Repair (Ladd's Procedure)",
    specialty: "Pediatric Surgery",
    description: "Emergency correction of intestinal malrotation with or without midgut volvulus",
    duration: "90-150 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arms on arm boards", "NG tube in place", "Foley catheter"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to groin", "Four corner drapes", "Laparotomy drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Pediatric general set"],
      specialInstruments: ["Bowel clamps", "Moist laparotomy sponges", "Vascular instruments if needed"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Abdominal exploration and bowel instruments",
      essentials: ["Retractors", "Bowel clamps", "Scissors", "Forceps", "Suction"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Incision", description: "Right upper quadrant or midline incision", instruments: ["Scalpel", "Electrocautery"] },
        { step: 2, title: "Detorsion", description: "Untwist volvulus counterclockwise", instruments: ["Gentle manual manipulation"] },
        { step: 3, title: "Ladd's Bands", description: "Divide Ladd's bands", instruments: ["Scissors", "Electrocautery"] },
        { step: 4, title: "Bowel Broadening", description: "Broaden mesenteric base", instruments: ["Manual"] },
        { step: 5, title: "Appendectomy", description: "Perform appendectomy", instruments: ["Standard appendectomy instruments"] },
        { step: 6, title: "Bowel Assessment", description: "Assess bowel viability, resect if needed", instruments: ["Warm packs, observation"] },
        { step: 7, title: "Closure", description: "Close abdomen", instruments: ["Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Broad-spectrum antibiotics", use: "Sepsis prevention", amount: "Weight-based" },
        { name: "Warm Normal Saline", use: "Bowel irrigation", amount: "1000mL" },
        { name: "Resuscitation fluids", use: "Shock management", amount: "As needed" }
      ]
    },
    complications: ["Bowel necrosis", "Short gut syndrome", "Adhesions", "Recurrent volvulus", "Death"],
    tips: ["Emergency surgery", "Gentle detorsion", "Assess bowel viability carefully", "May need second look"]
  },
  {
    name: "Hirschsprung's Disease Pull-Through",
    specialty: "Pediatric Surgery",
    description: "Definitive surgical repair removing aganglionic bowel segment",
    duration: "180-300 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Lithotomy position (pediatric stirrups)", "Arms on arm boards", "Foley catheter", "NG tube"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to mid-thighs and perineum", "Four corner drapes", "Laparoscopic drape", "Perineal drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Pediatric laparoscopic set", "Colorectal set"],
      specialInstruments: ["Transanal instruments", "Energy device", "Circular stapler (if used)"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Complex bowel resection setup",
      essentials: ["Laparoscopic instruments", "Bowel clamps", "Staplers", "Sutures"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Laparoscopic Mobilization", description: "Mobilize colon laparoscopically", instruments: ["Trocars", "Graspers", "Energy device"] },
        { step: 2, title: "Rectal Dissection", description: "Dissect rectum to pelvic floor", instruments: ["Laparoscopic instruments"] },
        { step: 3, title: "Transanal Dissection", description: "Mucosectomy and rectal dissection from below", instruments: ["Transanal retractors", "Electrocautery"] },
        { step: 4, title: "Pull-Through", description: "Pull normal colon through rectal muscular cuff", instruments: ["Graspers"] },
        { step: 5, title: "Anastomosis", description: "Create coloanal anastomosis", instruments: ["Absorbable sutures"] },
        { step: 6, title: "Closure", description: "Close laparoscopic ports", instruments: ["Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Broad-spectrum antibiotics", use: "Prophylaxis", amount: "Weight-based" },
        { name: "Normal Saline", use: "Irrigation", amount: "1000mL" },
        { name: "Metronidazole", use: "Anaerobic coverage", amount: "Weight-based" }
      ]
    },
    complications: ["Anastomotic leak", "Stricture", "Enterocolitis", "Incontinence", "Adhesive obstruction"],
    tips: ["Frozen section to confirm ganglion cells", "Avoid tension on anastomosis", "Meticulous technique", "Diverting colostomy sometimes needed"]
  },
  {
    name: "Cleft Lip Repair",
    specialty: "Pediatric Surgery",
    description: "Surgical correction of congenital cleft lip deformity",
    duration: "90-120 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine with head extended", "Shoulder roll", "Arms on arm boards", "Throat pack placed"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Face and lip prep", "Head drape with face exposure", "Sterile field around mouth"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Plastic surgery set", "Cleft lip set"],
      specialInstruments: ["Fine scissors", "Skin hooks", "Caliper for measurements", "Fine sutures"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Delicate plastic surgery instruments",
      essentials: ["Scalpel", "Fine scissors", "Skin hooks", "Needle holders", "Microsutures"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Markings", description: "Mark key anatomic landmarks and incisions", instruments: ["Marking pen", "Caliper"] },
        { step: 2, title: "Incision", description: "Incise along marked lines", instruments: ["Scalpel"] },
        { step: 3, title: "Flap Dissection", description: "Create and mobilize flaps", instruments: ["Fine scissors", "Skin hooks"] },
        { step: 4, title: "Muscle Repair", description: "Reconstruct orbicularis oris muscle", instruments: ["Absorbable suture"] },
        { step: 5, title: "Mucosal Closure", description: "Close oral mucosa", instruments: ["Absorbable suture"] },
        { step: 6, title: "Skin Closure", description: "Meticulous skin closure", instruments: ["Fine sutures"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "Weight-based" },
        { name: "Epinephrine solution", use: "Hemostasis", amount: "1:200,000" },
        { name: "Antibiotic ointment", use: "Wound care", amount: "As needed" }
      ]
    },
    complications: ["Dehiscence", "Asymmetry", "Scarring", "Infection", "Need for revision"],
    tips: ["Precise measurements critical", "Minimize tension", "Protect airway", "Arm restraints postop"]
  },
  {
    name: "Cleft Palate Repair",
    specialty: "Pediatric Surgery",
    description: "Surgical closure of congenital cleft palate",
    duration: "120-180 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine with head extended on shoulder roll", "Mouth gag in place", "Arms on arm boards"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Oral prep", "Head drape with oral cavity exposure", "Sterile field around mouth"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Plastic surgery set", "Cleft palate set"],
      specialInstruments: ["Mouth gag", "Palate elevator", "Fine scissors and sutures"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Intraoral plastic instruments",
      essentials: ["Mouth gag", "Palate instruments", "Fine scissors", "Needle holders", "Sutures"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Exposure", description: "Place mouth gag for exposure", instruments: ["Mouth gag"] },
        { step: 2, title: "Incisions", description: "Make incisions along cleft margins", instruments: ["Scalpel"] },
        { step: 3, title: "Flap Elevation", description: "Elevate mucoperiosteal flaps", instruments: ["Palate elevator"] },
        { step: 4, title: "Muscle Reconstruction", description: "Reconstruct levator sling", instruments: ["Absorbable suture"] },
        { step: 5, title: "Palate Closure", description: "Close nasal, muscle, and oral layers", instruments: ["Absorbable sutures"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "Weight-based" },
        { name: "Epinephrine solution", use: "Hemostasis", amount: "1:200,000" },
        { name: "Dexamethasone", use: "Reduce edema", amount: "0.25mg/kg" }
      ]
    },
    complications: ["Dehiscence", "Fistula", "VPI (velopharyngeal insufficiency)", "Feeding difficulty", "Need for revision"],
    tips: ["Maintain airway vigilance", "Tension-free closure", "Multiple layers essential", "Avoid arm restraints if possible"]
  },
  {
    name: "Undescended Testis Repair (Orchiopexy)",
    specialty: "Pediatric Surgery",
    description: "Surgical fixation of undescended testis into scrotum",
    duration: "45-75 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Frog-leg position", "Arms on arm boards"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from umbilicus to mid-thighs", "Four corner drapes", "Groin drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Pediatric general set"],
      specialInstruments: ["Small retractors", "Vessel loops", "Dartos pouch instruments"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Delicate instruments for cord and testis",
      essentials: ["Small retractors", "Scissors", "Clamps", "Absorbable sutures"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Inguinal Incision", description: "Incision in inguinal crease", instruments: ["Scalpel"] },
        { step: 2, title: "Testis Mobilization", description: "Mobilize testis and cord", instruments: ["Scissors", "Vessel loops"] },
        { step: 3, title: "Hernia Sac", description: "Ligate patent processus vaginalis", instruments: ["Absorbable suture"] },
        { step: 4, title: "Scrotal Pouch", description: "Create dartos pouch in scrotum", instruments: ["Scissors", "Retractors"] },
        { step: 5, title: "Testis Placement", description: "Position testis in scrotum and secure", instruments: ["Absorbable sutures"] },
        { step: 6, title: "Closure", description: "Close inguinal and scrotal incisions", instruments: ["Absorbable suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis (optional)", amount: "Weight-based" },
        { name: "Bupivacaine", use: "Ilioinguinal block", amount: "Weight-based" }
      ]
    },
    complications: ["Testicular atrophy", "Retraction", "Hematoma", "Wound infection", "Infertility (bilateral)"],
    tips: ["Gentle tissue handling", "Adequate cord length essential", "Avoid vascular compromise", "Consider laparoscopy if nonpalpable"]
  },
  {
    name: "Hypospadias Repair",
    specialty: "Pediatric Surgery",
    description: "Surgical correction of abnormal urethral opening on ventral penis",
    duration: "90-180 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine frog-leg position", "Arms on arm boards", "Sterile tourniquet at penile base"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep genitalia and lower abdomen", "Fenestrated drape exposing penis"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Plastic surgery set", "Hypospadias set"],
      specialInstruments: ["Fine scissors", "Skin hooks", "Loupes/microscope", "Urethral sounds"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Microsurgical plastic instruments",
      essentials: ["Fine scissors", "Skin hooks", "Needle holders", "Microsutures", "Catheter"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Tourniquet & Marking", description: "Apply tourniquet and mark incisions", instruments: ["Penile tourniquet", "Marking pen"] },
        { step: 2, title: "Urethral Plate", description: "Mobilize urethral plate", instruments: ["Fine scissors", "Skin hooks"] },
        { step: 3, title: "Neourethra Creation", description: "Tubularize urethra or graft", instruments: ["Microsutures"] },
        { step: 4, title: "Glanuloplasty", description: "Reconstruct glans", instruments: ["Absorbable sutures"] },
        { step: 5, title: "Skin Closure", description: "Close penile skin", instruments: ["Microsutures"] },
        { step: 6, title: "Stent Placement", description: "Place urethral stent", instruments: ["Foley or stent catheter"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "Weight-based" },
        { name: "Epinephrine solution", use: "Hemostasis", amount: "1:200,000" },
        { name: "Antibiotic ointment", use: "Wound care", amount: "As needed" }
      ]
    },
    complications: ["Fistula", "Stricture", "Dehiscence", "Meatal stenosis", "Need for revision"],
    tips: ["Magnification essential", "Tension-free closure", "Avoid hematoma", "Secure stent well"]
  },
  {
    name: "Meckel's Diverticulum Resection",
    specialty: "Pediatric Surgery",
    description: "Surgical removal of Meckel's diverticulum causing symptoms",
    duration: "45-75 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arms tucked or on arm boards", "NG tube in place", "Foley catheter"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to groin", "Four corner drapes", "Laparoscopic or open drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Pediatric general set or laparoscopic set"],
      specialInstruments: ["Bowel clamps", "GIA stapler or hand-sewn instruments"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Small bowel resection instruments",
      essentials: ["Bowel clamps", "Scissors", "Staplers or sutures", "Suction"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Access", description: "Periumbilical or RLQ incision, or laparoscopic", instruments: ["Scalpel or trocars"] },
        { step: 2, title: "Identification", description: "Identify Meckel's diverticulum on ileum", instruments: ["Manual palpation"] },
        { step: 3, title: "Resection", description: "Resect diverticulum or wedge/segmental resection", instruments: ["Staplers or clamps and sutures"] },
        { step: 4, title: "Anastomosis", description: "If segmental, perform anastomosis", instruments: ["Staplers or hand-sewn"] },
        { step: 5, title: "Closure", description: "Close abdomen", instruments: ["Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "Weight-based" },
        { name: "Normal Saline", use: "Irrigation", amount: "500mL" }
      ]
    },
    complications: ["Anastomotic leak", "Obstruction", "Bleeding", "Infection", "Ileus"],
    tips: ["Include ectopic tissue in resection", "Wide base may need segmental resection", "Send to pathology", "Inspect entire bowel"]
  },
  {
    name: "Intussusception Reduction",
    specialty: "Pediatric Surgery",
    description: "Surgical or pneumatic reduction of telescoped bowel segment",
    duration: "30-90 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arms on arm boards", "NG tube in place", "IV access"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to groin", "Four corner drapes", "Laparotomy drape if surgical"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Pediatric general set (if surgical)", "Fluoroscopy (if pneumatic/hydrostatic)"],
      specialInstruments: ["Bowel clamps", "Warm packs"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Abdominal exploration instruments if surgical",
      essentials: ["Retractors", "Bowel clamps", "Warm packs", "Suction"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Attempt Nonoperative", description: "Try air or contrast enema reduction first (radiology)", instruments: ["Fluoroscopy equipment"] },
        { step: 2, title: "Surgical Access", description: "If failed, proceed with laparotomy", instruments: ["Scalpel", "Electrocautery"] },
        { step: 3, title: "Reduction", description: "Manually reduce intussusception", instruments: ["Gentle manual pressure"] },
        { step: 4, title: "Bowel Assessment", description: "Assess viability, resect if necrotic", instruments: ["Observation", "Warm packs"] },
        { step: 5, title: "Lead Point", description: "Look for and remove pathologic lead point", instruments: ["Scissors", "Electrocautery"] },
        { step: 6, title: "Closure", description: "Close abdomen", instruments: ["Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Broad-spectrum antibiotics", use: "If surgical", amount: "Weight-based" },
        { name: "IV fluids", use: "Resuscitation", amount: "20mL/kg boluses" },
        { name: "Normal Saline", use: "Irrigation", amount: "500mL" }
      ]
    },
    complications: ["Bowel perforation", "Recurrence", "Bowel necrosis", "Short gut if resection", "Sepsis"],
    tips: ["Attempt nonoperative first", "Gentle reduction to avoid perforation", "Inspect for lead point", "High recurrence in older children"]
  },

  // Trauma Surgery (15 procedures)
  {
    name: "Exploratory Laparotomy for Trauma",
    specialty: "Trauma Surgery",
    description: "Emergency abdominal exploration for penetrating or blunt trauma",
    duration: "90-240 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arms extended on arm boards", "Full body prep", "Foley catheter and NG tube"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from neck to knees (entire torso)", "Wide sterile field", "Large laparotomy drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major trauma set", "Vascular set", "Bowel set"],
      specialInstruments: ["Aortic clamp", "Cell saver", "Rapid infuser", "Retractors"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Immediate access to hemorrhage control instruments",
      essentials: ["Large clamps", "Suction", "Lap sponges", "Vascular instruments"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Rapid Entry", description: "Midline incision from xiphoid to pubis", instruments: ["Scalpel", "Electrocautery"] },
        { step: 2, title: "Hemorrhage Control", description: "Pack all quadrants, identify bleeding", instruments: ["Lap sponges", "Clamps"] },
        { step: 3, title: "Systematic Exploration", description: "Examine all organs and retroperitoneum", instruments: ["Retractors", "Manual palpation"] },
        { step: 4, title: "Repair Injuries", description: "Repair or resect damaged organs/vessels", instruments: ["Varies by injury"] },
        { step: 5, title: "Damage Control", description: "Pack, temporize if unstable", instruments: ["Lap pads", "Temporary closure"] },
        { step: 6, title: "Closure or Open", description: "Close fascia or leave open abdomen", instruments: ["Suture or temporary closure system"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Broad-spectrum antibiotics", use: "Prophylaxis", amount: "Cefazolin 2g + metronidazole" },
        { name: "Tranexamic acid", use: "Hemorrhage control", amount: "1g IV" },
        { name: "Blood products", use: "Resuscitation", amount: "MTP (massive transfusion protocol)" }
      ]
    },
    complications: ["Exsanguination", "Hypothermia", "Coagulopathy", "Abdominal compartment syndrome", "Multi-organ failure"],
    tips: ["MTP activation early", "Damage control mindset", "Prevent hypothermia", "Pack don't chase bleeders"]
  },
  {
    name: "Emergency Department Thoracotomy",
    specialty: "Trauma Surgery",
    description: "Resuscitative thoracotomy in the ED for cardiac tamponade or arrest",
    duration: "10-30 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Left arm abducted", "CPR in progress"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Rapid betadine prep of left chest", "Minimal or no draping"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["ED thoracotomy tray"],
      specialInstruments: ["Rib spreader", "Aortic cross-clamp", "Internal defibrillator paddles"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Rapid access thoracotomy instruments",
      essentials: ["Scalpel", "Mayo scissors", "Rib spreader", "Vascular clamps", "Sutures"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Incision", description: "Left anterolateral thoracotomy 4th-5th intercostal space", instruments: ["Scalpel", "Mayo scissors"] },
        { step: 2, title: "Chest Opening", description: "Rapidly open chest with rib spreader", instruments: ["Rib spreader"] },
        { step: 3, title: "Pericardiotomy", description: "Open pericardium to relieve tamponade", instruments: ["Scissors"] },
        { step: 4, title: "Cardiac Repair", description: "Repair cardiac injury if present", instruments: ["Pledgeted sutures", "Foley balloon"] },
        { step: 5, title: "Aortic Cross-Clamp", description: "Cross-clamp descending aorta if needed", instruments: ["Aortic clamp"] },
        { step: 6, title: "Internal Massage", description: "Perform open cardiac massage", instruments: ["Hands"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Epinephrine", use: "Cardiac arrest", amount: "1mg IV q3-5min" },
        { name: "Blood products", use: "Massive transfusion", amount: "MTP" },
        { name: "Calcium chloride", use: "Cardiac resuscitation", amount: "1g IV" }
      ]
    },
    complications: ["Death (high mortality)", "Iatrogenic injury", "Failure to resuscitate", "Neurologic injury"],
    tips: ["Indications: penetrating chest trauma with witnessed arrest", "Move to OR if ROSC", "Blunt trauma rarely successful", "Team communication critical"]
  },
  {
    name: "Tube Thoracostomy (Chest Tube Insertion)",
    specialty: "Trauma Surgery",
    description: "Insertion of chest tube for pneumothorax or hemothorax",
    duration: "15-30 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine or semi-recumbent", "Ipsilateral arm abducted overhead", "Exposure of lateral chest"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep lateral chest from axilla to costal margin", "Sterile drapes around insertion site"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Chest tube tray"],
      specialInstruments: ["Large Kelly clamp", "Chest tube (28-36Fr)", "Pleur-evac system"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Chest tube insertion instruments",
      essentials: ["Scalpel", "Kelly clamps", "Chest tube", "Suture", "Occlusive dressing"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Site Selection", description: "5th intercostal space, mid-axillary line", instruments: ["Palpation"] },
        { step: 2, title: "Anesthesia", description: "Local anesthesia to skin, periosteum, pleura", instruments: ["Syringe", "Lidocaine"] },
        { step: 3, title: "Incision", description: "2-3cm incision parallel to rib", instruments: ["Scalpel"] },
        { step: 4, title: "Blunt Dissection", description: "Dissect over rib into pleural space", instruments: ["Kelly clamp"] },
        { step: 5, title: "Tube Insertion", description: "Insert tube posteriorly and superiorly", instruments: ["Chest tube", "Kelly clamp"] },
        { step: 6, title: "Secure & Connect", description: "Suture tube, connect to drainage, CXR", instruments: ["Heavy silk suture", "Pleur-evac"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Lidocaine 1%", use: "Local anesthesia", amount: "20-30mL" },
        { name: "Cefazolin", use: "Prophylaxis (optional)", amount: "2g IV" }
      ]
    },
    complications: ["Malposition", "Injury to lung or vessels", "Infection", "Re-expansion pulmonary edema", "Persistent air leak"],
    tips: ["Go over the rib (never under)", "Digital exploration of tract", "Secure well to prevent dislodgement", "Confirm on CXR"]
  },
  {
    name: "FAST Exam (Focused Assessment with Sonography for Trauma)",
    specialty: "Trauma Surgery",
    description: "Ultrasound examination to detect free fluid in trauma patients",
    duration: "5-10 min",
    difficulty: "Basic",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Exposure of abdomen and chest"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["No draping required", "Ultrasound gel applied"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Ultrasound machine"],
      specialInstruments: ["Curvilinear or phased array probe", "Ultrasound gel"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "No mayo stand needed",
      essentials: ["Ultrasound probe", "Gel"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Pericardial View", description: "Subxiphoid or parasternal view for pericardial fluid", instruments: ["Ultrasound probe"] },
        { step: 2, title: "RUQ View", description: "Morrison's pouch and right hemidiaphragm", instruments: ["Ultrasound probe"] },
        { step: 3, title: "LUQ View", description: "Splenorenal recess and left hemidiaphragm", instruments: ["Ultrasound probe"] },
        { step: 4, title: "Pelvis View", description: "Pouch of Douglas for free fluid", instruments: ["Ultrasound probe"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Ultrasound gel", use: "Acoustic coupling", amount: "As needed" }
      ]
    },
    complications: ["False negative (early or small bleeds)", "Operator-dependent", "Limited by body habitus or subcutaneous air"],
    tips: ["Part of ATLS primary survey", "Positive FAST = OR in unstable patient", "Extended FAST includes thorax", "Serial exams if initially negative"]
  },
  {
    name: "Damage Control Laparotomy",
    specialty: "Trauma Surgery",
    description: "Abbreviated trauma surgery focusing on hemorrhage control and contamination",
    duration: "60-120 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arms extended", "Full body prep", "Active warming measures"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from neck to knees", "Wide sterile field", "Large laparotomy drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major trauma set", "Vascular set"],
      specialInstruments: ["Packing material", "Temporary abdominal closure device", "Rapid infuser"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Rapid hemorrhage control instruments",
      essentials: ["Large clamps", "Vascular instruments", "Lap pads", "Bowel staplers"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Control Hemorrhage", description: "Pack, clamp, ligate major bleeding", instruments: ["Lap pads", "Clamps", "Ties"] },
        { step: 2, title: "Control Contamination", description: "Staple off bowel injuries, no anastomoses", instruments: ["GIA staplers"] },
        { step: 3, title: "Abbreviated Repairs", description: "Temporary shunts, simple repairs only", instruments: ["Shunts", "Simple sutures"] },
        { step: 4, title: "Pack Abdomen", description: "Place packing for persistent ooze", instruments: ["Laparotomy pads"] },
        { step: 5, title: "Temporary Closure", description: "Leave abdomen open or vacuum dressing", instruments: ["Vacuum system or towel clip closure"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Blood products", use: "MTP", amount: "1:1:1 ratio RBC:FFP:Platelets" },
        { name: "Tranexamic acid", use: "Reduce bleeding", amount: "1g IV" },
        { name: "Calcium", use: "Correct hypocalcemia", amount: "1g IV" }
      ]
    },
    complications: ["Coagulopathy", "Hypothermia", "Acidosis (lethal triad)", "Abdominal compartment syndrome", "Death"],
    tips: ["Get out before lethal triad", "No definitive repairs", "Return to OR in 24-48hrs", "ICU resuscitation critical"]
  },
  {
    name: "Splenic Repair/Splenorrhaphy",
    specialty: "Trauma Surgery",
    description: "Attempt at splenic salvage with repair techniques",
    duration: "60-120 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Left side elevated if needed", "Arms extended"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to groin", "Four corner drapes", "Laparotomy drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set"],
      specialInstruments: ["Topical hemostatic agents", "Mesh wrap", "Argon beam coagulator"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Splenic repair and hemostasis instruments",
      essentials: ["Lap pads", "Topical hemostatics", "Large sutures", "Clamps"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Exposure", description: "Midline laparotomy, mobilize spleen", instruments: ["Retractors"] },
        { step: 2, title: "Hemorrhage Control", description: "Manual compression or clamp hilum", instruments: ["Hands", "Vascular clamp"] },
        { step: 3, title: "Repair Technique", description: "Topical agents, sutures, mesh wrap, or argon", instruments: ["Hemostatic agents", "Sutures", "Mesh"] },
        { step: 4, title: "Hemostasis Verification", description: "Release clamp and verify hemostasis", instruments: ["Observation"] },
        { step: 5, title: "Closure", description: "Close abdomen if successful", instruments: ["Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Topical hemostatic agents", use: "Local hemostasis", amount: "As needed (Surgicel, FloSeal, etc.)" }
      ]
    },
    complications: ["Failed splenorrhaphy requiring splenectomy", "Delayed splenic rupture", "Overwhelming post-splenectomy infection (OPSI)", "Bleeding"],
    tips: ["Low-grade injuries amenable", "High-grade or unstable = splenectomy", "Vaccines if splenectomy", "Observe closely postop"]
  },
  {
    name: "Liver Packing for Hemorrhage Control",
    specialty: "Trauma Surgery",
    description: "Perihepatic packing to control severe liver hemorrhage",
    duration: "30-60 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arms extended", "Full torso prep"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to groin", "Wide sterile field", "Laparotomy drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major trauma set"],
      specialInstruments: ["Multiple laparotomy pads", "Pringle maneuver clamp"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Packing and hemostasis instruments",
      essentials: ["Lap pads (many)", "Large clamps", "Suction", "Retractors"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Exposure", description: "Midline laparotomy", instruments: ["Scalpel", "Retractors"] },
        { step: 2, title: "Pringle Maneuver", description: "Clamp porta hepatis to control inflow", instruments: ["Vascular clamp or tourniquet"] },
        { step: 3, title: "Packing", description: "Place multiple pads around and under liver", instruments: ["Laparotomy pads"] },
        { step: 4, title: "Temporary Closure", description: "Close abdomen temporarily", instruments: ["Towel clips or vacuum system"] },
        { step: 5, title: "ICU Resuscitation", description: "Stabilize patient, return for pack removal in 24-48hrs", instruments: ["N/A - OR"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Blood products", use: "MTP", amount: "Massive transfusion" },
        { name: "Tranexamic acid", use: "Reduce bleeding", amount: "1g IV" }
      ]
    },
    complications: ["Abdominal compartment syndrome", "Coagulopathy", "Liver necrosis", "Abscess", "Death"],
    tips: ["Damage control technique", "Remove packs in 24-48hrs", "Monitor compartment pressure", "Angioembolization adjunct"]
  },
  {
    name: "Bowel Resection for Trauma",
    specialty: "Trauma Surgery",
    description: "Resection of damaged bowel segment in trauma setting",
    duration: "60-120 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Arms extended", "NG and Foley in place"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to groin", "Four corner drapes", "Laparotomy drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set", "Bowel set"],
      specialInstruments: ["GIA staplers", "Bowel clamps"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Bowel resection and anastomosis instruments",
      essentials: ["Bowel clamps", "Staplers", "Scissors", "Sutures", "Moist sponges"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Exposure", description: "Identify damaged bowel segment", instruments: ["Retractors"] },
        { step: 2, title: "Resection", description: "Resect damaged segment with margins", instruments: ["Bowel clamps", "Staplers or scissors"] },
        { step: 3, title: "Anastomosis or Ostomy", description: "Primary anastomosis if stable, ostomy if damage control", instruments: ["Staplers or hand-sewn", "Ostomy supplies"] },
        { step: 4, title: "Mesenteric Closure", description: "Close mesenteric defect if anastomosis", instruments: ["Absorbable suture"] },
        { step: 5, title: "Closure", description: "Close abdomen", instruments: ["Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Broad-spectrum antibiotics", use: "Contamination prophylaxis", amount: "Cefoxitin or ceftriaxone/metronidazole" },
        { name: "Normal Saline", use: "Irrigation", amount: "2000mL" }
      ]
    },
    complications: ["Anastomotic leak", "Abscess", "Fistula", "Ileus", "Short gut if extensive resection"],
    tips: ["Damage control: staple off ends, no anastomosis", "Definitive: anastomosis if stable", "Irrigate copiously", "Mark ostomy site preop if possible"]
  },
  {
    name: "Vascular Repair/Shunt Insertion",
    specialty: "Trauma Surgery",
    description: "Repair of damaged blood vessel or temporary shunt placement",
    duration: "60-180 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Affected limb/area exposed", "Proximal and distal control access"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Wide prep around injury site", "Include proximal and distal control zones", "Vascular drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Vascular set"],
      specialInstruments: ["Vascular clamps", "Shunts (Javid, Pruitt)", "Vascular sutures"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Vascular repair instruments",
      essentials: ["Vascular clamps", "Shunts", "Prolene sutures", "Vessel loops", "Heparinized saline"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Proximal/Distal Control", description: "Obtain vascular control", instruments: ["Vascular clamps or tourniquets"] },
        { step: 2, title: "Exposure", description: "Expose damaged vessel", instruments: ["Scissors", "Retractors"] },
        { step: 3, title: "Debridement", description: "Debride damaged vessel edges", instruments: ["Scissors"] },
        { step: 4, title: "Repair or Shunt", description: "Primary repair, patch, graft, or temporary shunt", instruments: ["Vascular sutures or shunt"] },
        { step: 5, title: "Reperfusion", description: "Release clamps and verify flow", instruments: ["Doppler"] },
        { step: 6, title: "Closure", description: "Close overlying tissue", instruments: ["Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Heparinized saline", use: "Vessel irrigation", amount: "100 units/mL" },
        { name: "Systemic heparin", use: "Anticoagulation (if appropriate)", amount: "50-100 units/kg IV" },
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" }
      ]
    },
    complications: ["Thrombosis", "Pseudoaneurysm", "AV fistula", "Limb ischemia", "Compartment syndrome"],
    tips: ["Damage control: temporary shunt, definitive later", "Repair without tension", "Check distal pulses", "Fasciotomy liberally"]
  },
  {
    name: "Four-Compartment Fasciotomy (Lower Leg)",
    specialty: "Trauma Surgery",
    description: "Emergency decompression of all four lower leg compartments",
    duration: "45-75 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Leg externally rotated and supported", "Entire leg prepped"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep entire leg from thigh to toes", "Sterile drape with leg free"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["General surgery set"],
      specialInstruments: ["Electrocautery", "Large scissors", "Retractors"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Incision and compartment release instruments",
      essentials: ["Scalpel", "Electrocautery", "Scissors", "Retractors"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Lateral Incision", description: "Longitudinal incision over lateral leg", instruments: ["Scalpel"] },
        { step: 2, title: "Lateral Compartments", description: "Release anterior and lateral compartments", instruments: ["Scissors"] },
        { step: 3, title: "Medial Incision", description: "Longitudinal incision over medial leg", instruments: ["Scalpel"] },
        { step: 4, title: "Medial Compartments", description: "Release superficial and deep posterior compartments", instruments: ["Scissors"] },
        { step: 5, title: "Verification", description: "Ensure all four compartments decompressed", instruments: ["Manual palpation"] },
        { step: 6, title: "Wound Management", description: "Leave open, plan for delayed closure/skin graft", instruments: ["Sterile dressing"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Tetanus prophylaxis", use: "If open fracture", amount: "As indicated" }
      ]
    },
    complications: ["Nerve injury (superficial peroneal, saphenous)", "Incomplete decompression", "Infection", "Wound management issues", "Amputation if delayed"],
    tips: ["Don't delay if diagnosis made", "Incise skin and fascia fully", "Two-incision technique standard", "Plan for return to OR for closure"]
  },
  {
    name: "Craniotomy for Epidural Hematoma",
    specialty: "Trauma Surgery",
    description: "Emergency craniotomy to evacuate epidural hematoma",
    duration: "90-180 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine or lateral position depending on hematoma location", "Head secured in pins", "Shoulder roll if needed"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Shave and prep scalp", "Head drape with exposure of surgical site"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Craniotomy set"],
      specialInstruments: ["Craniotome/drill", "Hemostatic agents", "Bipolar cautery"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Neurosurgical instruments",
      essentials: ["Scalpel", "Drill", "Rongeurs", "Bipolar", "Retractors", "Bone wax"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Incision", description: "Curvilinear scalp incision over hematoma", instruments: ["Scalpel", "Raney clips"] },
        { step: 2, title: "Burr Holes", description: "Create burr holes with craniotome", instruments: ["Craniotome/drill"] },
        { step: 3, title: "Bone Flap", description: "Connect burr holes and turn bone flap", instruments: ["Craniotome", "Elevator"] },
        { step: 4, title: "Dural Elevation", description: "Elevate dura and evacuate hematoma", instruments: ["Suction", "Forceps"] },
        { step: 5, title: "Hemostasis", description: "Control middle meningeal artery bleeding", instruments: ["Bipolar", "Hemostatic agents", "Bone wax"] },
        { step: 6, title: "Closure", description: "Replace bone flap and close scalp", instruments: ["Plates/screws", "Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Mannitol", use: "Reduce ICP", amount: "0.5-1g/kg IV" },
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Anticonvulsants", use: "Seizure prophylaxis", amount: "Levetiracetam 1000mg IV" }
      ]
    },
    complications: ["Rebleeding", "Seizures", "Infection", "CSF leak", "Brain injury", "Death"],
    tips: ["Emergent if signs of herniation", "Arterial bleeder from middle meningeal artery", "Replace bone flap if no swelling", "ICP monitoring postop"]
  },
  {
    name: "Trauma Neck Exploration",
    specialty: "Trauma Surgery",
    description: "Surgical exploration of neck for penetrating trauma",
    duration: "60-120 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Shoulder roll", "Head extended and turned away", "Entire neck and chest prepped"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from chin to nipples, ear to ear", "Wide sterile field", "Head drape with neck exposure"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major instrument set", "Vascular set"],
      specialInstruments: ["Vascular clamps", "Self-retaining retractor", "Nerve stimulator"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Vascular and neck exploration instruments",
      essentials: ["Vascular instruments", "Retractors", "Clamps", "Vessel loops", "Sutures"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Incision", description: "Incision along anterior border of SCM", instruments: ["Scalpel"] },
        { step: 2, title: "Zone Identification", description: "Identify zone of injury (I, II, III)", instruments: ["Manual"] },
        { step: 3, title: "Vascular Exploration", description: "Expose carotid, jugular, vertebral vessels", instruments: ["Retractors", "Vessel loops"] },
        { step: 4, title: "Airway/Esophagus", description: "Inspect trachea, larynx, esophagus", instruments: ["Retractors"] },
        { step: 5, title: "Injury Repair", description: "Repair vascular, airway, or esophageal injuries", instruments: ["Vascular sutures, tracheal repair"] },
        { step: 6, title: "Closure", description: "Drain placement, close in layers", instruments: ["Drain", "Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Broad-spectrum antibiotics", use: "Prophylaxis", amount: "Cefazolin + metronidazole" },
        { name: "Heparinized saline", use: "Vascular irrigation", amount: "100 units/mL" }
      ]
    },
    complications: ["Stroke", "Airway compromise", "Nerve injury (vagus, recurrent laryngeal, hypoglossal)", "Esophageal leak", "Death"],
    tips: ["Zone II most accessible", "Zone I/III may need sternotomy/thoracotomy extension", "CTA/angio helpful preop", "Have airway control plan"]
  },
  {
    name: "Pelvic Packing for Hemorrhage",
    specialty: "Trauma Surgery",
    description: "Preperitoneal pelvic packing for pelvic fracture hemorrhage",
    duration: "30-60 min",
    difficulty: "Intermediate",
    positioning: {
      title: "Patient Positioning",
      steps: ["Supine position", "Pelvic binder in place", "Full prep from chest to knees"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from nipples to mid-thighs", "Wide sterile field", "Laparotomy drape"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Major trauma set"],
      specialInstruments: ["Multiple laparotomy pads", "Large retractors"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Pelvic packing instruments",
      essentials: ["Scalpel", "Retractors", "Lap pads (many)", "Suction"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Incision", description: "Vertical midline or Pfannenstiel incision", instruments: ["Scalpel", "Electrocautery"] },
        { step: 2, title: "Peritoneum Elevation", description: "Elevate peritoneum without entering abdomen", instruments: ["Retractors", "Sponge sticks"] },
        { step: 3, title: "Packing", description: "Place pads in preperitoneal pelvic space bilaterally", instruments: ["Laparotomy pads"] },
        { step: 4, title: "Temporary Closure", description: "Close skin temporarily", instruments: ["Staples or towel clips"] },
        { step: 5, title: "Angioembolization", description: "Often adjunct - IR embolization", instruments: ["IR suite"] },
        { step: 6, title: "Pack Removal", description: "Return to OR in 24-48hrs for pack removal", instruments: ["OR"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Blood products", use: "MTP", amount: "Massive transfusion" },
        { name: "Tranexamic acid", use: "Reduce bleeding", amount: "1g IV" }
      ]
    },
    complications: ["Continued bleeding", "Abdominal compartment syndrome", "Infection", "Bladder injury", "Death"],
    tips: ["Use with pelvic binder and external fixation", "Angioembolization adjunct", "Remove packs early (24-48hrs)", "Damage control technique"]
  },
  {
    name: "Rib Fracture Fixation (SSRF)",
    specialty: "Trauma Surgery",
    description: "Surgical stabilization of rib fractures with plates",
    duration: "120-240 min",
    difficulty: "Advanced",
    positioning: {
      title: "Patient Positioning",
      steps: ["Lateral decubitus or supine with ipsilateral arm elevated", "Beanbag or positioning devices", "Entire hemithorax exposed"]
    },
    draping: {
      title: "Draping Protocol",
      steps: ["Prep from neck to iliac crest, sternum to spine", "Sterile drape with chest exposure"]
    },
    instruments: {
      title: "Instrumentation",
      basicSet: ["Thoracic set"],
      specialInstruments: ["Rib plates and screws", "Drill", "Periosteal elevator"]
    },
    mayoSetup: {
      title: "Mayo Stand Setup",
      layout: "Rib fixation instruments and hardware",
      essentials: ["Rib plates", "Drill", "Screwdriver", "Periosteal elevator", "Retractors"]
    },
    procedureSteps: {
      title: "Procedure Steps",
      steps: [
        { step: 1, title: "Incision", description: "Incision over fractured ribs", instruments: ["Scalpel", "Electrocautery"] },
        { step: 2, title: "Rib Exposure", description: "Expose fractured rib segments", instruments: ["Retractors", "Periosteal elevator"] },
        { step: 3, title: "Reduction", description: "Reduce rib fractures to anatomic position", instruments: ["Reduction clamps"] },
        { step: 4, title: "Plate Fixation", description: "Apply rib plates and screws", instruments: ["Rib plates", "Drill", "Screws"] },
        { step: 5, title: "Additional Ribs", description: "Repeat for additional fractured ribs", instruments: ["Same"] },
        { step: 6, title: "Chest Tube & Closure", description: "Place chest tube, close in layers", instruments: ["Chest tube", "Suture"] }
      ]
    },
    medications: {
      title: "Medications & Solutions",
      items: [
        { name: "Cefazolin", use: "Prophylaxis", amount: "2g IV" },
        { name: "Epidural or nerve block", use: "Pain control", amount: "Anesthesia-managed" }
      ]
    },
    complications: ["Pneumothorax", "Hardware failure", "Infection", "Chronic pain", "Neurovascular injury"],
    tips: ["Indications: flail chest, severe displacement, pain control failure", "Multimodal pain management", "Early mobilization postop", "Improves pulmonary mechanics"]
  }
];
