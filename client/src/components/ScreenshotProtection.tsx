import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export function ScreenshotProtection() {
  const { user } = useAuth();
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Comprehensive keyboard shortcut blocking
    const handleKeyDown = (e: KeyboardEvent) => {
      // PrintScreen key
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        navigator.clipboard.writeText('').catch(() => {
          // Silently catch clipboard errors
        });
        return false;
      }

      // Windows Snipping Tool: Win+Shift+S
      if (e.key === 'S' && e.shiftKey && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        return false;
      }

      // Windows Game Bar: Win+G
      if (e.key === 'g' && e.metaKey) {
        e.preventDefault();
        return false;
      }

      // Mac screenshot shortcuts: Cmd+Shift+3, Cmd+Shift+4, Cmd+Shift+5
      if (e.metaKey && e.shiftKey && ['3', '4', '5'].includes(e.key)) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+P (Print)
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+S (Save)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+Shift+I and F12 (DevTools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
      }

      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
    };

    // Blur content when window loses focus (potential screen recording or snipping)
    const handleBlur = () => {
      setIsBlurred(true);
    };

    const handleFocus = () => {
      setIsBlurred(false);
    };

    // Detect visibility change (tab switch, minimize, etc.)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsBlurred(true);
      } else {
        setIsBlurred(false);
      }
    };

    // Block copy on non-input elements (allow copying from forms for usability)
    const handleCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      // Allow copying from input and textarea fields
      if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
        e.preventDefault();
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('copy', handleCopy);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('copy', handleCopy);
    };
  }, []);

  // Don't render protection overlays for non-authenticated users
  if (!user) return null;

  return (
    <>
      {/* Blur overlay when window loses focus - prevents screen recording */}
      {isBlurred && (
        <div 
          className="fixed inset-0 z-[99999] backdrop-blur-xl bg-black/60 flex items-center justify-center"
          style={{ pointerEvents: 'none' }}
        >
          <div className="text-white text-2xl font-bold bg-black/50 px-8 py-4 rounded-lg">
            Content Protected
          </div>
        </div>
      )}

      {/* Dynamic Watermark Overlay - makes screenshots traceable */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9998] select-none overflow-hidden"
        style={{
          background: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 200px,
            rgba(255, 255, 255, 0.015) 200px,
            rgba(255, 255, 255, 0.015) 400px
          )`
        }}
      >
        {/* Multiple watermark positions for traceability */}
        <div className="absolute top-[8%] left-[8%] text-white/[0.03] text-[10px] rotate-[-25deg] select-none font-mono">
          {user.email} • {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
        </div>
        <div className="absolute top-[25%] right-[12%] text-white/[0.03] text-[10px] rotate-[25deg] select-none font-mono">
          {user.email} • {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
        </div>
        <div className="absolute bottom-[18%] left-[18%] text-white/[0.03] text-[10px] rotate-[-25deg] select-none font-mono">
          {user.email} • {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
        </div>
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-white/[0.03] text-[11px] rotate-[-25deg] select-none font-mono">
          {user.email} • {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
        </div>
        <div className="absolute bottom-[8%] right-[8%] text-white/[0.03] text-[10px] rotate-[25deg] select-none font-mono">
          {user.email} • {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
        </div>
        <div className="absolute top-[40%] left-[25%] text-white/[0.03] text-[10px] rotate-[-25deg] select-none font-mono">
          {user.email}
        </div>
        <div className="absolute top-[65%] right-[30%] text-white/[0.03] text-[10px] rotate-[25deg] select-none font-mono">
          {user.email}
        </div>
      </div>
    </>
  );
}
