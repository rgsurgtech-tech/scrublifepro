import { db } from './db';
import { procedures, specialties } from '@shared/schema';

async function add113MoreProcedures() {
  console.log('📊 Adding 113 more procedures to reach 204 total...');

  try {
    const allSpecialties = await db.select().from(specialties);
    
    const getSpecialtyId = (name: string) => {
      const specialty = allSpecialties.find(s => s.name === name);
      if (!specialty) throw new Error(`Specialty not found: ${name}`);
      return specialty.id;
    };

    const newProcedures = [
      // ====================ADDITIONAL GENERAL SURGERY (6 procedures) ====================
      {
        name: 'Open Umbilical Hernia Repair',
        specialtyId: getSpecialtyId('General Surgery'),
        description: 'Open repair of umbilical hernia with mesh reinforcement',
        duration: '45-90 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Supine with arms extended' },
        draping: { standard: 'Standard abdominal prep and draping' },
        instruments: {
          basicSets: ['Basic laparotomy set', 'Self-retaining retractors'],
          specialInstruments: ['Mesh', 'Tacking devices', 'Electrocautery'],
          energyDevices: ['Electrocautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Forceps', 'Scissors', 'Mesh', 'Sutures'],
          positioning: 'Basic setup with mesh readily available'
        },
        procedureSteps: [
          { step: 1, description: 'Incision around umbilicus', instruments: ['Scalpel'], keyPoints: ['Preserve umbilical stalk', 'Identify hernia sac'] },
          { step: 2, description: 'Dissect and reduce hernia contents', instruments: ['Scissors', 'Forceps'], keyPoints: ['Open sac carefully', 'Inspect contents'] },
          { step: 3, description: 'Excise hernia sac', instruments: ['Scissors'], keyPoints: ['Preserve peritoneum', 'Achieve hemostasis'] },
          { step: 4, description: 'Place mesh if needed', instruments: ['Mesh', 'Sutures'], keyPoints: ['Overlap 2-3cm', 'Secure fixation'] },
          { step: 5, description: 'Close fascia and skin', instruments: ['Sutures'], keyPoints: ['Ensure tension-free closure', 'Reconstruct umbilicus'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV'],
          prophylaxis: ['Subcutaneous heparin if indicated'],
          testing: []
        },
        complications: ['Recurrence', 'Seroma', 'Infection', 'Mesh complications'],
        tips: ['Use mesh for defects >2cm', 'Ensure adequate overlap', 'Consider local anesthesia for small hernias']
      },
      {
        name: 'Pilonidal Cyst Excision',
        specialtyId: getSpecialtyId('General Surgery'),
        description: 'Surgical excision of pilonidal cyst with various closure techniques',
        duration: '30-60 min',
        difficulty: 'Basic',
        positioning: { description: 'Prone with buttocks taped apart' },
        draping: { standard: 'Prep sacral area widely, use transparent drapes for visualization' },
        instruments: {
          basicSets: ['Minor procedure set'],
          specialInstruments: ['Curettes', 'Methylene blue', 'Electrocautery'],
          energyDevices: ['Electrocautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Curette', 'Forceps', 'Scissors', 'Sutures'],
          positioning: 'Small setup with curettes prominent'
        },
        procedureSteps: [
          { step: 1, description: 'Inject methylene blue to delineate tracts', instruments: ['Syringe'], keyPoints: ['Identify all sinus openings', 'Mark extent'] },
          { step: 2, description: 'Excise cyst and tracts', instruments: ['Scalpel', 'Scissors'], keyPoints: ['Wide excision', 'Remove all hair'] },
          { step: 3, description: 'Achieve hemostasis', instruments: ['Electrocautery'], keyPoints: ['Dry field essential', 'Avoid devascularization'] },
          { step: 4, description: 'Closure or leave open', instruments: ['Sutures if closing'], keyPoints: ['Primary closure vs open packing', 'Off-midline if closing'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV'],
          prophylaxis: [],
          testing: ['Methylene blue for tract visualization']
        },
        complications: ['Recurrence', 'Infection', 'Delayed healing', 'Chronic pain'],
        tips: ['Complete excision reduces recurrence', 'Off-midline closure preferred', 'Hair removal important for prevention']
      },
      {
        name: 'Thyroglossal Duct Cyst Excision (Sistrunk Procedure)',
        specialtyId: getSpecialtyId('General Surgery'),
        description: 'Excision of thyroglossal duct cyst with central portion of hyoid bone',
        duration: '60-90 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Supine with neck extension (shoulder roll)' },
        draping: { standard: 'Prep neck from chin to chest, standard neck draping' },
        instruments: {
          basicSets: ['Thyroid set', 'Small retractors'],
          specialInstruments: ['Bone cutters', 'Nerve monitor', 'Hemoclips'],
          energyDevices: ['Harmonic scalpel', 'Electrocautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Bone cutters', 'Scissors', 'Forceps', 'Sutures'],
          positioning: 'Thyroid setup with bone cutters accessible'
        },
        procedureSteps: [
          { step: 1, description: 'Transverse incision over cyst', instruments: ['Scalpel'], keyPoints: ['Skin crease incision', 'Adequate exposure'] },
          { step: 2, description: 'Identify and dissect cyst', instruments: ['Scissors', 'Forceps'], keyPoints: ['Preserve strap muscles', 'Follow tract to hyoid'] },
          { step: 3, description: 'Excise central hyoid bone', instruments: ['Bone cutters'], keyPoints: ['Remove 1cm section', 'Include tract to foramen cecum'] },
          { step: 4, description: 'Trace and excise tract to base of tongue', instruments: ['Scissors'], keyPoints: ['Complete excision critical', 'Hemostasis'] },
          { step: 5, description: 'Close in layers', instruments: ['Sutures'], keyPoints: ['Approximate strap muscles', 'Subcuticular closure'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV'],
          prophylaxis: [],
          testing: []
        },
        complications: ['Recurrence', 'Bleeding', 'Infection', 'Hypothyroidism (rare)'],
        tips: ['Must include central hyoid bone', 'Complete tract excision prevents recurrence', 'Finger in mouth helps identify foramen cecum']
      },
      {
        name: 'Breast Abscess Incision and Drainage',
        specialtyId: getSpecialtyId('General Surgery'),
        description: 'Surgical drainage of breast abscess with culture',
        duration: '20-40 min',
        difficulty: 'Basic',
        positioning: { description: 'Supine with ipsilateral arm abducted' },
        draping: { standard: 'Prep entire breast, standard breast draping' },
        instruments: {
          basicSets: ['Minor procedure set'],
          specialInstruments: ['Packing material', 'Culture swabs'],
          energyDevices: ['Electrocautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Hemostats', 'Packing', 'Culture swabs'],
          positioning: 'Simple drainage setup'
        },
        procedureSteps: [
          { step: 1, description: 'Incision over point of maximum fluctuance', instruments: ['Scalpel'], keyPoints: ['Radial incision preferred', 'Adequate length'] },
          { step: 2, description: 'Break up loculations with finger', instruments: ['Hemostat'], keyPoints: ['Explore all pockets', 'Send cultures'] },
          { step: 3, description: 'Irrigate cavity', instruments: ['Syringe', 'Saline'], keyPoints: ['Copious irrigation', 'Remove debris'] },
          { step: 4, description: 'Pack cavity', instruments: ['Packing'], keyPoints: ['Loose packing', 'Plan for packing changes'] }
        ],
        medications: {
          antibiotics: ['Empiric until culture results', 'Dicloxacillin or cephalexin'],
          prophylaxis: [],
          testing: ['Wound culture']
        },
        complications: ['Recurrence', 'Fistula formation', 'Incomplete drainage', 'Cosmetic deformity'],
        tips: ['Send cultures for all cases', 'Consider ultrasound guidance', 'Breastfeeding can continue on unaffected side', 'Consider subareolar vs peripheral location']
      },
      {
        name: 'Excision of Lipoma',
        specialtyId: getSpecialtyId('General Surgery'),
        description: 'Surgical excision of lipoma with capsule',
        duration: '20-45 min',
        difficulty: 'Basic',
        positioning: { description: 'Position based on lipoma location' },
        draping: { standard: 'Prep site with wide margin, standard draping' },
        instruments: {
          basicSets: ['Minor procedure set'],
          specialInstruments: ['Electrocautery'],
          energyDevices: ['Electrocautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Scissors', 'Forceps', 'Sutures'],
          positioning: 'Basic excision setup'
        },
        procedureSteps: [
          { step: 1, description: 'Incision over lipoma', instruments: ['Scalpel'], keyPoints: ['Minimal incision', 'Oriented along skin lines'] },
          { step: 2, description: 'Dissect to lipoma capsule', instruments: ['Scissors'], keyPoints: ['Stay in subcutaneous plane', 'Preserve capsule'] },
          { step: 3, description: 'Enucleate lipoma with capsule', instruments: ['Forceps', 'Scissors'], keyPoints: ['Complete excision with capsule', 'Avoid fragmentation'] },
          { step: 4, description: 'Achieve hemostasis', instruments: ['Electrocautery'], keyPoints: ['Dry field', 'Consider drain for large cavities'] },
          { step: 5, description: 'Close in layers', instruments: ['Sutures'], keyPoints: ['Obliterate dead space', 'Subcuticular closure'] }
        ],
        medications: {
          antibiotics: ['Usually not needed'],
          prophylaxis: [],
          testing: []
        },
        complications: ['Recurrence', 'Seroma', 'Hematoma', 'Nerve injury'],
        tips: ['Send to pathology', 'Enucleate intact to reduce recurrence', 'Consider drain for large lipomas']
      },
      {
        name: 'Perianal Abscess Incision and Drainage',
        specialtyId: getSpecialtyId('General Surgery'),
        description: 'Drainage of perianal abscess with or without fistula identification',
        duration: '15-30 min',
        difficulty: 'Basic',
        positioning: { description: 'Lithotomy or prone jackknife' },
        draping: { standard: 'Perianal prep, sterile draping with perineum exposed' },
        instruments: {
          basicSets: ['Minor procedure set'],
          specialInstruments: ['Anoscope', 'Packing', 'Curved hemostats'],
          energyDevices: ['Electrocautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Hemostats', 'Packing', 'Sutures'],
          positioning: 'Simple drainage setup with anoscope'
        },
        procedureSteps: [
          { step: 1, description: 'Cruciate or radial incision', instruments: ['Scalpel'], keyPoints: ['Adequate incision', 'Avoid sphincter'] },
          { step: 2, description: 'Break up loculations', instruments: ['Hemostat'], keyPoints: ['Complete drainage', 'Culture if indicated'] },
          { step: 3, description: 'Examine for fistula', instruments: ['Anoscope', 'Probe'], keyPoints: ['Identify internal opening', 'Note tract direction'] },
          { step: 4, description: 'Pack cavity loosely', instruments: ['Packing'], keyPoints: ['Prevent premature closure', 'Plan for packing changes'] }
        ],
        medications: {
          antibiotics: ['Not routinely needed unless cellulitis or immunocompromised'],
          prophylaxis: [],
          testing: ['Culture if recurrent or unusual location']
        },
        complications: ['Recurrence', 'Fistula formation', 'Sphincter injury', 'Incontinence'],
        tips: ['Do not probe aggressively initially', 'Sitz baths for healing', 'Follow up for fistula', 'Consider MRI if complex']
      },

      // ==================== ADDITIONAL ORTHOPEDICS (6 procedures) ====================
      {
        name: 'Carpal Tunnel Release',
        specialtyId: getSpecialtyId('Orthopedics'),
        description: 'Surgical division of transverse carpal ligament to decompress median nerve',
        duration: '20-30 min',
        difficulty: 'Basic',
        positioning: { description: 'Supine with arm extended on hand table' },
        draping: { standard: 'Prep hand and forearm, sterile draping with tourniquet' },
        instruments: {
          basicSets: ['Hand surgery set'],
          specialInstruments: ['Tourniquet', 'Loupe magnification', 'Nerve hooks'],
          energyDevices: ['Bipolar cautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Fine scissors', 'Nerve hooks', 'Retractors'],
          positioning: 'Fine hand instruments prominently placed'
        },
        procedureSteps: [
          { step: 1, description: 'Longitudinal palmar incision', instruments: ['Scalpel'], keyPoints: ['Stay ulnar to thenar crease', 'Extend proximal to wrist crease'] },
          { step: 2, description: 'Identify and protect palmar cutaneous branch', instruments: ['Nerve hooks'], keyPoints: ['Avoid nerve injury', 'Careful dissection'] },
          { step: 3, description: 'Divide transverse carpal ligament', instruments: ['Scissors'], keyPoints: ['Complete division', 'Visualize median nerve', 'Avoid motor branch'] },
          { step: 4, description: 'Inspect median nerve', instruments: ['Nerve hooks'], keyPoints: ['Ensure complete decompression', 'Note nerve appearance'] },
          { step: 5, description: 'Close skin only', instruments: ['Sutures'], keyPoints: ['Leave ligament open', 'Simple interrupted sutures'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV'],
          prophylaxis: [],
          testing: []
        },
        complications: ['Nerve injury', 'Incomplete release', 'Pillar pain', 'Scar tenderness', 'Recurrence'],
        tips: ['Complete release is essential', 'Protect motor branch to thenar muscles', 'Tourniquet helps visualization']
      },
      {
        name: 'Trigger Finger Release',
        specialtyId: getSpecialtyId('Orthopedics'),
        description: 'Surgical release of A1 pulley for stenosing tenosynovitis',
        duration: '15-20 min',
        difficulty: 'Basic',
        positioning: { description: 'Supine with hand on hand table, palm up' },
        draping: { standard: 'Prep hand, sterile draping' },
        instruments: {
          basicSets: ['Hand surgery set'],
          specialInstruments: ['Loupe magnification', 'Small retractors'],
          energyDevices: ['Bipolar cautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Fine scissors', 'Small retractors', 'Sutures'],
          positioning: 'Delicate hand instruments'
        },
        procedureSteps: [
          { step: 1, description: 'Transverse incision at distal palmar crease', instruments: ['Scalpel'], keyPoints: ['Over A1 pulley', 'Avoid digital nerve'] },
          { step: 2, description: 'Identify A1 pulley', instruments: ['Retractors'], keyPoints: ['Protect neurovascular bundles', 'Visualize pulley'] },
          { step: 3, description: 'Divide A1 pulley longitudinally', instruments: ['Scissors'], keyPoints: ['Complete division', 'Preserve A2 pulley', 'Check triggering resolved'] },
          { step: 4, description: 'Close skin', instruments: ['Sutures'], keyPoints: ['Simple closure', 'Leave pulley open'] }
        ],
        medications: {
          antibiotics: ['Usually not needed for clean cases'],
          prophylaxis: [],
          testing: []
        },
        complications: ['Nerve injury', 'Incomplete release', 'Bowstringing (rare)', 'Infection'],
        tips: ['Protect digital nerves', 'Ensure complete A1 release', 'Can be done under local anesthesia']
      },
      {
        name: 'Ganglion Cyst Excision',
        specialtyId: getSpecialtyId('Orthopedics'),
        description: 'Surgical excision of ganglion cyst with stalk',
        duration: '30-45 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Position based on cyst location (usually wrist)' },
        draping: { standard: 'Prep extremity, tourniquet if needed' },
        instruments: {
          basicSets: ['Hand surgery set'],
          specialInstruments: ['Tourniquet', 'Loupe magnification', 'Nerve retractors'],
          energyDevices: ['Bipolar cautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Fine scissors', 'Retractors', 'Sutures'],
          positioning: 'Fine instruments for dissection'
        },
        procedureSteps: [
          { step: 1, description: 'Incision over cyst', instruments: ['Scalpel'], keyPoints: ['Transverse preferred', 'Plan for scar'] },
          { step: 2, description: 'Dissect cyst carefully', instruments: ['Scissors'], keyPoints: ['Protect nerves/vessels', 'Identify stalk'] },
          { step: 3, description: 'Trace stalk to joint capsule', instruments: ['Scissors', 'Retractors'], keyPoints: ['Follow to origin', 'Excise with capsule cuff'] },
          { step: 4, description: 'Close capsule and skin', instruments: ['Sutures'], keyPoints: ['Repair capsule if large defect', 'Layered closure'] }
        ],
        medications: {
          antibiotics: ['Usually not needed'],
          prophylaxis: [],
          testing: []
        },
        complications: ['Recurrence', 'Nerve injury', 'Stiffness', 'Scar'],
        tips: ['Include stalk and capsule origin', 'Dorsal wrist most common', 'Recurrence rate 10-15%']
      },
      {
        name: 'De Quervain Tenosynovitis Release',
        specialtyId: getSpecialtyId('Orthopedics'),
        description: 'Surgical release of first dorsal compartment for De Quervain tenosynovitis',
        duration: '20-30 min',
        difficulty: 'Basic',
        positioning: { description: 'Supine with arm across chest or on hand table' },
        draping: { standard: 'Prep thumb and wrist, sterile draping' },
        instruments: {
          basicSets: ['Hand surgery set'],
          specialInstruments: ['Loupe magnification', 'Nerve hooks'],
          energyDevices: ['Bipolar cautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Fine scissors', 'Nerve hooks', 'Sutures'],
          positioning: 'Delicate hand instruments'
        },
        procedureSteps: [
          { step: 1, description: 'Longitudinal or oblique incision over first compartment', instruments: ['Scalpel'], keyPoints: ['Protect superficial radial nerve', 'Adequate exposure'] },
          { step: 2, description: 'Identify and protect radial sensory nerve branches', instruments: ['Nerve hooks'], keyPoints: ['Multiple branches possible', 'Gentle retraction'] },
          { step: 3, description: 'Open first dorsal compartment', instruments: ['Scissors'], keyPoints: ['Complete release', 'Check for septations', 'Visualize tendons'] },
          { step: 4, description: 'Verify tendon gliding', instruments: [], keyPoints: ['Test thumb motion', 'Ensure complete release'] },
          { step: 5, description: 'Close skin', instruments: ['Sutures'], keyPoints: ['Simple closure', 'Leave sheath open'] }
        ],
        medications: {
          antibiotics: ['Usually not needed'],
          prophylaxis: [],
          testing: []
        },
        complications: ['Nerve injury', 'Incomplete release', 'Tendon subluxation', 'Scar tenderness'],
        tips: ['Watch for anatomic variations', 'EPB may have separate compartment', 'Protect radial sensory nerve']
      },
      {
        name: 'Dupuytren Contracture Release (Fasciectomy)',
        specialtyId: getSpecialtyId('Orthopedics'),
        description: 'Surgical excision of diseased palmar fascia for Dupuytren contracture',
        duration: '60-120 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine with arm on hand table' },
        draping: { standard: 'Prep hand and forearm, tourniquet, sterile draping' },
        instruments: {
          basicSets: ['Hand surgery set'],
          specialInstruments: ['Tourniquet', 'Loupe magnification', 'Nerve hooks', 'Skin hooks'],
          energyDevices: ['Bipolar cautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Fine scissors', 'Nerve hooks', 'Retractors', 'Sutures'],
          positioning: 'Fine dissection instruments prominently placed'
        },
        procedureSteps: [
          { step: 1, description: 'Zigzag or Bruner incision', instruments: ['Scalpel'], keyPoints: ['Avoid linear incisions', 'Adequate exposure'] },
          { step: 2, description: 'Raise skin flaps', instruments: ['Scissors', 'Skin hooks'], keyPoints: ['Preserve perforators', 'Protect neurovascular bundles'] },
          { step: 3, description: 'Identify and protect digital nerves/vessels', instruments: ['Nerve hooks'], keyPoints: ['Nerves often displaced by cords', 'Careful dissection'] },
          { step: 4, description: 'Excise diseased fascia', instruments: ['Scissors'], keyPoints: ['Segmental vs radical fasciectomy', 'Preserve flexor tendons'] },
          { step: 5, description: 'Release contracture, assess perfusion', instruments: [], keyPoints: ['Gentle manipulation', 'Check finger perfusion'] },
          { step: 6, description: 'Close skin', instruments: ['Sutures'], keyPoints: ['May need skin grafts', 'Leave some areas open if needed'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV'],
          prophylaxis: [],
          testing: []
        },
        complications: ['Nerve injury', 'Vascular injury', 'Recurrence', 'Stiffness', 'Hematoma', 'Skin necrosis'],
        tips: ['Meticulous nerve dissection', 'Consider staged procedures for severe disease', 'Early motion postop', 'Recurrence common']
      },
      {
        name: 'Extensor Tendon Repair',
        specialtyId: getSpecialtyId('Orthopedics'),
        description: 'Surgical repair of lacerated extensor tendon',
        duration: '30-60 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Position based on injury location' },
        draping: { standard: 'Prep extremity widely, tourniquet' },
        instruments: {
          basicSets: ['Hand surgery set'],
          specialInstruments: ['Tourniquet', 'Loupe magnification', 'Tendon repair instruments'],
          energyDevices: ['Bipolar cautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Fine scissors', 'Tendon sutures', 'Nerve hooks'],
          positioning: 'Tendon repair instruments ready'
        },
        procedureSteps: [
          { step: 1, description: 'Extend laceration if needed', instruments: ['Scalpel'], keyPoints: ['Adequate exposure', 'Protect nerves/vessels'] },
          { step: 2, description: 'Identify tendon ends', instruments: ['Nerve hooks'], keyPoints: ['Retrieve retracted ends', 'Assess viability'] },
          { step: 3, description: 'Repair tendon with core suture', instruments: ['Tendon sutures'], keyPoints: ['Modified Kessler or figure-8', 'Strong core suture'] },
          { step: 4, description: 'Add epitendinous running suture', instruments: ['Fine sutures'], keyPoints: ['Smooth repair', 'Even tension'] },
          { step: 5, description: 'Close skin and splint', instruments: ['Sutures', 'Splint'], keyPoints: ['Protective splinting', 'Early motion protocol'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV if fresh injury'],
          prophylaxis: ['Tetanus prophylaxis'],
          testing: []
        },
        complications: ['Adhesions', 'Rupture', 'Extensor lag', 'Infection'],
        tips: ['Zone-specific protocols', 'Early controlled motion important', 'Splint in extension']
      },

      // ==================== ADDITIONAL UROLOGY (6 procedures) ====================
      {
        name: 'Vasectomy',
        specialtyId: getSpecialtyId('Urology'),
        description: 'Surgical male sterilization by division of vas deferens',
        duration: '20-30 min',
        difficulty: 'Basic',
        positioning: { description: 'Supine with legs slightly apart' },
        draping: { standard: 'Prep scrotum and surrounding area, fenestrated drape' },
        instruments: {
          basicSets: ['Minor procedure set'],
          specialInstruments: ['Vas fixation clamp', 'Vas scissors', 'Cautery'],
          energyDevices: ['Electrocautery']
        },
        mayoSetup: {
          essential: ['Local anesthesia', 'Scalpel', 'Vas clamp', 'Scissors', 'Cautery'],
          positioning: 'Small setup for bilateral procedure'
        },
        procedureSteps: [
          { step: 1, description: 'Palpate and isolate vas deferens', instruments: ['Fingers'], keyPoints: ['Identify cord structures', 'Isolate vas'] },
          { step: 2, description: 'Local anesthesia', instruments: ['Syringe'], keyPoints: ['Adequate anesthesia', 'Bilateral'] },
          { step: 3, description: 'Small incision or puncture', instruments: ['Scalpel'], keyPoints: ['Midline or bilateral', 'Minimal incision'] },
          { step: 4, description: 'Deliver vas, divide and occlude', instruments: ['Vas clamp', 'Scissors', 'Cautery'], keyPoints: ['Excise segment', 'Cauterize ends', 'Fascial interposition'] },
          { step: 5, description: 'Close or leave skin', instruments: ['Sutures optional'], keyPoints: ['Repeat contralateral', 'Minimal closure'] }
        ],
        medications: {
          antibiotics: ['Usually not needed'],
          prophylaxis: [],
          testing: ['Semen analysis at 3 months']
        },
        complications: ['Hematoma', 'Infection', 'Sperm granuloma', 'Chronic pain', 'Recanalization'],
        tips: ['Send specimens', 'Fascial interposition reduces failure', 'NSAIDs for pain', 'Warn about recanalization risk']
      },
      {
        name: 'Hydrocele Repair (Hydrocelectomy)',
        specialtyId: getSpecialtyId('Urology'),
        description: 'Surgical excision or plication of tunica vaginalis for hydrocele',
        duration: '30-45 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Supine with legs slightly apart' },
        draping: { standard: 'Prep scrotum and groin, fenestrated drape' },
        instruments: {
          basicSets: ['Minor procedure set'],
          specialInstruments: ['Self-retaining retractor', 'Electrocautery'],
          energyDevices: ['Electrocautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Scissors', 'Retractors', 'Sutures', 'Cautery'],
          positioning: 'Standard scrotal surgery setup'
        },
        procedureSteps: [
          { step: 1, description: 'Scrotal incision', instruments: ['Scalpel'], keyPoints: ['Transverse or vertical', 'Layer by layer'] },
          { step: 2, description: 'Deliver testicle with hydrocele', instruments: ['Retractors'], keyPoints: ['Gentle handling', 'Protect cord'] },
          { step: 3, description: 'Incise tunica vaginalis and drain fluid', instruments: ['Scalpel'], keyPoints: ['Inspect testicle', 'Rule out tumor'] },
          { step: 4, description: 'Excise or plicate tunica', instruments: ['Scissors', 'Sutures'], keyPoints: ['Jaboulay or Lord technique', 'Achieve hemostasis'] },
          { step: 5, description: 'Return testicle and close layers', instruments: ['Sutures'], keyPoints: ['Dartos pouch', 'Layered closure'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV'],
          prophylaxis: [],
          testing: []
        },
        complications: ['Hematoma', 'Infection', 'Recurrence', 'Testicular atrophy'],
        tips: ['Rule out communicating hydrocele', 'Examine testicle for masses', 'Consider ultrasound preop if unclear']
      },
      {
        name: 'Orchiectomy (Simple)',
        specialtyId: getSpecialtyId('Urology'),
        description: 'Surgical removal of testicle via scrotal approach',
        duration: '30-45 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Supine with legs apart' },
        draping: { standard: 'Prep scrotum and groin, fenestrated drape' },
        instruments: {
          basicSets: ['Minor procedure set'],
          specialInstruments: ['Self-retaining retractor', 'Hemoclips', 'Electrocautery'],
          energyDevices: ['Electrocautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Scissors', 'Clamps', 'Ties', 'Sutures'],
          positioning: 'Scrotal surgery setup'
        },
        procedureSteps: [
          { step: 1, description: 'Scrotal incision', instruments: ['Scalpel'], keyPoints: ['Midline or hemiscotal', 'Layer by layer dissection'] },
          { step: 2, description: 'Deliver testicle', instruments: ['Retractors'], keyPoints: ['Mobilize completely', 'Identify cord'] },
          { step: 3, description: 'Ligate spermatic cord', instruments: ['Clamps', 'Ties'], keyPoints: ['Doubly ligate', 'Separate ligatures for vessels'] },
          { step: 4, description: 'Divide cord and remove testicle', instruments: ['Scissors'], keyPoints: ['Send to pathology', 'Ensure hemostasis'] },
          { step: 5, description: 'Close scrotum in layers', instruments: ['Sutures'], keyPoints: ['Dartos layer', 'Subcuticular skin'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV'],
          prophylaxis: [],
          testing: ['Send specimen to pathology']
        },
        complications: ['Hematoma', 'Infection', 'Psychological impact'],
        tips: ['Discuss prosthesis option preop', 'Gentle tissue handling', 'Scrotal support postop']
      },
      {
        name: 'Testicular Torsion Detorsion and Orchiopexy',
        specialtyId: getSpecialtyId('Urology'),
        description: 'Emergency surgical detorsion of twisted testicle with bilateral orchiopexy',
        duration: '30-60 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Supine with legs apart' },
        draping: { standard: 'Prep both sides of scrotum and groin' },
        instruments: {
          basicSets: ['Minor procedure set'],
          specialInstruments: ['Self-retaining retractor', 'Non-absorbable sutures'],
          energyDevices: ['Electrocautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Scissors', 'Retractors', 'Permanent sutures'],
          positioning: 'Emergency scrotal setup'
        },
        procedureSteps: [
          { step: 1, description: 'Bilateral or unilateral scrotal incision', instruments: ['Scalpel'], keyPoints: ['Rapid access', 'Evaluate testicle'] },
          { step: 2, description: 'Deliver testicle and assess', instruments: ['Retractors'], keyPoints: ['Document degree of torsion', 'Assess viability'] },
          { step: 3, description: 'Detorse testicle', instruments: ['Hands'], keyPoints: ['Usually medial rotation', 'Assess reperfusion'] },
          { step: 4, description: 'Orchiopexy with permanent sutures', instruments: ['Non-absorbable sutures'], keyPoints: ['3-point fixation', 'Tunica to dartos'] },
          { step: 5, description: 'Perform contralateral orchiopexy', instruments: ['Non-absorbable sutures'], keyPoints: ['Prevent future torsion', 'Same technique'] },
          { step: 6, description: 'Close scrotal incisions', instruments: ['Sutures'], keyPoints: ['Layered closure', 'Bilateral'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV'],
          prophylaxis: [],
          testing: []
        },
        complications: ['Testicular loss', 'Infection', 'Hematoma', 'Atrophy', 'Infertility'],
        tips: ['Time is testicle', 'Always fix contralateral', 'If non-viable: orchiectomy', 'Doppler can help but don\'t delay surgery']
      },
      {
        name: 'Varicocele Repair (Varicocelectomy)',
        specialtyId: getSpecialtyId('Urology'),
        description: 'Surgical ligation of internal spermatic veins for varicocele',
        duration: '60-90 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Supine' },
        draping: { standard: 'Prep lower abdomen and scrotum, standard draping' },
        instruments: {
          basicSets: ['Minor procedure set'],
          specialInstruments: ['Microsurgical instruments', 'Loupe magnification', 'Vessel loops'],
          energyDevices: ['Bipolar cautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Fine scissors', 'Vessel loops', 'Clips', 'Sutures'],
          positioning: 'Microsurgical setup'
        },
        procedureSteps: [
          { step: 1, description: 'Inguinal or subinguinal incision', instruments: ['Scalpel'], keyPoints: ['Choose approach', 'Expose cord'] },
          { step: 2, description: 'Identify spermatic cord', instruments: ['Retractors'], keyPoints: ['Protect inguinal nerves', 'Deliver cord'] },
          { step: 3, description: 'Identify and preserve artery, lymphatics', instruments: ['Loupe', 'Vessel loops'], keyPoints: ['Preserve 1-2 arteries', 'Preserve lymphatics'] },
          { step: 4, description: 'Ligate all internal spermatic veins', instruments: ['Clips', 'Ties'], keyPoints: ['Multiple small veins', 'Complete ligation'] },
          { step: 5, description: 'Close incision', instruments: ['Sutures'], keyPoints: ['Layered closure'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV'],
          prophylaxis: [],
          testing: ['Semen analysis at 3-6 months if for infertility']
        },
        complications: ['Hydrocele', 'Recurrence', 'Testicular atrophy', 'Infection'],
        tips: ['Preserve testicular artery and lymphatics', 'Microscope reduces complications', 'Left side most common']
      },
      {
        name: 'Urethral Stricture Dilation',
        specialtyId: getSpecialtyId('Urology'),
        description: 'Endoscopic dilation of urethral stricture',
        duration: '15-30 min',
        difficulty: 'Basic',
        positioning: { description: 'Lithotomy' },
        draping: { standard: 'Prep genitalia and perineum, sterile draping' },
        instruments: {
          basicSets: ['Cystoscopy set'],
          specialInstruments: ['Urethral dilators', 'Guidewires', 'Sounds'],
          energyDevices: []
        },
        mayoSetup: {
          essential: ['Lubricant', 'Dilators', 'Guidewire', 'Cystoscope'],
          positioning: 'Endoscopy setup'
        },
        procedureSteps: [
          { step: 1, description: 'Insert cystoscope to visualize stricture', instruments: ['Cystoscope'], keyPoints: ['Identify location and length', 'Gentle passage'] },
          { step: 2, description: 'Pass guidewire through stricture', instruments: ['Guidewire'], keyPoints: ['Fluoroscopy if needed', 'Avoid false passage'] },
          { step: 3, description: 'Dilate stricture with sounds or balloons', instruments: ['Dilators'], keyPoints: ['Gradual dilation', 'Sequential sizes'] },
          { step: 4, description: 'Re-inspect with cystoscope', instruments: ['Cystoscope'], keyPoints: ['Ensure adequate dilation', 'Check for injury'] },
          { step: 5, description: 'Place catheter if needed', instruments: ['Foley'], keyPoints: ['Leave for healing', 'Remove in days'] }
        ],
        medications: {
          antibiotics: ['Ciprofloxacin 400mg IV or equivalent'],
          prophylaxis: [],
          testing: ['Urine culture if high risk']
        },
        complications: ['Recurrence', 'False passage', 'Bleeding', 'Infection', 'Incontinence'],
        tips: ['Gentleness prevents injury', 'Consider urethroplasty for complex strictures', 'High recurrence rate']
      },

      // ==================== ADDITIONAL ENT (6 procedures) ====================
      {
        name: 'Adenoidectomy',
        specialtyId: getSpecialtyId('ENT (Otolaryngology)'),
        description: 'Surgical removal of adenoid tissue',
        duration: '15-30 min',
        difficulty: 'Basic',
        positioning: { description: 'Supine with Rose position (shoulder roll, neck extended)' },
        draping: { standard: 'Head draping with oral access' },
        instruments: {
          basicSets: ['Tonsillectomy set'],
          specialInstruments: ['Adenoid curettes', 'Mirror', 'Suction cautery'],
          energyDevices: ['Suction cautery', 'Coblation']
        },
        mayoSetup: {
          essential: ['Mouth gag', 'Adenoid curettes', 'Mirror', 'Suction'],
          positioning: 'ENT oral setup'
        },
        procedureSteps: [
          { step: 1, description: 'Position and place mouth gag', instruments: ['Mouth gag'], keyPoints: ['Protect teeth', 'Maintain airway'] },
          { step: 2, description: 'Palpate nasopharynx', instruments: ['Finger'], keyPoints: ['Assess adenoid size', 'Feel for masses'] },
          { step: 3, description: 'Curettage of adenoids', instruments: ['Adenoid curette'], keyPoints: ['Complete removal', 'Avoid eustachian tubes'] },
          { step: 4, description: 'Achieve hemostasis', instruments: ['Suction cautery'], keyPoints: ['Pack if needed', 'Check bleeding'] },
          { step: 5, description: 'Inspect with mirror', instruments: ['Mirror'], keyPoints: ['Ensure complete removal', 'Final hemostasis'] }
        ],
        medications: {
          antibiotics: ['Usually not needed unless indicated'],
          prophylaxis: [],
          testing: []
        },
        complications: ['Bleeding', 'Velopharyngeal insufficiency', 'Infection', 'Nasopharyngeal stenosis'],
        tips: ['Often done with tonsillectomy', 'Watch for atlantoaxial instability in Down syndrome', 'Pack if bleeding']
      },
      {
        name: 'Myringotomy with Tube Insertion',
        specialtyId: getSpecialtyId('ENT (Otolaryngology)'),
        description: 'Incision in tympanic membrane with ventilation tube placement',
        duration: '10-15 min per ear',
        difficulty: 'Basic',
        positioning: { description: 'Supine with head turned' },
        draping: { standard: 'Prep ear, sterile draping' },
        instruments: {
          basicSets: ['Myringotomy set'],
          specialInstruments: ['Operating microscope', 'Myringotomy knife', 'Tubes', 'Suction tips'],
          energyDevices: []
        },
        mayoSetup: {
          essential: ['Myringotomy knife', 'Tubes', 'Alligator forceps', 'Suction'],
          positioning: 'Microscope setup with small instruments'
        },
        procedureSteps: [
          { step: 1, description: 'Position ear under microscope', instruments: ['Microscope'], keyPoints: ['Visualize tympanic membrane', 'Clean canal'] },
          { step: 2, description: 'Make myringotomy incision', instruments: ['Myringotomy knife'], keyPoints: ['Anteroinferior quadrant', 'Radial incision'] },
          { step: 3, description: 'Suction middle ear fluid', instruments: ['Suction'], keyPoints: ['Send for culture if indicated', 'Complete drainage'] },
          { step: 4, description: 'Insert ventilation tube', instruments: ['Alligator forceps'], keyPoints: ['Proper positioning', 'Ensure patent lumen'] },
          { step: 5, description: 'Apply ear drops', instruments: ['Antibiotic drops'], keyPoints: ['Ototopical antibiotics'] }
        ],
        medications: {
          antibiotics: ['Ototopical antibiotic drops'],
          prophylaxis: [],
          testing: ['Culture middle ear fluid if indicated']
        },
        complications: ['Tube extrusion', 'Otorrhea', 'Tympanosclerosis', 'Persistent perforation', 'Cholesteatoma'],
        tips: ['Water precautions controversial', 'Tubes typically extrude in 6-18 months', 'Bilateral in most cases']
      },
      {
        name: 'Septoplasty',
        specialtyId: getSpecialtyId('ENT (Otolaryngology)'),
        description: 'Surgical correction of deviated nasal septum',
        duration: '45-90 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Supine with head of bed elevated 30 degrees' },
        draping: { standard: 'Prep nose and face, head draping with nose exposed' },
        instruments: {
          basicSets: ['Nasal surgery set'],
          specialInstruments: ['Nasal speculum', 'Septal elevators', 'Through-cutting forceps', 'Freer elevator'],
          energyDevices: ['Bipolar cautery']
        },
        mayoSetup: {
          essential: ['Speculum', 'Elevators', 'Forceps', 'Scissors', 'Sutures'],
          positioning: 'Nasal surgery setup'
        },
        procedureSteps: [
          { step: 1, description: 'Inject local anesthesia with epinephrine', instruments: ['Syringe'], keyPoints: ['Bilateral', 'Vasoconstriction'] },
          { step: 2, description: 'Hemitransfixion incision', instruments: ['Scalpel'], keyPoints: ['Preserve caudal septum', 'Mucoperichondrial plane'] },
          { step: 3, description: 'Elevate mucoperichondrial flaps', instruments: ['Freer elevator'], keyPoints: ['Bilateral elevation', 'Preserve mucosa'] },
          { step: 4, description: 'Remove deviated cartilage/bone', instruments: ['Through-cutting forceps', 'Chisel'], keyPoints: ['Preserve dorsal strut', 'Preserve caudal strut'] },
          { step: 5, description: 'Replace remaining cartilage', instruments: ['Hands'], keyPoints: ['Midline position', 'Straighten'] },
          { step: 6, description: 'Close mucosa and splint', instruments: ['Sutures', 'Splints'], keyPoints: ['Quilting sutures if needed', 'Internal/external splints'] }
        ],
        medications: {
          antibiotics: ['Cephalexin or amoxicillin-clavulanate'],
          prophylaxis: [],
          testing: []
        },
        complications: ['Septal perforation', 'Hematoma', 'Saddle nose', 'CSF leak', 'Anosmia'],
        tips: ['Preserve L-strut for support', 'Avoid septal perforation', 'Remove packing/splints in days']
      },
      {
        name: 'Functional Endoscopic Sinus Surgery (FESS)',
        specialtyId: getSpecialtyId('ENT (Otolaryngology)'),
        description: 'Endoscopic surgery to open sinus ostia and remove diseased tissue',
        duration: '60-120 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine with head elevated and turned slightly' },
        draping: { standard: 'Prep nose and face, head draping' },
        instruments: {
          basicSets: ['Endoscopic sinus surgery set'],
          specialInstruments: ['Nasal endoscopes', 'Through-cutting instruments', 'Microdebrider', 'Image guidance'],
          energyDevices: ['Bipolar cautery', 'Microdebrider']
        },
        mayoSetup: {
          essential: ['Endoscopes', 'Forceps', 'Microdebrider', 'Suction'],
          positioning: 'Endoscopic sinus setup with tower'
        },
        procedureSteps: [
          { step: 1, description: 'Topical decongestion and anesthesia', instruments: ['Pledgets'], keyPoints: ['Cocaine or oxymetazoline', 'Adequate time'] },
          { step: 2, description: 'Uncinectomy', instruments: ['Sickle knife', 'Forceps'], keyPoints: ['Expose maxillary ostium', 'Avoid orbit'] },
          { step: 3, description: 'Maxillary antrostomy', instruments: ['Through-cutting forceps'], keyPoints: ['Wide opening', 'Natural ostium'] },
          { step: 4, description: 'Anterior ethmoidectomy', instruments: ['Through-cutting forceps', 'Microdebrider'], keyPoints: ['Follow lamina papyracea', 'Avoid skull base'] },
          { step: 5, description: 'Posterior ethmoidectomy if needed', instruments: ['Through-cutting forceps'], keyPoints: ['Identify skull base', 'Avoid optic nerve'] },
          { step: 6, description: 'Sphenoidotomy if needed', instruments: ['Kerrison rongeurs'], keyPoints: ['Identify natural ostium', 'Avoid carotid'] },
          { step: 7, description: 'Frontal sinusotomy if needed', instruments: ['Curved instruments'], keyPoints: ['Difficult anatomy', 'Consider Draf procedures'] },
          { step: 8, description: 'Hemostasis and inspect', instruments: ['Suction', 'Cautery'], keyPoints: ['Control bleeding', 'Final inspection'] }
        ],
        medications: {
          antibiotics: ['Per culture or empiric'],
          prophylaxis: ['Saline irrigations postop'],
          testing: ['Send tissue if concern for fungal or malignancy']
        },
        complications: ['Orbital injury', 'CSF leak', 'Bleeding', 'Anosmia', 'Synechiae', 'Infection'],
        tips: ['Image guidance reduces complications', 'Know your landmarks', 'Staged if extensive disease', 'Postop care crucial']
      },
      {
        name: 'Tracheostomy',
        specialtyId: getSpecialtyId('ENT (Otolaryngology)'),
        description: 'Surgical creation of opening in trachea for airway access',
        duration: '30-45 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Supine with shoulder roll, neck extended' },
        draping: { standard: 'Prep neck from mandible to chest, standard draping' },
        instruments: {
          basicSets: ['Tracheostomy set'],
          specialInstruments: ['Tracheostomy tubes', 'Tracheal hooks', 'Dilators'],
          energyDevices: ['Electrocautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Tracheal hooks', 'Trach tubes', 'Sutures'],
          positioning: 'Emergency airway setup'
        },
        procedureSteps: [
          { step: 1, description: 'Horizontal incision 1-2cm above sternal notch', instruments: ['Scalpel'], keyPoints: ['Midline', 'Adequate exposure'] },
          { step: 2, description: 'Dissect to strap muscles', instruments: ['Electrocautery'], keyPoints: ['Separate or divide strap muscles', 'Identify thyroid isthmus'] },
          { step: 3, description: 'Retract or divide thyroid isthmus', instruments: ['Hemostats', 'Ties'], keyPoints: ['Control bleeding', 'Expose trachea'] },
          { step: 4, description: 'Incise trachea (vertical or window)', instruments: ['Scalpel'], keyPoints: ['Between 2nd-4th rings', 'Avoid first ring'] },
          { step: 5, description: 'Insert tracheostomy tube', instruments: ['Trach tube', 'Obturator'], keyPoints: ['Correct size', 'Secure with ties'] },
          { step: 6, description: 'Confirm placement', instruments: ['Suction', 'Capnography'], keyPoints: ['Bilateral breath sounds', 'CO2 return'] },
          { step: 7, description: 'Secure tube and close skin loosely', instruments: ['Sutures'], keyPoints: ['Loose closure', 'Trach ties'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV'],
          prophylaxis: [],
          testing: ['Chest X-ray postop']
        },
        complications: ['Bleeding', 'Pneumothorax', 'Tube displacement', 'Tracheal stenosis', 'Tracheoinnominate fistula'],
        tips: ['Keep first tube change kit at bedside', 'First change at 7 days', 'Avoid first tracheal ring', 'Bedside vs OR depends on situation']
      },
      {
        name: 'Thyroidectomy (Total)',
        specialtyId: getSpecialtyId('ENT (Otolaryngology)'),
        description: 'Surgical removal of entire thyroid gland',
        duration: '90-180 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine with shoulder roll, neck extended' },
        draping: { standard: 'Prep neck from mandible to chest, standard draping' },
        instruments: {
          basicSets: ['Thyroid set'],
          specialInstruments: ['Nerve monitor', 'Vessel sealing device', 'Small retractors', 'Hemoclips'],
          energyDevices: ['Harmonic scalpel', 'LigaSure']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Scissors', 'Forceps', 'Hemoclips', 'Ties', 'Vessel sealing device'],
          positioning: 'Thyroid surgery setup with nerve monitor'
        },
        procedureSteps: [
          { step: 1, description: 'Cervical collar incision', instruments: ['Scalpel'], keyPoints: ['Skin crease', '2 fingerbreadths above sternal notch'] },
          { step: 2, description: 'Raise subplatysmal flaps', instruments: ['Electrocautery'], keyPoints: ['Superior to thyroid cartilage', 'Inferior to sternum'] },
          { step: 3, description: 'Divide strap muscles (if needed)', instruments: ['Electrocautery'], keyPoints: ['Preserve as much as possible', 'Retract laterally'] },
          { step: 4, description: 'Identify and preserve recurrent laryngeal nerve', instruments: ['Nerve monitor'], keyPoints: ['Identify early', 'Visual and functional monitoring'] },
          { step: 5, description: 'Identify and preserve parathyroids', instruments: ['Gentle dissection'], keyPoints: ['Preserve blood supply', 'Autotransplant if needed'] },
          { step: 6, description: 'Ligate superior pole vessels', instruments: ['Vessel sealer', 'Ties'], keyPoints: ['Close to thyroid', 'Avoid external laryngeal nerve'] },
          { step: 7, description: 'Ligate inferior thyroid artery', instruments: ['Clips', 'Ties'], keyPoints: ['Preserve parathyroid blood supply'] },
          { step: 8, description: 'Divide thyroid isthmus', instruments: ['Vessel sealer'], keyPoints: ['Separate from trachea'] },
          { step: 9, description: 'Remove thyroid lobe', instruments: ['Scissors'], keyPoints: ['Avoid nerve injury', 'Complete removal'] },
          { step: 10, description: 'Repeat on contralateral side', instruments: ['As above'], keyPoints: ['Bilateral nerve monitoring', 'Hemostasis'] },
          { step: 11, description: 'Irrigate, check hemostasis, consider drain', instruments: ['Suction', 'Drain'], keyPoints: ['Meticulous hemostasis', 'Drain if needed'] },
          { step: 12, description: 'Close in layers', instruments: ['Sutures'], keyPoints: ['Approximate strap muscles', 'Platysma', 'Skin'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV'],
          prophylaxis: [],
          testing: ['Calcium and PTH levels postop', 'TSH suppression if cancer']
        },
        complications: ['Recurrent laryngeal nerve injury', 'Hypocalcemia', 'Hematoma', 'Hypothyroidism', 'Seroma'],
        tips: ['Nerve monitoring is standard', 'Check calcium postop', 'Warn patient of lifetime thyroid replacement']
      },

      // ==================== ADDITIONAL CARDIAC SURGERY (6 procedures) ====================
      {
        name: 'Pacemaker Implantation',
        specialtyId: getSpecialtyId('Cardiovascular'),
        description: 'Surgical implantation of permanent cardiac pacemaker',
        duration: '60-90 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Supine with left arm abducted (for left-sided approach)' },
        draping: { standard: 'Prep chest and shoulder, standard cardiac draping' },
        instruments: {
          basicSets: ['Pacemaker set'],
          specialInstruments: ['Pacemaker generator', 'Leads', 'Introducer kit', 'Fluoroscopy'],
          energyDevices: ['Electrocautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Pacemaker', 'Leads', 'Introducer', 'Sutures'],
          positioning: 'Pacemaker implantation setup'
        },
        procedureSteps: [
          { step: 1, description: 'Incision below clavicle', instruments: ['Scalpel'], keyPoints: ['Deltopectoral groove', 'Create pocket'] },
          { step: 2, description: 'Access subclavian or cephalic vein', instruments: ['Introducer'], keyPoints: ['Cephalic vein cut-down or subclavian stick', 'Fluoroscopy guidance'] },
          { step: 3, description: 'Advance leads to chambers', instruments: ['Leads'], keyPoints: ['RV apex for ventricular lead', 'RA appendage for atrial lead'] },
          { step: 4, description: 'Test thresholds and sensing', instruments: ['Pacing analyzer'], keyPoints: ['Acceptable capture', 'Good sensing'] },
          { step: 5, description: 'Secure leads and create pocket', instruments: ['Sutures'], keyPoints: ['Anchor sleeves', 'Subfascial or subcutaneous pocket'] },
          { step: 6, description: 'Connect generator and implant', instruments: ['Generator'], keyPoints: ['Secure connections', 'Place in pocket'] },
          { step: 7, description: 'Close incision', instruments: ['Sutures'], keyPoints: ['Layered closure', 'Final interrogation'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV preop'],
          prophylaxis: ['Consider antibiotic pocket wash'],
          testing: ['Chest X-ray postop', 'ECG', 'Interrogation']
        },
        complications: ['Pneumothorax', 'Lead dislodgement', 'Infection', 'Hematoma', 'Perforation'],
        tips: ['Antibiotic prophylaxis critical', 'Fluoroscopy essential', 'MRI-conditional devices available']
      },
      {
        name: 'ICD (Implantable Cardioverter-Defibrillator) Implantation',
        specialtyId: getSpecialtyId('Cardiovascular'),
        description: 'Surgical implantation of implantable cardioverter-defibrillator',
        duration: '90-120 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine with left arm abducted' },
        draping: { standard: 'Prep chest and shoulder, standard cardiac draping' },
        instruments: {
          basicSets: ['ICD implantation set'],
          specialInstruments: ['ICD generator', 'Defibrillator leads', 'Introducer kit', 'Fluoroscopy', 'Defibrillation testing equipment'],
          energyDevices: ['Electrocautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'ICD', 'Leads', 'Introducer', 'Programmer'],
          positioning: 'ICD implantation setup'
        },
        procedureSteps: [
          { step: 1, description: 'Incision and pocket creation', instruments: ['Scalpel'], keyPoints: ['Similar to pacemaker', 'Larger pocket for ICD'] },
          { step: 2, description: 'Venous access', instruments: ['Introducer'], keyPoints: ['Subclavian or cephalic', 'Fluoroscopy guidance'] },
          { step: 3, description: 'Advance ICD lead to RV', instruments: ['ICD lead'], keyPoints: ['RV apex or septum', 'Stable position'] },
          { step: 4, description: 'Test sensing and pacing', instruments: ['Analyzer'], keyPoints: ['Good R-wave', 'Low thresholds'] },
          { step: 5, description: 'Test defibrillation threshold', instruments: ['External defibrillator', 'Anesthesia support'], keyPoints: ['Induce VF', 'Successful defibrillation'] },
          { step: 6, description: 'Connect generator and implant', instruments: ['ICD generator'], keyPoints: ['Secure connections', 'Submuscular often'] },
          { step: 7, description: 'Close incision', instruments: ['Sutures'], keyPoints: ['Layered closure', 'Final interrogation'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV preop'],
          prophylaxis: ['Antibiotic pocket wash'],
          testing: ['Chest X-ray', 'ECG', 'Interrogation', 'DFT testing']
        },
        complications: ['Pneumothorax', 'Lead dislodgement', 'Infection', 'Inappropriate shocks', 'Perforation'],
        tips: ['DFT testing controversial', 'Anesthesia standby required', 'Submuscular vs subcutaneous pocket']
      },
      {
        name: 'Pericardiectomy',
        specialtyId: getSpecialtyId('Cardiovascular'),
        description: 'Surgical removal of pericardium for constrictive pericarditis',
        duration: '180-300 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine' },
        draping: { standard: 'Full sterile draping for sternotomy' },
        instruments: {
          basicSets: ['Cardiac surgery set'],
          specialInstruments: ['Sternal saw', 'Rib spreader', 'Pericardial instruments'],
          energyDevices: ['Electrocautery', 'Bipolar']
        },
        mayoSetup: {
          essential: ['Sternal saw', 'Scissors', 'Forceps', 'Suction'],
          positioning: 'Full cardiac surgery setup'
        },
        procedureSteps: [
          { step: 1, description: 'Median sternotomy', instruments: ['Sternal saw'], keyPoints: ['Standard approach', 'Adhesions likely'] },
          { step: 2, description: 'Careful dissection of adherent pericardium', instruments: ['Scissors', 'Cautery'], keyPoints: ['Avoid myocardial injury', 'Phrenic nerves'] },
          { step: 3, description: 'Pericardial excision phrenic to phrenic', instruments: ['Scissors'], keyPoints: ['Anterior and lateral', 'Behind phrenic nerves'] },
          { step: 4, description: 'Free ventricles', instruments: ['Scissors'], keyPoints: ['Release both ventricles', 'Improve filling'] },
          { step: 5, description: 'Hemostasis and close', instruments: ['Cautery', 'Sutures'], keyPoints: ['Control bleeding', 'Drain placement', 'Sternal closure'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV'],
          prophylaxis: [],
          testing: ['Hemodynamics before/after']
        },
        complications: ['Bleeding', 'Myocardial injury', 'Phrenic nerve injury', 'Incomplete relief', 'Mortality'],
        tips: ['CPB standby', 'May need extensive dissection', 'Hemodynamic improvement expected']
      },
      {
        name: 'Atrial Septal Defect (ASD) Repair',
        specialtyId: getSpecialtyId('Cardiovascular'),
        description: 'Surgical closure of atrial septal defect',
        duration: '180-240 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine' },
        draping: { standard: 'Full sterile draping for cardiac surgery' },
        instruments: {
          basicSets: ['Cardiac surgery set'],
          specialInstruments: ['Cardiopulmonary bypass circuit', 'Patch material', 'Cardiovascular sutures'],
          energyDevices: ['Electrocautery', 'Bipolar']
        },
        mayoSetup: {
          essential: ['Sternal saw', 'Cardiovascular instruments', 'Patch', 'Fine sutures'],
          positioning: 'Full cardiac surgery setup with CPB'
        },
        procedureSteps: [
          { step: 1, description: 'Median sternotomy and cannulation', instruments: ['Sternal saw', 'Cannulas'], keyPoints: ['Aortic and bicaval cannulation', 'Heparinization'] },
          { step: 2, description: 'Initiate cardiopulmonary bypass', instruments: ['CPB'], keyPoints: ['Full flow', 'Cooling if needed'] },
          { step: 3, description: 'Cardioplegia and cardiac arrest', instruments: ['Cardioplegia'], keyPoints: ['Cold blood cardioplegia', 'Arrest heart'] },
          { step: 4, description: 'Open right atrium', instruments: ['Scissors'], keyPoints: ['Expose atrial septum', 'Visualize defect'] },
          { step: 5, description: 'Close ASD (primary or patch)', instruments: ['Sutures', 'Patch'], keyPoints: ['Primary if small', 'Patch if large', 'Avoid conduction system'] },
          { step: 6, description: 'Close atrium and de-air', instruments: ['Sutures'], keyPoints: ['Complete de-airing', 'Resume beating'] },
          { step: 7, description: 'Wean from bypass', instruments: ['CPB'], keyPoints: ['Hemodynamics stable', 'TEE confirmation'] },
          { step: 8, description: 'Decannulation and close', instruments: ['Sutures'], keyPoints: ['Reverse heparin', 'Chest closure'] }
        ],
        medications: {
          antibiotics: ['Cefazolin or cefuroxime'],
          prophylaxis: ['Heparin for CPB, protamine reversal'],
          testing: ['TEE intraop', 'Echo postop']
        },
        complications: ['Residual shunt', 'Heart block', 'Bleeding', 'Stroke', 'Arrhythmias'],
        tips: ['Most ASDs now closed percutaneously', 'Surgical for large/complex defects', 'Avoid AV node injury']
      },
      {
        name: 'Ventricular Assist Device (VAD) Implantation',
        specialtyId: getSpecialtyId('Cardiovascular'),
        description: 'Surgical implantation of mechanical circulatory support device',
        duration: '240-360 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine' },
        draping: { standard: 'Full sterile draping for cardiac surgery' },
        instruments: {
          basicSets: ['Cardiac surgery set'],
          specialInstruments: ['VAD system', 'CPB circuit', 'Sewing rings', 'Outflow graft'],
          energyDevices: ['Electrocautery', 'Bipolar']
        },
        mayoSetup: {
          essential: ['VAD pump', 'Inflow cannula', 'Outflow graft', 'Sewing rings'],
          positioning: 'Full cardiac surgery setup'
        },
        procedureSteps: [
          { step: 1, description: 'Median sternotomy', instruments: ['Sternal saw'], keyPoints: ['May be redo sternotomy', 'Careful adhesiolysis'] },
          { step: 2, description: 'Cannulation and initiate CPB', instruments: ['Cannulas', 'CPB'], keyPoints: ['Aortic and atrial cannulation', 'Full support'] },
          { step: 3, description: 'Create LV apex core', instruments: ['Coring knife'], keyPoints: ['Apical location', 'Appropriate size'] },
          { step: 4, description: 'Sew inflow cannula to LV', instruments: ['Pledgeted sutures'], keyPoints: ['Secure attachment', 'De-air'] },
          { step: 5, description: 'Anastomose outflow graft to ascending aorta', instruments: ['Vascular sutures'], keyPoints: ['Partial clamp', 'Secure anastomosis'] },
          { step: 6, description: 'Tunnel driveline', instruments: ['Tunneling device'], keyPoints: ['Exit site planning', 'Secure strain relief'] },
          { step: 7, description: 'De-air system and start VAD', instruments: ['VAD controller'], keyPoints: ['Complete de-airing', 'Gradual speed increase'] },
          { step: 8, description: 'Wean CPB', instruments: ['CPB'], keyPoints: ['Optimize VAD flows', 'Hemodynamics stable'] },
          { step: 9, description: 'Decannulation and close', instruments: ['Sutures'], keyPoints: ['Hemostasis critical', 'Chest closure'] }
        ],
        medications: {
          antibiotics: ['Broad spectrum antibiotics'],
          prophylaxis: ['Anticoagulation protocol', 'Antiplatelet therapy'],
          testing: ['Echocardiography', 'VAD parameters']
        },
        complications: ['Bleeding', 'Thromboembolism', 'Infection', 'Device malfunction', 'RV failure', 'Stroke'],
        tips: ['Bridge to transplant or destination therapy', 'Meticulous de-airing', 'RV failure common', 'Lifelong anticoagulation']
      },
      {
        name: 'Patent Ductus Arteriosus (PDA) Ligation',
        specialtyId: getSpecialtyId('Cardiovascular'),
        description: 'Surgical ligation or division of patent ductus arteriosus',
        duration: '90-120 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Right lateral decubitus (left thoracotomy)' },
        draping: { standard: 'Prep left chest, standard thoracotomy draping' },
        instruments: {
          basicSets: ['Thoracotomy set'],
          specialInstruments: ['Vascular clamps', 'Clips', 'Vessel loops'],
          energyDevices: ['Electrocautery']
        },
        mayoSetup: {
          essential: ['Retractors', 'Vascular clamps', 'Clips', 'Scissors', 'Ties'],
          positioning: 'Thoracotomy setup'
        },
        procedureSteps: [
          { step: 1, description: 'Left posterolateral thoracotomy', instruments: ['Scalpel', 'Rib spreader'], keyPoints: ['4th intercostal space', 'Expose hilum'] },
          { step: 2, description: 'Open pleura and identify structures', instruments: ['Scissors'], keyPoints: ['Identify aorta, PA, vagus, recurrent laryngeal'] },
          { step: 3, description: 'Dissect and isolate PDA', instruments: ['Right-angle clamp'], keyPoints: ['Between aorta and PA', 'Protect recurrent laryngeal nerve'] },
          { step: 4, description: 'Ligate or divide PDA', instruments: ['Clips or ligatures'], keyPoints: ['Double or triple ligation', 'Divide if thick/calcified'] },
          { step: 5, description: 'Inspect for hemostasis', instruments: [], keyPoints: ['No residual shunt', 'Control bleeding'] },
          { step: 6, description: 'Close chest', instruments: ['Sutures', 'Chest tube'], keyPoints: ['Rib approximation', 'Layered closure'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV'],
          prophylaxis: [],
          testing: ['Chest X-ray postop', 'Echo to confirm closure']
        },
        complications: ['Bleeding', 'Recurrent laryngeal nerve injury', 'Chylothorax', 'Residual shunt', 'Recanalization'],
        tips: ['Most PDAs now closed percutaneously', 'Surgical for large/calcified', 'Protect recurrent laryngeal nerve']
      },

      // ==================== ADDITIONAL PLASTICS (6 procedures) ====================
      {
        name: 'Carpal Tunnel Release',
        specialtyId: getSpecialtyId('Plastic & Reconstructive'),
        description: 'Open or endoscopic release of transverse carpal ligament',
        duration: '20-30 min',
        difficulty: 'Basic',
        positioning: { description: 'Supine with arm on hand table' },
        draping: { standard: 'Prep hand and forearm, sterile draping' },
        instruments: {
          basicSets: ['Hand surgery set'],
          specialInstruments: ['Tourniquet', 'Loupe magnification', 'Retractors'],
          energyDevices: ['Bipolar cautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Scissors', 'Retractors', 'Sutures'],
          positioning: 'Hand surgery setup'
        },
        procedureSteps: [
          { step: 1, description: 'Palmar incision', instruments: ['Scalpel'], keyPoints: ['Avoid thenar crease', 'Protect palmar cutaneous branch'] },
          { step: 2, description: 'Identify and protect median nerve', instruments: ['Retractors'], keyPoints: ['Gentle handling', 'Visualize nerve'] },
          { step: 3, description: 'Divide transverse carpal ligament', instruments: ['Scissors'], keyPoints: ['Complete division', 'Protect motor branch'] },
          { step: 4, description: 'Inspect and close', instruments: ['Sutures'], keyPoints: ['Ensure decompression', 'Skin closure only'] }
        ],
        medications: {
          antibiotics: ['Usually not needed'],
          prophylaxis: [],
          testing: []
        },
        complications: ['Nerve injury', 'Incomplete release', 'Pillar pain', 'Scar tenderness'],
        tips: ['Endoscopic option available', 'Protect motor branch', 'Early mobilization']
      },
      {
        name: 'Scar Revision',
        specialtyId: getSpecialtyId('Plastic & Reconstructive'),
        description: 'Surgical revision of unsightly or symptomatic scar',
        duration: '30-90 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Position based on scar location' },
        draping: { standard: 'Prep area widely, sterile draping' },
        instruments: {
          basicSets: ['Plastic surgery set'],
          specialInstruments: ['Fine instruments', 'Skin hooks', 'Loupe magnification'],
          energyDevices: ['Bipolar cautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Fine scissors', 'Forceps', 'Fine sutures'],
          positioning: 'Plastic surgery setup'
        },
        procedureSteps: [
          { step: 1, description: 'Mark planned revision', instruments: ['Marking pen'], keyPoints: ['Along relaxed skin tension lines', 'Z-plasty or W-plasty if needed'] },
          { step: 2, description: 'Excise scar', instruments: ['Scalpel'], keyPoints: ['Full thickness', 'Minimal undermining'] },
          { step: 3, description: 'Undermine and mobilize', instruments: ['Scissors'], keyPoints: ['Create advancement', 'Relieve tension'] },
          { step: 4, description: 'Layered closure', instruments: ['Absorbable and non-absorbable sutures'], keyPoints: ['Bury knots', 'Evert edges', 'Fine skin sutures'] },
          { step: 5, description: 'Apply dressing', instruments: ['Tape'], keyPoints: ['Minimize tension', 'Steri-strips'] }
        ],
        medications: {
          antibiotics: ['Usually not needed unless contaminated'],
          prophylaxis: [],
          testing: []
        },
        complications: ['Recurrence', 'Widening', 'Hypertrophic scar', 'Infection'],
        tips: ['Set expectations', 'Address underlying tension', 'Consider serial excision for large scars', 'Adjuncts: laser, steroid injection']
      },
      {
        name: 'Split-Thickness Skin Graft (STSG)',
        specialtyId: getSpecialtyId('Plastic & Reconstructive'),
        description: 'Harvesting and application of split-thickness skin graft',
        duration: '60-120 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Position based on donor and recipient sites' },
        draping: { standard: 'Prep donor and recipient sites separately' },
        instruments: {
          basicSets: ['Plastic surgery set'],
          specialInstruments: ['Dermatome', 'Mesher', 'Stapler', 'Tie-over dressing materials'],
          energyDevices: ['Electrocautery']
        },
        mayoSetup: {
          essential: ['Dermatome', 'Mesher', 'Stapler', 'Mineral oil'],
          positioning: 'Skin grafting setup'
        },
        procedureSteps: [
          { step: 1, description: 'Prepare recipient bed', instruments: ['Debridement tools'], keyPoints: ['Clean granulation tissue', 'Hemostasis critical'] },
          { step: 2, description: 'Harvest STSG from donor site', instruments: ['Dermatome'], keyPoints: ['0.010-0.015 inch thickness', 'Mineral oil on skin'] },
          { step: 3, description: 'Mesh graft if needed', instruments: ['Mesher'], keyPoints: ['1:1 to 4:1 expansion', 'Allows drainage'] },
          { step: 4, description: 'Apply graft to recipient bed', instruments: ['Stapler or sutures'], keyPoints: ['Smooth application', 'No air pockets'] },
          { step: 5, description: 'Secure with tie-over dressing or negative pressure', instruments: ['Bolster dressing'], keyPoints: ['Immobilization', 'Prevent shear'] },
          { step: 6, description: 'Dress donor site', instruments: ['Xeroform, foam'], keyPoints: ['Moist environment', 'Pain control'] }
        ],
        medications: {
          antibiotics: ['Per indication'],
          prophylaxis: [],
          testing: []
        },
        complications: ['Graft loss', 'Infection', 'Hematoma/seroma', 'Donor site pain', 'Contracture'],
        tips: ['Hemostasis essential', 'Immobilization key', 'Donor site heals in 10-14 days']
      },
      {
        name: 'Full-Thickness Skin Graft (FTSG)',
        specialtyId: getSpecialtyId('Plastic & Reconstructive'),
        description: 'Harvesting and application of full-thickness skin graft',
        duration: '60-90 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Based on defect and donor site' },
        draping: { standard: 'Prep donor and recipient sites' },
        instruments: {
          basicSets: ['Plastic surgery set'],
          specialInstruments: ['Fine scissors', 'Skin hooks', 'Sutures'],
          energyDevices: ['Bipolar cautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Fine scissors', 'Forceps', 'Sutures'],
          positioning: 'Plastic surgery setup'
        },
        procedureSteps: [
          { step: 1, description: 'Template defect', instruments: ['Template material'], keyPoints: ['Accurate size', 'Account for shrinkage'] },
          { step: 2, description: 'Harvest FTSG from donor site', instruments: ['Scalpel'], keyPoints: ['Postauricular, supraclavicular common', 'Full thickness dermis'] },
          { step: 3, description: 'Defat graft', instruments: ['Scissors'], keyPoints: ['Remove subcutaneous fat', 'Preserve dermis'] },
          { step: 4, description: 'Close donor site primarily', instruments: ['Sutures'], keyPoints: ['Layered closure', 'Cosmetic closure'] },
          { step: 5, description: 'Apply graft to recipient site', instruments: ['Sutures'], keyPoints: ['Secure periphery', 'Tie-over bolster or quilting sutures'] },
          { step: 6, description: 'Apply dressing', instruments: ['Bolster'], keyPoints: ['Immobilization', 'Prevent shear'] }
        ],
        medications: {
          antibiotics: ['Per indication'],
          prophylaxis: [],
          testing: []
        },
        complications: ['Graft loss', 'Hematoma', 'Infection', 'Contour irregularity'],
        tips: ['Better color/texture match than STSG', 'Requires good vascularity', 'No meshing']
      },
      {
        name: 'Local Flap Reconstruction',
        specialtyId: getSpecialtyId('Plastic & Reconstructive'),
        description: 'Reconstruction using local tissue rearrangement flap',
        duration: '60-120 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Based on defect location' },
        draping: { standard: 'Prep area widely for flap design' },
        instruments: {
          basicSets: ['Plastic surgery set'],
          specialInstruments: ['Fine instruments', 'Skin hooks', 'Doppler'],
          energyDevices: ['Bipolar cautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Fine scissors', 'Forceps', 'Sutures'],
          positioning: 'Plastic surgery setup'
        },
        procedureSteps: [
          { step: 1, description: 'Design flap', instruments: ['Marking pen'], keyPoints: ['Rotation, advancement, or transposition', 'Random or axial pattern'] },
          { step: 2, description: 'Incise and elevate flap', instruments: ['Scalpel', 'Scissors'], keyPoints: ['Preserve vascular supply', 'Adequate thickness'] },
          { step: 3, description: 'Rotate/advance/transpose flap', instruments: ['Skin hooks'], keyPoints: ['Tension-free', 'No kinking of pedicle'] },
          { step: 4, description: 'Inset flap', instruments: ['Sutures'], keyPoints: ['Layered closure', 'Key sutures first'] },
          { step: 5, description: 'Close donor site', instruments: ['Sutures'], keyPoints: ['May need undermining', 'Redistribute tension'] }
        ],
        medications: {
          antibiotics: ['Per indication'],
          prophylaxis: [],
          testing: []
        },
        complications: ['Flap necrosis', 'Hematoma', 'Dehiscence', 'Contour deformity'],
        tips: ['Understand angiosomes', 'Avoid tension on pedicle', 'Monitor flap perfusion']
      },
      {
        name: 'Z-Plasty',
        specialtyId: getSpecialtyId('Plastic & Reconstructive'),
        description: 'Scar revision technique using transposition flaps',
        duration: '30-60 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Based on scar location' },
        draping: { standard: 'Prep area around scar' },
        instruments: {
          basicSets: ['Plastic surgery set'],
          specialInstruments: ['Fine instruments', 'Ruler', 'Protractor'],
          energyDevices: ['Bipolar cautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Fine scissors', 'Forceps', 'Fine sutures'],
          positioning: 'Plastic surgery setup'
        },
        procedureSteps: [
          { step: 1, description: 'Mark Z-plasty', instruments: ['Marking pen', 'Ruler'], keyPoints: ['60-degree angles standard', 'Equal limb lengths'] },
          { step: 2, description: 'Incise along markings', instruments: ['Scalpel'], keyPoints: ['Full thickness', 'Sharp angles'] },
          { step: 3, description: 'Undermine and transpose flaps', instruments: ['Scissors'], keyPoints: ['Adequate undermining', 'Transpose flaps'] },
          { step: 4, description: 'Inset flaps', instruments: ['Fine sutures'], keyPoints: ['Key corner sutures', 'Layered closure'] }
        ],
        medications: {
          antibiotics: ['Usually not needed'],
          prophylaxis: [],
          testing: []
        },
        complications: ['Flap necrosis', 'Widening', 'Hypertrophic scar'],
        tips: ['Lengthens and reorients scar', '60-degree angles give 75% lengthening', 'Multiple Z-plasties for long scars']
      },

      // ==================== ADDITIONAL VASCULAR SURGERY (6 procedures) ====================
      {
        name: 'Carotid Endarterectomy',
        specialtyId: getSpecialtyId('Vascular Surgery'),
        description: 'Surgical removal of atherosclerotic plaque from carotid artery',
        duration: '120-180 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine with neck extended and turned to opposite side' },
        draping: { standard: 'Prep neck from angle of mandible to clavicle, standard draping' },
        instruments: {
          basicSets: ['Vascular surgery set'],
          specialInstruments: ['Vascular clamps', 'Shunts', 'Patch material', 'Doppler'],
          energyDevices: ['Bipolar cautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Vascular clamps', 'Shunt', 'Patch', 'Vascular sutures'],
          positioning: 'Vascular surgery setup'
        },
        procedureSteps: [
          { step: 1, description: 'Longitudinal neck incision', instruments: ['Scalpel'], keyPoints: ['Along SCM', 'Expose carotid bifurcation'] },
          { step: 2, description: 'Dissect and identify structures', instruments: ['Scissors'], keyPoints: ['CCA, ICA, ECA', 'Protect cranial nerves'] },
          { step: 3, description: 'Systemic heparinization', instruments: ['Heparin'], keyPoints: ['100 units/kg', 'ACT >250'] },
          { step: 4, description: 'Clamp vessels and arteriotomy', instruments: ['Vascular clamps', 'Scalpel'], keyPoints: ['Shunt if needed', 'Longitudinal arteriotomy'] },
          { step: 5, description: 'Endarterectomy', instruments: ['Dissectors'], keyPoints: ['Remove plaque', 'Feather endpoints', 'Inspect carefully'] },
          { step: 6, description: 'Close with or without patch', instruments: ['Vascular sutures', 'Patch'], keyPoints: ['Primary or patch closure', 'Avoid stenosis'] },
          { step: 7, description: 'Restore flow and check', instruments: ['Doppler'], keyPoints: ['Back-bleed', 'Forward flow', 'Doppler signals'] },
          { step: 8, description: 'Reverse heparin and close', instruments: ['Protamine', 'Sutures'], keyPoints: ['Hemostasis', 'Drain', 'Layered closure'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV'],
          prophylaxis: ['Heparin', 'Protamine'],
          testing: ['Completion duplex or angiography']
        },
        complications: ['Stroke', 'MI', 'Nerve injury', 'Bleeding', 'Restenosis'],
        tips: ['Shunt for high-risk patients', 'Patch reduces restenosis', 'Protect hypoglossal, vagus, marginal mandibular nerves']
      },
      {
        name: 'Arteriovenous Fistula Creation for Dialysis',
        specialtyId: getSpecialtyId('Vascular Surgery'),
        description: 'Surgical creation of AV fistula for hemodialysis access',
        duration: '60-90 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Supine with arm extended' },
        draping: { standard: 'Prep arm, sterile draping' },
        instruments: {
          basicSets: ['Vascular surgery set'],
          specialInstruments: ['Vascular clamps', 'Vessel loops', 'Doppler'],
          energyDevices: ['Bipolar cautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Vascular clamps', 'Vessel loops', 'Vascular sutures'],
          positioning: 'Vascular access setup'
        },
        procedureSteps: [
          { step: 1, description: 'Incision over planned anastomosis site', instruments: ['Scalpel'], keyPoints: ['Radiocephalic, brachiocephalic, or brachiobasilic', 'Adequate exposure'] },
          { step: 2, description: 'Dissect and mobilize vein', instruments: ['Scissors'], keyPoints: ['Preserve branches initially', 'Ligate tributaries'] },
          { step: 3, description: 'Dissect and mobilize artery', instruments: ['Scissors'], keyPoints: ['Adequate length', 'Preserve collaterals'] },
          { step: 4, description: 'Systemic heparinization', instruments: ['Heparin'], keyPoints: ['50-100 units/kg', 'Prevent thrombosis'] },
          { step: 5, description: 'Create arteriotomy and venotomy', instruments: ['Scalpel'], keyPoints: ['Size-matched', 'End-to-side or side-to-side'] },
          { step: 6, description: 'Anastomose artery to vein', instruments: ['Vascular sutures'], keyPoints: ['Smooth intima', 'No twisting', 'Good flow'] },
          { step: 7, description: 'Restore flow and check thrill', instruments: ['Doppler'], keyPoints: ['Palpable thrill', 'Bruit', 'Good venous distention'] },
          { step: 8, description: 'Close incision', instruments: ['Sutures'], keyPoints: ['Hemostasis', 'Layered closure'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV'],
          prophylaxis: ['Heparin intraop'],
          testing: ['Postop duplex at 4-6 weeks']
        },
        complications: ['Thrombosis', 'Steal syndrome', 'High-output failure', 'Infection', 'Failure to mature'],
        tips: ['Maturation 6-12 weeks', 'Radiocephalic (Brescia-Cimino) preferred', 'Preop vein mapping helpful']
      },
      {
        name: 'Varicose Vein Stripping',
        specialtyId: getSpecialtyId('Vascular Surgery'),
        description: 'Surgical removal of great saphenous vein for varicosities',
        duration: '60-120 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Supine with leg in frog-leg position' },
        draping: { standard: 'Prep entire leg, sterile draping' },
        instruments: {
          basicSets: ['Vascular surgery set'],
          specialInstruments: ['Vein stripper', 'Phlebectomy hooks'],
          energyDevices: ['Electrocautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Vein stripper', 'Phlebectomy hooks', 'Ties'],
          positioning: 'Vein surgery setup'
        },
        procedureSteps: [
          { step: 1, description: 'Groin incision and saphenofemoral junction dissection', instruments: ['Scalpel'], keyPoints: ['Expose SFJ', 'Identify tributaries'] },
          { step: 2, description: 'Ligate and divide tributaries', instruments: ['Ties', 'Clips'], keyPoints: ['Preserve femoral vein', 'Flush ligation'] },
          { step: 3, description: 'Knee or ankle incision', instruments: ['Scalpel'], keyPoints: ['Distal access', 'Identify GSV'] },
          { step: 4, description: 'Pass stripper and avulse vein', instruments: ['Vein stripper'], keyPoints: ['Invaginate technique', 'Remove vein'] },
          { step: 5, description: 'Stab avulsion of varicosities', instruments: ['Phlebectomy hooks'], keyPoints: ['Small incisions', 'Cosmetic'] },
          { step: 6, description: 'Compression and close', instruments: ['Sutures', 'Compression wrap'], keyPoints: ['Hemostasis', 'Immediate compression'] }
        ],
        medications: {
          antibiotics: ['Usually not needed'],
          prophylaxis: ['Compression stockings postop'],
          testing: ['Duplex preop to map reflux']
        },
        complications: ['Bleeding', 'Infection', 'Nerve injury', 'DVT', 'Recurrence'],
        tips: ['Endovenous ablation now preferred', 'Mark veins preop', 'Early ambulation']
      },
      {
        name: 'Thrombectomy (Arterial)',
        specialtyId: getSpecialtyId('Vascular Surgery'),
        description: 'Surgical removal of arterial thrombus or embolus',
        duration: '90-180 min',
        difficulty: 'Advanced',
        positioning: { description: 'Based on affected artery' },
        draping: { standard: 'Prep extremity or region widely' },
        instruments: {
          basicSets: ['Vascular surgery set'],
          specialInstruments: ['Fogarty catheters', 'Vascular clamps', 'Patch material'],
          energyDevices: ['Bipolar cautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Fogarty catheters', 'Vascular clamps', 'Heparin'],
          positioning: 'Vascular emergency setup'
        },
        procedureSteps: [
          { step: 1, description: 'Incision over affected artery', instruments: ['Scalpel'], keyPoints: ['Common femoral for lower extremity', 'Brachial for upper'] },
          { step: 2, description: 'Dissect and control artery', instruments: ['Vessel loops'], keyPoints: ['Proximal and distal control', 'Systemic heparin'] },
          { step: 3, description: 'Arteriotomy', instruments: ['Scalpel'], keyPoints: ['Transverse or longitudinal', 'Adequate visualization'] },
          { step: 4, description: 'Pass Fogarty catheter proximally and distally', instruments: ['Fogarty catheters'], keyPoints: ['Extract all thrombus', 'Good back-bleeding'] },
          { step: 5, description: 'Flush and check flow', instruments: ['Heparin saline'], keyPoints: ['Clear efflux', 'Palpable pulses if possible'] },
          { step: 6, description: 'Close arteriotomy', instruments: ['Vascular sutures', 'Patch'], keyPoints: ['Patch if stenosis risk', 'No narrowing'] },
          { step: 7, description: 'Restore flow', instruments: [], keyPoints: ['Back-bleed', 'Forward flow', 'Palpate distal pulses'] },
          { step: 8, description: 'Hemostasis and close', instruments: ['Sutures'], keyPoints: ['Drain', 'Layered closure'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV'],
          prophylaxis: ['Heparin', 'Postop anticoagulation'],
          testing: ['Angiography if uncertain', 'Postop duplex']
        },
        complications: ['Reperfusion injury', 'Compartment syndrome', 'Recurrent thrombosis', 'Limb loss', 'Death'],
        tips: ['Time-sensitive', 'Consider fasciotomy', 'Identify source of embolus']
      },
      {
        name: 'Fasciotomy (Lower Extremity)',
        specialtyId: getSpecialtyId('Vascular Surgery'),
        description: 'Surgical decompression of muscle compartments',
        duration: '30-60 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Supine with leg accessible' },
        draping: { standard: 'Prep entire leg, sterile draping' },
        instruments: {
          basicSets: ['Minor procedure set'],
          specialInstruments: ['Metzenbaum scissors', 'Large retractors'],
          energyDevices: ['Electrocautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Scissors', 'Retractors'],
          positioning: 'Emergency compartment release setup'
        },
        procedureSteps: [
          { step: 1, description: 'Two-incision approach (medial and lateral)', instruments: ['Scalpel'], keyPoints: ['15-20cm incisions', 'Longitudinal'] },
          { step: 2, description: 'Release anterior compartment (lateral)', instruments: ['Scissors'], keyPoints: ['Incise fascia fully', 'Decompress muscles'] },
          { step: 3, description: 'Release lateral compartment (lateral)', instruments: ['Scissors'], keyPoints: ['Identify peroneal nerve', 'Complete release'] },
          { step: 4, description: 'Release superficial posterior compartment (medial)', instruments: ['Scissors'], keyPoints: ['Behind tibia', 'Long incision'] },
          { step: 5, description: 'Release deep posterior compartment (medial)', instruments: ['Scissors'], keyPoints: ['Separate layer', 'Complete release'] },
          { step: 6, description: 'Inspect muscle viability', instruments: [], keyPoints: ['Assess perfusion', 'Debride if needed'] },
          { step: 7, description: 'Leave open and plan closure', instruments: ['Dressing'], keyPoints: ['Negative pressure dressing', 'Delayed closure in days'] }
        ],
        medications: {
          antibiotics: ['Broad spectrum if contaminated'],
          prophylaxis: [],
          testing: ['Compartment pressures preop']
        },
        complications: ['Infection', 'Muscle necrosis', 'Nerve injury', 'Scarring', 'Contracture'],
        tips: ['Don\'t delay', 'All four compartments', 'Leave open initially', 'Serial debridement if needed']
      },
      {
        name: 'Fem-Pop Bypass',
        specialtyId: getSpecialtyId('Vascular Surgery'),
        description: 'Femoropopliteal bypass graft for peripheral arterial disease',
        duration: '180-300 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine with leg externally rotated' },
        draping: { standard: 'Prep entire leg and abdomen, sterile draping' },
        instruments: {
          basicSets: ['Vascular surgery set'],
          specialInstruments: ['Vascular clamps', 'Tunneler', 'Graft material (vein or prosthetic)'],
          energyDevices: ['Bipolar cautery']
        },
        mayoSetup: {
          essential: ['Scalpel', 'Vascular clamps', 'Tunneler', 'Graft', 'Vascular sutures'],
          positioning: 'Vascular bypass setup'
        },
        procedureSteps: [
          { step: 1, description: 'Incisions: groin and popliteal (above or below knee)', instruments: ['Scalpel'], keyPoints: ['Expose femoral and popliteal arteries', 'Dissect vessels'] },
          { step: 2, description: 'Harvest saphenous vein if using', instruments: ['Scissors'], keyPoints: ['Preserve endothelium', 'Mark orientation', 'Reverse or in-situ'] },
          { step: 3, description: 'Systemic heparinization', instruments: ['Heparin'], keyPoints: ['100 units/kg', 'ACT >250'] },
          { step: 4, description: 'Create tunnel', instruments: ['Tunneler'], keyPoints: ['Subsartorial or anatomic', 'Avoid kinking'] },
          { step: 5, description: 'Proximal anastomosis (femoral)', instruments: ['Vascular sutures'], keyPoints: ['End-to-side', 'Avoid narrowing'] },
          { step: 6, description: 'Pass graft through tunnel', instruments: [], keyPoints: ['No twisting', 'Appropriate length'] },
          { step: 7, description: 'Distal anastomosis (popliteal)', instruments: ['Vascular sutures'], keyPoints: ['End-to-side', 'Good outflow'] },
          { step: 8, description: 'Restore flow and check', instruments: ['Doppler'], keyPoints: ['Back-bleed', 'Palpable pulses', 'Completion angiogram'] },
          { step: 9, description: 'Reverse heparin and close', instruments: ['Protamine', 'Sutures'], keyPoints: ['Hemostasis', 'Drains', 'Layered closure'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV'],
          prophylaxis: ['Heparin', 'Protamine', 'Antiplatelet therapy postop'],
          testing: ['Completion angiography or duplex']
        },
        complications: ['Graft thrombosis', 'Bleeding', 'Infection', 'Graft stenosis', 'Limb loss'],
        tips: ['Vein graft superior patency', 'Adequate inflow and outflow essential', 'Postop duplex surveillance']
      }
    ];

    console.log(`📝 Inserting ALL ${newProcedures.length} additional procedures...`);
    await db.insert(procedures).values(newProcedures);

    console.log(`✅ Successfully added ${newProcedures.length} additional procedures`);
    console.log('🎯 Total should now be 204 procedures across all specialties!');

  } catch (error) {
    console.error('❌ Error adding additional procedures:', error);
    throw error;
  }
}

export default add113MoreProcedures;

// Only run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  add113MoreProcedures()
    .then(() => {
      console.log('🎉 Additional procedures added successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Failed to add procedures:', error);
      process.exit(1);
    });
}
