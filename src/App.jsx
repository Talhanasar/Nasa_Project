import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import AppLayout from './AppLayout'

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
      ])
    },
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
