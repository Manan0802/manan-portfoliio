import React from 'react';
import { Link } from 'react-router-dom';
import { servicesCta } from '../../data/services';

export const ClosingCta: React.FC = () => (
  <section aria-labelledby="closing-heading" className="relative z-20 px-6 pt-10 pb-20">
    <div className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl p-10 md:p-14 text-center border border-primary/20 bg-gradient-to-br from-primary/10 via-black to-secondary/10">
      <h2 id="closing-heading" className="text-3xl md:text-4xl font-bold font-space-grotesk text-white mb-4">
        {servicesCta.title}
      </h2>
      <p className="text-lg text-white/75 leading-relaxed max-w-2xl mx-auto mb-8">{servicesCta.body}</p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href={`mailto:${servicesCta.email}?subject=Portfolio%20enquiry`}
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-bold bg-white text-black min-h-[48px] transition-transform hover:-translate-y-0.5"
        >
          Email me
        </a>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-bold text-white border border-white/20 bg-white/5 min-h-[48px] transition-colors hover:bg-white/10"
        >
          Contact page
        </Link>
      </div>
    </div>
  </section>
);
