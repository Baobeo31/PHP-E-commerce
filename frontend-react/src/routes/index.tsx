import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ResendVerification from "../pages/Auth/ResendVerification";
import VerifyEmail from "../pages/Auth/VerifyEmail";
import Home from "../pages/Home";
import Product from "../pages/Product/Product";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute"; // Sẽ tạo component này

export const routes = [
    {
        path: '/',
        element:<Home />// Trang chủ là trang mặc định và được bảo vệ
    },
    {
      path:'/home',
      element: <Home />
    },
    {
        path: '/login',
        element: <PublicRoute><Login/></PublicRoute> // Sử dụng PublicRoute cho trang đăng nhập
    },
    {
        path: '/register',
        element: <PublicRoute><Register /></PublicRoute> // Sử dụng PublicRoute cho trang đăng ký
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
    },
    {
        path:'/products',
        element: <ProtectedRoute><Product /></ProtectedRoute>
    }
]