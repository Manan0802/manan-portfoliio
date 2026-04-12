import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';

export const CharacterScene: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // If Spline doesn't load in 10s on mobile, show gradient fallback
    const timeout = setTimeout(() => {
      if (!hasLoaded && isMobile) {
        setShowFallback(true);
      }
    }, 10000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeout);
    };
  }, [hasLoaded, isMobile]);

  useEffect(() => {
    // Remove Spline watermark
    const removeWatermark = () => {
      const viewer = document.querySelector('spline-viewer');
      if (viewer && viewer.shadowRoot) {
        const logo = viewer.shadowRoot.querySelector('#logo');
        if (logo) logo.remove();
      }
    };
    
    const intervalId = setInterval(removeWatermark, 500);
    setTimeout(() => clearInterval(intervalId), 10000);
    return () => clearInterval(intervalId);
  }, []);

  if (showFallback) {
    return (
      <div className="absolute inset-0 z-[2] flex items-center justify-center">
        <div className="w-[80vw] h-[80vw] max-w-[500px] max-h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(139,92,246,0.1) 50%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'pulse 4s ease-in-out infinite',
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 z-[2]"
      style={{
        // On mobile: no pointer events to avoid scroll hijack, but keep the model FULL SIZE
        pointerEvents: isMobile ? 'none' : 'auto',
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
