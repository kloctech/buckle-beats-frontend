import React, { useState, useEffect } from "react";
import "../../styles/hamburger-and-searchbar/hamburger-and-searchbar.scss";
import { IoSearch } from "react-icons/io5";
// import RoamSmartTracker from "../../../src/assets/Icon.svg";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import QrCodes from "../qr-codes/qr-codes";
import Logo1 from '../../assets/Logo white.png'
import RightArrow from "../../assets/right-arrow.png";
import { useNavigate } from "react-router-dom";
import UpdatePassword from "../update-password/update-password ";
import DeleteAccount from "../delete-account/delete-account";
import { BiArrowBack } from "react-icons/bi";
import api from "../../middleware/api";
import { useMediaQuery } from 'react-responsive';

const Hamburger = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("qr-codes-screen");
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [passwordSubmenuOpen, setPasswordSubmenuOpen] = useState(false);
  const [deletepasswordOpen, setdeletepasswordOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();  
  const isDesktop = useMediaQuery({ minWidth: 767 })

  const MenuItem2 = () => <div>Component for Menu Item 2</div>;
  const MenuItem3 = () => <div>Component for Menu Item 3</div>;
  const userName = Cookies.get("userName");
  const userEmail = Cookies.get("userEmail");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setSubmenuOpen(false);
    setPasswordSubmenuOpen(false);
    setdeletepasswordOpen(false);
  };

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const handleClosemenu = () => {
    setMenuOpen(false);
    setPasswordSubmenuOpen(false);
    setdeletepasswordOpen(false);
  };

  const handleBackFromPassword = () => {
    setPasswordSubmenuOpen(false);
    setSubmenuOpen(true);
    setdeletepasswordOpen(false);
  };

  const handleBackFromSubmenu = () => {
    setMenuOpen(true);
    setPasswordSubmenuOpen(false);
    setSubmenuOpen(false);
  };
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  const onClickLogout = async () => {
    try {
      const response = await api.post(`${process.env.REACT_APP_PRODUCTION_URL}/api/user/logout`);
      if (response.ok) {
        toast.success("Successfully logout");
        window.location.href = "/signin";
      } else {
        //toast.error("Failed to logout");
        window.location.href = "/signin";
        const allCookies = Cookies.get();
        for (let cookie in allCookies) {
          Cookies.remove(cookie);
        }
      }
    } catch (error) {
      console.log(error);
      window.location.href = "/signin";
      const allCookies = Cookies.get();
      for (let cookie in allCookies) {
        Cookies.remove(cookie);
      }
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

  const handleClickNavigateProfiles = (event) => {
    if (event) {
      event.preventDefault();
    }
    setMenuOpen(false);
    setTimeout(() => {
      navigate("/manage-profile");
    }, 700);
  };
  const handleUpdatePassword = () => {
    setPasswordSubmenuOpen(true);
    setSubmenuOpen(false);
    setdeletepasswordOpen(false);
  };
  const  handleDeletePassword = () => {
    setPasswordSubmenuOpen(false);
    setSubmenuOpen(false);
    setdeletepasswordOpen(true);
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
                {/* <img src={RoamSmartTracker} alt="heart" className="search-bg-icon" /> */}
                <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84.98 79.3" className="search-bg-icon">
  <defs>
    {/* <style>
      .cls-1 {
      fill: #343D3C;

      }
      .cls-2{
        fill:#9ab39f;
      }
    </style> */}
  </defs>
  <g id="Layer_1-2" data-name="Layer_1">
    <g>
      <path class="cls-2" d="M78.67,32.63l6.14,34.1c.11.61.17,1.22.17,1.84.02,5.84-4.69,10.59-10.53,10.61l-34.65.13c-19.24.07-35.75-13.68-39.16-32.62C-3.25,25.13,11.08,4.52,32.63.63s42.17,10.44,46.05,31.99Z"/>
      <path class="cls-1" d="M61.17,35.77l3.4,19.01c.06.34.09.68.09,1.02,0,3.25-2.62,5.9-5.88,5.91l-19.31.05c-10.72.03-19.92-7.65-21.81-18.21-2.15-12.01,5.85-23.49,17.86-25.64,12.01-2.15,23.49,5.85,25.64,17.86Z"/>
    </g>
  </g>
</svg>
                <IoSearch className="search-icon" />
              </div>
            </div>
          </header>
        </div>

        <div className={menuOpen ? "active menu-wrapper" : "inactive menu-wrapper"}>
          <div className={`menu-container   ${submenuOpen  && 'menu-list-submenu' } ${deletepasswordOpen && 'delete-page-list'} ${passwordSubmenuOpen && 'menu-list-submenu' }`}>
              <div className="close-menu" onClick={handleClosemenu}>
                X
              </div>
              {submenuOpen ? (
  <div className="menu-wrapper-image1">
    <h1 style={{ textAlign: "center", color: "white" }}>Account Details</h1>
    <div className="menu-account menu-back" onClick={handleBackFromSubmenu}>
      <BiArrowBack />
    </div>
  </div>
) : passwordSubmenuOpen || deletepasswordOpen ? (
  <div className="menu-wrapper-image1">
    {passwordSubmenuOpen ? (
      <h1 style={{ textAlign: "center", color: "white" }}>Update Password</h1>
    ) : (
      <h1 style={{ textAlign: "center", color: "white" }}>Delete Account</h1>
    )}
    <div className="menu-account menu-back" onClick={handleBackFromPassword}>
      <BiArrowBack />
    </div>
  </div>
) : (
  isDesktop ? (
    < h1 className="menu-wrapper-image" style={{fontWeight:'600'}}>Settings</h1>
  ) : (
    <img className="menu-wrapper-image" src={Logo1} alt="BUKLEBEATS" />

  )
)}

              {menuOpen && (
                  <div className={`menu-list ${submenuOpen ? "submenu-visible" : ""}  ${passwordSubmenuOpen || deletepasswordOpen ? "sub-submenu-visible" : ""}`}>
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
                          Switch Profile
                          <span>
                            <img src={RightArrow} alt="rightarrow Icon" />
                          </span>
                        </div>
                      </div>
                      <div className="menu-text" style={{ marginTop: "1rem" }}>
                        <h4>QRs</h4>
                        <div className="menu-link" onClick={() => handleMenuItemClick("qr-codes-screen")}>
                          Activate & Manage QRs
                        </div>
                        {/* <div className="menu-link" style={{ marginTop: "1rem" }}></div> */}
                        {/* <div className="menu-text">
                          <h4>PREMIUM (Upgrade)</h4>
                          <div className={`menu-link`}>
                            Coming Soon.....
                            <span>
                              <img src={RightArrow} alt="rightarrow Icon" />
                            </span>
                          </div>
                        </div> */}
                        <div className="menu-text" style={{ marginTop: "1rem" }}>
                          <h4> SUPPORT</h4>
                          <a
                            href="https://roamsmarttracker.com/pages/contact"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="menu-link"
                            style={{ textDecoration: "none" }}
                          >
                            Contact us
                            <span>
                              <img src={RightArrow} alt="rightarrow Icon" />
                            </span>
                          </a>

                          <a
                            href="https://roamsmarttracker.com/a/docs/preview/layout_2/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="menu-link"
                            style={{ marginTop: "8px" ,textDecoration: "none"}}
                          >
                            FAQs
                            <span>
                              <img src={RightArrow} alt="rightarrow Icon" />
                            </span>
                          </a>

                          <a
                            href="https://roamsmarttracker.com/pages/terms-and-conditions"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="menu-link"
                            style={{ marginTop: "8px" ,textDecoration: "none"}}
                          >
                            T&Cs
                            <span>
                              <img src={RightArrow} alt="rightarrow Icon" />
                            </span>
                          </a>
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
                      <div className={`menu-link menu-text`} onClick={handleDeletePassword}>
                        Delete Account
                        <span>
                          <img src={RightArrow} alt="rightarrow Icon" />
                        </span>
                      </div>
                    </div>
                    <div className={`submenu-password ${deletepasswordOpen ? "delete-menu-page" :""} ${passwordSubmenuOpen || deletepasswordOpen ? "is-visible" : ""}`}>
                      {deletepasswordOpen ?  <DeleteAccount />
                       : <UpdatePassword />
                      }
                    </div>
                  </div>
              
        
            )}
          </div>
        </div>

        <div className="qrcodes-containers">{renderSelectedComponent()}</div>
      </div>
    </div>
  );
};

export default Hamburger;
