import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/login/login-form";
import RegisterForm from "./components/register/register-form";
import { ThemeProvider } from "./theme-context";
import Preloader from "./components/preloader/preloader";
import NotFound from "./components/not-found/not-found";

import ForgotPassword from "./components/forget-password-link/forgot-password-link";
import ChangePassword from "./components/forgot-password/forgot-password";
import { Toaster } from "react-hot-toast";
import QrCode from "./components/qr-code/qr-code";
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <ThemeProvider>
      <Toaster/>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="*" element={<NotFound />} />
          <Route path='/forgot-password-link'  element = {<ForgotPassword/>}/>
        <Route path ='/forgot-password' element= {<ChangePassword/>}/>
        <Route path  = '/qr-code' element = {<QrCode/>}/>
      </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
