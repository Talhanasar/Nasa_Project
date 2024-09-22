import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

function Globe({name}) {
  const earthRef = useRef();
  const gltf = useLoader(GLTFLoader, `3D_models/${name}.glb`);
  const clock = new THREE.Clock();
  const scale = name === 'earth' ? 1.5 : name === "mars" ? 2.6 : 1.4;
  
  useEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          // Adjust metalness and roughness
          child.material.metalness = 0.3;
          child.material.roughness = name === 'earth' ? 0.5 : 1;
          child.material.needsUpdate = true;
        }
      });
    }
  }, [gltf]);

  useFrame((state,delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.2;
    }
  });

  return <primitive 
    object={gltf.scene} 
    ref={earthRef} 
    scale={[scale, scale, scale]} 
    position={name === 'moon'? [0, -2.4, 0] : [0, -0.7, 0]}
  />;
}

function Scene({name}) {
  const { scene } = useThree();

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
  }, [scene]);

  return (
    <>
      <directionalLight position={[2, 2, 5]} intensity={1.5} />
      <ambientLight intensity={0.17} />
      <Globe name={name} />
    </>
  );
}

export default function Canva3D({name}) {

  const canvaRef = useRef(null);

  useEffect(() => {
    const handleContextLost = (event) => {
      console.log('WebGL context lost');
      event.preventDefault(); // Prevents the default behavior of WebGL context loss
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored');
      // You may want to reload assets or re-render the scene here.
    };

    const canvas = canvaRef.current// Get the canvas element

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

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, outputEncoding: THREE.sRGBEncoding }}
      style={{ height: '60%' }} // Set the canvas height to 100% of the viewport height
      ref={canvaRef}
    >
      <Scene name={name} />
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        enableZoom={false}
      />
    </Canvas>
  );
}
