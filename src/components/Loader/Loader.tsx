import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { useLoading } from '../../context/LoadingContext';
import './Loader.css';

const glitchTexts = [
  'INITIALIZING SYSTEMS...',
  'LOADING AI MODULES...',
  'ESTABLISHING CONNECTION...',
  'WELCOME, HUMAN',
];

export const Loader: React.FC = () => {
  const { progress } = useProgress();
  const { setProgress, completeLoading } = useLoading();
  const [currentText, setCurrentText] = useState(0);
  const [displayPercentage, setDisplayPercentage] = useState(0);

  useEffect(() => {
    setProgress(progress);
    setDisplayPercentage(Math.round(progress));

    if (progress >= 100) {
      completeLoading();
    }
  }, [progress, setProgress, completeLoading, setDisplayPercentage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % glitchTexts.length);
    }, 750);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-screen">
      {/* Scanline overlay */}
      <div className="scanline-overlay" />

      {/* Loading percentage */}
      <div className="loading-percentage">{displayPercentage}%</div>

      {/* Main glitch text */}
      <div className="glitch-text-container">
        {glitchTexts.map((text, index) => (
          <div
            key={text}
            className={`glitch-text ${index === currentText ? 'active' : ''}`}
          >
            {text}
          </div>
        ))}
      </div>

      {/* MANAN KUMAR name reveal */}
      <div className="name-reveal">
        {'MANAN KUMAR'.split('').map((letter, index) => (
          <span
            key={index}
            className="name-letter"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </div>

      {/* Progress bar */}
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${displayPercentage}%` }}
        />
      </div>

      {/* Particle explosion at 100% */}
      {displayPercentage >= 100 && (
        <div className="particle-explosion">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="explosion-particle"
              style={{
                '--i': i,
                '--angle': (i / 50) * 360,
                '--distance': `${100 + Math.random() * 200}px`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}
    </div>
  );
};
