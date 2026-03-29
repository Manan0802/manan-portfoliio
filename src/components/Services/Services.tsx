import React from 'react';
import { SectionTitle } from '../shared/SectionTitle';
import { testimonials } from '../../data/testimonials';
import { FiCpu, FiCpu as FiBrain, FiMonitor, FiBarChart2 } from 'react-icons/fi';
import './Services.css';

const services = [
  {
    icon: <FiCpu />,
    title: 'Agentic AI Systems',
    shortDesc: 'LLM pipeline design & multi-agent workflows',
    details: [
      'LLM pipeline design',
      'Multi-agent workflows',
      'n8n automations',
      'Cost optimization',
      'Production deployment',
    ],
  },
  {
    icon: <FiBrain />,
    title: 'ML Model Integration',
    shortDesc: 'Custom model training & API integration',
    details: [
      'Custom model training',
      'API integration',
      'Real-time inference',
      'PyTorch/Scikit-learn',
      'Performance tuning',
    ],
  },
  {
    icon: <FiMonitor />,
    title: 'Full Stack Web Apps',
    shortDesc: 'React/Next.js frontend & Node.js backend',
    details: [
      'React/Next.js frontend',
      'Node.js backend',
      'MongoDB/MySQL',
      'REST APIs',
      'Auth systems',
      'Deployment',
    ],
  },
  {
    icon: <FiBarChart2 />,
    title: 'AI-Powered Dashboards',
    shortDesc: 'Real-time data viz & live APIs',
    details: [
      'Real-time data viz',
      'Chart.js/Recharts',
      'Live APIs integration',
      'KPI tracking',
      'Custom analytics',
    ],
  },
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Services"
          subtitle="Turning ideas into intelligent, production-ready systems"
          glow="blue"
        />

        {/* Availability Badge */}
        <div className="flex justify-center mb-16">
          <div className="glass px-6 py-3 rounded-full flex items-center gap-3">
            <span className="pulse-dot" />
            <span className="text-secondary">
              Available for Internships & Freelance Projects
            </span>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

        {/* My Process */}
        <div className="mb-32">
          <h3 className="text-2xl font-space-grotesk text-center mb-12">
            My Process
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {['Understand', 'Plan', 'Build', 'Deliver'].map((step, index) => (
              <React.Fragment key={step}>
                <div className="glass px-8 py-4 rounded-xl">
                  <span className="text-primary font-bold text-lg">{index + 1}.</span>
                  <span className="text-white ml-2">{step}</span>
                </div>
                {index < 3 && (
                  <div className="w-8 md:w-16 h-px bg-gradient-to-r from-primary/50 to-transparent hidden md:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="text-2xl font-space-grotesk text-center mb-12">
            What People Say
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  service: (typeof services)[0];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => (
  <div className="flip-card h-64 perspective-1000">
    <div className="flip-card-inner w-full h-full relative">
      {/* Front */}
      <div className="flip-card-front glass rounded-2xl p-6 flex flex-col items-center justify-center text-center h-full">
        <div className="text-4xl text-primary mb-4">{service.icon}</div>
        <h4 className="text-xl font-bold font-space-grotesk text-white mb-2">
          {service.title}
        </h4>
        <p className="text-secondary text-sm">{service.shortDesc}</p>
      </div>

      {/* Back */}
      <div className="flip-card-back glass rounded-2xl p-6 flex flex-col justify-center h-full">
        <h4 className="text-xl font-bold font-space-grotesk text-white mb-4">
          What's Included
        </h4>
        <ul className="space-y-2">
          {service.details.map((item) => (
            <li key={item} className="text-secondary text-sm flex items-center gap-2">
              <span className="w-1 h-1 bg-primary rounded-full" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

interface TestimonialCardProps {
  testimonial: (typeof testimonials)[0];
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => (
  <div className="glass rounded-2xl p-8 relative">
    <div className="text-6xl text-primary/20 absolute top-4 left-4">"</div>
    <p className="text-secondary leading-relaxed mb-6 relative z-10">
      {testimonial.quote}
    </p>
    <div>
      <p className="text-white font-medium">{testimonial.author}</p>
      <p className="text-primary text-sm">{testimonial.role}</p>
    </div>
  </div>
);
