import { useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useLocation } from 'wouter';

interface AdSlotProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  style?: React.CSSProperties;
  className?: string;
  layout?: string;
  layoutKey?: string;
}

export function AdSlot({ 
  slot, 
  format = 'auto', 
  style,
  className = '',
  layout,
  layoutKey
}: AdSlotProps) {
  const { user } = useAuth();
  const adRef = useRef<HTMLModElement>(null);
  const [, setLocation] = useLocation();

  // Only show ads to free tier users
  const shouldShowAd = user?.subscriptionTier === 'free';

  useEffect(() => {
    if (!shouldShowAd) return;

    try {
      // Push ad to AdSense queue
      const timer = setTimeout(() => {
        if (window.adsbygoogle && adRef.current) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      }, 100);

      return () => clearTimeout(timer);
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [shouldShowAd, slot]);

  // Don't render anything for non-free users
  if (!shouldShowAd) {
    return null;
  }

  // Get publisher ID from environment variable
  const publisherId = import.meta.env.VITE_ADSENSE_PUBLISHER_ID || 'ca-pub-0000000000000000';

  return (
    <div className={`ad-container ${className}`}>
      {/* AdSense Ad */}
      <Card className="bg-background/50 backdrop-blur-sm border-border/50 p-4 mb-4">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{
            display: 'block',
            textAlign: 'center',
            ...style
          }}
          data-ad-client={publisherId}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
          {...(layout && { 'data-ad-layout': layout })}
          {...(layoutKey && { 'data-ad-layout-key': layoutKey })}
        />
      </Card>

      {/* Upgrade Prompt */}
      <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 backdrop-blur-sm border-primary/20 p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-1">Enjoy an Ad-Free Experience</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Upgrade to Standard or Premium for uninterrupted access to all procedures and content.
            </p>
            <Button 
              size="sm"
              onClick={() => setLocation('/subscribe')}
              className="bg-primary hover:bg-primary/90 text-white"
              data-testid="button-upgrade-from-ad"
            >
              Upgrade Now
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Declare window.adsbygoogle for TypeScript
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}
