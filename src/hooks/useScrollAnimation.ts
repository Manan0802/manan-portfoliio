import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollAnimationOptions {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
}

export const useScrollAnimation = ({
  from = { opacity: 0, y: 50 },
  to = { opacity: 1, y: 0, duration: 1 },
  threshold = 0.1,
}: UseScrollAnimationOptions = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        from,
        {
          ...to,
          scrollTrigger: {
            trigger: element,
            start: `top ${1 - threshold * 100}%`,
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [from, to, threshold]);

  return elementRef;
};

// useCountUp now lives in ./useCountUp (keeps GSAP out of the home bundle).
