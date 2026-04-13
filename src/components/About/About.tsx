import React, { useState, useEffect, useRef } from 'react';
import { SectionTitle } from '../shared/SectionTitle';
import { useCountUp } from '../../hooks/useScrollAnimation';
import { SkillsSection } from './Skills';

const stats = [
  { value: 400, label: 'DSA Problems Solved', suffix: '+' },
  { value: 1650, label: 'LeetCode Rating', suffix: '' },
  { value: 1000000, label: 'Records Processed', suffix: '+', format: '1M+' },
  { value: 6, label: 'AI Projects Deployed', suffix: '+' },
];

export const About: React.FC = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <section id="about" className="py-12 px-6 relative z-20">
      <div className="max-w-7xl mx-auto relative">
        <SectionTitle
          title="About Me"
          subtitle="AI Engineer & Full-Stack Developer architecting intelligent systems and scalable architectures."
          glow="blue"
        />

        {/* Intro Section - Photo & Short Bio */}
        <div 
          id="about-intro"
          ref={(el) => { sectionRefs.current['about-intro'] = el; }}
          className={`grid md:grid-cols-12 gap-12 items-center mb-16 transition-all duration-1000 ${isVisible('about-intro') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Detailed Image Frame */}
          <div className="md:col-span-5 relative w-full h-[500px] glass rounded-3xl overflow-hidden group shadow-[0_0_40px_rgba(59,130,246,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/20 to-transparent opacity-80 z-10 pointer-events-none" />
            <img
              src="/images/About_Me_Portfolio.png"
              alt="Manan Kumar - AI Engineer"
              className="w-full h-full object-cover object-[center_top] transition-transform duration-1000 group-hover:scale-110"
              loading="lazy" 
              decoding="async"
            />
            {/* Floating Gradient Orb behind image */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/30 blur-[100px] rounded-full z-0 pointer-events-none" />
          </div>

          {/* Quick Intro Text */}
          <div className="md:col-span-7 space-y-8 pl-0 md:pl-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              I don't just write code. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                I architect intelligence.
              </span>
            </h2>
            <p className="text-xl text-secondary leading-relaxed border-l-4 border-primary/30 pl-6">
              From an early obsession with mathematics to building autonomous AI pipelines at production scale. I am driven by the relentless pursuit of solving complex legacy problems through rigorous engineering.
            </p>

            {/* Quick Badges */}
            <div className="flex flex-wrap gap-3 pt-4">
              {['Applied AI', 'Agentic Workflows', 'Full-Stack Architecture', 'FinTech Enthusiast'].map(tag => (
                <span key={tag} className="px-4 py-2 rounded-full glass border border-white/5 text-secondary text-sm font-medium hover:border-primary/50 transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* The Narrative Story Grid (Bento Box Chapters) */}
        <div 
          id="about-story"
          ref={(el) => { sectionRefs.current['about-story'] = el; }}
          className={`mb-20 transition-all duration-1000 delay-200 ${isVisible('about-story') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-space-grotesk font-bold text-white mb-4">
              My Story
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto opacity-50" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Chapter 1 */}
            <div className="glass p-10 rounded-3xl relative overflow-hidden group hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
              <div className="absolute -top-10 -right-10 text-[150px] font-black text-white/[0.02] group-hover:text-primary/[0.05] transition-colors pointer-events-none font-space-grotesk leading-none">01</div>
              <h4 className="text-2xl font-bold text-white mb-4 relative z-10 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                The First Principles
              </h4>
              <p className="text-white/70 leading-relaxed relative z-10 text-[16px]">
                For as long as I can remember, my worldview has been shaped by mathematics. To me, equations weren't just numbers—they were the fundamental logic that governed reality. This obsession with deconstructing complex problems culminated in clearing both <span className="text-white font-semibold">JEE Mains and JEE Advanced</span>, securing a top percentile rank among millions. It wasn't just an academic achievement; it was a grueling analytical proving ground that earned my ticket into <span className="text-primary font-medium">Delhi Technological University (DTU)</span>, transitioning my raw affinity for logic into formal engineering discipline.
              </p>
            </div>

            {/* Chapter 2 */}
            <div className="glass p-10 rounded-3xl relative overflow-hidden group hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
              <div className="absolute -top-10 -right-10 text-[150px] font-black text-white/[0.02] group-hover:text-primary/[0.05] transition-colors pointer-events-none font-space-grotesk leading-none">02</div>
              <h4 className="text-2xl font-bold text-white mb-4 relative z-10 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                The Architect's Playground
              </h4>
              <p className="text-white/70 leading-relaxed relative z-10 text-[16px]">
                In my early college years, I didn't just want to write code—I wanted to understand how digital ecosystems functioned. While leading cultural societies taught me human dynamics, my late nights were entirely dedicated to mastering <span className="text-white font-semibold">Full-Stack Architecture</span>. I immersed myself in core computer science, learning to build resilient <span className="text-primary font-medium">backend infrastructures</span> and scalable APIs. I began treating software not just as syntax, but as a living mechanism meant to solve real problems at high scale.
              </p>
            </div>

            {/* Chapter 3 */}
            <div className="glass p-10 rounded-3xl relative overflow-hidden group hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] md:translate-y-4">
              <div className="absolute -top-10 -right-10 text-[150px] font-black text-white/[0.02] group-hover:text-primary/[0.05] transition-colors pointer-events-none font-space-grotesk leading-none">03</div>
              <h4 className="text-2xl font-bold text-white mb-4 relative z-10 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                The Intelligence Paradigm
              </h4>
              <p className="text-white/70 leading-relaxed relative z-10 text-[16px]">
                Then came the Generative AI revolution. I realized the future wasn't just about hardcoding logic—it was about teaching systems to reason. I aggressively pivoted into <span className="text-white font-semibold">Machine Learning</span>, absorbing advanced concepts and landing a pivotal role at <span className="text-primary font-medium">Internship</span>. Rather than building simple AI wrappers, my expertise solidified in <span className="text-white font-semibold">Agentic Workflows</span>. Today, I architect production-grade, fully autonomous AI pipelines that process millions of records effortlessly.
              </p>
            </div>

            {/* Chapter 4 */}
            <div className="glass p-10 rounded-3xl relative overflow-hidden group hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] md:translate-y-4">
              <div className="absolute -top-10 -right-10 text-[150px] font-black text-white/[0.02] group-hover:text-primary/[0.05] transition-colors pointer-events-none font-space-grotesk leading-none">04</div>
              <h4 className="text-2xl font-bold text-white mb-4 relative z-10 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                The Future Horizon
              </h4>
              <p className="text-white/70 leading-relaxed relative z-10 text-[16px]">
                But code is only half the equation. My true passion lies exactly at the intersection of <span className="text-white font-semibold">Tech, Finance, and Entrepreneurship</span>. I view Artificial Intelligence as the ultimate lever to disrupt legacy bottlenecks and eradicate inefficiencies, particularly within <span className="text-primary font-medium">FinTech</span>. I am on a relentless mission to build high-impact autonomous solutions, and I am highly passionate about connecting with fellow founders, innovators, and visionaries navigating this exact space.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div 
          id="about-skills"
          ref={(el) => { sectionRefs.current['about-skills'] = el; }}
          className={`transition-all duration-1000 delay-300 ${isVisible('about-skills') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <SkillsSection />
        </div>

        {/* Stats */}
        <div 
          id="about-stats"
          ref={(el) => { sectionRefs.current['about-stats'] = el; }}
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 delay-400 ${isVisible('about-stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
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
