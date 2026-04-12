import React, { useEffect, useState, useCallback } from 'react';
import Spline from '@splinetool/react-spline';

export const CharacterScene: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [mobileLeft, setMobileLeft] = useState('50%');

  const computeLayout = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const mobile = vw < 768;
    setIsMobile(mobile);

    if (!mobile) {
      setMobileLeft('50%');
      return;
    }

    /*
      Dynamic centering formula — works on ANY phone screen.

      The Spline canvas is forced into landscape using min-width: 200vh.
      The robot sits at ~51% horizontal in the Spline scene.
      
      We calculate the exact CSS left% needed to center the robot
      on the phone viewport, regardless of screen dimensions.
      
      canvasWidth = max(vw, vh * 16/9)   — forced landscape
      robotPx = canvasWidth * 0.51       — robot's X position in pixels
      
      To center the robot on screen:
        canvasLeftEdge = vw/2 - robotPx
        canvasCenterPx = canvasLeftEdge + canvasWidth/2
        leftPercent = canvasCenterPx / vw * 100
    */
    const canvasWidth = Math.max(vw, vh * (16 / 9));
    const robotPx = canvasWidth * 0.51;
    const canvasCenterPx = (vw / 2) - robotPx + (canvasWidth / 2);
    const leftPct = (canvasCenterPx / vw) * 100;
    
    setMobileLeft(`${leftPct}%`);
  }, []);

  useEffect(() => {
    computeLayout();
    window.addEventListener('resize', computeLayout);
    window.addEventListener('orientationchange', computeLayout);

    const timeout = setTimeout(() => {
      if (!hasLoaded) {
        setShowFallback(true);
      }
    }, 15000);

    return () => {
      window.removeEventListener('resize', computeLayout);
      window.removeEventListener('orientationchange', computeLayout);
      clearTimeout(timeout);
    };
  }, [computeLayout, hasLoaded]);

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
    - Desktop: canvas fills viewport (already landscape). left: 50%.
    - Mobile: canvas forced landscape via min-width: 200vh.
      Left offset dynamically computed to center the robot on the phone screen.
      Works on ALL phones: Redmi, OnePlus, Samsung, iPhone, Pixel, etc.
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
          left: mobileLeft,
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
