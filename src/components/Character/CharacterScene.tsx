/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState, useCallback } from 'react';
import Spline from '@splinetool/react-spline';

/*
  EMPIRICALLY CALIBRATED — 160vh CANVAS
  ──────────────────────────────────────
  
  Uses 160vh min-width (instead of 200vh) so MORE of the MANAN name
  is visible on mobile while still keeping the robot in frame.
  
  Robot position measured at left:50% baseline using Puppeteer:
    canvas 1067 px (iPhone SE)       →  robot at 64.0 %
    canvas 1248 px (Redmi 9A)        →  robot at 55.8 %
    canvas 1397 px (Redmi 13 Pro)    →  robot at 52.8 %
    canvas 1491 px (iPhone 14 PM)    →  robot at 50.6 %
  
  Piecewise-linear interpolation centers the robot on ANY screen.
*/

// Anchor points:  [canvasWidth, robotFactor]
// Canvas width = 1.6 × viewport height
const ANCHORS: [number, number][] = [
  [ 909, 0.715],   // iPhone 5/SE1    320×568, canvas = 1.6×568  (extrapolated)
  [1045, 0.660],   // Galaxy Fold     280×653, canvas = 1.6×653  (extrapolated)
  [1067, 0.655],   // iPhone SE       375×667  (R1: robot at 55%, +0.015)
  [1248, 0.573],   // Redmi 9A        360×780  (R1: robot at 55%, +0.015)
  [1397, 0.536],   // Redmi 13 Pro    393×873  (R1: robot at 52%, +0.008)
  [1491, 0.506],   // iPhone 14 PM    430×932  (R1: robot at 50%, perfect)
];

/** Piecewise linear interpolation between anchor points */
function getRobotFactor(canvasWidth: number): number {
  if (canvasWidth <= ANCHORS[0][0]) return ANCHORS[0][1];
  if (canvasWidth >= ANCHORS[ANCHORS.length - 1][0]) return ANCHORS[ANCHORS.length - 1][1];

  for (let i = 0; i < ANCHORS.length - 1; i++) {
    const [w0, f0] = ANCHORS[i];
    const [w1, f1] = ANCHORS[i + 1];
    if (canvasWidth >= w0 && canvasWidth <= w1) {
      const t = (canvasWidth - w0) / (w1 - w0);
      return f0 + t * (f1 - f0);
    }
  }
  return 0.55; // fallback
}

export const CharacterScene: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [canvasStyle, setCanvasStyle] = useState<React.CSSProperties>({});

  const computeLayout = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const mobile = vw < 768;
    setIsMobile(mobile);

    if (!mobile) {
      setCanvasStyle({
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
      });
      return;
    }

    // Canvas width = CSS min-width: 160vh = 1.6 × vh
    const canvasWidth = Math.max(vw, vh * 1.6);
    const robotFactor = getRobotFactor(canvasWidth);
    
    // Centre the robot on the viewport
    const robotPx = canvasWidth * robotFactor;
    const canvasCenterPx = (vw / 2) - robotPx + (canvasWidth / 2);
    const leftPct = (canvasCenterPx / vw) * 100;

    setCanvasStyle({
      position: 'absolute',
      height: '100%',
      width: '100%',
      minWidth: '160vh',
      top: 0,
      left: `${leftPct}%`,
      transform: 'translateX(-50%)',
    });
  }, []);

  useEffect(() => {
    computeLayout();
    window.addEventListener('resize', computeLayout);
    window.addEventListener('orientationchange', computeLayout);

    const timeout = setTimeout(() => {
      if (!hasLoaded) setShowFallback(true);
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

  return (
    <div
      className="absolute inset-0 z-[2] overflow-hidden"
      style={{ pointerEvents: isMobile ? 'none' : 'auto' }}
    >
      <div style={canvasStyle}>
        <Spline
          scene="https://prod.spline.design/9AC1QFiaRuUHJ3rB/scene.splinecode"
          onLoad={() => {
            setHasLoaded(true);
            window.dispatchEvent(new CustomEvent('spline-loaded'));
          }}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};
