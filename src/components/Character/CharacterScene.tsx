import React, { useEffect } from 'react';
import Spline from '@splinetool/react-spline';

export const CharacterScene: React.FC = () => {
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
    
    // Check multiple times as it loads
    const intervalId = setInterval(removeWatermark, 500);
    setTimeout(() => clearInterval(intervalId), 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="absolute inset-0 z-[2] flex items-center justify-center max-md:pointer-events-none pointer-events-auto"
    >
      <Spline
        scene="https://prod.spline.design/9AC1QFiaRuUHJ3rB/scene.splinecode"
        style={{ 
          width: '100%', 
          height: '100%',
        }}
      />
    </div>
  );
};
