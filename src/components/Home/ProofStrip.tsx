import React from 'react';
import { Link } from 'react-router-dom';
import { proofFigures, proofNote } from '../../data/services';
import { projects } from '../../data/projects';

// Case study the proof figures come from (the featured project).
const proofProject = projects.find((p) => p.featured) ?? projects[0];

export const ProofStrip: React.FC = () => (
  <section aria-labelledby="proof-heading" className="relative z-20 px-6 py-14">
    <div className="max-w-7xl mx-auto">
      <h2 id="proof-heading" className="text-sm font-semibold tracking-widest uppercase text-secondary mb-6 text-center">
        Results
      </h2>

      <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {proofFigures.map((fig) => (
          <li key={fig.label} className="glass rounded-2xl p-5 md:p-7 text-center">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold font-space-grotesk text-white mb-2 whitespace-nowrap">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{fig.value}</span>
            </p>
            <p className="text-sm text-white/70 leading-snug">{fig.label}</p>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-3 text-center">
        <p className="text-sm text-white/70">{proofNote}</p>
        <Link
          to={`/case-study/${proofProject.id}`}
          className="inline-flex items-center min-h-[44px] text-sm font-semibold text-primary hover:text-white transition-colors underline underline-offset-4"
        >
          Read the case study →
        </Link>
      </div>
    </div>
  </section>
);
