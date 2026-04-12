import React, { useEffect, useState } from 'react';
import { useLoading } from '../../context/LoadingContext';
import './Loader.css';

const bootLogs = [
  'KERNEL: Initializing core systems...',
  'NEURAL: Loading AI inference models...',
  'MEMORY: Allocating 64TB unified memory...',
  'GPU: Warming up tensor cores...',
  'SYSTEM: Bypassing security protocols...',
  'UI: Constructing DOM structures...',
  'MATRIX: Rendering 3D environment...',
  'STATUS: ALL SYSTEMS NOMINAL',
];

const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

// Text Scrambler Component
const ScrambleText = ({ text, delay = 0, isReady = false }: { text: string; delay?: number; isReady?: boolean }) => {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isReady) {
      timeout = setTimeout(() => setStarted(true), delay);
    }
    return () => clearTimeout(timeout);
  }, [isReady, delay]);

  useEffect(() => {
    if (!started) return;
    
    let iterations = 0;
    
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iterations) return text[i];
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join('')
      );
      
      if (iterations >= text.length) {
        clearInterval(interval);
      }
      
      iterations += 1/3;
    }, 30);
    
    return () => clearInterval(interval);
  }, [text, started]);

  return <span>{started ? displayText : ''.padEnd(text.length, '_')}</span>;
};


export const Loader: React.FC = () => {
  const { setProgress, completeLoading } = useLoading();
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'ready' | 'exit'>('loading');
  const [currentLogIndex, setCurrentLogIndex] = useState(0);

  // Simulated progress
  useEffect(() => {
    const startTime = Date.now();
    const totalDuration = 3500; // slightly longer for dramatic effect

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, (elapsed / totalDuration) * 100);
      
      // Custom easing function (easeOutExpo)
      const eased = rawProgress === 100 ? 1 : 1 - Math.pow(2, -10 * rawProgress / 100);
      const displayValue = Math.floor(eased * 100);

      setProgress(displayValue);
      setDisplayPercentage(displayValue);

      if (rawProgress < 100) {
        requestAnimationFrame(animate);
      } else {
        setPhase('reveal');
        setTimeout(() => setPhase('ready'), 200);
        setTimeout(() => {
          setPhase('exit');
          setTimeout(() => completeLoading(), 1500); // Wait for shutter animation
        }, 2000);
      }
    };

    requestAnimationFrame(animate);
  }, [setProgress, completeLoading]);

  // Cycle boot logs quickly
  useEffect(() => {
    if (phase !== 'loading') return;
    const interval = setInterval(() => {
      setCurrentLogIndex((prev) => Math.min(prev + 1, bootLogs.length - 1));
    }, 350);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className={`loader-container ${phase === 'exit' ? 'pointer-events-none' : ''}`}>
      {/* Split Shutter Doors */}
      <div className={`loader-shutter top ${phase === 'exit' ? 'open' : ''}`} />
      <div className={`loader-shutter bottom ${phase === 'exit' ? 'open' : ''}`} />
      
      {/* Main UI Overlay - Fades out before doors open */}
      <div className={`loader-ui ${phase === 'exit' ? 'fade-out' : ''}`}>
        
        {/* Animated grid background */}
        <div className="loader-grid" />
        <div className="loader-scanline" />

        {/* Ambient Glows */}
        <div className="loader-ambient-orb orb-primary" />
        <div className="loader-ambient-orb orb-secondary" />

        {/* Central HUD Element */}
        <div className="loader-hud-core">
          {/* Rotating Rings */}
          <div className="loader-ring ring-outer" />
          <div className="loader-ring ring-inner" />
          <div className="loader-ring ring-dashed" />
          
          {/* Center Content */}
          <div className="loader-hud-center">
            {phase === 'loading' ? (
              <div className="loader-percentage">
                <span className="value">{String(displayPercentage).padStart(3, '0')}</span>
                <span className="symbol">%</span>
              </div>
            ) : (
              <div className={`loader-lock-icon ${phase === 'ready' || phase === 'exit' ? 'unlocked' : ''}`}>
                <div className="loader-lock-shackle" />
                <div className="loader-lock-body" />
              </div>
            )}
          </div>
        </div>

        {/* Name Reveal with Scramble */}
        <div className="loader-branding">
          <div className="loader-name-scrambled font-bebas">
            <ScrambleText text="MANAN KUMAR" delay={0} isReady={phase === 'reveal' || phase === 'ready'} />
          </div>
          <div className={`loader-role ${phase === 'ready' ? 'glitch-in' : ''}`}>
             <ScrambleText text="AI ENGINEER & FULL STACK DEVELOPER" delay={800} isReady={phase === 'reveal' || phase === 'ready'} />
          </div>
        </div>

        {/* Boot Logs Terminal */}
        <div className="loader-boot-logs">
          {bootLogs.slice(0, currentLogIndex + 1).map((log, i) => (
            <div key={i} className="loader-log-line">
              <span className="loader-log-prefix">[OK]</span> {log}
            </div>
          ))}
          {phase === 'loading' && <div className="loader-cursor" />}
        </div>

        {/* Bottom Loading Bar */}
        <div className="loader-hud-bar-container">
          <div className="loader-hud-bar-track">
            {/* Hexagon segments inside the bar */}
            {Array.from({ length: 40 }).map((_, i) => (
              <div 
                key={i} 
                className={`loader-hud-segment ${i < (displayPercentage / 100 * 40) ? 'filled' : ''}`} 
              />
            ))}
          </div>
          <div className="loader-hud-status">
            {phase === 'loading' ? 'AUTHENTICATING...' : 'ACCESS GRANTED'}
          </div>
        </div>

      </div>
    </div>
  );
};
