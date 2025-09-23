import ProcedureDetail from '../ProcedureDetail';

export default function ProcedureDetailExample() {
  const mockProcedure = {
    id: 1,
    name: "Laparoscopic Cholecystectomy",
    specialty: "General Surgery",
    duration: "45-90 min",
    difficulty: "Intermediate",
    isFavorite: true,
    description: "Minimally invasive removal of gallbladder"
  };

  return (
    <ProcedureDetail 
      procedure={mockProcedure}
      onBack={() => console.log('Back clicked')}
    />
  );
}