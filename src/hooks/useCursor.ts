import { useEffect } from 'react';
import type { RefObject } from 'react';

interface CursorRefs {
  dot: RefObject<HTMLDivElement | null>;
  ring: RefObject<HTMLDivElement | null>;
  label: RefObject<HTMLDivElement | null>;
}

/**
 * Drives the custom cursor without React state: one rAF loop writes transforms straight to the DOM.
 * The dot snaps to the pointer; the ring follows with a lerp. Both are position:fixed and
 * positioned in viewport coordinates, so they always sit on the real pointer.
 */
export const useCursor = ({ dot, ring, label }: CursorRefs) => {
  useEffect(() => {
    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let started = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!started) {
        // First move: start the ring on the pointer instead of flying in from the corner.
        ringX = targetX;
        ringY = targetY;
        started = true;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const ringEl = ring.current;
      const labelEl = label.current;
      if (!target || !ringEl) return;

      const interactive = !!target.closest('a, button, [data-cursor="hover"]');
      const onCharacter = !interactive && !!target.closest('.character-container, [data-cursor="character"]');
      ringEl.classList.toggle('hover', interactive);
      ringEl.classList.toggle('character', onCharacter);
      if (labelEl) labelEl.style.opacity = interactive ? '1' : '0';
    };

    const tick = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      if (ring.current) ring.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      if (label.current) label.current.style.transform = `translate3d(${ringX}px, ${ringY + 44}px, 0) translateX(-50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, [dot, ring, label]);
};
