import React, { useState, useEffect, useRef } from 'react';
import { PageMeta } from '../shared/PageMeta';
import { SectionTitle } from '../shared/SectionTitle';
import { GlowButton } from '../shared/GlowButton';
import { Starfield } from '../shared/Starfield';
import { FiGithub, FiLinkedin, FiMail, FiCode } from 'react-icons/fi';
import { PopupModal } from 'react-calendly';
import './Contact.css';

const EMAIL = '04manank@gmail.com';
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`;

const socialLinks = [
  { icon: <FiGithub />, label: 'GitHub', href: 'https://github.com/Manan0802' },
  { icon: <FiLinkedin />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/manan-kumar-2229291b9/' },
  { icon: <FiCode />, label: 'LeetCode', href: 'https://leetcode.com/u/04manank/' },
  { icon: <FiMail />, label: 'Email', href: `mailto:${EMAIL}` },
];

type Status = 'idle' | 'sending' | 'success' | 'error';

const inputClass =
  'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary transition-colors';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    type: 'Looking to Hire',
  });
  const [honey, setHoney] = useState('');
  const [status, setStatus] = useState<Status>('idle');
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Prefilled mailto, shown if the form request fails so the visitor's message is never lost.
  const fallbackMailto = `mailto:${EMAIL}?subject=${encodeURIComponent('Portfolio enquiry')}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nLooking for: ${formData.type}\n\n${formData.message}`
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          project_type: formData.type,
          message: formData.message,
          _subject: 'Portfolio enquiry',
          _template: 'table',
          _captcha: 'false',
          _honey: honey,
        }),
      });
      const data = await res.json().catch(() => null);
      const ok = res.ok && data && (data.success === true || data.success === 'true');
      setStatus(ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="pt-32 pb-12 px-6 relative overflow-hidden z-20">
      <PageMeta
        title="Contact | Manan Kumar"
        description="Hiring for an AI engineering role, or have a task you'd like automated? Contact Manan Kumar, AI Engineer in New Delhi. Replies within one business day (IST)."
        path="/contact"
      />

      {/* Starfield Background (static 2D canvas, no WebGL) */}
      <div className="absolute inset-0 pointer-events-none opacity-70">
        <Starfield count={350} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle
          as="h1"
          title="Get In Touch"
          subtitle="For AI engineering roles and freelance projects"
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
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true"></span>
                Accepting Freelance Projects
              </div>
              <h2 className="text-4xl md:text-5xl font-space-grotesk text-white mb-6 leading-tight">
                Tell me what <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                  you're building.
                </span>
              </h2>
              <p className="text-secondary text-lg leading-relaxed border-l-4 border-primary/30 pl-4">
                Hiring for an AI engineering role, or have a task you'd like automated? Send a few lines about it. I reply within one business day (IST) with a straight answer on whether I can help.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
               {/* Location */}
               <div className="glass p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-colors group">
                 <p className="text-secondary text-sm mb-2 uppercase tracking-wider">Location</p>
                 <p className="text-white font-medium text-lg">New Delhi, India</p>
                 <p className="text-sm text-primary mt-1">Remote Worldwide</p>
               </div>
               {/* Response Time */}
               <div className="glass p-6 rounded-2xl border border-white/5 hover:border-purple-500/20 transition-colors group">
                 <p className="text-secondary text-sm mb-2 uppercase tracking-wider">Reply</p>
                 <p className="text-white font-medium text-lg">Within 1 business day</p>
                 <p className="text-sm text-purple-300 mt-1">IST</p>
               </div>
            </div>

            {/* Social Links Grid */}
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-4 glass rounded-xl border border-white/5 hover:border-primary/50 text-secondary hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:-translate-y-1 group"
                >
                  <span className="text-xl group-hover:text-primary transition-colors" aria-hidden="true">{link.icon}</span>
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
            {status === 'success' ? (
              <div role="status" className="h-full flex flex-col items-center justify-center text-center py-8">
                <h3 className="text-2xl font-space-grotesk text-white mb-2">Message sent</h3>
                <p className="text-secondary mb-6">
                  Thanks for reaching out. I'll reply within one business day (IST).
                </p>
                <button
                  type="button"
                  onClick={() => setIsCalendlyOpen(true)}
                  className="px-8 py-3 bg-[#0A0A0A] border border-white/20 text-white rounded-lg font-space-grotesk tracking-widest uppercase text-sm hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                >
                  Schedule a Call
                </button>
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
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="Your name"
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
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="you@example.com"
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
                    className={`${inputClass} appearance-none`}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239CA3AF' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                  >
                    <option value="Looking to Hire" style={{ background: '#111', color: '#fff' }}>Looking to Hire</option>
                    <option value="Freelance Project" style={{ background: '#111', color: '#fff' }}>Freelance Project</option>
                    <option value="Collaboration" style={{ background: '#111', color: '#fff' }}>Collaboration</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-secondary mb-2">
                    What would you like built or automated?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={`${inputClass} resize-none`}
                    placeholder="Describe the task, the tools you use today and what a good result looks like."
                  />
                </div>

                {/* Honeypot: hidden from people and assistive tech; bots tend to fill it */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                  <label htmlFor="_honey">Leave this field empty</label>
                  <input
                    type="text"
                    id="_honey"
                    name="_honey"
                    value={honey}
                    onChange={(e) => setHoney(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <GlowButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </GlowButton>

                  {status === 'error' && (
                    <div role="alert" className="rounded-lg border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-200">
                      <p className="mb-2">Your message did not send. Nothing was lost: you can email it to me directly instead.</p>
                      <a href={fallbackMailto} className="font-semibold text-white underline underline-offset-4">
                        Email {EMAIL} with this message
                      </a>
                    </div>
                  )}

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
