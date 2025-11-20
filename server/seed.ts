import { db } from './db';
import { 
  specialties, 
  procedures, 
  users, 
  userNotes, 
  userFavorites, 
  userActivity, 
  forumPosts, 
  forumReplies,
  postLikes, 
  videos, 
  videoProgress, 
  videoComments, 
  videoCategories,
  videoFavorites,
  videoLikes
} from '@shared/schema';
import bcrypt from 'bcryptjs';

async function seed(options = { proceduresOnly: false }) {
  console.log(options.proceduresOnly ? '🌱 Seeding procedures only...' : '🌱 Seeding database...');

  try {
    if (!options.proceduresOnly) {
      // Clear existing data in proper order (child tables first to avoid FK violations)
      console.log('🗑️ Clearing existing data...');
      
      // Delete child tables that reference procedures/users/videos first
      await db.delete(videoComments);
      await db.delete(videoLikes);
      await db.delete(videoFavorites);
      await db.delete(videoProgress);
      await db.delete(forumReplies);
      await db.delete(postLikes);
      await db.delete(forumPosts);
      await db.delete(userActivity);
      await db.delete(userFavorites);
      await db.delete(userNotes);
      
      // Delete videos (references categories and procedures)
      await db.delete(videos);
      await db.delete(videoCategories);
      
      // Delete procedures (references specialties)
      await db.delete(procedures);
      
      // Delete parent tables
      await db.delete(specialties);
      await db.delete(users);
      
      console.log('✅ Existing data cleared');
    }

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

  let insertedSpecialties;
  
  if (options.proceduresOnly) {
    // In proceduresOnly mode, fetch existing specialties instead of inserting
    console.log('📋 Fetching existing specialties...');
    insertedSpecialties = await db.select().from(specialties);
    console.log(`✅ Found ${insertedSpecialties.length} existing specialties`);
  } else {
    // In full seed mode, insert new specialties
    insertedSpecialties = await db.insert(specialties).values(specialtyData).returning();
    console.log(`✅ Inserted ${insertedSpecialties.length} specialties`);
  }

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
    },
    // Additional General Surgery Procedures
    {
      name: 'Inguinal Hernia Repair',
      specialtyId: generalSurgeryId,
      description: 'Repair of inguinal hernia using mesh reinforcement',
      duration: '60-90 min',
      difficulty: 'Intermediate',
      positioning: { title: 'Patient Positioning', steps: ['Supine position', 'Arms tucked at sides', 'Slight Trendelenburg if needed', 'Prep lower abdomen and groin', 'Ensure adequate exposure'] },
      draping: { title: 'Draping Protocol', steps: ['Prep from umbilicus to mid-thigh', 'Groin and lower abdomen exposed', 'Standard laparotomy drape', 'Four corner draping'] },
      instruments: { title: 'Instrumentation', basicSet: ['General surgery set', 'Self-retaining retractors'], specialInstruments: ['Mesh', 'Tacking device', 'Electrocautery', 'Atraumatic forceps', 'Suture passer'] },
      mayoSetup: { title: 'Mayo Stand Setup', layout: 'Standard hernia repair setup with mesh accessible', essentials: ['Mesh', 'Tacking device', 'Sutures', 'Retractors', 'Electrocautery'] },
      procedureSteps: { title: 'Procedure Steps', steps: [
        { step: 1, title: 'Incision', description: 'Oblique incision over inguinal canal', instruments: ['Scalpel', 'Electrocautery'] },
        { step: 2, title: 'Dissection', description: 'Expose external oblique and inguinal canal', instruments: ['Retractors', 'Forceps'] },
        { step: 3, title: 'Hernia Reduction', description: 'Reduce hernia sac and contents', instruments: ['Forceps', 'Scissors'] },
        { step: 4, title: 'Mesh Placement', description: 'Place and secure mesh over defect', instruments: ['Mesh', 'Tacking device'] },
        { step: 5, title: 'Closure', description: 'Layer closure of fascia and skin', instruments: ['Sutures', 'Needle holders'] }
      ]},
      medications: { title: 'Medications & Solutions', items: [
        { name: 'Local anesthetic', use: 'Infiltration', amount: '20-30mL' },
        { name: 'Normal saline', use: 'Irrigation', amount: '500mL' }
      ]},
      complications: ['Recurrence', 'Nerve injury', 'Chronic pain', 'Mesh infection'],
      tips: ['Identify all three nerves', 'Ensure mesh covers entire defect', 'Gentle tissue handling', 'Check for cord structures']
    },
    {
      name: 'Thyroidectomy',
      specialtyId: generalSurgeryId,
      description: 'Surgical removal of thyroid gland (partial or total)',
      duration: '90-180 min',
      difficulty: 'Advanced',
      positioning: { title: 'Patient Positioning', steps: ['Supine with neck extension', 'Shoulder roll for hyperextension', 'Arms tucked', 'Head stabilized', 'Prep neck and upper chest'] },
      draping: { title: 'Draping Protocol', steps: ['Prep from mandible to nipples', 'Ear to ear laterally', 'Head drape with neck exposure', 'Split sheet draping'] },
      instruments: { title: 'Instrumentation', basicSet: ['Thyroid set', 'Fine instruments', 'Nerve monitor'], specialInstruments: ['Harmonic scalpel', 'LigaSure', 'Nerve stimulator', 'Fine hemostats', 'Thyroid retractors', 'Suction'] },
      mayoSetup: { title: 'Mayo Stand Setup', layout: 'Fine instruments organized for delicate dissection', essentials: ['Harmonic scalpel', 'Fine forceps', 'Thyroid retractors', 'Nerve monitor', 'Hemostats'] },
      procedureSteps: { title: 'Procedure Steps', steps: [
        { step: 1, title: 'Incision', description: 'Transverse cervical incision', instruments: ['Scalpel', 'Electrocautery'] },
        { step: 2, title: 'Flap Development', description: 'Raise subplatysmal flaps', instruments: ['Electrocautery', 'Retractors'] },
        { step: 3, title: 'Strap Division', description: 'Divide strap muscles in midline', instruments: ['Scissors', 'Electrocautery'] },
        { step: 4, title: 'Lobe Mobilization', description: 'Mobilize thyroid lobe', instruments: ['Harmonic scalpel', 'LigaSure'] },
        { step: 5, title: 'RLN Identification', description: 'Identify and preserve recurrent laryngeal nerve', instruments: ['Nerve monitor', 'Fine forceps'] },
        { step: 6, title: 'Resection', description: 'Remove thyroid lobe', instruments: ['Harmonic scalpel', 'Clips'] },
        { step: 7, title: 'Hemostasis', description: 'Achieve complete hemostasis', instruments: ['LigaSure', 'Clips'] },
        { step: 8, title: 'Closure', description: 'Layer closure with drain placement', instruments: ['Sutures', 'Drain'] }
      ]},
      medications: { title: 'Medications & Solutions', items: [
        { name: 'Lidocaine with epinephrine', use: 'Local infiltration', amount: '10-20mL' },
        { name: 'Normal saline', use: 'Irrigation', amount: '500mL' }
      ]},
      complications: ['RLN injury', 'Hypocalcemia', 'Hematoma', 'Hypothyroidism'],
      tips: ['Always identify RLN before ligation', 'Preserve parathyroids', 'Meticulous hemostasis', 'Use nerve monitor']
    },
    {
      name: 'Ventral Hernia Repair',
      specialtyId: generalSurgeryId,
      description: 'Repair of abdominal wall hernia with mesh',
      duration: '90-150 min',
      difficulty: 'Intermediate',
      positioning: { title: 'Patient Positioning', steps: ['Supine position', 'Arms extended', 'Foley catheter placement', 'Prep entire abdomen', 'Table positioning for exposure'] },
      draping: { title: 'Draping Protocol', steps: ['Wide prep of abdomen', 'Four corner draping', 'Large laparotomy drape', 'Adhesive drapes for edge seal'] },
      instruments: { title: 'Instrumentation', basicSet: ['Major laparotomy set', 'Self-retaining retractors'], specialInstruments: ['Large mesh', 'Tacking device', 'Mesh fixation sutures', 'Electrocautery'] },
      mayoSetup: { title: 'Mayo Stand Setup', layout: 'Hernia mesh and fixation devices readily accessible', essentials: ['Mesh', 'Tacking device', 'Fixation sutures', 'Retractors', 'Electrocautery'] },
      procedureSteps: { title: 'Procedure Steps', steps: [
        { step: 1, title: 'Incision', description: 'Incision over hernia site', instruments: ['Scalpel', 'Electrocautery'] },
        { step: 2, title: 'Sac Dissection', description: 'Dissect hernia sac from surrounding tissue', instruments: ['Scissors', 'Forceps'] },
        { step: 3, title: 'Defect Identification', description: 'Define edges of fascial defect', instruments: ['Retractors', 'Forceps'] },
        { step: 4, title: 'Mesh Placement', description: 'Position mesh with adequate overlap', instruments: ['Mesh', 'Tacking device'] },
        { step: 5, title: 'Fixation', description: 'Secure mesh to fascia', instruments: ['Tacking device', 'Sutures'] },
        { step: 6, title: 'Closure', description: 'Layer closure over mesh', instruments: ['Sutures', 'Needle holders'] }
      ]},
      medications: { title: 'Medications & Solutions', items: [
        { name: 'Local anesthetic', use: 'Wound infiltration', amount: '30-50mL' },
        { name: 'Antibiotic irrigation', use: 'Mesh soaking', amount: '500mL' }
      ]},
      complications: ['Recurrence', 'Mesh infection', 'Seroma', 'Chronic pain'],
      tips: ['Ensure 5cm mesh overlap', 'Multiple fixation points', 'Consider component separation', 'Drain placement if large pocket']
    },
    {
      name: 'Colectomy (Partial)',
      specialtyId: generalSurgeryId,
      description: 'Partial removal of colon segment',
      duration: '120-240 min',
      difficulty: 'Advanced',
      positioning: { title: 'Patient Positioning', steps: ['Supine or lithotomy', 'Arms tucked', 'Sequential compression devices', 'Foley and NG tube', 'Wide prep of abdomen'] },
      draping: { title: 'Draping Protocol', steps: ['Prep chest to thighs', 'Four corner draping', 'Large laparotomy drape', 'Ensure access to entire abdomen'] },
      instruments: { title: 'Instrumentation', basicSet: ['Major laparotomy set', 'Bowel clamps', 'Vascular instruments'], specialInstruments: ['Surgical staplers', 'LigaSure', 'Wound protector', 'Self-retaining retractor'] },
      mayoSetup: { title: 'Mayo Stand Setup', layout: 'Staplers and vascular instruments prominent', essentials: ['Staplers', 'Bowel clamps', 'LigaSure', 'Vascular instruments', 'Sutures'] },
      procedureSteps: { title: 'Procedure Steps', steps: [
        { step: 1, title: 'Laparotomy', description: 'Midline abdominal incision', instruments: ['Scalpel', 'Electrocautery'] },
        { step: 2, title: 'Exploration', description: 'Systematic abdominal exploration', instruments: ['Retractors'] },
        { step: 3, title: 'Mobilization', description: 'Mobilize affected colon segment', instruments: ['Electrocautery', 'Scissors'] },
        { step: 4, title: 'Vascular Ligation', description: 'Ligate mesenteric vessels', instruments: ['LigaSure', 'Clips', 'Ties'] },
        { step: 5, title: 'Resection', description: 'Resect diseased colon segment', instruments: ['Staplers', 'Scalpel'] },
        { step: 6, title: 'Anastomosis', description: 'Create bowel anastomosis', instruments: ['Staplers', 'Sutures'] },
        { step: 7, title: 'Closure', description: 'Close abdomen in layers', instruments: ['Sutures', 'Needle holders'] }
      ]},
      medications: { title: 'Medications & Solutions', items: [
        { name: 'Antibiotic irrigation', use: 'Peritoneal lavage', amount: '2-3L' },
        { name: 'IV antibiotics', use: 'Prophylaxis', amount: 'Per protocol' }
      ]},
      complications: ['Anastomotic leak', 'Bleeding', 'Ileus', 'Wound infection'],
      tips: ['Ensure adequate blood supply', 'Tension-free anastomosis', 'Check for leaks', 'Document findings']
    },
    {
      name: 'Splenectomy',
      specialtyId: generalSurgeryId,
      description: 'Surgical removal of spleen',
      duration: '90-180 min',
      difficulty: 'Advanced',
      positioning: { title: 'Patient Positioning', steps: ['Supine or right lateral decubitus', 'Left side elevated', 'Arms positioned', 'Sequential compression devices', 'Prep left chest and abdomen'] },
      draping: { title: 'Draping Protocol', steps: ['Prep from nipples to iliac crest', 'Wide draping for access', 'Laparotomy drape', 'Ensure lateral access'] },
      instruments: { title: 'Instrumentation', basicSet: ['Major laparotomy set', 'Vascular instruments'], specialInstruments: ['Long instruments', 'Vascular staplers', 'Large hemoclips', 'Cell saver'] },
      mayoSetup: { title: 'Mayo Stand Setup', layout: 'Vascular control instruments prominent, staplers ready', essentials: ['Vascular clamps', 'Staplers', 'Large clips', 'Long instruments', 'Sutures'] },
      procedureSteps: { title: 'Procedure Steps', steps: [
        { step: 1, title: 'Incision', description: 'Midline or subcostal incision', instruments: ['Scalpel', 'Electrocautery'] },
        { step: 2, title: 'Mobilization', description: 'Mobilize spleen and ligate attachments', instruments: ['Scissors', 'LigaSure'] },
        { step: 3, title: 'Hilar Dissection', description: 'Isolate splenic vessels', instruments: ['Vascular instruments', 'Forceps'] },
        { step: 4, title: 'Vascular Control', description: 'Ligate splenic artery and vein', instruments: ['Staplers', 'Clips', 'Ties'] },
        { step: 5, title: 'Removal', description: 'Remove spleen', instruments: ['Scissors', 'Forceps'] },
        { step: 6, title: 'Hemostasis', description: 'Ensure complete hemostasis', instruments: ['Electrocautery', 'Clips'] }
      ]},
      medications: { title: 'Medications & Solutions', items: [
        { name: 'Cell saver setup', use: 'Blood conservation', amount: 'As needed' },
        { name: 'Vaccines', use: 'Post-splenectomy prophylaxis', amount: 'Per protocol' }
      ]},
      complications: ['Bleeding', 'Pancreatic injury', 'Left lower lobe atelectasis', 'Thrombocytosis'],
      tips: ['Control hilum early', 'Watch for accessory spleens', 'Protect pancreatic tail', 'Consider vaccines']
    },
    {
      name: 'Gastric Bypass (Roux-en-Y)',
      specialtyId: generalSurgeryId,
      description: 'Bariatric procedure creating small gastric pouch with intestinal bypass',
      duration: '120-240 min',
      difficulty: 'Advanced',
      positioning: { title: 'Patient Positioning', steps: ['Supine position', 'Arms extended', 'Steep reverse Trendelenburg', 'Sequential compression devices', 'Foley catheter'] },
      draping: { title: 'Draping Protocol', steps: ['Wide abdominal prep', 'Four corner draping', 'Laparoscopic draping', 'All ports accessible'] },
      instruments: { title: 'Instrumentation', basicSet: ['Laparoscopic bariatric set', 'Multiple staplers'], specialInstruments: ['Linear staplers', 'Circular staplers', 'Liver retractor', 'Endoscope', 'Leak test dye'] },
      mayoSetup: { title: 'Mayo Stand Setup', layout: 'Multiple staplers organized by type, liver retractor accessible', essentials: ['Staplers', 'Liver retractor', 'Leak test supplies', 'Bougie', 'Sutures'] },
      procedureSteps: { title: 'Procedure Steps', steps: [
        { step: 1, title: 'Port Placement', description: 'Place 5-6 laparoscopic ports', instruments: ['Trocars', 'Veress needle'] },
        { step: 2, title: 'Gastric Pouch Creation', description: 'Create 15-30mL gastric pouch', instruments: ['Staplers', 'Bougie'] },
        { step: 3, title: 'Roux Limb Creation', description: 'Divide jejunum and create Roux limb', instruments: ['Staplers', 'Scissors'] },
        { step: 4, title: 'Gastrojejunostomy', description: 'Create anastomosis between pouch and Roux limb', instruments: ['Staplers', 'Sutures'] },
        { step: 5, title: 'Jejunojejunostomy', description: 'Create side-to-side anastomosis', instruments: ['Staplers'] },
        { step: 6, title: 'Leak Test', description: 'Test all anastomoses for leaks', instruments: ['Endoscope', 'Leak test dye'] },
        { step: 7, title: 'Closure', description: 'Close mesenteric defects and ports', instruments: ['Sutures'] }
      ]},
      medications: { title: 'Medications & Solutions', items: [
        { name: 'Methylene blue', use: 'Leak testing', amount: '50-100mL' },
        { name: 'IV antibiotics', use: 'Prophylaxis', amount: 'Per protocol' }
      ]},
      complications: ['Anastomotic leak', 'Bleeding', 'Bowel obstruction', 'Marginal ulcer'],
      tips: ['Small pouch is key', 'Tension-free anastomoses', 'Always leak test', 'Close mesenteric defects']
    },
    {
      name: 'Mastectomy (Total)',
      specialtyId: generalSurgeryId,
      description: 'Complete removal of breast tissue',
      duration: '90-180 min',
      difficulty: 'Intermediate',
      positioning: { title: 'Patient Positioning', steps: ['Supine with arm extended', 'Ipsilateral arm on armboard', 'Chest and arm prepped', 'Wide field preparation'] },
      draping: { title: 'Draping Protocol', steps: ['Prep from neck to umbilicus', 'Midline to posterior axillary line', 'Arm draped separately', 'U-drape configuration'] },
      instruments: { title: 'Instrumentation', basicSet: ['General surgery set', 'Mastectomy set'], specialInstruments: ['Electrocautery', 'Harmonic scalpel', 'Self-retaining retractors', 'Skin hooks', 'Drains'] },
      mayoSetup: { title: 'Mayo Stand Setup', layout: 'Sharp dissection instruments prominent', essentials: ['Electrocautery', 'Scissors', 'Forceps', 'Retractors', 'Drains'] },
      procedureSteps: { title: 'Procedure Steps', steps: [
        { step: 1, title: 'Incision', description: 'Elliptical incision around breast', instruments: ['Scalpel'] },
        { step: 2, title: 'Flap Development', description: 'Raise skin flaps to pectoralis', instruments: ['Electrocautery', 'Scissors'] },
        { step: 3, title: 'Breast Removal', description: 'Remove breast tissue from pectoralis', instruments: ['Electrocautery', 'Forceps'] },
        { step: 4, title: 'Axillary Dissection', description: 'Sentinel node or axillary dissection if indicated', instruments: ['Fine scissors', 'Clips'] },
        { step: 5, title: 'Hemostasis', description: 'Achieve complete hemostasis', instruments: ['Electrocautery', 'Ties'] },
        { step: 6, title: 'Drain Placement', description: 'Place closed suction drains', instruments: ['Drains'] },
        { step: 7, title: 'Closure', description: 'Layer closure of skin', instruments: ['Sutures'] }
      ]},
      medications: { title: 'Medications & Solutions', items: [
        { name: 'Local anesthetic', use: 'Flap infiltration', amount: '30-50mL' },
        { name: 'Isosulfan blue', use: 'Sentinel node mapping', amount: 'If indicated' }
      ]},
      complications: ['Seroma', 'Hematoma', 'Skin flap necrosis', 'Lymphedema'],
      tips: ['Thin uniform flaps', 'Preserve skin viability', 'Meticulous hemostasis', 'Secure drain placement']
    },
    // Additional Orthopedic Procedures
    {
      name: 'Hip Arthroscopy',
      specialtyId: orthopedicsId,
      description: 'Minimally invasive hip joint surgery',
      duration: '60-120 min',
      difficulty: 'Advanced',
      positioning: { title: 'Patient Positioning', steps: ['Supine or lateral on traction table', 'Gentle traction applied', 'Fluoroscopy available', 'Perineal post padding', 'Contralateral leg positioned'] },
      draping: { title: 'Draping Protocol', steps: ['Circumferential prep', 'Hip and thigh draped', 'Arthroscopy draping', 'Ensure portal access'] },
      instruments: { title: 'Instrumentation', basicSet: ['Hip arthroscopy set', 'Traction table'], specialInstruments: ['Arthroscope 70°', 'Arthroscopic instruments', 'Radiofrequency device', 'Shavers', 'Suture passers'] },
      mayoSetup: { title: 'Mayo Stand Setup', layout: 'Arthroscopic instruments organized by sequence', essentials: ['Arthroscope', 'Shavers', 'RF device', 'Suture passers', 'Cannulas'] },
      procedureSteps: { title: 'Procedure Steps', steps: [
        { step: 1, title: 'Traction Application', description: 'Apply controlled traction to hip', instruments: ['Traction table'] },
        { step: 2, title: 'Portal Creation', description: 'Establish anterolateral and other portals', instruments: ['Cannulas', 'Guidewires'] },
        { step: 3, title: 'Diagnostic Arthroscopy', description: 'Systematic joint inspection', instruments: ['Arthroscope', 'Probe'] },
        { step: 4, title: 'Pathology Treatment', description: 'Address labral tears, FAI, loose bodies', instruments: ['Shavers', 'RF device'] },
        { step: 5, title: 'Capsular Closure', description: 'Close capsulotomy if performed', instruments: ['Suture passers'] }
      ]},
      medications: { title: 'Medications & Solutions', items: [
        { name: 'Arthroscopy fluid', use: 'Joint distension', amount: '3-6L' },
        { name: 'Local anesthetic', use: 'Portal infiltration', amount: '20mL' }
      ]},
      complications: ['Nerve injury', 'Fluid extravasation', 'Traction injury', 'Instrument breakage'],
      tips: ['Gentle traction only', 'Monitor fluid balance', 'Protect pudendal nerve', 'Systematic approach']
    },
    {
      name: 'Shoulder Arthroscopy',
      specialtyId: orthopedicsId,
      description: 'Arthroscopic shoulder surgery for rotator cuff and labral repairs',
      duration: '60-150 min',
      difficulty: 'Intermediate',
      positioning: { title: 'Patient Positioning', steps: ['Beach chair or lateral decubitus', 'Arm in traction or holder', 'Adequate shoulder exposure', 'Head stabilized', 'Pressure points padded'] },
      draping: { title: 'Draping Protocol', steps: ['Circumferential shoulder prep', 'Arthroscopy draping', 'Arm draped free', 'Portal sites marked'] },
      instruments: { title: 'Instrumentation', basicSet: ['Shoulder arthroscopy set', 'Suture anchors'], specialInstruments: ['Arthroscope 30°', 'Shavers', 'Suture passers', 'Anchor insertion system', 'Radiofrequency device'] },
      mayoSetup: { title: 'Mayo Stand Setup', layout: 'Suture anchors and passers prominent', essentials: ['Arthroscope', 'Anchors', 'Suture passers', 'Shavers', 'RF device'] },
      procedureSteps: { title: 'Procedure Steps', steps: [
        { step: 1, title: 'Portal Placement', description: 'Create posterior, anterior, and lateral portals', instruments: ['Cannulas', 'Spinal needle'] },
        { step: 2, title: 'Diagnostic Arthroscopy', description: 'Inspect glenohumeral and subacromial space', instruments: ['Arthroscope', 'Probe'] },
        { step: 3, title: 'Pathology Treatment', description: 'Rotator cuff repair or labral repair', instruments: ['Shavers', 'Suture anchors'] },
        { step: 4, title: 'Subacromial Decompression', description: 'If indicated, perform acromioplasty', instruments: ['Burr', 'Shavers'] }
      ]},
      medications: { title: 'Medications & Solutions', items: [
        { name: 'Arthroscopy fluid', use: 'Joint irrigation', amount: '3-6L' },
        { name: 'Epinephrine solution', use: 'Hemostasis', amount: 'Added to fluid' },
        { name: 'Local block', use: 'Interscalene block', amount: 'Per anesthesia' }
      ]},
      complications: ['Nerve injury', 'Anchor pullout', 'Stiffness', 'Retear'],
      tips: ['Low pump pressure', 'Systematic portal placement', 'Secure anchor fixation', 'Protect axillary nerve']
    },
    {
      name: 'ACL Reconstruction',
      specialtyId: orthopedicsId,
      description: 'Arthroscopic anterior cruciate ligament reconstruction',
      duration: '90-150 min',
      difficulty: 'Advanced',
      positioning: { title: 'Patient Positioning', steps: ['Supine with leg holder', 'Tourniquet placement', 'Contralateral leg positioned', 'Ensure full range of motion', 'Fluoroscopy available'] },
      draping: { title: 'Draping Protocol', steps: ['Circumferential leg prep', 'Thigh tourniquet draped', 'Arthroscopy draping', 'Harvest site accessible'] },
      instruments: { title: 'Instrumentation', basicSet: ['Knee arthroscopy set', 'ACL reconstruction set'], specialInstruments: ['Arthroscope', 'ACL guides', 'Reamers', 'Graft preparation board', 'Fixation devices', 'EndoButton, screws'] },
      mayoSetup: { title: 'Mayo Stand Setup', layout: 'ACL guides and fixation prominent, graft prep station separate', essentials: ['Arthroscope', 'ACL guides', 'Reamers', 'Fixation devices', 'Tensioning device'] },
      procedureSteps: { title: 'Procedure Steps', steps: [
        { step: 1, title: 'Diagnostic Arthroscopy', description: 'Confirm ACL tear and assess menisci', instruments: ['Arthroscope', 'Probe'] },
        { step: 2, title: 'Graft Harvest', description: 'Harvest hamstring or patellar tendon graft', instruments: ['Tendon stripper', 'Scalpel'] },
        { step: 3, title: 'Graft Preparation', description: 'Prepare and size graft', instruments: ['Graft preparation board', 'Sutures'] },
        { step: 4, title: 'Notch Preparation', description: 'Prepare femoral and tibial tunnels', instruments: ['Shavers', 'Burr'] },
        { step: 5, title: 'Tunnel Drilling', description: 'Drill femoral and tibial tunnels', instruments: ['ACL guides', 'Reamers'] },
        { step: 6, title: 'Graft Passage', description: 'Pass graft through tunnels', instruments: ['Passing sutures'] },
        { step: 7, title: 'Graft Fixation', description: 'Fix graft with buttons/screws', instruments: ['EndoButton', 'Interference screws'] },
        { step: 8, title: 'Tensioning', description: 'Cycle knee and tension graft', instruments: ['Tensioning device'] }
      ]},
      medications: { title: 'Medications & Solutions', items: [
        { name: 'Arthroscopy fluid', use: 'Joint irrigation', amount: '6-9L' },
        { name: 'Vancomycin powder', use: 'Infection prophylaxis', amount: '1g in tunnels' },
        { name: 'Local anesthetic', use: 'Portal infiltration', amount: '20-30mL' }
      ]},
      complications: ['Graft failure', 'Tunnel malposition', 'Arthrofibrosis', 'Infection'],
      tips: ['Anatomic tunnel placement', 'Adequate graft tension', 'Protect graft during fixation', 'Check full ROM']
    },
    {
      name: 'Spinal Fusion (Lumbar)',
      specialtyId: orthopedicsId,
      description: 'Lumbar interbody fusion for degenerative disc disease',
      duration: '180-360 min',
      difficulty: 'Advanced',
      positioning: { title: 'Patient Positioning', steps: ['Prone on Jackson table or frame', 'Abdomen free hanging', 'Pressure points well padded', 'Arms positioned', 'Fluoroscopy available'] },
      draping: { title: 'Draping Protocol', steps: ['Wide back prep', 'Four corner draping', 'Ensure vertebral level access', 'Fluoroscopy draping'] },
      instruments: { title: 'Instrumentation', basicSet: ['Spine set', 'Power tools'], specialInstruments: ['Pedicle screws and rods', 'Interbody cages', 'Bone graft', 'Fluoroscopy', 'Retractor system', 'Nerve monitor'] },
      mayoSetup: { title: 'Mayo Stand Setup', layout: 'Implants organized by size, power tools accessible', essentials: ['Pedicle instruments', 'Cage trials', 'Rod benders', 'Screwdrivers', 'Bone graft'] },
      procedureSteps: { title: 'Procedure Steps', steps: [
        { step: 1, title: 'Exposure', description: 'Midline incision and muscle dissection', instruments: ['Electrocautery', 'Retractors'] },
        { step: 2, title: 'Decompression', description: 'Laminectomy and foraminotomy', instruments: ['Rongeurs', 'Kerrison punches'] },
        { step: 3, title: 'Discectomy', description: 'Remove disc material', instruments: ['Pituitary rongeurs', 'Curettes'] },
        { step: 4, title: 'Endplate Preparation', description: 'Prepare vertebral endplates', instruments: ['Shavers', 'Curettes'] },
        { step: 5, title: 'Cage Placement', description: 'Insert interbody cage with bone graft', instruments: ['Cage inserter', 'Bone graft'] },
        { step: 6, title: 'Pedicle Screw Insertion', description: 'Place bilateral pedicle screws', instruments: ['Tap', 'Screwdriver', 'Fluoroscopy'] },
        { step: 7, title: 'Rod Placement', description: 'Place and secure connecting rods', instruments: ['Rod benders', 'Set screws'] },
        { step: 8, title: 'Final Tightening', description: 'Final construct tightening', instruments: ['Torque drivers'] }
      ]},
      medications: { title: 'Medications & Solutions', items: [
        { name: 'Tranexamic acid', use: 'Reduce bleeding', amount: 'Per protocol' },
        { name: 'Vancomycin powder', use: 'Wound prophylaxis', amount: '1-2g' },
        { name: 'Local anesthetic', use: 'Wound infiltration', amount: '30-50mL' }
      ]},
      complications: ['Nerve injury', 'Dural tear', 'Screw malposition', 'Pseudarthrosis'],
      tips: ['Confirm levels with fluoroscopy', 'Protect nerve roots', 'Adequate decompression', 'Solid construct']
    },
    {
      name: 'Carpal Tunnel Release',
      specialtyId: orthopedicsId,
      description: 'Surgical decompression of median nerve at wrist',
      duration: '20-30 min',
      difficulty: 'Basic',
      positioning: { title: 'Patient Positioning', steps: ['Supine with arm on hand table', 'Hand supinated', 'Tourniquet on arm', 'Wide angle hand table', 'Adequate lighting'] },
      draping: { title: 'Draping Protocol', steps: ['Prep hand and forearm', 'Tourniquet wrapped', 'Hand drape', 'Arm wrapped'] },
      instruments: { title: 'Instrumentation', basicSet: ['Hand surgery set', 'Small retractors'], specialInstruments: ['Scalpel #15', 'Fine scissors', 'Skin hooks', 'Self-retaining retractor', 'Tenotomy scissors'] },
      mayoSetup: { title: 'Mayo Stand Setup', layout: 'Small instrument setup for delicate dissection', essentials: ['Scalpel', 'Fine scissors', 'Retractor', 'Forceps', 'Sutures'] },
      procedureSteps: { title: 'Procedure Steps', steps: [
        { step: 1, title: 'Incision', description: 'Longitudinal palmar incision', instruments: ['Scalpel #15'] },
        { step: 2, title: 'Fascia Division', description: 'Divide palmar fascia', instruments: ['Scissors'] },
        { step: 3, title: 'Ligament Release', description: 'Divide transverse carpal ligament under direct vision', instruments: ['Tenotomy scissors'] },
        { step: 4, title: 'Nerve Inspection', description: 'Inspect and decompress median nerve', instruments: ['Retractors', 'Scissors'] },
        { step: 5, title: 'Closure', description: 'Close skin only', instruments: ['Sutures'] }
      ]},
      medications: { title: 'Medications & Solutions', items: [
        { name: 'Local anesthetic', use: 'WALANT technique', amount: '10-15mL' },
        { name: 'Epinephrine', use: 'Hemostasis', amount: 'Mixed with local' }
      ]},
      complications: ['Incomplete release', 'Nerve injury', 'Pillar pain', 'Scar tenderness'],
      tips: ['Visualize entire ligament', 'Protect median nerve branches', 'Adequate proximal release', 'Wound hemostasis']
    },
    // Additional Orthopedic Procedures  
    { name: 'Rotator Cuff Repair (Open)', specialtyId: orthopedicsId, description: 'Open surgical repair of rotator cuff tears', duration: '90-150 min', difficulty: 'Advanced', positioning: { title: 'Patient Positioning', steps: ['Beach chair position', 'Affected arm free', 'Head secured', 'Prep entire shoulder', 'Ensure full access'] }, draping: { title: 'Draping Protocol', steps: ['Circumferential shoulder prep', 'Arm draped free', 'U-drape configuration', 'Surgical site exposed'] }, instruments: { title: 'Instrumentation', basicSet: ['Shoulder set', 'Suture anchors'], specialInstruments: ['Suture anchors', 'Anchor inserter', 'Bone preparation tools', 'Heavy sutures', 'Arthroscope (if needed)'] }, mayoSetup: { title: 'Mayo Stand Setup', layout: 'Anchors organized, heavy sutures ready', essentials: ['Anchors', 'Sutures', 'Bone tools', 'Retractors', 'Electrocautery'] }, procedureSteps: { title: 'Procedure Steps', steps: [{ step: 1, title: 'Incision', description: 'Anterolateral approach to shoulder', instruments: ['Scalpel', 'Electrocautery'] }, { step: 2, title: 'Deltoid Split', description: 'Split deltoid muscle fibers', instruments: ['Electrocautery', 'Retractors'] }, { step: 3, title: 'Tendon Exposure', description: 'Expose torn rotator cuff', instruments: ['Retractors', 'Scissors'] }, { step: 4, title: 'Footprint Preparation', description: 'Prepare greater tuberosity', instruments: ['Burr', 'Curettes'] }, { step: 5, title: 'Anchor Placement', description: 'Insert bone anchors', instruments: ['Anchors', 'Mallet'] }, { step: 6, title: 'Tendon Repair', description: 'Suture tendon to bone', instruments: ['Sutures', 'Needle holders'] }, { step: 7, title: 'Closure', description: 'Close deltoid and skin', instruments: ['Sutures'] }] }, medications: { title: 'Medications & Solutions', items: [{ name: 'Local anesthetic', use: 'Wound infiltration', amount: '20-30mL' }, { name: 'Epinephrine solution', use: 'Hemostasis', amount: 'Mixed' }] }, complications: ['Retear', 'Stiffness', 'Deltoid dysfunction', 'Anchor pullout'], tips: ['Protect axillary nerve', 'Adequate anchor purchase', 'Tension-free repair', 'Secure deltoid closure'] },
    { name: 'Ankle Fracture ORIF', specialtyId: orthopedicsId, description: 'Open reduction internal fixation of ankle fracture', duration: '90-180 min', difficulty: 'Advanced', positioning: { title: 'Patient Positioning', steps: ['Supine with bump under hip', 'Leg on radiolucent table', 'Tourniquet if needed', 'Fluoroscopy available', 'Prep entire leg'] }, draping: { title: 'Draping Protocol', steps: ['Circumferential prep', 'Knee to toes', 'Stockinette application', 'Extremity draping'] }, instruments: { title: 'Instrumentation', basicSet: ['Fracture set', 'Small fragment set'], specialInstruments: ['Ankle plates', 'Screws', 'K-wires', 'Reduction clamps', 'Fluoroscopy'] }, mayoSetup: { title: 'Mayo Stand Setup', layout: 'Plates by size, screws organized', essentials: ['Plates', 'Screws', 'K-wires', 'Reduction tools', 'Drill'] }, procedureSteps: { title: 'Procedure Steps', steps: [{ step: 1, title: 'Incision', description: 'Lateral and/or medial incisions', instruments: ['Scalpel'] }, { step: 2, title: 'Fracture Exposure', description: 'Expose fracture fragments', instruments: ['Retractors'] }, { step: 3, title: 'Reduction', description: 'Reduce fracture anatomically', instruments: ['Reduction clamps', 'K-wires'] }, { step: 4, title: 'Plate Application', description: 'Apply and secure plates', instruments: ['Plates', 'Screws', 'Drill'] }, { step: 5, title: 'Fluoroscopy', description: 'Confirm reduction and fixation', instruments: ['Fluoroscopy'] }, { step: 6, title: 'Closure', description: 'Layer closure', instruments: ['Sutures'] }] }, medications: { title: 'Medications & Solutions', items: [{ name: 'Local anesthetic', use: 'Incision infiltration', amount: '20mL' }, { name: 'Antibiotic irrigation', use: 'Wound lavage', amount: '1L' }] }, complications: ['Malunion', 'Hardware prominence', 'Wound complications', 'Nerve injury'], tips: ['Anatomic reduction critical', 'Protect superficial nerves', 'Adequate fixation', 'Check ROM'] },
    { name: 'Meniscectomy (Arthroscopic)', specialtyId: orthopedicsId, description: 'Arthroscopic partial meniscectomy', duration: '30-60 min', difficulty: 'Intermediate', positioning: { title: 'Patient Positioning', steps: ['Supine with leg holder', 'Knee flexed 90 degrees', 'Tourniquet placement', 'Contralateral leg positioned', 'Prep and drape'] }, draping: { title: 'Draping Protocol', steps: ['Circumferential prep', 'Thigh to ankle', 'Arthroscopy draping', 'Portal sites marked'] }, instruments: { title: 'Instrumentation', basicSet: ['Knee arthroscopy set'], specialInstruments: ['Arthroscope', 'Shavers', 'Basket forceps', 'Probes', 'Meniscal repair devices'] }, mayoSetup: { title: 'Mayo Stand Setup', layout: 'Arthroscopic instruments by sequence', essentials: ['Arthroscope', 'Shavers', 'Baskets', 'Probes', 'Cannulas'] }, procedureSteps: { title: 'Procedure Steps', steps: [{ step: 1, title: 'Portal Placement', description: 'Standard anterolateral and anteromedial portals', instruments: ['Cannulas'] }, { step: 2, title: 'Diagnostic Arthroscopy', description: 'Systematic joint inspection', instruments: ['Arthroscope', 'Probe'] }, { step: 3, title: 'Meniscal Resection', description: 'Remove torn meniscal tissue', instruments: ['Shavers', 'Baskets'] }, { step: 4, title: 'Contouring', description: 'Smooth meniscal edge', instruments: ['Shavers'] }] }, medications: { title: 'Medications & Solutions', items: [{ name: 'Arthroscopy fluid', use: 'Joint distension', amount: '3-6L' }, { name: 'Local anesthetic', use: 'Portal sites', amount: '15mL' }] }, complications: ['Incomplete resection', 'Cartilage damage', 'Neurovascular injury', 'Infection'], tips: ['Preserve meniscal rim', 'Smooth resection edge', 'Systematic inspection', 'Check for loose bodies'] },
    { name: 'Total Hip Replacement', specialtyId: orthopedicsId, description: 'Total hip arthroplasty', duration: '90-180 min', difficulty: 'Advanced', positioning: { title: 'Patient Positioning', steps: ['Lateral decubitus', 'Hip elevated', 'Pelvis stabilized', 'Contralateral leg positioned', 'Prep entire hip'] }, draping: { title: 'Draping Protocol', steps: ['Hip to knee prep', 'Circumferential draping', 'Extremity drape', 'Hip exposed'] }, instruments: { title: 'Instrumentation', basicSet: ['Hip arthroplasty set', 'Power tools'], specialInstruments: ['Hip implants', 'Reamers', 'Broaches', 'Trial components', 'Cement if needed'] }, mayoSetup: { title: 'Mayo Stand Setup', layout: 'Implants by size, broaches ready', essentials: ['Implants', 'Broaches', 'Reamers', 'Trials', 'Cement'] }, procedureSteps: { title: 'Procedure Steps', steps: [{ step: 1, title: 'Approach', description: 'Posterior or anterolateral approach', instruments: ['Scalpel', 'Electrocautery'] }, { step: 2, title: 'Dislocation', description: 'Dislocate femoral head', instruments: ['Retractors'] }, { step: 3, title: 'Femoral Preparation', description: 'Prepare femoral canal', instruments: ['Broaches', 'Reamers'] }, { step: 4, title: 'Acetabular Preparation', description: 'Ream acetabulum', instruments: ['Acetabular reamers'] }, { step: 5, title: 'Implant Placement', description: 'Insert acetabular cup and femoral stem', instruments: ['Impactor', 'Implants'] }, { step: 6, title: 'Reduction', description: 'Reduce hip joint', instruments: ['Trial heads'] }, { step: 7, title: 'Closure', description: 'Repair capsule and close', instruments: ['Sutures'] }] }, medications: { title: 'Medications & Solutions', items: [{ name: 'Tranexamic acid', use: 'Reduce bleeding', amount: '1g IV' }, { name: 'Antibiotic cement', use: 'If cemented', amount: 'As needed' }] }, complications: ['Dislocation', 'Leg length discrepancy', 'Nerve injury', 'Infection'], tips: ['Proper leg length', 'Stable reduction', 'Protect sciatic nerve', 'ROM check'] },
    { name: 'Femur Fracture ORIF', specialtyId: orthopedicsId, description: 'Open reduction internal fixation of femur fracture', duration: '120-240 min', difficulty: 'Advanced', positioning: { title: 'Patient Positioning', steps: ['Supine on traction table', 'Fracture reduced', 'C-arm positioned', 'Prep entire thigh', 'Ensure access'] }, draping: { title: 'Draping Protocol', steps: ['Hip to knee prep', 'Circumferential draping', 'Ensure surgical access', 'Traction maintained'] }, instruments: { title: 'Instrumentation', basicSet: ['Large bone set', 'Traction table'], specialInstruments: ['Femoral nail', 'Locking screws', 'Targeting device', 'Reaming system', 'C-arm'] }, mayoSetup: { title: 'Mayo Stand Setup', layout: 'Implants organized, targeting ready', essentials: ['Femoral nail', 'Screws', 'Targeting jig', 'Reamers', 'Guide wires'] }, procedureSteps: { title: 'Procedure Steps', steps: [{ step: 1, title: 'Reduction', description: 'Closed or open fracture reduction', instruments: ['Traction table', 'C-arm'] }, { step: 2, title: 'Entry Point', description: 'Create femoral entry point', instruments: ['Awl', 'Guide wire'] }, { step: 3, title: 'Reaming', description: 'Ream femoral canal', instruments: ['Reamers'] }, { step: 4, title: 'Nail Insertion', description: 'Insert intramedullary nail', instruments: ['Femoral nail', 'Insertion jig'] }, { step: 5, title: 'Locking', description: 'Insert proximal and distal locking screws', instruments: ['Locking screws', 'Targeting device'] }, { step: 6, title: 'Closure', description: 'Close incisions', instruments: ['Sutures'] }] }, medications: { title: 'Medications & Solutions', items: [{ name: 'Tranexamic acid', use: 'Hemostasis', amount: '1-2g' }, { name: 'Antibiotic irrigation', use: 'Wound lavage', amount: '3L'}] }, complications: ['Malunion', 'Nonunion', 'Hardware failure', 'Fat embolism'], tips: ['Anatomic reduction', 'Adequate nail length', 'Proper locking', 'Check rotation'] },
    { name: 'Wrist Arthroscopy', specialtyId: orthopedicsId, description: 'Arthroscopic wrist surgery', duration: '45-90 min', difficulty: 'Advanced', positioning: { title: 'Patient Positioning', steps: ['Supine with arm on table', 'Wrist traction tower', 'Fluoroscopy available', 'Hand suspended', 'Tourniquet placement'] }, draping: { title: 'Draping Protocol', steps: ['Hand and forearm prep', 'Traction tower draped', 'Arthroscopy draping', 'Portal access'] }, instruments: { title: 'Instrumentation', basicSet: ['Wrist arthroscopy set', 'Micro instruments'], specialInstruments: ['Small arthroscope', 'Micro shavers', 'Probes', 'Traction system', 'Fluoroscopy'] }, mayoSetup: { title: 'Mayo Stand Setup', layout: 'Micro instruments for small joint', essentials: ['Arthroscope 2.7mm', 'Micro shavers', 'Probes', 'Traction', 'Fluoroscopy'] }, procedureSteps: { title: 'Procedure Steps', steps: [{ step: 1, title: 'Traction Application', description: 'Apply gentle wrist traction', instruments: ['Traction tower'] }, { step: 2, title: 'Portal Creation', description: 'Create radiocarpal portals', instruments: ['Cannulas', 'Fluoroscopy'] }, { step: 3, title: 'Diagnostic Arthroscopy', description: 'Inspect wrist joints', instruments: ['Arthroscope', 'Probe'] }, { step: 4, title: 'Treatment', description: 'Address pathology (TFCC, ganglion, etc)', instruments: ['Shavers', 'Radiofrequency'] }] }, medications: { title: 'Medications & Solutions', items: [{ name: 'Arthroscopy fluid', use: 'Joint distension', amount: '1-2L' }, { name: 'Local anesthetic', use: 'Portal sites', amount: '10mL' }] }, complications: ['Nerve injury', 'Tendon injury', 'Stiffness', 'Portal problems'], tips: ['Gentle traction only', 'Small portals', 'Protect nerves', 'Limited fluid pressure'] },
    { name: 'Elbow Arthroscopy', specialtyId: orthopedicsId, description: 'Arthroscopic elbow surgery', duration: '60-120 min', difficulty: 'Advanced', positioning: { title: 'Patient Positioning', steps: ['Lateral decubitus or prone', 'Arm suspended or supported', 'Elbow flexed 90 degrees', 'Tourniquet placement', 'Prep entire arm'] }, draping: { title: 'Draping Protocol', steps: ['Shoulder to hand prep', 'Arm draped free', 'Arthroscopy draping', 'Portal sites marked'] }, instruments: { title: 'Instrumentation', basicSet: ['Elbow arthroscopy set'], specialInstruments: ['Arthroscope 4mm', 'Shavers', 'Burrs', 'Graspers', 'Nerve monitoring'] }, mayoSetup: { title: 'Mayo Stand Setup', layout: 'Arthroscopic tools, nerve protection priority', essentials: ['Arthroscope', 'Shavers', 'Burrs', 'Probes', 'Graspers'] }, procedureSteps: { title: 'Procedure Steps', steps: [{ step: 1, title: 'Portal Placement', description: 'Proximal anterolateral and posterolateral portals', instruments: ['Cannulas', 'Spinal needle'] }, { step: 2, title: 'Diagnostic Arthroscopy', description: 'Inspect anterior and posterior compartments', instruments: ['Arthroscope', 'Probe'] }, { step: 3, title: 'Treatment', description: 'Loose body removal, contracture release', instruments: ['Shavers', 'Burrs', 'Graspers'] }] }, medications: { title: 'Medications & Solutions', items: [{ name: 'Arthroscopy fluid', use: 'Joint irrigation', amount: '2-4L' }, { name: 'Local anesthetic', use: 'Portal infiltration', amount: '15mL' }] }, complications: ['Nerve injury', 'Heterotopic ossification', 'Stiffness', 'Infection'], tips: ['Mark nerves before portals', 'Low pump pressure', 'Protect ulnar nerve', 'Limited debridement'] }
  ];

  const insertedProcedures = await db.insert(procedures).values(procedureData).returning();
  console.log(`✅ Inserted ${insertedProcedures.length} procedures`);

  if (!options.proceduresOnly) {
    // Create a test user (only in full seed mode)
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
  }
  
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