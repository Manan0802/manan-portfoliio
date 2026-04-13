import React, { useEffect, useState } from 'react';
import { useLoading } from '../../context/LoadingContext';
import { FiCpu, FiZap, FiCode } from 'react-icons/fi';
import './Loader.css';

export const Loader: React.FC = () => {
  const { setProgress, completeLoading } = useLoading();
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'exit'>('loading');

  // Simulated progress
  useEffect(() => {
    const startTime = Date.now();
    const totalDuration = 2500; // Faster, modern

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, (elapsed / totalDuration) * 100);
      
      const eased = rawProgress === 100 ? 1 : 1 - Math.pow(2, -10 * rawProgress / 100);
      const displayValue = Math.floor(eased * 100);

      setProgress(displayValue);
      setDisplayPercentage(displayValue);

      if (rawProgress < 100) {
        requestAnimationFrame(animate);
      } else {
        setPhase('reveal');
        setTimeout(() => setPhase('exit'), 800);
        setTimeout(() => completeLoading(), 1600); // Wait for fade-out animation
      }
    };

    requestAnimationFrame(animate);
  }, [setProgress, completeLoading]);

  return (
    <div className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center transition-all duration-700 bg-[#030712] ${phase === 'exit' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}`}>
      
      {/* Ambient Orbs matching Services page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6">
        {/* Sleek Name Display */}
        <div className="mb-12 text-center">
          <div className="overflow-hidden">
            <h1 className={`text-4xl md:text-5xl font-bold font-space-grotesk text-white mb-3 tracking-wide transition-transform duration-1000 ${phase !== 'loading' ? 'translate-y-0' : 'translate-y-0'}`}>
              MANAN KUMAR
            </h1>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm md:text-base font-medium font-space-grotesk tracking-widest uppercase">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">AI Engineer</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Full Stack</span>
          </div>
        </div>

        {/* Glassmorphism Progress Bar */}
        <div className="w-full glass p-2 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden backdrop-blur-md">
          {/* Background Track */}
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative">
            {/* The fill */}
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-full transition-all duration-100 ease-out loader-spark-bar"
              style={{ width: `${displayPercentage}%` }}
            >
              {/* Spark effect at the tip of the progress bar */}
              {displayPercentage < 100 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white blur-[6px] opacity-80 rounded-full -mr-4 translate-y-[0px]"></div>
              )}
            </div>
          </div>
        </div>

        {/* Percentage text & Icons */}
        <div className="w-full flex justify-between items-center mt-8 px-2 text-sm font-space-grotesk">
          <div className="flex gap-6">
            <div className={`flex flex-col items-center transition-all duration-500 ${displayPercentage > 20 ? 'text-blue-400 opacity-100 scale-110 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'text-white/20 opacity-50 grayscale'}`}>
              <FiCpu size={22} className="mb-1" />
            </div>
            <div className={`flex flex-col items-center transition-all duration-500 ${displayPercentage > 50 ? 'text-cyan-400 opacity-100 scale-110 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'text-white/20 opacity-50 grayscale'}`}>
              <FiCode size={22} className="mb-1" />
            </div>
            <div className={`flex flex-col items-center transition-all duration-500 ${displayPercentage > 80 ? 'text-purple-400 opacity-100 scale-110 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]' : 'text-white/20 opacity-50 grayscale'}`}>
              <FiZap size={22} className="mb-1" />
            </div>
          </div>
          <div className="text-white font-light text-2xl tracking-tighter flex items-baseline">
            {String(displayPercentage).padStart(3, '0')}
            <span className="text-sm ml-1 text-white/50">%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
