import Layout from '../pages/Layout/index'
// import Login from "@/pages/Login";

// import Login from "../pages/Login/index";
import Login from "@/pages/Login/index";
import Home from '@/pages/Home';
import Article from '@/pages/Article';
import Publish from '@/pages/Publish';

import { createBrowserRouter } from 'react-router-dom';
import {AuthRoute} from "@/components/AuthRoute";

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute><Layout/></AuthRoute>,
    children:[
      {
        path:'home',
        element:<Home/>
      },
      {
        path:'article',
        element:<Article/>
      },
      {
        path:'publish',
        element:<Publish/>
      }
    ]
  },
  {
    path: '/login',
    element: <Login />,
  }
]);

export default router;