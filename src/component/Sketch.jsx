import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { celestialBodies } from './CelestialData';
import * as THREE from 'three';

const Globe = React.memo(function Globe({ name, textures }) {
  const globeRef = useRef();
  const ringsRef = useRef();
  const texture = textures[name.toLowerCase()];
  const ringTexture = name.toLowerCase() === 'saturn' ? useLoader(THREE.TextureLoader, '/textures/saturn_Ring.png') : null;

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
        <mesh ref={ringsRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 2, 64]} /> {/* Adjust inner and outer radius as needed */}
          <meshStandardMaterial 
            map={ringTexture} 
            side={THREE.DoubleSide} 
            transparent={true} 
            opacity={0.8}
          />
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
      <pointLight position={[-10, -10, -10]} intensity={1} />
      <Globe name={name} textures={textures} />
    </>
  );
});

const Sketch = ({ name, textures, backgroundCubemap }) => {
  return (
    <Canvas camera={{ position: [0, 0.7, 3], fov: 75 }}>
      <Scene name={name} textures={textures} backgroundCubemap={backgroundCubemap} />
      <OrbitControls enableDamping dampingFactor={0.05} enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

export default React.memo(Sketch);
