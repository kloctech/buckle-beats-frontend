import React, { useState } from "react";
import "../../styles/hamburger-and-searchbar/hamburger-and-searchbar.scss";
import { IoSearch } from "react-icons/io5";
import BuckleBeatsIcon from "../../assets/Bucklebeats Icon.svg";
import Logout from "../logout/logout";

const Hamburger = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="main-qrcode-container">
      <header className="mobile-header">
        <div className="hamburger" onClick={toggleMenu}>
          <div className="burger"></div>
          <div className="burger"></div>
          <div className="burger"></div>
        </div>
        <div className="search-container">
          <div className="search-input-wrapper">
            <input type="text" />
            <img src={BuckleBeatsIcon} alt="heart" className="search-bg-icon" />
            <IoSearch className="search-icon" />
          </div>
        </div>
      </header>
      {menuOpen && (
        <div className="menu">
          {/* Add your menu items here */}
          <p className="menu-item">Menu Item 1</p>
          <p className="menu-item"> Menu Item 2</p>
          <p className="menu-item">Menu Item 3</p>
        </div>
      )}
      <div className="qrcodes-containers">
        <Logout />
      </div>
    </div>
  );
};

export default Hamburger;
