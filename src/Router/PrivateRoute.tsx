import { Navigate, Outlet, useLocation } from 'react-router-dom';


const PrivateRoute = ({ children }: { children: JSX.Element }) => {
 const isAuthenticated = !!localStorage.getItem('accessToken');
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
