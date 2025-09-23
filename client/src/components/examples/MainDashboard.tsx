import MainDashboard from '../MainDashboard';

export default function MainDashboardExample() {
  return (
    <MainDashboard 
      onProcedureSelect={(procedure) => console.log('Procedure selected:', procedure)}
      onSpecialtySelect={() => console.log('Specialty management clicked')}
    />
  );
}