import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";



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