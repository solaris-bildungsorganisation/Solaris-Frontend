import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useInRouterContext,
  useLocation,
} from 'react-router-dom';
import PATHS from './paths';
import Login from '../pages/Authentication/Login';
import CreateAccount from '../pages/Authentication/CreateAccount';
import VerifyEmail, {
  AuthFlowContext,
} from '../pages/Authentication/VerifyEmail';
import ChangePassword from '../pages/Authentication/ChangePassword';
import PasswordChanged from '../pages/Authentication/PasswordChanged';
import ForgotPassword from '../pages/Authentication/ForgotPassword';
import NotFound from '../pages/NotFound';

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
 * Core route tree:
 * 1. Login            -> /login (default: / redirects to /login)
 * 2. Sign up          -> /signup
 * 3. Verify Email     -> /verify-email
 * 4. Change Password  -> /change-password
 * 5. Password Changed -> /password-changed
 * 6. Forgot Password  -> /forgot-password
 * 7. 404 Not Found    -> /404 and * (renders NotFound page)
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
        <Route path={PATHS.PASSWORD_CHANGED} element={<PasswordChanged />} />
        <Route path={PATHS.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={PATHS.NOT_FOUND} element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
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
