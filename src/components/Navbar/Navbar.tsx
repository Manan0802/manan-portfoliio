import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiDownload } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'about me', path: '/' },
  { name: 'experience', path: '/experience' },
  { name: 'projects', path: '/projects' },
  { name: 'services', path: '/services' },
  { name: 'contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const activePath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume/Manan_Kumar_Resume.pdf';
    link.download = 'Manan_Kumar_Resume.pdf';
    link.click();
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
        style={{
          background: isScrolled
            ? 'rgba(0, 0, 0, 0.6)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: isScrolled
            ? '1px solid rgba(255, 255, 255, 0.04)'
            : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
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
            <span
              className="absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300"
              style={{ width: 0 }}
            />
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
                  className="relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
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
                  {link.name}.
                </Link>
              );
            })}
          </div>

          {/* Download Resume Button with Interactive Preview */}
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
                (e.target as HTMLElement).style.boxShadow =
                  '0 0 30px rgba(59, 130, 246, 0.5)';
                (e.target as HTMLElement).style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.boxShadow =
                  '0 0 20px rgba(59, 130, 246, 0.25)';
                (e.target as HTMLElement).style.transform = 'scale(1)';
              }}
            >
              <FiDownload size={14} />
              Resume
            </button>

            {/* Interactive Resume Preview */}
            <div 
              className="absolute top-full right-0 mt-6 w-72 p-5 rounded-2xl opacity-0 pointer-events-none group-hover/resume:opacity-100 group-hover/resume:pointer-events-auto transition-all duration-500 translate-y-4 group-hover/resume:translate-y-0 shadow-2xl backdrop-blur-2xl border border-white/10 z-50 flex flex-col" 
              style={{ background: 'rgba(10,10,10,0.85)' }}
            >
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <span className="text-xs font-space-grotesk tracking-widest text-[#3B82F6] uppercase font-bold">Resume Preview</span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/70 tracking-widest uppercase">PDF</span>
              </div>
              <div className="w-full h-48 bg-white/[0.02] rounded-lg border border-white/5 overflow-hidden relative group-hover/resume:border-[#8B5CF6]/30 transition-colors duration-500 flex flex-col p-4 shadow-inner">
                {/* Simulated Document Lines */}
                <div className="w-1/2 h-3 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] rounded mb-5 opacity-80" />
                <div className="w-full h-1.5 bg-white/20 rounded mb-2.5" />
                <div className="w-5/6 h-1.5 bg-white/20 rounded mb-6" />
                
                <div className="w-1/3 h-2 bg-[#8B5CF6]/60 rounded mb-3" />
                <div className="space-y-1.5">
                  <div className="w-full h-1 bg-white/10 rounded" />
                  <div className="w-full h-1 bg-white/10 rounded" />
                  <div className="w-3/4 h-1 bg-white/10 rounded" />
                </div>
                
                <div className="mt-auto flex items-center justify-center opacity-0 group-hover/resume:opacity-100 transition-opacity duration-700 delay-100">
                  <p className="text-[10px] text-white/50 tracking-widest uppercase font-space-grotesk flex items-center gap-1">
                    <FiDownload /> Click to download
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label="Toggle mobile menu"
            className="md:hidden text-white p-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 min-w-[44px] min-h-[44px] flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.05)' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-cursor="hover"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-8"
            style={{
              background: 'rgba(0, 0, 0, 0.98)',
              backdropFilter: 'blur(30px)',
            }}
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <Link
                  to={link.path}
                  className="text-3xl font-space-grotesk font-light transition-colors duration-300 capitalize"
                  style={{
                    color: activePath === link.path ? '#3B82F6' : 'rgba(255,255,255,0.6)',
                  }}
                  data-cursor="hover"
                >
                  {link.name}.
                </Link>
              </motion.div>
            ))}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              onClick={handleDownloadResume}
              className="mt-4 px-8 py-3 rounded-full font-medium text-white"
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              }}
            >
              Download Resume
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
