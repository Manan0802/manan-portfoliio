import React, { useState, useEffect, useRef } from 'react';
import { SectionTitle } from '../shared/SectionTitle';
import { SkillsSection } from './Skills';

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
          subtitle="AI Engineer building production LLM agents, RAG systems and real-time voice AI."
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
              src="/images/About_Me_Portfolio.webp"
              width={960}
              height={1005}
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
              I build AI that ships. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                And I measure it.
              </span>
            </h2>
            <p className="text-xl text-secondary leading-relaxed border-l-4 border-primary/30 pl-6">
              AI Engineer at a fintech startup, where I'm the top contributor to a Hinglish AI assistant for retail savers. I build LLM agents, retrieval (RAG), safety layers and evals in Python and FastAPI, and I judge them by the numbers: accuracy, latency and cost.
            </p>

            {/* Quick Badges */}
            <div className="flex flex-wrap gap-3 pt-4">
              {['LLM Agents', 'RAG', 'Evals & Guardrails', 'Voice AI', 'FinTech'].map(tag => (
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
                Maths was my first love: the habit of breaking a hard problem into small steps I can check. That habit carried me through <span className="text-white font-semibold">JEE Main (AIR 15,233)</span> and into Software Engineering at <span className="text-primary font-medium">Delhi Technological University (DTU)</span>, and it is still how I debug an AI system today.
              </p>
            </div>

            {/* Chapter 2 */}
            <div className="glass p-10 rounded-3xl relative overflow-hidden group hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
              <div className="absolute -top-10 -right-10 text-[150px] font-black text-white/[0.02] group-hover:text-primary/[0.05] transition-colors pointer-events-none font-space-grotesk leading-none">02</div>
              <h4 className="text-2xl font-bold text-white mb-4 relative z-10 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Learning to Build
              </h4>
              <p className="text-white/70 leading-relaxed relative z-10 text-[16px]">
                At DTU I learned to ship whole products, not just solve problems. <span className="text-white font-semibold">400+ LeetCode problems</span> built the fundamentals; side projects taught me the rest: <span className="text-primary font-medium">ShopLens</span>, a visual search engine over 45,000+ products with CLIP and FAISS, and <span className="text-primary font-medium">InvestMate</span>, a full-stack portfolio tracker with Gemini insights.
              </p>
            </div>

            {/* Chapter 3 */}
            <div className="glass p-10 rounded-3xl relative overflow-hidden group hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] md:translate-y-4">
              <div className="absolute -top-10 -right-10 text-[150px] font-black text-white/[0.02] group-hover:text-primary/[0.05] transition-colors pointer-events-none font-space-grotesk leading-none">03</div>
              <h4 className="text-2xl font-bold text-white mb-4 relative z-10 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Agents in Production
              </h4>
              <p className="text-white/70 leading-relaxed relative z-10 text-[16px]">
                At <span className="text-primary font-medium">IndiaMART</span> I built LangGraph agents for catalog quality, including SARA, a spec-auditing agent run on the live catalog. Now, at a fintech startup, I work on a <span className="text-white font-semibold">Hinglish AI assistant in production</span>: I raised its intent accuracy from 68% to 96%, shipped its tool-calling agent, and built its safety layer and evals.
              </p>
            </div>

            {/* Chapter 4 */}
            <div className="glass p-10 rounded-3xl relative overflow-hidden group hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] md:translate-y-4">
              <div className="absolute -top-10 -right-10 text-[150px] font-black text-white/[0.02] group-hover:text-primary/[0.05] transition-colors pointer-events-none font-space-grotesk leading-none">04</div>
              <h4 className="text-2xl font-bold text-white mb-4 relative z-10 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                What Drives Me
              </h4>
              <p className="text-white/70 leading-relaxed relative z-10 text-[16px]">
                I like the place where <span className="text-white font-semibold">AI meets money</span>: high stakes, strict rules, real users. I want systems that are measured, safe and cheap to run. Alongside my job I take on a few <span className="text-primary font-medium">freelance AI projects</span>, and I always enjoy meeting founders and engineers building in AI and fintech.
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
      </div>
    </section>
  );
};
