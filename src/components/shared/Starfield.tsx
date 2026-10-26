import React, { useEffect, useRef } from 'react';

interface StarfieldProps {
  count?: number;
  className?: string;
}

// Static 2D-canvas starfield. Replaces the old WebGL (three.js) particle background on routes that
// have no other use for 3D, so those routes no longer download three/R3F. Drawn once and on resize
// only, so it costs no per-frame work and is identical with reduced motion.
export const Starfield: React.FC<StarfieldProps> = ({ count = 400, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fixed seed so stars do not jump around between resizes.
    let seed = 1337;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const stars = Array.from({ length: count }, () => ({
      x: rand(),
      y: rand(),
      r: 0.4 + rand() * 1.1,
      a: 0.25 + rand() * 0.6,
      tint: rand() > 0.8 ? '167,139,250' : rand() > 0.6 ? '147,197,253' : '255,255,255',
    }));

    const draw = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${s.tint},${s.a})`;
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [count]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`w-full h-full block ${className}`} />;
};
