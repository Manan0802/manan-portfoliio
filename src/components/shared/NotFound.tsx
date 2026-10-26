import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Starfield } from './Starfield';

export const NotFound: React.FC = () => (
  <section className="relative min-h-screen flex items-center justify-center px-6 pt-28 pb-16 overflow-hidden">
    <Helmet>
      <title>Page not found | Manan Kumar</title>
      <meta name="robots" content="noindex" />
    </Helmet>

    <div className="absolute inset-0 pointer-events-none opacity-60">
      <Starfield count={300} />
    </div>
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-primary/10 rounded-full blur-[110px] pointer-events-none" />

    <div className="relative z-10 text-center max-w-xl">
      <p className="text-sm font-semibold tracking-widest uppercase text-secondary mb-4">Error 404</p>
      <h1 className="text-5xl md:text-6xl font-bold font-space-grotesk text-white mb-5">Page not found</h1>
      <p className="text-lg text-white/70 mb-10">
        That address doesn’t lead anywhere on this site. It may have moved, or the link may have a typo.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-bold bg-white text-black min-h-[48px] transition-transform hover:-translate-y-0.5"
        >
          Back to home
        </Link>
        <Link
          to="/projects"
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-bold text-white border border-white/20 bg-white/5 min-h-[48px] transition-colors hover:bg-white/10"
        >
          See my projects
        </Link>
      </div>
    </div>
  </section>
);
