import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const storyLines = [
  "It started with a curiosity about how machines could think.",
  "From cracking JEE with AIR 15,233 to joining DTU's Software Engineering program, I always chased the intersection of intelligence and engineering.",
  "At IndiaMART, I built AI systems that normalize data for 17,000+ product categories — real pipelines, real scale, real impact.",
  "Now I'm obsessed with Agentic AI — systems that don't just respond, but think, plan, and act autonomously.",
  "This portfolio is not just my work. It's proof of what's possible.",
];

export const Story: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<HTMLParagraphElement[]>([]);

  useGSAP(() => {
    lineRefs.current.forEach((ref) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            scrollTrigger: {
              trigger: ref,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });
  }, { scope: containerRef });

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Glowing vertical line */}
      <div className="absolute left-8 md:left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0" />

      <div ref={containerRef} className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk text-center mb-16">
          My Story
        </h2>

        <div className="space-y-12">
          {storyLines.map((line, index) => (
            <p
              key={index}
              ref={(el) => { if (el) lineRefs.current[index] = el; }}
              className="text-lg md:text-xl text-secondary leading-relaxed pl-8 border-l-2 border-primary/30"
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};
