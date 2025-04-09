import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import AllProducts from "../pages/AllProducts/AllProducts";
import Order from "../pages/Order/Order";



const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Dashboard />
            },          
            {
                path: "/dashboard",
                element: <AllProducts />
            },          
            {
                path: "/order",
                element: <Order />
            },          
            {
                path: "/login",
                element: <Login />
            },          
            {
                path: "/signup",
                element: <Signup />
            },          
        ]
    }]
)

export default router;