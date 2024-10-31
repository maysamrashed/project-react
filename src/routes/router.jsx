import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Home from "../components/user/Home/Home.jsx";
import Login from "../pages/user/Login/Login.jsx";
import Register from "../pages/user/Register/Register.jsx";
import Code from "../pages/user/Code/Code.jsx";
import Forget from "../pages/user/forget-password/Forget.jsx";
import CategoryDetails from "../pages/user/categoryDetails/CategoryDetails.jsx";
import Product from "../pages/user/product/Product.jsx";
import Cart from '../pages/user/cart/Cart.jsx';
import Checkorder from '../pages/user/check/Checkorder.jsx';
import Allorders from "../pages/user/allOrders/Allorders.jsx";
import UserProfile from "../pages/user/userProfile/UserProfile.jsx";

const router = createBrowserRouter([
    {
                path: '/',
                element: <Root />,
            children: [
            {
                path: '/home',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
             },
            {
                path : '/code',
                element:<Code />
             },
             {
                path: '/forget-password',
                element : <Forget/>
             },
             {
                path:'/categoryDetails/:categoryId',
                element : <CategoryDetails />
             },
             {
                path :'/product/:productId',
                element :<Product/>
             },
             {
                path :'/cart',
                element :<Cart/>
             },{
                path:'/check',
                element:<Checkorder/>
             },{
               path:'/all-orders',
               element :<Allorders/>
             },{
              path :'/userProfile',
              element : <UserProfile/>
             }
        ]
    }
]);
export default router;