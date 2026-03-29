import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import type { Skill } from '../../data/skills';
import { skills } from '../../data/skills';

const categoryColors = {
  'ai-ml': '#8B5CF6',
  'frontend': '#3B82F6',
  'backend': '#06B6D4',
  'tools': '#FFFFFF',
};

export const SkillsGlobe: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skillData = useMemo(() => {
    const data: { skill: Skill; position: THREE.Vector3; color: string }[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    skills.forEach((skill, i) => {
      const y = 1 - (i / (skills.length - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      data.push({
        skill,
        position: new THREE.Vector3(x * 2.5, y * 2.5, z * 2.5),
        color: categoryColors[skill.category],
      });
    });

    return data;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {skillData.map(({ skill, position, color }) => {
        const isHovered = hoveredSkill === skill.name;
        return (
          <group key={skill.name} position={position}>
            <mesh
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredSkill(skill.name);
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredSkill(null);
              }}
            >
              <sphereGeometry args={[isHovered ? 0.2 : 0.15, 16, 16]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={isHovered ? 2 : 0.5}
              />
            </mesh>
            {isHovered && (
              <Text
                position={[0, 0.4, 0]}
                fontSize={0.15}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
              >
                {skill.name}
              </Text>
            )}
          </group>
        );
      })}
    </group>
  );
};
