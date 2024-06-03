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

import ForgotPassword from "./components/forget-password-link/forgot-password-link";
import ChangePassword from "./components/forgot-password/forgot-password";
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
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<BackgroundChanger />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
          <Route path='/forgot-password-link'  element = {<ForgotPassword/>}/>
        <Route path ='/forgot-password' element= {<ChangePassword/>}/>
      </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
