import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiArrowLeft, FiArrowRight, FiGithub, FiExternalLink, FiShare2 } from 'react-icons/fi';
import { projects } from '../../data/projects';
import { ArchitectureFlow } from './ArchitectureFlow';

const SITE = 'https://www.manankumar.in';

const Section: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
  <section aria-labelledby={id} className="glass rounded-2xl p-6 sm:p-8">
    <h2 id={id} className="mb-5 font-space-grotesk text-xl font-bold text-white sm:text-2xl">
      {title}
    </h2>
    {children}
  </section>
);

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

export const CaseStudy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const [shareClicked, setShareClicked] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  if (!project) {
    return (
      <>
        <Helmet>
          <title>Case study not found | Manan Kumar</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 pb-24 pt-32 text-center text-white">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">404</p>
          <h1 className="mb-4 font-space-grotesk text-3xl font-bold md:text-5xl">Case study not found</h1>
          <p className="mb-8 max-w-md text-gray-300">
            There is no case study at this address. It may have been renamed or removed.
          </p>
          <Link
            to="/projects"
            className={`inline-flex min-h-[48px] items-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-600 ${focusRing}`}
          >
            <FiArrowLeft /> Back to all projects
          </Link>
        </div>
      </>
    );
  }

  const canonicalUrl = `${SITE}/case-study/${project.id}`;
  const pageTitle = `${project.title} — Case study | Manan Kumar`;
  const eyebrow = project.kind === 'work' ? [project.org, project.period].filter(Boolean).join(' · ') : 'Side project';

  const handleLinkedInShare = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
    setShareClicked(true);
    setTimeout(() => setShareClicked(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={project.summary} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={project.summary} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`${SITE}/images/og-preview.png`} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={project.summary} />
        <meta name="twitter:image" content={`${SITE}/images/og-preview.png`} />
      </Helmet>

      <div className="min-h-screen bg-black px-6 pb-24 pt-28 text-white selection:bg-primary/30 sm:px-12 md:px-20 lg:px-32">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/projects"
            className={`group mb-10 inline-flex min-h-[44px] items-center gap-2 text-gray-300 transition-colors hover:text-primary ${focusRing}`}
          >
            <FiArrowLeft className="transition-transform group-hover:-translate-x-1" /> Back to projects
          </Link>

          {/* Header */}
          <header className="mb-10">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-primary">
              Case study · {eyebrow}
            </p>
            <h1 className="mb-5 font-space-grotesk text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
              {project.title}
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-gray-300 sm:text-xl">{project.summary}</p>
            {project.metrics && project.metrics.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-3" aria-label="Key metrics">
                {project.metrics.map((m) => (
                  <li
                    key={m}
                    className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-blue-200"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            )}
          </header>

          <div className="flex flex-col gap-8">
            <Section id="cs-problem" title="Problem">
              <p className="leading-relaxed text-gray-300">{project.problem}</p>
            </Section>

            <Section id="cs-approach" title="Approach">
              <ol className="space-y-4">
                {project.approach.map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-sm font-semibold text-primary"
                    >
                      {i + 1}
                    </span>
                    <p className="leading-relaxed text-gray-300">{step}</p>
                  </li>
                ))}
              </ol>
            </Section>

            <Section id="cs-architecture" title="Architecture">
              <ArchitectureFlow key={project.id} architecture={project.architecture} title={project.title} />
            </Section>

            {project.results && project.results.length > 0 && (
              <Section id="cs-results" title="Results">
                <div className="hidden md:block">
                  <table className="w-full border-collapse text-left text-sm">
                    <caption className="sr-only">Results for {project.title}</caption>
                    <thead>
                      <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
                        <th scope="col" className="py-3 pr-4 font-medium">Metric</th>
                        <th scope="col" className="py-3 pr-4 font-medium">Before</th>
                        <th scope="col" className="py-3 pr-4 font-medium">After</th>
                        <th scope="col" className="py-3 font-medium">How measured</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.results.map((r) => (
                        <tr key={r.metric} className="border-b border-white/5 align-top">
                          <th scope="row" className="py-4 pr-4 font-medium text-white">{r.metric}</th>
                          <td className="py-4 pr-4 text-gray-400">{r.before ?? '—'}</td>
                          <td className="py-4 pr-4 font-semibold text-blue-300">{r.after}</td>
                          <td className="py-4 text-gray-300">{r.how}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ul className="space-y-4 md:hidden">
                  {project.results.map((r) => (
                    <li key={r.metric} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="mb-2 font-medium text-white">{r.metric}</p>
                      <p className="mb-2 text-lg">
                        {r.before && <span className="text-gray-400">{r.before} → </span>}
                        <span className="font-semibold text-blue-300">{r.after}</span>
                      </p>
                      <p className="text-[13px] leading-snug text-gray-400">
                        <span className="text-gray-300">How measured: </span>
                        {r.how}
                      </p>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            <Section id="cs-role" title="My role">
              <p className="leading-relaxed text-gray-300">{project.role}</p>
            </Section>

            {project.limits && project.limits.length > 0 && (
              <Section id="cs-limits" title="Limits and what's next">
                <ul className="space-y-3">
                  {project.limits.map((l) => (
                    <li key={l} className="flex items-start gap-3 leading-relaxed text-gray-300">
                      <span aria-hidden="true" className="mt-1 text-primary">▹</span>
                      {l}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            <Section id="cs-stack" title="Stack and links">
              <ul className="mb-6 flex flex-wrap gap-2" aria-label="Technology stack">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs text-blue-200"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm transition-colors hover:bg-white/10 ${focusRing}`}
                  >
                    <FiGithub /> View on GitHub
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm text-white transition-colors hover:bg-blue-500 ${focusRing}`}
                  >
                    <FiExternalLink /> Live application
                  </a>
                )}
                <button
                  type="button"
                  onClick={handleLinkedInShare}
                  className={`inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg border border-[#0A66C2]/40 bg-[#0A66C2]/10 px-5 py-3 text-sm text-sky-300 transition-colors hover:bg-[#0A66C2]/20 ${focusRing}`}
                >
                  <FiShare2 /> {shareClicked ? 'Opening LinkedIn…' : 'Share on LinkedIn'}
                </button>
              </div>
            </Section>

            {/* CTA */}
            <section aria-labelledby="cs-cta" className="grid gap-5 md:grid-cols-2">
              <h2 id="cs-cta" className="sr-only">Next steps</h2>
              <div className="glass flex flex-col rounded-2xl p-8">
                <p className="mb-2 font-space-grotesk text-2xl font-bold">Want something like this built?</p>
                <p className="mb-6 text-gray-300">See what I build for clients and how a project runs.</p>
                <Link
                  to="/services"
                  className={`mt-auto inline-flex min-h-[48px] w-fit items-center gap-2 rounded-full bg-blue-600 px-7 py-3 font-semibold text-white transition-colors hover:bg-blue-500 ${focusRing}`}
                  data-cursor="hover"
                >
                  See services <FiArrowRight />
                </Link>
              </div>
              <div className="glass flex flex-col rounded-2xl p-8">
                <p className="mb-2 font-space-grotesk text-2xl font-bold">Hiring?</p>
                <p className="mb-6 text-gray-300">Happy to go deeper on any of this, including the parts I can only discuss live.</p>
                <Link
                  to="/contact"
                  className={`mt-auto inline-flex min-h-[48px] w-fit items-center gap-2 rounded-full border border-white/20 px-7 py-3 font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5 ${focusRing}`}
                  data-cursor="hover"
                >
                  Get in touch <FiArrowRight />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
