import React, { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { createPlanets } from './CelestialData'
import PlanetLabel from './PlanetLabel'


const Sun = React.memo(function Sun({ texture }) {
    return (
        <mesh scale={5}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial map={texture} />
        </mesh>
    )
})

const SaturnRing = React.memo(function SaturnRing() {
    const texture = useLoader(THREE.TextureLoader, "/3D_models/textures/saturn_ring.png")

    return (
        <mesh rotation-x={Math.PI / 2}>
            <ringGeometry args={[1.2, 2, 64]} />
            <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
        </mesh>
    )
})

const OrbitRing = React.memo(function OrbitRing({ distance }) {
    return (
        <mesh rotation-x={Math.PI / 2}>
            <ringGeometry args={[distance, distance + 0.2, 64]} />
            <meshBasicMaterial color="#FFFFFF" transparent={true} opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
    )
})

const Moon = React.memo(function Moon({ moon, texture }) {
    const ref = useRef()

    useFrame((state, delta) => {
        ref.current.rotation.y += moon.speed
        ref.current.position.x = Math.sin(ref.current.rotation.y) * moon.distance
        ref.current.position.z = Math.cos(ref.current.rotation.y) * moon.distance
    })

    return (
        <mesh ref={ref} scale={moon.radius}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    )
})

function CubeBackground() {
    const { scene } = useThree()

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

    return null
}

const Planet = React.memo(function Planet({ planet, textures }) {
    const ref = useRef()
    const groupRef = useRef()

    useFrame((state, delta) => {
        ref.current.rotation.y += planet.speed
        ref.current.position.x = Math.sin(ref.current.rotation.y) * planet.distance
        ref.current.position.z = Math.cos(ref.current.rotation.y) * planet.distance
    })

    // Apply tilt to Saturn
    useEffect(() => {
        if (planet.name === "Saturn") {
            groupRef.current.rotation.x = -(Math.PI / 7); // Tilt by about 26 degrees
        }
    }, [planet.name]);

    return (
        <>
            <OrbitRing distance={planet.distance} />
            <group ref={ref}>
                <group ref={groupRef}>
                    <mesh scale={planet.radius}>
                        <sphereGeometry args={[1, 32, 32]} />
                        <primitive object={planet.material} />
                    </mesh>
                    {planet.name === "Saturn" && <SaturnRing />}
                    <PlanetLabel name={planet.name} />
                </group>
                {planet.moons.map((moon, index) => (
                    <Moon key={index} moon={moon} texture={textures.moonTexture} />
                ))}
            </group>
        </>
    )
})

export default function SolarSystem() {
    const [
        sunTexture,
        mercuryTexture,
        venusTexture,
        earthTexture,
        marsTexture,
        jupiterTexture,
        saturnTexture,
        uranusTexture,
        neptuneTexture,
        moonTexture,
        saturnRingTexture
    ] = useLoader(THREE.TextureLoader, [
        "/3D_models/textures/sun.png",
        "/3D_models/textures/mercury.png",
        "/3D_models/textures/venus.png",
        "/3D_models/textures/earth.png",
        "/3D_models/textures/mars.png",
        "/3D_models/textures/jupiter.png",
        "/3D_models/textures/saturn.png",
        "/3D_models/textures/uranus.png",
        "/3D_models/textures/neptune.png",
        "/3D_models/textures/moon.png",
        "/3D_models/textures/saturn_ring.png"
    ])

    const textures = {
        sunTexture,
        mercuryTexture,
        venusTexture,
        earthTexture,
        marsTexture,
        jupiterTexture,
        saturnTexture,
        uranusTexture,
        neptuneTexture,
        moonTexture,
        saturnRingTexture
    }

    const planets = useMemo(() => createPlanets(textures), [textures])

    return (
        <Canvas camera={{ position: [0, 50, 100], fov: 45 }} style={{height: '100%', width: '100%'}}>
            <CubeBackground />
            <ambientLight intensity={0.3} />
            <pointLight position={[0, 0, 0]} intensity={1000} />
            <Sun texture={sunTexture} />
            {planets.map((planet, index) => (
                <Planet key={index} planet={planet} textures={textures} />
            ))}
            <OrbitControls 
            enableDamping  
            maxDistance={100}  
            minDistance={20}
            />
        </Canvas>
    )
}
