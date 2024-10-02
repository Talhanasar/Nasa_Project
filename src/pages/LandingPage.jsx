import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useLocation, useOutletContext } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useLenis } from 'lenis/react';
import "../css/landing.css";

const LandingPage = () => {
    gsap.registerPlugin(ScrollTrigger);
    const location = useLocation();
    const [isVideoLoading, setIsVideoLoading] = useState(true);
    const lenis = useLenis();
    const videoRef = useRef(null);

    const wrapTextInSpans = (text) => {
        return text.split('').map((char, index) => (
            <span key={index}>{char === ' ' ? '\u00A0' : char}</span>
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
                const spans = content.querySelectorAll("h1 span");
                const para = content.querySelector("p");
                const btn = content.querySelector(".read-more-btn");

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: content,
                        start: "top 75%"
                    }
                });

                tl.from(spans, {
                    opacity: 0,
                    y: 60,
                    duration: 1.2,
                    stagger: 0.07
                });
                tl.from(para, {
                    opacity: 0,
                    y: 50,
                    duration: 1,
                }, '-=0.8')
                tl.from(btn, {
                    opacity: 0,
                    x: -100,
                    duration: 1,
                }, '-=0.8');
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
            </section>
            <section id='page3' className="sections section3">
                <video autoPlay muted loop src={`/video/earth.mp4`} />
                <div className="content">
                    <h1>{wrapTextInSpans('Effects on Earth')}</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, libero.</p>
                    <span className="read-more-btn"><NavLink to={"/"}>Read more...</NavLink></span>
                </div>
            </section>

            <section id='page4' className="sections section4">
                <video autoPlay muted loop src={`/video/mars.mp4`} />
                <div className="content">
                    <h1>{wrapTextInSpans('Effects on Mars')}</h1>
                    <p>A detailed description goes here about the vision or theme of this section.</p>
                    <span className="read-more-btn"><NavLink to={"/"}>Read more...</NavLink></span>
                </div>
            </section>

            <section id='page5' className="sections section5">
                <video autoPlay muted loop src={`/video/moon.mp4`} />
                <div className="content">
                    <h1>{wrapTextInSpans('Effects on Moon')}</h1>
                    <p>A short description of what the design showcases. This should also align with the theme of the background.</p>
                    <span className="read-more-btn"><NavLink to={"/"}>Read more...</NavLink></span>
                </div>
            </section>
        </>
    );
};

export default LandingPage;
