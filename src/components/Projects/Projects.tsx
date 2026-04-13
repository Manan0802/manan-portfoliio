import React, { useState, useMemo, useEffect, useRef } from 'react';
import { FeaturedProject } from './FeaturedProject';
import { ProjectCard } from './ProjectCard';
import { projects, getProjectsByCategory } from '../../data/projects';
import { Particles } from '../Character/Particles';
import { Canvas } from '@react-three/fiber';
import './Projects.css';

const categories = ['All', 'AI/LLM', 'ML/Data', 'Full Stack'];

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = useMemo(() => getProjectsByCategory(activeCategory), [activeCategory]);
  const featuredProject = useMemo(() => projects.find((p) => p.featured), []);

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
    <section id="projects" className="pt-32 pb-12 px-6 relative z-20">
      {/* Starfield Background */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          frameloop="always"
        >
          <Particles count={5000} />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Massive Title Area */}
        <div 
          id="projects-title"
          ref={(el) => { sectionRefs.current['projects-title'] = el; }}
          className={`text-center mb-24 mt-12 transition-all duration-1000 ${isVisible('projects-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold font-space-grotesk tracking-tighter mb-8 opacity-90 transition-opacity text-white cursor-default glow-text-cyan hover:scale-105 duration-500 ease-in-out">
            projects.
          </h1>
          <p className="max-w-4xl mx-auto text-xs md:text-sm text-secondary font-mono tracking-widest uppercase leading-loose opacity-80">
            AI &amp; Full-Stack Engineer forging enterprise-grade agentic systems, real-time RAG pipelines, and automated intelligence. Experienced with React, Node.js, Python, LangGraph orchestration, Vector Search, and high-performance cloud architectures.
          </p>
        </div>

        {/* Filter Tabs */}
        <div 
          id="projects-filters"
          ref={(el) => { sectionRefs.current['projects-filters'] = el; }}
          className={`flex flex-wrap justify-center gap-4 mb-16 transition-all duration-1000 delay-200 ${isVisible('projects-filters') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-white glow-blue'
                  : 'glass text-secondary hover:text-primary'
              }`}
              data-cursor="hover"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Project */}
        <div 
          id="projects-featured"
          ref={(el) => { sectionRefs.current['projects-featured'] = el; }}
          className={`transition-all duration-1000 delay-300 ${isVisible('projects-featured') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {featuredProject && activeCategory === 'All' && (
            <FeaturedProject project={featuredProject} />
          )}
        </div>

        {/* Project Grid */}
        <div 
          id="projects-grid"
          ref={(el) => { sectionRefs.current['projects-grid'] = el; }}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 transition-all duration-1000 delay-400 ${isVisible('projects-grid') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {filteredProjects
            .filter((p) => !p.featured || activeCategory !== 'All')
            .map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </div>
      </div>
    </section>
  );
};
