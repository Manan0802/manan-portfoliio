import React, { useState } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiCode, FiArrowRight } from 'react-icons/fi';

const socialLinks = [
  { icon: <FiGithub />, label: 'GitHub', href: 'https://github.com/Manan0802' },
  { icon: <FiLinkedin />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/manan-kumar-2229291b9/' },
  { icon: <FiCode />, label: 'LeetCode', href: 'https://leetcode.com/u/04manank/' },
  { icon: <FiMail />, label: 'Email', href: 'mailto:04manank@gmail.com' },
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Opens a mailto as a lightweight zero-backend lead capture
      window.location.href = `mailto:04manank@gmail.com?subject=AI Stack Newsletter&body=Subscribe: ${email}`;
      setSubscribed(true);
    }
  };

  return (
    <footer className="py-14 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">

        {/* Email capture — Growth Engine lead magnet */}
        <div
          className="rounded-2xl p-8 mb-10 text-center"
          style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)' }}
        >
          <h3 className="text-lg font-bold font-space-grotesk mb-1 text-white">
            Get my <span className="text-primary">AI Architecture Digest</span>
          </h3>
          <p className="text-secondary text-sm mb-5">
            Occasional deep-dives on LLM systems, vector search, and agentic design patterns.
          </p>
          {subscribed ? (
            <p className="text-green-400 text-sm font-medium">✅ Opening your mail app — see you in your inbox!</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-full text-sm bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none focus:border-primary/50 transition-colors min-h-[46px]"
                aria-label="Enter your email to subscribe"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-primary text-white hover:bg-blue-600 transition-colors min-h-[46px] min-w-[44px]"
                aria-label="Subscribe to AI digest"
              >
                Subscribe <FiArrowRight />
              </button>
            </form>
          )}
        </div>

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
                className="text-secondary hover:text-primary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-white/5"
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
            Designed &amp; Developed by Manan Kumar
          </p>
        </div>
      </div>
    </footer>
  );
};
