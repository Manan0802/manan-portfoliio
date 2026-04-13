import React, { useState, useEffect, useRef } from 'react';
import { SectionTitle } from '../shared/SectionTitle';
import { GlowButton } from '../shared/GlowButton';
import { FiGithub, FiLinkedin, FiMail, FiCode } from 'react-icons/fi';
import { Particles } from '../Character/Particles';
import { Canvas } from '@react-three/fiber';
import emailjs from '@emailjs/browser';
import { PopupModal, useCalendlyEventListener } from 'react-calendly';
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
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const isVisible = (id: string) => visibleSections.has(id);

  useCalendlyEventListener({
    onProfilePageViewed: () => console.log('Calendly opened'),
    onEventScheduled: (e) => console.log(e.data.payload.event.uri),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // EmailJS integration
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          contact_type: formData.type,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setIsSubmitting(false);
      setSubmitted(true);
      setIsCalendlyOpen(true); // Open Calendly automatically after email success
    } catch (error) {
      console.error('Failed to send message:', error);
      setIsSubmitting(false);
      alert('Failed to send message. Please try again or email me directly at 04manank@gmail.com');
    }
  };

  return (
    <section id="contact" className="pt-32 pb-12 px-6 relative overflow-hidden z-20">
      {/* Starfield Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
          frameloop="demand"
          dpr={[1, 1.5]}
        >
          <Particles count={800} />
        </Canvas>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle
          title="Get In Touch"
          subtitle="Let's build something amazing together"
          glow="purple"
        />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Contact Info */}
          <div 
            id="contact-info"
            ref={(el) => { sectionRefs.current['contact-info'] = el; }}
            className={`space-y-10 transition-all duration-1000 ${isVisible('contact-info') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Accepting Freelance Projects
              </div>
              <h3 className="text-4xl md:text-5xl font-space-grotesk text-white mb-6 leading-tight">
                Let's build the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                  next big thing.
                </span>
              </h3>
              <p className="text-secondary text-lg leading-relaxed border-l-4 border-primary/30 pl-4">
                Whether you need a massive AI data pipeline, a scalable web application, or a complete technical engineering partner, I'm ready to bring your vision to production. No excuses, just shipped systems.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
               {/* Location */}
               <div className="glass p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-colors group">
                 <p className="text-secondary text-sm mb-2 uppercase tracking-wider">Location</p>
                 <p className="text-white font-medium text-lg">New Delhi, India</p>
                 <p className="text-sm text-primary mt-1 group-hover:glow-text-blue transition-all">Remote Worldwide 🌍</p>
               </div>
               {/* Response Time */}
               <div className="glass p-6 rounded-2xl border border-white/5 hover:border-purple-500/20 transition-colors group">
                 <p className="text-secondary text-sm mb-2 uppercase tracking-wider">Response</p>
                 <p className="text-white font-medium text-lg">&lt; 24 Hours</p>
                 <p className="text-sm text-purple-400 mt-1 group-hover:glow-text-purple transition-all">Guaranteed ⚡</p>
               </div>
            </div>

            {/* Social Links Grid */}
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-4 glass rounded-xl border border-white/5 hover:border-primary/50 text-secondary hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:-translate-y-1 group"
                >
                  <span className="text-xl group-hover:text-primary transition-colors">{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Contact Form */}
          <div 
            id="contact-form"
            ref={(el) => { sectionRefs.current['contact-form'] = el; }}
            className={`glass rounded-2xl p-8 transition-all duration-1000 delay-200 ${isVisible('contact-form') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
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
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239CA3AF' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                  >
                    <option value="Looking to Hire" style={{ background: '#111', color: '#fff' }}>Looking to Hire</option>
                    <option value="Freelance Project" style={{ background: '#111', color: '#fff' }}>Freelance Project</option>
                    <option value="Collaboration" style={{ background: '#111', color: '#fff' }}>Collaboration</option>
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

                <div className="flex flex-col gap-4">
                  <GlowButton
                    variant="primary"
                    size="lg"
                    className="w-full"
                    icon={isSubmitting ? '⏳' : '🚀'}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </GlowButton>

                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-white/5"></div>
                    <span className="flex-shrink-0 mx-4 text-xs text-secondary font-mono tracking-widest uppercase">Or</span>
                    <div className="flex-grow border-t border-white/5"></div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsCalendlyOpen(true)}
                    className="w-full px-8 py-4 bg-[#0A0A0A] border border-white/20 text-white rounded-lg font-space-grotesk tracking-widest uppercase text-sm hover:bg-white/10 hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-3 group shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
                  >
                    <span className="text-lg">🗓️</span> 
                    Schedule a Call
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      
      {/* Calendly Popup Element directly injects to root */}
      <PopupModal
        url="https://calendly.com/manan-kumar"
        pageSettings={{
          backgroundColor: '0a0a0a',
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: '3b82f6',
          textColor: 'ffffff'
        }}
        onModalClose={() => setIsCalendlyOpen(false)}
        open={isCalendlyOpen}
        rootElement={document.getElementById('root')!}
      />
    </section>
  );
};
