import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useInRouterContext,
  useLocation,
} from 'react-router-dom';
import PATHS from './paths';
import Login from '../pages/Login';
import CreateAccount from '../pages/CreateAccount';
import VerifyEmail, { AuthFlowContext } from '../pages/VerifyEmail';
import ChangePassword from '../pages/ChangePassword';
import ForgotPassword from '../pages/ForgotPassword';

/**
 * Scrolls the window to the top whenever the active route pathname changes.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

/**
 * Core route tree in the exact flow order:
 * 1. Login           -> /login (default: / redirects to /login)
 * 2. Sign up         -> /signup
 * 3. Verify Email    -> /verify-email
 * 4. Change Password -> /change-password
 * Extra: Forgot Password -> /forgot-password
 */
export function RouteTree() {
  const [registeredEmail, setRegisteredEmail] = useState('');

  return (
    <AuthFlowContext.Provider
      value={{ email: registeredEmail, setEmail: setRegisteredEmail }}
    >
      <ScrollToTop />
      <Routes>
        <Route
          path={PATHS.ROOT}
          element={<Navigate to={PATHS.LOGIN} replace />}
        />
        <Route path={PATHS.LOGIN} element={<Login />} />
        <Route path={PATHS.SIGNUP} element={<CreateAccount />} />
        <Route path={PATHS.VERIFY_EMAIL} element={<VerifyEmail />} />
        <Route path={PATHS.CHANGE_PASSWORD} element={<ChangePassword />} />
        <Route path={PATHS.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to={PATHS.LOGIN} replace />} />
      </Routes>
    </AuthFlowContext.Provider>
  );
}

/**
 * Application router wrapper using BrowserRouter (unless already inside a Router).
 */
function AppRoutes() {
  const inRouter = useInRouterContext();

  if (inRouter) {
    return <RouteTree />;
  }

  return (
    <BrowserRouter>
      <RouteTree />
    </BrowserRouter>
  );
}

export default AppRoutes;
