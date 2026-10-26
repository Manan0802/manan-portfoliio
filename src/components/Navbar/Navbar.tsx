import React, { useState, useEffect } from 'react';
import { FiDownload, FiMenu, FiX } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Experience', path: '/experience' },
  { name: 'Projects', path: '/projects' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
];

const RESUME_HREF = '/resume/Manan_Kumar_Resume.pdf';

// Case studies belong to the Projects section.
const isActivePath = (current: string, path: string) => {
  if (path === '/') return current === '/';
  if (path === '/projects') return current.startsWith('/projects') || current.startsWith('/case-study');
  return current.startsWith(path);
};

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu on navigation and on Escape
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const focusRing =
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

  return (
    <nav
      aria-label="Main"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-2' : 'py-3'}`}
      style={{
        background: isScrolled || menuOpen ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            aria-label="MK, Manan Kumar home"
            className={`group relative min-h-[44px] min-w-[44px] flex items-center rounded-md ${focusRing}`}
            data-cursor="hover"
          >
            <span
              className="text-xl font-bold font-bebas tracking-widest text-white transition-all duration-300 group-hover:text-primary"
              style={{ letterSpacing: '0.2em' }}
            >
              MK
            </span>
          </Link>

          {/* Desktop navigation — pill-style links */}
          <div
            className="hidden md:flex items-center gap-1 p-1 rounded-full"
            style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)' }}
          >
            {navLinks.map((link) => {
              const isActive = isActivePath(pathname, link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${focusRing} ${
                    isActive
                      ? 'text-white bg-primary/15 shadow-[0_0_12px_rgba(59,130,246,0.1)]'
                      : 'text-white/60 hover:text-white'
                  }`}
                  data-cursor="hover"
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Resume — quiet text link (desktop) */}
          <a
            href={RESUME_HREF}
            download="Manan_Kumar_Resume.pdf"
            data-cursor="hover"
            className={`hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white border border-white/15 hover:border-white/40 transition-colors ${focusRing}`}
          >
            <FiDownload size={14} aria-hidden="true" />
            Resume
          </a>

          {/* Mobile: Resume + Menu, both with visible text labels */}
          <div className="md:hidden flex items-center gap-1">
            <a
              href={RESUME_HREF}
              download="Manan_Kumar_Resume.pdf"
              className={`inline-flex items-center gap-1.5 px-3 min-h-[44px] rounded-full text-sm font-medium text-white/70 ${focusRing}`}
            >
              <FiDownload size={14} aria-hidden="true" />
              Resume
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={`inline-flex items-center gap-1.5 px-4 min-h-[44px] rounded-full text-sm font-semibold text-white border border-white/20 bg-white/5 ${focusRing}`}
            >
              {menuOpen ? <FiX size={16} aria-hidden="true" /> : <FiMenu size={16} aria-hidden="true" />}
              Menu
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {menuOpen && (
          <ul id="mobile-menu" className="md:hidden mt-2 pb-2 flex flex-col">
            {navLinks.map((link) => {
              const isActive = isActivePath(pathname, link.path);
              return (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center min-h-[48px] px-3 rounded-lg text-base font-medium ${focusRing} ${
                      isActive ? 'text-white bg-primary/15' : 'text-white/75'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </nav>
  );
};
