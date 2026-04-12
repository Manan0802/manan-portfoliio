import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiCode } from 'react-icons/fi';

const CharacterScene = React.lazy(() => 
  import('../Character/CharacterScene').then(m => ({ default: m.CharacterScene }))
);

const taglines = [
  'I build AI systems that think.',
  'LLM Pipelines. Agentic Flows.',
  'From first principles to production.',
  'AI Architect. Full Stack Engineer.',
];

export const Hero: React.FC = () => {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentFullText = taglines[currentTagline];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentFullText.length) {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2500);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTagline((prev) => (prev + 1) % taglines.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentTagline]);

  const navigate = useNavigate();

  const scrollToProjects = () => {
    navigate('/projects');
  };

  const scrollToContact = () => {
    navigate('/contact');
  };

  return (
    <section
      id="hero"
      className="relative w-full flex flex-col justify-end"
      style={{ height: '100dvh', minHeight: '600px', background: '#000000' }}
    >
      {/* Spline 3D Scene - Lazy loaded for Performance */}
      <Suspense 
        fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-black z-0">
            <div className="w-64 h-64 rounded-full bg-emerald-500/10 blur-[100px] animate-pulse" />
          </div>
        }
      >
        <CharacterScene />
      </Suspense>

      {/* 
        This is a subtle gradient mask at the very bottom of the hero section 
        that seamlessly blends the Spline canvas into the About section below.
      */}
      <div 
        className="absolute bottom-0 left-0 w-full h-32 pointer-events-none" 
        style={{ zIndex: 3, background: 'linear-gradient(to bottom, transparent, #000000)' }} 
      />

      {/* Layer 4: Content Overlay aligned to blend nicely with the character */}
      <div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 pb-20 md:pb-12 flex flex-col md:flex-row justify-between items-start md:items-end pointer-events-none"
      >
        <div className="max-w-lg pointer-events-auto">
          {/* Glassmorphic Availability badge (Premium Gen Z Aesthetic) */}
          <div
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-6 backdrop-blur-md"
            style={{
              background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 4px 20px -2px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)',
            }}
          >
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span
              className="text-[10px] font-bold tracking-widest uppercase"
              style={{ 
                color: 'rgba(255,255,255,0.8)',
                letterSpacing: '0.15em'
              }}
            >
              Available for work
            </span>
          </div>

          {/* Premium Typography Tagline */}
          <div className="mb-8">
            <h1
              className="font-space-grotesk text-xl md:text-2xl font-medium tracking-tight"
              style={{ color: '#ffffff', minHeight: '36px' }}
            >
              <span className="sr-only">Manan Kumar - AI Architect and Full Stack Engineer</span>
              {displayedText}
              <span
                className="inline-block w-0.5 h-6 ml-1 align-middle"
                style={{
                  background: '#ffffff',
                  animation: 'blink 1s step-end infinite',
                }}
              />
            </h1>
          </div>

          {/* Primary CTA — single clear action (Jobs principle) */}
          <div className="flex flex-wrap gap-4 relative">
            <button
              onClick={scrollToProjects}
              className="group relative px-8 py-3.5 rounded-full text-sm font-bold tracking-wide overflow-hidden transition-all duration-300 pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black min-h-[48px]"
              style={{
                background: '#ffffff',
                color: '#000000',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px -10px rgba(255,255,255,0.6)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              View My Work →
            </button>

            <button
              onClick={scrollToContact}
              className="px-8 py-3.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 pointer-events-auto backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black min-h-[48px]"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#ffffff',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
              }}
            >
              Book a Call
            </button>
          </div>
        </div>

        {/* Right-side minimal social links - Stacked on mobile, absolute on desktop */}
        <div className="flex md:hidden gap-4 mt-12 pointer-events-auto">
          {[
            { icon: <FiGithub size={24} />, label: 'GitHub', href: 'https://github.com/Manan0802' },
            { icon: <FiLinkedin size={24} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/manan-kumar-2229291b9/' },
            { icon: <FiCode size={24} />, label: 'LeetCode', href: 'https://leetcode.com/u/04manank/' },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit my ${social.label}`}
              className="text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-3 min-w-[44px] min-h-[44px] flex items-center justify-center bg-white/5"
            >
              {social.icon}
            </a>
          ))}
        </div>

        <div className="hidden md:flex gap-8 pointer-events-auto absolute bottom-12 right-12 z-20">
          {[
            { icon: <FiGithub size={24} />, label: 'GH', href: 'https://github.com/Manan0802' },
            { icon: <FiLinkedin size={24} />, label: 'LI', href: 'https://www.linkedin.com/in/manan-kumar-2229291b9/' },
            { icon: <FiCode size={24} />, label: 'LC', href: 'https://leetcode.com/u/04manank/' },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="group relative flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-full"
            >
              <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 drop-shadow-md">
                {social.icon}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator - Centered at the very bottom right before About section */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span
            className="text-[10px] tracking-widest uppercase font-semibold"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            scroll
          </span>
          <div
            className="w-px h-6"
            style={{
              background:
                'linear-gradient(to bottom, rgba(59,130,246,0.5), transparent)',
            }}
          />
        </div>
      </div>
    </section>
  );
};
