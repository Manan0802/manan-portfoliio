import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';
import type { Project } from '../../data/projects';

interface FeaturedProjectProps {
  project: Project;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = memo(({ project }) => {
  const meta = [project.org, project.period].filter(Boolean).join(' · ');

  return (
    <article className="featured-project-card glass group relative overflow-hidden rounded-2xl border border-white/5 transition-colors duration-300 hover:border-primary/40">
      <div className="grid items-center gap-8 p-6 sm:p-8 md:grid-cols-2">
        {/* Content */}
        <div className="flex flex-col justify-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
            Featured · {project.category}
          </p>
          {meta && <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">{meta}</p>}
          <h3 className="mb-4 font-space-grotesk text-2xl font-bold leading-tight text-white sm:text-3xl">
            <Link
              to={`/case-study/${project.id}`}
              className="transition-colors group-hover:text-primary focus-visible:outline-none after:absolute after:inset-0 after:z-10 after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-offset-[-3px] focus-visible:after:outline-white"
              data-cursor="hover"
            >
              {project.title}
            </Link>
          </h3>
          <p className="mb-6 leading-relaxed text-gray-300">{project.description}</p>

          {project.metrics && (
            <ul className="mb-6 flex flex-wrap gap-3" aria-label="Key metrics">
              {project.metrics.map((metric) => (
                <li key={metric} className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm font-medium text-blue-200">
                  {metric}
                </li>
              ))}
            </ul>
          )}

          <ul className="mb-6 flex flex-wrap gap-2" aria-label="Stack">
            {project.stack.map((tech) => (
              <li key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                {tech}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors group-hover:bg-blue-500">
              Read case study <FiArrowRight aria-hidden="true" />
            </span>
            <div className="relative z-20 flex items-center gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] items-center gap-2 text-gray-300 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <FiGithub aria-hidden="true" /> GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] items-center gap-2 text-gray-300 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <FiExternalLink aria-hidden="true" /> Live app
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Cover */}
        <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-black/50">
          <img
            src={project.image}
            alt=""
            width={1200}
            height={750}
            className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            decoding="async"
          />
        </div>
      </div>
    </article>
  );
});
