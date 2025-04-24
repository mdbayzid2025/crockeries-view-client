import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import LogIn from "../pages/Auth/LogIn";
import Signup from "../pages/Auth/Signup";
import AllProducts from "../pages/AllProducts/AllProducts";
import Order from "../pages/Order/Order";

import Customers from "../pages/Customer/Customers";
import Invoice from "../components/Invocie/Invoice";



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
                path: "/customers",
                element: <Customers />
            },          
            {
                path: "/login",
                element: <LogIn />
            },          
            {
                path: "/invoice/:id",
                element: <Invoice />
            },          
            {
                path: "/signup",
                element: <Signup />
            },          
        ]
    }]
)

export default router;