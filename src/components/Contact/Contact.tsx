import React, { useState } from 'react';
import { SectionTitle } from '../shared/SectionTitle';
import { GlowButton } from '../shared/GlowButton';
import { FiGithub, FiLinkedin, FiMail, FiCode } from 'react-icons/fi';
import { Particles } from '../Character/Particles';
import { Canvas } from '@react-three/fiber';
import './Contact.css';

const socialLinks = [
  { icon: <FiGithub />, label: 'GitHub', href: 'https://github.com/Manan0802' },
  { icon: <FiLinkedin />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/manan-kumar-2229291b9/' },
  { icon: <FiCode />, label: 'LeetCode', href: 'https://leetcode.com/u/04manank/' },
  { icon: <FiMail />, label: 'Email', href: 'mailto:04manank@gmail.com' },
];

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    type: 'Looking to Hire',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (EmailJS integration later)
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitted(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '', type: 'Looking to Hire' });
    }, 3000);
  };

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          frameloop="demand"
        >
          <Particles count={5000} />
        </Canvas>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle
          title="Get In Touch"
          subtitle="Let's build something amazing together"
          glow="purple"
        />

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-space-grotesk text-white mb-6">
                Let's Connect
              </h3>
              <p className="text-secondary leading-relaxed mb-8">
                Whether you're looking to hire me full-time or want to collaborate
                on a freelance project, I'm always open to discussing new opportunities.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 glass rounded-full flex items-center justify-center text-secondary hover:text-primary hover:glow-blue transition-all duration-300 hover:-translate-y-1"
                  data-cursor="hover"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-4 pt-8">
              <GlowButton variant="primary" size="lg">
                Hire Me — Full Time
              </GlowButton>
              <GlowButton variant="outline" size="lg">
                Let's Build Something
              </GlowButton>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="glass rounded-2xl p-8">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="text-6xl mb-4">🚀</div>
                <h4 className="text-2xl font-space-grotesk text-white mb-2">
                  Message Sent!
                </h4>
                <p className="text-secondary">
                  Thanks for reaching out. I'll get back to you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-secondary mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-secondary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm text-secondary mb-2">
                    Looking for
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="Looking to Hire">Looking to Hire</option>
                    <option value="Freelance Project">Freelance Project</option>
                    <option value="Collaboration">Collaboration</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <GlowButton
                  variant="primary"
                  size="lg"
                  className="w-full"
                  icon={isSubmitting ? '⏳' : '🚀'}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </GlowButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
