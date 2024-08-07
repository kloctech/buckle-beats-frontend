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
import DeleteAccount from "../delete-account/delete-account";
import { BiArrowBack } from "react-icons/bi";
import api from "../../middleware/api";
const Hamburger = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("qr-codes-screen");
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [passwordSubmenuOpen, setPasswordSubmenuOpen] = useState(false);
  const [deletepasswordOpen, setdeletepasswordOpen] = useState(false);
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
        window.location.href = "/login";
      } else {
        //toast.error("Failed to logout");
        window.location.href = "/login";
        const allCookies = Cookies.get();
        for (let cookie in allCookies) {
          Cookies.remove(cookie);
        }
      }
    } catch (error) {
      console.log(error);
      window.location.href = "/login";
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
                <img src={BuckleBeatsIcon} alt="heart" className="search-bg-icon" />
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
                 <div className="menu-wrapper-image">
                  <h1  style={{ textAlign: "center",color:'white' }}>Account Details</h1>
                  <div className="menu-account menu-back" onClick={handleBackFromSubmenu}>
                  <BiArrowBack />
                  </div>
                  </div>
                ) : passwordSubmenuOpen || deletepasswordOpen ? (
                   <div className="menu-wrapper-image">
                  
                    {passwordSubmenuOpen ? <h1  style={{ textAlign: "center",color:'white' }}> Update Password</h1>:<h1 style={{ textAlign: "center",color:'white' }}>Delete Account</h1>}
                   <div className="menu-account menu-back" onClick={handleBackFromPassword}>
                   <BiArrowBack />
                   </div>
                   </div>
                ): (
                  <img className="menu-wrapper-image" src={Logo} alt="BUKLEBEATS" />
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
                        <div className="menu-link" style={{ marginTop: "1rem" }}></div>
                        <div className="menu-text">
                          <h4>PREMIUM (Upgrade)</h4>
                          <div className={`menu-link`}>
                            Coming Soon.....
                            <span>
                              <img src={RightArrow} alt="rightarrow Icon" />
                            </span>
                          </div>
                        </div>
                        <div className="menu-text" style={{ marginTop: "1rem" }}>
                          <h4> SUPPORT</h4>
                          <div className={`menu-link`}>
                            Contact us
                            <span>
                              <img src={RightArrow} alt="rightarrow Icon" />
                            </span>
                          </div>
                          <div className={`menu-link`} style={{ marginTop: "8px" }}>
                            FAQs
                            <span>
                              <img src={RightArrow} alt="rightarrow Icon" />
                            </span>
                          </div>
                          <div className={`menu-link`} style={{ marginTop: "8px" }}>
                            T&Cs
                            <span>
                              <img src={RightArrow} alt="rightarrow Icon" />
                            </span>
                          </div>
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
