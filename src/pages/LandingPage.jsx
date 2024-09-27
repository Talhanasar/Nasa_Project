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
    const width = window.innerWidth;
    const lenis = useLenis();
    const videoRef = useRef(null);
    const [isVideoVisible, setIsVideoVisible] = useState(false);

    const wrapTextInSpans = (text) => {
        return text.split('').map((char, index) => (
            <span key={index}>{char === ' ' ? '\u00A0' : char}</span>
        ));
    };

    useEffect(() => {
        if (location.state && location.state.scrollTo) {
            const element = document.getElementById(location.state.scrollTo);
            if (element) {
                setTimeout(() => {
                    lenis.scrollTo(element); // Adjust offset as needed
                    window.history.replaceState({}, document.title, window.location.pathname);
                }, 100); // Small delay to ensure DOM is ready
            }
        }
    }, [location, lenis]);

    const handleVideoLoaded = () => {
        setIsVideoLoading(false); // Hide the loader once the video is ready
        ScrollTrigger.refresh();
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVideoVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            const sections = document.querySelectorAll('.section');

            sections.forEach((section) => {
                const spans = section.querySelectorAll("h1 span");
                const para = section.querySelector("p");
                const btn = section.querySelector(".read-more-btn");

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        scroller: 'body',
                        start: "top 65%"
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
                }, '-=0.8')  // Adjusted overlap timing
                tl.from(btn, {
                    opacity: 0,
                    x: -100,
                    duration: 1,
                }, '-=0.8');  // Adjusted overlap timing
            });
        }, 500);
        return () => clearTimeout(timer);

    }, []);

    return (
        <>
            <section id='start' className="section1" ref={videoRef}>
                {isVideoLoading && <div className="loader"></div>}
                {isVideoVisible && (
                    <video 
                        loop 
                        autoPlay 
                        muted
                        onCanPlay={handleVideoLoaded}
                        src={`/video/${width < 450 ? "Web" : "web1"}.mp4`}
                    />
                )}
            </section>

            <section id='page2' className="section section2">
                <h1>{wrapTextInSpans('Our site')}</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, libero.</p>
                <span className="read-more-btn"><NavLink to={"/"}>Read more...</NavLink></span>
            </section>

            <section id='page3' className="section section3">
                <h1>{wrapTextInSpans('Engine')}</h1>
                <p>A detailed description goes here about the vision or theme of this section.</p>
                <span className="read-more-btn"><NavLink to={"/"}>Read more...</NavLink></span>
            </section>

            <section id='page4' className="section section4">
                <h1>{wrapTextInSpans('Design')}</h1>
                <p>A short description of what the design showcases. This should also align with the theme of the background.</p>
                <span className="read-more-btn"><NavLink to={"/"}>Read more...</NavLink></span>
            </section>
        </>
    );
};

export default LandingPage;
