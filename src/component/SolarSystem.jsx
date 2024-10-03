import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import PlanetLabel from './PlanetLabel';
import { createPlanets } from './CelestialData';

const Sun = ({ texture }) => {
  return (
    <mesh scale={5}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial map={texture} />
      <PlanetLabel name="Sun" />
    </mesh>
  );
};

const Planet = ({ planet }) => {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.y += planet.speed;
    ref.current.position.x = Math.sin(ref.current.rotation.y) * planet.distance;
    ref.current.position.z = Math.cos(ref.current.rotation.y) * planet.distance;
  });

  return (
    <group ref={ref}>
      <mesh scale={planet.radius}>
        <sphereGeometry args={[1, 32, 32]} />
        <primitive object={planet.material} attach="material" />
        <PlanetLabel name={planet.name} />
      </mesh>
      {planet.name === "Saturn" && (
        <mesh rotation={[Math.PI/3, 0, 0]}>
          <ringGeometry args={[1.2, 2, 35]} />
          <meshBasicMaterial map={useLoader(THREE.TextureLoader, "/textures/saturn_Ring.png")} side={THREE.DoubleSide} />
        </mesh>
      )}
      {planet.moons.map((moon, index) => (
        <Moon key={index} moon={moon} />
      ))}
    </group>
  );
};

const Moon = ({ moon }) => {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.y += moon.speed;
    ref.current.position.x = Math.sin(ref.current.rotation.y) * moon.distance;
    ref.current.position.z = Math.cos(ref.current.rotation.y) * moon.distance;
  });

  return (
    <mesh ref={ref} scale={moon.radius}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={useLoader(THREE.TextureLoader, "/textures/moon.jpg")} />
    </mesh>
  );
};

const PlanetRing = ({ distance }) => {
  const ringRef = useRef();

  useFrame((state, delta) => {
    ringRef.current.rotation.z += delta * 0.1;
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[distance - 0.15, distance + 0.15, 55]} />
      <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.3} />
    </mesh>
  );
};

const Scene = React.memo(({textures, backgroundCubemap}) => {
  const { scene } = useThree();

  useMemo(() => {
    scene.background = backgroundCubemap;
  }, [scene, backgroundCubemap]);

  const planets = useMemo(() => createPlanets(textures), [textures]);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={1000} />
      <Sun texture={textures.sun} />
      {planets.map((planet, index) => (
        <React.Fragment key={index}>
          <Planet planet={planet} />
          <PlanetRing distance={planet.distance} />
        </React.Fragment>
      ))}
    </>
  );
});

const SolarSystem = () => {
  const [textures, setTextures] = useState({});
  const [backgroundCubemap, setBackgroundCubemap] = useState(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    const cubeLoader = new THREE.CubeTextureLoader();

    Promise.all([
      loader.loadAsync('/textures/sun.jpg'),
      loader.loadAsync('/textures/mercury.jpg'),
      loader.loadAsync('/textures/venus.jpg'),
      loader.loadAsync('/textures/earth.jpg'),
      loader.loadAsync('/textures/mars.jpg'),
      loader.loadAsync('/textures/jupiter.jpg'),
      loader.loadAsync('/textures/saturn.jpg'),
      loader.loadAsync('/textures/uranus.jpg'),
      loader.loadAsync('/textures/neptune.jpg'),
      cubeLoader.loadAsync([
        '/textures/cubeMap/px.png',
        '/textures/cubeMap/nx.png',
        '/textures/cubeMap/py.png',
        '/textures/cubeMap/ny.png',
        '/textures/cubeMap/pz.png',
        '/textures/cubeMap/nz.png'
      ])
    ]).then(([sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, cubemap]) => {
      setTextures({ sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune });
      setBackgroundCubemap(cubemap);
    }).catch(error => {
      console.error("Error loading textures:", error);
    });
  }, []);

  if (!textures.sun || !backgroundCubemap) {
    return <div className='suspense-fallback'>Loading...</div>;
  }

  return (
    <Canvas camera={{ position: [0, 25, 230], fov: 45 }} className='solar-system-canvas'>
      <Scene textures={textures} backgroundCubemap={backgroundCubemap} />
      <OrbitControls enableDamping maxDistance={140} minDistance={20} enablePan={false} />
    </Canvas>
  );
};

export default React.memo(SolarSystem);
