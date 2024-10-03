import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useLenis } from 'lenis/react';
import stormData from '../component/stormData';
import "../css/landing.css";

const LandingPage = () => {
    gsap.registerPlugin(ScrollTrigger);
    const location = useLocation();
    const [isVideoLoading, setIsVideoLoading] = useState(true);
    const lenis = useLenis();
    const videoRef = useRef(null);

    const wrapTextInSpans = (text) => {
        const chars = text.split('');
        const middleIndex = Math.floor(chars.length / 2);
        return chars.map((char, index) => (
            <span 
                key={index} 
                className={index < middleIndex ? 'left' : 'right'}
            >
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    useEffect(() => {
        if (lenis && typeof lenis.resize === 'function') {
            lenis.resize();
        }

        if (location.state && location.state.scrollTo) {
            const element = document.getElementById(location.state.scrollTo);
            if (element) {
                setTimeout(() => {
                    if (lenis && typeof lenis.scrollTo === 'function') {
                        lenis.scrollTo(element);
                    } else {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                    window.history.replaceState({}, document.title, window.location.pathname);
                }, 100);
            }
        }

        return () => {
            // Clean up ScrollTrigger instances when component unmounts
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [location, lenis]);

    const handleVideoLoaded = () => {
        setIsVideoLoading(false);
        ScrollTrigger.refresh();
        if (lenis && typeof lenis.resize === 'function') {
            lenis.resize();
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            const contents = document.querySelectorAll('.content');

            contents.forEach((content) => {
                const spansLeft = content.querySelectorAll("h1 .left");
                const spansRight = content.querySelectorAll("h1 .right");
                const para = content.querySelector("p");
                const btn = content.querySelector(".read-more-btn");

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: content,
                        start: "top 75%"
                    }
                });


                tl.from(spansLeft, {
                    opacity: 0,
                    y: 60,
                    duration: 0.8,
                    stagger: 0.07
                },"headings");
                tl.from(spansRight, {
                    opacity: 0,
                    y: 60,
                    duration: 0.8,
                    stagger: {
                        each: 0.07,
                        from: "end"
                    }
                },"headings");
                tl.from(para, {
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                }, '-=0.8')
                tl.from(btn, {
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                }, '-=0.8');
            });
            const h1_spans = document.querySelectorAll('.section2 h1 span');
            gsap.from(h1_spans, {
                opacity: 0,
                y: 60,
                duration: 0.8,
                scrollTrigger: {
                    trigger: '.section2',
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                },
                stagger: 0.05
            });
        }, 500);
        return () => clearTimeout(timer);

    }, []);

    return (
        <>
            <section id='start' className="section1" ref={videoRef}>
                {isVideoLoading && <div className="loader"></div>}
                <video
                    loop
                    autoPlay
                    muted
                    onCanPlay={handleVideoLoaded}
                    src={`/video/final.mp4`}
                />
            </section>

            <section id='page2' className="sections section2">
                <video autoPlay muted loop src={`/video/geomagnetic.mp4`} />
                <div className="headings">
                    <h1>{wrapTextInSpans('Geomagnetic')}</h1>
                    <h1>{wrapTextInSpans('Storms')}</h1>
                </div>
            </section>
            <section id='page3' className="sections section3">
                <video autoPlay muted loop src={`/video/earth.mp4`} />
                <div className="content">
                    <h1>{wrapTextInSpans('Geomagnetic Storm on Earth')}</h1>
                    <p>{stormData.earth.description}</p>
                    <NavLink to={"/geomagnetic-storms/earth"}>
                        <button className="read-more-btn">Read more</button>
                    </NavLink>
                </div>
            </section>

            <section id='page4' className="sections section4">
                <video autoPlay muted loop src={`/video/moon.mp4`} />
                <div className="content">
                    <h1>{wrapTextInSpans('Geomagnetic Storm on Moon ')}</h1>
                    <p>{stormData.moon.description}</p>
                    <NavLink to={"/geomagnetic-storms/moon"}>
                        <button className="read-more-btn">Read more</button>
                    </NavLink>
                </div>
            </section>

            <section id='page5' className="sections section5">
                <video autoPlay muted loop src={`/video/mars.mp4`} />
                <div className="content">
                    <h1>{wrapTextInSpans('Geomagnetic Storm on Mars ')}</h1>
                    <p>{stormData.mars.description}</p>
                    <NavLink to={"/geomagnetic-storms/mars"}>
                        <button className="read-more-btn">Read more</button>
                    </NavLink>
                </div>
            </section>
        </>
    );
};

export default LandingPage;
