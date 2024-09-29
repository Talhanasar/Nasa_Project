import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { celestialBodies } from './CelestialData';

const Globe = React.memo(function Globe({ name, textures }) {
  const globeRef = useRef();
  const texture = textures[name.toLowerCase()];

  const ringTexture = name === 'saturn' ? useLoader(THREE.TextureLoader, `/textures/saturn_ring.jpg`) : null;

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={globeRef}>
        <sphereGeometry args={[1, 64, 64]} />
        {name.toLowerCase() === 'sun' 
          ? <meshBasicMaterial map={texture} /> 
          : <meshStandardMaterial 
              map={texture} 
              metalness={celestialBodies[name.toLowerCase()].metalness} 
              roughness={celestialBodies[name.toLowerCase()].roughness} 
            />
        }
      </mesh>
      {name.toLowerCase() === 'saturn' && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 2, 45]} />
          <meshStandardMaterial map={ringTexture} side={THREE.DoubleSide} transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  );
});

const Scene = React.memo(function Scene({ name, textures, backgroundCubemap }) {
  const { scene } = useThree();
  const planetData = celestialBodies[name.toLowerCase()];

  useMemo(() => {
    if (scene && backgroundCubemap) {
      scene.background = backgroundCubemap;
    }
  }, [scene, backgroundCubemap]);

  return (
    <>
      <ambientLight intensity={planetData.ambientLightIntensity} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={planetData.directionalLightIntensity} 
      />
      <Globe name={name} textures={textures} />
    </>
  );
});

const Sketch = ({ name, textures, backgroundCubemap }) => {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
      <Scene name={name} textures={textures} backgroundCubemap={backgroundCubemap} />
      <OrbitControls enableDamping dampingFactor={0.05} enableZoom={false}
      enablePan={false} />
    </Canvas>
  );
};

export default React.memo(Sketch);
