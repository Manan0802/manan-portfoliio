import React from 'react';
import { Link } from 'react-router-dom';
import { offers, servicesHero } from '../../data/services';

// The three paid offers; the scoping sprint is a pre-sale step and is left to the Services page.
const paidOffers = offers.filter((o) => o.id !== 'scoping');

export const WorkWithMe: React.FC = () => (
  <section aria-labelledby="work-heading" className="relative z-20 px-6 py-16">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 id="work-heading" className="text-4xl md:text-5xl font-bold font-space-grotesk text-white mb-4">
          Work with me
        </h2>
        <p className="text-base md:text-lg text-secondary">{servicesHero.capacity}</p>
      </div>

      <ul className="grid md:grid-cols-3 gap-6">
        {paidOffers.map((offer) => (
          <li
            key={offer.id}
            className={`glass rounded-3xl p-7 flex flex-col ${offer.highlight ? 'border-primary/40 shadow-[0_0_30px_rgba(59,130,246,0.12)]' : ''}`}
          >
            <h3 className="text-xl font-bold font-space-grotesk text-white mb-4">{offer.name}</h3>
            <p className="text-3xl font-bold font-space-grotesk text-white mb-1">{offer.price}</p>
            <p className="text-sm text-secondary mb-5">{offer.timeline}</p>
            <p className="text-white/75 leading-relaxed">{offer.forWho}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center">
        <Link
          to="/services"
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-bold bg-white text-black min-h-[48px] transition-transform hover:-translate-y-0.5"
        >
          See services and pricing →
        </Link>
      </div>
    </div>
  </section>
);
