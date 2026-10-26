import React, { useRef } from 'react';
import { useCursor } from '../../hooks/useCursor';

// Decorative cursor follower. App only mounts it for fine pointers without reduced motion;
// the native cursor always stays visible.
export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useCursor({ dot: dotRef, ring: ringRef, label: labelRef });

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
      <div ref={labelRef} className="custom-cursor-label">
        VIEW
      </div>
    </div>
  );
};
