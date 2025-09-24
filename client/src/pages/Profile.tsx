import { useLocation } from 'wouter';
import UserProfile from '@/components/UserProfile';

export default function Profile() {
  const [, setLocation] = useLocation();

  const handleBack = () => {
    setLocation('/');
  };

  return (
    <UserProfile onBack={handleBack} />
  );
}