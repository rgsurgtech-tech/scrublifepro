import { db } from './db';
import { procedures, specialties } from '@shared/schema';

async function addMoreProcedures() {
  console.log('📊 Adding 10 procedures to remaining specialties...');

  try {
    // Get all specialties
    const allSpecialties = await db.select().from(specialties);
    
    // Get specialty IDs
    const getSpecialtyId = (name: string) => allSpecialties.find(s => s.name === name)?.id!;
    
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
      // Neurosurgery (10)
      {
        name: 'Anterior Cervical Discectomy and Fusion (ACDF)',
        specialtyId: neurosurgeryId,
        description: 'Removal of cervical disc with fusion',
        duration: '120-180 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine with neck extension', 'Shoulder roll', 'Head in neutral alignment', 'Arms tucked']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep from chin to chest', 'Include right neck approach', 'Fenestrated drape']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Spine set', 'Micro instruments'],
          specialInstruments: ['Drill', 'Kerrison rongeurs', 'Cage', 'Plate and screws', 'Microscope']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Cervical spine setup',
          essentials: ['Drill', 'Kerrison', 'Cage', 'Plate']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Incision', description: 'Transverse right neck incision', instruments: ['Scalpel'] },
            { step: 2, title: 'Approach', description: 'Smith-Robinson approach to spine', instruments: ['Retractors'] },
            { step: 3, title: 'Discectomy', description: 'Remove diseased disc', instruments: ['Curettes', 'Rongeurs'] },
            { step: 4, title: 'Decompression', description: 'Decompress neural elements', instruments: ['Drill', 'Kerrison'] },
            { step: 5, title: 'Cage Placement', description: 'Insert interbody cage', instruments: ['Cage', 'Impactor'] },
            { step: 6, title: 'Plate Fixation', description: 'Apply anterior plate', instruments: ['Plate', 'Screws'] },
            { step: 7, title: 'Closure', description: 'Close in layers', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Bone graft', use: 'Fusion', amount: 'As needed' },
            { name: 'Dexamethasone', use: 'Swelling reduction', amount: '8-10mg' }
          ]
        },
        complications: ['Dysphagia', 'RLN injury', 'Esophageal injury', 'Pseudarthrosis', 'Adjacent level disease'],
        tips: ['Protect recurrent laryngeal nerve', 'Use neuromonitoring', 'Ensure adequate decompression', 'Proper cage sizing']
      },
      {
        name: 'Craniotomy for Tumor Resection',
        specialtyId: neurosurgeryId,
        description: 'Opening skull to remove brain tumor',
        duration: '240-480 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine, lateral, or prone based on location', 'Head in Mayfield pins', 'Pressure point padding', 'Neuromonitoring setup']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Shave minimal hair', 'Wide scalp prep', 'Head drape', 'Expose surgical site']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Craniotomy set', 'Micro instruments'],
          specialInstruments: ['Craniotome', 'Microscope', 'Ultrasonic aspirator', 'Bipolar', 'Neuronavigation']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Craniotomy setup with navigation',
          essentials: ['Craniotome', 'Micro instruments', 'Bipolar', 'CUSA']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Incision', description: 'Scalp incision based on tumor location', instruments: ['Scalpel', 'Raney clips'] },
            { step: 2, title: 'Craniotomy', description: 'Create bone flap', instruments: ['Craniotome', 'Drill'] },
            { step: 3, title: 'Dural Opening', description: 'Open dura in stellate fashion', instruments: ['Dural scissors'] },
            { step: 4, title: 'Tumor Localization', description: 'Identify tumor with navigation', instruments: ['Neuronavigation'] },
            { step: 5, title: 'Tumor Resection', description: 'Resect tumor with preservation', instruments: ['Microscope', 'CUSA', 'Bipolar'] },
            { step: 6, title: 'Hemostasis', description: 'Achieve meticulous hemostasis', instruments: ['Bipolar', 'Surgicel'] },
            { step: 7, title: 'Dural Closure', description: 'Close dura watertight', instruments: ['Sutures'] },
            { step: 8, title: 'Bone Flap', description: 'Replace and fix bone flap', instruments: ['Plates', 'Screws'] },
            { step: 9, title: 'Closure', description: 'Close scalp in layers', instruments: ['Sutures', 'Staples'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Mannitol', use: 'Brain relaxation', amount: '0.5-1g/kg' },
            { name: 'Dexamethasone', use: 'Edema control', amount: '10mg' },
            { name: 'Antibiotics', use: 'Infection prevention', amount: 'Per protocol' }
          ]
        },
        complications: ['Hemorrhage', 'Stroke', 'Seizures', 'Infection', 'CSF leak', 'Neurological deficit'],
        tips: ['Use navigation for accuracy', 'Gentle brain handling', 'Monitor neuro status', 'Complete hemostasis essential']
      },
      {
        name: 'Ventriculoperitoneal (VP) Shunt',
        specialtyId: neurosurgeryId,
        description: 'Placement of shunt for hydrocephalus',
        duration: '60-90 min',
        difficulty: 'Intermediate',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine position', 'Head turned to side', 'Neck to abdomen prepped', 'Entire path accessible']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep head and abdomen', 'Connect drapes between sites', 'Maintain sterile corridor']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Shunt set', 'Cranial set'],
          specialInstruments: ['Shunt catheter', 'Valve', 'Tunneling tool', 'Ventricular catheter']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Shunt components organized',
          essentials: ['Ventricular catheter', 'Valve', 'Peritoneal catheter', 'Tunneler']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Head Incision', description: 'Small parietal incision', instruments: ['Scalpel'] },
            { step: 2, title: 'Burr Hole', description: 'Create burr hole', instruments: ['Drill'] },
            { step: 3, title: 'Ventricular Puncture', description: 'Enter lateral ventricle', instruments: ['Ventricular catheter'] },
            { step: 4, title: 'Valve Connection', description: 'Connect valve to catheter', instruments: ['Valve'] },
            { step: 5, title: 'Tunneling', description: 'Tunnel from head to abdomen', instruments: ['Tunneling tool'] },
            { step: 6, title: 'Abdominal Incision', description: 'Small periumbilical incision', instruments: ['Scalpel'] },
            { step: 7, title: 'Peritoneal Placement', description: 'Place catheter in peritoneum', instruments: ['Peritoneal catheter'] },
            { step: 8, title: 'System Test', description: 'Check shunt function', instruments: [] },
            { step: 9, title: 'Closure', description: 'Close both incisions', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Antibiotics', use: 'Shunt soaking', amount: 'Per protocol' }
          ]
        },
        complications: ['Infection', 'Malfunction', 'Overdrainage', 'Underdrainage', 'Migration'],
        tips: ['Use antibiotic-impregnated shunt', 'Verify CSF flow', 'Secure connections', 'Choose appropriate valve pressure']
      },
      {
        name: 'Lumbar Laminectomy',
        specialtyId: neurosurgeryId,
        description: 'Decompression of lumbar spinal canal',
        duration: '90-150 min',
        difficulty: 'Intermediate',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Prone on Wilson frame', 'Abdomen free', 'Arms on arm boards', 'Pressure points padded']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep lumbar spine widely', 'Lateral exposure', 'Fenestrated drape']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Spine set'],
          specialInstruments: ['Kerrison rongeurs', 'Micro curettes', 'Bipolar', 'Microscope']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Laminectomy instruments ready',
          essentials: ['Kerrison', 'Curettes', 'Bipolar', 'Retractors']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Incision', description: 'Midline lumbar incision', instruments: ['Scalpel', 'Bovie'] },
            { step: 2, title: 'Exposure', description: 'Subperiosteal dissection', instruments: ['Electrocautery', 'Curettes'] },
            { step: 3, title: 'Laminectomy', description: 'Remove lamina bilaterally', instruments: ['Kerrison', 'Drill'] },
            { step: 4, title: 'Decompression', description: 'Decompress neural elements', instruments: ['Micro instruments'] },
            { step: 5, title: 'Foraminotomy', description: 'Decompress nerve roots', instruments: ['Kerrison'] },
            { step: 6, title: 'Hemostasis', description: 'Achieve hemostasis', instruments: ['Bipolar', 'Gelfoam'] },
            { step: 7, title: 'Closure', description: 'Close in layers with drain', instruments: ['Sutures', 'Drain'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Normal Saline', use: 'Irrigation', amount: '500mL' }
          ]
        },
        complications: ['Dural tear', 'Nerve injury', 'Epidural hematoma', 'Instability', 'Infection'],
        tips: ['Use loupe magnification', 'Protect dura', 'Bilateral decompression', 'Preserve facets if possible']
      },
      {
        name: 'Microvascular Decompression',
        specialtyId: neurosurgeryId,
        description: 'Decompression for trigeminal neuralgia or hemifacial spasm',
        duration: '180-240 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Lateral or park bench position', 'Head in Mayfield pins', 'Ear superior', 'Retromastoid approach']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep postauricular area', 'Wide field', 'Head drape']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Craniotomy set', 'Micro instruments'],
          specialInstruments: ['Microscope', 'Micro instruments', 'Teflon pledgets', 'Shredded Teflon']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Microneurosurgery setup',
          essentials: ['Micro instruments', 'Teflon', 'Microscope']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Incision', description: 'Retromastoid incision', instruments: ['Scalpel'] },
            { step: 2, title: 'Craniectomy', description: 'Small posterior fossa craniectomy', instruments: ['Drill'] },
            { step: 3, title: 'Dural Opening', description: 'Open dura carefully', instruments: ['Micro scissors'] },
            { step: 4, title: 'CSF Drainage', description: 'Release CSF for brain relaxation', instruments: [] },
            { step: 5, title: 'Nerve Identification', description: 'Identify cranial nerve', instruments: ['Microscope'] },
            { step: 6, title: 'Vessel Mobilization', description: 'Mobilize offending vessel', instruments: ['Micro dissectors'] },
            { step: 7, title: 'Teflon Placement', description: 'Place Teflon between nerve and vessel', instruments: ['Teflon pledgets'] },
            { step: 8, title: 'Dural Closure', description: 'Close dura watertight', instruments: ['Sutures'] },
            { step: 9, title: 'Closure', description: 'Close muscle and skin', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Papaverine', use: 'Vessel spasm prevention', amount: 'As needed' }
          ]
        },
        complications: ['Hearing loss', 'Facial weakness', 'CSF leak', 'Stroke', 'Recurrence'],
        tips: ['Gentle handling of nerves', 'Adequate decompression', 'Secure Teflon placement', 'Protect hearing']
      },
      {
        name: 'Chiari Decompression',
        specialtyId: neurosurgeryId,
        description: 'Posterior fossa decompression for Chiari malformation',
        duration: '120-180 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Prone or sitting position', 'Head in Mayfield pins', 'Neck flexed slightly', 'Suboccipital exposure']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Shave minimal hair', 'Prep from occiput to C3', 'Head drape']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Craniotomy set', 'Spine set'],
          specialInstruments: ['Drill', 'Kerrison', 'Dural graft', 'Bipolar']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Posterior fossa setup',
          essentials: ['Drill', 'Kerrison', 'Dural graft', 'Micro instruments']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Incision', description: 'Midline suboccipital incision', instruments: ['Scalpel'] },
            { step: 2, title: 'Muscle Dissection', description: 'Expose occiput and C1', instruments: ['Electrocautery'] },
            { step: 3, title: 'Craniectomy', description: 'Remove suboccipital bone', instruments: ['Drill'] },
            { step: 4, title: 'C1 Laminectomy', description: 'Remove C1 posterior arch', instruments: ['Kerrison'] },
            { step: 5, title: 'Dural Opening', description: 'Open dura in Y-fashion', instruments: ['Scissors'] },
            { step: 6, title: 'Tonsillar Inspection', description: 'Assess cerebellar tonsils', instruments: ['Microscope'] },
            { step: 7, title: 'Duraplasty', description: 'Expand dura with graft', instruments: ['Dural graft', 'Sutures'] },
            { step: 8, title: 'Closure', description: 'Close muscle and skin watertight', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Normal Saline', use: 'Irrigation', amount: '500mL' }
          ]
        },
        complications: ['CSF leak', 'Pseudomeningocele', 'Aseptic meningitis', 'Instability', 'Cerebellar ptosis'],
        tips: ['Adequate decompression', 'Watertight dural closure', 'Consider duraplasty', 'Avoid excessive traction']
      },
      {
        name: 'Deep Brain Stimulation (DBS) Electrode Placement',
        specialtyId: neurosurgeryId,
        description: 'Stereotactic placement of DBS electrodes',
        duration: '240-360 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine or semi-sitting', 'Stereotactic frame placement', 'Awake or asleep protocol', 'MRI/CT guidance']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep entire head', 'Frame draped', 'Bilateral access']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Stereotactic set', 'DBS instruments'],
          specialInstruments: ['Stereotactic frame', 'Microelectrode recording', 'DBS leads', 'IPG']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Stereotactic setup with recording equipment',
          essentials: ['Frame', 'Electrodes', 'Recording system', 'DBS leads']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Frame Placement', description: 'Apply stereotactic frame', instruments: ['Frame'] },
            { step: 2, title: 'Imaging', description: 'MRI/CT for targeting', instruments: ['Imaging'] },
            { step: 3, title: 'Target Calculation', description: 'Calculate target coordinates', instruments: ['Software'] },
            { step: 4, title: 'Burr Holes', description: 'Create bilateral burr holes', instruments: ['Drill'] },
            { step: 5, title: 'Microelectrode Recording', description: 'Map target with recording', instruments: ['Microelectrode'] },
            { step: 6, title: 'Lead Placement', description: 'Insert DBS lead at target', instruments: ['DBS lead'] },
            { step: 7, title: 'Testing', description: 'Test stimulation effects', instruments: ['Stimulator'] },
            { step: 8, title: 'Lead Fixation', description: 'Secure leads', instruments: ['Caps'] },
            { step: 9, title: 'Extension Tunneling', description: 'Tunnel extensions to chest', instruments: ['Tunneler'] },
            { step: 10, title: 'IPG Placement', description: 'Place generator in chest', instruments: ['IPG'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Local anesthesia', use: 'Awake surgery', amount: 'As needed' },
            { name: 'Antibiotics', use: 'Hardware soaking', amount: 'Per protocol' }
          ]
        },
        complications: ['Hemorrhage', 'Infection', 'Lead misplacement', 'Hardware malfunction', 'Side effects from stimulation'],
        tips: ['Precise targeting critical', 'Awake testing helpful', 'Meticulous hemostasis', 'Secure all connections']
      },
      {
        name: 'Burr Hole for Subdural Hematoma Evacuation',
        specialtyId: neurosurgeryId,
        description: 'Drainage of chronic subdural hematoma',
        duration: '45-90 min',
        difficulty: 'Intermediate',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine with head turned', 'Head elevated 30 degrees', 'Affected side superior']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Shave minimal hair', 'Prep scalp', 'Head drape']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Burr hole set'],
          specialInstruments: ['Drill', 'Subdural drain', 'Irrigation supplies']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Simple burr hole setup',
          essentials: ['Drill', 'Drain', 'Irrigation']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Incision', description: 'Small linear incision', instruments: ['Scalpel'] },
            { step: 2, title: 'Burr Hole', description: 'Create burr hole with drill', instruments: ['Drill'] },
            { step: 3, title: 'Dural Opening', description: 'Open dura cruciate', instruments: ['Knife'] },
            { step: 4, title: 'Hematoma Drainage', description: 'Evacuate hematoma', instruments: ['Suction'] },
            { step: 5, title: 'Irrigation', description: 'Irrigate subdural space', instruments: ['Irrigation'] },
            { step: 6, title: 'Drain Placement', description: 'Place subdural drain', instruments: ['Drain'] },
            { step: 7, title: 'Closure', description: 'Close scalp', instruments: ['Sutures', 'Staples'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Normal Saline', use: 'Irrigation', amount: '1000mL' }
          ]
        },
        complications: ['Recurrence', 'Seizures', 'Infection', 'Tension pneumocephalus', 'Rebleeding'],
        tips: ['Gentle irrigation', 'Leave drain for 24-48h', 'Restart anticoagulation cautiously', 'Monitor for recurrence']
      },
      {
        name: 'Stereotactic Brain Biopsy',
        specialtyId: neurosurgeryId,
        description: 'Minimally invasive biopsy of brain lesion',
        duration: '60-120 min',
        difficulty: 'Intermediate',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine or lateral', 'Frame or frameless navigation', 'Lesion accessible']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep entry site', 'Frame if used', 'Small drape']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Stereotactic set'],
          specialInstruments: ['Frame or navigation', 'Biopsy needle', 'Pathology supplies']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Minimal setup for biopsy',
          essentials: ['Biopsy needle', 'Pathology containers']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Targeting', description: 'Calculate trajectory to lesion', instruments: ['Navigation'] },
            { step: 2, title: 'Incision', description: 'Small stab incision', instruments: ['Scalpel'] },
            { step: 3, title: 'Burr Hole', description: 'Create small burr hole', instruments: ['Drill'] },
            { step: 4, title: 'Biopsy', description: 'Advance needle and obtain samples', instruments: ['Biopsy needle'] },
            { step: 5, title: 'Specimen Processing', description: 'Send for frozen and permanent', instruments: ['Pathology'] },
            { step: 6, title: 'Hemostasis', description: 'Ensure no bleeding', instruments: ['Gelfoam'] },
            { step: 7, title: 'Closure', description: 'Close small incision', instruments: ['Suture'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Local anesthetic', use: 'Frame pins', amount: 'As needed' }
          ]
        },
        complications: ['Hemorrhage', 'Seizure', 'Infection', 'Non-diagnostic sample'],
        tips: ['Avoid vessels on trajectory', 'Multiple samples', 'Frozen section confirmation', 'Gentle technique']
      },
      {
        name: 'Transsphenoidal Hypophysectomy',
        specialtyId: neurosurgeryId,
        description: 'Endoscopic removal of pituitary tumor',
        duration: '180-300 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine with head elevated', 'Head in neutral or slight extension', 'Nasal approach', 'Navigation registration']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep nasal cavity', 'Face and abdomen for fat graft', 'Head drape']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Pituitary set', 'Endoscope'],
          specialInstruments: ['Endoscope', 'Micro instruments', 'Nasal speculum', 'Curettes']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Endoscopic pituitary setup',
          essentials: ['Endoscope', 'Micro instruments', 'Curettes', 'Fat graft']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Nasal Preparation', description: 'Cocaine/epinephrine to nasal mucosa', instruments: ['Pledgets'] },
            { step: 2, title: 'Endoscopic Approach', description: 'Navigate to sphenoid sinus', instruments: ['Endoscope'] },
            { step: 3, title: 'Sphenoidotomy', description: 'Open sphenoid sinus', instruments: ['Drill', 'Kerrison'] },
            { step: 4, title: 'Sellar Exposure', description: 'Identify and expose sella', instruments: ['Drill'] },
            { step: 5, title: 'Dural Opening', description: 'Open dura over tumor', instruments: ['Knife'] },
            { step: 6, title: 'Tumor Resection', description: 'Remove tumor piecemeal', instruments: ['Curettes', 'Suction'] },
            { step: 7, title: 'Sellar Reconstruction', description: 'Pack sella with fat/graft', instruments: ['Fat graft'] },
            { step: 8, title: 'Closure', description: 'Nasoseptal flap if needed', instruments: ['Flap'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Cocaine/Epinephrine', use: 'Nasal decongestion', amount: 'As needed' },
            { name: 'Dexamethasone', use: 'Edema prevention', amount: '10mg' }
          ]
        },
        complications: ['CSF leak', 'Diabetes insipidus', 'Hypopituitarism', 'Vision changes', 'Carotid injury', 'Meningitis'],
        tips: ['Identify carotid and optic nerve', 'Gentle tumor manipulation', 'Multilayer closure for CSF leak', 'Postop hormone monitoring']
      },

      // Ophthalmology (10)
      {
        name: 'Phacoemulsification with IOL',
        specialtyId: ophthalmologyId,
        description: 'Cataract removal with lens implantation',
        duration: '20-40 min',
        difficulty: 'Intermediate',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine position', 'Head on donut pillow', 'Face accessible', 'Comfortable positioning']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep periocular skin with betadine', 'Apply sterile drape', 'Lid speculum placement']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Phaco machine', 'Microscope'],
          specialInstruments: ['Phaco handpiece', 'I/A handpiece', 'IOL inserter', 'Viscoelastic']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Cataract instruments organized',
          essentials: ['Phaco tip', 'IOL', 'Viscoelastic', 'BSS']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Incisions', description: 'Create clear corneal incisions', instruments: ['Keratome'] },
            { step: 2, title: 'Capsulorhexis', description: 'Create anterior capsular opening', instruments: ['Forceps', 'Cystotome'] },
            { step: 3, title: 'Hydrodissection', description: 'Separate cortex from capsule', instruments: ['BSS cannula'] },
            { step: 4, title: 'Phacoemulsification', description: 'Emulsify and remove nucleus', instruments: ['Phaco handpiece'] },
            { step: 5, title: 'I/A', description: 'Aspirate cortical material', instruments: ['I/A handpiece'] },
            { step: 6, title: 'IOL Implantation', description: 'Insert intraocular lens', instruments: ['IOL inserter'] },
            { step: 7, title: 'Wound Closure', description: 'Hydrate and check wounds', instruments: ['BSS'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Viscoelastic', use: 'Maintain space', amount: 'As needed' },
            { name: 'BSS', use: 'Irrigation', amount: '500mL' },
            { name: 'Intracameral antibiotic', use: 'Infection prevention', amount: '0.1mL' }
          ]
        },
        complications: ['Posterior capsule rupture', 'Endophthalmitis', 'Corneal edema', 'IOL dislocation', 'Retinal detachment'],
        tips: ['Gentle capsulorhexis', 'Complete cortex removal', 'Center IOL properly', 'Check wound integrity']
      },
      {
        name: 'Vitrectomy',
        specialtyId: ophthalmologyId,
        description: 'Removal of vitreous humor for retinal pathology',
        duration: '60-120 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine position', 'Head stabilized', 'Operating microscope positioned']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Betadine prep', 'Sterile drape', 'Lid speculum']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Vitrectomy machine', 'Microscope'],
          specialInstruments: ['Vitrector', 'Endolaser', 'Chandelier light', 'Gas/oil']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Vitrectomy setup',
          essentials: ['Vitrector', 'Laser', 'Forceps', 'Gas']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Sclerotomies', description: 'Create 3 sclerotomies', instruments: ['MVR blade'] },
            { step: 2, title: 'Core Vitrectomy', description: 'Remove central vitreous', instruments: ['Vitrector'] },
            { step: 3, title: 'Pathology Treatment', description: 'Address retinal pathology', instruments: ['Forceps', 'Scissors'] },
            { step: 4, title: 'Laser Photocoagulation', description: 'Apply laser as needed', instruments: ['Endolaser'] },
            { step: 5, title: 'Fluid-Air Exchange', description: 'Exchange fluid for air/gas', instruments: ['Extrusion'] },
            { step: 6, title: 'Tamponade', description: 'Inject gas or oil', instruments: ['Gas/oil'] },
            { step: 7, title: 'Closure', description: 'Close sclerotomies', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'BSS Plus', use: 'Infusion', amount: '500mL' },
            { name: 'Triamcinolone', use: 'Vitreous visualization', amount: '0.1mL' },
            { name: 'Gas (C3F8/SF6)', use: 'Tamponade', amount: 'As needed' }
          ]
        },
        complications: ['Retinal detachment', 'Hemorrhage', 'Cataract', 'Endophthalmitis', 'Hypotony'],
        tips: ['Complete peripheral vitrectomy', 'Avoid retinal trauma', 'Proper laser application', 'Position patient postop if gas']
      },
      {
        name: 'Trabeculectomy',
        specialtyId: ophthalmologyId,
        description: 'Glaucoma filtration surgery',
        duration: '45-90 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine position', 'Head comfortable', 'Superior approach planned']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep and drape eye', 'Lid speculum', 'Bridle suture if needed']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Glaucoma set', 'Microscope'],
          specialInstruments: ['Surgical gonioprism', 'Punch', 'Releasable sutures', 'Mitomycin-C']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Trabeculectomy instruments',
          essentials: ['Punch', 'Sutures', 'MMC', 'Gonioprism']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Conjunctival Flap', description: 'Create fornix-based flap', instruments: ['Scissors'] },
            { step: 2, title: 'MMC Application', description: 'Apply mitomycin-C', instruments: ['MMC sponges'] },
            { step: 3, title: 'Scleral Flap', description: 'Create partial-thickness flap', instruments: ['Crescent blade'] },
            { step: 4, title: 'Paracentesis', description: 'Create side port', instruments: ['MVR blade'] },
            { step: 5, title: 'Trabeculectomy', description: 'Remove trabecular block', instruments: ['Punch'] },
            { step: 6, title: 'Iridectomy', description: 'Perform peripheral iridectomy', instruments: ['Scissors'] },
            { step: 7, title: 'Scleral Flap Closure', description: 'Suture scleral flap', instruments: ['10-0 nylon'] },
            { step: 8, title: 'Conjunctival Closure', description: 'Close conjunctiva watertight', instruments: ['Vicryl'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Mitomycin-C', use: 'Antifibrotic', amount: '0.2-0.4mg/mL' },
            { name: 'Viscoelastic', use: 'Maintain AC', amount: 'As needed' },
            { name: 'Steroid/antibiotic', use: 'Postop', amount: 'Subconjunctival' }
          ]
        },
        complications: ['Hypotony', 'Bleb leak', 'Infection', 'Cataract', 'Choroidal effusion', 'Failure'],
        tips: ['Tight scleral flap sutures', 'Watertight conjunctival closure', 'Appropriate MMC dosing', 'Monitor bleb postop']
      },
      {
        name: 'Retinal Detachment Repair (Scleral Buckle)',
        specialtyId: ophthalmologyId,
        description: 'External approach to retinal detachment',
        duration: '90-150 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine position', 'Head ring support', '360-degree eye access']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep and drape', 'Lid speculum', 'Traction sutures']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Retinal set', 'Indirect ophthalmoscope'],
          specialInstruments: ['Scleral buckle', 'Cryoprobe', 'Drainage instruments', 'Gas']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Buckle procedure setup',
          essentials: ['Buckle elements', 'Cryo', 'Drainage set']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Conjunctival Opening', description: 'Open conjunctiva 360 degrees', instruments: ['Scissors'] },
            { step: 2, title: 'Muscle Isolation', description: 'Isolate rectus muscles', instruments: ['Hooks'] },
            { step: 3, title: 'Break Localization', description: 'Identify retinal breaks', instruments: ['Indirect scope'] },
            { step: 4, title: 'Cryotherapy', description: 'Apply cryo to breaks', instruments: ['Cryoprobe'] },
            { step: 5, title: 'Buckle Placement', description: 'Position and suture buckle', instruments: ['Buckle', 'Sutures'] },
            { step: 6, title: 'Drainage', description: 'Drain subretinal fluid if needed', instruments: ['Drain'] },
            { step: 7, title: 'Gas Injection', description: 'Inject gas if needed', instruments: ['Gas'] },
            { step: 8, title: 'Closure', description: 'Close conjunctiva', instruments: ['Vicryl'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'BSS', use: 'Irrigation', amount: '250mL' },
            { name: 'Gas', use: 'Tamponade', amount: 'As needed' }
          ]
        },
        complications: ['Redetachment', 'Diplopia', 'Infection', 'Buckle extrusion', 'Choroidal detachment'],
        tips: ['Identify all breaks', 'Adequate cryotherapy', 'Proper buckle height', 'Check retinal perfusion']
      },
      {
        name: 'Corneal Transplant (Penetrating Keratoplasty)',
        specialtyId: ophthalmologyId,
        description: 'Full-thickness corneal transplantation',
        duration: '60-90 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine position', 'Head stabilized', 'Donor tissue prepared']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Sterile prep and drape', 'Lid speculum', 'Flieringa ring if needed']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Corneal set', 'Microscope'],
          specialInstruments: ['Trephines', 'Corneal scissors', 'Donor tissue', 'Sutures']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Keratoplasty setup',
          essentials: ['Trephines', 'Donor cornea', '10-0 nylon']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Donor Preparation', description: 'Trephine donor tissue', instruments: ['Donor trephine'] },
            { step: 2, title: 'Host Trephination', description: 'Trephine recipient cornea', instruments: ['Host trephine'] },
            { step: 3, title: 'Cornea Removal', description: 'Remove diseased cornea', instruments: ['Scissors'] },
            { step: 4, title: 'Donor Placement', description: 'Position donor button', instruments: ['Forceps'] },
            { step: 5, title: 'Interrupted Sutures', description: 'Place 16 interrupted sutures', instruments: ['10-0 nylon'] },
            { step: 6, title: 'Running Suture', description: 'Place running suture', instruments: ['10-0 nylon'] },
            { step: 7, title: 'Wound Test', description: 'Check for leaks', instruments: ['BSS'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Viscoelastic', use: 'Maintain AC', amount: 'As needed' },
            { name: 'BSS', use: 'Irrigation', amount: '250mL' },
            { name: 'Steroid', use: 'Subconjunctival', amount: '0.5mL' }
          ]
        },
        complications: ['Rejection', 'Infection', 'Glaucoma', 'Astigmatism', 'Wound leak', 'Failure'],
        tips: ['Precise sizing match', 'Equal suture tension', 'Watertight closure', 'Early rejection monitoring']
      },
      {
        name: 'LASIK (Laser-Assisted In Situ Keratomileusis)',
        specialtyId: ophthalmologyId,
        description: 'Laser vision correction',
        duration: '15-30 min',
        difficulty: 'Intermediate',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine under laser', 'Eye tracker aligned', 'Patient fixates on target']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep periocular area', 'Sterile drape', 'Lid speculum']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['LASIK instruments'],
          specialInstruments: ['Microkeratome or femtosecond laser', 'Excimer laser', 'Flap lifter']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'LASIK setup',
          essentials: ['Microkeratome', 'Spatula', 'Marker']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Marking', description: 'Mark visual axis', instruments: ['Marker'] },
            { step: 2, title: 'Suction Ring', description: 'Apply suction ring', instruments: ['Ring'] },
            { step: 3, title: 'Flap Creation', description: 'Create corneal flap', instruments: ['Microkeratome'] },
            { step: 4, title: 'Flap Lift', description: 'Lift and reflect flap', instruments: ['Spatula'] },
            { step: 5, title: 'Laser Ablation', description: 'Apply excimer laser', instruments: ['Excimer laser'] },
            { step: 6, title: 'Flap Repositioning', description: 'Replace and align flap', instruments: ['Spatula'] },
            { step: 7, title: 'Flap Hydration', description: 'Hydrate edges', instruments: ['BSS'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Topical anesthetic', use: 'Anesthesia', amount: 'Drops' },
            { name: 'BSS', use: 'Irrigation', amount: '30mL' },
            { name: 'Antibiotic drops', use: 'Infection prevention', amount: 'Postop' }
          ]
        },
        complications: ['Flap complications', 'Dry eye', 'Under/overcorrection', 'Infection', 'Ectasia'],
        tips: ['Adequate suction', 'Center ablation', 'Smooth flap repositioning', 'Check flap alignment']
      },
      {
        name: 'Strabismus Surgery',
        specialtyId: ophthalmologyId,
        description: 'Extraocular muscle surgery for eye alignment',
        duration: '45-90 min',
        difficulty: 'Intermediate',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine position', 'Head on donut', 'Both eyes accessible']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep both eyes', 'Sterile drape', 'Lid speculum']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Strabismus set', 'Microscope'],
          specialInstruments: ['Muscle hooks', 'Calipers', 'Sutures', 'Forced duction test']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Strabismus instruments',
          essentials: ['Hooks', 'Calipers', '6-0 Vicryl']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Forced Duction Test', description: 'Check mechanical restrictions', instruments: ['Forceps'] },
            { step: 2, title: 'Conjunctival Incision', description: 'Open conjunctiva', instruments: ['Scissors'] },
            { step: 3, title: 'Muscle Isolation', description: 'Hook and isolate muscle', instruments: ['Muscle hook'] },
            { step: 4, title: 'Muscle Recession/Resection', description: 'Weaken or strengthen muscle', instruments: ['Calipers', 'Scissors'] },
            { step: 5, title: 'Muscle Reattachment', description: 'Suture muscle to new position', instruments: ['Sutures'] },
            { step: 6, title: 'Alignment Check', description: 'Assess eye position', instruments: [] },
            { step: 7, title: 'Closure', description: 'Close conjunctiva', instruments: ['Vicryl'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'BSS', use: 'Irrigation', amount: '100mL' },
            { name: 'Steroid/antibiotic', use: 'Subconjunctival', amount: '0.5mL' }
          ]
        },
        complications: ['Overcorrection', 'Undercorrection', 'Diplopia', 'Scleral perforation', 'Infection'],
        tips: ['Careful measurements', 'Symmetric muscle surgery', 'Check alignment intraop', 'Avoid excessive resection']
      },
      {
        name: 'Pterygium Excision with Conjunctival Autograft',
        specialtyId: ophthalmologyId,
        description: 'Removal of pterygium with graft',
        duration: '30-60 min',
        difficulty: 'Intermediate',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine position', 'Head comfortable', 'Nasal approach usually']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep and drape eye', 'Lid speculum', 'Good exposure']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Pterygium set', 'Microscope'],
          specialInstruments: ['Crescent blade', 'Sutures or fibrin glue', 'Mitomycin-C']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Pterygium excision setup',
          essentials: ['Blade', 'Sutures/glue', 'MMC']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Pterygium Dissection', description: 'Separate from cornea', instruments: ['Crescent blade'] },
            { step: 2, title: 'Excision', description: 'Remove pterygium tissue', instruments: ['Scissors'] },
            { step: 3, title: 'MMC Application', description: 'Apply mitomycin-C to sclera', instruments: ['MMC sponge'] },
            { step: 4, title: 'Graft Harvest', description: 'Harvest superior conjunctival graft', instruments: ['Scissors'] },
            { step: 5, title: 'Graft Placement', description: 'Position graft over defect', instruments: ['Forceps'] },
            { step: 6, title: 'Fixation', description: 'Secure with sutures or glue', instruments: ['Sutures/glue'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Mitomycin-C', use: 'Prevent recurrence', amount: '0.02%' },
            { name: 'Fibrin glue', use: 'Graft fixation', amount: 'As needed' }
          ]
        },
        complications: ['Recurrence', 'Graft failure', 'Scleral necrosis', 'Diplopia', 'Dellen'],
        tips: ['Complete excision', 'Smooth corneal surface', 'Graft orientation correct', 'MMC judicious use']
      },
      {
        name: 'Eyelid Ptosis Repair',
        specialtyId: ophthalmologyId,
        description: 'Correction of drooping eyelid',
        duration: '45-90 min',
        difficulty: 'Intermediate',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Semi-recumbent position', 'Awake surgery preferred', 'Able to open/close eyes']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep eyelid and periocular', 'Sterile drape', 'Lashes isolated']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['Oculoplastic set'],
          specialInstruments: ['Desmarres retractor', 'Muller\'s muscle clamp', 'Sutures']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'Ptosis repair instruments',
          essentials: ['Retractor', 'Clamp', '6-0 silk', '6-0 Vicryl']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Marking', description: 'Mark desired lid height', instruments: ['Marker'] },
            { step: 2, title: 'Eversion', description: 'Evert eyelid', instruments: ['Retractor'] },
            { step: 3, title: 'Muller\'s Resection', description: 'Resect Muller\'s muscle', instruments: ['Clamp'] },
            { step: 4, title: 'Levator Plication', description: 'Advance levator if needed', instruments: ['Sutures'] },
            { step: 5, title: 'Height Check', description: 'Check lid height with patient sitting', instruments: [] },
            { step: 6, title: 'Closure', description: 'Close conjunctiva', instruments: ['Vicryl'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Local anesthetic', use: 'Lid block', amount: '2-3mL' },
            { name: 'Epinephrine', use: 'Hemostasis', amount: 'In local' }
          ]
        },
        complications: ['Overcorrection', 'Undercorrection', 'Asymmetry', 'Lagophthalmos', 'Dry eye'],
        tips: ['Intraop adjustment critical', 'Symmetric resection', 'Check contour', 'Patient cooperation essential']
      },
      {
        name: 'Dacryocystorhinostomy (DCR)',
        specialtyId: ophthalmologyId,
        description: 'Creation of new tear drainage pathway',
        duration: '60-90 min',
        difficulty: 'Advanced',
        positioning: {
          title: 'Patient Positioning',
          steps: ['Supine position', 'Head turned to side', 'Nasal approach if endoscopic']
        },
        draping: {
          title: 'Draping Protocol',
          steps: ['Prep medial canthus and nose', 'Sterile drape', 'Access to nasal cavity']
        },
        instruments: {
          title: 'Instrumentation',
          basicSet: ['DCR set', 'Endoscope if endonasal'],
          specialInstruments: ['Kerrison rongeur', 'Drill', 'Silicone stent', 'Endoscope']
        },
        mayoSetup: {
          title: 'Mayo Stand Setup',
          layout: 'DCR setup',
          essentials: ['Rongeur', 'Stent', 'Sutures']
        },
        procedureSteps: {
          title: 'Procedure Steps',
          steps: [
            { step: 1, title: 'Incision', description: 'External or endonasal approach', instruments: ['Scalpel'] },
            { step: 2, title: 'Sac Exposure', description: 'Identify lacrimal sac', instruments: ['Dissection'] },
            { step: 3, title: 'Osteotomy', description: 'Create bony opening', instruments: ['Drill', 'Rongeur'] },
            { step: 4, title: 'Flap Creation', description: 'Create mucosal and sac flaps', instruments: ['Scissors'] },
            { step: 5, title: 'Anastomosis', description: 'Suture flaps together', instruments: ['Sutures'] },
            { step: 6, title: 'Stent Placement', description: 'Insert silicone stent', instruments: ['Crawford stent'] },
            { step: 7, title: 'Closure', description: 'Close skin if external', instruments: ['Sutures'] }
          ]
        },
        medications: {
          title: 'Medications & Solutions',
          items: [
            { name: 'Cocaine pledgets', use: 'Nasal mucosa', amount: 'As needed' },
            { name: 'Epinephrine', use: 'Hemostasis', amount: 'In local' }
          ]
        },
        complications: ['Failure', 'Hemorrhage', 'Infection', 'Scarring', 'CSF leak (rare)'],
        tips: ['Adequate osteotomy size', 'Good mucosal apposition', 'Stent for 3-6 months', 'Avoid excessive cautery']
      }
    ];

    // Insert ALL procedures at once
    console.log(`📝 Inserting ALL ${newProcedures.length} procedures...`);
    await db.insert(procedures).values(newProcedures);

    console.log(`✅ Successfully added ${newProcedures.length} more procedures`);
    console.log('🎯 Continue with remaining specialties...');

  } catch (error) {
    console.error('❌ Error adding procedures:', error);
    throw error;
  }
}

export default addMoreProcedures;

// Only run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  addMoreProcedures()
    .then(() => {
      console.log('🎉 Additional procedures added successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Failed to add procedures:', error);
      process.exit(1);
    });
}
