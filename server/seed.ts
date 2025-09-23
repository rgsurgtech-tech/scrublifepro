import { db } from './db';
import { specialties, procedures, users } from '@shared/schema';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await db.delete(procedures);
  await db.delete(specialties);
  await db.delete(users);

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
  const ophthalmologyId = insertedSpecialties.find(s => s.name === 'Ophthalmology')?.id!;

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
}

seed().catch(console.error);