import {createBrowserRouter} from 'react-router-dom'
import Dashboard from '.Dashboard.tsx';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
import Login from './views/Login';
import NotFound from './views/NotFound';
import SignUp from './views/Signup';
import Users from './views/Users';
import UserForm from './views/UserForm';
const router createBrowserRouter (routes[
    path:'/',
    element:<DefaultLayout/>,
    children:[
        {
            path:'/',
            element:<Navigate to="/users"/>
        }
    ]
])