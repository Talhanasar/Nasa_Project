import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { celestialBodies } from './CelestialData';

const Globe = React.memo(function Globe({ name }) {
  const globeRef = useRef();
  const ringRef = useRef();
  const bodyProperties = celestialBodies[name];
  const texture = useLoader(THREE.TextureLoader, `3D_models/textures/${name}.png`);
  const ringTexture = name === 'saturn' ? useLoader(THREE.TextureLoader, '3D_models/textures/saturn_ring.png') : null;

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.material.metalness = bodyProperties.metalness;
      globeRef.current.material.roughness = bodyProperties.roughness;
    }
  }, [bodyProperties]);

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group>
      <mesh
        ref={globeRef}
        scale={[bodyProperties.scale, bodyProperties.scale, bodyProperties.scale]}
        position={bodyProperties.position}
      >
        <sphereGeometry args={[1, 64, 64]} />
        {name === 'sun' ? <meshBasicMaterial map={texture} /> : <meshStandardMaterial map={texture} />}
      </mesh>
      {name === 'saturn' && (
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} position={bodyProperties.position}>
          <ringGeometry args={[1.8, 2.5, 64]} />
          <meshStandardMaterial map={ringTexture} side={THREE.DoubleSide}
           />
        </mesh>
      )}
    </group>
  );
});

const Scene = React.memo(function Scene({ name }) {
  const { scene } = useThree();
  const bodyProperties = celestialBodies[name];

  useEffect(() => {
    const loader = new THREE.CubeTextureLoader();
    loader.setPath('/textures/');
    const cubeTexture = loader.load([
      'px.png', 'nx.png',
      'py.png', 'ny.png',
      'pz.png', 'nz.png',
    ]);
    scene.background = cubeTexture;
    scene.environment = cubeTexture;
  }, [scene, name]);

  return (
    <>
      <directionalLight 
        position={[2, 2, 5]} 
        intensity={bodyProperties.directionalLightIntensity} 
      />
      <ambientLight intensity={bodyProperties.ambientLightIntensity} />
      <Globe name={name} />
    </>
  );
});

export default function Sketch({ name }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleContextLost = (event) => {
      console.log('WebGL context lost');
      event.preventDefault();
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored');
    };

    const canvas = canvasRef.current;

    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost, false);
      canvas.addEventListener('webglcontextrestored', handleContextRestored, false);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      }
    };
  }, []);

  const canvasStyle = useMemo(() => ({ height: '60%' }), []);
  const orbitControlsProps = useMemo(() => ({
    enableDamping: true,
    dampingFactor: 0.05,
    enableZoom: false
  }), []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, outputEncoding: THREE.sRGBEncoding }}
      style={canvasStyle}
      ref={canvasRef}
    >
      <Scene name={name} />
      <OrbitControls {...orbitControlsProps} />
    </Canvas>
  );
}
