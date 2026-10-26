import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { FeaturedProject } from './FeaturedProject';
import { ProjectCard } from './ProjectCard';
import { projects } from '../../data/projects';
import './Projects.css';

const TITLE = 'Projects — production AI work and side projects | Manan Kumar';
const DESCRIPTION =
  'Case studies from Manan Kumar: a Hinglish AI assistant in production, LangGraph agents, and side projects in vector search and full-stack AI, each with the problem, architecture, results and limits.';

export const Projects: React.FC = () => {
  const { featured, otherWork, sideProjects } = useMemo(() => {
    const work = projects.filter((p) => p.kind === 'work');
    return {
      featured: work.find((p) => p.featured),
      otherWork: work.filter((p) => !p.featured),
      sideProjects: projects.filter((p) => p.kind === 'project'),
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.manankumar.in/projects" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content="https://www.manankumar.in/projects" />
        <meta property="og:image" content="https://www.manankumar.in/images/og-preview.png" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content="https://www.manankumar.in/images/og-preview.png" />
      </Helmet>

      <section id="projects" className="relative z-20 px-6 pb-16 pt-32">
        {/* Static CSS starfield (replaces the always-on WebGL canvas) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1.2px), radial-gradient(900px 500px at 15% 0%, rgba(59,130,246,0.14), transparent 70%), radial-gradient(800px 500px at 90% 30%, rgba(139,92,246,0.12), transparent 70%)',
            backgroundSize: '34px 34px, auto, auto',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-20 mt-8 text-center">
            <h1 className="glow-text-cyan mb-6 font-space-grotesk text-5xl font-bold tracking-tighter text-white opacity-90 sm:text-7xl md:text-9xl">
              projects.
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
              Production AI work and side projects. Each one has a case study with the problem, the architecture, the
              results and the limits.
            </p>
          </div>

          <section aria-labelledby="work-heading" className="mb-24">
            <h2 id="work-heading" className="mb-8 font-space-grotesk text-3xl font-bold text-white">
              Production work
            </h2>
            {featured && (
              <div className="mb-8">
                <FeaturedProject project={featured} />
              </div>
            )}
            <div className="grid gap-8 md:grid-cols-2">
              {otherWork.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>

          <section aria-labelledby="side-heading">
            <h2 id="side-heading" className="mb-8 font-space-grotesk text-3xl font-bold text-white">
              Side projects
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {sideProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};
