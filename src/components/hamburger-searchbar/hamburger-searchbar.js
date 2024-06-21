import React, { useState, useEffect } from "react";
import "../../styles/hamburger-and-searchbar/hamburger-and-searchbar.scss";
import { IoSearch } from "react-icons/io5";
import BuckleBeatsIcon from "../../assets/Bucklebeats Icon.svg";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import QrCodes from "../qr-codes/qr-codes";
import Logo from "../../assets/logo.png";
import RightArrow from "../../assets/right-arrow.png";
import { useNavigate } from "react-router-dom";
import UpdatePassword from "../update-password/update-password ";


const Hamburger = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("qr-codes-screen");
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [passwordSubmenuOpen, setPasswordSubmenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();
  const MenuItem2 = () => <div>Component for Menu Item 2</div>;
  const MenuItem3 = () => <div>Component for Menu Item 3</div>;
  const userName = Cookies.get("userName");
  const userEmail = Cookies.get("userEmail");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setSubmenuOpen(false);
    setPasswordSubmenuOpen(false);
  };

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const handleClosemenu = () => {
    setMenuOpen(false);
    setPasswordSubmenuOpen(false);
  };

  const handleBackFromPassword = () => {
    setPasswordSubmenuOpen(false);
    setSubmenuOpen(true);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  const onClickLogout = async () => {
    const accessToken = Cookies.get("accessToken");
    const allCookies = Cookies.get();
    for (let cookie in allCookies) {
      Cookies.remove(cookie);
    }
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
    } catch (error) {
      console.log(error);
    }
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

  const handleClickNavigateProfiles = () => {
    navigate('/manage-profile');
  };

  const handleUpdatePassword = () => {
    setPasswordSubmenuOpen(true);
    setSubmenuOpen(false);
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

        <div className={menuOpen ? "active menu-wrapper" : "inactive menu-wrapper"}>
          <div className="menu-container">
            {!passwordSubmenuOpen && (
              <div className="close-menu" onClick={handleClosemenu}>
                X
              </div>
            )}
            {passwordSubmenuOpen ? (
              <div className={`submenu-password ${passwordSubmenuOpen ? "is-visible" : ""}`}>
                <div className="menu-back" onClick={handleBackFromPassword}>
                  Back
                </div>
                <UpdatePassword passwordSubmenuOpen={passwordSubmenuOpen} />
              </div>
            ) : (
              <>
                {submenuOpen ? (
                  <h1 className="menu-wrapper-image" style={{ textAlign: "center" }}>Account Details</h1>
                ) : (
                  <img className="menu-wrapper-image" src={Logo} alt="BUKLEBEATS" />
                )}
                {menuOpen && (
                  <div className={`menu-list ${submenuOpen ? "submenu-visible" : ""}`}>
                    <div className="menu-list-item">
                      <div className="menu-text">
                        <h4>ACCOUNT</h4>
                        <div className={`menu-link`} onClick={toggleSubmenu}>
                          Manage Account
                          {!submenuOpen && (
                            <span>
                              <img src={RightArrow} alt="rightarrow Icon" />
                            </span>
                          )}
                        </div>
                        <div className={`menu-link`} onClick={handleClickNavigateProfiles} style={{ marginTop: "10px" }}>
                          <p>Switch Profile</p>
                          <span>
                            <img src={RightArrow} alt="rightarrow Icon" />
                          </span>
                        </div>
                      </div>
                      <div className="menu-text">
                        <h4>QRs</h4>
                        <div className="menu-link" onClick={() => handleMenuItemClick("qr-codes-screen")}>
                          Activate & Manage QRs
                        </div>
                      </div>
                      <div className="menu-text menu-logout" onClick={onClickLogout}>
                        Sign Out
                      </div>
                    </div>

                    <div className={`submenu ${submenuOpen ? "is-visible" : ""}`}>
                      <div className="menu-text">{userName}</div>
                      <hr />
                      <div className="menu-text">{userEmail}</div>
                      <hr />
                      <div className={`menu-link menu-text`} onClick={handleUpdatePassword}>
                        Update Password
                        <span className="arrow">
                          <img src={RightArrow} alt="rightarrow Icon" />
                        </span>
                      </div>
                      <hr />
                      <div className={`menu-link menu-text`}>
                        Delete Account
                        <span>
                          <img src={RightArrow} alt="rightarrow Icon" />
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="qrcodes-containers">{renderSelectedComponent()}</div>
      </div>
    </div>
  );
};

export default Hamburger;
