import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/login/loginForm";
// import RegisterForm from "./components/register/register-form.js";
import RegisterForm from "./components/register/register-form.js";
import { ThemeProvider } from "./theme-context";
import Navbar from "./components/navbar/navbar";
import Home from "./pages/home";
import Blog from './pages/blog'
import About from "./pages/about";
import BackgroundChanger from "./components/home/home";
import ForgotPassword from "./components/forget-password-link/forgot-password-link";
import ChangePassword from "./components/forgot-password/forgot-password";
const App = () => {
  return (
    <ThemeProvider>
        <Router>
        <Navbar/>
      <Routes>
                
      <Route path="/"  element = {<BackgroundChanger/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element = {<Home/>}/>
        <Route path="/blog" element = {<Blog/>} />
        <Route path="/about" element ={<About/>} />
        <Route path='/forgot-password-link'  element = {<ForgotPassword/>}/>
        <Route path ='/forgot-password' element= {<ChangePassword/>}/>
      </Routes>
    </Router>
    </ThemeProvider>
  
  );
};

export default App;
