import React, { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../shared/PageMeta';
import { motion, useReducedMotion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiChevronDown, FiMail, FiX } from 'react-icons/fi';
import {
  servicesHero,
  proofFigures,
  proofNote,
  offers,
  carePlan,
  alsoAvailable,
  everyBuildIncludes,
  process,
  dataHandling,
  limits,
  faqs,
  servicesCta,
} from '../../data/services';
import type { Offer } from '../../data/services';
import './Services.css';

const CASE_STUDY_PATH = '/case-study/hinglish-assistant';

const mailto = (subject: string) =>
  `mailto:${servicesCta.email}?subject=${encodeURIComponent(subject)}`;

/* ─── Scroll reveal (disabled under prefers-reduced-motion) ─── */
const Reveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className, delay = 0 }) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

const SectionHead: React.FC<{
  id: string;
  label: string;
  title: string;
  accent?: string;
}> = ({ id, label, title, accent = 'text-primary' }) => (
  <div className="text-center mb-10 md:mb-14">
    <span className={`${accent} text-xs md:text-sm font-medium uppercase tracking-[0.3em] mb-3 block`}>
      {label}
    </span>
    <h2 id={id} className="text-3xl md:text-5xl font-bold font-space-grotesk text-white">
      {title}
    </h2>
  </div>
);

const primaryBtn =
  'inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black';
const secondaryBtn =
  'inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black';

/* ─── Offer card ─── */
const OfferCard: React.FC<{ offer: Offer }> = ({ offer }) => {
  const fromPrefix = offer.price.startsWith('from ');
  const priceMain = fromPrefix ? offer.price.slice(5) : offer.price;
  return (
    <article
      className={`glass rounded-2xl p-6 flex flex-col h-full transition-colors duration-300 ${
        offer.highlight
          ? 'border-primary/50 bg-primary/5 shadow-[0_0_30px_rgba(59,130,246,0.12)]'
          : 'hover:border-white/20'
      }`}
    >
      <h3 className="text-xl font-bold font-space-grotesk text-white mb-2">{offer.name}</h3>
      <p className="text-white/70 text-sm leading-relaxed mb-5">{offer.forWho}</p>

      <div className="mb-1 flex items-baseline gap-2">
        {fromPrefix && <span className="text-white/70 text-sm">from</span>}
        <span className="text-3xl md:text-4xl font-bold font-space-grotesk text-white">{priceMain}</span>
      </div>
      {offer.priceNote && <p className="text-white/70 text-xs mb-1">{offer.priceNote}</p>}
      <p className="text-cyan-300 text-xs uppercase tracking-wider font-medium mb-5">{offer.timeline}</p>

      <ul className="space-y-3 mb-5 flex-1">
        {offer.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-white/80">
            <FiCheck className="text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {offer.notIncluded && (
        <p className="text-white/60 text-xs mb-5 flex items-start gap-2">
          <FiX className="mt-0.5 flex-shrink-0" aria-hidden="true" />
          <span>Not included: {offer.notIncluded}</span>
        </p>
      )}

      <a
        href={mailto(`${offer.name} enquiry`)}
        className={`${offer.highlight ? primaryBtn : secondaryBtn} w-full text-center`}
      >
        {offer.cta}
        <FiArrowRight aria-hidden="true" />
      </a>
    </article>
  );
};

/* ─── FAQ accordion item ─── */
const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  const uid = useId();
  const btnId = `${uid}-btn`;
  const panelId = `${uid}-panel`;
  return (
    <div
      className={`glass rounded-2xl border transition-colors duration-300 ${
        open ? 'border-primary/40' : 'border-white/10 hover:border-white/20'
      }`}
    >
      <h3>
        <button
          id={btnId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="w-full min-h-[56px] flex items-center justify-between gap-4 px-5 md:px-6 py-4 text-left cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span className="text-white font-medium text-base">{q}</span>
          <FiChevronDown
            className={`text-primary flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            size={20}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={btnId} hidden={!open}>
        <p className="px-5 md:px-6 pb-5 text-white/75 text-sm md:text-base leading-relaxed">{a}</p>
      </div>
    </div>
  );
};

/* ─── MAIN COMPONENT ─── */
export const Services: React.FC = () => {
  return (
    <>
    <PageMeta
      title="AI Assistants, RAG Agents & Automation — Services | Manan Kumar"
      description="Fixed-scope freelance AI builds: automate one workflow from $1,200, a custom AI assistant or RAG agent from $3,500, a production-grade agent from $8,000. Test set agreed up front."
      path="/services"
    />
    <section id="services" className="pt-28 md:pt-32 pb-16 md:pb-20 px-5 md:px-6 relative z-20 overflow-hidden svc-page">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/3 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ═════════ 1. HERO ═════════ */}
        <Reveal className="text-center mb-14 md:mb-20">
          <p className="text-cyan-300 text-xs md:text-sm font-medium uppercase tracking-[0.3em] mb-5">
            {servicesHero.eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space-grotesk leading-[1.05] max-w-4xl mx-auto mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">
            {servicesHero.title}
          </h1>
          <p className="text-white/75 text-base md:text-xl max-w-3xl mx-auto mb-7 leading-relaxed">
            {servicesHero.subtitle}
          </p>

          <div className="flex justify-center mb-8">
            <div className="glass px-5 py-2.5 rounded-full flex items-center border border-green-500/20 max-w-full">
              <span className="pulse-dot flex-shrink-0" aria-hidden="true" />
              <span className="text-green-300 font-medium text-xs md:text-sm tracking-wide text-left">
                {servicesHero.capacity}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-md sm:max-w-none mx-auto">
            <a href={mailto('A task I’d like automated')} className={primaryBtn}>
              <FiMail aria-hidden="true" />
              Email me a task
            </a>
            <Link to={CASE_STUDY_PATH} className={secondaryBtn}>
              See the case study
              <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        {/* ═════════ 2. PROOF STRIP ═════════ */}
        <Reveal className="mb-16 md:mb-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4" role="list">
            {proofFigures.map((fig) => (
              <div
                key={fig.label}
                role="listitem"
                className="glass rounded-2xl p-4 md:p-6 text-center hover:border-primary/30 transition-colors duration-300"
              >
                <div className="text-2xl md:text-3xl font-bold font-space-grotesk bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent mb-2 break-words">
                  {fig.value}
                </div>
                <div className="text-white/75 text-xs md:text-sm leading-snug">{fig.label}</div>
              </div>
            ))}
          </div>
          <p className="text-white/70 text-sm text-center mt-5 max-w-2xl mx-auto">
            {proofNote}{' '}
            <Link
              to={CASE_STUDY_PATH}
              className="inline-flex items-center gap-1 min-h-[44px] text-primary hover:underline font-medium"
            >
              Read the case study
              <FiArrowRight aria-hidden="true" />
            </Link>
          </p>
        </Reveal>

        {/* ═════════ 3. OFFERS ═════════ */}
        <section aria-labelledby="svc-offers-h" className="mb-16 md:mb-24">
          <SectionHead id="svc-offers-h" label="What I offer" title="Fixed-scope builds, priced up front" />
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
              {offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>

            <div className="glass rounded-2xl mt-4 md:mt-5 p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
              <h3 className="text-lg font-bold font-space-grotesk text-white md:whitespace-nowrap">
                {carePlan.name}
                <span className="text-cyan-300 font-medium text-base ml-3">{carePlan.price}</span>
              </h3>
              <p className="text-white/75 text-sm leading-relaxed">{carePlan.description}</p>
            </div>
          </Reveal>
        </section>

        {/* ═════════ 4. EVERY BUILD INCLUDES ═════════ */}
        <section aria-labelledby="svc-every-h" className="mb-16 md:mb-24">
          <SectionHead id="svc-every-h" label="Standard" title="Every build includes" accent="text-purple-300" />
          <Reveal>
            <ul className="grid sm:grid-cols-2 gap-3 max-w-4xl mx-auto">
              {everyBuildIncludes.map((item) => (
                <li key={item} className="glass rounded-xl p-4 flex items-start gap-3 text-sm md:text-base text-white/85">
                  <FiCheck className="text-green-400 mt-1 flex-shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* ═════════ 5. PROCESS ═════════ */}
        <section aria-labelledby="svc-process-h" className="mb-16 md:mb-24">
          <SectionHead id="svc-process-h" label="How it works" title="From first email to handover" accent="text-cyan-300" />
          <Reveal>
            <div className="relative">
            <div
              className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2 z-0"
              aria-hidden="true"
            />
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative list-none p-0">
              {process.map((p, i) => (
                <li key={p.step} className="relative z-10 group">
                  <div className="glass rounded-2xl p-6 md:p-7 hover:border-primary/30 transition-colors duration-500 h-full">
                    <span
                      className="block text-5xl font-bold font-space-grotesk text-white/10 group-hover:text-primary/30 transition-colors mb-3"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-lg font-bold font-space-grotesk text-white mb-2">{p.step}</h3>
                    <p className="text-white/75 text-sm leading-relaxed">{p.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            </div>
          </Reveal>
        </section>

        {/* ═════════ 6. DATA + LIMITS ═════════ */}
        <div className="grid lg:grid-cols-2 gap-4 md:gap-6 mb-16 md:mb-24">
          <Reveal>
            <section aria-labelledby="svc-data-h" className="glass rounded-2xl p-6 md:p-8 h-full">
              <h2 id="svc-data-h" className="text-2xl md:text-3xl font-bold font-space-grotesk text-white mb-5">
                How I handle your data
              </h2>
              <ul className="space-y-3">
                {dataHandling.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm md:text-base text-white/80 leading-relaxed">
                    <FiCheck className="text-green-400 mt-1 flex-shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
          <Reveal delay={0.1}>
            <section aria-labelledby="svc-limits-h" className="glass rounded-2xl p-6 md:p-8 h-full">
              <h2 id="svc-limits-h" className="text-2xl md:text-3xl font-bold font-space-grotesk text-white mb-5">
                What I don’t do
              </h2>
              <ul className="space-y-3">
                {limits.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm md:text-base text-white/80 leading-relaxed">
                    <FiX className="text-white/50 mt-1 flex-shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        </div>

        {/* ═════════ 7. ALSO AVAILABLE ═════════ */}
        <section aria-labelledby="svc-also-h" className="mb-16 md:mb-24">
          <SectionHead id="svc-also-h" label="Beyond AI" title={alsoAvailable.title} accent="text-purple-300" />
          <Reveal>
            <div className="glass rounded-2xl p-6 md:p-8 max-w-4xl mx-auto">
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-6">
                {alsoAvailable.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm md:text-base text-white/85">
                    <FiCheck className="text-primary mt-1 flex-shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-white/75 text-sm leading-relaxed pt-5 border-t border-white/10">
                {alsoAvailable.proof} <span className="text-white/60">{alsoAvailable.note}</span>
              </p>
            </div>
          </Reveal>
        </section>

        {/* ═════════ 8. FAQ ═════════ */}
        <section aria-labelledby="svc-faq-h" className="mb-16 md:mb-24">
          <SectionHead id="svc-faq-h" label="FAQ" title="Questions before you write" accent="text-cyan-300" />
          <Reveal className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </Reveal>
        </section>

        {/* ═════════ 9. FINAL CTA ═════════ */}
        <Reveal>
          <section aria-labelledby="svc-cta-h" className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-cyan-500/20" aria-hidden="true" />
            <div className="absolute inset-0 glass" aria-hidden="true" />
            <div className="relative z-10 text-center py-12 md:py-16 px-5 md:px-8">
              <h2
                id="svc-cta-h"
                className="text-3xl md:text-5xl font-bold font-space-grotesk text-white mb-5 max-w-3xl mx-auto leading-tight"
              >
                {servicesCta.title}
              </h2>
              <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                {servicesCta.body}
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-md sm:max-w-none mx-auto">
                <a href={mailto('A task I’d like automated')} className={primaryBtn}>
                  <FiMail aria-hidden="true" />
                  Email me a task
                </a>
                <Link to="/contact" className={secondaryBtn}>
                  Or use the contact page
                  <FiArrowRight aria-hidden="true" />
                </Link>
              </div>
              <p className="text-white/70 text-sm mt-5 break-all">{servicesCta.email}</p>
            </div>
          </section>
        </Reveal>
      </div>
    </section>
    </>
  );
};
