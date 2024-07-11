import React from "react";
import LoginPage from "../login/login-form";
import "../../styles/desktop-login-page/desktop-login-page.scss";
import DesktopLogo from "../../assets/desktoplogo.png";
import BuckleBeats from "../../assets/Buclebeatstext.png";

const DesktopLoginPage = () => {

  return (
  <div className="desktop-main-page">
    <div className="desktop-header">
    <img src={DesktopLogo} alt="BukleBeatsLogo" />
    </div>
  <div className="desktop-main-content">
    <div className="desktop-login-container">
       <LoginPage />
    </div>
      <div className="desktop-login-list">
      <img src={BuckleBeats} alt="BukleBeats" />
       </div>
    </div>
  </div>
  );
};

export default DesktopLoginPage;
