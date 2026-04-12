import React from 'react';
import { skillCategories } from './SkillsData';

export const SkillsStructured: React.FC = () => {
   return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
         {skillCategories.map((category) => (
            <div key={category.name} className="glass p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
               <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                 <span className="w-2 h-2 rounded-full bg-primary" />
                 {category.name}
               </h4>
               <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                     <span key={skill} className={`px-4 py-2 rounded-full text-xs font-medium border ${category.color}`}>
                        {skill}
                     </span>
                  ))}
               </div>
            </div>
         ))}
      </div>
   );
};
