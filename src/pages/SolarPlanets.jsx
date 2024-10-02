import React, { Suspense, lazy, useEffect, useRef } from 'react';
import '../css/solar-planets.css';

const SolarSystem = lazy(() => import('../component/SolarSystem'));

const SolarPlanets = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleScroll);
      }
    };
  }, []);

  return (
    <section className='main'>
      <div
        className='solar-system-container'
        ref={containerRef}
      >
        <h1 className='title'>3D Model</h1>
        <Suspense fallback={<div className='suspense-fallback'>Loading...</div>}>
          <SolarSystem />
        </Suspense>
      </div>
      <h1 className='header'>Solar System</h1>
      <ul className="info">
        <li>
          Picture a big family in space. The Sun is like a parent, bright and warm, sitting in the middle. Around it, planets spin like children playing a never-ending game of tag. Each planet is special, with its own look and way of moving. Some are small and rocky, others are big and made of gas. They all dance around the Sun, following invisible paths called orbits.
        </li>
        <li>
          Our solar system is full of amazing sights. Mercury is hot and covered in holes called craters. Venus is wrapped in thick clouds. Earth is our blue and green home. Mars is red and dusty. Jupiter is huge with colorful stripes. Saturn wears beautiful rings. Uranus and Neptune are icy blue giants far, far away. Between and beyond the planets, smaller objects like asteroids and comets zoom around, adding to the space family.
        </li>
        <li>
          This big space family teaches us a lot. By looking at other planets, we learn more about our own. Every time we send a spacecraft to explore, it's like turning a page in an exciting story. We discover new things about where we come from and imagine what other worlds might be like. Our solar system is like a giant playground in space, full of wonders waiting for us to explore!
        </li>
      </ul>
    </section>
  );
};

export default SolarPlanets;
