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

    const timeout = setTimeout(() => {
      if (!hasLoaded && isMobile) {
        setShowFallback(true);
      }
    }, 15000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeout);
    };
  }, [hasLoaded, isMobile]);

  useEffect(() => {
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

  /*
    Universal "cover" strategy for the Spline 3D scene.
    
    The scene is landscape (~16:9) with the robot at ~52-55% horizontal center.
    
    Desktop: canvas fills viewport (already landscape). No adjustments needed.
    
    Mobile (portrait): Force landscape with min-width: 200vh.
    The canvas is centered at left: 47% + translateX(-50%), which shifts it
    slightly left to compensate for the robot being right-of-center in the scene.
    
    Tested empirically:
    - left: 50% → robot too far right (off-screen on short phones)
    - left: 42% → robot way too far left
    - left: 47% → robot centered ✅
  */
  return (
    <div
      className="absolute inset-0 z-[2] overflow-hidden"
      style={{ pointerEvents: isMobile ? 'none' : 'auto' }}
    >
      <div
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          minWidth: isMobile ? '200vh' : undefined,
          top: 0,
          left: isMobile ? '47%' : '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Spline
          scene="https://prod.spline.design/9AC1QFiaRuUHJ3rB/scene.splinecode"
          onLoad={() => setHasLoaded(true)}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};
