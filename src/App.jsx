import React, { lazy, Suspense} from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import AppLayout from './AppLayout';
import GeomagneticStorms from './pages/GeomagneticStorms';
import StormForcast from './pages/StormForcast';

const Geomagnetic = lazy(() => import('./pages/Geomagnetic'));
const SolarPlanets = lazy(() => import('./pages/SolarPlanets'));
const Planets = lazy(() => import('./pages/Planets'));

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/about",
          element: <AboutPage />,
        },
        {
          path: "/playground/solarsystem",
          element: (
            <Suspense fallback={<div className='suspense-fallback'>Loading...</div>}>
              <SolarPlanets/>
            </Suspense>
          ),
        },
        {
          path: "/playground/planets",
          element: (
            <Suspense fallback={<div className='suspense-fallback'>Loading...</div>}>
              <Planets/>
            </Suspense>
          ),
        },
        {
          path: "/geomagnetic-storms/:planet",
          element: <GeomagneticStorms/>
        },
        {
          path:"/playground/geomagneticstorm/video",
          element:(
            <Suspense fallback={<div className='suspense-fallback'>Loading...</div>}>
              <Geomagnetic/>
            </Suspense>
          ),
        },
        {
          path:"/stormforcast",
          element:<StormForcast/>
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
