import React, { useEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiExternalLink, FiCode, FiArrowRight } from 'react-icons/fi';
import vanillaTilt from 'vanilla-tilt';
import type { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = memo(({ project }) => {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    // Tilt is decoration: skip it for touch screens and reduced-motion users.
    const decorative = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    if (!decorative.matches) return;
    vanillaTilt.init(el, { max: 6, speed: 400, glare: true, 'max-glare': 0.12, scale: 1.01 });
    return () => {
      (el as HTMLElement & { vanillaTilt?: { destroy: () => void } }).vanillaTilt?.destroy();
    };
  }, []);

  const meta = project.kind === 'work' ? [project.org, project.period].filter(Boolean).join(' · ') : project.category;

  return (
    <article
      ref={cardRef}
      className="project-card glass group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] transition-colors duration-300 hover:border-primary/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt=""
          width={1200}
          height={750}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <span className="absolute right-4 top-4 rounded-full border border-primary/30 bg-black/50 px-3 py-1 text-xs font-semibold text-blue-200 backdrop-blur-md">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">{meta}</p>
        <h3 className="mb-3 font-space-grotesk text-xl font-bold leading-snug text-white sm:text-2xl">
          <Link
            to={`/case-study/${project.id}`}
            className="transition-colors group-hover:text-primary focus-visible:outline-none after:absolute after:inset-0 after:z-10 after:rounded-3xl focus-visible:after:outline-2 focus-visible:after:outline-offset-[-3px] focus-visible:after:outline-white"
            data-cursor="hover"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-gray-300">{project.description}</p>

        {project.metrics && (
          <ul className="mb-5 flex flex-wrap gap-2" aria-label="Key metrics">
            {project.metrics.slice(0, 3).map((m) => (
              <li key={m} className="rounded-md border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-medium text-blue-200">
                {m}
              </li>
            ))}
          </ul>
        )}

        <ul className="mb-6 flex flex-wrap gap-2" aria-label="Stack">
          {project.stack.slice(0, 4).map((tech) => (
            <li key={tech} className="rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-300">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            Read case study <FiArrowRight aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
          </span>
          <div className="relative z-20 flex items-center gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] items-center gap-1.5 text-sm text-gray-300 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label={`${project.title} code on GitHub`}
              >
                <FiGithub aria-hidden="true" /> Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] items-center gap-1.5 text-sm text-gray-300 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label={`${project.title} live app`}
              >
                <FiExternalLink aria-hidden="true" /> Live
              </a>
            )}
            {project.colab && (
              <a
                href={project.colab}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] items-center gap-1.5 text-sm text-gray-300 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label={`${project.title} Colab notebook`}
              >
                <FiCode aria-hidden="true" /> Colab
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
});
