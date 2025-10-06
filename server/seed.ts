import { db } from './db';
import { specialties, procedures, users } from '@shared/schema';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    // Clear existing data
    console.log('🗑️ Clearing existing data...');
    await db.delete(procedures);
    await db.delete(specialties);
    await db.delete(users);
    console.log('✅ Existing data cleared');

  // Insert specialties
  const specialtyData = [
    {
      name: 'General Surgery',
      description: 'Appendectomy, Cholecystectomy, Hernia repairs',
      icon: 'Scissors',
      procedureCount: 150,
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
    },
    {
      name: 'Orthopedics',
      description: 'Joint replacements, Fracture repairs, Arthroscopy',
      icon: 'Bone',
      procedureCount: 120,
      color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
    },
    {
      name: 'Cardiovascular',
      description: 'Bypass, Valve repair, Pacemaker insertion',
      icon: 'Heart',
      procedureCount: 85,
      color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
    },
    {
      name: 'Neurosurgery',
      description: 'Craniotomy, Spinal fusion, Tumor resection',
      icon: 'Brain',
      procedureCount: 95,
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
    },
    {
      name: 'Ophthalmology',
      description: 'Cataract surgery, Retinal procedures, LASIK',
      icon: 'Eye',
      procedureCount: 65,
      color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
    },
    {
      name: 'Obstetrics & Gynecology',
      description: 'C-sections, Hysterectomy, Laparoscopy, Labor & Delivery',
      icon: 'Baby',
      procedureCount: 110,
      color: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300'
    },
    {
      name: 'Urology',
      description: 'Prostatectomy, Kidney procedures, Cystoscopy, Transplant',
      icon: 'Activity',
      procedureCount: 75,
      color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300'
    },
    {
      name: 'ENT (Otolaryngology)',
      description: 'Tonsillectomy, Sinus surgery, Ear procedures',
      icon: 'Stethoscope',
      procedureCount: 55,
      color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
    },
    {
      name: 'Plastic & Reconstructive',
      description: 'Reconstruction, Cosmetic, Hand surgery, Microsurgery',
      icon: 'Scissors',
      procedureCount: 90,
      color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
    },
    {
      name: 'Pediatric Surgery',
      description: 'Congenital repairs, Appendectomy, Hernia, Neonatal',
      icon: 'Baby',
      procedureCount: 80,
      color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
    },
    {
      name: 'Bariatric Surgery',
      description: 'Gastric bypass, Sleeve gastrectomy, Lap-band',
      icon: 'Target',
      procedureCount: 45,
      color: 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300'
    },
    {
      name: 'Thoracic Surgery',
      description: 'Lung resection, Chest wall procedures, Mediastinal',
      icon: 'Wind',
      procedureCount: 70,
      color: 'bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300'
    },
    {
      name: 'Cardiothoracic',
      description: 'Heart surgery, Valve replacement, CABG, Transplant',
      icon: 'Heart',
      procedureCount: 65,
      color: 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300'
    },
    {
      name: 'Oral & Maxillofacial',
      description: 'Jaw surgery, TMJ, Facial trauma, Oral pathology',
      icon: 'Wrench',
      procedureCount: 40,
      color: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
    },
    {
      name: 'Colorectal Surgery',
      description: 'Colectomy, Hemorrhoidectomy, Rectal procedures',
      icon: 'Activity',
      procedureCount: 85,
      color: 'bg-lime-100 text-lime-700 dark:bg-lime-900 dark:text-lime-300'
    },
    {
      name: 'Trauma Surgery',
      description: 'Emergency procedures, Polytrauma, Critical care',
      icon: 'Truck',
      procedureCount: 120,
      color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
    },
    {
      name: 'Transplant Surgery',
      description: 'Organ transplant, Kidney, Liver, Heart, Pancreas',
      icon: 'Repeat',
      procedureCount: 35,
      color: 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300'
    },
    {
      name: 'Vascular Surgery',
      description: 'Bypass grafts, Aneurysm repair, Stent placement',
      icon: 'Zap',
      procedureCount: 60,
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
    },
    {
      name: 'Surgical Oncology',
      description: 'Cancer resection, Lymph node dissection, Biopsy',
      icon: 'Shield',
      procedureCount: 95,
      color: 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
    },
    {
      name: 'Endocrine Surgery',
      description: 'Thyroidectomy, Parathyroid, Adrenal procedures',
      icon: 'Dna',
      procedureCount: 55,
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
    }
  ];

  const insertedSpecialties = await db.insert(specialties).values(specialtyData).returning();
  console.log(`✅ Inserted ${insertedSpecialties.length} specialties`);

  // Get specialty IDs for reference
  const generalSurgeryId = insertedSpecialties.find(s => s.name === 'General Surgery')?.id!;
  const orthopedicsId = insertedSpecialties.find(s => s.name === 'Orthopedics')?.id!;
  const cardiovascularId = insertedSpecialties.find(s => s.name === 'Cardiovascular')?.id!;
  const neurosurgeryId = insertedSpecialties.find(s => s.name === 'Neurosurgery')?.id!;
  const ophthalmologyId = insertedSpecialties.find(s => s.name === 'Ophthalmology')?.id!;
  const obgynId = insertedSpecialties.find(s => s.name === 'Obstetrics & Gynecology')?.id!;
  const urologyId = insertedSpecialties.find(s => s.name === 'Urology')?.id!;
  const entId = insertedSpecialties.find(s => s.name === 'ENT (Otolaryngology)')?.id!;
  const plasticId = insertedSpecialties.find(s => s.name === 'Plastic & Reconstructive')?.id!;
  const pediatricId = insertedSpecialties.find(s => s.name === 'Pediatric Surgery')?.id!;
  const bariatricId = insertedSpecialties.find(s => s.name === 'Bariatric Surgery')?.id!;
  const thoracicId = insertedSpecialties.find(s => s.name === 'Thoracic Surgery')?.id!;
  const cardiothoracicId = insertedSpecialties.find(s => s.name === 'Cardiothoracic')?.id!;
  const maxillofacialId = insertedSpecialties.find(s => s.name === 'Oral & Maxillofacial')?.id!;
  const colorectalId = insertedSpecialties.find(s => s.name === 'Colorectal Surgery')?.id!;
  const traumaId = insertedSpecialties.find(s => s.name === 'Trauma Surgery')?.id!;
  const transplantId = insertedSpecialties.find(s => s.name === 'Transplant Surgery')?.id!;
  const vascularId = insertedSpecialties.find(s => s.name === 'Vascular Surgery')?.id!;
  const oncologyId = insertedSpecialties.find(s => s.name === 'Surgical Oncology')?.id!;
  const endocrineId = insertedSpecialties.find(s => s.name === 'Endocrine Surgery')?.id!;

  // Insert detailed procedures
  const procedureData = [
    {
      name: 'Laparoscopic Cholecystectomy',
      specialtyId: generalSurgeryId,
      description: 'Minimally invasive removal of gallbladder using laparoscopic technique',
      duration: '45-90 min',
      difficulty: 'Intermediate',
      positioning: {
        title: 'Patient Positioning',
        steps: [
          'Place patient in supine position',
          'Slightly elevate left side with wedge',
          'Reverse Trendelenburg position (15-20 degrees)',
          'Left arm extended, right arm tucked',
          'Secure patient with safety straps'
        ]
      },
      draping: {
        title: 'Draping Protocol',
        steps: [
          'Standard prep from xiphoid to pubis',
          'Large laparotomy drape with fenestration',
          'Four corner drapes to isolate surgical field',
          'Camera drape for laparoscope',
          'Light handle covers'
        ]
      },
      instruments: {
        title: 'Instrumentation',
        basicSet: ['Major laparoscopy set', 'Basic laparotomy set', 'Electrocautery'],
        specialInstruments: [
          '5mm and 10mm trocars (4 total)',
          'Laparoscope (0° and 30°)',
          'Graspers (atraumatic)',
          'Clips (titanium/absorbable)',
          'Endocatch bag',
          'Harmonic scalpel or LigaSure'
        ]
      },
      mayoSetup: {
        title: 'Mayo Stand Setup',
        layout: 'Standard laparoscopic setup with graspers on left, clips center, cutting instruments right',
        essentials: ['Trocars', 'Graspers', 'Clips', 'Endocatch bag', 'Laparoscope']
      },
      procedureSteps: {
        title: 'Procedure Steps',
        steps: [
          {
            step: 1,
            title: 'Pneumoperitoneum Creation',
            description: 'Veress needle insertion, CO2 insufflation to 12-15 mmHg',
            instruments: ['Veress needle', 'CO2 line']
          },
          {
            step: 2,
            title: 'Trocar Placement',
            description: 'Primary 10mm umbilical, three 5mm secondary ports',
            instruments: ['10mm trocar', '5mm trocars']
          },
          {
            step: 3,
            title: 'Inspection & Adhesiolysis',
            description: 'Laparoscopic inspection, divide adhesions if present',
            instruments: ['Laparoscope', 'Graspers', 'Electrocautery']
          },
          {
            step: 4,
            title: 'Critical View Achievement',
            description: 'Identify Calot\'s triangle anatomy',
            instruments: ['Graspers', 'Dissection tools']
          },
          {
            step: 5,
            title: 'Clipping & Division',
            description: 'Clip and divide cystic artery and duct',
            instruments: ['Clips', 'Scissors']
          },
          {
            step: 6,
            title: 'Gallbladder Dissection',
            description: 'Dissect gallbladder from liver bed',
            instruments: ['Electrocautery', 'Graspers']
          },
          {
            step: 7,
            title: 'Specimen Removal',
            description: 'Place in endocatch bag, remove through umbilical port',
            instruments: ['Endocatch bag', 'Graspers']
          },
          {
            step: 8,
            title: 'Closure',
            description: 'Remove trocars under vision, close fascial defects',
            instruments: ['Suture', 'Needle holders']
          }
        ]
      },
      medications: {
        title: 'Medications & Solutions',
        items: [
          { name: 'Normal Saline', use: 'Irrigation', amount: '500-1000mL' },
          { name: 'Lidocaine 1%', use: 'Local anesthesia', amount: '10-20mL' },
          { name: 'Epinephrine', use: 'Hemostasis (if needed)', amount: 'As needed' }
        ]
      },
      complications: [
        'Bleeding from liver bed',
        'Gallbladder perforation',
        'Conversion to open',
        'Bile duct injury'
      ],
      tips: [
        'Ensure critical view before clipping',
        'Use gentle traction to avoid perforation',
        'Irrigate thoroughly if spillage occurs',
        'Have clips readily available'
      ]
    },
    {
      name: 'Total Knee Replacement',
      specialtyId: orthopedicsId,
      description: 'Complete knee joint replacement procedure',
      duration: '60-120 min',
      difficulty: 'Advanced',
      positioning: {
        title: 'Patient Positioning',
        steps: [
          'Supine position with leg holder',
          'Tourniquet placement on upper thigh',
          'Prepare and drape entire leg',
          'Check range of motion before prep',
          'Ensure adequate exposure and access'
        ]
      },
      draping: {
        title: 'Draping Protocol',
        steps: [
          'Circumferential prep from hip to ankle',
          'Impervious stockinette over foot',
          'Large extremity drape with adhesive edges',
          'Tourniquet cover',
          'Clear plastic drape for visualization'
        ]
      },
      instruments: {
        title: 'Instrumentation',
        basicSet: ['Major orthopedic set', 'Power tools', 'Implant-specific instruments'],
        specialInstruments: [
          'Oscillating saw',
          'Reciprocating saw',
          'Drill and bits',
          'Reamers',
          'Alignment guides',
          'Trial components',
          'Cement mixing system'
        ]
      },
      mayoSetup: {
        title: 'Mayo Stand Setup',
        layout: 'Power tools on separate table, cutting guides accessible, trials organized by size',
        essentials: ['Cutting guides', 'Trials', 'Cement supplies', 'Power tools']
      },
      procedureSteps: {
        title: 'Procedure Steps',
        steps: [
          {
            step: 1,
            title: 'Incision and Exposure',
            description: 'Midline incision over knee, develop medial parapatellar approach',
            instruments: ['Scalpel', 'Electrocautery', 'Retractors']
          },
          {
            step: 2,
            title: 'Femoral Preparation',
            description: 'Remove anterior cruciate ligament, size and cut femur',
            instruments: ['Cutting guides', 'Oscillating saw']
          },
          {
            step: 3,
            title: 'Tibial Preparation',
            description: 'Remove menisci, prepare tibial surface',
            instruments: ['Tibial guides', 'Saw', 'Reamers']
          },
          {
            step: 4,
            title: 'Trial Reduction',
            description: 'Place trial components, check fit and alignment',
            instruments: ['Trial components', 'Spacer blocks']
          },
          {
            step: 5,
            title: 'Final Implantation',
            description: 'Cement and place final components',
            instruments: ['Bone cement', 'Final implants']
          },
          {
            step: 6,
            title: 'Closure',
            description: 'Irrigate, achieve hemostasis, layer closure',
            instruments: ['Sutures', 'Drains']
          }
        ]
      },
      medications: {
        title: 'Medications & Solutions',
        items: [
          { name: 'Normal Saline', use: 'Irrigation', amount: '3000mL' },
          { name: 'Antibiotic irrigation', use: 'Infection prevention', amount: '1L' },
          { name: 'Bone cement', use: 'Implant fixation', amount: '1-2 batches' }
        ]
      },
      complications: [
        'Infection',
        'Implant loosening',
        'Nerve injury',
        'Vascular injury',
        'Poor wound healing'
      ],
      tips: [
        'Maintain sterile field during cementing',
        'Ensure proper component alignment',
        'Monitor for fat embolism',
        'Keep cement mixing area separate'
      ]
    },
    {
      name: 'Cataract Extraction',
      specialtyId: ophthalmologyId,
      description: 'Phacoemulsification with IOL implantation',
      duration: '15-30 min',
      difficulty: 'Basic',
      positioning: {
        title: 'Patient Positioning',
        steps: [
          'Supine position with head ring support',
          'Face turned slightly away from operative eye',
          'Both eyes accessible for comparison',
          'Arms tucked and secured',
          'Ensure patient comfort for awake procedure'
        ]
      },
      draping: {
        title: 'Draping Protocol',
        steps: [
          'Prep around eye with betadine',
          'Adhesive eye drape over operative eye',
          'Leave non-operative eye exposed',
          'Secure drape edges',
          'Create sterile field around microscope'
        ]
      },
      instruments: {
        title: 'Instrumentation',
        basicSet: ['Phacoemulsification system', 'Microscope', 'Basic eye instruments'],
        specialInstruments: [
          'Phaco handpiece',
          'Irrigation/aspiration probe',
          'IOL injector',
          'Capsulorrhexis forceps',
          'Nucleus manipulator',
          'Viscoelastic'
        ]
      },
      mayoSetup: {
        title: 'Mayo Stand Setup',
        layout: 'Minimal instruments, phaco machine controls accessible, IOLs organized',
        essentials: ['Phaco probe', 'I/A probe', 'IOL injector', 'Viscoelastic']
      },
      procedureSteps: {
        title: 'Procedure Steps',
        steps: [
          {
            step: 1,
            title: 'Incision Creation',
            description: 'Create clear corneal incisions',
            instruments: ['Keratome', 'Side port knife']
          },
          {
            step: 2,
            title: 'Capsulorrhexis',
            description: 'Create continuous circular capsulorrhexis',
            instruments: ['Capsulorrhexis forceps', 'Viscoelastic']
          },
          {
            step: 3,
            title: 'Hydrodissection',
            description: 'Separate nucleus from cortex',
            instruments: ['Irrigation cannula']
          },
          {
            step: 4,
            title: 'Phacoemulsification',
            description: 'Break up and remove nucleus',
            instruments: ['Phaco probe', 'Second instrument']
          },
          {
            step: 5,
            title: 'I/A of Cortex',
            description: 'Irrigate and aspirate remaining cortex',
            instruments: ['I/A probe']
          },
          {
            step: 6,
            title: 'IOL Implantation',
            description: 'Insert intraocular lens',
            instruments: ['IOL injector', 'Manipulator']
          }
        ]
      },
      medications: {
        title: 'Medications & Solutions',
        items: [
          { name: 'BSS (Balanced Salt Solution)', use: 'Irrigation', amount: '500mL' },
          { name: 'Viscoelastic', use: 'Space maintenance', amount: '1-2 syringes' },
          { name: 'Topical anesthetic', use: 'Surface anesthesia', amount: 'As needed' }
        ]
      },
      complications: [
        'Posterior capsule rupture',
        'Nucleus drop',
        'Corneal edema',
        'Endophthalmitis',
        'IOL displacement'
      ],
      tips: [
        'Maintain stable anterior chamber',
        'Use adequate viscoelastic',
        'Control phaco settings carefully',
        'Monitor for capsule integrity'
      ]
    },
    // Additional General Surgery Procedures
    {
      name: 'Appendectomy',
      specialtyId: generalSurgeryId,
      description: 'Surgical removal of the appendix',
      duration: '30-60 min',
      difficulty: 'Intermediate',
      positioning: {
        title: 'Patient Positioning',
        steps: ['Supine position', 'Left side slightly elevated', 'Arms secured', 'Prep abdomen widely']
      },
      draping: {
        title: 'Draping Protocol', 
        steps: ['Sterile prep abdomen', 'Four-corner draping', 'Large laparotomy drape']
      },
      instruments: {
        title: 'Instrumentation',
        basicSet: ['General surgery set', 'Laparoscopic set (if lap approach)'],
        specialInstruments: ['Morcellator', 'Endocatch bag', 'Harmonic scalpel']
      },
      mayoSetup: {
        title: 'Mayo Stand Setup',
        layout: 'Standard general surgery layout',
        essentials: ['Scalpel', 'Electrocautery', 'Graspers', 'Suture']
      },
      procedureSteps: {
        title: 'Procedure Steps',
        steps: [
          { step: 1, title: 'Incision', description: 'McBurney point incision or laparoscopic ports', instruments: ['Scalpel'] },
          { step: 2, title: 'Exploration', description: 'Identify and mobilize appendix', instruments: ['Retractors'] },
          { step: 3, title: 'Appendectomy', description: 'Ligate mesoappendix and base', instruments: ['Clips', 'Electrocautery'] },
          { step: 4, title: 'Closure', description: 'Close in layers', instruments: ['Suture'] }
        ]
      },
      medications: {
        title: 'Medications & Solutions',
        items: [
          { name: 'Normal Saline', use: 'Irrigation', amount: '500mL' },
          { name: 'Antibiotics', use: 'Prophylaxis', amount: 'As ordered' }
        ]
      },
      complications: ['Bleeding', 'Infection', 'Ileus', 'Abscess formation'],
      tips: ['Identify appendiceal artery early', 'Irrigate if perforation', 'Check for other pathology']
    },
    // Cardiovascular Procedures
    {
      name: 'Coronary Artery Bypass Graft (CABG)',
      specialtyId: cardiovascularId,
      description: 'Surgical revascularization using grafts to bypass coronary blockages',
      duration: '3-6 hours',
      difficulty: 'Advanced',
      positioning: {
        title: 'Patient Positioning',
        steps: ['Supine position', 'Arms at sides', 'Roll under shoulders', 'Prep chest and legs']
      },
      draping: {
        title: 'Draping Protocol',
        steps: ['Large cardiovascular drape', 'Expose entire chest and legs', 'Secure all edges']
      },
      instruments: {
        title: 'Instrumentation', 
        basicSet: ['Cardiovascular set', 'Sternal saw', 'Bypass pump'],
        specialInstruments: ['Cardioplegia', 'Arterial cannulae', 'Venous cannulae', 'Heart stabilizers']
      },
      mayoSetup: {
        title: 'Mayo Stand Setup',
        layout: 'Cardiovascular specific setup with graft preparation area',
        essentials: ['Vascular instruments', 'Grafts', 'Cannulae', 'Cardioplegia']
      },
      procedureSteps: {
        title: 'Procedure Steps',
        steps: [
          { step: 1, title: 'Sternotomy', description: 'Median sternotomy and harvest grafts', instruments: ['Sternal saw'] },
          { step: 2, title: 'CPB Setup', description: 'Establish cardiopulmonary bypass', instruments: ['Cannulae'] },
          { step: 3, title: 'Anastomoses', description: 'Create distal and proximal anastomoses', instruments: ['Fine sutures'] },
          { step: 4, title: 'Weaning CPB', description: 'Wean from bypass and achieve hemostasis', instruments: ['Defibrillator'] }
        ]
      },
      medications: {
        title: 'Medications & Solutions',
        items: [
          { name: 'Cardioplegia', use: 'Cardiac arrest', amount: 'As needed' },
          { name: 'Heparin', use: 'Anticoagulation', amount: 'As ordered' },
          { name: 'Protamine', use: 'Heparin reversal', amount: 'As ordered' }
        ]
      },
      complications: ['Bleeding', 'Stroke', 'MI', 'Arrhythmias', 'Graft failure'],
      tips: ['Test all grafts', 'Maintain hemostasis', 'Monitor cardiac rhythm', 'Keep grafts moist']
    },
    // Neurosurgery Procedures
    {
      name: 'Craniotomy for Tumor Resection',
      specialtyId: neurosurgeryId,
      description: 'Surgical removal of brain tumor through cranial opening',
      duration: '2-8 hours',
      difficulty: 'Advanced',
      positioning: {
        title: 'Patient Positioning',
        steps: ['Position based on tumor location', 'Pin head holder', 'Pad pressure points', 'Arms secured']
      },
      draping: {
        title: 'Draping Protocol',
        steps: ['Sterile head prep', 'Adhesive drape', 'Large cranial drape', 'Expose surgical site only']
      },
      instruments: {
        title: 'Instrumentation',
        basicSet: ['Craniotomy set', 'Microscope', 'Neuro monitoring'],
        specialInstruments: ['Drill', 'Craniotomes', 'Brain retractors', 'Ultrasonic aspirator', 'Neuronavigation']
      },
      mayoSetup: {
        title: 'Mayo Stand Setup',
        layout: 'Neurosurgical specific with micro instruments',
        essentials: ['Microsurgical instruments', 'Bipolar', 'Brain retractors', 'Hemostatic agents']
      },
      procedureSteps: {
        title: 'Procedure Steps',
        steps: [
          { step: 1, title: 'Incision', description: 'Scalp incision and reflection', instruments: ['Scalpel', 'Raney clips'] },
          { step: 2, title: 'Craniotomy', description: 'Remove bone flap', instruments: ['Drill', 'Craniotomes'] },
          { step: 3, title: 'Dural Opening', description: 'Open dura mater', instruments: ['Fine scissors'] },
          { step: 4, title: 'Tumor Resection', description: 'Remove tumor with margins', instruments: ['Microsurgical tools'] }
        ]
      },
      medications: {
        title: 'Medications & Solutions',
        items: [
          { name: 'Mannitol', use: 'Brain decompression', amount: 'As ordered' },
          { name: 'Dexamethasone', use: 'Anti-inflammatory', amount: 'As ordered' },
          { name: 'Irrigation saline', use: 'Brain irrigation', amount: '1000mL' }
        ]
      },
      complications: ['Bleeding', 'Infection', 'Neurological deficit', 'Seizures', 'Brain swelling'],
      tips: ['Monitor ICP', 'Gentle tissue handling', 'Maintain hemostasis', 'Preserve normal brain']
    },
    // OBGYN Procedures  
    {
      name: 'Cesarean Section',
      specialtyId: obgynId,
      description: 'Surgical delivery of baby through abdominal incision',
      duration: '30-60 min',
      difficulty: 'Intermediate',
      positioning: {
        title: 'Patient Positioning',
        steps: ['Supine with left uterine displacement', 'Arms extended', 'Prep abdomen and perineum']
      },
      draping: {
        title: 'Draping Protocol',
        steps: ['Sterile prep abdomen', 'Bladder drape', 'Large abdominal drape']
      },
      instruments: {
        title: 'Instrumentation',
        basicSet: ['OB/GYN set', 'Delivery instruments'],
        specialInstruments: ['Bladder blade', 'Baby blankets', 'Cord clamps', 'Suction']
      },
      mayoSetup: {
        title: 'Mayo Stand Setup', 
        layout: 'OB specific with baby care supplies ready',
        essentials: ['Scalpel', 'Forceps', 'Suture', 'Cord clamps', 'Suction']
      },
      procedureSteps: {
        title: 'Procedure Steps',
        steps: [
          { step: 1, title: 'Incision', description: 'Pfannenstiel or midline incision', instruments: ['Scalpel'] },
          { step: 2, title: 'Uterine Incision', description: 'Low transverse uterine incision', instruments: ['Scalpel', 'Scissors'] },
          { step: 3, title: 'Delivery', description: 'Deliver baby and placenta', instruments: ['Forceps'] },
          { step: 4, title: 'Repair', description: 'Close uterus and abdominal layers', instruments: ['Suture'] }
        ]
      },
      medications: {
        title: 'Medications & Solutions',
        items: [
          { name: 'Oxytocin', use: 'Uterine contraction', amount: 'As ordered' },
          { name: 'Antibiotics', use: 'Prophylaxis', amount: 'As ordered' }
        ]
      },
      complications: ['Hemorrhage', 'Infection', 'Bladder injury', 'Adhesions'],
      tips: ['Have blood available', 'Monitor bleeding', 'Handle baby gently', 'Check instrument counts']
    },
    // Urology Procedures
    {
      name: 'Transurethral Resection of Prostate (TURP)',
      specialtyId: urologyId,
      description: 'Endoscopic removal of prostate tissue through urethra',
      duration: '60-90 min',
      difficulty: 'Intermediate',
      positioning: {
        title: 'Patient Positioning',
        steps: ['Lithotomy position', 'Legs in stirrups', 'Prep genitalia and perineum']
      },
      draping: {
        title: 'Draping Protocol',
        steps: ['Sterile prep genitalia', 'Urological drape with leg covers']
      },
      instruments: {
        title: 'Instrumentation',
        basicSet: ['Cystoscopy set', 'TURP resectoscope'],
        specialInstruments: ['Resectoscope', 'Loop electrodes', 'Continuous irrigation', 'Evacuator']
      },
      mayoSetup: {
        title: 'Mayo Stand Setup',
        layout: 'Urological endoscopic setup',
        essentials: ['Resectoscope', 'Loop electrodes', 'Obturator', 'Irrigation tubing']
      },
      procedureSteps: {
        title: 'Procedure Steps',
        steps: [
          { step: 1, title: 'Cystoscopy', description: 'Inspect bladder and urethra', instruments: ['Cystoscope'] },
          { step: 2, title: 'Resection', description: 'Resect prostate tissue in strips', instruments: ['Resectoscope'] },
          { step: 3, title: 'Hemostasis', description: 'Control bleeding with cautery', instruments: ['Electrocautery'] },
          { step: 4, title: 'Irrigation', description: 'Clear debris and place catheter', instruments: ['Evacuator', 'Foley'] }
        ]
      },
      medications: {
        title: 'Medications & Solutions',
        items: [
          { name: 'Glycine', use: 'Irrigation fluid', amount: '3000mL' },
          { name: 'Antibiotics', use: 'Prophylaxis', amount: 'As ordered' }
        ]
      },
      complications: ['Bleeding', 'TUR syndrome', 'Perforation', 'Incontinence', 'Stricture'],
      tips: ['Monitor fluid balance', 'Control bleeding', 'Preserve external sphincter', 'Avoid over-resection']
    },
    // ENT Procedures
    {
      name: 'Tonsillectomy',
      specialtyId: entId,
      description: 'Surgical removal of palatine tonsils',
      duration: '30-45 min',
      difficulty: 'Basic',
      positioning: {
        title: 'Patient Positioning',
        steps: ['Supine with neck extended', 'Head ring support', 'Mouth gag placement', 'Shoulder roll']
      },
      draping: {
        title: 'Draping Protocol',
        steps: ['Head and neck prep', 'Adhesive head drape', 'Throat pack placement']
      },
      instruments: {
        title: 'Instrumentation',
        basicSet: ['ENT instrument set', 'Mouth gag', 'Electrocautery'],
        specialInstruments: ['Boyle-Davis gag', 'Adenoid curettes', 'Tonsil snares', 'Suction cautery']
      },
      mayoSetup: {
        title: 'Mayo Stand Setup',
        layout: 'ENT specific with good visualization',
        essentials: ['Mouth gag', 'Tonsil instruments', 'Electrocautery', 'Suction']
      },
      procedureSteps: {
        title: 'Procedure Steps',
        steps: [
          { step: 1, title: 'Positioning', description: 'Place mouth gag and visualize tonsils', instruments: ['Mouth gag'] },
          { step: 2, title: 'Dissection', description: 'Dissect tonsillar capsule', instruments: ['Electrocautery'] },
          { step: 3, title: 'Removal', description: 'Remove tonsils completely', instruments: ['Snare'] },
          { step: 4, title: 'Hemostasis', description: 'Achieve hemostasis', instruments: ['Electrocautery'] }
        ]
      },
      medications: {
        title: 'Medications & Solutions',
        items: [
          { name: 'Local anesthetic', use: 'Pain control', amount: 'As ordered' },
          { name: 'Normal saline', use: 'Irrigation', amount: '500mL' }
        ]
      },
      complications: ['Bleeding', 'Infection', 'Dental injury', 'Aspiration'],
      tips: ['Monitor for bleeding', 'Gentle tissue handling', 'Ensure complete hemostasis', 'Remove throat pack']
    },
    // Plastic Surgery Procedures
    {
      name: 'Breast Reconstruction',
      specialtyId: plasticId,
      description: 'Reconstruction of breast following mastectomy',
      duration: '2-6 hours',
      difficulty: 'Advanced',
      positioning: {
        title: 'Patient Positioning',
        steps: ['Supine position', 'Arms positioned for access', 'Prep chest and donor sites', 'Mark surgical sites']
      },
      draping: {
        title: 'Draping Protocol',
        steps: ['Wide sterile prep', 'Large plastic surgery drape', 'Include all potential donor sites']
      },
      instruments: {
        title: 'Instrumentation',
        basicSet: ['Plastic surgery set', 'Microsurgical instruments', 'Electrocautery'],
        specialInstruments: ['Tissue expanders', 'Implants', 'Microsurgical clamps', 'Doppler probe']
      },
      mayoSetup: {
        title: 'Mayo Stand Setup',
        layout: 'Plastic surgery specific with microsurgical area',
        essentials: ['Fine instruments', 'Implants', 'Sutures', 'Microsurgical tools']
      },
      procedureSteps: {
        title: 'Procedure Steps',
        steps: [
          { step: 1, title: 'Tissue Preparation', description: 'Prepare recipient site', instruments: ['Electrocautery'] },
          { step: 2, title: 'Flap Harvest', description: 'Harvest tissue from donor site', instruments: ['Microsurgical tools'] },
          { step: 3, title: 'Anastomosis', description: 'Connect blood vessels', instruments: ['Microsurgical clamps'] },
          { step: 4, title: 'Shaping', description: 'Shape and position reconstruction', instruments: ['Fine sutures'] }
        ]
      },
      medications: {
        title: 'Medications & Solutions',
        items: [
          { name: 'Heparin', use: 'Anticoagulation', amount: 'As ordered' },
          { name: 'Papaverine', use: 'Vasodilation', amount: 'As needed' }
        ]
      },
      complications: ['Flap failure', 'Infection', 'Hematoma', 'Asymmetry'],
      tips: ['Monitor flap perfusion', 'Gentle tissue handling', 'Maintain hemostasis', 'Document flap appearance']
    },
    // Pediatric Surgery Procedures
    {
      name: 'Pyloromyotomy',
      specialtyId: pediatricId,
      description: 'Surgical treatment for pyloric stenosis in infants',
      duration: '30-60 min',
      difficulty: 'Intermediate',
      positioning: {
        title: 'Patient Positioning',
        steps: ['Supine position', 'Warming blanket', 'IV access secured', 'Monitor temperature']
      },
      draping: {
        title: 'Draping Protocol',
        steps: ['Small pediatric drape', 'Expose upper abdomen', 'Maintain warmth']
      },
      instruments: {
        title: 'Instrumentation',
        basicSet: ['Pediatric general set', 'Small retractors'],
        specialInstruments: ['Benson pyloric spreader', 'Small electrocautery', 'Fine sutures']
      },
      mayoSetup: {
        title: 'Mayo Stand Setup',
        layout: 'Pediatric specific with small instruments',
        essentials: ['Small instruments', 'Fine sutures', 'Pediatric retractors']
      },
      procedureSteps: {
        title: 'Procedure Steps',
        steps: [
          { step: 1, title: 'Incision', description: 'Small right upper quadrant incision', instruments: ['Scalpel'] },
          { step: 2, title: 'Pylorus exposure', description: 'Identify and expose pylorus', instruments: ['Retractors'] },
          { step: 3, title: 'Myotomy', description: 'Divide pyloric muscle fibers', instruments: ['Spreader'] },
          { step: 4, title: 'Closure', description: 'Close in layers', instruments: ['Fine sutures'] }
        ]
      },
      medications: {
        title: 'Medications & Solutions',
        items: [
          { name: 'Warm saline', use: 'Irrigation', amount: '100mL' },
          { name: 'Local anesthetic', use: 'Pain control', amount: 'As appropriate for weight' }
        ]
      },
      complications: ['Mucosal perforation', 'Incomplete myotomy', 'Bleeding', 'Infection'],
      tips: ['Keep infant warm', 'Gentle handling', 'Check for mucosal integrity', 'Small incisions']
    },
    // Bariatric Surgery Procedures
    {
      name: 'Laparoscopic Sleeve Gastrectomy',
      specialtyId: bariatricId,
      description: 'Laparoscopic removal of majority of stomach for weight loss',
      duration: '60-120 min',
      difficulty: 'Advanced',
      positioning: {
        title: 'Patient Positioning',
        steps: ['Reverse Trendelenburg', 'Split-leg position', 'Arms positioned', 'Sequential compression devices']
      },
      draping: {
        title: 'Draping Protocol',
        steps: ['Wide abdominal prep', 'Large laparoscopic drape', 'Camera drape']
      },
      instruments: {
        title: 'Instrumentation',
        basicSet: ['Laparoscopic set', 'Bariatric instruments'],
        specialInstruments: ['Linear staplers', 'Bougie dilator', 'Liver retractor', 'Harmonic scalpel']
      },
      mayoSetup: {
        title: 'Mayo Stand Setup',
        layout: 'Bariatric specific with stapler organization',
        essentials: ['Staplers', 'Bougie', 'Graspers', 'Harmonic device']
      },
      procedureSteps: {
        title: 'Procedure Steps',
        steps: [
          { step: 1, title: 'Port Placement', description: 'Place 5 laparoscopic ports', instruments: ['Trocars'] },
          { step: 2, title: 'Mobilization', description: 'Mobilize greater curvature', instruments: ['Harmonic scalpel'] },
          { step: 3, title: 'Stapling', description: 'Sequential stapling over bougie', instruments: ['Linear staplers'] },
          { step: 4, title: 'Leak Test', description: 'Test staple line integrity', instruments: ['Methylene blue'] }
        ]
      },
      medications: {
        title: 'Medications & Solutions',
        items: [
          { name: 'Methylene blue', use: 'Leak testing', amount: '50mL' },
          { name: 'PPI', use: 'Gastric protection', amount: 'As ordered' }
        ]
      },
      complications: ['Staple line leak', 'Bleeding', 'Stricture', 'GERD'],
      tips: ['Use bougie for sizing', 'Inspect staple lines', 'Avoid thermal injury', 'Test for leaks']
    },
    // Thoracic Surgery Procedures
    {
      name: 'Video-Assisted Thoracoscopic Surgery (VATS)',
      specialtyId: thoracicId,
      description: 'Minimally invasive thoracic surgery using video assistance',
      duration: '1-3 hours',
      difficulty: 'Advanced',
      positioning: {
        title: 'Patient Positioning',
        steps: ['Lateral decubitus', 'Axillary roll', 'Flex table', 'Single lung ventilation']
      },
      draping: {
        title: 'Draping Protocol',
        steps: ['Wide thoracic prep', 'Adhesive drape', 'Camera drape']
      },
      instruments: {
        title: 'Instrumentation',
        basicSet: ['Thoracic set', 'Video equipment'],
        specialInstruments: ['Thoracoscope', 'Endostaplers', 'Graspers', 'Electrocautery devices']
      },
      mayoSetup: {
        title: 'Mayo Stand Setup',
        layout: 'Thoracoscopic with video equipment',
        essentials: ['Thoracoscope', 'Staplers', 'Graspers', 'Chest tubes']
      },
      procedureSteps: {
        title: 'Procedure Steps',
        steps: [
          { step: 1, title: 'Port Placement', description: 'Place thoracoscopic ports', instruments: ['Trocars'] },
          { step: 2, title: 'Exploration', description: 'Thoracoscopic exploration', instruments: ['Thoracoscope'] },
          { step: 3, title: 'Procedure', description: 'Perform specific procedure', instruments: ['Various'] },
          { step: 4, title: 'Closure', description: 'Place chest tubes and close', instruments: ['Chest tubes'] }
        ]
      },
      medications: {
        title: 'Medications & Solutions',
        items: [
          { name: 'Normal saline', use: 'Irrigation', amount: '500mL' },
          { name: 'Local anesthetic', use: 'Port sites', amount: '20mL' }
        ]
      },
      complications: ['Air leak', 'Bleeding', 'Conversion to open', 'Pneumothorax'],
      tips: ['Single lung ventilation', 'Monitor for air leaks', 'Gentle tissue handling', 'Proper port placement']
    },
    // Trauma Surgery Procedures
    {
      name: 'Exploratory Laparotomy for Trauma',
      specialtyId: traumaId,
      description: 'Emergency abdominal exploration for traumatic injuries',
      duration: '1-4 hours',
      difficulty: 'Advanced',
      positioning: {
        title: 'Patient Positioning',
        steps: ['Supine position', 'Arms out', 'Prep widely', 'Blood products available']
      },
      draping: {
        title: 'Draping Protocol',
        steps: ['Wide prep neck to knees', 'Large trauma drape', 'Quick access']
      },
      instruments: {
        title: 'Instrumentation',
        basicSet: ['Major general surgery set', 'Vascular set', 'Damage control supplies'],
        specialInstruments: ['Stapler devices', 'Vascular clamps', 'Cell saver', 'Rapid infuser']
      },
      mayoSetup: {
        title: 'Mayo Stand Setup',
        layout: 'Trauma specific with rapid access',
        essentials: ['Clamps', 'Staplers', 'Sutures', 'Hemostatic agents']
      },
      procedureSteps: {
        title: 'Procedure Steps',
        steps: [
          { step: 1, title: 'Rapid Entry', description: 'Midline incision', instruments: ['Scalpel'] },
          { step: 2, title: 'Four-quadrant exploration', description: 'Systematic exploration', instruments: ['Retractors'] },
          { step: 3, title: 'Damage Control', description: 'Control bleeding and contamination', instruments: ['Clamps', 'Staplers'] },
          { step: 4, title: 'Repair/Resection', description: 'Definitive repairs as indicated', instruments: ['Various'] }
        ]
      },
      medications: {
        title: 'Medications & Solutions',
        items: [
          { name: 'Blood products', use: 'Resuscitation', amount: 'As needed' },
          { name: 'Antibiotics', use: 'Prophylaxis', amount: 'As ordered' },
          { name: 'Warm saline', use: 'Irrigation', amount: '1000mL' }
        ]
      },
      complications: ['Massive bleeding', 'Coagulopathy', 'Hypothermia', 'Acidosis'],
      tips: ['Rapid assessment', 'Control bleeding first', 'Keep patient warm', 'Damage control approach']
    },
    // Cardiothoracic Procedures
    {
      name: 'Mitral Valve Replacement',
      specialtyId: cardiothoracicId,
      description: 'Surgical replacement of mitral valve using prosthetic valve',
      duration: '3-5 hours',
      difficulty: 'Advanced',
      positioning: {
        title: 'Patient Positioning',
        steps: ['Supine position', 'Arms at sides', 'Prep chest and legs', 'TEE probe placement']
      },
      draping: {
        title: 'Draping Protocol',
        steps: ['Large cardiac drape', 'Expose entire chest', 'Include leg for possible grafts']
      },
      instruments: {
        title: 'Instrumentation',
        basicSet: ['Cardiac surgery set', 'Bypass pump', 'TEE equipment'],
        specialInstruments: ['Prosthetic valves', 'Valve sizers', 'Cardioplegia', 'Heart-lung machine']
      },
      mayoSetup: {
        title: 'Mayo Stand Setup',
        layout: 'Cardiac specific with valve instrumentation',
        essentials: ['Valve instruments', 'Prosthetic valves', 'Sutures', 'Cardioplegia']
      },
      procedureSteps: {
        title: 'Procedure Steps',
        steps: [
          { step: 1, title: 'Sternotomy', description: 'Median sternotomy and pericardiotomy', instruments: ['Sternal saw'] },
          { step: 2, title: 'CPB', description: 'Establish cardiopulmonary bypass', instruments: ['Cannulae'] },
          { step: 3, title: 'Valve Exposure', description: 'Open left atrium, expose mitral valve', instruments: ['Retractors'] },
          { step: 4, title: 'Valve Replacement', description: 'Remove diseased valve, implant prosthesis', instruments: ['Valve instruments'] }
        ]
      },
      medications: {
        title: 'Medications & Solutions',
        items: [
          { name: 'Cardioplegia', use: 'Myocardial protection', amount: 'As needed' },
          { name: 'Heparin', use: 'Anticoagulation', amount: 'As ordered' }
        ]
      },
      complications: ['Bleeding', 'Stroke', 'Paravalvular leak', 'Heart block'],
      tips: ['Size valve carefully', 'Ensure hemostasis', 'Test valve function', 'Monitor rhythm']
    },
    // Colorectal Surgery Procedures
    {
      name: 'Laparoscopic Colectomy',
      specialtyId: colorectalId,
      description: 'Minimally invasive removal of colon segment',
      duration: '2-4 hours',
      difficulty: 'Advanced',
      positioning: {
        title: 'Patient Positioning',
        steps: ['Modified lithotomy', 'Trendelenburg position', 'Arms tucked', 'Sequential compression devices']
      },
      draping: {
        title: 'Draping Protocol',
        steps: ['Wide abdominal prep', 'Perineal prep', 'Large laparoscopic drape']
      },
      instruments: {
        title: 'Instrumentation',
        basicSet: ['Laparoscopic set', 'GIA staplers'],
        specialInstruments: ['Harmonic scalpel', 'LigaSure', 'Specimen bag', 'Linear staplers']
      },
      mayoSetup: {
        title: 'Mayo Stand Setup',
        layout: 'Colorectal laparoscopic with staplers',
        essentials: ['Staplers', 'Energy devices', 'Specimen bags', 'Graspers']
      },
      procedureSteps: {
        title: 'Procedure Steps',
        steps: [
          { step: 1, title: 'Port Placement', description: 'Place 5 laparoscopic ports', instruments: ['Trocars'] },
          { step: 2, title: 'Mobilization', description: 'Mobilize colon segment', instruments: ['Energy devices'] },
          { step: 3, title: 'Vascular Division', description: 'Divide mesenteric vessels', instruments: ['Staplers'] },
          { step: 4, title: 'Anastomosis', description: 'Create bowel anastomosis', instruments: ['Staplers'] }
        ]
      },
      medications: {
        title: 'Medications & Solutions',
        items: [
          { name: 'Bowel prep solution', use: 'Irrigation', amount: '500mL' },
          { name: 'Antibiotics', use: 'Prophylaxis', amount: 'As ordered' }
        ]
      },
      complications: ['Anastomotic leak', 'Bleeding', 'Bowel obstruction', 'Infection'],
      tips: ['Ensure adequate blood supply', 'Check anastomosis integrity', 'Avoid tension', 'Test air leak']
    },
    // Endocrine Surgery Procedures
    {
      name: 'Thyroidectomy',
      specialtyId: endocrineId,
      description: 'Surgical removal of thyroid gland',
      duration: '2-3 hours',
      difficulty: 'Intermediate',
      positioning: {
        title: 'Patient Positioning',
        steps: ['Supine with neck extension', 'Shoulder roll', 'Arms at sides', 'Nerve monitoring setup']
      },
      draping: {
        title: 'Draping Protocol',
        steps: ['Neck and upper chest prep', 'Head drape with neck exposure']
      },
      instruments: {
        title: 'Instrumentation',
        basicSet: ['General surgery set', 'Fine instruments'],
        specialInstruments: ['Nerve monitor', 'Harmonic scalpel', 'Fine forceps', 'Retractors']
      },
      mayoSetup: {
        title: 'Mayo Stand Setup',
        layout: 'Endocrine specific with fine instruments',
        essentials: ['Fine instruments', 'Harmonic device', 'Clips', 'Nerve monitor']
      },
      procedureSteps: {
        title: 'Procedure Steps',
        steps: [
          { step: 1, title: 'Incision', description: 'Collar incision in neck crease', instruments: ['Scalpel'] },
          { step: 2, title: 'Exposure', description: 'Expose thyroid gland', instruments: ['Retractors'] },
          { step: 3, title: 'Nerve Identification', description: 'Identify recurrent laryngeal nerve', instruments: ['Nerve monitor'] },
          { step: 4, title: 'Thyroidectomy', description: 'Remove thyroid lobe/gland', instruments: ['Harmonic scalpel'] }
        ]
      },
      medications: {
        title: 'Medications & Solutions',
        items: [
          { name: 'Local anesthetic', use: 'Infiltration', amount: '10mL' },
          { name: 'Calcium', use: 'Hypocalcemia treatment', amount: 'As needed' }
        ]
      },
      complications: ['Nerve injury', 'Hypoparathyroidism', 'Bleeding', 'Infection'],
      tips: ['Monitor nerve function', 'Preserve parathyroids', 'Gentle dissection', 'Check calcium levels']
    },
    // Oral & Maxillofacial Procedures
    {
      name: 'Orthognathic Surgery',
      specialtyId: maxillofacialId,
      description: 'Corrective jaw surgery for malocclusion and facial deformities',
      duration: '2-4 hours',
      difficulty: 'Advanced',
      positioning: {
        title: 'Patient Positioning',
        steps: ['Supine position', 'Head stabilized', 'Nasal intubation', 'Mouth accessible']
      },
      draping: {
        title: 'Draping Protocol',
        steps: ['Head and neck prep', 'Intraoral and extraoral access', 'Sterile drape with oral access']
      },
      instruments: {
        title: 'Instrumentation',
        basicSet: ['Oral surgery set', 'Bone instruments'],
        specialInstruments: ['Oscillating saw', 'Plates and screws', 'Bone forceps', 'Retractors']
      },
      mayoSetup: {
        title: 'Mayo Stand Setup',
        layout: 'Maxillofacial with bone instruments',
        essentials: ['Bone instruments', 'Plates', 'Screws', 'Power tools']
      },
      procedureSteps: {
        title: 'Procedure Steps',
        steps: [
          { step: 1, title: 'Incisions', description: 'Intraoral incisions', instruments: ['Scalpel'] },
          { step: 2, title: 'Osteotomy', description: 'Cut bone segments', instruments: ['Oscillating saw'] },
          { step: 3, title: 'Repositioning', description: 'Move bone segments to new position', instruments: ['Forceps'] },
          { step: 4, title: 'Fixation', description: 'Secure with plates and screws', instruments: ['Plates', 'Screws'] }
        ]
      },
      medications: {
        title: 'Medications & Solutions',
        items: [
          { name: 'Local anesthetic', use: 'Hemostasis', amount: '10mL' },
          { name: 'Antibiotics', use: 'Prophylaxis', amount: 'As ordered' }
        ]
      },
      complications: ['Nerve injury', 'Malocclusion', 'Infection', 'Non-union'],
      tips: ['Protect nerves', 'Ensure proper occlusion', 'Rigid fixation', 'Monitor airway']
    },
    // Surgical Oncology Procedures
    {
      name: 'Tumor Resection with Lymphadenectomy',
      specialtyId: oncologyId,
      description: 'Wide local excision of tumor with lymph node dissection',
      duration: '2-6 hours',
      difficulty: 'Advanced',
      positioning: {
        title: 'Patient Positioning',
        steps: ['Position based on tumor location', 'Wide prep field', 'Access to lymph nodes', 'Mark surgical margins']
      },
      draping: {
        title: 'Draping Protocol',
        steps: ['Wide sterile prep', 'Include potential flap sites', 'Large drape with good exposure']
      },
      instruments: {
        title: 'Instrumentation',
        basicSet: ['Oncology surgery set', 'Electrocautery'],
        specialInstruments: ['Ultrasonic scalpel', 'Clips', 'Specimen containers', 'Frozen section supplies']
      },
      mayoSetup: {
        title: 'Mayo Stand Setup',
        layout: 'Oncology specific with specimen handling',
        essentials: ['Cutting instruments', 'Specimen containers', 'Clips', 'Marking sutures']
      },
      procedureSteps: {
        title: 'Procedure Steps',
        steps: [
          { step: 1, title: 'Margins', description: 'Mark surgical margins around tumor', instruments: ['Marking pen'] },
          { step: 2, title: 'Resection', description: 'Wide local excision of tumor', instruments: ['Electrocautery'] },
          { step: 3, title: 'Lymphadenectomy', description: 'Systematic lymph node dissection', instruments: ['Clips'] },
          { step: 4, title: 'Reconstruction', description: 'Reconstruct defect if needed', instruments: ['Sutures'] }
        ]
      },
      medications: {
        title: 'Medications & Solutions',
        items: [
          { name: 'Methylene blue', use: 'Margin marking', amount: '5mL' },
          { name: 'Normal saline', use: 'Irrigation', amount: '500mL' }
        ]
      },
      complications: ['Positive margins', 'Lymphedema', 'Nerve injury', 'Wound breakdown'],
      tips: ['Wide margins', 'Handle specimens carefully', 'Send for frozen section', 'Mark orientation']
    },
    // Transplant Surgery Procedures
    {
      name: 'Kidney Transplantation',
      specialtyId: transplantId,
      description: 'Surgical transplantation of donor kidney',
      duration: '3-5 hours',
      difficulty: 'Advanced',
      positioning: {
        title: 'Patient Positioning',
        steps: ['Supine position', 'Slight rotation', 'Arms positioned', 'Foley catheter placed']
      },
      draping: {
        title: 'Draping Protocol',
        steps: ['Wide abdominal and pelvis prep', 'Large transplant drape', 'Sterile field extension']
      },
      instruments: {
        title: 'Instrumentation',
        basicSet: ['Transplant surgery set', 'Vascular instruments'],
        specialInstruments: ['Vascular clamps', 'Fine sutures', 'Doppler probe', 'Perfusion pump']
      },
      mayoSetup: {
        title: 'Mayo Stand Setup',
        layout: 'Transplant specific with vascular instruments',
        essentials: ['Vascular instruments', 'Fine sutures', 'Clamps', 'Doppler']
      },
      procedureSteps: {
        title: 'Procedure Steps',
        steps: [
          { step: 1, title: 'Kidney Preparation', description: 'Prepare donor kidney on back table', instruments: ['Vascular instruments'] },
          { step: 2, title: 'Recipient Prep', description: 'Expose iliac vessels', instruments: ['Retractors'] },
          { step: 3, title: 'Anastomoses', description: 'Vascular and ureteral anastomoses', instruments: ['Fine sutures'] },
          { step: 4, title: 'Reperfusion', description: 'Restore blood flow to kidney', instruments: ['Doppler'] }
        ]
      },
      medications: {
        title: 'Medications & Solutions',
        items: [
          { name: 'Preservation solution', use: 'Organ preservation', amount: '1000mL' },
          { name: 'Immunosuppressive drugs', use: 'Prevent rejection', amount: 'As ordered' }
        ]
      },
      complications: ['Vascular thrombosis', 'Ureteral leak', 'Rejection', 'Infection'],
      tips: ['Minimize ischemia time', 'Gentle handling', 'Check perfusion', 'Secure anastomoses']
    },
    // Vascular Surgery Procedures
    {
      name: 'Carotid Endarterectomy',
      specialtyId: vascularId,
      description: 'Surgical removal of plaque from carotid artery',
      duration: '2-3 hours',
      difficulty: 'Advanced',
      positioning: {
        title: 'Patient Positioning',
        steps: ['Supine with neck extended', 'Head turned away', 'Shoulder roll', 'Neuro monitoring']
      },
      draping: {
        title: 'Draping Protocol',
        steps: ['Neck prep from jaw to clavicle', 'Sterile head drape with neck exposure']
      },
      instruments: {
        title: 'Instrumentation',
        basicSet: ['Vascular surgery set', 'Shunt if needed'],
        specialInstruments: ['Vascular clamps', 'Shunt', 'Patch material', 'Doppler probe']
      },
      mayoSetup: {
        title: 'Mayo Stand Setup',
        layout: 'Vascular specific with fine instruments',
        essentials: ['Vascular clamps', 'Fine sutures', 'Patch material', 'Shunt']
      },
      procedureSteps: {
        title: 'Procedure Steps',
        steps: [
          { step: 1, title: 'Exposure', description: 'Expose carotid bifurcation', instruments: ['Retractors'] },
          { step: 2, title: 'Clamping', description: 'Clamp carotid vessels', instruments: ['Vascular clamps'] },
          { step: 3, title: 'Endarterectomy', description: 'Remove atherosclerotic plaque', instruments: ['Forceps'] },
          { step: 4, title: 'Closure', description: 'Close arteriotomy with/without patch', instruments: ['Fine sutures'] }
        ]
      },
      medications: {
        title: 'Medications & Solutions',
        items: [
          { name: 'Heparin', use: 'Anticoagulation', amount: 'As ordered' },
          { name: 'Protamine', use: 'Heparin reversal', amount: 'As needed' }
        ]
      },
      complications: ['Stroke', 'Bleeding', 'Nerve injury', 'Restenosis'],
      tips: ['Monitor neuro status', 'Use shunt if needed', 'Gentle plaque removal', 'Check distal flow']
    }
  ];

  const insertedProcedures = await db.insert(procedures).values(procedureData).returning();
  console.log(`✅ Inserted ${insertedProcedures.length} procedures`);

  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 10);
  const testUser = await db.insert(users).values({
    email: 'jane.smith@hospital.com',
    password: hashedPassword,
    firstName: 'Jane',
    lastName: 'Smith',
    certificationNumber: '12345',
    yearsExperience: '5-10',
    primarySpecialty: 'General Surgery',
    subscriptionTier: 'standard',
    selectedSpecialties: ['General Surgery', 'Orthopedics', 'Gynecology'],
    isVerified: true
  }).returning();

  console.log(`✅ Created test user: ${testUser[0].email}`);
  console.log('🎉 Database seeded successfully!');
  } catch (error) {
    console.error('❌ Seeding error:', error);
    throw error;
  }
}

export default seed;

// Only run seed if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seed().catch(console.error);
}