import React from 'react';
import { SectionTitle } from '../shared/SectionTitle';
import { experiences } from '../../data/experience';
import { certifications } from '../../data/certifications';
import Marquee from 'react-fast-marquee';
import './Experience.css';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-32 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          title="Experience"
          subtitle="My journey through education and professional work"
          glow="purple"
        />

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-secondary to-tertiary rounded-full" />

          {experiences.map((exp, index) => (
            <ExperienceCard
              key={`${exp.company}-${index}`}
              experience={exp}
              index={index}
            />
          ))}
        </div>

        {/* Certifications Marquee */}
        <div className="mt-32">
          <h3 className="text-2xl font-space-grotesk text-center mb-8 text-secondary">
            Certifications
          </h3>
          <div className="glass rounded-xl p-4 overflow-hidden">
            <Marquee gradient={false} speed={50}>
              {certifications.map((cert, index) => (
                <span
                  key={index}
                  className="text-primary mx-8 text-lg"
                >
                  {cert}
                  <span className="mx-8 text-secondary">•</span>
                </span>
              ))}
            </Marquee>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
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
    <div className={`relative flex items-center mb-16 ${isLeft ? 'flex-row-reverse' : ''}`}>
      {/* Dot on timeline */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-black z-10 animate-pulse" />

      {/* Content */}
      <div className={`w-1/2 ${isLeft ? 'pr-12 text-right' : 'pl-12'}`}>
        <div className="glass rounded-xl p-6 hover:glow-blue transition-all duration-300 timeline-card">
          <div className="flex flex-wrap gap-2 mb-4 justify-start">
            {experience.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-bold font-space-grotesk text-white mb-1">
            {experience.company}
          </h3>
          <p className="text-primary font-medium mb-2">{experience.role}</p>
          <p className="text-secondary text-sm mb-4">
            {experience.duration} | 📍 {experience.location}
          </p>

          {experience.highlights.length > 0 && (
            <ul className={`space-y-2 ${isLeft ? 'text-right' : 'text-left'}`}>
              {experience.highlights.map((highlight, i) => (
                <li key={i} className="text-secondary text-sm leading-relaxed">
                  {highlight.startsWith('•') ? highlight : `• ${highlight}`}
                </li>
              ))}
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
  <div className="glass rounded-xl p-6 text-center hover:scale-105 transition-transform">
    <div className="text-4xl mb-4">{icon}</div>
    <h4 className="text-lg font-bold font-space-grotesk text-white mb-2">{title}</h4>
    <p className="text-secondary text-sm">{description}</p>
  </div>
);
