import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoginPage from "./components/login/login-form";
import DesktopPage from "./components/desktop-page/desktop-page";
import RegisterForm from "./components/register/register-form";
import Preloader from "./components/preloader/preloader";
import NotFound from "./components/not-found/not-found";
import VerifyEmail from "./components/verify-email/verify-email";
import MainRoutes from "./routes/main-route";

import ForgotPasswordLink from "./components/forget-password-link/forgot-password-link";
import ForgotPassword from "./components/forgot-password/forgot-password";
import { Toaster } from "react-hot-toast";
import LostQRCode from "./components/lost-qrcode/lost-qrcode";
import SetPassword from "./components/set-password/set-password";
import LinkingCoowner from "./components/linking-co-owner/linking-co-owner";
import { useMediaQuery } from 'react-responsive';
import DesktopRoutes from "./routes/desktop-route";

const App = () => {
  const [loading, setLoading] = useState(true);
  const isDesktop = useMediaQuery({ minWidth: 767 })
  
  // Listener component to handle global unauthorized events emitted by api middleware
  const AuthRedirectListener = () => {
    const navigate = useNavigate();
    useEffect(() => {
      const handler = () => {
        // perform client-side navigation (no full page reload)
        navigate('/signin');
      };
      window.addEventListener('api:unauthorized', handler);
      return () => window.removeEventListener('api:unauthorized', handler);
    }, [navigate]);
    return null;
  };
  useEffect(() => {
    if(isDesktop){
      document.body.classList.add('desktop-wrapper');
     }else {
      document.body.classList.add('mobile-wrapper');
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isDesktop]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <Router>
      <AuthRedirectListener />
      <Toaster />
      <Routes>
      {isDesktop ? (
        <>
            <Route path="/signin" element={<DesktopPage />} />
            <Route path="/signup" element={<DesktopPage />} />
            <Route path="/account" element={<DesktopPage />} />
            <Route path="/additional-user" element={<DesktopPage />} />
            <Route path="*" element={<DesktopPage />} />
            <Route path="/forgot-password-link" element={<DesktopPage />} />
            <Route path="/forgot-password" element={<DesktopPage />} />
            <Route path="/qr-code/:id" element={<DesktopPage />} />
            <Route path="/set-password" element={<DesktopPage />} />
            {DesktopRoutes}
            </>
        ) : (
          <>
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterForm />} />
            <Route path="/account" element={<VerifyEmail />} />
            <Route path="/additional-user" element={<LinkingCoowner />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/forgot-password-link" element={<ForgotPasswordLink />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/qr-code/:id" element={<LostQRCode />} />
            <Route path="/set-password" element={<SetPassword />} />
            {MainRoutes}
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
