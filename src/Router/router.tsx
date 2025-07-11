import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";

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
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // Public routes
      { path: "/login", element: <LogIn /> },
      { path: "/signup", element: <Signup /> },
        { path: "/", element: <PrivateRoute> <AllProducts /></PrivateRoute>  },
          { path: "/dashboard", element: <PrivateRoute> <AllProducts /></PrivateRoute> },
          { path: "/order", element: <PrivateRoute> <Order /></PrivateRoute> },
          { path: "/settings", element: <PrivateRoute> <Settings /></PrivateRoute> },
          { path: "/product/:id", element: <PrivateRoute> <UpdateProduct /></PrivateRoute> },
          { path: "/order/:id", element: <PrivateRoute> <UpdateOrder /></PrivateRoute> },
          { path: "/customers", element: <PrivateRoute> <Customers /></PrivateRoute> },
          { path: "/customers/:id", element: <PrivateRoute> <UpdateCustomer /></PrivateRoute> },
          { path: "/invoice/:id", element: <PrivateRoute> <Invoice /></PrivateRoute> },      
    ]
  }
]);

export default router;
