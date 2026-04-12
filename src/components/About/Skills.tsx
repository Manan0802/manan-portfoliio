import React, { useState } from 'react';
import { SkillsAvalanche } from './SkillsAvalanche';
import { SkillsStructured } from './SkillsStructured';

export const SkillsSection: React.FC = () => {
   const [view, setView] = useState<'avalanche' | 'structured'>('avalanche');

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
            
            <div className="flex gap-2 mt-4 md:mt-0 p-1 glass rounded-full border border-white/5">
               <button 
                  onClick={() => setView('avalanche')}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${view === 'avalanche' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-secondary hover:text-white'}`}
               >
                  Interactive
               </button>
               <button 
                  onClick={() => setView('structured')}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${view === 'structured' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-secondary hover:text-white'}`}
               >
                  Structured
               </button>
            </div>
         </div>

         {/* Render View */}
         {view === 'avalanche' ? <SkillsAvalanche /> : <SkillsStructured />}
      </div>
   );
};
