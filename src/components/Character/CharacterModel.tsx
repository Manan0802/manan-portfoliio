/* eslint-disable react-hooks/immutability */
import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const CharacterModel: React.FC = () => {
  // Load the specific GLB file the user requested
  const { scene, animations } = useGLTF('/models/nexbot_robot_character_concept.glb');
  const { actions, mixer } = useAnimations(animations, scene);
  const meshRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  // Basic setup to ensure materials look good
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          if (mesh.material) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            if (mat.isMeshStandardMaterial) {
              mat.envMapIntensity = 1.5;
            }
          }
        }
      });
      // Optionally center the model automatically
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.x += (scene.position.x - center.x);
      scene.position.y += (scene.position.y - center.y);
      scene.position.z += (scene.position.z - center.z);
    }
  }, [scene]);

  // Attempt to play the first available animation if any exist
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstActionKey = Object.keys(actions)[0];
      const action = actions[firstActionKey];
      if (action) {
        action.reset().play();
      }
    }
  }, [actions]);

  // Subtle floating and mouse tracking
  useFrame((state) => {
    if (meshRef.current) {
      // Smooth mouse-follow rotation
      const targetRotY = mouse.x * 0.4;
      const targetRotX = -mouse.y * 0.15;

      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotY,
        0.05
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotX,
        0.05
      );

      // Subtle floating float animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    }

    if (mixer) {
      mixer.update(state.clock.getDelta());
    }
  });

  return (
    <group ref={meshRef} dispose={null}>
      {/* Adjust scale to fit the screen; may need tweaking based on the GLB's native size */}
      <primitive object={scene} scale={2} position={[0, -1, 0]} />
    </group>
  );
};

useGLTF.preload('/models/nexbot_robot_character_concept.glb');
