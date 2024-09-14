import React from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import Header from './component/Header'

const AppLayout = () => {
    const location = useLocation();
    return (
        <>
            <ScrollRestoration />
            {location.pathname === "/"  ?
                <Header isLandingPage={true} /> : <Header/>
            }
            <Outlet />
        </>
    )
}

export default AppLayout
