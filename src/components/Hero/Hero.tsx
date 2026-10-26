import React, { useState, useEffect, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiCode } from 'react-icons/fi';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useAfterFirstPaint } from '../../hooks/useAfterFirstPaint';

const CharacterScene = React.lazy(() =>
  import('../Character/CharacterScene').then(m => ({ default: m.CharacterScene }))
);

const taglines = [
  'I build AI agents that ship to production.',
  'LLM Agents · RAG · Evals · Voice AI.',
  'Intent accuracy 68% → 96%, in production.',
  'AI Engineer. Python / FastAPI.',
];

const socials = [
  { icon: FiGithub, label: 'GitHub', href: 'https://github.com/Manan0802' },
  { icon: FiLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/manan-kumar-2229291b9/' },
  { icon: FiCode, label: 'LeetCode', href: 'https://leetcode.com/u/04manank/' },
];

// Data-saver users and very low-memory devices get the plain glow instead of a ~2 MB scene.
const isConstrainedDevice = () => {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  return nav.connection?.saveData === true || (nav.deviceMemory !== undefined && nav.deviceMemory <= 2);
};

export const Hero: React.FC = () => {
  const reducedMotion = useReducedMotion();
  // Start the 3D scene only after the hero text has painted and the browser is idle,
  // so the Spline/three download and boot never delay first paint or the headline.
  const show3D = useAfterFirstPaint(1500) && !isConstrainedDevice();
  const [currentTagline, setCurrentTagline] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect (off with reduced motion: the first tagline is shown statically)
  useEffect(() => {
    if (reducedMotion) return;

    const currentFullText = taglines[currentTagline];
    let pause: ReturnType<typeof setTimeout> | undefined;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentFullText.length) {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        } else {
          pause = setTimeout(() => setIsDeleting(true), 2500);
        }
      } else if (displayedText.length > 0) {
        setDisplayedText(displayedText.slice(0, -1));
      } else {
        setIsDeleting(false);
        setCurrentTagline((prev) => (prev + 1) % taglines.length);
      }
    }, isDeleting ? 40 : 80);

    return () => {
      clearTimeout(timeout);
      if (pause) clearTimeout(pause);
    };
  }, [displayedText, isDeleting, currentTagline, reducedMotion]);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative w-full flex flex-col justify-end"
      style={{ height: '100dvh', minHeight: '600px', background: '#000000' }}
    >
      {/* Spline 3D Scene - decorative, loaded after first paint */}
      {show3D && (
        <Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center bg-black z-0">
              <div className="w-64 h-64 rounded-full bg-emerald-500/10 blur-[100px] animate-pulse" />
            </div>
          }
        >
          <CharacterScene />
        </Suspense>
      )}

      {/* Gradient mask at the very bottom: blends the canvas into the section below */}
      <div
        className="absolute bottom-0 left-0 w-full h-32 pointer-events-none"
        style={{ zIndex: 3, background: 'linear-gradient(to bottom, transparent, #000000)' }}
      />

      {/* Mobile scrim: keeps the text readable over the 3D letters on narrow screens */}
      <div
        className="md:hidden absolute bottom-0 left-0 w-full pointer-events-none"
        style={{
          zIndex: 4,
          height: '66%',
          background: 'linear-gradient(to top, #000000 0%, rgba(0,0,0,0.93) 55%, rgba(0,0,0,0.72) 78%, transparent 100%)',
        }}
      />

      {/* Content overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-12 flex flex-col md:flex-row justify-between items-start md:items-end pointer-events-none">
        <div className="max-w-xl pointer-events-auto">
          {/* Availability badge */}
          <div
            className="inline-flex items-center gap-2.5 md:gap-3 px-3.5 md:px-4 py-2 rounded-full mb-5 backdrop-blur-md"
            style={{
              background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 4px 20px -2px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)',
            }}
          >
            <div className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="text-xs font-bold uppercase text-white/85 tracking-[0.06em] md:tracking-[0.12em]">
              Available for freelance AI projects
            </span>
          </div>

          {/* Name — the page's only h1 */}
          <h1 className="font-space-grotesk text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.02]">
            Manan Kumar
          </h1>
          <p className="mt-3 font-space-grotesk text-lg md:text-2xl font-medium text-white/90 leading-snug">
            AI Engineer — LLM agents, RAG, evals and voice AI
          </p>

          {/* Secondary: typewriter taglines (decorative; the role line above carries the same message) */}
          <p
            aria-hidden="true"
            className="mt-3 font-space-grotesk text-sm md:text-base text-white/70"
            style={{ minHeight: '1.75rem' }}
          >
            {reducedMotion ? taglines[0] : displayedText}
            {!reducedMotion && (
              <span
                className="inline-block w-0.5 h-4 ml-1 align-middle"
                style={{ background: '#ffffff', animation: 'blink 1s step-end infinite' }}
              />
            )}
          </p>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap gap-3 md:gap-4">
            <Link
              to="/projects"
              className="group inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 min-h-[48px] bg-white text-black hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(255,255,255,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              See my work →
            </Link>

            <Link
              to="/services"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 min-h-[48px] text-white backdrop-blur-md border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Hire me for a project
            </Link>
          </div>
        </div>

        {/* Social links: row under the CTAs on mobile, bottom-right on desktop */}
        <ul className="flex md:hidden gap-3 mt-8 pointer-events-auto">
          {socials.map(({ icon: Icon, label, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit my ${label}`}
                className="text-white/70 hover:text-white transition-colors rounded-lg p-3 min-w-[44px] min-h-[44px] flex items-center justify-center bg-white/5"
              >
                <Icon size={22} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <ul className="hidden md:flex gap-8 pointer-events-auto absolute bottom-12 right-12 z-20">
          {socials.map(({ icon: Icon, label, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit my ${label}`}
                className="group relative flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110 rounded-full"
              >
                <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 drop-shadow-md">
                  <Icon size={24} aria-hidden="true" />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Scroll indicator */}
      <div className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10" aria-hidden="true">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs tracking-widest uppercase font-semibold text-white/50">scroll</span>
          <div
            className="w-px h-6"
            style={{ background: 'linear-gradient(to bottom, rgba(59,130,246,0.5), transparent)' }}
          />
        </div>
      </div>
    </section>
  );
};
