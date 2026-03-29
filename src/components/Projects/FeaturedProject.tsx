import React from 'react';
import { Float } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import type { Project } from '../../data/projects';

interface FeaturedProjectProps {
  project: Project;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({ project }) => {
  return (
    <div className="glass rounded-2xl overflow-hidden mb-16">
      <div className="grid md:grid-cols-2 gap-8 p-8">
        {/* Left: Content */}
        <div className="flex flex-col justify-center">
          <span className="text-primary text-sm font-medium mb-2">
            Featured Project — {project.category}
          </span>
          <h3 className="text-3xl font-bold font-space-grotesk text-white mb-4">
            {project.title}
          </h3>
          <p className="text-secondary mb-6">
            {project.description}
          </p>

          {/* Metrics */}
          {project.metrics && (
            <div className="flex flex-wrap gap-4 mb-6">
              {project.metrics.map((metric) => (
                <div
                  key={metric}
                  className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30"
                >
                  <span className="text-primary font-medium text-sm">{metric}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-sm px-3 py-1 rounded-full bg-secondary/20 text-secondary border border-secondary/30"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                data-cursor="hover"
              >
                <FiGithub /> GitHub
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-blue-600 transition-colors"
                data-cursor="hover"
              >
                <FiExternalLink /> Live App
              </a>
            )}
          </div>
        </div>

        {/* Right: 3D Floating Element */}
        <div className="h-[400px] relative">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            frameloop="demand"
          >
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={100} />
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
              <mesh rotation={[0, -0.3, 0.2]}>
                <boxGeometry args={[3, 2, 0.2]} />
                <meshStandardMaterial color="#3B82F6" metalness={0.8} roughness={0.2} />
              </mesh>
            </Float>
          </Canvas>

          {/* Project screenshot overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[280px] h-[180px] glass rounded-lg overflow-hidden border border-white/10">
              <img
                src={project.image}
                alt="App preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
