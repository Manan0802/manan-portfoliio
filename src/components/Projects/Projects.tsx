import React, { useState } from 'react';
import { SectionTitle } from '../shared/SectionTitle';
import { ProjectCard } from './ProjectCard';
import { FeaturedProject } from './FeaturedProject';
import { projects, getProjectsByCategory } from '../../data/projects';
import './Projects.css';

const categories = ['All', 'AI/LLM', 'ML/Data', 'Full Stack'];

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const filteredProjects = getProjectsByCategory(activeCategory);
  const featuredProject = projects.find(p => p.featured);

  return (
    <section id="projects" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Projects"
          subtitle="Building intelligent systems that solve real problems"
          glow="cyan"
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
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
        {featuredProject && activeCategory === 'All' && (
          <FeaturedProject project={featuredProject} />
        )}

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {filteredProjects
            .filter(p => !p.featured || activeCategory !== 'All')
            .map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </div>
      </div>
    </section>
  );
};
