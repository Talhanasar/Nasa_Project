import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/about",
      element: <AboutPage />,
    },
    {
      path: "*", 
      element: <ErrorPage />, 
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
