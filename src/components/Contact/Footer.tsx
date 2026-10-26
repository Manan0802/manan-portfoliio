import React from 'react';
import { FiGithub, FiLinkedin, FiMail, FiCode, FiArrowUp } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const EMAIL = '04manank@gmail.com';

const socialLinks = [
  { icon: <FiGithub />, label: 'GitHub', href: 'https://github.com/Manan0802' },
  { icon: <FiLinkedin />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/manan-kumar-2229291b9/' },
  { icon: <FiCode />, label: 'LeetCode', href: 'https://leetcode.com/u/04manank/' },
  { icon: <FiMail />, label: 'Email', href: `mailto:${EMAIL}` },
];

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Experience', path: '/experience' },
  { name: 'Projects', path: '/projects' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { pathname } = useLocation();

  // Home has its own closing CTA band and /contact is the CTA, so the footer one is skipped there.
  const showCta = pathname !== '/' && pathname !== '/contact';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-14 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">

        {showCta && (
          <div
            className="rounded-2xl p-8 mb-10 text-center"
            style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)' }}
          >
            <h2 className="text-lg font-bold font-space-grotesk mb-1 text-white">Have a project in mind?</h2>
            <p className="text-white/70 text-sm mb-5">Send me one task you’d like automated, or a role you’d like to talk about.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${EMAIL}?subject=Portfolio%20enquiry`}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold bg-white text-black min-h-[46px]"
              >
                Email me
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold text-white border border-white/20 bg-white/5 hover:bg-white/10 min-h-[46px] transition-colors"
              >
                Contact page
              </Link>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-10 border-b border-white/5">
          <nav aria-label="Footer" className="flex flex-wrap justify-center md:justify-start gap-x-2 text-sm font-medium">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-secondary hover:text-white transition-colors px-3 py-3 min-h-[44px] inline-flex items-center"
                data-cursor="hover"
              >
                {item.name}
              </Link>
            ))}
            <a
              href="/resume/Manan_Kumar_Resume.pdf"
              download="Manan_Kumar_Resume.pdf"
              className="text-secondary hover:text-white transition-colors px-3 py-3 min-h-[44px] inline-flex items-center"
              data-cursor="hover"
            >
              Resume
            </a>
          </nav>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors text-sm font-bold border border-white/10 group min-h-[44px]"
            data-cursor="hover"
            aria-label="Back to top"
          >
            Back to Top <FiArrowUp className="group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="text-2xl font-bold font-bebas tracking-wider text-primary" aria-hidden="true">
            MK
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="text-secondary hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-white/5"
                data-cursor="hover"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-secondary text-sm">© {currentYear} Manan Kumar</p>
            <p className="text-white/60 text-xs mt-1">Designed &amp; developed by Manan Kumar</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
