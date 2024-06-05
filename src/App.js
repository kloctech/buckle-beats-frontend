import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/login/login-form";
import RegisterForm from "./components/register/register-form";
import { ThemeProvider } from "./theme-context";
import Navbar from "./components/navbar/navbar";
import Home from "./pages/home";
import Blog from "./pages/blog";
import About from "./pages/about";
import BackgroundChanger from "./components/home/home";
import Preloader from "./components/preloader/preloader";
import NotFound from "./components/not-found/not-found";
import VerifyEmail from "./components/verify-email/verify-email";
import routes from "./routes/main-route";

import ForgotPassword from "./components/forget-password-link/forgot-password-link";
import ChangePassword from "./components/forgot-password/forgot-password";
import { Toaster } from "react-hot-toast";
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
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<BackgroundChanger />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/account" element={<VerifyEmail />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/forgot-password-link" element={<ForgotPassword />} />
        <Route path="/forgot-password" element={<ChangePassword />} />
        {routes}
      </Routes>
    </Router>
  );
};

export default App;
