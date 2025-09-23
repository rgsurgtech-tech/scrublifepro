import UserProfile from '../UserProfile';

export default function UserProfileExample() {
  return (
    <UserProfile 
      onBack={() => console.log('Back clicked')}
    />
  );
}