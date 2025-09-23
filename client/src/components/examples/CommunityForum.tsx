import CommunityForum from '../CommunityForum';

export default function CommunityForumExample() {
  return (
    <CommunityForum 
      onBack={() => console.log('Back clicked')}
    />
  );
}