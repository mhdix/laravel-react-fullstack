import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import User from "./views/User";
import NotFound from "./views/NotFound";
import DefaultLayout from "./component/DefaultLayout";
import GuestLayout from "./component/GuestLayout";
import Dashboard from "./views/Dashboard.jsx";
import UserForm from "./views/UserForm";

const router = createBrowserRouter([
   {
      path: '/',
      element: <DefaultLayout/>,
      children: [
         {
            path: '/',
            element: <Navigate to='/user'/>
         },
          {
              path: '/user',
              element: <User/>
          },
          {
              path: '/user/new',
              element: <UserForm key='userCreate'/>
          },
          {
              path: '/user/:id',
              element: <UserForm key='userUpdate'/>
          },
          {
            path: '/dashboard',
            element: <Dashboard/>
         },
      ]
   },
   {
      path: '/',
      element: <GuestLayout/>,
      children: [
         {
            path: '/login',
            element: <Login/>
         },
         {
            path: '/Signup',
            element: <Signup/>
         },
      ]
   },
   {
      path: '*',
      element: <NotFound/>
   },
])

export default router
