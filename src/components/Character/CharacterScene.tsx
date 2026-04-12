import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';

export const CharacterScene: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Detect mobile/low-power devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Fallback timeout — if Spline doesn't load in 8s on mobile, show static fallback
    const timeout = setTimeout(() => {
      if (!hasLoaded && isMobile) {
        setShowFallback(true);
      }
    }, 8000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeout);
    };
  }, [hasLoaded, isMobile]);

  useEffect(() => {
    // Continuously try to remove the watermark from the shadow DOM
    const removeWatermark = () => {
      const viewer = document.querySelector('spline-viewer');
      if (viewer && viewer.shadowRoot) {
        const logo = viewer.shadowRoot.querySelector('#logo');
        if (logo) {
          logo.remove();
        }
      }
    };
    
    const intervalId = setInterval(removeWatermark, 500);
    setTimeout(() => clearInterval(intervalId), 10000);
    return () => clearInterval(intervalId);
  }, []);

  // Static gradient fallback for when 3D can't load
  if (showFallback) {
    return (
      <div className="absolute inset-0 z-[2] flex items-center justify-center">
        <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(139,92,246,0.1) 50%, transparent 70%)',
            filter: 'blur(40px)',
            animation: 'pulse 4s ease-in-out infinite',
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 z-[2] flex items-center justify-center"
      style={{
        // On mobile: disable pointer events to prevent scroll-hijack, scale down slightly
        pointerEvents: isMobile ? 'none' : 'auto',
        transform: isMobile ? 'scale(0.85)' : 'scale(1)',
        transformOrigin: 'center center',
      }}
    >
      <Spline
        scene="https://prod.spline.design/9AC1QFiaRuUHJ3rB/scene.splinecode"
        onLoad={() => setHasLoaded(true)}
        style={{ 
          width: '100%', 
          height: '100%',
        }}
      />
    </div>
  );
};
