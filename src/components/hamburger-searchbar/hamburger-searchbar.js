import React, { useState } from "react";
import "../../styles/hamburger-and-searchbar/hamburger-and-searchbar.scss";
import { IoSearch } from "react-icons/io5";
import BuckleBeatsIcon from "../../assets/Bucklebeats Icon.svg";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import QrCode from "../qr-code/qr-code";

const Hamburger = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("qr-codes-screen");
  const [searchInput, setSearchInput] = useState("");

  const MenuItem2 = () => <div>Component for Menu Item 2</div>;
  const MenuItem3 = () => <div>Component for Menu Item 3</div>;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
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
        console.log(response);
        toast.success("Successfully logout");
        window.location.href = "/login";
      } else {
        console.error("Failed to logout");
        toast.error("Failed to logout");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setMenuOpen(false);
  };
  const renderSelectedComponent = () => {
    switch (selectedMenuItem) {
      case "qr-codes-screen":
        return <QrCode searchInput={searchInput}/>;
      case "item2":
        return <MenuItem2 />;
      case "item3":
        return <MenuItem3 />;
      default:
        return null;
    }
  };
  const handleInputChange = (e) => { setSearchInput(e.target.value); };
  return (
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
              <input type="text"  onChange={handleInputChange}/>
              <img src={BuckleBeatsIcon} alt="heart" className="search-bg-icon" />
              <IoSearch className="search-icon" />
            </div>
          </div>
        </header>
      </div>
      {menuOpen && (
        <div className="menu">
          <p className="menu-item" onClick={() => handleMenuItemClick("qr-codes-screen")}>
            Menu Item 1
          </p>
          <p className="menu-item" onClick={() => handleMenuItemClick("item2")}>
            Menu Item 2
          </p>
          <p className="menu-item" onClick={() => handleMenuItemClick("item3")}>
            Menu Item 3
          </p>
          <p className="menu-item" onClick={onClickLogout}>
            Logout
          </p>
        </div>
      )}
      <div className="qrcodes-containers">{renderSelectedComponent()}</div>
    </div>
  );
};

export default Hamburger;