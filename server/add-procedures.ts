import { db } from './db';
import { procedures, specialties } from '@shared/schema';

async function addProcedures() {
  console.log('📊 Adding 10 procedures to each specialty...');

  try {
    // Get all specialties
    const allSpecialties = await db.select().from(specialties);
    
    // Get specialty IDs
    const getSpecialtyId = (name: string) => allSpecialties.find(s => s.name === name)?.id!;
    
    const generalSurgeryId = getSpecialtyId('General Surgery');
    const orthopedicsId = getSpecialtyId('Orthopedics');
    const cardiovascularId = getSpecialtyId('Cardiovascular');
    const neurosurgeryId = getSpecialtyId('Neurosurgery');
    const ophthalmologyId = getSpecialtyId('Ophthalmology');
    const obgynId = getSpecialtyId('Obstetrics & Gynecology');
    const urologyId = getSpecialtyId('Urology');
    const entId = getSpecialtyId('ENT (Otolaryngology)');
    const plasticId = getSpecialtyId('Plastic & Reconstructive');
    const pediatricId = getSpecialtyId('Pediatric Surgery');
    const bariatricId = getSpecialtyId('Bariatric Surgery');
    const thoracicId = getSpecialtyId('Thoracic Surgery');
    const cardiothoracicId = getSpecialtyId('Cardiothoracic');
    const maxillofacialId = getSpecialtyId('Oral & Maxillofacial');
    const colorectalId = getSpecialtyId('Colorectal Surgery');
    const traumaId = getSpecialtyId('Trauma Surgery');
    const transplantId = getSpecialtyId('Transplant Surgery');
    const vascularId = getSpecialtyId('Vascular Surgery');
    const oncologyId = getSpecialtyId('Surgical Oncology');
    const endocrineId = getSpecialtyId('Endocrine Surgery');

    const newProcedures = [
      // General Surgery (10)
      {
        name: 'Inguinal Hernia Repair (Open)',
        specialtyId: generalSurgeryId,
        description: 'Open surgical repair of inguinal hernia with mesh reinforcement',
        duration: '45-90 min',
        difficulty: 'Intermediate',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine position', 'Arms tucked at sides', 'Slight Trendelenburg', 'Pillow under knees for comfort']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep from nipples to mid-thigh', 'Four corner drapes', 'Large laparotomy drape']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Major instrument set', 'Self-retaining retractors'],
          specialInstruments: ['Mesh', 'Hernia instruments', 'Vessel loops']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Standard setup with retractors accessible',
          essentials: ['Retractors', 'Mesh', 'Sutures', 'Scissors']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Incision', description: 'Oblique incision in groin crease', instruments: ['Scalpel', 'Electrocautery'] },
            { step: 2, title: 'Exposure', description: 'Divide layers to inguinal canal', instruments: ['Retractors', 'Scissors'] },
            { step: 3, title: 'Hernia Reduction', description: 'Reduce hernia sac contents', instruments: ['Forceps', 'Scissors'] },
            { step: 4, title: 'Mesh Placement', description: 'Position and secure mesh', instruments: ['Mesh', 'Sutures'] },
            { step: 5, title: 'Closure', description: 'Layer closure of wound', instruments: ['Sutures', 'Needle holder'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Local anesthetic', use: 'Wound infiltration', amount: '20-30mL' },
            { name: 'Normal Saline', use: 'Irrigation', amount: '500mL' }
          ]
        },
        complications: ['Recurrence', 'Infection', 'Chronic pain', 'Nerve injury'],
        tips: ['Handle cord structures gently', 'Ensure mesh covers defect completely', 'Avoid tension on repair']
      },
      {
        name: 'Umbilical Hernia Repair',
        specialtyId: generalSurgeryId,
        description: 'Repair of umbilical hernia defect with or without mesh',
        duration: '30-60 min',
        difficulty: 'Basic',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine position', 'Arms extended on arm boards', 'Safety straps applied']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep abdomen from chest to pubis', 'Sterile towels around umbilicus', 'Standard laparotomy drape']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Basic instrument set'],
          specialInstruments: ['Small mesh (if needed)', 'Self-retaining retractor']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Simple setup with basic instruments',
          essentials: ['Retractors', 'Sutures', 'Scissors', 'Forceps']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Incision', description: 'Curved infraumbilical or periumbilical incision', instruments: ['Scalpel'] },
            { step: 2, title: 'Dissection', description: 'Identify and reduce hernia sac', instruments: ['Scissors', 'Forceps'] },
            { step: 3, title: 'Fascial Repair', description: 'Primary closure or mesh placement', instruments: ['Sutures', 'Mesh'] },
            { step: 4, title: 'Closure', description: 'Close layers and skin', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Marcaine', use: 'Local anesthesia', amount: '10-20mL' }
          ]
        },
        complications: ['Infection', 'Recurrence', 'Seroma formation'],
        tips: ['Preserve umbilical aesthetics', 'Use mesh for defects >2cm', 'Ensure adequate fascial closure']
      },
      {
        name: 'Ventral Hernia Repair',
        specialtyId: generalSurgeryId,
        description: 'Repair of abdominal wall hernia with mesh reinforcement',
        duration: '90-180 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine position', 'Arms extended', 'Prepare for possible component separation']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Wide prep from nipples to thighs', 'Bilateral flank exposure', 'Large drape']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Major set', 'Large retractors'],
          specialInstruments: ['Large mesh', 'Tacking device', 'Drain supplies']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Complex setup with mesh and fixation devices ready',
          essentials: ['Mesh', 'Tacks', 'Sutures', 'Drains']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Incision', description: 'Midline or previous scar incision', instruments: ['Scalpel', 'Electrocautery'] },
            { step: 2, title: 'Adhesiolysis', description: 'Carefully lyse adhesions', instruments: ['Scissors', 'Electrocautery'] },
            { step: 3, title: 'Defect Identification', description: 'Define all fascial defects', instruments: ['Retractors'] },
            { step: 4, title: 'Mesh Placement', description: 'Position mesh with adequate overlap', instruments: ['Mesh', 'Tacks'] },
            { step: 5, title: 'Drain Placement', description: 'Place closed suction drains', instruments: ['Drains'] },
            { step: 6, title: 'Closure', description: 'Multi-layer closure', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Normal Saline', use: 'Irrigation', amount: '1000mL' },
            { name: 'Antibiotics', use: 'Irrigation', amount: 'Per protocol' }
          ]
        },
        complications: ['Recurrence', 'Seroma', 'Mesh infection', 'Wound dehiscence'],
        tips: ['Use component separation for large defects', 'Ensure 5cm mesh overlap', 'Consider biologic mesh in contaminated fields']
      },
      {
        name: 'Breast Lumpectomy',
        specialtyId: generalSurgeryId,
        description: 'Excision of breast mass with clear margins',
        duration: '30-60 min',
        difficulty: 'Intermediate',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine with arm abducted 90°', 'Ipsilateral arm on arm board', 'Expose entire breast']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep breast and axilla', 'Towel drapes around operative field', 'Fenestrated drape']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Minor set', 'Breast instruments'],
          specialInstruments: ['Electrocautery', 'Specimen container', 'Marking sutures']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Simple setup with careful specimen handling',
          essentials: ['Scalpel', 'Retractors', 'Electrocautery', 'Sutures']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Localization', description: 'Identify mass by palpation or wire', instruments: ['Localization wire'] },
            { step: 2, title: 'Incision', description: 'Cosmetic incision over mass', instruments: ['Scalpel'] },
            { step: 3, title: 'Excision', description: 'Remove mass with margin', instruments: ['Electrocautery', 'Scissors'] },
            { step: 4, title: 'Specimen Orientation', description: 'Orient with marking sutures', instruments: ['Sutures'] },
            { step: 5, title: 'Hemostasis', description: 'Achieve complete hemostasis', instruments: ['Electrocautery'] },
            { step: 6, title: 'Closure', description: 'Layer closure with cosmetic skin closure', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Lidocaine with epinephrine', use: 'Local anesthesia', amount: '10-20mL' },
            { name: 'Methylene blue', use: 'Marking (optional)', amount: 'As needed' }
          ]
        },
        complications: ['Positive margins', 'Hematoma', 'Infection', 'Poor cosmesis'],
        tips: ['Orient specimen carefully', 'Achieve clear margins', 'Minimize tissue trauma', 'Send specimen fresh for pathology']
      },
      {
        name: 'Mastectomy',
        specialtyId: generalSurgeryId,
        description: 'Complete removal of breast tissue',
        duration: '90-180 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine with arm abducted', 'Prep chest wall broadly', 'Include axilla in field']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Wide prep from neck to abdomen', 'Lateral to table edge', 'Large drape with arm access']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Major set', 'Large retractors'],
          specialInstruments: ['Electrocautery', 'Skin paddles', 'Drains']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Organized for extensive dissection',
          essentials: ['Electrocautery', 'Retractors', 'Drains', 'Sutures']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Incision', description: 'Elliptical incision around breast', instruments: ['Scalpel'] },
            { step: 2, title: 'Flap Creation', description: 'Develop skin flaps to chest wall', instruments: ['Electrocautery', 'Scissors'] },
            { step: 3, title: 'Breast Removal', description: 'Remove breast tissue from pectoralis', instruments: ['Electrocautery'] },
            { step: 4, title: 'Axillary Dissection', description: 'Sentinel node or axillary dissection', instruments: ['Retractors', 'Clips'] },
            { step: 5, title: 'Drain Placement', description: 'Place closed suction drains', instruments: ['Drains'] },
            { step: 6, title: 'Closure', description: 'Close skin with careful technique', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Epinephrine solution', use: 'Hemostasis', amount: 'As needed' },
            { name: 'Normal Saline', use: 'Irrigation', amount: '500mL' }
          ]
        },
        complications: ['Seroma', 'Hematoma', 'Infection', 'Skin flap necrosis', 'Lymphedema'],
        tips: ['Preserve skin flaps carefully', 'Maintain hemostasis', 'Secure drains properly', 'Plan for reconstruction']
      },
      {
        name: 'Thyroid Lobectomy',
        specialtyId: generalSurgeryId,
        description: 'Removal of one lobe of the thyroid gland',
        duration: '90-120 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine with neck extension', 'Shoulder roll placement', 'Arms tucked', 'Head ring for stability']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep from chin to nipples', 'Lateral to neck margins', 'Head drape', 'Fenestrated sheet']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Minor set', 'Thyroid instruments'],
          specialInstruments: ['Nerve monitor', 'Vessel sealing device', 'Harmonic scalpel', 'Small retractors']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Delicate setup with nerve monitor ready',
          essentials: ['Small retractors', 'Nerve stimulator', 'Vessel sealer', 'Ties']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Incision', description: 'Cervical collar incision', instruments: ['Scalpel'] },
            { step: 2, title: 'Strap Muscle Division', description: 'Separate strap muscles', instruments: ['Electrocautery'] },
            { step: 3, title: 'Lobe Mobilization', description: 'Mobilize thyroid lobe', instruments: ['Retractors', 'Dissectors'] },
            { step: 4, title: 'Recurrent Nerve ID', description: 'Identify and preserve recurrent nerve', instruments: ['Nerve monitor'] },
            { step: 5, title: 'Vessel Ligation', description: 'Ligate superior and inferior vessels', instruments: ['Ties', 'Clips'] },
            { step: 6, title: 'Isthmus Division', description: 'Divide thyroid isthmus', instruments: ['Clamps', 'Sutures'] },
            { step: 7, title: 'Closure', description: 'Close layers without drain', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Lidocaine with epinephrine', use: 'Local infiltration', amount: '10-20mL' },
            { name: 'Normal Saline', use: 'Irrigation', amount: '250mL' }
          ]
        },
        complications: ['Recurrent nerve injury', 'Hypocalcemia', 'Hematoma', 'Hypothyroidism'],
        tips: ['Use nerve monitoring throughout', 'Identify parathyroids and preserve', 'Avoid traction on nerve', 'Watch for postop hematoma']
      },
      {
        name: 'Parathyroidectomy',
        specialtyId: generalSurgeryId,
        description: 'Removal of parathyroid adenoma',
        duration: '60-90 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine with neck extension', 'Shoulder roll', 'Arms tucked']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep neck widely', 'Include upper chest', 'Fenestrated drape']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Minor set', 'Thyroid/parathyroid instruments'],
          specialInstruments: ['Nerve monitor', 'Gamma probe (if using)', 'Micro instruments']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Delicate setup for precise dissection',
          essentials: ['Fine instruments', 'Nerve monitor', 'Vessel clips']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Incision', description: 'Small cervical incision', instruments: ['Scalpel'] },
            { step: 2, title: 'Exploration', description: 'Identify all parathyroids', instruments: ['Retractors'] },
            { step: 3, title: 'Adenoma Identification', description: 'Locate enlarged gland', instruments: ['Gamma probe'] },
            { step: 4, title: 'Careful Dissection', description: 'Dissect adenoma preserving nerve', instruments: ['Fine scissors', 'Nerve monitor'] },
            { step: 5, title: 'Removal', description: 'Remove adenoma intact', instruments: ['Clips'] },
            { step: 6, title: 'PTH Check', description: 'Send intraop PTH level', instruments: [] },
            { step: 7, title: 'Closure', description: 'Close in layers', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Methylene blue', use: 'Gland identification (optional)', amount: 'As needed' }
          ]
        },
        complications: ['Hypocalcemia', 'Recurrent nerve injury', 'Persistent hyperparathyroidism'],
        tips: ['Check intraop PTH levels', 'Preserve normal glands', 'Use nerve monitor', 'Consider 4-gland exploration if indicated']
      },
      {
        name: 'Splenectomy',
        specialtyId: generalSurgeryId,
        description: 'Removal of spleen (open or laparoscopic)',
        duration: '90-180 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine or right lateral decubitus', 'Left arm supported', 'Prep widely']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep from nipples to pelvis', 'Include left flank', 'Large laparotomy drape']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Major set', 'Large retractors'],
          specialInstruments: ['Vascular instruments', 'Staplers', 'Large specimen bag']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Vascular setup with staplers ready',
          essentials: ['Staplers', 'Ties', 'Clips', 'Retractors']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Incision', description: 'Midline or subcostal incision', instruments: ['Scalpel', 'Electrocautery'] },
            { step: 2, title: 'Mobilization', description: 'Divide splenic attachments', instruments: ['Electrocautery', 'Scissors'] },
            { step: 3, title: 'Hilar Control', description: 'Control splenic artery and vein', instruments: ['Staplers', 'Ties'] },
            { step: 4, title: 'Spleen Removal', description: 'Remove spleen carefully', instruments: ['Large clamps'] },
            { step: 5, title: 'Hemostasis', description: 'Ensure complete hemostasis', instruments: ['Electrocautery', 'Ties'] },
            { step: 6, title: 'Closure', description: 'Close abdomen in layers', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Normal Saline', use: 'Irrigation', amount: '1000mL' }
          ]
        },
        complications: ['Hemorrhage', 'Pancreatic injury', 'Overwhelming post-splenectomy infection (OPSI)', 'Thrombocytosis'],
        tips: ['Control hilum early if bleeding', 'Check for accessory spleens', 'Vaccinate postoperatively', 'Avoid pancreatic tail injury']
      },
      {
        name: 'Small Bowel Resection',
        specialtyId: generalSurgeryId,
        description: 'Resection of diseased small bowel segment with anastomosis',
        duration: '90-150 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine position', 'Arms extended', 'Foley catheter placed']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep from nipples to pubis', 'Wide bilateral prep', 'Laparotomy drape']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Major set', 'Bowel instruments'],
          specialInstruments: ['Staplers (GIA, TA)', 'Bowel clamps', 'Laparotomy pads']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Bowel setup with staplers accessible',
          essentials: ['Staplers', 'Bowel clamps', 'Sutures', 'Moist pads']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Incision', description: 'Midline laparotomy', instruments: ['Scalpel', 'Electrocautery'] },
            { step: 2, title: 'Exploration', description: 'Identify diseased segment', instruments: ['Retractors'] },
            { step: 3, title: 'Mobilization', description: 'Mobilize bowel segment', instruments: ['Scissors', 'Electrocautery'] },
            { step: 4, title: 'Mesenteric Division', description: 'Divide mesentery with vessels', instruments: ['Clamps', 'Ties', 'Staplers'] },
            { step: 5, title: 'Bowel Division', description: 'Divide bowel with staplers', instruments: ['GIA stapler'] },
            { step: 6, title: 'Anastomosis', description: 'Create side-to-side or end-to-end anastomosis', instruments: ['GIA stapler', 'Sutures'] },
            { step: 7, title: 'Closure', description: 'Close mesenteric defect and abdomen', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Normal Saline', use: 'Irrigation', amount: '1000mL' },
            { name: 'Antibiotics', use: 'Irrigation', amount: 'Per protocol' }
          ]
        },
        complications: ['Anastomotic leak', 'Obstruction', 'Short bowel syndrome', 'Bleeding'],
        tips: ['Ensure adequate blood supply', 'Tension-free anastomosis', 'Close mesenteric defects', 'Run bowel for other pathology']
      },
      {
        name: 'Colectomy (Partial)',
        specialtyId: generalSurgeryId,
        description: 'Resection of diseased colon segment',
        duration: '120-240 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine or modified lithotomy', 'Arms tucked or extended', 'Sequential compression devices']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep from nipples to knees', 'Include perineum if needed', 'Large drape']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Major set', 'Large retractors'],
          specialInstruments: ['Staplers (GIA, EEA)', 'Vascular instruments', 'Bowel instruments']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Complex setup with multiple staplers',
          essentials: ['Staplers', 'Vascular instruments', 'Retractors']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Incision', description: 'Midline or transverse laparotomy', instruments: ['Scalpel', 'Electrocautery'] },
            { step: 2, title: 'Mobilization', description: 'Mobilize colon segment', instruments: ['Scissors', 'Electrocautery'] },
            { step: 3, title: 'Vascular Control', description: 'Ligate mesenteric vessels', instruments: ['Clamps', 'Ties', 'Staplers'] },
            { step: 4, title: 'Bowel Division', description: 'Divide colon with staplers', instruments: ['GIA stapler'] },
            { step: 5, title: 'Anastomosis', description: 'Create colorectal anastomosis', instruments: ['EEA stapler', 'Sutures'] },
            { step: 6, title: 'Air Leak Test', description: 'Test anastomosis integrity', instruments: ['Rigid sigmoidoscope'] },
            { step: 7, title: 'Closure', description: 'Close abdomen', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Normal Saline', use: 'Irrigation', amount: '1000-2000mL' },
            { name: 'Betadine', use: 'Bowel prep', amount: 'As needed' }
          ]
        },
        complications: ['Anastomotic leak', 'Bleeding', 'Infection', 'Ileus', 'Ureter injury'],
        tips: ['Ensure adequate blood supply', 'No tension on anastomosis', 'Test anastomosis integrity', 'Consider diversion if high risk']
      },

      // Orthopedics (10)
      {
        name: 'Hip Arthroplasty (Total Hip Replacement)',
        specialtyId: orthopedicsId,
        description: 'Complete replacement of hip joint with prosthetic components',
        duration: '90-150 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Lateral decubitus position', 'Beanbag for stability', 'Axillary roll', 'Leg holders', 'Prep entire leg']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Circumferential prep', 'Impervious drapes', 'Extremity drape', 'Plastic adhesive drape']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Hip instruments', 'Power tools'],
          specialInstruments: ['Acetabular reamers', 'Femoral broaches', 'Trial components', 'Cement supplies', 'Implants']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Organized by procedure phase with trials accessible',
          essentials: ['Reamers', 'Broaches', 'Trials', 'Cement', 'Implants']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Incision', description: 'Posterolateral or anterolateral approach', instruments: ['Scalpel', 'Electrocautery'] },
            { step: 2, title: 'Hip Dislocation', description: 'Dislocate hip joint', instruments: ['Retractors', 'Bone hook'] },
            { step: 3, title: 'Femoral Neck Cut', description: 'Osteotomy of femoral neck', instruments: ['Oscillating saw'] },
            { step: 4, title: 'Acetabular Preparation', description: 'Ream acetabulum to size', instruments: ['Reamers'] },
            { step: 5, title: 'Cup Placement', description: 'Insert acetabular component', instruments: ['Cup inserter', 'Mallet'] },
            { step: 6, title: 'Femoral Preparation', description: 'Broach and prepare femur', instruments: ['Broaches', 'Reamers'] },
            { step: 7, title: 'Femoral Component', description: 'Insert femoral stem', instruments: ['Stem inserter', 'Cement gun'] },
            { step: 8, title: 'Reduction', description: 'Reduce hip with final components', instruments: ['Reduction tools'] },
            { step: 9, title: 'Closure', description: 'Layer closure with repair', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Antibiotic cement', use: 'Fixation', amount: 'As needed' },
            { name: 'Normal Saline', use: 'Irrigation', amount: '3000mL' },
            { name: 'Tranexamic acid', use: 'Blood loss reduction', amount: 'Per protocol' }
          ]
        },
        complications: ['Dislocation', 'Infection', 'DVT/PE', 'Leg length discrepancy', 'Nerve injury', 'Fracture'],
        tips: ['Check leg lengths', 'Ensure stable reduction', 'Copious irrigation', 'Assess nerve function', 'DVT prophylaxis']
      },
      {
        name: 'Shoulder Arthroplasty',
        specialtyId: orthopedicsId,
        description: 'Total or reverse shoulder replacement',
        duration: '120-180 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Beach chair position', 'Head secured', 'Arm free to move', 'Prep entire shoulder and arm']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep from neck to hand', 'U-drape around shoulder', 'Extremity drape', 'Stockinette over arm']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Shoulder set', 'Power tools'],
          specialInstruments: ['Glenoid reamers', 'Humeral broaches', 'Trials', 'Implants', 'Retractors']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Shoulder-specific setup with specialized retractors',
          essentials: ['Reamers', 'Trials', 'Retractors', 'Implants']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Incision', description: 'Deltopectoral approach', instruments: ['Scalpel'] },
            { step: 2, title: 'Rotator Interval', description: 'Open rotator interval', instruments: ['Scissors', 'Retractors'] },
            { step: 3, title: 'Subscapularis Management', description: 'Tenotomy or peel', instruments: ['Electrocautery'] },
            { step: 4, title: 'Humeral Preparation', description: 'Osteotomy and preparation', instruments: ['Saw', 'Broaches'] },
            { step: 5, title: 'Glenoid Preparation', description: 'Ream and prepare glenoid', instruments: ['Reamers'] },
            { step: 6, title: 'Component Implantation', description: 'Insert glenoid and humeral components', instruments: ['Inserters'] },
            { step: 7, title: 'Trial Reduction', description: 'Check stability and motion', instruments: ['Trials'] },
            { step: 8, title: 'Final Components', description: 'Insert final implants', instruments: ['Impactors'] },
            { step: 9, title: 'Repair', description: 'Repair subscapularis', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Antibiotic cement', use: 'Glenoid fixation', amount: 'As needed' },
            { name: 'Epinephrine', use: 'Hemostasis', amount: 'As needed' }
          ]
        },
        complications: ['Instability', 'Infection', 'Nerve injury', 'Fracture', 'Stiffness'],
        tips: ['Protect axillary nerve', 'Restore proper version', 'Ensure stable repair', 'Early motion protocol']
      },
      {
        name: 'Anterior Cruciate Ligament (ACL) Reconstruction',
        specialtyId: orthopedicsId,
        description: 'Reconstruction of torn ACL using graft',
        duration: '60-120 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine with leg holder', 'Thigh tourniquet', 'Foot of bed down for arthroscopy', 'Contralateral leg supported']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep from thigh to ankle', 'Stockinette application', 'Arthroscopy drape', 'Fluid collection system']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Arthroscopy set', 'ACL instruments'],
          specialInstruments: ['Arthroscope', 'Shavers', 'Graspers', 'Guidewires', 'Reamers', 'Graft preparation board']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Arthroscopic setup with graft prep area',
          essentials: ['Arthroscope', 'Shavers', 'Graft tools', 'Fixation devices']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Graft Harvest', description: 'Harvest hamstring or patellar tendon', instruments: ['Tendon stripper'] },
            { step: 2, title: 'Graft Preparation', description: 'Prepare and size graft', instruments: ['Graft board', 'Sutures'] },
            { step: 3, title: 'Arthroscopic Evaluation', description: 'Assess knee pathology', instruments: ['Arthroscope'] },
            { step: 4, title: 'Notchplasty', description: 'Prepare intercondylar notch', instruments: ['Shaver', 'Burr'] },
            { step: 5, title: 'Tunnel Creation', description: 'Drill femoral and tibial tunnels', instruments: ['Guidewires', 'Reamers'] },
            { step: 6, title: 'Graft Passage', description: 'Pass graft through tunnels', instruments: ['Passing sutures'] },
            { step: 7, title: 'Fixation', description: 'Fix graft with buttons/screws', instruments: ['Fixation devices'] },
            { step: 8, title: 'Final Assessment', description: 'Check graft tension and stability', instruments: ['Arthroscope'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Normal Saline', use: 'Arthroscopy irrigation', amount: '3000mL' },
            { name: 'Marcaine', use: 'Intra-articular injection', amount: '20mL' }
          ]
        },
        complications: ['Graft failure', 'Infection', 'Stiffness', 'Tunnel malposition', 'Neurovascular injury'],
        tips: ['Anatomic tunnel placement', 'Appropriate graft tension', 'Avoid roof impingement', 'Address concomitant pathology']
      },
      {
        name: 'Rotator Cuff Repair',
        specialtyId: orthopedicsId,
        description: 'Arthroscopic or open repair of torn rotator cuff tendons',
        duration: '90-150 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Beach chair or lateral decubitus', 'Arm in traction (if lateral)', 'Head secured', 'Access to shoulder']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep shoulder and arm', 'Arthroscopy drape', 'Arm holder draped', 'Fluid management']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Arthroscopy set', 'Rotator cuff instruments'],
          specialInstruments: ['Arthroscope', 'Shavers', 'Suture passers', 'Anchors', 'Knot pusher']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Arthroscopic setup with anchor system',
          essentials: ['Arthroscope', 'Anchors', 'Suture passers', 'Knot pushers']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Portal Placement', description: 'Establish arthroscopic portals', instruments: ['Spinal needle', 'Knife'] },
            { step: 2, title: 'Diagnostic Arthroscopy', description: 'Assess tear pattern', instruments: ['Arthroscope'] },
            { step: 3, title: 'Bursectomy', description: 'Remove bursal tissue', instruments: ['Shaver'] },
            { step: 4, title: 'Tear Mobilization', description: 'Free up tendon edges', instruments: ['Graspers', 'Shavers'] },
            { step: 5, title: 'Footprint Preparation', description: 'Prepare bone bed', instruments: ['Burr', 'Shaver'] },
            { step: 6, title: 'Anchor Placement', description: 'Insert suture anchors', instruments: ['Anchor inserter'] },
            { step: 7, title: 'Suture Passage', description: 'Pass sutures through tendon', instruments: ['Suture passers'] },
            { step: 8, title: 'Knot Tying', description: 'Secure repair with knots', instruments: ['Knot pusher'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Epinephrine solution', use: 'Hemostasis', amount: 'In irrigation' },
            { name: 'Ropivacaine', use: 'Interscalene block', amount: 'Per anesthesia' }
          ]
        },
        complications: ['Re-tear', 'Stiffness', 'Infection', 'Anchor pullout', 'Nerve injury'],
        tips: ['Adequate tendon mobilization', 'Secure fixation', 'Protect repair postop', 'Consider tear patterns']
      },
      {
        name: 'Ankle Fracture Open Reduction Internal Fixation (ORIF)',
        specialtyId: orthopedicsId,
        description: 'Surgical fixation of ankle fractures with plates and screws',
        duration: '90-180 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine with bump under hip', 'Prep entire leg', 'Tourniquet on thigh', 'Foot accessible for manipulation']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep from knee to toes', 'Stockinette', 'Extremity drape', 'Tourniquet cover']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Small fragment set', 'Ankle instruments'],
          specialInstruments: ['Plates', 'Screws', 'Power drill', 'Reduction clamps', 'K-wires']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Fracture fixation setup with imaging',
          essentials: ['Plates', 'Screws', 'Reduction tools', 'C-arm ready']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Lateral Incision', description: 'Approach lateral malleolus', instruments: ['Scalpel'] },
            { step: 2, title: 'Fibula Reduction', description: 'Reduce and fix fibula fracture', instruments: ['Clamps', 'Plate', 'Screws'] },
            { step: 3, title: 'Medial Incision', description: 'Approach medial malleolus if needed', instruments: ['Scalpel'] },
            { step: 4, title: 'Medial Fixation', description: 'Fix medial malleolus', instruments: ['Screws', 'K-wires'] },
            { step: 5, title: 'Syndesmosis Assessment', description: 'Evaluate and fix if unstable', instruments: ['Syndesmosis screw'] },
            { step: 6, title: 'Fluoroscopy Check', description: 'Confirm reduction and hardware', instruments: ['C-arm'] },
            { step: 7, title: 'Closure', description: 'Close incisions', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Normal Saline', use: 'Irrigation', amount: '500mL' },
            { name: 'Bupivacaine', use: 'Local anesthetic', amount: '20mL' }
          ]
        },
        complications: ['Malunion', 'Nonunion', 'Infection', 'Hardware failure', 'Wound complications'],
        tips: ['Anatomic reduction crucial', 'Fix fibula length first', 'Assess syndesmosis', 'Avoid soft tissue stripping']
      },
      {
        name: 'Carpal Tunnel Release',
        specialtyId: orthopedicsId,
        description: 'Decompression of median nerve at wrist',
        duration: '15-30 min',
        difficulty: 'Basic',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine with arm on hand table', 'Palm up', 'Tourniquet on upper arm', 'Fingers free']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep hand and forearm', 'Hand drape', 'Expose palm']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Minor hand set'],
          specialInstruments: ['Carpal tunnel knife', 'Small retractors', 'Tenotomy scissors']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Simple hand setup',
          essentials: ['Carpal tunnel knife', 'Retractors', 'Scissors']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Incision', description: 'Longitudinal palmar incision', instruments: ['Scalpel'] },
            { step: 2, title: 'Exposure', description: 'Expose transverse carpal ligament', instruments: ['Retractors'] },
            { step: 3, title: 'Release', description: 'Divide transverse carpal ligament', instruments: ['Carpal tunnel knife'] },
            { step: 4, title: 'Visualization', description: 'Visualize median nerve', instruments: ['Retractors'] },
            { step: 5, title: 'Hemostasis', description: 'Achieve hemostasis', instruments: ['Bipolar'] },
            { step: 6, title: 'Closure', description: 'Close skin only', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Lidocaine 1%', use: 'Local anesthesia', amount: '5-10mL' }
          ]
        },
        complications: ['Incomplete release', 'Nerve injury', 'Pillar pain', 'Scar tenderness'],
        tips: ['Complete release distally', 'Avoid nerve injury', 'Check motor branch', 'Early finger motion']
      },
      {
        name: 'Trigger Finger Release',
        specialtyId: orthopedicsId,
        description: 'Release of A1 pulley for trigger finger',
        duration: '15-30 min',
        difficulty: 'Basic',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine with hand on table', 'Palm up', 'Tourniquet if desired', 'Affected finger accessible']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep hand', 'Small fenestrated drape', 'Expose palm']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Minor hand set'],
          specialInstruments: ['Small blade', 'Tenotomy scissors', 'Fine forceps']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Minimal setup for small procedure',
          essentials: ['Blade', 'Scissors', 'Forceps']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Incision', description: 'Small transverse incision at A1 pulley', instruments: ['Blade'] },
            { step: 2, title: 'Exposure', description: 'Expose A1 pulley', instruments: ['Retractors'] },
            { step: 3, title: 'Release', description: 'Divide A1 pulley completely', instruments: ['Scissors'] },
            { step: 4, title: 'Confirmation', description: 'Confirm full finger flexion/extension', instruments: [] },
            { step: 5, title: 'Closure', description: 'Close skin', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Lidocaine', use: 'Local anesthesia', amount: '3-5mL' }
          ]
        },
        complications: ['Incomplete release', 'Neurovascular injury', 'Bowstringing', 'Infection'],
        tips: ['Complete A1 release', 'Protect digital nerves', 'Check flexor tendon', 'Early motion']
      },
      {
        name: 'Meniscectomy (Arthroscopic)',
        specialtyId: orthopedicsId,
        description: 'Arthroscopic partial removal of torn meniscus',
        duration: '30-60 min',
        difficulty: 'Intermediate',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine with leg holder', 'Thigh tourniquet', 'Foot of bed flexed', 'Pump and monitor setup']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep thigh to ankle', 'Stockinette', 'Arthroscopy drape', 'Fluid collection']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Arthroscopy set'],
          specialInstruments: ['Arthroscope', 'Shavers', 'Graspers', 'Probes', 'Baskets']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Standard arthroscopy setup',
          essentials: ['Arthroscope', 'Shavers', 'Probes', 'Graspers']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Portal Creation', description: 'Establish portals', instruments: ['Spinal needle', 'Blade'] },
            { step: 2, title: 'Diagnostic Scope', description: 'Systematic joint evaluation', instruments: ['Arthroscope'] },
            { step: 3, title: 'Tear Identification', description: 'Define tear pattern', instruments: ['Probe'] },
            { step: 4, title: 'Debridement', description: 'Remove unstable meniscal tissue', instruments: ['Shavers', 'Baskets'] },
            { step: 5, title: 'Contouring', description: 'Smooth and contour edges', instruments: ['Shavers'] },
            { step: 6, title: 'Final Inspection', description: 'Ensure stable rim', instruments: ['Arthroscope', 'Probe'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Normal Saline', use: 'Irrigation', amount: '3000mL' },
            { name: 'Marcaine', use: 'Intra-articular', amount: '20mL' }
          ]
        },
        complications: ['Incomplete resection', 'Chondral injury', 'Neurovascular injury', 'Arthritis progression'],
        tips: ['Remove only unstable tissue', 'Preserve peripheral rim', 'Smooth contours', 'Consider repair if possible']
      },
      {
        name: 'Spine Fusion (Lumbar)',
        specialtyId: orthopedicsId,
        description: 'Lumbar interbody fusion with instrumentation',
        duration: '180-300 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Prone on Wilson frame or Jackson table', 'Chest and pelvis supported', 'Abdomen free', 'Arms padded']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep from lower thoracic to sacrum', 'Wide lateral prep', 'Large drape with fenestration']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Spine set', 'Power tools'],
          specialInstruments: ['Pedicle screws', 'Rods', 'Cages', 'Nerve retractors', 'Neuromonitor']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Complex spine setup with implants organized',
          essentials: ['Screws', 'Rods', 'Cages', 'Retractors', 'Drill']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Incision', description: 'Midline posterior incision', instruments: ['Scalpel', 'Electrocautery'] },
            { step: 2, title: 'Exposure', description: 'Subperiosteal dissection', instruments: ['Electrocautery', 'Curettes'] },
            { step: 3, title: 'Pedicle Screw Placement', description: 'Insert pedicle screws bilaterally', instruments: ['Screws', 'Drill'] },
            { step: 4, title: 'Decompression', description: 'Laminectomy/foraminotomy', instruments: ['Kerrison', 'Drill'] },
            { step: 5, title: 'Discectomy', description: 'Remove disc material', instruments: ['Curettes', 'Rongeurs'] },
            { step: 6, title: 'Cage Placement', description: 'Insert interbody cage', instruments: ['Cage', 'Impactor'] },
            { step: 7, title: 'Rod Placement', description: 'Contour and place rods', instruments: ['Rods', 'Rod holder'] },
            { step: 8, title: 'Final Tightening', description: 'Lock all set screws', instruments: ['Drivers'] },
            { step: 9, title: 'Closure', description: 'Layer closure with drain', instruments: ['Sutures', 'Drain'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Bone graft', use: 'Fusion', amount: 'As needed' },
            { name: 'Vancomycin powder', use: 'Wound', amount: '1-2g' },
            { name: 'Tranexamic acid', use: 'Blood loss', amount: 'Per protocol' }
          ]
        },
        complications: ['Nerve injury', 'Dural tear', 'Hardware failure', 'Pseudarthrosis', 'Infection'],
        tips: ['Use neuromonitoring', 'Ensure adequate decompression', 'Proper screw placement', 'Restore lordosis']
      },
      {
        name: 'Distal Radius Fracture ORIF',
        specialtyId: orthopedicsId,
        description: 'Open reduction and volar plating of distal radius fracture',
        duration: '60-90 min',
        difficulty: 'Intermediate',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine with arm on hand table', 'Tourniquet on upper arm', 'C-arm positioning', 'Palm up approach']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep from elbow to hand', 'Hand table draped', 'Stockinette', 'Extremity drape']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Small fragment set'],
          specialInstruments: ['Volar plates', 'Locking screws', 'Reduction clamps', 'K-wires']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Wrist fracture setup with fluoroscopy',
          essentials: ['Plate', 'Screws', 'Reduction tools', 'C-arm']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Volar Incision', description: 'Flexor carpi radialis approach', instruments: ['Scalpel'] },
            { step: 2, title: 'Exposure', description: 'Expose pronator and distal radius', instruments: ['Retractors'] },
            { step: 3, title: 'Reduction', description: 'Reduce fracture', instruments: ['Clamps', 'K-wires'] },
            { step: 4, title: 'Plate Application', description: 'Apply volar locking plate', instruments: ['Plate'] },
            { step: 5, title: 'Screw Fixation', description: 'Insert locking screws', instruments: ['Screws', 'Drill'] },
            { step: 6, title: 'Fluoroscopy', description: 'Confirm reduction and hardware', instruments: ['C-arm'] },
            { step: 7, title: 'Closure', description: 'Close in layers', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Normal Saline', use: 'Irrigation', amount: '250mL' }
          ]
        },
        complications: ['Malunion', 'Tendon irritation', 'Carpal tunnel syndrome', 'Hardware prominence'],
        tips: ['Anatomic reduction', 'Protect flexor tendons', 'Avoid prominent screws', 'Early motion']
      },

      // Cardiovascular (10)
      {
        name: 'Aortic Valve Replacement (AVR)',
        specialtyId: cardiovascularId,
        description: 'Replacement of diseased aortic valve with prosthetic valve',
        duration: '180-300 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine position', 'Arms tucked', 'Prep from neck to knees', 'Defibrillator pads placed']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Wide sterile field', 'Median sternotomy drape', 'Leg prep for possible vein harvest']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Cardiac set', 'Sternal saw'],
          specialInstruments: ['Cardiopulmonary bypass circuit', 'Valve prosthesis', 'Valve sizers', 'Aortic cannulae']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Cardiac setup with valve instruments ready',
          essentials: ['Valve sizers', 'Sutures', 'Cannulae', 'Cardioplegia']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Sternotomy', description: 'Median sternotomy incision', instruments: ['Scalpel', 'Sternal saw'] },
            { step: 2, title: 'Cannulation', description: 'Aortic and venous cannulation', instruments: ['Cannulae', 'Purse strings'] },
            { step: 3, title: 'CPB Initiation', description: 'Start cardiopulmonary bypass', instruments: ['Bypass circuit'] },
            { step: 4, title: 'Cardioplegia', description: 'Arrest heart with cardioplegia', instruments: ['Cardioplegia needle'] },
            { step: 5, title: 'Aortotomy', description: 'Open ascending aorta', instruments: ['Scalpel', 'Scissors'] },
            { step: 6, title: 'Valve Excision', description: 'Remove diseased valve and calcium', instruments: ['Scissors', 'Rongeurs'] },
            { step: 7, title: 'Annulus Sizing', description: 'Size aortic annulus', instruments: ['Valve sizers'] },
            { step: 8, title: 'Valve Implantation', description: 'Suture prosthetic valve', instruments: ['Valve', 'Pledgeted sutures'] },
            { step: 9, title: 'Closure', description: 'Close aortotomy and wean from bypass', instruments: ['Sutures'] },
            { step: 10, title: 'Decannulation', description: 'Remove cannulae and close chest', instruments: ['Chest tubes', 'Wires'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Cardioplegia solution', use: 'Cardiac arrest', amount: 'As protocol' },
            { name: 'Heparin', use: 'Anticoagulation', amount: 'Weight-based' },
            { name: 'Protamine', use: 'Heparin reversal', amount: 'Calculated dose' }
          ]
        },
        complications: ['Bleeding', 'Stroke', 'Heart block', 'Paravalvular leak', 'Endocarditis'],
        tips: ['Thorough decalcification', 'Proper valve sizing', 'Secure sutures', 'De-air carefully']
      },
      {
        name: 'Mitral Valve Repair',
        specialtyId: cardiovascularId,
        description: 'Repair of mitral valve with annuloplasty',
        duration: '240-360 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine position', 'Arms tucked', 'TEE probe placement', 'Full sterile prep']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Sternotomy drape', 'Wide field for access', 'Groin access available']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Cardiac set', 'Mitral instruments'],
          specialInstruments: ['CPB circuit', 'Annuloplasty ring', 'Valve repair instruments', 'TEE']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Mitral valve repair setup',
          essentials: ['Annuloplasty rings', 'Chordal repair instruments', 'Leaflet instruments']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Sternotomy', description: 'Median sternotomy', instruments: ['Sternal saw'] },
            { step: 2, title: 'Cannulation', description: 'Establish CPB', instruments: ['Cannulae'] },
            { step: 3, title: 'Left Atriotomy', description: 'Enter left atrium', instruments: ['Scissors'] },
            { step: 4, title: 'Valve Assessment', description: 'Evaluate pathology', instruments: ['Retractors'] },
            { step: 5, title: 'Leaflet Repair', description: 'Repair leaflet pathology', instruments: ['Sutures', 'Scissors'] },
            { step: 6, title: 'Chordal Repair', description: 'Address chordal issues', instruments: ['Gore-Tex sutures'] },
            { step: 7, title: 'Annuloplasty', description: 'Place annuloplasty ring', instruments: ['Ring', 'Sutures'] },
            { step: 8, title: 'Water Test', description: 'Test repair competency', instruments: ['Saline'] },
            { step: 9, title: 'TEE Assessment', description: 'Evaluate repair on bypass', instruments: ['TEE'] },
            { step: 10, title: 'Closure', description: 'Close atrium and wean CPB', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Cardioplegia', use: 'Myocardial protection', amount: 'Per protocol' },
            { name: 'Heparin', use: 'Anticoagulation', amount: 'Weight-based' }
          ]
        },
        complications: ['Residual regurgitation', 'Systolic anterior motion', 'Heart block', 'Stroke'],
        tips: ['Comprehensive valve analysis', 'Verify repair with TEE', 'Address all pathology', 'Ring sizing critical']
      },
      {
        name: 'Pacemaker Insertion',
        specialtyId: cardiovascularId,
        description: 'Permanent pacemaker implantation',
        duration: '60-90 min',
        difficulty: 'Intermediate',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine position', 'Arm abducted', 'Shoulder roll if needed', 'Fluoroscopy access']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep from neck to nipple', 'Infraclavicular approach', 'Fenestrated drape', 'C-arm drapes']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Minor vascular set'],
          specialInstruments: ['Pacemaker generator', 'Leads', 'Guidewires', 'Lead introducers', 'PSA']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Pacemaker setup with sterile sleeves for fluoroscopy',
          essentials: ['Leads', 'Generator', 'Introducers', 'PSA']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Incision', description: 'Infraclavicular incision', instruments: ['Scalpel'] },
            { step: 2, title: 'Pocket Creation', description: 'Create subcutaneous pocket', instruments: ['Electrocautery'] },
            { step: 3, title: 'Venous Access', description: 'Cephalic vein or subclavian stick', instruments: ['Guidewire'] },
            { step: 4, title: 'Lead Placement', description: 'Advance leads to RA/RV', instruments: ['Leads', 'Fluoroscopy'] },
            { step: 5, title: 'Threshold Testing', description: 'Test capture and sensing', instruments: ['PSA'] },
            { step: 6, title: 'Lead Fixation', description: 'Secure leads to pectoralis', instruments: ['Sutures'] },
            { step: 7, title: 'Generator Connection', description: 'Connect leads to generator', instruments: ['Torque wrench'] },
            { step: 8, title: 'Closure', description: 'Close pocket in layers', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Lidocaine', use: 'Local anesthesia', amount: '20-30mL' },
            { name: 'Antibiotics', use: 'Pocket irrigation', amount: 'Per protocol' }
          ]
        },
        complications: ['Pneumothorax', 'Lead dislodgement', 'Infection', 'Perforation', 'Hematoma'],
        tips: ['Verify adequate thresholds', 'Secure leads well', 'Avoid tension', 'Careful hemostasis']
      },
      {
        name: 'Carotid Endarterectomy',
        specialtyId: cardiovascularId,
        description: 'Removal of atherosclerotic plaque from carotid artery',
        duration: '90-120 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine with head turned', 'Shoulder roll', 'Head ring', 'Arms tucked']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep from ear to clavicle', 'Lateral neck exposure', 'Head drape', 'Fenestrated sheet']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Vascular set', 'Carotid instruments'],
          specialInstruments: ['Shunt', 'Patch material', 'Doppler probe', 'Vascular clamps']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Vascular setup with shunt ready',
          essentials: ['Shunt', 'Patch', 'Clamps', 'Doppler']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Incision', description: 'Anterior sternocleidomastoid incision', instruments: ['Scalpel'] },
            { step: 2, title: 'Exposure', description: 'Expose carotid bifurcation', instruments: ['Retractors'] },
            { step: 3, title: 'Clamping', description: 'Clamp ICA, ECA, CCA', instruments: ['Vascular clamps'] },
            { step: 4, title: 'Arteriotomy', description: 'Longitudinal arteriotomy', instruments: ['Knife'] },
            { step: 5, title: 'Shunt Placement', description: 'Place shunt if needed', instruments: ['Shunt'] },
            { step: 6, title: 'Endarterectomy', description: 'Remove plaque carefully', instruments: ['Elevators'] },
            { step: 7, title: 'Patch Angioplasty', description: 'Close with patch', instruments: ['Patch', 'Sutures'] },
            { step: 8, title: 'Flow Restoration', description: 'Remove clamps sequentially', instruments: [] },
            { step: 9, title: 'Closure', description: 'Close neck without drain', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Heparin', use: 'Anticoagulation', amount: '5000 units' },
            { name: 'Protamine', use: 'Reversal (optional)', amount: 'As needed' }
          ]
        },
        complications: ['Stroke', 'Nerve injury', 'Hematoma', 'Restenosis', 'MI'],
        tips: ['Gentle plaque removal', 'Complete endpoint', 'Use shunt if EEG changes', 'Monitor cranial nerves']
      },
      {
        name: 'Abdominal Aortic Aneurysm Repair (Open)',
        specialtyId: cardiovascularId,
        description: 'Open repair of infrarenal AAA with graft',
        duration: '240-360 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine position', 'Arms extended', 'Prep widely', 'Foley and arterial line']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep nipples to knees', 'Include groins', 'Large laparotomy drape']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Major vascular set', 'Large retractors'],
          specialInstruments: ['Aortic clamps', 'Graft', 'Vascular sutures', 'Bovie']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Major vascular setup with grafts',
          essentials: ['Grafts', 'Aortic clamps', 'Vascular sutures', 'Heparin']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Laparotomy', description: 'Midline incision xiphoid to pubis', instruments: ['Scalpel', 'Bovie'] },
            { step: 2, title: 'Exposure', description: 'Retract bowel and expose aorta', instruments: ['Retractors'] },
            { step: 3, title: 'Proximal Control', description: 'Dissect and control infrarenal aorta', instruments: ['Clamps'] },
            { step: 4, title: 'Distal Control', description: 'Control iliac arteries', instruments: ['Clamps'] },
            { step: 5, title: 'Heparinization', description: 'Give systemic heparin', instruments: [] },
            { step: 6, title: 'Aortotomy', description: 'Open aneurysm sac', instruments: ['Scissors'] },
            { step: 7, title: 'Proximal Anastomosis', description: 'Sew graft to aorta', instruments: ['Graft', 'Prolene'] },
            { step: 8, title: 'Distal Anastomoses', description: 'Sew to iliacs', instruments: ['Graft limbs', 'Prolene'] },
            { step: 9, title: 'Reperfusion', description: 'Restore flow sequentially', instruments: [] },
            { step: 10, title: 'Closure', description: 'Close sac over graft and abdomen', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Heparin', use: 'Anticoagulation', amount: '100 units/kg' },
            { name: 'Protamine', use: 'Reversal', amount: 'As needed' },
            { name: 'Mannitol', use: 'Renal protection', amount: '12.5-25g' }
          ]
        },
        complications: ['Hemorrhage', 'Renal failure', 'Bowel ischemia', 'Spinal cord ischemia', 'MI'],
        tips: ['Proximal control first', 'Limit clamp time', 'Ensure distal perfusion', 'Monitor urine output']
      },
      {
        name: 'Peripheral Arterial Bypass',
        specialtyId: cardiovascularId,
        description: 'Fem-pop bypass for peripheral arterial disease',
        duration: '180-300 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine position', 'Leg externally rotated', 'Prep entire leg', 'Access to both groins']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep from umbilicus to toes', 'Include both legs', 'Extremity drapes']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Vascular set', 'Tunneler'],
          specialInstruments: ['Graft or vein harvest set', 'Doppler', 'Vascular clamps', 'Sutures']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Bypass setup with graft and tunneler',
          essentials: ['Graft', 'Tunneler', 'Clamps', 'Doppler']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Vein Harvest', description: 'Harvest greater saphenous vein', instruments: ['Scissors', 'Bovie'] },
            { step: 2, title: 'Groin Incision', description: 'Expose common femoral artery', instruments: ['Scalpel'] },
            { step: 3, title: 'Popliteal Exposure', description: 'Expose popliteal artery', instruments: ['Retractors'] },
            { step: 4, title: 'Tunneling', description: 'Create subcutaneous tunnel', instruments: ['Tunneler'] },
            { step: 5, title: 'Proximal Anastomosis', description: 'Sew to femoral artery', instruments: ['Sutures'] },
            { step: 6, title: 'Graft Passage', description: 'Pass graft through tunnel', instruments: ['Tunneler'] },
            { step: 7, title: 'Distal Anastomosis', description: 'Sew to popliteal artery', instruments: ['Sutures'] },
            { step: 8, title: 'Reperfusion', description: 'Restore flow and check pulses', instruments: ['Doppler'] },
            { step: 9, title: 'Closure', description: 'Close all incisions', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Heparin', use: 'Anticoagulation', amount: '5000 units' },
            { name: 'Papaverine', use: 'Vein dilation', amount: 'As needed' }
          ]
        },
        complications: ['Graft thrombosis', 'Wound infection', 'Compartment syndrome', 'Graft infection'],
        tips: ['Handle vein gently', 'Reverse vein properly', 'Avoid twisting', 'Check distal pulses']
      },
      {
        name: 'AV Fistula Creation',
        specialtyId: cardiovascularId,
        description: 'Creation of arteriovenous fistula for dialysis access',
        duration: '60-90 min',
        difficulty: 'Intermediate',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine with arm extended', 'Arm on arm board', 'Tourniquet available but not inflated']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep entire forearm', 'Include antecubital fossa', 'Extremity drape']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Minor vascular set'],
          specialInstruments: ['Vascular clamps', 'Fine sutures', 'Vessel loops', 'Doppler']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Microvascular setup for anastomosis',
          essentials: ['Fine sutures', 'Clamps', 'Doppler', 'Loupes']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Incision', description: 'Longitudinal forearm incision', instruments: ['Scalpel'] },
            { step: 2, title: 'Vein Mobilization', description: 'Mobilize cephalic vein', instruments: ['Scissors'] },
            { step: 3, title: 'Artery Exposure', description: 'Expose radial artery', instruments: ['Retractors'] },
            { step: 4, title: 'Vessel Control', description: 'Clamp artery and vein', instruments: ['Vascular clamps'] },
            { step: 5, title: 'Arteriotomy', description: 'Open artery longitudinally', instruments: ['Knife'] },
            { step: 6, title: 'Venotomy', description: 'Open vein for anastomosis', instruments: ['Scissors'] },
            { step: 7, title: 'Anastomosis', description: 'Create side-to-side or end-to-side', instruments: ['7-0 Prolene'] },
            { step: 8, title: 'Flow Restoration', description: 'Release clamps and check thrill', instruments: ['Doppler'] },
            { step: 9, title: 'Closure', description: 'Close incision', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Heparin', use: 'Local anticoagulation', amount: '2000 units' },
            { name: 'Lidocaine', use: 'Local anesthesia', amount: '20-30mL' }
          ]
        },
        complications: ['Thrombosis', 'Steal syndrome', 'Infection', 'Aneurysm formation', 'High output failure'],
        tips: ['Gentle vessel handling', 'Ensure good thrill', 'No tension on anastomosis', 'Educate on maturation']
      },
      {
        name: 'Varicose Vein Stripping',
        specialtyId: cardiovascularId,
        description: 'Surgical removal of varicose veins',
        duration: '60-120 min',
        difficulty: 'Intermediate',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine position', 'Leg prep from groin to ankle', 'Reverse Trendelenburg', 'Mark veins preop']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep entire leg', 'Include groin', 'Extremity drape']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Minor set', 'Vein instruments'],
          specialInstruments: ['Vein stripper', 'Phlebectomy hooks', 'Vein lights']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Vein stripping setup',
          essentials: ['Stripper', 'Hooks', 'Ties', 'Compression']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Groin Incision', description: 'Expose saphenofemoral junction', instruments: ['Scalpel'] },
            { step: 2, title: 'Junction Ligation', description: 'Ligate tributaries and junction', instruments: ['Ties'] },
            { step: 3, title: 'Distal Incision', description: 'Incision at knee or ankle', instruments: ['Scalpel'] },
            { step: 4, title: 'Stripper Passage', description: 'Pass stripper through vein', instruments: ['Stripper'] },
            { step: 5, title: 'Vein Stripping', description: 'Remove vein with stripper', instruments: ['Stripper'] },
            { step: 6, title: 'Phlebectomy', description: 'Remove branch varicosities', instruments: ['Hooks'] },
            { step: 7, title: 'Hemostasis', description: 'Achieve hemostasis', instruments: ['Compression'] },
            { step: 8, title: 'Closure', description: 'Close incisions', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Tumescent solution', use: 'Hemostasis and anesthesia', amount: '500mL' }
          ]
        },
        complications: ['Hematoma', 'Nerve injury', 'DVT', 'Wound infection', 'Recurrence'],
        tips: ['Mark veins preoperatively', 'Use tumescent technique', 'Gentle stripping', 'Compression postop']
      },
      {
        name: 'Cardiac Catheterization',
        specialtyId: cardiovascularId,
        description: 'Diagnostic cardiac catheterization with coronary angiography',
        duration: '45-90 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine on cath table', 'Arms at sides', 'Groin or wrist access site', 'Monitor placement']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep access site', 'Sterile drapes', 'Expose femoral or radial artery']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Cath lab set'],
          specialInstruments: ['Catheters', 'Guidewires', 'Contrast', 'Closure device', 'Sheaths']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Cath lab setup with catheters organized',
          essentials: ['Catheters', 'Wires', 'Sheaths', 'Contrast']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Access', description: 'Obtain arterial access', instruments: ['Needle', 'Wire'] },
            { step: 2, title: 'Sheath Placement', description: 'Insert arterial sheath', instruments: ['Sheath'] },
            { step: 3, title: 'Catheter Advancement', description: 'Advance catheter to aortic root', instruments: ['Catheter', 'Wire'] },
            { step: 4, title: 'Left Heart Cath', description: 'Cross aortic valve to LV', instruments: ['Pigtail catheter'] },
            { step: 5, title: 'Ventriculography', description: 'LV gram', instruments: ['Contrast injector'] },
            { step: 6, title: 'Coronary Angiography', description: 'Engage and image coronaries', instruments: ['Coronary catheters'] },
            { step: 7, title: 'Hemodynamics', description: 'Measure pressures', instruments: ['Transducer'] },
            { step: 8, title: 'Sheath Removal', description: 'Remove sheath and achieve hemostasis', instruments: ['Closure device'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Heparin', use: 'Anticoagulation', amount: '5000 units' },
            { name: 'Contrast', use: 'Imaging', amount: '100-200mL' },
            { name: 'Nitroglycerin', use: 'Coronary dilation', amount: 'As needed' }
          ]
        },
        complications: ['Bleeding', 'Hematoma', 'Dissection', 'Stroke', 'Contrast nephropathy', 'Arrhythmia'],
        tips: ['Minimize contrast use', 'Careful catheter manipulation', 'Monitor for complications', 'Hydrate patient']
      },
      {
        name: 'Percutaneous Coronary Intervention (PCI)',
        specialtyId: cardiovascularId,
        description: 'Coronary angioplasty with stent placement',
        duration: '60-120 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine on cath table', 'Radial or femoral access', 'Monitoring equipment ready', 'Defibrillator nearby']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Sterile prep of access site', 'Fenestrated drape', 'Maintain sterile field']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['PCI set'],
          specialInstruments: ['Guide catheters', 'Guidewires', 'Balloons', 'Stents', 'IVUS']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Interventional setup with stents ready',
          essentials: ['Guide catheters', 'Wires', 'Balloons', 'Stents']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Access', description: 'Arterial access and sheath', instruments: ['Needle', 'Sheath'] },
            { step: 2, title: 'Guide Catheter', description: 'Engage coronary ostium', instruments: ['Guide catheter'] },
            { step: 3, title: 'Wire Crossing', description: 'Cross lesion with wire', instruments: ['Guidewire'] },
            { step: 4, title: 'Lesion Assessment', description: 'IVUS or FFR if needed', instruments: ['IVUS'] },
            { step: 5, title: 'Pre-dilation', description: 'Balloon angioplasty', instruments: ['Balloon'] },
            { step: 6, title: 'Stent Deployment', description: 'Deploy drug-eluting stent', instruments: ['Stent'] },
            { step: 7, title: 'Post-dilation', description: 'Optimize stent expansion', instruments: ['NC balloon'] },
            { step: 8, title: 'Final Angiography', description: 'Confirm result', instruments: ['Contrast'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Heparin', use: 'Anticoagulation', amount: '70-100 units/kg' },
            { name: 'Aspirin', use: 'Antiplatelet', amount: '325mg' },
            { name: 'P2Y12 inhibitor', use: 'Antiplatelet', amount: 'Loading dose' },
            { name: 'Nitroglycerin', use: 'Vasodilation', amount: 'As needed' }
          ]
        },
        complications: ['Dissection', 'Perforation', 'No-reflow', 'Stent thrombosis', 'MI', 'Stroke'],
        tips: ['Adequate anticoagulation', 'Proper stent sizing', 'Post-dilate appropriately', 'DAPT compliance critical']
      }
    ];

    // Insert first batch
    console.log('📝 Inserting General Surgery procedures...');
    await db.insert(procedures).values(newProcedures.slice(0, 10));
    
    console.log('📝 Inserting Orthopedics procedures...');
    await db.insert(procedures).values(newProcedures.slice(10, 20));
    
    console.log('📝 Inserting Cardiovascular procedures...');
    await db.insert(procedures).values(newProcedures.slice(20, 30));

    console.log(`✅ Successfully added ${newProcedures.length} new procedures`);
    console.log('✨ Database expansion complete!');

  } catch (error) {
    console.error('❌ Error adding procedures:', error);
    throw error;
  }
}

addProcedures()
  .then(() => {
    console.log('🎉 Procedure addition completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Failed to add procedures:', error);
    process.exit(1);
  });
