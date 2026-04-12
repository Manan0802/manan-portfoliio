import React, { useEffect } from 'react';
import { useCursor } from '../../hooks/useCursor';

export const CustomCursor: React.FC = () => {
  const { cursor, ringX, ringY, setHovering, setOverCharacter } = useCursor();

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest('a, button, [data-cursor="hover"]')) {
        setHovering(true, 'VIEW');
      } else if (target.closest('.character-container, [data-cursor="character"]')) {
        setOverCharacter(true);
      } else {
        setHovering(false);
        setOverCharacter(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, [setHovering, setOverCharacter]);

  return (
    <>
      <div
        className="custom-cursor hidden md:block"
        style={{
          left: cursor.x,
          top: cursor.y,
        }}
      >
        <div className="custom-cursor-dot" />
        <div
          className={`custom-cursor-ring ${cursor.isHovering ? 'hover' : ''} ${cursor.isOverCharacter ? 'character' : ''}`}
          style={{
            left: ringX,
            top: ringY,
          }}
        />
        {cursor.isHovering && cursor.hoverText && (
          <div
            className="absolute text-white text-xs font-mono pointer-events-none"
            style={{
              left: ringX,
              top: ringY + 50,
              transform: 'translateX(-50%)',
            }}
          >
            {cursor.hoverText}
          </div>
        )}
      </div>
    </>
  );
};
