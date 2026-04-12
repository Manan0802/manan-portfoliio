import React, { useEffect } from 'react';
import { FiX, FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../../data/projects';
import './ProjectModal.css';
import { ArchitectureDiagram } from './ArchitectureDiagram';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="modal-container"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            {/* Close Button */}
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Close modal"
              data-cursor="hover"
            >
              <FiX size={24} />
            </button>

            <div className="modal-content">
              {/* Hero Image */}
              <div className="modal-hero">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy" 
                  decoding="async"
                />
              </div>

              {/* Content */}
              <div className="modal-body">
                {/* Header */}
                <div className="mb-6">
                  <span className="text-primary text-sm font-medium mb-2 block">
                    {project.category}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk text-white mb-3">
                    {project.title}
                  </h2>
                  <p className="text-lg text-secondary leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Metrics */}
                {project.metrics && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold font-space-grotesk text-white mb-3">
                      Key Metrics
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {project.metrics.map((metric) => (
                        <div
                          key={metric}
                          className="px-4 py-3 rounded-lg bg-primary/10 border border-primary/30 text-center"
                        >
                          <span className="text-primary font-bold text-sm md:text-base">
                            {metric}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Problem Statement */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold font-space-grotesk text-white mb-2">
                    Problem
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    {getProblemStatement(project.id)}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold font-space-grotesk text-white mb-2">
                    Solution
                  </h3>
                  <p className="text-secondary leading-relaxed mb-6">
                    {getSolutionStatement(project.id)}
                  </p>
                  
                  {['neofin', 'indiamart'].includes(project.id) && (
                    <div className="mt-4 mb-8">
                      <h3 className="text-lg font-bold font-space-grotesk text-white mb-3">
                        System Architecture
                      </h3>
                      <ArchitectureDiagram projectId={project.id} />
                    </div>
                  )}
                </div>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold font-space-grotesk text-white mb-3">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors font-medium"
                      data-cursor="hover"
                    >
                      <FiGithub /> View Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-blue-600 transition-colors font-medium"
                      data-cursor="hover"
                    >
                      <FiExternalLink /> Live Demo
                    </a>
                  )}
                  {project.colab && (
                    <a
                      href={project.colab}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary/20 text-secondary hover:bg-secondary/40 transition-colors font-medium"
                      data-cursor="hover"
                    >
                      <FiCode /> Open Colab
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Helper functions for problem/solution statements
const getProblemStatement = (projectId: string): string => {
  const statements: Record<string, string> = {
    'investmate': 'Investors struggle to track and understand their portfolio performance across multiple assets. Manual analysis is time-consuming and often misses key insights.',
    'crop-yield': 'Farmers lack access to data-driven insights for optimizing crop yields and fertilizer usage, leading to reduced productivity and environmental impact.',
    'travel-app': 'Travel planning apps often have poor UX, slow performance, and lack comprehensive destination information in a single place.',
  };
  return statements[projectId] || 'This project addresses a real-world problem through innovative engineering.';
};

const getSolutionStatement = (projectId: string): string => {
  const solutions: Record<string, string> = {
    'investmate': 'Built an AI-powered portfolio tracker that aggregates holdings across asset classes and provides Gemini AI-powered recommendations for smarter investment decisions.',
    'crop-yield': 'Developed an ML regression model (R²=0.91) that predicts crop yields based on soil and weather data, plus an explainable fertilizer recommendation system.',
    'travel-app': 'Created a responsive React UI with 30+ destinations, optimized for 90%+ Lighthouse scores and mobile-first user experience.',
  };
  return solutions[projectId] || 'Built a scalable solution using modern technologies to solve the core problem efficiently.';
};
