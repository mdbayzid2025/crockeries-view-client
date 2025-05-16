import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import LogIn from "../pages/Auth/LogIn";
import Signup from "../pages/Auth/Signup";
import AllProducts from "../pages/AllProducts/AllProducts";
import Order from "../pages/Order/Order";

import Customers from "../pages/Customer/Customers";
import Invoice from "../components/Invocie/Invoice";
import UpdateProduct from "../pages/AllProducts/UpdateProduct";
import UpdateOrder from "../pages/Order/UpdateOrder/UpdateOrder";
import UpdateCustomer from "../pages/Customer/UpdateCustomer";
import Settings from "../pages/Setting/Settings";



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
                path: "/settings",
                element: <Settings />
            },    
            {
                path: "/product/:id",
                element: <UpdateProduct />
            },          
            {
                path: "/order/:id",
                element: <UpdateOrder />
            },          
            {
                path: "/customers",
                element: <Customers />
            },          
            {
                path: "/customers/:id",
                element: <UpdateCustomer />
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