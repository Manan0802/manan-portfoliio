import { useEffect, useState, useCallback } from 'react';

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  hoverText: string;
  isOverCharacter: boolean;
}

export const useCursor = () => {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    hoverText: '',
    isOverCharacter: false,
  });

  const [ringX, setRingX] = useState(0);
  const [ringY, setRingY] = useState(0);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursor(prev => ({ ...prev, x: e.clientX, y: e.clientY }));

      // Smooth lerp for ring
      setRingX(prev => prev + (e.clientX - prev) * 0.15);
      setRingY(prev => prev + (e.clientY - prev) * 0.15);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const setHovering = useCallback((isHovering: boolean, text: string = '') => {
    setCursor(prev => ({ ...prev, isHovering, hoverText: text }));
  }, []);

  const setOverCharacter = useCallback((isOver: boolean) => {
    setCursor(prev => ({ ...prev, isOverCharacter: isOver }));
  }, []);

  return {
    cursor,
    ringX,
    ringY,
    setHovering,
    setOverCharacter,
  };
};
