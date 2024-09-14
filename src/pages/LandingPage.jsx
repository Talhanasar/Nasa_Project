import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import { useLocation } from 'react-router-dom';
import "../css/landing.css"

const LandingPage = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.scrollTo) {
            const element = document.getElementById(location.state.scrollTo);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <>
            <div id='start' className="page1">
                <video loop autoPlay muted src="/video/bg_video.mp4"></video>
            </div>
            <div id='page2' className="page2"></div>
            <div id='page3' className="page3"></div>
            <div id='page4' className="page4"></div>
        </>
    )
}

export default LandingPage
