import { useEffect } from 'react';

export function ScreenshotProtection() {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable print screen and other keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable PrintScreen
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        navigator.clipboard.writeText('').catch(() => {
          // Silently catch clipboard errors in browsers that block this
        });
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

      // Disable Ctrl+Shift+I (DevTools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
      }

      // Disable F12 (DevTools)
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
    };

    // Detect devtools
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if (widthThreshold || heightThreshold) {
        // DevTools detected - could blur content
        document.body.style.filter = 'blur(5px)';
      } else {
        document.body.style.filter = 'none';
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Check for devtools on resize
    window.addEventListener('resize', detectDevTools);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', detectDevTools);
      document.body.style.filter = 'none';
    };
  }, []);

  return null;
}
