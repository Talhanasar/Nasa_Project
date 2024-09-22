import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './component/Header'
import ScrollToTop from './component/ScrollToTop';

const AppLayout = () => {
    const location = useLocation();

    return (
        <>
            <ScrollToTop/>
            {location.pathname === "/"  ?
                <Header isLandingPage={true} /> : <Header/>
            }
            <Outlet />
        </>
    )
}

export default AppLayout
