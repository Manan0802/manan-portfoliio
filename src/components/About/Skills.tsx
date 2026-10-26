import React, { Suspense, useState } from 'react';
import { SkillsStructured } from './SkillsStructured';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// The physics playground pulls in matter-js, so it is only fetched when that view is shown.
const SkillsAvalanche = React.lazy(() =>
  import('./SkillsAvalanche').then(m => ({ default: m.SkillsAvalanche }))
);

type View = 'avalanche' | 'structured';

// Phones and reduced-motion visitors start on the plain list (no physics, no touch scroll trap).
const defaultView = (reducedMotion: boolean): View => {
  const coarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  return coarse || reducedMotion ? 'structured' : 'avalanche';
};

export const SkillsSection: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const [view, setView] = useState<View>(() => defaultView(reducedMotion));

  const tabClass = (active: boolean) =>
    `px-6 py-2 min-h-[44px] rounded-full text-sm font-bold transition-all duration-300 ${active ? 'bg-blue-600 text-white shadow-lg shadow-primary/20' : 'text-secondary hover:text-white'}`;

  return (
    <div className="mb-32">
      {/* Section Header & Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8">
        <div>
          <h3 className="text-3xl md:text-4xl font-space-grotesk font-bold text-white mb-2">
            Arsenal & <span className="text-primary">Skills</span>
          </h3>
          <p className="text-secondary">The tools and frameworks I use to engineer intelligence.</p>
        </div>

        <div className="flex gap-2 mt-4 md:mt-0 p-1 glass rounded-full border border-white/5" role="group" aria-label="Skills view">
          <button
            type="button"
            onClick={() => setView('avalanche')}
            aria-pressed={view === 'avalanche'}
            className={tabClass(view === 'avalanche')}
          >
            Interactive
          </button>
          <button
            type="button"
            onClick={() => setView('structured')}
            aria-pressed={view === 'structured'}
            className={tabClass(view === 'structured')}
          >
            Structured
          </button>
        </div>
      </div>

      {/* Render View */}
      {view === 'avalanche' ? (
        <Suspense fallback={<div className="w-full h-[600px] rounded-3xl bg-[#050505] border border-white/10" aria-hidden="true" />}>
          <SkillsAvalanche />
        </Suspense>
      ) : (
        <SkillsStructured />
      )}
    </div>
  );
};
