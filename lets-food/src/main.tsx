import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ErrorPage from './components/ErrorPage'
import SignIn from  './components/SignIn'
import SignUp from './components/SignUp'
import SignOut from './components/SignOut'
import './index.css'
import Favorites from './components/Favorites'
import UpdateProfile from './components/UpdateProfile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage/>
  },
  {
    path: '/signup',
    element: <SignUp />,
    errorElement: <ErrorPage/>
  },
  {
    path: '/signin',
    element: <SignIn />,
    errorElement: <ErrorPage />
  },
  {
    path: '/update-profile',
    element: <UpdateProfile />,
    errorElement: <ErrorPage />
  },
  {
    path: '/signout',
    element: <SignOut />,
    errorElement: <ErrorPage />
  },
  {
    path: '/dashboard',
    element: <Dashboard/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: 'favorites',
        element: <Favorites uid={''} key={''} id={''} title={''} spoonacularSourceUrl={''} />
      },
    ],
  },
  
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={ router }/>
  </React.StrictMode>,
)
