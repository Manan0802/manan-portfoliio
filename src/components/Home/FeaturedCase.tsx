import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../../data/projects';

const featured = projects.find((p) => p.featured) ?? projects[0];

export const FeaturedCase: React.FC = () => (
  <section aria-labelledby="featured-heading" className="relative z-20 px-6 py-10">
    <div className="max-w-7xl mx-auto">
      <div className="relative glass rounded-3xl p-8 md:p-12 overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.08)]">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/20 blur-[110px] rounded-full pointer-events-none" />

        <p className="relative text-sm font-semibold tracking-widest uppercase text-secondary mb-3">Featured case study</p>
        <h2 id="featured-heading" className="relative text-3xl md:text-4xl font-bold font-space-grotesk text-white mb-2">
          {featured.title}
        </h2>
        {(featured.org || featured.period) && (
          <p className="relative text-sm text-white/60 mb-5">{[featured.org, featured.period].filter(Boolean).join(' · ')}</p>
        )}
        <p className="relative text-lg text-white/80 leading-relaxed max-w-3xl mb-6">{featured.summary}</p>

        {featured.metrics && (
          <ul className="relative flex flex-wrap gap-3 mb-8">
            {featured.metrics.map((metric) => (
              <li key={metric} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/85">
                {metric}
              </li>
            ))}
          </ul>
        )}

        <div className="relative flex flex-wrap items-center gap-4">
          <Link
            to={`/case-study/${featured.id}`}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-bold bg-white text-black min-h-[48px] transition-transform hover:-translate-y-0.5"
          >
            Read the case study →
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center min-h-[44px] text-sm font-semibold text-white/80 hover:text-white underline underline-offset-4"
          >
            See all projects
          </Link>
        </div>
      </div>
    </div>
  </section>
);
