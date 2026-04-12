import React, { useEffect, useRef, memo } from 'react';
import { FiGithub, FiExternalLink, FiCode, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../../data/projects';
import vanillaTilt from 'vanilla-tilt';

interface ProjectCardProps {
  project: Project;
  onOpenModal?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = memo(({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (cardRef.current) {
      vanillaTilt.init(cardRef.current, {
        max: 10,
        speed: 400,
        glare: true,
        'max-glare': 0.2,
        scale: 1.02,
      });
    }
  }, []);

  const handleCardClick = () => {
    navigate(`/case-study/${project.id}`);
  };

  return (
    <div
      ref={cardRef}
      className="glass rounded-3xl overflow-hidden hover:glow-blue transition-all duration-500 project-card cursor-pointer group border border-white/5 hover:border-primary/30 bg-white/[0.02]"
      data-tilt
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 blur-[2px] group-hover:blur-none"
          loading="lazy" 
          decoding="async"
        />
        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30 backdrop-blur-md">
            {project.category}
          </span>
        </div>
        {/* Click overlay hint */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-50 pointer-events-none">
          <div className="border border-white/30 px-6 py-2 rounded-full bg-black/60 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
            <span className="text-white font-space-grotesk tracking-widest uppercase text-xs font-bold whitespace-nowrap">View Case Study</span>
            <FiArrowRight className="text-white text-xs" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 relative z-20">
        <h3 className="text-2xl font-bold font-space-grotesk text-white mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-secondary text-sm mb-6 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-white/5 text-secondary border border-white/10 group-hover:border-primary/30 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-secondary hover:text-primary transition-colors text-sm"
              data-cursor="hover"
              onClick={(e) => e.stopPropagation()}
            >
              <FiGithub /> Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-secondary hover:text-primary transition-colors text-sm"
              data-cursor="hover"
              onClick={(e) => e.stopPropagation()}
            >
              <FiExternalLink /> Live
            </a>
          )}
          {project.colab && (
            <a
              href={project.colab}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-secondary hover:text-primary transition-colors text-sm"
              data-cursor="hover"
              onClick={(e) => e.stopPropagation()}
            >
              <FiCode /> Colab
            </a>
          )}
        </div>
      </div>
    </div>
  );
});
