import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import {createPlanets} from './CelestialData';
import PlanetLabel from './PlanetLabel';

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
          <meshBasicMaterial map={useLoader(THREE.TextureLoader, "/3D_models/saturn_ring.png")} side={THREE.DoubleSide} />
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
      <meshStandardMaterial map={useLoader(THREE.TextureLoader, "/3D_models/moon.png")} />
      <PlanetLabel name={moon.name} />
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
      <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.1} />
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

const SolarSystem = ({textures, backgroundCubemap}) => {
  return (
    <Canvas camera={{ position: [0, 30, 80], fov: 45 }}>
      <Scene textures={textures} backgroundCubemap={backgroundCubemap} />
      <OrbitControls enableDamping maxDistance={100} minDistance={20} />
    </Canvas>
  );
};

export default React.memo(SolarSystem);
