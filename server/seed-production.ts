import { db } from './db';
import { procedures } from '@shared/schema';
import { eq } from 'drizzle-orm';

/**
 * Production Database Seeding Script
 * Run this to populate production with all procedures
 * 
 * This script can be triggered via the admin endpoint:
 * POST /api/admin/seed-production
 */

export async function seedProductionProcedures(specialtyMap: Map<string, string>) {
  console.log('🌱 Starting production database seed...');
  
  const getSpecialtyId = (name: string) => specialtyMap.get(name)!;
  
  const allProcedures: any[] = [];

  // Bariatric Surgery Procedures (32 total)
  const bariatricProcs = [
    {
      name: 'Laparoscopic Roux-en-Y Gastric Bypass',
      description: 'Bariatric procedure creating small gastric pouch with Roux-en-Y reconstruction',
      duration: '120-180 min',
      difficulty: 'Advanced'
    },
    {
      name: 'Laparoscopic Sleeve Gastrectomy',
      description: 'Vertical gastrectomy removing 75-80% of stomach along greater curvature',
      duration: '60-90 min',
      difficulty: 'Intermediate'
    },
    {
      name: 'Adjustable Gastric Banding',
      description: 'Placement of adjustable silicone band around upper stomach',
      duration: '45-60 min',
      difficulty: 'Intermediate'
    },
    {
      name: 'Biliopancreatic Diversion with Duodenal Switch',
      description: 'Complex malabsorptive procedure with sleeve gastrectomy and intestinal rerouting',
      duration: '180-240 min',
      difficulty: 'Advanced'
    },
    {
      name: 'Revisional Bariatric Surgery',
      description: 'Revision of previous bariatric procedure due to complications or inadequate weight loss',
      duration: '120-240 min',
      difficulty: 'Advanced'
    },
    {
      name: 'Laparoscopic Gastric Band Removal',
      description: 'Removal of gastric band with or without conversion to another procedure',
      duration: '60-90 min',
      difficulty: 'Intermediate'
    },
    {
      name: 'Mini Gastric Bypass',
      description: 'Modified gastric bypass with single anastomosis',
      duration: '90-120 min',
      difficulty: 'Advanced'
    },
    {
      name: 'Endoscopic Sleeve Gastroplasty',
      description: 'Non-surgical endoscopic stomach reduction using suturing device',
      duration: '60-90 min',
      difficulty: 'Advanced'
    },
    {
      name: 'Intragastric Balloon Placement',
      description: 'Endoscopic placement of temporary gastric balloon for weight loss',
      duration: '20-30 min',
      difficulty: 'Basic'
    },
    {
      name: 'Gastric Bypass Reversal',
      description: 'Reversal of gastric bypass to normal anatomy',
      duration: '180-240 min',
      difficulty: 'Advanced'
    },
    {
      name: 'Laparoscopic Hiatal Hernia Repair with Sleeve',
      description: 'Combined hiatal hernia repair and sleeve gastrectomy',
      duration: '120-180 min',
      difficulty: 'Advanced'
    },
    {
      name: 'Band to Bypass Conversion',
      description: 'Removal of gastric band with conversion to gastric bypass',
      duration: '150-210 min',
      difficulty: 'Advanced'
    },
    {
      name: 'Sleeve to Bypass Conversion',
      description: 'Conversion of sleeve gastrectomy to gastric bypass',
      duration: '120-180 min',
      difficulty: 'Advanced'
    },
    {
      name: 'Laparoscopic Gastric Pouch Revision',
      description: 'Revision of dilated gastric pouch after bypass',
      duration: '90-150 min',
      difficulty: 'Advanced'
    },
    {
      name: 'Endoscopic Gastric Bypass Revision',
      description: 'Endoscopic revision of gastrojejunal anastomosis',
      duration: '45-90 min',
      difficulty: 'Intermediate'
    },
    {
      name: 'Single Anastomosis Duodeno-Ileal Bypass (SADI)',
      description: 'Modified duodenal switch with single anastomosis',
      duration: '150-210 min',
      difficulty: 'Advanced'
    },
    {
      name: 'Laparoscopic Greater Curvature Plication',
      description: 'Stomach folding procedure without resection',
      duration: '90-120 min',
      difficulty: 'Intermediate'
    },
    {
      name: 'Endoscopic Suturing for GERD Post-Bypass',
      description: 'Endoscopic treatment of reflux after bariatric surgery',
      duration: '60-90 min',
      difficulty: 'Advanced'
    },
    {
      name: 'Laparoscopic Internal Hernia Repair Post-Bypass',
      description: 'Repair of internal hernia following gastric bypass',
      duration: '90-150 min',
      difficulty: 'Advanced'
    },
    {
      name: 'Marginal Ulcer Repair',
      description: 'Surgical repair of marginal ulcer after gastric bypass',
      duration: '120-180 min',
      difficulty: 'Advanced'
    },
    {
      name: 'Gastrogastric Fistula Repair',
      description: 'Repair of fistula between gastric pouch and remnant stomach',
      duration: '150-210 min',
      difficulty: 'Advanced'
    },
    {
      name: 'Laparoscopic Mesenteric Defect Closure',
      description: 'Closure of mesenteric defects to prevent internal hernias',
      duration: '60-90 min',
      difficulty: 'Intermediate'
    },
    {
      name: 'Gastric Pouch Reduction',
      description: 'Reduction of dilated gastric pouch',
      duration: '90-120 min',
      difficulty: 'Advanced'
    },
    {
      name: 'Limb Length Revision',
      description: 'Revision of Roux limb or biliopancreatic limb length',
      duration: '120-180 min',
      difficulty: 'Advanced'
    },
    {
      name: 'Gastrojejunal Stricture Dilation',
      description: 'Endoscopic dilation of narrowed gastrojejunal anastomosis',
      duration: '30-45 min',
      difficulty: 'Intermediate'
    },
    {
      name: 'Bezoar Removal Post-Bariatric',
      description: 'Removal of gastric bezoar after bariatric surgery',
      duration: '45-90 min',
      difficulty: 'Intermediate'
    },
    {
      name: 'Nutritional Deficiency Management Surgery',
      description: 'Surgical correction for severe nutritional complications',
      duration: '120-180 min',
      difficulty: 'Advanced'
    },
    {
      name: 'Gastric Bypass Anastomosis Revision',
      description: 'Revision of gastrojejunal or jejunojejunal anastomosis',
      duration: '120-180 min',
      difficulty: 'Advanced'
    },
    {
      name: 'Laparoscopic Panniculectomy with Bariatric',
      description: 'Combined bariatric procedure with abdominal pannus removal',
      duration: '180-240 min',
      difficulty: 'Advanced'
    },
    {
      name: 'Endoscopic Sclerotherapy for Bleeding',
      description: 'Endoscopic treatment of anastomotic bleeding',
      duration: '30-60 min',
      difficulty: 'Intermediate'
    },
    {
      name: 'Gastric Band Port Revision',
      description: 'Revision or replacement of gastric band access port',
      duration: '30-45 min',
      difficulty: 'Basic'
    },
    {
      name: 'Laparoscopic Cholecystectomy Post-Bariatric',
      description: 'Gallbladder removal in post-bariatric surgery patient',
      duration: '60-90 min',
      difficulty: 'Intermediate'
    }
  ];

  bariatricProcs.forEach(proc => {
    allProcedures.push({
      name: proc.name,
      specialtyId: getSpecialtyId('Bariatric Surgery'),
      description: proc.description,
      duration: proc.duration,
      difficulty: proc.difficulty,
      positioning: { title: 'Patient Positioning', steps: ['Supine position', 'Arms extended', 'Reverse Trendelenburg'] },
      draping: { title: 'Draping Protocol', steps: ['Sterile prep', 'Laparoscopic drapes'] },
      instruments: { title: 'Instrumentation', basicSet: ['Laparoscopic set'], specialInstruments: ['Trocars', 'Staplers'] },
      mayoSetup: { title: 'Mayo Stand Setup', layout: 'Standard laparoscopic setup', essentials: ['Staplers', 'Graspers'] },
      procedureSteps: { title: 'Procedure Steps', steps: [
        { step: 1, title: 'Access', description: 'Establish pneumoperitoneum', instruments: ['Trocars'] },
        { step: 2, title: 'Procedure', description: 'Complete procedure', instruments: ['Instruments'] },
        { step: 3, title: 'Closure', description: 'Close trocar sites', instruments: ['Sutures'] }
      ]},
      medications: { title: 'Medications', items: [{ name: 'Antibiotics', use: 'Prophylaxis', amount: 'Standard' }] },
      complications: ['Bleeding', 'Leakage', 'Infection', 'Nutritional deficiency'],
      tips: ['Careful tissue handling', 'Check for leaks', 'Proper anastomosis']
    });
  });

  console.log(`📦 Prepared ${allProcedures.length} procedures for Bariatric Surgery`);
  
  // Insert in batches
  const batchSize = 10;
  for (let i = 0; i < allProcedures.length; i += batchSize) {
    const batch = allProcedures.slice(i, i + batchSize);
    await db.insert(procedures).values(batch);
    console.log(`✅ Inserted batch ${Math.floor(i / batchSize) + 1} (${batch.length} procedures)`);
  }

  console.log(`🎉 Successfully seeded ${allProcedures.length} procedures!`);
  return allProcedures.length;
}
