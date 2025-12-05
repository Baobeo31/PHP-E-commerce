import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ResendVerification from "../pages/Auth/ResendVerification";
import VerifyEmail from "../pages/Auth/VerifyEmail";
import Home from "../pages/Home";
import Product from "../pages/Product/Product";

export const routes = [

    {
      path:'/home',
      element: <Home />  
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/verify-email',
        element: <VerifyEmail />
    },
    {
        path: 'resend-verification',
        element: <ResendVerification />
    },
    {
        path:'/verify-email/:id/:token',
        element: <VerifyEmail />
    }
    ,
    {
        path:'/products',
        element: <Product />
    }

]