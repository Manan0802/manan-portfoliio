import React, { useState, useEffect } from 'react';
import { FiDownload } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'About', path: '/' },
  { name: 'Experience', path: '/experience' },
  { name: 'Projects', path: '/projects' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const activePath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume/Manan_Kumar_Resume.pdf';
    link.download = 'Manan_Kumar_Resume.pdf';
    link.click();
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-2' : 'py-3'
      }`}
      style={{
        background: isScrolled
          ? 'rgba(0, 0, 0, 0.8)'
          : 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: isScrolled
          ? '1px solid rgba(255, 255, 255, 0.06)'
          : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Top Row: Logo + Resume (desktop) */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="group relative"
            data-cursor="hover"
          >
            <span
              className="text-xl font-bold font-bebas tracking-widest text-white transition-all duration-300 group-hover:text-primary"
              style={{ letterSpacing: '0.2em' }}
            >
              MK
            </span>
          </Link>

          {/* Desktop Navigation — pill-style links */}
          <div
            className="hidden md:flex items-center gap-1 p-1 rounded-full"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            {navLinks.map((link) => {
              const isActive = activePath === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  style={{
                    color: isActive ? '#ffffff' : 'rgba(255,255,255,0.5)',
                    background: isActive
                      ? 'rgba(59, 130, 246, 0.15)'
                      : 'transparent',
                    boxShadow: isActive
                      ? '0 0 12px rgba(59, 130, 246, 0.1)'
                      : 'none',
                  }}
                  data-cursor="hover"
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Download Resume Button — Desktop only */}
          <div className="relative group/resume hidden md:block" data-cursor="hover">
            <button
              onClick={handleDownloadResume}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                color: '#ffffff',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.25)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 0 30px rgba(59, 130, 246, 0.5)';
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 0 20px rgba(59, 130, 246, 0.25)';
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              }}
            >
              <FiDownload size={14} />
              Resume
            </button>
          </div>

          {/* Mobile Resume Button — small icon */}
          <button
            onClick={handleDownloadResume}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium min-h-[36px]"
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              color: '#ffffff',
            }}
            aria-label="Download Resume"
          >
            <FiDownload size={12} />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile Navigation — Always visible compact row */}
        <div className="md:hidden flex items-center justify-center flex-wrap gap-1 mt-2 pb-1 px-1">
          {navLinks.map((link) => {
            const isActive = activePath === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide rounded-full whitespace-nowrap transition-all duration-300 min-h-[28px] flex items-center"
                style={{
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.5)',
                  background: isActive ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                  border: isActive ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                }}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
