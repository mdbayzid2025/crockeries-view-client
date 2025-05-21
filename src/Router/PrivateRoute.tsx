import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';


const PrivateRoute = ({ children }: { children: JSX.Element }) => {
 
  const selector = useSelector(state=>state?.auth?.isAuthenticated);
  const location = useLocation();

  if (!selector) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
