import SpecialtySelector from '../SpecialtySelector';

export default function SpecialtySelectorExample() {
  return (
    <SpecialtySelector 
      onBack={() => console.log('Back clicked')}
      userTier="standard"
      currentSelections={['general', 'orthopedics']}
      onSave={(selections) => console.log('Saved selections:', selections)}
    />
  );
}