import React, { useEffect, useState } from 'react'
import "../css/landing.css"
import Header from './component/header'
import { useLocation } from 'react-router-dom';

const LandingPage = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.scrollTo) {
            const element = document.getElementById(location.state.scrollTo);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 50) {
                setIsScrolled(true); // Add scrolled style when scrolled down 50px
            } else {
                setIsScrolled(false); // Remove scrolled style when back to the top
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className="page1">
                <Header isScrolled={isScrolled} isLandingPage={true} />
                <div className="text">
                    <h1> May 2024 Earth's Magnetic storm </h1>
                </div>
                <video loop autoPlay muted src="/assets/bg_video.mp4"></video>
            </div>
            <div id='page2' className="page2"></div>
            <div id='page3' className="page3"></div>
        </>
    )
}

export default LandingPage
