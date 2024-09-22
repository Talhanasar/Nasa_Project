import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import AppLayout from './AppLayout'
import Playground from './pages/Playground'

function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element:<AppLayout/>,
      errorElement:<ErrorPage/>,
      children:([
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/about",
          element: <AboutPage />,
        },
        {
          path: "/playground",
          element: <Playground />,
        },
      ])
    },
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
