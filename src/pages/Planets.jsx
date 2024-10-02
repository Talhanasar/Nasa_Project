import React, { Suspense, useState, useEffect, useMemo, useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { celestialObjects } from '../component/CelestialData'
import Sketch from '../component/Sketch'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import '../css/planets.css'

const planetNames = ['sun', 'mercury', 'venus', 'earth', 'moon', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
const cubeTextureLoader = new THREE.CubeTextureLoader();

const Planets = () => {
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState(0)
  const [initialTranslate, setInitialTranslate] = useState(45.5)
  const carouselRef = useRef(null)

  const textures = useLoader(THREE.TextureLoader,
    planetNames.map(name => `/textures/${name}.jpg`)
  );

  const texturesObject = useMemo(() =>
    Object.fromEntries(planetNames.map((name, index) => [name, textures[index]]))
  , [textures]);

  const backgroundCubemap = useMemo(() =>
    cubeTextureLoader.load([
      '/textures/cubeMap/nx.png',
      '/textures/cubeMap/px.png',
      '/textures/cubeMap/py.png',
      '/textures/cubeMap/ny.png',
      '/textures/cubeMap/pz.png',
      '/textures/cubeMap/nz.png'
    ])
  , []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setInitialTranslate(width < 450 ? -0.5 : 45.5);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleArrowClick = (direction) => {
    setCurrentPlanetIndex(prevIndex => {
      const newIndex = direction === 'left'
        ? (prevIndex === 0 ? celestialObjects.length - 1 : prevIndex - 1)
        : (prevIndex + 1) % celestialObjects.length;
      
      if (carouselRef.current) {
        carouselRef.current.style.transform = `translateX(${440 - (newIndex * 98 - (newIndex>4? 0.5: 0))}%)`;
      }
      
      return newIndex;
    });
  };

  const celestialObjectInfoItems = useMemo(() => (
    celestialObjects.map((planet, index) => (
      <li key={index} className='info-item'>
        <h2>{planet.name}</h2>
        <p>{planet.description}</p>
      </li>
    ))
  ), []);

  return (
    <section className='main-planets'>
      <div className="model-3d">
        <Suspense fallback={<div>Loading Planet...</div>}>
          <Sketch 
            name={celestialObjects[currentPlanetIndex].name.toLowerCase()} 
            textures={texturesObject} 
            backgroundCubemap={backgroundCubemap} 
          />
        </Suspense>
        <h1 className='title'>{celestialObjects[currentPlanetIndex].title}</h1>
        <IoIosArrowBack
          className="arrow-icon left"
          aria-label="Previous planet"
          onClick={() => handleArrowClick('left')}
        />
        <IoIosArrowForward
          className="arrow-icon right"
          aria-label="Next planet"
          onClick={() => handleArrowClick('right')}
        />
      </div>
      <div className="carousel-container">
        <ul className="info-planets" ref={carouselRef}>
          {celestialObjectInfoItems}
        </ul>
      </div>
    </section>
  )
}

export default Planets
