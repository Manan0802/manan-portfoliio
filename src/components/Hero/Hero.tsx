import React, { useState, useEffect } from 'react';
import { CharacterScene } from '../Character/CharacterScene';
import { GlowButton } from '../shared/GlowButton';

const taglines = [
  'Building AI Agents',
  'LLM & Agentic Workflows',
  'Full Stack Developer',
  'ML Engineer @ IndiaMART',
];

export const Hero: React.FC = () => {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentFullText = taglines[currentTagline];
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayedText.length < currentFullText.length) {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        } else {
          // Wait before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          // Move to next tagline
          setIsDeleting(false);
          setCurrentTagline((prev) => (prev + 1) % taglines.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentTagline]);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume/Manan_Kumar_Resume.pdf';
    link.download = 'Manan_Kumar_Resume.pdf';
    link.click();
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* 3D Character Background */}
      <CharacterScene showParticles={true} particleCount={15000} />

      {/* Name behind character */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1
          className="font-bebas font-black text-white opacity-20 select-none"
          style={{
            fontSize: 'clamp(80px, 15vw, 200px)',
            letterSpacing: '0.1em',
          }}
        >
          MANAN KUMAR
        </h1>
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        {/* Tagline with typewriter effect */}
        <div className="mt-48 md:mt-32 text-center pointer-events-auto">
          <p className="text-lg md:text-xl text-secondary font-space-grotesk h-8">
            {displayedText}
            <span className="typewriter-cursor" />
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="absolute bottom-32 md:bottom-24 flex flex-col md:flex-row gap-4 pointer-events-auto">
          <GlowButton
            variant="primary"
            size="lg"
            onClick={scrollToProjects}
          >
            View My Work
          </GlowButton>
          <GlowButton
            variant="outline"
            size="lg"
            onClick={handleDownloadResume}
          >
            Download Resume
          </GlowButton>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
};
