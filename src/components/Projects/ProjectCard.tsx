import React, { useEffect, useRef } from 'react';
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';
import type { Project } from '../../data/projects';
import vanillaTilt from 'vanilla-tilt';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={cardRef}
      className="glass rounded-2xl overflow-hidden hover:glow-blue transition-all duration-300 project-card"
      data-tilt
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/80 text-white">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold font-space-grotesk text-white mb-2">
          {project.title}
        </h3>
        <p className="text-secondary text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 rounded bg-secondary/20 text-secondary border border-secondary/30"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-secondary hover:text-primary transition-colors text-sm"
              data-cursor="hover"
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
            >
              <FiCode /> Colab
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
