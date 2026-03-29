import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { CharacterModel } from './CharacterModel';
import { Particles } from './Particles';

interface CharacterSceneProps {
  showParticles?: boolean;
  particleCount?: number;
}

export const CharacterScene: React.FC<CharacterSceneProps> = ({
  showParticles = true,
  particleCount = 15000,
}) => {
  return (
    <Canvas
      className="character-container"
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
      gl={{ antialias: true, alpha: true }}
      frameloop="demand"
      data-cursor="character"
    >
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />

        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={100}
          castShadow
        />
        <spotLight
          position={[-10, 5, 3]}
          angle={0.3}
          penumbra={1}
          intensity={50}
          color="#3B82F6"
        />
        <spotLight
          position={[0, 5, 3]}
          angle={0.3}
          penumbra={1}
          intensity={100}
          color="#8B5CF6"
        />

        {/* Environment */}
        <Environment preset="night" />

        {/* Character */}
        <CharacterModel />

        {/* Particles */}
        {showParticles && <Particles count={particleCount} />}

        {/* Post-processing */}
        <EffectComposer enableNormalPass={false}>
          <Bloom
            intensity={0.3}
            luminanceThreshold={0.8}
            mipmapBlur
          />
        </EffectComposer>

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Suspense>
    </Canvas>
  );
};
