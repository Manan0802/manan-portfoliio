import React from 'react';
import { FiGithub, FiLinkedin, FiMail, FiCode } from 'react-icons/fi';

const socialLinks = [
  { icon: <FiGithub />, label: 'GitHub', href: 'https://github.com/Manan0802' },
  { icon: <FiLinkedin />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/manan-kumar-2229291b9/' },
  { icon: <FiCode />, label: 'LeetCode', href: 'https://leetcode.com/u/04manank/' },
  { icon: <FiMail />, label: 'Email', href: 'mailto:04manank@gmail.com' },
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="text-2xl font-bold font-bebas tracking-wider text-primary">
            MK
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary transition-colors"
                data-cursor="hover"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-secondary text-sm">
              © {currentYear} Manan Kumar
            </p>
            <p className="text-primary text-xs mt-1">
              Built with React + Three.js
            </p>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="text-center mt-8">
          <p className="text-secondary text-sm">
            Designed & Developed by Manan Kumar
          </p>
        </div>
      </div>
    </footer>
  );
};
