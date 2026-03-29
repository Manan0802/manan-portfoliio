import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  count?: number;
}

export const Particles: React.FC<ParticlesProps> = ({ count = 15000 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color('#3B82F6'); // Blue
    const color2 = new THREE.Color('#8B5CF6'); // Purple

    for (let i = 0; i < count; i++) {
      // Galaxy/sphere distribution
      const radius = Math.random() * 10 + 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Mix colors
      const mixedColor = Math.random() > 0.5 ? color1 : color2;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    return { positions, colors };
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.01;

      // Mouse parallax
      const mouseX = state.mouse.x * 0.1;
      const mouseY = state.mouse.y * 0.1;
      pointsRef.current.rotation.y += mouseX * 0.01;
      pointsRef.current.rotation.x += mouseY * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry
        attach="geometry"
        attributes={{
          position: {
            array: particles.positions,
            count: particles.positions.length / 3,
            itemSize: 3,
          },
          color: {
            array: particles.colors,
            count: particles.colors.length / 3,
            itemSize: 3,
          },
        }}
      />
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
