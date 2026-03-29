import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  glow?: 'blue' | 'purple' | 'cyan';
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = 'center',
  glow = 'blue',
}) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const glowColors = {
    blue: 'text-primary drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]',
    purple: 'text-secondary drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]',
    cyan: 'text-tertiary drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]',
  };

  return (
    <div className={`mb-16 ${alignClasses[align]}`}>
      <h2 className={`text-4xl md:text-5xl font-bold font-space-grotesk ${glowColors[glow]}`}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-secondary max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};
