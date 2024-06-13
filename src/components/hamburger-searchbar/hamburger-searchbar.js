import React, { useState, useEffect } from "react";
import "../../styles/hamburger-and-searchbar/hamburger-and-searchbar.scss";
import { IoSearch } from "react-icons/io5";
import BuckleBeatsIcon from "../../assets/Bucklebeats Icon.svg";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import QrCodes from "../qr-codes/qr-codes";

const Hamburger = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("qr-codes-screen");
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const MenuItem2 = () => <div>Component for Menu Item 2</div>;
  const MenuItem3 = () => <div>Component for Menu Item 3</div>;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setSubmenuOpen(false);
  };
  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };
  const handleClosemenu = () => {
    setMenuOpen(false);
  };

  const handleBackClick = () => {
    setSubmenuOpen(false);
  };
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [menuOpen]);
  const onClickLogout = async () => {
    const accessToken = Cookies.get("accessToken");
    try {
      const response = await fetch(`${process.env.REACT_APP_PRODUCTION_URL}/api/user/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        toast.success("Successfully logout");
        window.location.href = "/login";
      } else {
        toast.error("Failed to logout");
      }
    } catch (error) {}
  };
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setMenuOpen(false);
  };


  const renderSelectedComponent = () => {
    switch (selectedMenuItem) {
      case "qr-codes-screen":
        return <QrCodes searchInput={searchInput.length >= 3 ? searchInput : ""} />;
      case "item2":
        return <MenuItem2 />;
      case "item3":
        return <MenuItem3 />;
      default:
        return null;
    }
  };
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  return (
    <div className="header-flex-container">
      <div className="main-qrcode-container">
        <div className="header-container">
          <header className="mobile-header">
            <div className="hamburger" onClick={toggleMenu}>
              <div className="burger"></div>
              <div className="burger"></div>
              <div className="burger"></div>
            </div>
            <div className="search-container">
              <div className="search-input-wrapper">
                <input type="text" onChange={handleInputChange} />
                <img src={BuckleBeatsIcon} alt="heart" className="search-bg-icon" />
                <IoSearch className="search-icon" />
              </div>
            </div>
          </header>
        </div>
      <div className={menuOpen ? 'active menu-wrapper' : 'inactive menu-wrapper'}>
        <div className="close-menu" onClick={handleClosemenu}>X</div>
        {menuOpen && (
          <div className="menu-list">
            {!submenuOpen ? (
            <div className="menu-list-item">
              <div className="menu-text" onClick={() => handleMenuItemClick("qr-codes-screen")}>
                QR Code
              </div>
              <div className="menu-text" onClick={toggleSubmenu}>
                Account
                {submenuOpen ? <span>&#9660;</span> : <span>&#9658;</span>}
              </div>
              <div className="menu-item" onClick={onClickLogout}>
                Logout
              </div>
            </div>
          ) : (
            <div className="menu-list-item">
              <div className="menu-back" onClick={handleBackClick}>
                Back
              </div>
              <div className="menu-text">
                Subpage 1
              </div>
            </div>
          )}
          </div>
        )}

      </div>


      <div className="qrcodes-containers">
        {renderSelectedComponent()}
      </div>
      </div>
    </div>

  );
};

export default Hamburger;


