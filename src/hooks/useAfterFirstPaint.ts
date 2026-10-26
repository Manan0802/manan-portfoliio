import { useEffect, useState } from 'react';

/**
 * Flips to true once the browser has painted and gone idle (or after `timeoutMs` at the latest).
 * Used to start heavy, non-critical work (3D scene, below-the-fold sections) after the hero text is visible.
 */
export const useAfterFirstPaint = (timeoutMs = 1000): boolean => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const go = () => {
      if (!cancelled) setReady(true);
    };

    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(go, { timeout: timeoutMs });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    // Safari: no requestIdleCallback
    const id = window.setTimeout(go, 300);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, [timeoutMs]);

  return ready;
};
