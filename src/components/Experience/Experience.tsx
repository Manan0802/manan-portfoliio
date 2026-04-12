import React from 'react';
import { SectionTitle } from '../shared/SectionTitle';
import { experiences } from '../../data/experience';
import { certifications } from '../../data/certifications';
import { Particles } from '../Character/Particles';
import { Canvas } from '@react-three/fiber';

const CustomMarquee: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="overflow-hidden relative flex w-full py-4 group">
    {/* Gradient Masks */}
    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />
    
    <div className="flex w-max animate-marquee space-x-6 px-6">
      <div className="flex space-x-6">
        {children}
      </div>
      <div className="flex space-x-6">
        {children}
      </div>
    </div>
  </div>
);

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="pt-32 pb-12 px-6 relative z-20">
      {/* Starfield Background */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          frameloop="always"
        >
          <Particles count={5000} />
        </Canvas>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionTitle
          title="Experience & Education"
          subtitle="My professional journey and academic foundation."
          glow="purple"
        />

        {/* Timeline Path */}
        <div className="relative mt-16 pl-6 md:pl-0">
          {/* Main vertical line for desktop (center) and mobile (left) */}
          <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-[2px] h-[calc(100%-80px)] top-10 bg-gradient-to-b from-primary via-purple-500 to-cyan-500 opacity-30 shadow-[0_0_15px_rgba(168,85,247,0.5)]" />

          <div className="space-y-12 md:space-y-24">
            {experiences.map((exp, index) => (
              <ExperienceCard key={`${exp.company}-${index}`} experience={exp} index={index} />
            ))}
          </div>
        </div>

        {/* Certifications Box */}
        <div className="mt-32 relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
          <h3 className="text-2xl font-space-grotesk font-bold text-center text-white mb-8 relative z-10">
            Certifications & <span className="text-primary">Achievements</span>
          </h3>
          <div className="glass rounded-3xl p-6 overflow-hidden border border-white/5 relative z-10 shadow-[0_0_30px_rgba(59,130,246,0.05)]">
            <CustomMarquee>
              {certifications.map((cert, index) => (
                <span key={index} className="mx-8 text-lg font-medium text-white/80">
                  {cert}
                  <span className="mx-8 text-primary/50">•</span>
                </span>
              ))}
            </CustomMarquee>
          </div>
        </div>

        {/* Badges Layout */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <AchievementBadge
            icon="🏆"
            title="Top 10% Globally"
            description="LeetCode (400+ problems)"
          />
          <AchievementBadge
            icon="🥈"
            title="Silver Medal"
            description="Kabaddi (DTU Inter-Department)"
          />
          <AchievementBadge
            icon="🎯"
            title="Contest Rating 1650+"
            description="Top 20% Globally"
          />
        </div>
      </div>
    </section>
  );
};

interface ExperienceCardProps {
  experience: (typeof experiences)[0];
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index }) => {
  const isLeft = index % 2 === 0;

  return (
    <div className={`relative flex flex-col md:flex-row items-start md:items-center ${isLeft ? 'md:flex-row-reverse' : ''}`}>
      {/* Timeline Node */}
      <div className="absolute left-[-11px] md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full border-[4px] border-[#050505] bg-primary z-10 shadow-[0_0_15px_rgba(59,130,246,0.8)] mt-6 md:mt-0" />

      {/* Card Content */}
      <div className={`w-full md:w-1/2 pl-10 md:pl-0 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
        <div className="glass rounded-3xl p-8 border border-white/5 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] group relative overflow-hidden">
          {/* Subtle Background Glow behind text */}
          <div className={`absolute top-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] pointer-events-none transition-all duration-500 group-hover:bg-primary/20 ${isLeft ? 'right-0' : 'left-0'}`} />
          
          <div className={`flex flex-wrap gap-2 mb-6 relative z-10 ${isLeft ? 'md:justify-end' : 'justify-start'}`}>
            {experience.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-bold px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-2xl font-bold font-space-grotesk text-white mb-2 relative z-10">
            {experience.company}
          </h3>
          <p className="font-semibold text-lg text-primary mb-3 relative z-10">{experience.role}</p>
          <div className={`flex items-center gap-4 text-sm text-secondary mb-6 relative z-10 ${isLeft ? 'md:justify-end' : 'justify-start'}`}>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> {experience.duration}</span>
            <span className="text-white/20">|</span>
            <span>📍 {experience.location}</span>
          </div>

          {experience.highlights.length > 0 && (
            <ul className={`space-y-3 relative z-10 ${isLeft ? 'md:text-right' : 'md:text-left'} text-white/70`}>
              {experience.highlights.map((highlight, i) => {
                const isBullet = highlight.trim().startsWith('•');
                const text = isBullet ? highlight.trim().substring(1).trim() : highlight;
                return (
                  <li key={i} className="text-[15px] leading-relaxed flex items-start gap-3">
                    <span className={`text-primary font-bold ${isLeft ? 'md:hidden' : 'block'}`}>›</span>
                    <span className="flex-1">{text}</span>
                    <span className={`text-primary font-bold hidden ${isLeft ? 'md:block' : 'hidden'}`}>‹</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

interface AchievementBadgeProps {
  icon: string;
  title: string;
  description: string;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ icon, title, description }) => (
  <div className="glass rounded-3xl p-8 text-center border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] group">
    <div className="text-5xl mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">{icon}</div>
    <h4 className="text-xl font-bold font-space-grotesk text-white mb-3 tracking-wide">{title}</h4>
    <p className="text-secondary">{description}</p>
  </div>
);
