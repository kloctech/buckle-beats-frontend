import React from "react";
import {Link} from "react-router-dom";
import { useTheme } from "../../theme-context";
import { MdLightMode } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import '../../styles/navbar/navbar.scss'
const Navbar = () => {
  const {theme, toggleTheme} = useTheme();

  const toggleMode = () => {
    toggleTheme();
  };

  return (
    <nav className={`navbar ${theme}`}>
      <div>
      <Link to="/register">Register</Link>
        <Link to="/login">Login</Link> 
        <Link to="/home">Home</Link>
        
      </div>
      <div className="mode-switch">
      <i onClick={toggleMode} className="theme-toggle-buttonS" >
        {theme === "dark" ? <MdLightMode /> : <FaMoon/>}
      </i>
    </div>
    </nav>
  );
};

export default Navbar;
