import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import "../css/landing.css";
import { useGSAP } from '@gsap/react';

const LandingPage = () => {
    gsap.registerPlugin(ScrollTrigger);

    const location = useLocation();
    const [isVideoLoading, setIsVideoLoading] = useState(true);

    const wrapTextInSpans = (text) => {
        return text.split('').map((char, index) => (
            <span key={index}>{char === ' '? '\u00A0':char}</span>
        ));
    };    

    useEffect(() => {
        if (location.state && location.state.scrollTo) {
            const element = document.getElementById(location.state.scrollTo);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    const handleVideoLoaded = () => {
        setIsVideoLoading(false); // Hide the loader once the video is ready
    };

    
    useGSAP(() => {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach((section) => {
            let timeout;
            const spans = section.querySelectorAll("h1 span");
            const para = section.querySelector("p");
            const btn = section.querySelector(".read-more-btn");
    
            timeout = setTimeout(() => {
                const tl = gsap.timeline({
                    scrollTrigger:{
                        trigger:section,
                        scroller: 'body',
                        start: "top 65%"
                    }
                });
                
                tl.to(spans, {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    stagger: 0.07
                });
                tl.to(para, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                },'-=0.8')  // Adjusted overlap timing
                tl.to(btn, {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                },'-=0.8');  // Adjusted overlap timing
            }, 400);

            return ()=>{
                clearTimeout(timeout);
            }
        });

        ScrollTrigger.refresh();
    }, []);
    

    return (
        <>
            <section id='start' className="section1">
                {isVideoLoading && <div className="loader"></div>}
                <video loop autoPlay muted
                    onCanPlay={handleVideoLoaded}
                    src="/video/bg_video.mp4"></video>
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
