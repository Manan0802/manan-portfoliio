import React, { useEffect, useRef, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const CharacterModel: React.FC = () => {
  const { scene, animations } = useGLTF('/models/character.glb');
  const { actions } = useAnimations(animations, scene);
  const meshRef = useRef<THREE.Group>(null);
  const headBoneRef = useRef<THREE.Bone>(null);
  const { mouse } = useThree();
  const [isHovered, setIsHovered] = useState(false);

  // Find head bone
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.name.toLowerCase().includes('head') && child instanceof THREE.Bone) {
          headBoneRef.current = child;
        }
      });
    }
  }, [scene]);

  // Play animations on load
  useEffect(() => {
    if (actions) {
      // Play intro animation once
      const introAction = actions['introAnimation'];
      if (introAction) {
        introAction.reset().play();
        introAction.clampWhenFinished = true;
      }

      // Loop blink animation
      const blinkAction = actions['Blink'];
      if (blinkAction) {
        blinkAction.reset().play();
      }
    }
  }, [actions]);

  // Handle mouse hover
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const characterElement = document.querySelector('.character-container');
      if (characterElement) {
        const rect = characterElement.getBoundingClientRect();
        const isOver =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom;
        setIsHovered(isOver);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Play browup on hover
  useEffect(() => {
    if (actions) {
      if (isHovered) {
        const browupAction = actions['browup'];
        if (browupAction) {
          browupAction.reset().play();
        }
      }
    }
  }, [isHovered, actions]);

  useFrame(() => {
    if (meshRef.current) {
      // Mouse parallax on body
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        mouse.x * 0.3,
        0.05
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        -mouse.y * 0.1,
        0.05
      );

      // Scroll-based head rotation
      if (headBoneRef.current) {
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = scrollY / maxScroll;
        headBoneRef.current.rotation.y = THREE.MathUtils.lerp(
          headBoneRef.current.rotation.y,
          scrollPercent * Math.PI * 0.5,
          0.05
        );
      }
    }
  });

  // Set typing animation when About section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && actions) {
          const typingAction = actions['typing'];
          if (typingAction) {
            typingAction.reset().play();
          }
        }
      },
      { threshold: 0.5 }
    );

    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => observer.disconnect();
  }, [actions]);

  return (
    <group ref={meshRef} dispose={null}>
      <primitive object={scene.clone()} scale={1.5} position={[0, -1, 0]} />
    </group>
  );
};

useGLTF.preload('/models/character.glb');
