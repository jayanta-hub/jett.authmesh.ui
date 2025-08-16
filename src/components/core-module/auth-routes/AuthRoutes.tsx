
import Cookies from 'js-cookie';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../utility/constant';

function AuthRoutes() {
  const location = useLocation();
  const isNewTemplate = (localStorage.getItem("templateValue"))
  // Get cookie value safely
  // const tokenRefreshCookie = JSON.parse(Cookies.get('jeetrt'));
  const tokenAccessString = Cookies.get('jeetat');
  const tokenAccessCookie = tokenAccessString ? JSON.parse(tokenAccessString) : null;

  let isAuth = false;
  try {
    // Only parse if tokenCookie exists and is a string
    // const tokenData = tokenCookie ? JSON.parse(tokenCookie) : null;

    // Use optional chaining for concise and readable code
    isAuth = !!tokenAccessCookie?.token;
  } catch (e) {
    console.error('Failed to parse token:', e);
    isAuth = false; // Fail securely
  }
  if (!isAuth) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }
  if (isAuth && location.pathname === "/") {
    return <Navigate to={`${ROUTES.DASHBOARD}?theme=${isNewTemplate}`} replace />;
  }

  return <Outlet />;
}

export default AuthRoutes;