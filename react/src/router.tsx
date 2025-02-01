import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import Dashboard from './Dashboard';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
import Login from './views/Login';
import NotFound from './views/NotFound';
import SignUp from './views/SignUp';
import Users from './views/Users';
import UserForm from './views/UserFrom';

const router: RouteObject[] = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/users" />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/users',
        element: <Users />
      },
      {
        path: '/users/:id',
        element: <UserForm key="userUpdate" />
      }
    ] as RouteObject[] // Ensure children is typed correctly
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      }
    ] as RouteObject[] // Ensure children is typed correctly
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default createBrowserRouter(router);
