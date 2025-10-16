import { db } from './db';
import { procedures, specialties } from '@shared/schema';
import { eq } from 'drizzle-orm';

async function updateProcedureInstruments() {
  console.log('🔧 Updating procedure instruments with proper references...');

  try {
    const allSpecialties = await db.select().from(specialties);
    
    // Map specialty names to proper instrument sets
    const specialtyInstrumentMap: Record<string, { basicSet: string[], specialInstruments: string[] }> = {
      'ENT (Otolaryngology)': {
        basicSet: ['ENT instrument set', 'General surgery set'],
        specialInstruments: ['Microscope (ENT)', 'Otoscope', 'Endoscope (Sinus/Nasal)', 'Microdebrider', 'Tonsil instruments']
      },
      'Plastic & Reconstructive': {
        basicSet: ['Plastic surgery set', 'General surgery set'],
        specialInstruments: ['Dermatome', 'Fine instruments', 'Microsurgical instruments', 'Skin grafting instruments']
      },
      'Pediatric Surgery': {
        basicSet: ['Pediatric surgery set', 'General surgery set'],
        specialInstruments: ['Laparoscopic set', 'Fine instruments', 'Small retractors']
      },
      'Bariatric Surgery': {
        basicSet: ['Bariatric instruments', 'Laparoscopic set'],
        specialInstruments: ['Staplers', 'Bougie', 'Harmonic device', 'Liver retractor']
      },
      'Thoracic Surgery': {
        basicSet: ['Thoracic set', 'General surgery set'],
        specialInstruments: ['Chest retractors', 'Lung clamps', 'Staplers', 'Drainage systems']
      },
      'Cardiothoracic': {
        basicSet: ['Cardiothoracic set', 'Cardiovascular set'],
        specialInstruments: ['Vascular clamps', 'Heart-lung machine', 'Cardiac retractors', 'Prosthetic valves']
      },
      'Oral & Maxillofacial': {
        basicSet: ['Maxillofacial surgery set', 'General surgery set'],
        specialInstruments: ['Drill and burr', 'Fixation plates', 'Bone reduction instruments']
      },
      'Colorectal Surgery': {
        basicSet: ['Colorectal surgery set', 'General surgery set'],
        specialInstruments: ['Proctoscope', 'Bowel clamps', 'Staplers', 'Hemorrhoid instruments']
      },
      'Trauma Surgery': {
        basicSet: ['Trauma surgery set', 'Basic laparotomy set'],
        specialInstruments: ['Vascular clamps', 'Chest retractors', 'External fixation', 'Drainage systems']
      },
      'Transplant Surgery': {
        basicSet: ['Transplant surgery set', 'Vascular surgery set'],
        specialInstruments: ['Vascular anastomosis instruments', 'Microsurgical instruments', 'Vascular clamps']
      },
      'Vascular Surgery': {
        basicSet: ['Vascular surgery set', 'General surgery set'],
        specialInstruments: ['Vascular clamps', 'Vascular anastomosis instruments', 'Doppler probe']
      },
      'Surgical Oncology': {
        basicSet: ['Oncology surgery set', 'General surgery set'],
        specialInstruments: ['Sentinel node detection', 'Lymph node dissection instruments', 'Electrocautery']
      },
      'Endocrine Surgery': {
        basicSet: ['Endocrine surgery set', 'General surgery set'],
        specialInstruments: ['Nerve monitoring', 'Fine instruments', 'Thyroid retractors', 'Hemostatic devices']
      }
    };

    for (const specialty of allSpecialties) {
      const instrumentMapping = specialtyInstrumentMap[specialty.name];
      
      if (instrumentMapping) {
        // Get all procedures for this specialty
        const specialtyProcs = await db
          .select()
          .from(procedures)
          .where(eq(procedures.specialtyId, specialty.id));

        console.log(`📝 Updating ${specialtyProcs.length} procedures for ${specialty.name}...`);

        for (const proc of specialtyProcs) {
          // Update instruments data
          const updatedInstruments = {
            title: 'Instrumentation',
            basicSet: instrumentMapping.basicSet,
            specialInstruments: instrumentMapping.specialInstruments
          };

          // Update mayo setup with clickable instruments
          const updatedMayoSetup = {
            title: 'Mayo Stand Setup',
            layout: `Standard ${specialty.name} setup with essential instruments organized for optimal workflow`,
            essentials: instrumentMapping.specialInstruments.slice(0, 3) // Use first 3 special instruments
          };

          await db
            .update(procedures)
            .set({
              instruments: updatedInstruments,
              mayoSetup: updatedMayoSetup
            })
            .where(eq(procedures.id, proc.id));
        }
        
        console.log(`   ✓ Updated ${specialty.name} procedures`);
      }
    }

    console.log('✅ All procedure instruments updated successfully!');
  } catch (error) {
    console.error('❌ Error updating procedures:', error);
    throw error;
  }
}

updateProcedureInstruments()
  .then(() => {
    console.log('🎉 Instrument references updated!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Failed to update instruments:', error);
    process.exit(1);
  });
