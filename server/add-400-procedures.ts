import { db } from './db';
import { procedures, specialties } from '@shared/schema';

async function add400Procedures() {
  console.log('📊 Adding 400 procedures (20 per specialty)...');

  try {
    // Get all specialties
    const allSpecialties = await db.select().from(specialties);
    
    // Helper function to get specialty ID
    const getSpecialtyId = (name: string) => {
      const specialty = allSpecialties.find(s => s.name === name);
      if (!specialty) throw new Error(`Specialty not found: ${name}`);
      return specialty.id;
    };

    const newProcedures = [
      // ==================== BARIATRIC SURGERY (20 procedures) ====================
      {
        name: 'Laparoscopic Roux-en-Y Gastric Bypass',
        specialtyId: getSpecialtyId('Bariatric Surgery'),
        description: 'Surgical weight loss procedure creating a small stomach pouch and rerouting small intestine',
        duration: '120-180 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine with split-leg positioning, arms extended, steep reverse Trendelenburg' },
        draping: { standard: 'Prep from nipples to pubis, standard laparoscopic draping with camera drape' },
        instruments: {
          basicSets: ['Laparoscopic set', 'Bariatric instruments'],
          specialInstruments: ['Trocars', 'Staplers', 'Harmonic scalpel', 'Graspers', 'Clips'],
          energyDevices: ['Harmonic scalpel', 'Electrocautery']
        },
        mayoSetup: {
          essential: ['Staplers', 'Harmonic scalpel', 'Trocars', 'Graspers', 'Suture'],
          positioning: 'Staplers and energy devices on right, graspers and retractors on left'
        },
        procedureSteps: [
          { step: 1, description: 'Create pneumoperitoneum and place 5-6 trocars', instruments: ['Trocars', 'Laparoscope'], keyPoints: ['Ensure adequate triangulation', 'Verify intra-abdominal pressure'] },
          { step: 2, description: 'Create small gastric pouch using linear staplers', instruments: ['Staplers', 'Harmonic scalpel'], keyPoints: ['15-30mL pouch volume', 'Exclude fundus'] },
          { step: 3, description: 'Divide jejunum 30-50cm from ligament of Treitz', instruments: ['Staplers'], keyPoints: ['Identify and preserve vascular arcade', 'Measure carefully'] },
          { step: 4, description: 'Create Roux limb (75-150cm) and bring to gastric pouch', instruments: ['Staplers', 'Graspers'], keyPoints: ['Ensure adequate length', 'Antecolic vs retrocolic route'] },
          { step: 5, description: 'Create gastrojejunostomy anastomosis', instruments: ['Staplers', 'Suture'], keyPoints: ['12-15mm anastomosis', 'Check for leak'] },
          { step: 6, description: 'Create jejunojejunostomy', instruments: ['Staplers'], keyPoints: ['Side-to-side anastomosis', 'Close mesenteric defect'] },
          { step: 7, description: 'Test anastomoses, achieve hemostasis, close', instruments: ['Suction', 'Clips'], keyPoints: ['Methylene blue or air leak test', 'Inspect all staple lines'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV'],
          prophylaxis: ['Heparin 5000 units SC', 'Sequential compression devices'],
          testing: ['Methylene blue for leak test']
        },
        complications: ['Anastomotic leak', 'Bleeding', 'Bowel obstruction', 'Marginal ulcer', 'Nutritional deficiencies'],
        tips: ['Use leak test on all anastomoses', 'Close all mesenteric defects', 'Ensure tension-free anastomoses', 'Consider drain placement']
      },
      {
        name: 'Laparoscopic Sleeve Gastrectomy',
        specialtyId: getSpecialtyId('Bariatric Surgery'),
        description: 'Vertical gastrectomy removing 75-80% of stomach along greater curvature',
        duration: '60-90 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Supine with split-leg positioning, reverse Trendelenburg' },
        draping: { standard: 'Standard laparoscopic prep and draping' },
        instruments: {
          basicSets: ['Laparoscopic set', 'Bariatric instruments'],
          specialInstruments: ['Trocars', 'Staplers', 'Harmonic scalpel', 'Bougie', 'Graspers'],
          energyDevices: ['Harmonic scalpel', 'Electrocautery']
        },
        mayoSetup: {
          essential: ['Staplers', 'Bougie', 'Harmonic scalpel', 'Graspers'],
          positioning: 'Energy devices and staplers easily accessible, bougie ready'
        },
        procedureSteps: [
          { step: 1, description: 'Port placement and liver retraction', instruments: ['Trocars', 'Retractors'], keyPoints: ['Expose angle of His', 'Adequate liver retraction'] },
          { step: 2, description: 'Mobilize greater curvature using energy device', instruments: ['Harmonic scalpel', 'Graspers'], keyPoints: ['Divide short gastric vessels', 'Start 4-6cm from pylorus'] },
          { step: 3, description: 'Insert calibration bougie (32-40Fr)', instruments: ['Bougie'], keyPoints: ['Advance to pylorus', 'Guide staple line'] },
          { step: 4, description: 'Fire sequential staple loads along bougie', instruments: ['Staplers'], keyPoints: ['Avoid narrow sleeve', 'Prevent twist', 'Reinforce if needed'] },
          { step: 5, description: 'Oversew staple line if indicated', instruments: ['Suture', 'Needle holders'], keyPoints: ['Imbrication technique', 'Buttressing'] },
          { step: 6, description: 'Test for leaks and achieve hemostasis', instruments: ['Suction'], keyPoints: ['Methylene blue test', 'Inspect entire staple line'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV'],
          testing: ['Methylene blue or air leak test']
        },
        complications: ['Staple line leak', 'Bleeding', 'Stricture', 'Reflux', 'Sleeve dilation'],
        tips: ['Use bougie for consistent sleeve size', 'Reinforce staple line at angle of His', 'Avoid narrow incisura', 'Consider buttressing material']
      },
      {
        name: 'Laparoscopic Adjustable Gastric Band',
        specialtyId: getSpecialtyId('Bariatric Surgery'),
        description: 'Placement of adjustable silicone band around upper stomach',
        duration: '30-60 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Supine, reverse Trendelenburg position' },
        draping: { standard: 'Standard laparoscopic prep and draping' },
        instruments: {
          basicSets: ['Laparoscopic set'],
          specialInstruments: ['Trocars', 'Band system', 'Graspers', 'Suture'],
        },
        mayoSetup: {
          essential: ['Band device', 'Port', 'Tubing', 'Graspers', 'Suture'],
          positioning: 'Band system ready for deployment, sutures organized'
        },
        procedureSteps: [
          { step: 1, description: 'Create pneumoperitoneum and place trocars', instruments: ['Trocars'], keyPoints: ['Left upper quadrant access', 'Liver retraction'] },
          { step: 2, description: 'Create retrogastric tunnel', instruments: ['Graspers'], keyPoints: ['Pars flaccida technique', 'Avoid posterior wall injury'] },
          { step: 3, description: 'Pass band through tunnel', instruments: ['Band system'], keyPoints: ['Gentle handling', 'Proper orientation'] },
          { step: 4, description: 'Lock band and adjust tension', instruments: ['Band system'], keyPoints: ['No overtightening', 'Symmetrical placement'] },
          { step: 5, description: 'Secure band with gastrogastric sutures', instruments: ['Suture'], keyPoints: ['Anterior fixation', 'Prevent slippage'] },
          { step: 6, description: 'Secure port to fascia', instruments: ['Suture'], keyPoints: ['Subcutaneous pocket', 'Secure fixation'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV']
        },
        complications: ['Band slippage', 'Erosion', 'Port infection', 'Esophageal dilation', 'Band intolerance'],
        tips: ['Pars flaccida technique preferred', 'Avoid overtightening', 'Secure port well', 'Check for posterior wall injury']
      },
      {
        name: 'Revisional Bariatric Surgery',
        specialtyId: getSpecialtyId('Bariatric Surgery'),
        description: 'Revision of previous bariatric procedure for complications or inadequate weight loss',
        duration: '180-300 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine with split-leg positioning' },
        draping: { standard: 'Wide prep for possible conversion to open' },
        instruments: {
          basicSets: ['Laparoscopic set', 'Bariatric instruments', 'General surgery set'],
          specialInstruments: ['Trocars', 'Staplers', 'Harmonic scalpel', 'Clips', 'Graspers'],
          energyDevices: ['Harmonic scalpel', 'Electrocautery']
        },
        mayoSetup: {
          essential: ['Staplers', 'Harmonic scalpel', 'Graspers', 'Clips', 'Suture'],
          positioning: 'Complex setup with adhesiolysis instruments ready'
        },
        procedureSteps: [
          { step: 1, description: 'Access abdomen, extensive adhesiolysis', instruments: ['Trocars', 'Harmonic scalpel', 'Scissors'], keyPoints: ['Safe entry', 'Careful dissection'] },
          { step: 2, description: 'Identify previous anatomy and complications', instruments: ['Graspers', 'Laparoscope'], keyPoints: ['Document findings', 'Plan revision'] },
          { step: 3, description: 'Perform revision based on indication', instruments: ['Staplers', 'Harmonic scalpel'], keyPoints: ['Convert to different procedure', 'Repair complications'] },
          { step: 4, description: 'Create new anatomy as needed', instruments: ['Staplers', 'Suture'], keyPoints: ['Ensure adequate length', 'Tension-free'] },
          { step: 5, description: 'Test integrity, achieve hemostasis', instruments: ['Suction', 'Clips'], keyPoints: ['Leak test', 'Thorough inspection'] }
        ],
        medications: {
          antibiotics: ['Broad-spectrum coverage'],
          prophylaxis: ['DVT prophylaxis']
        },
        complications: ['Leak', 'Bleeding', 'Bowel injury', 'Prolonged ileus', 'Conversion to open'],
        tips: ['Be prepared for complex adhesions', 'Have conversion supplies ready', 'Consider drain placement', 'Extended operative time expected']
      },
      {
        name: 'Single Anastomosis Duodenal-Ileal Bypass (SADI)',
        specialtyId: getSpecialtyId('Bariatric Surgery'),
        description: 'Simplified duodenal switch with single anastomosis',
        duration: '120-180 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine, reverse Trendelenburg' },
        draping: { standard: 'Standard laparoscopic draping' },
        instruments: {
          basicSets: ['Laparoscopic set', 'Bariatric instruments'],
          specialInstruments: ['Trocars', 'Staplers', 'Harmonic scalpel', 'Bougie'],
          energyDevices: ['Harmonic scalpel']
        },
        mayoSetup: {
          essential: ['Staplers', 'Bougie', 'Harmonic scalpel', 'Graspers'],
          positioning: 'Staplers readily accessible for multiple firings'
        },
        procedureSteps: [
          { step: 1, description: 'Perform sleeve gastrectomy', instruments: ['Staplers', 'Bougie'], keyPoints: ['Standard sleeve technique', 'Use 32-40Fr bougie'] },
          { step: 2, description: 'Identify duodenum distal to pylorus', instruments: ['Graspers'], keyPoints: ['2-3cm from pylorus', 'Preserve blood supply'] },
          { step: 3, description: 'Measure 250-300cm from ileocecal valve', instruments: ['Graspers'], keyPoints: ['Common channel length', 'Mark with suture'] },
          { step: 4, description: 'Create duodenoileal anastomosis', instruments: ['Staplers', 'Suture'], keyPoints: ['Side-to-side technique', 'Tension-free'] },
          { step: 5, description: 'Test anastomosis and close mesenteric defect', instruments: ['Suction', 'Suture'], keyPoints: ['Leak test', 'Close all defects'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV'],
          testing: ['Methylene blue leak test']
        },
        complications: ['Anastomotic leak', 'Malnutrition', 'Diarrhea', 'Marginal ulcer', 'Vitamin deficiencies'],
        tips: ['Adequate common channel critical', 'Close mesenteric defects', 'Plan lifelong supplementation', 'Consider drain']
      },
      {
        name: 'Laparoscopic Greater Curvature Plication',
        specialtyId: getSpecialtyId('Bariatric Surgery'),
        description: 'Stomach volume reduction by infolding greater curvature without resection',
        duration: '90-120 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Supine, reverse Trendelenburg' },
        draping: { standard: 'Standard laparoscopic draping' },
        instruments: {
          basicSets: ['Laparoscopic set'],
          specialInstruments: ['Trocars', 'Graspers', 'Suture', 'Needle holders', 'Bougie'],
        },
        mayoSetup: {
          essential: ['Suture', 'Needle holders', 'Graspers', 'Bougie'],
          positioning: 'Multiple sutures ready, needle holders accessible'
        },
        procedureSteps: [
          { step: 1, description: 'Mobilize greater curvature', instruments: ['Graspers', 'Harmonic device'], keyPoints: ['Preserve vessels', 'Full mobilization'] },
          { step: 2, description: 'Insert bougie for calibration', instruments: ['Bougie'], keyPoints: ['32-40Fr size', 'Guide plication'] },
          { step: 3, description: 'Place serial plication sutures', instruments: ['Suture', 'Needle holders'], keyPoints: ['Invaginate stomach', 'Two-layer technique'] },
          { step: 4, description: 'Complete plication from antrum to angle of His', instruments: ['Suture'], keyPoints: ['Consistent tunnel', 'Avoid bleeding'] },
          { step: 5, description: 'Test for leaks', instruments: ['Suction'], keyPoints: ['Ensure no perforation', 'Check hemostasis'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV']
        },
        complications: ['Leak', 'Bleeding', 'Obstruction', 'Plication disruption', 'Nausea/vomiting'],
        tips: ['Avoid tension on sutures', 'Full-thickness bites', 'Adequate hemostasis critical', 'Reversible procedure']
      },
      {
        name: 'Endoscopic Sleeve Gastroplasty',
        specialtyId: getSpecialtyId('Bariatric Surgery'),
        description: 'Endoscopic suturing to reduce stomach volume',
        duration: '60-90 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine or left lateral decubitus' },
        draping: { standard: 'Minimal draping for endoscopic approach' },
        instruments: {
          basicSets: [],
          specialInstruments: ['Endoscope', 'Suture', 'Suction'],
        },
        mayoSetup: {
          essential: ['Endoscopic suturing device', 'Suture', 'Endoscope'],
          positioning: 'Endoscopic equipment on tower, suturing device ready'
        },
        procedureSteps: [
          { step: 1, description: 'Perform upper endoscopy', instruments: ['Endoscope'], keyPoints: ['Evaluate anatomy', 'Rule out pathology'] },
          { step: 2, description: 'Place serial full-thickness sutures', instruments: ['Suture', 'Endoscope'], keyPoints: ['From fundus to antrum', 'Create tubular stomach'] },
          { step: 3, description: 'Create restrictive sleeve configuration', instruments: ['Suture'], keyPoints: ['Appropriate narrowing', 'Symmetric reduction'] },
          { step: 4, description: 'Verify reduction and hemostasis', instruments: ['Endoscope'], keyPoints: ['No bleeding', 'Adequate passage'] }
        ],
        medications: {
          antibiotics: ['Prophylactic antibiotics'],
          sedation: ['General anesthesia or deep sedation']
        },
        complications: ['Bleeding', 'Perforation', 'Pain', 'Pneumoperitoneum', 'Nausea'],
        tips: ['Requires specialized training', 'Outpatient procedure possible', 'Less invasive than surgery', 'Reversible']
      },
      {
        name: 'Intragastric Balloon Placement',
        specialtyId: getSpecialtyId('Bariatric Surgery'),
        description: 'Endoscopic placement of fluid-filled balloon in stomach',
        duration: '20-30 min',
        difficulty: 'Basic',
        positioning: { description: 'Supine or left lateral' },
        draping: { standard: 'Minimal draping' },
        instruments: {
          basicSets: [],
          specialInstruments: ['Endoscope', 'Balloon system', 'Suction'],
        },
        mayoSetup: {
          essential: ['Balloon device', 'Filling solution', 'Endoscope'],
          positioning: 'Balloon ready for deployment, filling syringe prepared'
        },
        procedureSteps: [
          { step: 1, description: 'Upper endoscopy to evaluate stomach', instruments: ['Endoscope'], keyPoints: ['Rule out contraindications', 'Check for ulcers'] },
          { step: 2, description: 'Insert collapsed balloon', instruments: ['Balloon system', 'Endoscope'], keyPoints: ['Through mouth', 'Into stomach'] },
          { step: 3, description: 'Fill balloon with saline and methylene blue', instruments: ['Balloon system'], keyPoints: ['400-700mL fill', 'Proper positioning'] },
          { step: 4, description: 'Verify position and remove endoscope', instruments: ['Endoscope'], keyPoints: ['Free movement', 'No outlet obstruction'] }
        ],
        medications: {
          antibiotics: ['Consider prophylaxis'],
          antiemetics: ['Ondansetron as needed']
        },
        complications: ['Nausea/vomiting', 'Balloon deflation', 'Migration', 'Ulceration', 'Obstruction'],
        tips: ['Temporary 6-month device', 'Antiemetic regimen important', 'Patient education critical', 'Outpatient procedure']
      },
      {
        name: 'Biliopancreatic Diversion with Duodenal Switch',
        specialtyId: getSpecialtyId('Bariatric Surgery'),
        description: 'Complex malabsorptive procedure with sleeve gastrectomy and intestinal bypass',
        duration: '180-240 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine, split-leg positioning' },
        draping: { standard: 'Wide prep for extensive procedure' },
        instruments: {
          basicSets: ['Laparoscopic set', 'Bariatric instruments'],
          specialInstruments: ['Trocars', 'Staplers', 'Harmonic scalpel', 'Bougie'],
          energyDevices: ['Harmonic scalpel', 'Electrocautery']
        },
        mayoSetup: {
          essential: ['Staplers', 'Bougie', 'Harmonic scalpel', 'Suture'],
          positioning: 'Multiple stapler loads ready, complex setup'
        },
        procedureSteps: [
          { step: 1, description: 'Perform sleeve gastrectomy', instruments: ['Staplers', 'Bougie', 'Harmonic scalpel'], keyPoints: ['Standard technique', 'Preserve pylorus'] },
          { step: 2, description: 'Divide duodenum 2-4cm from pylorus', instruments: ['Staplers'], keyPoints: ['GIA stapler', 'Preserve blood supply'] },
          { step: 3, description: 'Measure 250cm common channel from ileocecal valve', instruments: ['Graspers'], keyPoints: ['Accurate measurement', 'Mark position'] },
          { step: 4, description: 'Create 100cm alimentary limb', instruments: ['Staplers'], keyPoints: ['From ileocecal valve', 'Mobilize adequately'] },
          { step: 5, description: 'Create duodenoileal anastomosis', instruments: ['Staplers', 'Suture'], keyPoints: ['Hand-sewn or stapled', 'Tension-free'] },
          { step: 6, description: 'Create ileoileal anastomosis', instruments: ['Staplers'], keyPoints: ['Side-to-side', 'Close all defects'] },
          { step: 7, description: 'Test anastomoses and close', instruments: ['Suction'], keyPoints: ['Leak test', 'Mesenteric defect closure'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV'],
          testing: ['Methylene blue leak test']
        },
        complications: ['Malnutrition', 'Leak', 'Protein deficiency', 'Diarrhea', 'Vitamin deficiencies'],
        tips: ['Most malabsorptive procedure', 'Lifelong supplementation required', 'Reserved for BMI >50', 'Close monitoring essential']
      },
      {
        name: 'Conversion of Band to Sleeve',
        specialtyId: getSpecialtyId('Bariatric Surgery'),
        description: 'Removal of gastric band and conversion to sleeve gastrectomy',
        duration: '120-180 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine, reverse Trendelenburg' },
        draping: { standard: 'Standard laparoscopic draping' },
        instruments: {
          basicSets: ['Laparoscopic set', 'Bariatric instruments'],
          specialInstruments: ['Trocars', 'Staplers', 'Harmonic scalpel', 'Bougie', 'Graspers'],
          energyDevices: ['Harmonic scalpel']
        },
        mayoSetup: {
          essential: ['Staplers', 'Bougie', 'Harmonic scalpel', 'Graspers'],
          positioning: 'Band removal instruments ready first, then stapling supplies'
        },
        procedureSteps: [
          { step: 1, description: 'Access abdomen and perform adhesiolysis', instruments: ['Trocars', 'Scissors'], keyPoints: ['Safe entry', 'Expose band'] },
          { step: 2, description: 'Unlock and remove gastric band', instruments: ['Graspers', 'Scissors'], keyPoints: ['Careful dissection', 'Avoid stomach injury'] },
          { step: 3, description: 'Remove port and tubing', instruments: ['Graspers'], keyPoints: ['Complete removal', 'Check for erosion'] },
          { step: 4, description: 'Allow stomach to heal if erosion present', instruments: [], keyPoints: ['Stage procedure if needed', 'Assess integrity'] },
          { step: 5, description: 'Perform sleeve gastrectomy', instruments: ['Staplers', 'Bougie', 'Harmonic scalpel'], keyPoints: ['Standard technique', 'Adequate mobilization'] },
          { step: 6, description: 'Test and close', instruments: ['Suction'], keyPoints: ['Leak test', 'Hemostasis'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV or broader if erosion']
        },
        complications: ['Leak', 'Bleeding', 'Stricture', 'Gastric injury from band', 'Need for staging'],
        tips: ['May need staged approach if erosion', 'Careful band removal critical', 'Assess stomach integrity', 'Consider drain']
      },
      {
        name: 'Mini Gastric Bypass (One Anastomosis Gastric Bypass)',
        specialtyId: getSpecialtyId('Bariatric Surgery'),
        description: 'Simplified gastric bypass with single loop anastomosis',
        duration: '90-120 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Supine, reverse Trendelenburg' },
        draping: { standard: 'Standard laparoscopic draping' },
        instruments: {
          basicSets: ['Laparoscopic set', 'Bariatric instruments'],
          specialInstruments: ['Trocars', 'Staplers', 'Harmonic scalpel', 'Graspers'],
          energyDevices: ['Harmonic scalpel']
        },
        mayoSetup: {
          essential: ['Staplers', 'Harmonic scalpel', 'Graspers', 'Suture'],
          positioning: 'Staplers accessible, energy device ready'
        },
        procedureSteps: [
          { step: 1, description: 'Create small gastric pouch', instruments: ['Staplers'], keyPoints: ['Long narrow pouch', 'Exclude fundus'] },
          { step: 2, description: 'Measure 150-200cm from ligament of Treitz', instruments: ['Graspers'], keyPoints: ['Biliopancreatic limb length', 'Mark position'] },
          { step: 3, description: 'Create antecolic gastrojejunostomy', instruments: ['Staplers', 'Suture'], keyPoints: ['Linear or circular stapler', 'Tension-free'] },
          { step: 4, description: 'Close mesenteric defect', instruments: ['Suture'], keyPoints: ['Prevent internal hernia', 'Non-absorbable suture'] },
          { step: 5, description: 'Test anastomosis', instruments: ['Suction'], keyPoints: ['Methylene blue or air', 'Check for leaks'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV'],
          testing: ['Leak test solution']
        },
        complications: ['Bile reflux', 'Marginal ulcer', 'Leak', 'Malnutrition', 'Internal hernia'],
        tips: ['Simpler than Roux-en-Y', 'Risk of bile reflux', 'Single anastomosis advantage', 'Close mesenteric defect']
      },
      {
        name: 'Laparoscopic Hiatal Hernia Repair with Fundoplication',
        specialtyId: getSpecialtyId('Bariatric Surgery'),
        description: 'Repair of hiatal hernia often performed with bariatric procedures',
        duration: '90-120 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Supine, reverse Trendelenburg' },
        draping: { standard: 'Standard laparoscopic draping' },
        instruments: {
          basicSets: ['Laparoscopic set'],
          specialInstruments: ['Trocars', 'Mesh (polypropylene)', 'Suture', 'Graspers'],
        },
        mayoSetup: {
          essential: ['Mesh', 'Suture', 'Graspers', 'Needle holders'],
          positioning: 'Mesh ready, sutures organized by type'
        },
        procedureSteps: [
          { step: 1, description: 'Reduce hernia contents into abdomen', instruments: ['Graspers'], keyPoints: ['Gentle traction', 'Complete reduction'] },
          { step: 2, description: 'Dissect and mobilize esophagus', instruments: ['Graspers', 'Harmonic device'], keyPoints: ['Adequate length', 'Preserve vagus'] },
          { step: 3, description: 'Close hiatus with sutures', instruments: ['Suture'], keyPoints: ['Posterior crural repair', 'Appropriate tension'] },
          { step: 4, description: 'Place mesh if indicated', instruments: ['Mesh (polypropylene)', 'Suture'], keyPoints: ['U-shaped configuration', 'Secure fixation'] },
          { step: 5, description: 'Perform fundoplication', instruments: ['Suture', 'Graspers'], keyPoints: ['Nissen or Toupet', 'Wrap around esophagus'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV']
        },
        complications: ['Recurrence', 'Dysphagia', 'Gas-bloat syndrome', 'Mesh erosion', 'Wrap herniation'],
        tips: ['Adequate esophageal mobilization', 'Avoid tight closure', 'Consider mesh for large defects', 'Fundoplication prevents reflux']
      },
      {
        name: 'Laparoscopic Repair of Internal Hernia Post-Bariatric Surgery',
        specialtyId: getSpecialtyId('Bariatric Surgery'),
        description: 'Emergency or elective repair of internal hernia after gastric bypass',
        duration: '60-120 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine' },
        draping: { standard: 'Standard laparoscopic draping' },
        instruments: {
          basicSets: ['Laparoscopic set', 'General surgery set'],
          specialInstruments: ['Trocars', 'Graspers', 'Suture', 'Scissors'],
        },
        mayoSetup: {
          essential: ['Graspers', 'Suture', 'Scissors'],
          positioning: 'Sutures ready for defect closure'
        },
        procedureSteps: [
          { step: 1, description: 'Explore abdomen and identify hernia', instruments: ['Laparoscope', 'Graspers'], keyPoints: ['Check all mesenteric defects', 'Assess viability'] },
          { step: 2, description: 'Reduce herniated bowel', instruments: ['Graspers'], keyPoints: ['Gentle manipulation', 'Assess perfusion'] },
          { step: 3, description: 'Resect bowel if non-viable', instruments: ['Staplers', 'Scissors'], keyPoints: ['Adequate margins', 'Restore continuity'] },
          { step: 4, description: 'Close mesenteric defects', instruments: ['Suture'], keyPoints: ['Non-absorbable suture', 'All defects'] },
          { step: 5, description: 'Inspect anatomy and test integrity', instruments: ['Laparoscope'], keyPoints: ['Verify closure', 'Check blood supply'] }
        ],
        medications: {
          antibiotics: ['Broad-spectrum coverage']
        },
        complications: ['Bowel ischemia', 'Short bowel syndrome', 'Recurrence', 'Adhesions'],
        tips: ['High index of suspicion post-bypass', 'Close all mesenteric defects', 'Emergency if strangulated', 'Assess entire small bowel']
      },
      {
        name: 'Laparoscopic Removal of Eroded Gastric Band',
        specialtyId: getSpecialtyId('Bariatric Surgery'),
        description: 'Removal of gastric band that has eroded into stomach',
        duration: '90-150 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine, reverse Trendelenburg' },
        draping: { standard: 'Standard laparoscopic draping' },
        instruments: {
          basicSets: ['Laparoscopic set'],
          specialInstruments: ['Trocars', 'Graspers', 'Harmonic scalpel', 'Suture', 'Endoscope'],
          energyDevices: ['Harmonic scalpel']
        },
        mayoSetup: {
          essential: ['Graspers', 'Harmonic scalpel', 'Suture', 'Endoscope'],
          positioning: 'Both laparoscopic and endoscopic equipment ready'
        },
        procedureSteps: [
          { step: 1, description: 'Perform upper endoscopy to confirm erosion', instruments: ['Endoscope'], keyPoints: ['Document findings', 'Assess extent'] },
          { step: 2, description: 'Laparoscopic access and adhesiolysis', instruments: ['Trocars', 'Scissors'], keyPoints: ['Careful dissection', 'Identify anatomy'] },
          { step: 3, description: 'Unlock and remove band externally', instruments: ['Graspers'], keyPoints: ['Cut tubing', 'Extract band'] },
          { step: 4, description: 'Remove intragastric portion endoscopically or surgically', instruments: ['Endoscope', 'Graspers'], keyPoints: ['Complete removal', 'Avoid perforation'] },
          { step: 5, description: 'Repair gastric defect', instruments: ['Suture'], keyPoints: ['Oversew opening', 'Two-layer closure'] },
          { step: 6, description: 'Remove port and test repair', instruments: ['Graspers', 'Suction'], keyPoints: ['Leak test', 'Hemostasis'] }
        ],
        medications: {
          antibiotics: ['Broad-spectrum antibiotics']
        },
        complications: ['Perforation', 'Leak', 'Bleeding', 'Peritonitis', 'Abscess'],
        tips: ['Combined endoscopic-laparoscopic approach', 'Repair gastric defect carefully', 'Broad-spectrum antibiotics', 'May need gastrostomy']
      },
      {
        name: 'Laparoscopic Gastric Pouch Revision',
        specialtyId: getSpecialtyId('Bariatric Surgery'),
        description: 'Revision of dilated gastric pouch after Roux-en-Y gastric bypass',
        duration: '120-180 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine, reverse Trendelenburg' },
        draping: { standard: 'Standard laparoscopic draping' },
        instruments: {
          basicSets: ['Laparoscopic set', 'Bariatric instruments'],
          specialInstruments: ['Trocars', 'Staplers', 'Harmonic scalpel', 'Suture', 'Endoscope'],
          energyDevices: ['Harmonic scalpel']
        },
        mayoSetup: {
          essential: ['Staplers', 'Suture', 'Harmonic scalpel', 'Endoscope'],
          positioning: 'Staplers ready, endoscope available'
        },
        procedureSteps: [
          { step: 1, description: 'Upper endoscopy to assess pouch and anastomosis', instruments: ['Endoscope'], keyPoints: ['Measure size', 'Check for ulcer'] },
          { step: 2, description: 'Laparoscopic access and adhesiolysis', instruments: ['Trocars', 'Scissors'], keyPoints: ['Safe entry', 'Expose pouch'] },
          { step: 3, description: 'Reduce pouch size with staplers', instruments: ['Staplers'], keyPoints: ['Resect along lesser curve', 'Create smaller pouch'] },
          { step: 4, description: 'Revise anastomosis if dilated', instruments: ['Suture', 'Staplers'], keyPoints: ['Reduce diameter', 'Maintain patency'] },
          { step: 5, description: 'Test revision and close', instruments: ['Suction', 'Endoscope'], keyPoints: ['Leak test', 'Verify size'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV'],
          testing: ['Leak test solution']
        },
        complications: ['Leak', 'Stricture', 'Bleeding', 'Inadequate restriction', 'Marginal ulcer'],
        tips: ['Upper endoscopy essential', 'Careful staple line', 'Address anastomotic dilation', 'Realistic expectations']
      },
      {
        name: 'Endoscopic Transoral Outlet Reduction (TORe)',
        specialtyId: getSpecialtyId('Bariatric Surgery'),
        description: 'Endoscopic suturing to reduce dilated gastrojejunal anastomosis',
        duration: '45-60 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine or left lateral' },
        draping: { standard: 'Minimal draping for endoscopic procedure' },
        instruments: {
          basicSets: [],
          specialInstruments: ['Endoscope', 'Suture'],
        },
        mayoSetup: {
          essential: ['Endoscope', 'Endoscopic suturing device', 'Suture'],
          positioning: 'Endoscopic tower setup with suturing capability'
        },
        procedureSteps: [
          { step: 1, description: 'Upper endoscopy to measure outlet', instruments: ['Endoscope'], keyPoints: ['Assess dilation', 'Check for ulcer'] },
          { step: 2, description: 'Place purse-string sutures around outlet', instruments: ['Endoscope', 'Suture'], keyPoints: ['Full-thickness bites', 'Circumferential'] },
          { step: 3, description: 'Tighten sutures to reduce diameter', instruments: ['Suture'], keyPoints: ['Target 8-12mm', 'Maintain patency'] },
          { step: 4, description: 'Verify reduction and hemostasis', instruments: ['Endoscope'], keyPoints: ['Confirm size', 'No bleeding'] }
        ],
        medications: {
          antibiotics: ['Prophylactic antibiotics'],
          sedation: ['General anesthesia or deep sedation']
        },
        complications: ['Bleeding', 'Perforation', 'Stricture', 'Inadequate reduction', 'Recurrent dilation'],
        tips: ['Requires specialized training', 'Outpatient procedure', 'Less invasive than surgery', 'May need repeat procedures']
      },
      {
        name: 'Laparoscopic Gastric Plication Reversal',
        specialtyId: getSpecialtyId('Bariatric Surgery'),
        description: 'Reversal of previous gastric plication for complications',
        duration: '90-120 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Supine, reverse Trendelenburg' },
        draping: { standard: 'Standard laparoscopic draping' },
        instruments: {
          basicSets: ['Laparoscopic set'],
          specialInstruments: ['Trocars', 'Graspers', 'Scissors', 'Harmonic scalpel'],
          energyDevices: ['Harmonic scalpel']
        },
        mayoSetup: {
          essential: ['Graspers', 'Scissors', 'Harmonic scalpel'],
          positioning: 'Cutting instruments ready for suture division'
        },
        procedureSteps: [
          { step: 1, description: 'Access abdomen and identify plication', instruments: ['Trocars', 'Laparoscope'], keyPoints: ['Safe entry', 'Assess anatomy'] },
          { step: 2, description: 'Carefully divide plication sutures', instruments: ['Scissors', 'Harmonic scalpel'], keyPoints: ['Avoid perforation', 'Complete release'] },
          { step: 3, description: 'Inspect stomach for injury', instruments: ['Laparoscope'], keyPoints: ['Check integrity', 'Assess viability'] },
          { step: 4, description: 'Repair any defects', instruments: ['Suture'], keyPoints: ['Oversew if needed', 'Ensure hemostasis'] },
          { step: 5, description: 'Test for leaks and close', instruments: ['Suction'], keyPoints: ['Air or dye test', 'Verify closure'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV']
        },
        complications: ['Perforation', 'Bleeding', 'Leak', 'Adhesions', 'Gastric injury'],
        tips: ['Careful dissection essential', 'Watch for perforations', 'Plication fully reversible', 'May convert to other procedure']
      },
      {
        name: 'Laparoscopic Cholecystectomy in Bariatric Patient',
        specialtyId: getSpecialtyId('Bariatric Surgery'),
        description: 'Gallbladder removal in morbidly obese patient or during bariatric surgery',
        duration: '45-90 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Supine, reverse Trendelenburg' },
        draping: { standard: 'Standard laparoscopic draping' },
        instruments: {
          basicSets: ['Laparoscopic set', 'Bariatric instruments'],
          specialInstruments: ['Trocars', 'Graspers', 'Clips', 'Harmonic scalpel'],
          energyDevices: ['Harmonic scalpel', 'Electrocautery']
        },
        mayoSetup: {
          essential: ['Trocars', 'Graspers', 'Clips', 'Harmonic scalpel'],
          positioning: 'Standard cholecystectomy setup adapted for bariatric'
        },
        procedureSteps: [
          { step: 1, description: 'Create pneumoperitoneum with higher pressure', instruments: ['Trocars'], keyPoints: ['May need 18-20mmHg', 'Adequate exposure'] },
          { step: 2, description: 'Place trocars with modified positions', instruments: ['Trocars'], keyPoints: ['Account for body habitus', 'Liver retraction'] },
          { step: 3, description: 'Dissect Calots triangle', instruments: ['Graspers', 'Harmonic scalpel'], keyPoints: ['Critical view', 'Thick adhesions common'] },
          { step: 4, description: 'Clip and divide cystic structures', instruments: ['Clips', 'Scissors'], keyPoints: ['Ensure proper identification', 'Double clipping'] },
          { step: 5, description: 'Dissect gallbladder from liver bed', instruments: ['Harmonic scalpel', 'Electrocautery'], keyPoints: ['Hemostasis', 'Complete removal'] },
          { step: 6, description: 'Extract specimen and close', instruments: ['Graspers', 'Suture'], keyPoints: ['Specimen bag', 'Fascial closure'] }
        ],
        medications: {
          antibiotics: ['Cefazolin 2g IV or weight-based dosing']
        },
        complications: ['Bile duct injury', 'Bleeding', 'Conversion to open', 'Wound infection', 'Retained stones'],
        tips: ['Higher pneumoperitoneum pressures', 'Longer instruments may be needed', 'Patient positioning critical', 'Consider simultaneous with bariatric procedure']
      },
      {
        name: 'Aspiration Therapy Device Placement',
        specialtyId: getSpecialtyId('Bariatric Surgery'),
        description: 'Endoscopic placement of gastrostomy tube for aspiration therapy',
        duration: '30-45 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Supine' },
        draping: { standard: 'Abdominal prep and draping' },
        instruments: {
          basicSets: [],
          specialInstruments: ['Endoscope', 'Aspiration device', 'Suture'],
        },
        mayoSetup: {
          essential: ['Endoscope', 'Aspiration device', 'Skin incision instruments'],
          positioning: 'Endoscope ready, device prepared for placement'
        },
        procedureSteps: [
          { step: 1, description: 'Perform upper endoscopy', instruments: ['Endoscope'], keyPoints: ['Transilluminate abdominal wall', 'Select site'] },
          { step: 2, description: 'Make small incision and insert device', instruments: ['Scalpel', 'Aspiration device'], keyPoints: ['Left upper abdomen', 'Through stomach wall'] },
          { step: 3, description: 'Secure device internally and externally', instruments: ['Aspiration device'], keyPoints: ['Gastropexy', 'Skin-level valve'] },
          { step: 4, description: 'Verify position endoscopically', instruments: ['Endoscope'], keyPoints: ['Confirm placement', 'No complications'] }
        ],
        medications: {
          antibiotics: ['Prophylactic antibiotics']
        },
        complications: ['Infection', 'Tube displacement', 'Bleeding', 'Peritonitis', 'Buried bumper'],
        tips: ['Requires ongoing use', '20-30% calories aspirated', 'Device maintenance important', 'Behavioral modification adjunct']
      },
      {
        name: 'Laparoscopic Treatment of Gastrogastric Fistula',
        specialtyId: getSpecialtyId('Bariatric Surgery'),
        description: 'Repair of fistula between gastric pouch and remnant stomach',
        duration: '120-180 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine, reverse Trendelenburg' },
        draping: { standard: 'Standard laparoscopic draping' },
        instruments: {
          basicSets: ['Laparoscopic set', 'Bariatric instruments'],
          specialInstruments: ['Trocars', 'Staplers', 'Harmonic scalpel', 'Suture', 'Clips'],
          energyDevices: ['Harmonic scalpel']
        },
        mayoSetup: {
          essential: ['Staplers', 'Suture', 'Harmonic scalpel', 'Clips'],
          positioning: 'Complex revision setup with multiple options'
        },
        procedureSteps: [
          { step: 1, description: 'Extensive adhesiolysis to expose anatomy', instruments: ['Scissors', 'Harmonic scalpel'], keyPoints: ['Careful dissection', 'Identify fistula'] },
          { step: 2, description: 'Define pouch, remnant, and fistula tract', instruments: ['Graspers', 'Laparoscope'], keyPoints: ['Complete visualization', 'Plan repair'] },
          { step: 3, description: 'Excise fistula tract', instruments: ['Staplers', 'Harmonic scalpel'], keyPoints: ['Complete excision', 'Healthy margins'] },
          { step: 4, description: 'Repair or resect involved stomach', instruments: ['Staplers', 'Suture'], keyPoints: ['Separate closures', 'Tension-free'] },
          { step: 5, description: 'Interpose tissue between repairs', instruments: ['Suture'], keyPoints: ['Omentum or falciform', 'Prevent recurrence'] },
          { step: 6, description: 'Test repairs and drain', instruments: ['Suction'], keyPoints: ['Leak test', 'Drain placement'] }
        ],
        medications: {
          antibiotics: ['Broad-spectrum antibiotics']
        },
        complications: ['Recurrent fistula', 'Leak', 'Stricture', 'Bleeding', 'Abscess'],
        tips: ['Complex revision case', 'Consider tissue interposition', 'May need conversion to Roux-en-Y', 'Drain usually indicated']
      },
      {
        name: 'Endoscopic Suturing of Gastric Leak',
        specialtyId: getSpecialtyId('Bariatric Surgery'),
        description: 'Endoscopic repair of post-bariatric surgery gastric leak',
        duration: '60-90 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine or left lateral' },
        draping: { standard: 'Minimal draping for endoscopic approach' },
        instruments: {
          basicSets: [],
          specialInstruments: ['Endoscope', 'Suture', 'Clips'],
        },
        mayoSetup: {
          essential: ['Endoscope', 'Endoscopic suturing device', 'Clips', 'Stent'],
          positioning: 'Endoscopic tower with advanced therapeutic capability'
        },
        procedureSteps: [
          { step: 1, description: 'Upper endoscopy to identify and assess leak', instruments: ['Endoscope'], keyPoints: ['Locate defect', 'Assess size and edges'] },
          { step: 2, description: 'Debride and freshen leak edges', instruments: ['Endoscope'], keyPoints: ['Remove debris', 'Healthy tissue'] },
          { step: 3, description: 'Place endoscopic sutures or clips', instruments: ['Suture', 'Clips'], keyPoints: ['Full-thickness bites', 'Close defect'] },
          { step: 4, description: 'Consider stent placement if indicated', instruments: ['Endoscope'], keyPoints: ['Cover leak', 'Divert flow'] },
          { step: 5, description: 'Verify closure', instruments: ['Endoscope'], keyPoints: ['No active leak', 'Document repair'] }
        ],
        medications: {
          antibiotics: ['Broad-spectrum antibiotics'],
          nutrition: ['Enteral nutrition per guidelines']
        },
        complications: ['Persistent leak', 'Stricture', 'Bleeding', 'Perforation', 'Stent migration'],
        tips: ['Early intervention preferred', 'Multiple modalities may be needed', 'Drainage essential', 'Nutritional support critical']
      },

      // ==================== CARDIOTHORACIC (20 procedures) ====================
      {
        name: 'Coronary Artery Bypass Grafting (CABG)',
        specialtyId: getSpecialtyId('Cardiothoracic'),
        description: 'Surgical revascularization using arterial and venous grafts to bypass coronary stenosis',
        duration: '180-300 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine with arms tucked, shoulders rolled back, legs prepped for vein harvest' },
        draping: { standard: 'Full sterile draping from chin to toes, chest and legs exposed' },
        instruments: {
          basicSets: ['Cardiac surgery set', 'Cardiovascular set'],
          specialInstruments: ['Cardiopulmonary bypass', 'Bypass pump', 'Cardioplegia setup', 'Cannulae', 'Vascular clamps'],
          energyDevices: ['Electrocautery', 'Harmonic scalpel']
        },
        mayoSetup: {
          essential: ['Vascular instruments', 'Cannulae', 'Cardioplegia', 'Grafts', 'Suture'],
          positioning: 'Bypass circuit ready, cardioplegia prepared, grafts organized'
        },
        procedureSteps: [
          { step: 1, description: 'Median sternotomy and harvest grafts', instruments: ['Electrocautery', 'Harmonic scalpel'], keyPoints: ['LIMA preferred', 'Saphenous vein harvest'] },
          { step: 2, description: 'Systemic heparinization', instruments: [], keyPoints: ['ACT >400 seconds', 'Verify anticoagulation'] },
          { step: 3, description: 'Cannulate aorta and right atrium for bypass', instruments: ['Cannulae', 'Vascular instruments'], keyPoints: ['Purse-string sutures', 'Secure cannulation'] },
          { step: 4, description: 'Initiate cardiopulmonary bypass', instruments: ['Bypass pump'], keyPoints: ['Gradual flow increase', 'Monitor perfusion'] },
          { step: 5, description: 'Cross-clamp aorta and deliver cardioplegia', instruments: ['Vascular clamps', 'Cardioplegia setup'], keyPoints: ['Arrest heart', 'Myocardial protection'] },
          { step: 6, description: 'Perform distal anastomoses to coronary arteries', instruments: ['Vascular instruments', 'Suture'], keyPoints: ['Precision suturing', 'Multiple grafts'] },
          { step: 7, description: 'Remove cross-clamp and perform proximal anastomoses', instruments: ['Vascular instruments', 'Suture'], keyPoints: ['Side-biting clamp', 'Aortic anastomoses'] },
          { step: 8, description: 'Wean from bypass and achieve hemostasis', instruments: [], keyPoints: ['De-air heart', 'Reverse heparin'] },
          { step: 9, description: 'Close sternum and chest', instruments: ['Suture', 'Hemostats'], keyPoints: ['Sternal wires', 'Chest tubes'] }
        ],
        medications: {
          anticoagulation: ['Heparin', 'Protamine reversal'],
          cardioplegia: ['Cold blood cardioplegia', 'Del Nido cardioplegia'],
          antibiotics: ['Cefazolin 2g IV'],
          anesthesia: ['General anesthesia with TEE monitoring']
        },
        complications: ['Bleeding', 'Myocardial infarction', 'Stroke', 'Renal failure', 'Arrhythmias', 'Graft failure', 'Sternal infection'],
        tips: ['LIMA to LAD preferred', 'Complete revascularization goal', 'Careful myocardial protection', 'TEE monitoring essential', 'Maintain ACT >400']
      },
      {
        name: 'Aortic Valve Replacement',
        specialtyId: getSpecialtyId('Cardiothoracic'),
        description: 'Replacement of diseased aortic valve with mechanical or bioprosthetic valve',
        duration: '150-240 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine with arms tucked' },
        draping: { standard: 'Sterile chest draping from chin to umbilicus' },
        instruments: {
          basicSets: ['Cardiac surgery set', 'Cardiovascular set'],
          specialInstruments: ['Cardiopulmonary bypass', 'Valve instruments', 'Prosthetic valves', 'Cannulae'],
        },
        mayoSetup: {
          essential: ['Valve sizers', 'Prosthetic valve', 'Valve sutures', 'Valve holders'],
          positioning: 'Valve instruments on right, bypass equipment ready'
        },
        procedureSteps: [
          { step: 1, description: 'Median sternotomy and cannulation', instruments: ['Electrocautery', 'Cannulae'], keyPoints: ['Standard approach', 'Arterial and venous cannulation'] },
          { step: 2, description: 'Initiate bypass and cardioplegic arrest', instruments: ['Bypass pump', 'Cardioplegia setup'], keyPoints: ['Myocardial protection', 'Empty heart'] },
          { step: 3, description: 'Aortotomy and valve exposure', instruments: ['Vascular instruments', 'Retractors'], keyPoints: ['Transverse aortotomy', 'Visualize valve'] },
          { step: 4, description: 'Excise diseased valve and decalcify annulus', instruments: ['Valve instruments', 'Scissors'], keyPoints: ['Remove all leaflets', 'Clear calcium'] },
          { step: 5, description: 'Size annulus and select prosthesis', instruments: ['Valve sizers'], keyPoints: ['Accurate sizing', 'Avoid patient-prosthesis mismatch'] },
          { step: 6, description: 'Suture prosthetic valve in place', instruments: ['Valve sutures', 'Prosthetic valves'], keyPoints: ['Interrupted or pledgeted sutures', 'Secure seating'] },
          { step: 7, description: 'Close aortotomy and de-air heart', instruments: ['Suture'], keyPoints: ['Two-layer closure', 'Complete air removal'] },
          { step: 8, description: 'Wean from bypass and close', instruments: [], keyPoints: ['TEE verification', 'Hemostasis'] }
        ],
        medications: {
          anticoagulation: ['Heparin', 'Protamine'],
          cardioplegia: ['Blood cardioplegia'],
          antibiotics: ['Cefazolin 2g IV'],
          anticoagulation_longterm: ['Warfarin for mechanical valve']
        },
        complications: ['Bleeding', 'Paravalvular leak', 'Heart block', 'Stroke', 'Prosthesis dysfunction', 'Endocarditis'],
        tips: ['Complete decalcification essential', 'Avoid annular tears', 'Proper valve sizing critical', 'TEE confirms function', 'Warfarin needed for mechanical']
      },
      {
        name: 'Mitral Valve Repair',
        specialtyId: getSpecialtyId('Cardiothoracic'),
        description: 'Surgical repair of mitral valve for regurgitation or stenosis',
        duration: '180-300 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine with right chest slightly elevated' },
        draping: { standard: 'Standard cardiac draping' },
        instruments: {
          basicSets: ['Cardiac surgery set'],
          specialInstruments: ['Cardiopulmonary bypass', 'Valve instruments', 'Annuloplasty ring', 'Cannulae'],
        },
        mayoSetup: {
          essential: ['Valve instruments', 'Annuloplasty rings', 'Suture', 'Scissors'],
          positioning: 'Valve repair instruments organized, rings sized and ready'
        },
        procedureSteps: [
          { step: 1, description: 'Sternotomy, cannulation, and bypass initiation', instruments: ['Cannulae', 'Bypass pump'], keyPoints: ['Bicaval cannulation', 'TEE guidance'] },
          { step: 2, description: 'Left atriotomy to expose mitral valve', instruments: ['Scissors', 'Retractors'], keyPoints: ['Superior approach', 'Retract atrium'] },
          { step: 3, description: 'Assess valve pathology', instruments: ['Valve instruments'], keyPoints: ['Identify prolapse or restriction', 'Plan repair'] },
          { step: 4, description: 'Perform leaflet repair as needed', instruments: ['Suture', 'Scissors'], keyPoints: ['Resection or chordal transfer', 'Preserve tissue'] },
          { step: 5, description: 'Place annuloplasty ring', instruments: ['Annuloplasty ring', 'Suture'], keyPoints: ['Size appropriately', 'Interrupted sutures'] },
          { step: 6, description: 'Test repair with saline injection', instruments: ['Suction', 'Suture'], keyPoints: ['Check competence', 'No residual leak'] },
          { step: 7, description: 'Close atriotomy and de-air', instruments: ['Suture'], keyPoints: ['Continuous closure', 'Air removal'] },
          { step: 8, description: 'Wean from bypass and verify with TEE', instruments: [], keyPoints: ['Assess function', 'No MR'] }
        ],
        medications: {
          anticoagulation: ['Heparin', 'Protamine'],
          cardioplegia: ['Blood cardioplegia'],
          antibiotics: ['Cefazolin 2g IV']
        },
        complications: ['Residual MR', 'SAM (systolic anterior motion)', 'Heart block', 'Bleeding', 'Repair failure requiring replacement'],
        tips: ['TEE essential for assessment', 'Preserve leaflet tissue when possible', 'Ring size important', 'Test repair before closing', 'Repair preferred over replacement']
      },
      {
        name: 'Tricuspid Valve Repair',
        specialtyId: getSpecialtyId('Cardiothoracic'),
        description: 'Repair of tricuspid valve regurgitation, often with annuloplasty',
        duration: '120-180 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine' },
        draping: { standard: 'Standard cardiac draping' },
        instruments: {
          basicSets: ['Cardiac surgery set'],
          specialInstruments: ['Cardiopulmonary bypass', 'Valve instruments', 'Annuloplasty ring'],
        },
        mayoSetup: {
          essential: ['Valve instruments', 'Tricuspid rings', 'Suture'],
          positioning: 'Ring sizers ready, valve instruments accessible'
        },
        procedureSteps: [
          { step: 1, description: 'Sternotomy and bypass initiation', instruments: ['Cannulae', 'Bypass pump'], keyPoints: ['Bicaval cannulation', 'Empty RA'] },
          { step: 2, description: 'Right atriotomy', instruments: ['Scissors'], keyPoints: ['Oblique incision', 'Expose valve'] },
          { step: 3, description: 'Assess tricuspid valve', instruments: ['Valve instruments'], keyPoints: ['Annular dilation', 'Leaflet pathology'] },
          { step: 4, description: 'DeVega annuloplasty or ring placement', instruments: ['Suture', 'Annuloplasty ring'], keyPoints: ['Size annulus', 'Secure fixation'] },
          { step: 5, description: 'Close atriotomy', instruments: ['Suture'], keyPoints: ['Two-layer closure', 'Air removal'] },
          { step: 6, description: 'Wean from bypass and verify', instruments: [], keyPoints: ['TEE assessment', 'No residual TR'] }
        ],
        medications: {
          anticoagulation: ['Heparin', 'Protamine'],
          cardioplegia: ['Blood cardioplegia']
        },
        complications: ['Heart block', 'Residual TR', 'Bleeding', 'Right heart failure'],
        tips: ['Often combined with other valve surgery', 'Annular dilation common', 'Ring size based on anterior leaflet', 'Preserve conduction system']
      },
      {
        name: 'Atrial Septal Defect (ASD) Closure',
        specialtyId: getSpecialtyId('Cardiothoracic'),
        description: 'Surgical closure of atrial septal defect',
        duration: '120-180 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Supine' },
        draping: { standard: 'Standard cardiac draping' },
        instruments: {
          basicSets: ['Cardiac surgery set'],
          specialInstruments: ['Cardiopulmonary bypass', 'Cannulae', 'Suture'],
        },
        mayoSetup: {
          essential: ['Cardiovascular instruments', 'Patch material', 'Suture'],
          positioning: 'Patch ready, sutures organized'
        },
        procedureSteps: [
          { step: 1, description: 'Median sternotomy or right thoracotomy', instruments: ['Electrocautery'], keyPoints: ['Minimally invasive option', 'Cosmetic approach'] },
          { step: 2, description: 'Cannulate and initiate bypass', instruments: ['Cannulae', 'Bypass pump'], keyPoints: ['Bicaval cannulation', 'Good venous drainage'] },
          { step: 3, description: 'Right atriotomy to expose defect', instruments: ['Scissors'], keyPoints: ['Visualize ASD', 'Assess size'] },
          { step: 4, description: 'Primary closure or patch repair', instruments: ['Suture'], keyPoints: ['Small defects: primary', 'Large defects: patch'] },
          { step: 5, description: 'Close atriotomy and de-air', instruments: ['Suture'], keyPoints: ['Complete air removal', 'TEE verification'] },
          { step: 6, description: 'Wean from bypass', instruments: [], keyPoints: ['No residual shunt', 'Normal rhythm'] }
        ],
        medications: {
          anticoagulation: ['Heparin', 'Protamine'],
          antibiotics: ['Cefazolin 2g IV']
        },
        complications: ['Residual shunt', 'Arrhythmias', 'Heart block', 'Bleeding'],
        tips: ['TEE guides closure', 'Watch for anomalous veins', 'Avoid sinus node', 'Assess for PFO']
      },
      {
        name: 'Ventricular Septal Defect (VSD) Repair',
        specialtyId: getSpecialtyId('Cardiothoracic'),
        description: 'Surgical patch closure of ventricular septal defect',
        duration: '180-240 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine' },
        draping: { standard: 'Standard cardiac draping' },
        instruments: {
          basicSets: ['Cardiac surgery set'],
          specialInstruments: ['Cardiopulmonary bypass', 'Cannulae', 'Suture'],
        },
        mayoSetup: {
          essential: ['Patch material', 'Pledgeted sutures', 'Cardiovascular instruments'],
          positioning: 'Patches ready, sutures prepared'
        },
        procedureSteps: [
          { step: 1, description: 'Median sternotomy and cannulation', instruments: ['Cannulae'], keyPoints: ['Standard approach', 'Prepare for arrest'] },
          { step: 2, description: 'Initiate bypass and cardioplegic arrest', instruments: ['Bypass pump', 'Cardioplegia setup'], keyPoints: ['Myocardial protection', 'Empty ventricles'] },
          { step: 3, description: 'Expose VSD via right atrium or ventriculotomy', instruments: ['Scissors', 'Retractors'], keyPoints: ['Transatrial approach preferred', 'Visualize defect'] },
          { step: 4, description: 'Place patch with pledgeted sutures', instruments: ['Suture'], keyPoints: ['Avoid conduction system', 'Secure closure'] },
          { step: 5, description: 'Close approach and de-air', instruments: ['Suture'], keyPoints: ['Careful closure', 'Complete air removal'] },
          { step: 6, description: 'Wean from bypass', instruments: [], keyPoints: ['TEE verify no shunt', 'Monitor rhythm'] }
        ],
        medications: {
          anticoagulation: ['Heparin', 'Protamine'],
          cardioplegia: ['Blood cardioplegia']
        },
        complications: ['Complete heart block', 'Residual VSD', 'Arrhythmias', 'RV dysfunction', 'Tricuspid regurgitation'],
        tips: ['Avoid bundle of His', 'Transatrial approach safer', 'TEE confirms closure', 'Monitor for heart block']
      },
      {
        name: 'Thoracic Aortic Aneurysm Repair',
        specialtyId: getSpecialtyId('Cardiothoracic'),
        description: 'Replacement of thoracic aorta with synthetic graft',
        duration: '240-360 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine, possible lateral for descending' },
        draping: { standard: 'Wide chest draping, groin access if needed' },
        instruments: {
          basicSets: ['Cardiac surgery set', 'Vascular instruments'],
          specialInstruments: ['Cardiopulmonary bypass', 'Grafts', 'Vascular clamps', 'Cannulae'],
        },
        mayoSetup: {
          essential: ['Synthetic grafts', 'Vascular clamps', 'Vascular instruments'],
          positioning: 'Multiple graft sizes ready, clamps accessible'
        },
        procedureSteps: [
          { step: 1, description: 'Sternotomy or thoracotomy based on location', instruments: ['Electrocautery'], keyPoints: ['Ascending: sternotomy', 'Descending: thoracotomy'] },
          { step: 2, description: 'Cannulate for bypass with hypothermic circulatory arrest if needed', instruments: ['Cannulae', 'Bypass pump'], keyPoints: ['Femoral or axillary cannulation', 'Cooling protocol'] },
          { step: 3, description: 'Cross-clamp and open aneurysm', instruments: ['Vascular clamps', 'Scissors'], keyPoints: ['Proximal and distal control', 'Identify extent'] },
          { step: 4, description: 'Resect aneurysm and select graft', instruments: ['Scissors', 'Grafts'], keyPoints: ['Appropriate diameter', 'Dacron or PTFE'] },
          { step: 5, description: 'Anastomose graft proximally and distally', instruments: ['Vascular instruments', 'Suture'], keyPoints: ['Running suture technique', 'Hemostatic sutures'] },
          { step: 6, description: 'Reimplant branch vessels if needed', instruments: ['Vascular instruments'], keyPoints: ['Arch vessels', 'Intercostals'] },
          { step: 7, description: 'De-air and reperfuse', instruments: [], keyPoints: ['Gradual rewarming', 'Monitor perfusion'] },
          { step: 8, description: 'Wean from bypass and achieve hemostasis', instruments: [], keyPoints: ['Meticulous hemostasis', 'Reverse heparin'] }
        ],
        medications: {
          anticoagulation: ['Heparin', 'Protamine'],
          neuroprotection: ['Thiopental for brain protection'],
          cardioplegia: ['Blood cardioplegia if ascending']
        },
        complications: ['Bleeding', 'Stroke', 'Spinal cord ischemia', 'Renal failure', 'Respiratory failure', 'Graft infection'],
        tips: ['Hypothermic arrest for arch', 'CSF drainage for descending', 'Monitor neurologic function', 'Spinal cord protection critical']
      },
      {
        name: 'Aortic Dissection Repair (Type A)',
        specialtyId: getSpecialtyId('Cardiothoracic'),
        description: 'Emergency repair of ascending aortic dissection',
        duration: '300-420 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine' },
        draping: { standard: 'Emergency cardiac draping, wide field' },
        instruments: {
          basicSets: ['Cardiac surgery set', 'Vascular instruments'],
          specialInstruments: ['Cardiopulmonary bypass', 'Grafts', 'Vascular clamps', 'Cannulae'],
        },
        mayoSetup: {
          essential: ['Synthetic grafts', 'Vascular clamps', 'Valve instruments if needed'],
          positioning: 'Emergency setup, multiple grafts ready'
        },
        procedureSteps: [
          { step: 1, description: 'Emergency median sternotomy', instruments: ['Electrocautery'], keyPoints: ['Rapid access', 'Control bleeding'] },
          { step: 2, description: 'Cannulate for bypass (axillary artery preferred)', instruments: ['Cannulae'], keyPoints: ['Avoid femoral in dissection', 'Bicaval venous'] },
          { step: 3, description: 'Initiate bypass and cooling for circulatory arrest', instruments: ['Bypass pump'], keyPoints: ['Deep hypothermia', 'Brain protection'] },
          { step: 4, description: 'Cross-clamp and open aorta', instruments: ['Vascular clamps', 'Scissors'], keyPoints: ['Identify dissection extent', 'Assess valve'] },
          { step: 5, description: 'Resect dissected aorta and replace with graft', instruments: ['Grafts', 'Suture'], keyPoints: ['Felt reinforcement', 'Reapproximate layers'] },
          { step: 6, description: 'Replace aortic valve if incompetent', instruments: ['Valve instruments', 'Prosthetic valves'], keyPoints: ['Valve-sparing if possible', 'Composite graft if needed'] },
          { step: 7, description: 'Reimplant coronaries and arch vessels', instruments: ['Vascular instruments'], keyPoints: ['Button technique', 'Ensure perfusion'] },
          { step: 8, description: 'Rewarm, reperfuse, and wean from bypass', instruments: [], keyPoints: ['Gradual rewarming', 'Hemostasis critical'] }
        ],
        medications: {
          anticoagulation: ['Heparin', 'Protamine'],
          neuroprotection: ['Hypothermia', 'Thiopental'],
          antihypertensives: ['Beta-blockers', 'Vasodilators']
        },
        complications: ['Death', 'Stroke', 'Bleeding', 'Renal failure', 'Spinal cord injury', 'Myocardial infarction', 'Limb ischemia'],
        tips: ['High mortality operation', 'Brain and spinal protection vital', 'Meticulous hemostasis', 'Felt reinforcement of suture lines', 'Blood pressure control postop']
      },
      {
        name: 'Off-Pump Coronary Artery Bypass (OPCAB)',
        specialtyId: getSpecialtyId('Cardiothoracic'),
        description: 'CABG performed on beating heart without cardiopulmonary bypass',
        duration: '180-300 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine' },
        draping: { standard: 'Standard cardiac draping' },
        instruments: {
          basicSets: ['Cardiac surgery set', 'Cardiovascular set'],
          specialInstruments: ['Heart stabilizers', 'Vascular instruments', 'Grafts'],
        },
        mayoSetup: {
          essential: ['Stabilizer device', 'Coronary shunts', 'Vascular instruments', 'Grafts'],
          positioning: 'Stabilizer ready, shunts available, grafts prepared'
        },
        procedureSteps: [
          { step: 1, description: 'Median sternotomy and graft harvest', instruments: ['Electrocautery'], keyPoints: ['LIMA dissection', 'Vein harvest'] },
          { step: 2, description: 'Systemic heparinization (lower dose)', instruments: [], keyPoints: ['ACT 250-300', 'Less than on-pump'] },
          { step: 3, description: 'Apply stabilizer to target coronary', instruments: ['Stabilizer'], keyPoints: ['Minimize motion', 'Maintain hemodynamics'] },
          { step: 4, description: 'Arteriotomy and place coronary shunt', instruments: ['Scissors', 'Shunt'], keyPoints: ['Small opening', 'Maintain flow'] },
          { step: 5, description: 'Perform anastomosis on beating heart', instruments: ['Vascular instruments', 'Suture'], keyPoints: ['Precision suturing', 'Manage bleeding'] },
          { step: 6, description: 'Repeat for each graft target', instruments: ['Stabilizer', 'Vascular instruments'], keyPoints: ['Reposition heart as needed', 'Monitor for ischemia'] },
          { step: 7, description: 'Achieve hemostasis and close', instruments: ['Hemostats', 'Suture'], keyPoints: ['Reverse heparin', 'Chest tubes'] }
        ],
        medications: {
          anticoagulation: ['Heparin (reduced dose)', 'Protamine'],
          antibiotics: ['Cefazolin 2g IV']
        },
        complications: ['Hemodynamic instability', 'Conversion to on-pump', 'Incomplete revascularization', 'Arrhythmias', 'Bleeding'],
        tips: ['Requires specialized stabilizer', 'Not for all patients', 'Avoid bypass-related complications', 'Technically demanding', 'Better for certain lesions']
      },
      {
        name: 'Minimally Invasive Direct Coronary Artery Bypass (MIDCAB)',
        specialtyId: getSpecialtyId('Cardiothoracic'),
        description: 'LIMA to LAD via small left thoracotomy without bypass',
        duration: '120-180 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine with left chest elevated' },
        draping: { standard: 'Left thoracotomy draping' },
        instruments: {
          basicSets: ['Cardiac surgery set'],
          specialInstruments: ['Stabilizer', 'Vascular instruments', 'Retractors'],
        },
        mayoSetup: {
          essential: ['Stabilizer', 'LIMA instruments', 'Vascular instruments'],
          positioning: 'Minimally invasive setup, stabilizer ready'
        },
        procedureSteps: [
          { step: 1, description: 'Small left anterolateral thoracotomy', instruments: ['Electrocautery', 'Retractors'], keyPoints: ['4th or 5th intercostal space', 'Avoid rib spreading'] },
          { step: 2, description: 'Harvest LIMA under direct vision', instruments: ['Electrocautery', 'Scissors'], keyPoints: ['Pedicled harvest', 'Preserve integrity'] },
          { step: 3, description: 'Open pericardium and identify LAD', instruments: ['Scissors'], keyPoints: ['Visualize target', 'Plan approach'] },
          { step: 4, description: 'Apply stabilizer to LAD territory', instruments: ['Stabilizer'], keyPoints: ['Immobilize area', 'Maintain perfusion'] },
          { step: 5, description: 'Perform LIMA-LAD anastomosis', instruments: ['Vascular instruments', 'Suture'], keyPoints: ['Precision suturing', 'Check flow'] },
          { step: 6, description: 'Release stabilizer and verify graft', instruments: [], keyPoints: ['Assess hemostasis', 'Graft patency'] },
          { step: 7, description: 'Close thoracotomy', instruments: ['Suture'], keyPoints: ['Chest tube', 'Pain control'] }
        ],
        medications: {
          anticoagulation: ['Heparin', 'Protamine'],
          antibiotics: ['Cefazolin 2g IV']
        },
        complications: ['Conversion to sternotomy', 'Graft failure', 'Bleeding', 'Pleural effusion', 'Incomplete revascularization'],
        tips: ['Best for isolated LAD disease', 'Cosmetic advantage', 'Faster recovery', 'Technically challenging', 'Limited to single vessel']
      },
      {
        name: 'Robotic Mitral Valve Repair',
        specialtyId: getSpecialtyId('Cardiothoracic'),
        description: 'Mitral valve repair using robotic surgical system',
        duration: '240-360 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine with right chest elevated' },
        draping: { standard: 'Right thoracotomy robotic draping' },
        instruments: {
          basicSets: ['Cardiac surgery set'],
          specialInstruments: ['Robotic instruments', 'Cardiopulmonary bypass', 'Valve instruments', 'Annuloplasty ring'],
        },
        mayoSetup: {
          essential: ['Robotic instruments', 'Valve sizers', 'Annuloplasty rings'],
          positioning: 'Robotic cart positioned, valve instruments ready'
        },
        procedureSteps: [
          { step: 1, description: 'Place robotic ports and camera', instruments: ['Trocars'], keyPoints: ['Right thoracotomy approach', '3-4 ports'] },
          { step: 2, description: 'Peripheral cannulation for bypass', instruments: ['Cannulae'], keyPoints: ['Femoral or neck vessels', 'Percutaneous if possible'] },
          { step: 3, description: 'Initiate bypass and cardioplegic arrest', instruments: ['Bypass pump', 'Cardioplegia setup'], keyPoints: ['Endoaortic balloon clamp', 'Myocardial protection'] },
          { step: 4, description: 'Left atriotomy using robotic instruments', instruments: ['Robotic instruments'], keyPoints: ['Superior approach', 'Visualize valve'] },
          { step: 5, description: 'Perform valve repair robotically', instruments: ['Robotic instruments', 'Suture'], keyPoints: ['Leaflet repair', 'Chordal work'] },
          { step: 6, description: 'Place annuloplasty ring', instruments: ['Robotic instruments', 'Annuloplasty ring'], keyPoints: ['Size and secure', 'Interrupted sutures'] },
          { step: 7, description: 'Close atriotomy and de-air', instruments: ['Robotic instruments', 'Suture'], keyPoints: ['Complete closure', 'Air removal'] },
          { step: 8, description: 'Wean from bypass and verify repair', instruments: [], keyPoints: ['TEE assessment', 'No MR'] }
        ],
        medications: {
          anticoagulation: ['Heparin', 'Protamine'],
          cardioplegia: ['Blood cardioplegia']
        },
        complications: ['Conversion to sternotomy', 'Repair failure', 'Bleeding', 'Groin complications', 'Technical malfunction'],
        tips: ['Steep learning curve', 'Excellent visualization', 'Minimally invasive benefits', 'Requires experienced team', 'TEE critical for guidance']
      },
      {
        name: 'Patent Ductus Arteriosus (PDA) Ligation',
        specialtyId: getSpecialtyId('Cardiothoracic'),
        description: 'Closure of patent ductus arteriosus, often in neonates',
        duration: '60-90 min',
        difficulty: 'Intermediate',
        positioning: { description: 'Right lateral decubitus' },
        draping: { standard: 'Left thoracotomy draping' },
        instruments: {
          basicSets: ['Thoracic set', 'Cardiovascular set'],
          specialInstruments: ['Vascular clamps', 'Clips', 'Suture'],
        },
        mayoSetup: {
          essential: ['Vascular clips', 'Silk ties', 'Vascular clamps'],
          positioning: 'Clips and ties ready, small instruments for neonates'
        },
        procedureSteps: [
          { step: 1, description: 'Left posterolateral thoracotomy', instruments: ['Electrocautery'], keyPoints: ['3rd or 4th intercostal space', 'Gentle retraction'] },
          { step: 2, description: 'Identify and dissect PDA', instruments: ['Scissors', 'Retractors'], keyPoints: ['Between aorta and PA', 'Avoid recurrent nerve'] },
          { step: 3, description: 'Ligate PDA with clips or suture', instruments: ['Clips', 'Suture'], keyPoints: ['Double ligation', 'Ensure complete closure'] },
          { step: 4, description: 'Verify no residual shunt', instruments: [], keyPoints: ['Palpate for thrill', 'Doppler if available'] },
          { step: 5, description: 'Close thoracotomy', instruments: ['Suture'], keyPoints: ['Chest tube', 'Layer closure'] }
        ],
        medications: {
          antibiotics: ['Cefazolin weight-based'],
          indomethacin: ['Medical closure option if failed']
        },
        complications: ['Bleeding', 'Recurrent nerve injury', 'Residual shunt', 'Recanalization', 'Chylothorax'],
        tips: ['Common in premature infants', 'Medical closure first-line', 'Surgical if medical fails', 'Avoid recurrent laryngeal nerve', 'High success rate']
      },
      {
        name: 'Coarctation of Aorta Repair',
        specialtyId: getSpecialtyId('Cardiothoracic'),
        description: 'Resection and repair of aortic coarctation',
        duration: '120-180 min',
        difficulty: 'Advanced',
        positioning: { description: 'Right lateral decubitus' },
        draping: { standard: 'Left thoracotomy draping' },
        instruments: {
          basicSets: ['Cardiovascular set', 'Thoracic set'],
          specialInstruments: ['Vascular clamps', 'Grafts', 'Suture'],
        },
        mayoSetup: {
          essential: ['Vascular clamps', 'Patch material', 'Vascular instruments'],
          positioning: 'Clamps organized, patch ready if needed'
        },
        procedureSteps: [
          { step: 1, description: 'Left posterolateral thoracotomy', instruments: ['Electrocautery'], keyPoints: ['4th intercostal space', 'Expose aorta'] },
          { step: 2, description: 'Mobilize aorta and identify coarctation', instruments: ['Scissors', 'Retractors'], keyPoints: ['Proximal and distal control', 'Assess length'] },
          { step: 3, description: 'Cross-clamp aorta above and below stenosis', instruments: ['Vascular clamps'], keyPoints: ['Proximal hypertension', 'Distal hypotension'] },
          { step: 4, description: 'Resect coarctation segment', instruments: ['Scissors'], keyPoints: ['Complete excision', 'Healthy margins'] },
          { step: 5, description: 'Perform end-to-end anastomosis or patch repair', instruments: ['Vascular instruments', 'Suture'], keyPoints: ['Tension-free', 'Growth potential'] },
          { step: 6, description: 'Remove clamps and verify patency', instruments: [], keyPoints: ['Check distal pulses', 'Monitor pressures'] },
          { step: 7, description: 'Close thoracotomy', instruments: ['Suture'], keyPoints: ['Chest tube', 'Pain control'] }
        ],
        medications: {
          anticoagulation: ['Heparin during clamping'],
          antihypertensives: ['Control proximal hypertension']
        },
        complications: ['Recoarctation', 'Paradoxical hypertension', 'Spinal cord ischemia', 'Bleeding', 'Aneurysm formation'],
        tips: ['End-to-end preferred in children', 'Patch for longer stenosis', 'Monitor lower extremity perfusion', 'Clamp time critical', 'Long-term HTN follow-up']
      },
      {
        name: 'Tetralogy of Fallot Repair',
        specialtyId: getSpecialtyId('Cardiothoracic'),
        description: 'Complete repair of tetralogy of Fallot with VSD closure and RVOT reconstruction',
        duration: '240-360 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine' },
        draping: { standard: 'Cardiac draping for pediatric case' },
        instruments: {
          basicSets: ['Cardiac surgery set'],
          specialInstruments: ['Cardiopulmonary bypass', 'Cannulae', 'Suture'],
        },
        mayoSetup: {
          essential: ['Patch materials', 'Pledgeted sutures', 'Pediatric instruments'],
          positioning: 'Small instruments, patches sized for pediatric'
        },
        procedureSteps: [
          { step: 1, description: 'Median sternotomy and cannulation', instruments: ['Cannulae'], keyPoints: ['Pediatric cannulae', 'Bicaval'] },
          { step: 2, description: 'Initiate bypass and cardioplegic arrest', instruments: ['Bypass pump', 'Cardioplegia setup'], keyPoints: ['Deep hypothermia', 'Myocardial protection'] },
          { step: 3, description: 'Close VSD through right atrium', instruments: ['Suture'], keyPoints: ['Transatrial approach', 'Avoid conduction system'] },
          { step: 4, description: 'Resect infundibular muscle', instruments: ['Scissors'], keyPoints: ['Relieve RVOT obstruction', 'Muscle bundles'] },
          { step: 5, description: 'Augment RVOT with patch', instruments: ['Suture'], keyPoints: ['Transannular if needed', 'Adequate size'] },
          { step: 6, description: 'De-air and rewarm', instruments: [], keyPoints: ['Complete air removal', 'Gradual rewarming'] },
          { step: 7, description: 'Wean from bypass', instruments: [], keyPoints: ['TEE verify repair', 'Monitor RV function'] }
        ],
        medications: {
          anticoagulation: ['Heparin', 'Protamine'],
          cardioplegia: ['Blood cardioplegia'],
          inotropes: ['Support RV function']
        },
        complications: ['Heart block', 'Pulmonary regurgitation', 'Residual VSD', 'RV failure', 'Arrhythmias'],
        tips: ['Complete repair in infancy', 'Avoid transannular patch if possible', 'Preserve pulmonary valve if able', 'Monitor for heart block', 'Long-term pulmonary regurgitation issue']
      },
      {
        name: 'Maze Procedure for Atrial Fibrillation',
        specialtyId: getSpecialtyId('Cardiothoracic'),
        description: 'Surgical ablation pattern to eliminate atrial fibrillation',
        duration: '120-180 min (added to other cardiac surgery)',
        difficulty: 'Advanced',
        positioning: { description: 'Supine' },
        draping: { standard: 'Standard cardiac draping' },
        instruments: {
          basicSets: ['Cardiac surgery set'],
          specialInstruments: ['Cardiopulmonary bypass', 'Ablation devices'],
        },
        mayoSetup: {
          essential: ['Ablation devices (cryothermy or RF)', 'Atrial instruments'],
          positioning: 'Ablation devices ready and tested'
        },
        procedureSteps: [
          { step: 1, description: 'Sternotomy and bypass (usually with other procedure)', instruments: ['Bypass pump'], keyPoints: ['Often with mitral valve surgery', 'Plan lesion set'] },
          { step: 2, description: 'Create lesion set on right atrium', instruments: ['Ablation devices'], keyPoints: ['Cavotricuspid isthmus', 'SVC to IVC'] },
          { step: 3, description: 'Create lesion set on left atrium', instruments: ['Ablation devices'], keyPoints: ['Pulmonary vein isolation', 'Mitral isthmus'] },
          { step: 4, description: 'Excise or exclude left atrial appendage', instruments: ['Scissors', 'Suture'], keyPoints: ['Stroke prevention', 'Complete exclusion'] },
          { step: 5, description: 'Complete primary procedure', instruments: [], keyPoints: ['Valve surgery etc.', 'Verify lesions'] },
          { step: 6, description: 'Wean from bypass in normal rhythm', instruments: [], keyPoints: ['Monitor rhythm', 'Avoid cardioversion if possible'] }
        ],
        medications: {
          anticoagulation: ['Warfarin or DOAC long-term'],
          antiarrhythmics: ['Amiodarone short-term']
        },
        complications: ['Persistent afib', 'Heart block', 'Bleeding', 'Thromboembolism', 'Sinus node dysfunction'],
        tips: ['Usually concomitant with valve surgery', 'Cryothermy or RF ablation', 'LAA exclusion important', 'Cox-Maze III gold standard', 'Rhythm monitoring essential']
      },
      {
        name: 'Pericardial Window for Effusion',
        specialtyId: getSpecialtyId('Cardiothoracic'),
        description: 'Creation of pericardial window to drain persistent effusion',
        duration: '45-90 min',
        difficulty: 'Basic',
        positioning: { description: 'Supine' },
        draping: { standard: 'Subxiphoid or left thoracotomy draping' },
        instruments: {
          basicSets: ['General surgery set', 'Thoracic set'],
          specialInstruments: ['Retractors', 'Suction'],
        },
        mayoSetup: {
          essential: ['Scissors', 'Retractors', 'Suction', 'Specimen container'],
          positioning: 'Simple setup, biopsy instruments if indicated'
        },
        procedureSteps: [
          { step: 1, description: 'Subxiphoid or left thoracotomy incision', instruments: ['Scalpel'], keyPoints: ['Subxiphoid preferred', 'Minimal invasive'] },
          { step: 2, description: 'Identify and open pericardium', instruments: ['Scissors'], keyPoints: ['Visualize heart', 'Avoid injury'] },
          { step: 3, description: 'Drain effusion and obtain samples', instruments: ['Suction'], keyPoints: ['Send for culture, cytology', 'Complete drainage'] },
          { step: 4, description: 'Create pericardial window', instruments: ['Scissors'], keyPoints: ['Adequate size', 'Prevent recurrence'] },
          { step: 5, description: 'Place drain and close', instruments: ['Suture'], keyPoints: ['Pericardial drain', 'Layer closure'] }
        ],
        medications: {
          antibiotics: ['Based on culture results']
        },
        complications: ['Bleeding', 'Infection', 'Recurrent effusion', 'Cardiac injury'],
        tips: ['Subxiphoid safer', 'Send fluid for studies', 'Biopsy if malignancy suspected', 'Drain until minimal output', 'Less invasive than pericardiectomy']
      },
      {
        name: 'Cardiac Tumor Resection',
        specialtyId: getSpecialtyId('Cardiothoracic'),
        description: 'Resection of intracardiac tumor, most commonly atrial myxoma',
        duration: '180-240 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine' },
        draping: { standard: 'Standard cardiac draping' },
        instruments: {
          basicSets: ['Cardiac surgery set'],
          specialInstruments: ['Cardiopulmonary bypass', 'Cannulae', 'Suture'],
        },
        mayoSetup: {
          essential: ['Tumor instruments', 'Patch material', 'Sutures'],
          positioning: 'Careful specimen handling, patch ready'
        },
        procedureSteps: [
          { step: 1, description: 'Median sternotomy and cannulation', instruments: ['Cannulae'], keyPoints: ['Bicaval for atrial tumor', 'Avoid embolization'] },
          { step: 2, description: 'Initiate bypass and cardioplegic arrest', instruments: ['Bypass pump', 'Cardioplegia setup'], keyPoints: ['Empty heart', 'Prevent embolization'] },
          { step: 3, description: 'Open appropriate chamber', instruments: ['Scissors'], keyPoints: ['Atrium for myxoma', 'Visualize tumor'] },
          { step: 4, description: 'Resect tumor with adequate margin', instruments: ['Scissors'], keyPoints: ['En bloc resection', 'Include stalk and attachment'] },
          { step: 5, description: 'Repair defect with patch if needed', instruments: ['Suture'], keyPoints: ['Reconstruct atrial septum', 'Ensure closure'] },
          { step: 6, description: 'Close chamber and de-air', instruments: ['Suture'], keyPoints: ['Complete air removal', 'Verify no residual tumor'] },
          { step: 7, description: 'Wean from bypass', instruments: [], keyPoints: ['TEE assessment', 'Normal function'] }
        ],
        medications: {
          anticoagulation: ['Heparin', 'Protamine'],
          cardioplegia: ['Blood cardioplegia']
        },
        complications: ['Embolization', 'Arrhythmias', 'AV block', 'Bleeding', 'Recurrence (rare)', 'Valve dysfunction'],
        tips: ['Myxoma most common', 'Avoid manipulation before bypass', 'Complete resection with margin', 'Send for pathology', 'Low recurrence if complete resection']
      },
      {
        name: 'Heart Transplantation',
        specialtyId: getSpecialtyId('Cardiothoracic'),
        description: 'Orthotopic heart transplantation for end-stage heart failure',
        duration: '360-480 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine' },
        draping: { standard: 'Standard cardiac draping' },
        instruments: {
          basicSets: ['Cardiac surgery set', 'Cardiovascular set'],
          specialInstruments: ['Cardiopulmonary bypass', 'Cannulae', 'Suture'],
        },
        mayoSetup: {
          essential: ['Cardiovascular instruments', 'Large sutures', 'Atrial clamps'],
          positioning: 'Complete transplant setup, donor heart preservation'
        },
        procedureSteps: [
          { step: 1, description: 'Median sternotomy and cannulation', instruments: ['Cannulae'], keyPoints: ['Bicaval cannulation', 'Prepare for explant'] },
          { step: 2, description: 'Initiate bypass and excise native heart', instruments: ['Bypass pump', 'Scissors'], keyPoints: ['Leave atrial cuffs', 'Preserve phrenic nerves'] },
          { step: 3, description: 'Prepare donor heart from preservation', instruments: [], keyPoints: ['Trim excess tissue', 'Inspect coronaries'] },
          { step: 4, description: 'Perform left atrial anastomosis', instruments: ['Suture'], keyPoints: ['Running suture', 'Ensure hemostasis'] },
          { step: 5, description: 'Perform right atrial or bicaval anastomosis', instruments: ['Suture'], keyPoints: ['Modern technique: bicaval', 'Preserve sinus node'] },
          { step: 6, description: 'Perform pulmonary artery anastomosis', instruments: ['Suture'], keyPoints: ['Appropriate length', 'No tension'] },
          { step: 7, description: 'Perform aortic anastomosis', instruments: ['Suture'], keyPoints: ['Last anastomosis', 'De-air during'] },
          { step: 8, description: 'Reperfuse and wean from bypass', instruments: [], keyPoints: ['Gradual reperfusion', 'TEE assessment'] }
        ],
        medications: {
          anticoagulation: ['Heparin', 'Protamine'],
          immunosuppression: ['Induction agents', 'Maintenance immunosuppression'],
          inotropes: ['Support new heart']
        },
        complications: ['Primary graft failure', 'Rejection', 'Infection', 'Bleeding', 'Renal failure', 'Arrhythmias', 'Coronary vasculopathy'],
        tips: ['Minimize ischemic time', 'Careful donor organ handling', 'Meticulous hemostasis', 'Immunosuppression critical', 'Long-term monitoring essential']
      },
      {
        name: 'Left Ventricular Assist Device (LVAD) Implantation',
        specialtyId: getSpecialtyId('Cardiothoracic'),
        description: 'Implantation of mechanical circulatory support device for heart failure',
        duration: '240-360 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine' },
        draping: { standard: 'Cardiac and abdominal draping for device' },
        instruments: {
          basicSets: ['Cardiac surgery set'],
          specialInstruments: ['Cardiopulmonary bypass', 'LVAD device and components', 'Cannulae'],
        },
        mayoSetup: {
          essential: ['LVAD pump', 'Inflow and outflow cannulae', 'Sewing rings', 'Drive line'],
          positioning: 'LVAD components organized, sterile field for device'
        },
        procedureSteps: [
          { step: 1, description: 'Median sternotomy and cannulation', instruments: ['Cannulae'], keyPoints: ['Standard cannulation', 'Prepare for bypass'] },
          { step: 2, description: 'Core LV apex for inflow cannula', instruments: ['Scissors'], keyPoints: ['Anterior apex', 'Pledgeted sutures'] },
          { step: 3, description: 'Attach LVAD inflow cannula to apex', instruments: ['Suture'], keyPoints: ['Secure attachment', 'No air'] },
          { step: 4, description: 'Anastomose outflow graft to ascending aorta', instruments: ['Suture'], keyPoints: ['Partial occlusion clamp', 'End-to-side'] },
          { step: 5, description: 'Create abdominal pocket for pump', instruments: ['Electrocautery'], keyPoints: ['Pre-peritoneal', 'Adequate size'] },
          { step: 6, description: 'Position pump in pocket', instruments: [], keyPoints: ['Stable position', 'No kinking'] },
          { step: 7, description: 'Tunnel drive line and secure', instruments: [], keyPoints: ['Avoid infection', 'Strain relief'] },
          { step: 8, description: 'De-air, initiate device, wean from bypass', instruments: [], keyPoints: ['Complete de-airing', 'Optimize settings'] }
        ],
        medications: {
          anticoagulation: ['Heparin', 'Warfarin long-term'],
          antiplatelet: ['Aspirin'],
          antibiotics: ['Broad-spectrum coverage']
        },
        complications: ['Bleeding', 'Thrombosis', 'Stroke', 'Device infection', 'Right heart failure', 'Driveline infection', 'Device malfunction'],
        tips: ['Bridge to transplant or destination therapy', 'Meticulous hemostasis', 'Anticoagulation critical', 'Driveline care essential', 'Patient education vital']
      },

      // ==================== CARDIOVASCULAR (20 procedures) ====================
      {
        name: 'Abdominal Aortic Aneurysm Repair (Open)',
        specialtyId: getSpecialtyId('Cardiovascular'),
        description: 'Open surgical repair of infrarenal abdominal aortic aneurysm with graft replacement',
        duration: '180-300 min',
        difficulty: 'Advanced',
        positioning: { description: 'Supine with arms extended' },
        draping: { standard: 'Prep from nipples to mid-thigh, wide abdominal draping' },
        instruments: {
          basicSets: ['Cardiovascular set', 'General surgery set'],
          specialInstruments: ['Vascular clamps', 'Grafts', 'Vascular instruments'],
          energyDevices: ['Electrocautery']
        },
        mayoSetup: {
          essential: ['Vascular clamps', 'Synthetic grafts', 'Vascular instruments', 'Suture'],
          positioning: 'Multiple clamp sizes ready, various graft sizes available'
        },
        procedureSteps: [
          { step: 1, description: 'Midline laparotomy incision', instruments: ['Scalpel', 'Electrocautery'], keyPoints: ['Xiphoid to pubis', 'Exposure critical'] },
          { step: 2, description: 'Mobilize small bowel and expose aorta', instruments: ['Retractors'], keyPoints: ['Divide ligament of Treitz', 'Retract bowel right'] },
          { step: 3, description: 'Control proximal aorta below renals', instruments: ['Vascular clamps'], keyPoints: ['Proximal control', 'Palpate renal arteries'] },
          { step: 4, description: 'Control iliac arteries distally', instruments: ['Vascular clamps'], keyPoints: ['Bilateral iliac control', 'Prevent backbleeding'] },
          { step: 5, description: 'Open aneurysm longitudinally', instruments: ['Scissors'], keyPoints: ['Incise anteriorly', 'Evacuate thrombus'] },
          { step: 6, description: 'Oversew lumbar arteries and IMA if patent', instruments: ['Suture'], keyPoints: ['Prevent backbleeding', 'Hemostasis'] },
          { step: 7, description: 'Sew graft proximally and distally', instruments: ['Grafts', 'Suture'], keyPoints: ['Running suture', 'Tube vs bifurcated graft'] },
          { step: 8, description: 'Restore flow and close aneurysm sac over graft', instruments: [], keyPoints: ['Gradual reperfusion', 'Wrap graft'] },
          { step: 9, description: 'Close abdomen in layers', instruments: ['Suture'], keyPoints: ['Mass closure', 'Prevent hernia'] }
        ],
        medications: {
          anticoagulation: ['Heparin before clamping', 'Protamine if needed'],
          antibiotics: ['Cefazolin 2g IV'],
          fluids: ['Adequate volume resuscitation']
        },
        complications: ['Bleeding', 'Graft infection', 'Renal failure', 'MI', 'Stroke', 'Ischemic colitis', 'Lower extremity ischemia', 'Spinal cord ischemia'],
        tips: ['Proximal clamp below renals preferred', 'Minimize clamp time', 'Monitor urine output', 'Check distal pulses', 'Consider cell saver']
      },
    ];

    console.log(`Inserting ${newProcedures.length} new procedures...`);
    const inserted = await db.insert(procedures).values(newProcedures).returning();
    console.log(`✅ Successfully inserted ${inserted.length} procedures`);
    return inserted.length;
    
  } catch (error) {
    console.error('❌ Error adding procedures:', error);
    throw error;
  }
}

export default add400Procedures;

// Only run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  add400Procedures()
    .then(() => {
      console.log('✅ Procedure insertion complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Failed to add procedures:', error);
      process.exit(1);
    });
}
