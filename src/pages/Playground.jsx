import React, { Suspense, useState, useEffect, useCallback, useMemo } from 'react';
import { celestialObjects } from '../component/CelestialData';
import SolarSystem from '../component/SolarSystem';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import '../css/playground.css';

const Playground = () => {
    const [currentPlanetIndex, setCurrentPlanetIndex] = useState(0);
    const [initialTranslate, setInitialTranslate] = useState(45.5);
    const [showModel, setShowModel] = useState(false);

    const handleArrowClick = useCallback((direction) => {
        if (direction === 'left') {
            setCurrentPlanetIndex(prevIndex =>
                prevIndex === 0 ? celestialObjects.length - 1 : prevIndex - 1
            );
        } else {
            setCurrentPlanetIndex(prevIndex =>
                (prevIndex + 1) % celestialObjects.length
            );
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 450) {
                setInitialTranslate(-0.5);
            } else {
                setInitialTranslate(45.5);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const celestialObjectInfoItems = useMemo(() => (
        celestialObjects.map((planet, index) => (
            <li key={index} className='info-item'>
                <h2>{planet.name}</h2>
                <p>{planet.description}</p>
            </li>
        ))
    ), []);

    return (
        <>
            <div className='solar-system-container'>
                <Suspense fallback={<div>Loading Solar System...</div>}>
                    <SolarSystem />
                </Suspense>
                <h1 className='title'>Solar System</h1>
                <div className="info">
                    <h1>Solar System</h1>
                    <p>The Solar System is the gravitationally bound system of the Sun and the objects that orbit it, either directly or indirectly.</p>
                </div>
            </div>
            <div className="model-3d">
                {!showModel ? (
                    <div onClick={() => setShowModel(true)} className="load-model-btn">
                        Click Me to Load 3D Model
                    </div>
                ) : (
                    <Suspense fallback={<div>Loading Planet...</div>}>
                        {celestialObjects[currentPlanetIndex].component()}
                    </Suspense>
                )}
                <h1 className='title'>{celestialObjects[currentPlanetIndex].title}</h1>
                <div className="arrow-buttons">
                    <IoIosArrowBack
                        className="arrow-icon"
                        aria-label="Previous planet"
                        onClick={() => handleArrowClick('left')}
                    />
                    <IoIosArrowForward
                        className="arrow-icon"
                        aria-label="Next planet"
                        onClick={() => handleArrowClick('right')}
                    />
                </div>
                <div className="info">
                    <ul style={{ transform: `translateX(${initialTranslate - (currentPlanetIndex * 10 + (0.1 * currentPlanetIndex))}%)` }}>
                        {celestialObjectInfoItems}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Playground;
