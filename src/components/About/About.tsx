import React from 'react';
import { Canvas } from '@react-three/fiber';
import { SkillsGlobe } from './SkillsGlobe';
import { SectionTitle } from '../shared/SectionTitle';
import { useCountUp } from '../../hooks/useScrollAnimation';

const stats = [
  { value: 400, label: 'DSA Problems Solved', suffix: '+' },
  { value: 1650, label: 'LeetCode Rating', suffix: '' },
  { value: 1000000, label: 'Records Processed', suffix: '+', format: '1M+' },
  { value: 3, label: 'AI Projects Deployed', suffix: '+' },
];

export const About: React.FC = () => {
  return (
    <section id="about" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="About Me"
          subtitle="Software Engineering student specializing in AI & Full Stack Development"
          glow="blue"
        />

        {/* About Content */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          {/* Left: Text */}
          <div className="space-y-6">
            <p className="text-lg text-secondary leading-relaxed">
              Software Engineering student at{' '}
              <span className="text-primary font-semibold">Delhi Technological University (DTU)</span>,
              specializing in Applied AI, LLM Agentic Workflows, and Scalable Backend Systems.
            </p>
            <p className="text-lg text-secondary leading-relaxed">
              Currently at{' '}
              <span className="text-primary font-semibold">IndiaMART InterMESH</span>,
              architecting AI pipelines that process 10 lakh+ records and deploying agentic
              systems at production scale.
            </p>
            <p className="text-lg text-secondary leading-relaxed">
              Passionate about automating complex workflows, building intelligent systems,
              and reducing operational costs through innovative engineering.
            </p>
          </div>

          {/* Right: 3D Skills Globe */}
          <div className="h-[400px] glass rounded-2xl overflow-hidden">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
              frameloop="demand"
            >
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <SkillsGlobe />
            </Canvas>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard: React.FC<{ value: number; label: string; suffix: string; format?: string }> = ({
  value,
  label,
  suffix,
  format,
}) => {
  const { count, ref } = useCountUp(value, 2);

  return (
    <div ref={(el) => { if (el) ref.current = el; }} className="glass rounded-xl p-6 text-center hover:glow-blue transition-all duration-300">
      <div className="text-4xl md:text-5xl font-bold font-space-grotesk text-primary mb-2">
        {format || count}
        {suffix}
      </div>
      <div className="text-secondary text-sm">{label}</div>
    </div>
  );
};
