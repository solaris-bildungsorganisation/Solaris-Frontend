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
import Login from '../pages/Authentication/Login';
import CreateAccount from '../pages/Authentication/CreateAccount';
import VerifyEmail, {
  AuthFlowContext,
} from '../pages/Authentication/VerifyEmail';
import ChangePassword from '../pages/Authentication/ChangePassword';
import PasswordChanged from '../pages/Authentication/PasswordChanged';
import ForgotPassword from '../pages/Authentication/ForgotPassword';
import Page1 from '../pages/page1/Page1';
import Page2 from '../pages/page2/Page2';
import Page3 from '../pages/page3/Page3';
import Page4 from '../pages/page4/Page4';
import '../App.css';

const SOLARIS_FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <polygon points="34,26 56,8 38,30 8,58" fill="#183148" />
  <polygon points="34,6 38,24 56,28 38,32 34,50 30,32 12,28 30,24" fill="#183148" />
  <polygon points="19,13 32,23 49,13 39,26 49,43 32,33 19,43 29,26" fill="#183148" />
  <circle cx="34" cy="28" r="7.5" fill="#f7f7f5" stroke="#183148" stroke-width="2" />
  <circle cx="34" cy="28" r="4.5" fill="none" stroke="#739cb9" stroke-width="1.8" />
  <circle cx="34" cy="28" r="2" fill="#183148" />
</svg>`;

export function NotFoundShowcase({ initialPage = 1 }) {
  const [activePage, setActivePage] = useState(initialPage);
  const [lang, setLang] = useState('en');

  useEffect(() => {
    setActivePage(initialPage);
  }, [initialPage]);

  useEffect(() => {
    document.title =
      lang === 'ar'
        ? 'Solaris Education | 404 الصفحة غير موجودة'
        : 'Solaris Education | 404 Page Not Found';

    const faviconUrl = `data:image/svg+xml;utf8,${encodeURIComponent(SOLARIS_FAVICON_SVG)}`;
    let iconLink = document.querySelector("link[rel~='icon']");
    if (!iconLink) {
      iconLink = document.createElement('link');
      iconLink.rel = 'icon';
      document.head.appendChild(iconLink);
    }
    iconLink.type = 'image/svg+xml';
    iconLink.href = faviconUrl;
  }, [lang]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '1') setActivePage(1);
      if (e.key === '2') setActivePage(2);
      if (e.key === '3') setActivePage(3);
      if (e.key === '4') setActivePage(4);
      if (e.key === 'ArrowRight') {
        setActivePage((prev) => (prev === 4 ? 1 : prev + 1));
      }
      if (e.key === 'ArrowLeft') {
        setActivePage((prev) => (prev === 1 ? 4 : prev - 1));
      }
      const k = e.key.toLowerCase();
      if (k === 'a' || k === 'l' || k === '0' || k === 'ش' || k === 'م' || k === 'ع') {
        setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`solaris-app ${lang === 'ar' ? 'lang-ar' : 'lang-en'}`}>
      {activePage === 1 && <Page1 lang={lang} />}
      {activePage === 2 && <Page2 lang={lang} />}
      {activePage === 3 && <Page3 lang={lang} />}
      {activePage === 4 && <Page4 lang={lang} />}
    </div>
  );
}

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
 * 7. 404 Not Found    -> /404, /page1..4, and *
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
        <Route path={PATHS.NOT_FOUND} element={<NotFoundShowcase initialPage={1} />} />
        <Route path={PATHS.PAGE_1} element={<NotFoundShowcase initialPage={1} />} />
        <Route path={PATHS.PAGE_2} element={<NotFoundShowcase initialPage={2} />} />
        <Route path={PATHS.PAGE_3} element={<NotFoundShowcase initialPage={3} />} />
        <Route path={PATHS.PAGE_4} element={<NotFoundShowcase initialPage={4} />} />
        <Route path="*" element={<NotFoundShowcase initialPage={1} />} />
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
