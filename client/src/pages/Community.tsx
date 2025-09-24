import { useLocation } from 'wouter';
import CommunityForum from '@/components/CommunityForum';
import surgicalBg from '@assets/stock_images/surgical_operating_r_269f4a87.jpg';

export default function Community() {
  const [, setLocation] = useLocation();

  const handleBack = () => {
    setLocation('/');
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${surgicalBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 surgical-bg"></div>
      
      <div className="relative z-10">
        <CommunityForum onBack={handleBack} />
      </div>
    </div>
  );
}