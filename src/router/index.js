import Layout from '../pages/Layout/index'
// import Login from "@/pages/Login";

// import Login from "../pages/Login/index";
import Login from "@/pages/Login/index";

import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
  },
  {
    path: '/login',
    element: <Login />,
  }
]);

export default router;