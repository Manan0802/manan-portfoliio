import React, { useState, useEffect, useRef } from 'react';
import { testimonials } from '../../data/testimonials';
import {
  FiCpu, FiMonitor, FiBarChart2, FiZap, FiLayers, FiCode,
  FiArrowRight, FiCheck, FiStar, FiMessageCircle, FiGitBranch,
  FiBox, FiTerminal, FiDatabase, FiGlobe, FiTrendingUp, FiShield,
  FiChevronDown, FiClock, FiUsers, FiAward, FiRefreshCw
} from 'react-icons/fi';
import './Services.css';

/* ─── Service Offerings ─── */
const services = [
  {
    icon: <FiCpu />,
    title: 'Agentic AI Systems',
    tagline: 'Autonomous Intelligence at Scale',
    description: 'End-to-end design and deployment of multi-agent AI architectures. From LangGraph orchestration to recursive skill routing, I build systems that think, decide, and execute autonomously.',
    deliverables: [
      'LLM Pipeline Architecture & Prompt Engineering',
      'Multi-Agent Orchestration (LangGraph, CrewAI)',
      'RAG Systems with Vector DB Integration',
      'n8n / Workflow Automation Pipelines',
      'Production Deployment & Cost Optimization',
      'Custom Tool-Calling & Function Agents',
    ],
    techStack: ['LangGraph', 'OpenAI', 'Gemini', 'FAISS', 'n8n', 'Python'],
    highlight: 'Built agentic systems processing 17,000+ categories for enterprise clients',
    color: 'from-blue-500 to-cyan-400',
    borderColor: 'border-blue-500/30',
    glowColor: 'shadow-blue-500/20',
    iconBg: 'bg-blue-500/10',
    accentText: 'text-blue-400',
  },
  {
    icon: <FiLayers />,
    title: 'ML Model Integration',
    tagline: 'From Research to Revenue',
    description: 'Custom machine learning models trained, fine-tuned, and deployed as production APIs. Specializing in computer vision (CLIP, CNNs), NLP, and recommendation engines.',
    deliverables: [
      'Custom Model Training (PyTorch / Scikit-learn)',
      'CLIP & Vision Embedding Systems',
      'FAISS Vector Search Implementation',
      'Real-Time Inference API Deployment',
      'Model Performance Tuning & Optimization',
      'Data Pipeline & Feature Engineering',
    ],
    techStack: ['PyTorch', 'CLIP', 'FAISS', 'Streamlit', 'FastAPI', 'NumPy'],
    highlight: 'Built ShopLens: 40k+ item fashion search with sub-second retrieval',
    color: 'from-purple-500 to-pink-400',
    borderColor: 'border-purple-500/30',
    glowColor: 'shadow-purple-500/20',
    iconBg: 'bg-purple-500/10',
    accentText: 'text-purple-400',
  },
  {
    icon: <FiMonitor />,
    title: 'Full-Stack Web Apps',
    tagline: 'Pixel-Perfect. Performance-Obsessed.',
    description: 'Modern, responsive web applications built with the MERN stack and Next.js. From PWAs with offline capability to real-time dashboards — I ship fast and I ship beautiful.',
    deliverables: [
      'React / Next.js Frontend Development',
      'Node.js / Express.js Backend APIs',
      'MongoDB / MySQL / Redis Databases',
      'JWT Authentication & Role-Based Access',
      'PWA Architecture & Offline-First Design',
      'Vercel / Render / AWS Deployment',
    ],
    techStack: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind', 'TypeScript'],
    highlight: 'NeoFin PWA: AI-powered finance tracker with voice commands',
    color: 'from-cyan-500 to-emerald-400',
    borderColor: 'border-cyan-500/30',
    glowColor: 'shadow-cyan-500/20',
    iconBg: 'bg-cyan-500/10',
    accentText: 'text-cyan-400',
  },
  {
    icon: <FiBarChart2 />,
    title: 'AI-Powered Dashboards',
    tagline: 'Data That Tells Stories',
    description: 'Interactive, real-time dashboards with AI-powered analytics. Transform raw data into actionable intelligence with stunning visualizations and automated insights.',
    deliverables: [
      'Real-Time Data Visualization (Chart.js / Recharts)',
      'Live API Integration & WebSocket Feeds',
      'KPI Tracking & Business Metrics',
      'Custom Analytics & Reporting',
      'AI-Generated Insights & Summaries',
      'Export & Sharing Capabilities',
    ],
    techStack: ['React', 'Chart.js', 'Recharts', 'D3.js', 'WebSocket', 'Power BI'],
    highlight: 'Skill Dashboard: 1,300+ AI skills with real-time analytics',
    color: 'from-amber-500 to-orange-400',
    borderColor: 'border-amber-500/30',
    glowColor: 'shadow-amber-500/20',
    iconBg: 'bg-amber-500/10',
    accentText: 'text-amber-400',
  },
];

/* ─── Process Steps ─── */
const processSteps = [
  {
    phase: '01',
    title: 'Discovery',
    subtitle: 'Understanding Your Vision',
    description: 'Deep-dive into your business goals, technical requirements, and user needs. I map out the problem space before writing a single line of code.',
    icon: <FiMessageCircle />,
    duration: '1–2 Days',
  },
  {
    phase: '02',
    title: 'Architecture',
    subtitle: 'Blueprint & Strategy',
    description: 'System design, tech stack selection, database modeling, and API architecture. You get a clear technical roadmap before development begins.',
    icon: <FiGitBranch />,
    duration: '2–3 Days',
  },
  {
    phase: '03',
    title: 'Build',
    subtitle: 'Code, Test, Iterate',
    description: 'Agile development sprints with daily updates. Clean, documented, production-grade code. Continuous integration and automated testing.',
    icon: <FiTerminal />,
    duration: 'Sprint-Based',
  },
  {
    phase: '04',
    title: 'Deploy',
    subtitle: 'Launch & Scale',
    description: 'Production deployment with CI/CD pipelines, monitoring, and performance optimization. I don\'t disappear after delivery — ongoing support included.',
    icon: <FiGlobe />,
    duration: 'Ongoing',
  },
];

/* ─── Stats ─── */
const stats = [
  { value: '6+', label: 'Projects Shipped', icon: <FiBox /> },
  { value: '98%', label: 'Accuracy Achieved', icon: <FiTrendingUp /> },
  { value: '17K+', label: 'Categories Processed', icon: <FiDatabase /> },
  { value: '<70ms', label: 'API Response Time', icon: <FiZap /> },
];

/* ─── Tech Arsenal ─── */
const techCategories = [
  {
    category: 'AI / LLM',
    techs: ['LangGraph', 'CrewAI', 'OpenAI API', 'Gemini API', 'Claude API', 'RAG Pipelines', 'FAISS', 'CLIP', 'PyTorch', 'Scikit-learn', 'Hugging Face', 'Prompt Engineering', 'LLM Fine-Tuning', 'Vector Databases', 'Embeddings'],
  },
  {
    category: 'Frontend',
    techs: ['React.js', 'Next.js', 'TypeScript', 'JavaScript ES6+', 'Tailwind CSS', 'HTML5 / CSS3', 'Three.js', 'Framer Motion', 'Responsive Design', 'PWA', 'Vite', 'Webpack'],
  },
  {
    category: 'Backend',
    techs: ['Node.js', 'Express.js', 'FastAPI', 'Python', 'REST APIs', 'GraphQL', 'WebSocket', 'JWT Auth', 'OAuth 2.0', 'Middleware Design', 'Microservices', 'Serverless'],
  },
  {
    category: 'Data & DevOps',
    techs: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'Firebase', 'Supabase', 'Vercel', 'Render', 'Docker', 'Git / GitHub', 'CI/CD', 'n8n', 'Power BI', 'AWS S3'],
  },
];

/* ─── FAQs ─── */
const faqs = [
  {
    question: 'What types of projects do you take on?',
    answer: 'I specialize in AI/LLM integrations (agentic systems, RAG, chatbots), full-stack web applications (MERN/Next.js), ML model deployment, and AI-powered dashboards. If it involves code + intelligence, I\'m your guy.',
  },
  {
    question: 'How do you handle project communication?',
    answer: 'Daily async updates via your preferred channel (Slack, Discord, WhatsApp, Email). Weekly sync calls for milestone reviews. You\'ll never be in the dark about progress.',
  },
  {
    question: 'Do you provide source code and documentation?',
    answer: 'Absolutely. You get 100% ownership of all source code, deployed on your GitHub/GitLab. Every project includes inline documentation, README files, and a deployment guide.',
  },
  {
    question: 'What\'s your typical turnaround time?',
    answer: 'It depends on scope. A landing page or API integration: 3–5 days. A full-stack app with AI: 2–4 weeks. I always provide a timeline estimate before starting, and I stick to it.',
  },
  {
    question: 'Do you offer post-delivery support?',
    answer: 'Yes — every project includes 2 weeks of free bug-fix support after delivery. Extended maintenance and feature additions can be discussed separately.',
  },
  {
    question: 'Can you work with my existing codebase?',
    answer: 'Definitely. I regularly integrate AI features into existing apps, optimize slow backends, or add new modules to production codebases. I\'ll audit first, then propose a clean integration plan.',
  },
];


/* ─── MAIN COMPONENT ─── */
export const Services: React.FC = () => {
  const [activeService, setActiveService] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Intersection Observer for scroll animations
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

  return (
    <section id="services" className="pt-32 pb-20 px-6 relative z-20 overflow-hidden">
      {/* ─── Ambient Background ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/3 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ════════════════════════════════════════════
            HERO SECTION
           ════════════════════════════════════════════ */}
        <div
          id="svc-hero"
          ref={(el) => { sectionRefs.current['svc-hero'] = el; }}
          className={`text-center mb-24 transition-all duration-1000 ${isVisible('svc-hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Availability */}
          <div className="flex justify-center mb-8">
            <div className="glass px-6 py-3 rounded-full flex items-center gap-3 border border-green-500/20">
              <span className="pulse-dot" />
              <span className="text-green-400 font-medium text-sm tracking-wide uppercase">
                Open for Freelance & Internships
              </span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-space-grotesk text-white mb-6 leading-[0.95]">
            I build systems that
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              think & ship.
            </span>
          </h1>

          <p className="text-secondary text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            From agentic AI pipelines to full-stack web applications — I engineer
            production-grade solutions that solve real problems. No templates. No shortcuts.
            Pure engineering.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-6 border border-white/5 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="text-primary text-xl mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold font-space-grotesk text-white mb-1">{stat.value}</div>
                <div className="text-secondary text-xs uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>


        {/* ════════════════════════════════════════════
            SERVICE OFFERINGS — INTERACTIVE TABS
           ════════════════════════════════════════════ */}
        <div
          id="svc-offerings"
          ref={(el) => { sectionRefs.current['svc-offerings'] = el; }}
          className={`mb-32 transition-all duration-1000 delay-200 ${isVisible('svc-offerings') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-medium uppercase tracking-[0.3em] mb-4 block">What I Offer</span>
            <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk text-white">
              Services & Expertise
            </h2>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {services.map((service, index) => (
              <button
                key={service.title}
                onClick={() => setActiveService(index)}
                className={`group flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer
                  ${activeService === index
                    ? `bg-gradient-to-r ${service.color} text-white shadow-lg ${service.glowColor}`
                    : 'glass text-secondary hover:text-white hover:border-white/20'
                  }`}
              >
                <span className="text-lg">{service.icon}</span>
                <span className="hidden sm:inline">{service.title}</span>
              </button>
            ))}
          </div>

          {/* Active Service Detail */}
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`transition-all duration-500 ${activeService === index ? 'block' : 'hidden'}`}
            >
              <div className="glass rounded-3xl overflow-hidden border border-white/5">
                <div className="grid lg:grid-cols-5 gap-0">

                  {/* Left Panel — Info */}
                  <div className="lg:col-span-3 p-8 md:p-12">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${service.iconBg} ${service.accentText} text-sm font-medium mb-6`}>
                      {service.icon}
                      {service.tagline}
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold font-space-grotesk text-white mb-4">
                      {service.title}
                    </h3>

                    <p className="text-secondary text-base leading-relaxed mb-8 max-w-xl">
                      {service.description}
                    </p>

                    {/* Highlight Badge */}
                    <div className={`glass rounded-xl p-4 mb-8 border ${service.borderColor}`}>
                      <div className="flex items-start gap-3">
                        <FiZap className={`${service.accentText} mt-1 flex-shrink-0`} />
                        <p className={`text-sm ${service.accentText} font-medium`}>
                          {service.highlight}
                        </p>
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2">
                      {service.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/5 text-secondary border border-white/10 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Panel — Deliverables */}
                  <div className="lg:col-span-2 bg-white/[0.02] border-t lg:border-t-0 lg:border-l border-white/5 p-8 md:p-12">
                    <h4 className="text-sm uppercase tracking-[0.2em] text-secondary mb-6 font-medium">
                      What's Included
                    </h4>
                    <ul className="space-y-4">
                      {service.deliverables.map((item, i) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm text-white/80 group/item"
                          style={{ animationDelay: `${i * 80}ms` }}
                        >
                          <FiCheck className={`${service.accentText} mt-0.5 flex-shrink-0`} />
                          <span className="group-hover/item:text-white transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 pt-6 border-t border-white/5">
                      <a
                        href="#contact"
                        className={`inline-flex items-center gap-2 text-sm font-medium ${service.accentText} hover:underline group/link`}
                      >
                        Discuss This Service
                        <FiArrowRight className="group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* ════════════════════════════════════════════
            MY PROCESS — TIMELINE
           ════════════════════════════════════════════ */}
        <div
          id="svc-process"
          ref={(el) => { sectionRefs.current['svc-process'] = el; }}
          className={`mb-32 transition-all duration-1000 delay-300 ${isVisible('svc-process') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-medium uppercase tracking-[0.3em] mb-4 block">How I Work</span>
            <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk text-white">
              From Idea to Production
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2 z-0" />

            {processSteps.map((step, index) => (
              <div
                key={step.phase}
                className="relative z-10 group"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="glass rounded-2xl p-8 border border-white/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 h-full">
                  {/* Phase Number */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-5xl font-bold font-space-grotesk text-white/5 group-hover:text-primary/20 transition-colors">
                      {step.phase}
                    </span>
                    <span className="text-primary text-xl group-hover:scale-110 transition-transform">
                      {step.icon}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold font-space-grotesk text-white mb-1">
                    {step.title}
                  </h4>
                  <p className="text-primary text-xs uppercase tracking-wider mb-4 font-medium">
                    {step.subtitle}
                  </p>
                  <p className="text-secondary text-sm leading-relaxed mb-4">
                    {step.description}
                  </p>

                  <div className="mt-auto">
                    <span className="text-xs text-secondary bg-white/5 px-3 py-1 rounded-full">
                      ⏱ {step.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* ════════════════════════════════════════════
            TECH ARSENAL
           ════════════════════════════════════════════ */}
        <div
          id="svc-tech"
          ref={(el) => { sectionRefs.current['svc-tech'] = el; }}
          className={`mb-32 transition-all duration-1000 delay-300 ${isVisible('svc-tech') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-16">
            <span className="text-purple-400 text-sm font-medium uppercase tracking-[0.3em] mb-4 block">Tech Stack</span>
            <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk text-white">
              Battle-Tested Arsenal
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techCategories.map((cat) => (
              <div key={cat.category} className="glass rounded-2xl p-6 border border-white/5 hover:border-primary/20 transition-all duration-300">
                <h4 className="text-sm uppercase tracking-[0.2em] text-primary mb-5 font-bold">
                  {cat.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cat.techs.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-white/70 border border-white/8 hover:border-primary/40 hover:text-white transition-all duration-200 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* ════════════════════════════════════════════
            TESTIMONIALS — SOCIAL PROOF
           ════════════════════════════════════════════ */}
        <div
          id="svc-testimonials"
          ref={(el) => { sectionRefs.current['svc-testimonials'] = el; }}
          className={`mb-32 transition-all duration-1000 delay-300 ${isVisible('svc-testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-medium uppercase tracking-[0.3em] mb-4 block">Social Proof</span>
            <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk text-white">
              What People Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-8 border border-white/5 hover:border-primary/20 transition-all duration-500 relative group overflow-hidden"
              >
                {/* Decorative Quote */}
                <div className="absolute -top-4 -left-2 text-8xl font-serif text-primary/10 pointer-events-none select-none group-hover:text-primary/20 transition-colors">"</div>

                {/* Stars */}
                <div className="flex gap-1 mb-4 relative z-10">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <FiStar key={i} className="text-amber-400 fill-amber-400" size={14} />
                  ))}
                </div>

                <p className="text-white/80 leading-relaxed mb-6 relative z-10 text-sm md:text-base">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-4 relative z-10">
                  {/* Avatar placeholder */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{testimonial.author}</p>
                    <p className="text-primary text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* ════════════════════════════════════════════
            WHY WORK WITH ME
           ════════════════════════════════════════════ */}
        <div
          id="svc-why"
          ref={(el) => { sectionRefs.current['svc-why'] = el; }}
          className={`mb-32 transition-all duration-1000 delay-300 ${isVisible('svc-why') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-16">
            <span className="text-green-400 text-sm font-medium uppercase tracking-[0.3em] mb-4 block">The Difference</span>
            <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk text-white">
              Why Work With Me
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <FiCode />,
                title: 'No Template Engineering',
                description: 'Every line of code is purpose-built for your use case. I don\'t recycle boilerplate — I architect custom solutions that scale.',
                accent: 'text-blue-400',
              },
              {
                icon: <FiShield />,
                title: 'Production-Grade From Day 1',
                description: 'Error handling, edge cases, security — baked in from the start. Not bolted on as an afterthought. Your system ships battle-ready.',
                accent: 'text-purple-400',
              },
              {
                icon: <FiZap />,
                title: 'AI-Native Thinking',
                description: 'I don\'t just use AI — I build AI systems. From LangGraph agents to CLIP embeddings, I bring deep AI fluency to every project.',
                accent: 'text-cyan-400',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="glass rounded-2xl p-8 border border-white/5 hover:border-primary/20 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className={`text-3xl ${item.accent} mb-4 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h4 className="text-lg font-bold font-space-grotesk text-white mb-3">
                  {item.title}
                </h4>
                <p className="text-secondary text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>


        {/* ════════════════════════════════════════════
            TRUST SIGNALS
           ════════════════════════════════════════════ */}
        <div
          id="svc-trust"
          ref={(el) => { sectionRefs.current['svc-trust'] = el; }}
          className={`mb-32 transition-all duration-1000 delay-300 ${isVisible('svc-trust') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <FiClock />, value: '< 24h', label: 'Response Time' },
              { icon: <FiRefreshCw />, value: '2 Weeks', label: 'Free Bug-Fix Support' },
              { icon: <FiUsers />, value: '100%', label: 'Code Ownership' },
              { icon: <FiAward />, value: 'Daily', label: 'Progress Updates' },
            ].map((trust) => (
              <div key={trust.label} className="text-center p-6 glass rounded-2xl border border-white/5 hover:border-green-500/20 transition-all duration-300 group">
                <div className="text-green-400 text-2xl mb-3 group-hover:scale-110 transition-transform mx-auto flex justify-center">{trust.icon}</div>
                <div className="text-2xl font-bold font-space-grotesk text-white mb-1">{trust.value}</div>
                <div className="text-secondary text-xs uppercase tracking-wider">{trust.label}</div>
              </div>
            ))}
          </div>
        </div>


        {/* ════════════════════════════════════════════
            CONSULTING TIERS — MONETIZATION ANCHOR
           ════════════════════════════════════════════ */}
        <div
          id="svc-tiers"
          ref={(el) => { sectionRefs.current['svc-tiers'] = el; }}
          className={`mb-32 transition-all duration-1000 delay-300 ${isVisible('svc-tiers') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-medium uppercase tracking-[0.3em] mb-4 block">Productized Engagements</span>
            <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk text-white">
              Consulting Tiers
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-2xl p-8 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 flex flex-col group">
              <h3 className="text-2xl font-bold font-space-grotesk text-white mb-2">Architecture Audit</h3>
              <p className="text-emerald-400 font-mono mb-6">$500 <span className="text-secondary text-base">/ scoping</span></p>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-2 text-secondary text-sm"><FiCheck className="text-emerald-400 mt-1" /> 60-min Deep Dive</li>
                <li className="flex items-start gap-2 text-secondary text-sm"><FiCheck className="text-emerald-400 mt-1" /> Tech Stack Validation</li>
                <li className="flex items-start gap-2 text-secondary text-sm"><FiCheck className="text-emerald-400 mt-1" /> Vector DB Strategy</li>
              </ul>
              <a href="/contact" className="w-full py-3 rounded-lg border border-emerald-500/30 text-emerald-400 text-center font-medium hover:bg-emerald-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">Book Audit</a>
            </div>

            <div className="glass rounded-2xl p-8 border border-primary/40 bg-primary/5 hover:border-primary transition-all duration-300 relative flex flex-col transform hover:-translate-y-2">
              <div className="absolute top-0 right-4 -translate-y-1/2">
                <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
              </div>
              <h3 className="text-2xl font-bold font-space-grotesk text-white mb-2">Agentic MVP Build</h3>
              <p className="text-primary font-mono mb-6">Starts at <span className="text-2xl">$2,500</span></p>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-2 text-secondary text-sm"><FiCheck className="text-primary mt-1" /> End-to-End Delivery</li>
                <li className="flex items-start gap-2 text-secondary text-sm"><FiCheck className="text-primary mt-1" /> Multi-Agent Setup</li>
                <li className="flex items-start gap-2 text-secondary text-sm"><FiCheck className="text-primary mt-1" /> Production Vercel Deploy</li>
              </ul>
              <a href="/contact" className="w-full py-3 rounded-lg bg-primary text-white text-center font-bold hover:bg-blue-600 transition-colors glow-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Start Project</a>
            </div>

            <div className="glass rounded-2xl p-8 border border-white/5 hover:border-purple-500/30 transition-all duration-300 flex flex-col group">
              <h3 className="text-2xl font-bold font-space-grotesk text-white mb-2">Enterprise Retainer</h3>
              <p className="text-purple-400 font-mono mb-6">Custom <span className="text-secondary text-base">/ monthly</span></p>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-2 text-secondary text-sm"><FiCheck className="text-purple-400 mt-1" /> Dedicated Tech Partner</li>
                <li className="flex items-start gap-2 text-secondary text-sm"><FiCheck className="text-purple-400 mt-1" /> Scale Infrastructure</li>
                <li className="flex items-start gap-2 text-secondary text-sm"><FiCheck className="text-purple-400 mt-1" /> Priority SLA & Support</li>
              </ul>
              <a href="/contact" className="w-full py-3 rounded-lg border border-purple-500/30 text-purple-400 text-center font-medium hover:bg-purple-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500">Contact Sales</a>
            </div>
          </div>
        </div>


        {/* ════════════════════════════════════════════
            FAQ — FREQUENTLY ASKED QUESTIONS
           ════════════════════════════════════════════ */}
        <div
          id="svc-faq"
          ref={(el) => { sectionRefs.current['svc-faq'] = el; }}
          className={`mb-32 transition-all duration-1000 delay-300 ${isVisible('svc-faq') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-medium uppercase tracking-[0.3em] mb-4 block">Got Questions?</span>
            <h2 className="text-4xl md:text-5xl font-bold font-space-grotesk text-white">
              Frequently Asked
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>


        {/* ════════════════════════════════════════════
            CTA — FINAL CONVERSION BLOCK
           ════════════════════════════════════════════ */}
        <div
          id="svc-cta"
          ref={(el) => { sectionRefs.current['svc-cta'] = el; }}
          className={`transition-all duration-1000 delay-300 ${isVisible('svc-cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-cyan-500/20" />
            <div className="absolute inset-0 glass" />

            <div className="relative z-10 text-center py-20 px-8">
              <h2 className="text-4xl md:text-6xl font-bold font-space-grotesk text-white mb-6">
                Ready to build
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  something extraordinary?
                </span>
              </h2>

              <p className="text-secondary text-lg max-w-2xl mx-auto mb-10">
                Whether it's an AI agent, a full-stack app, or a data pipeline — let's turn your
                idea into a production-ready system that actually works.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-primary hover:bg-blue-600 text-white font-bold text-lg transition-all duration-300 hover:scale-105 glow-blue group"
                >
                  Let's Talk
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="mailto:04manank@gmail.com"
                  className="inline-flex items-center gap-2 px-10 py-4 rounded-xl border border-primary/50 text-primary hover:bg-primary/10 font-medium text-lg transition-all duration-300"
                >
                  04manank@gmail.com
                </a>
              </div>

              <p className="text-secondary/60 text-xs mt-8 uppercase tracking-wider">
                Average response time — Under 24 hours
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};


/* ─── FAQ ACCORDION ITEM ─── */
interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`glass rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen ? 'border-primary/30' : 'border-white/5 hover:border-white/10'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left cursor-pointer group"
      >
        <span className="text-white font-medium text-base pr-4 group-hover:text-primary transition-colors">
          {question}
        </span>
        <FiChevronDown
          className={`text-primary flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          size={20}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 pt-0">
          <p className="text-secondary text-sm leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
};
