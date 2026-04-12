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
    }, 12000);

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
    The Spline scene is landscape (~16:9) with robot at center and "MANAN" text behind.
    On a portrait phone, only the far-left is visible.
    
    Mobile fix: Force the Spline canvas into a landscape aspect ratio (100vw × 56vw = 16:9)
    and center it vertically within the hero. This preserves the scene's intended framing
    while keeping the robot centered on screen.
  */
  if (isMobile) {
    return (
      <div
        className="absolute inset-0 z-[2] flex items-center justify-center overflow-hidden"
        style={{ pointerEvents: 'none' }}
      >
        <div
          style={{
            width: '300vw',
            height: '168.75vw', /* 300 * 9/16 = landscape ratio */
            flexShrink: 0,
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
  }

  // Desktop — full viewport, interactive
  return (
    <div
      className="absolute inset-0 z-[2]"
      style={{ pointerEvents: 'auto' }}
    >
      <Spline
        scene="https://prod.spline.design/9AC1QFiaRuUHJ3rB/scene.splinecode"
        onLoad={() => setHasLoaded(true)}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};
