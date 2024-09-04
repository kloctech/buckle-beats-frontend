import React from "react";
import "../../styles/desktop-login-page/desktop-login-page.scss";
import DesktopLogo from "../../assets/desktoplogo.png";
import { useLocation, useParams  } from "react-router-dom";
import ForgotPasswordLink from "../forget-password-link/forgot-password-link";
import NotFound from "../not-found/not-found";
import Hamburger from "../hamburger-searchbar/hamburger-searchbar";
import ManageProfile from "../manage-profile/manage-profile";
import EditQRCode from "../edit-qr-code/edit-qr-code";
import AddQRCode from "../add-qr-code/add-qr-code";
import QrCodeScanner from "../qr-code-scanner/qr-code-scanner";
import SendInvite from "../send-invite/send-invite";
import SurveyForm from "../survey-form/survey-form";
import DesktopVideo from "../../assets/DesktopVideo.mp4";
import RoamSmartTracker from "../../../src/assets/Icon.svg";

const DesktopProtectedPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const renderContent = () => {
    switch (location.pathname) {  
      case '/':
        return <Hamburger />;
     case '/forgot-password-link':
        return <ForgotPasswordLink />;
      case '/manage-profile':
        return <ManageProfile />;
      case `/add-qr-code/${id}`:
        return <AddQRCode />;
      case `/edit-qr-code/${id}`:
        return <EditQRCode />;
      case '/qr-scanner':
        return <QrCodeScanner />;
      case '/send-invite':
        return <SendInvite />;
      case '/survey-form':
        return <SurveyForm />;
      default:
        return <NotFound />;
    }
  };

  return (
    <div className="desktop-main-page desktop-protect-page">
       <div className="desktop-video">
        <video autoPlay muted loop playsInline>
          <source src={DesktopVideo} type="video/mp4" />
           </video>
        </div>
      <div className="desktop-header">
        <img src={RoamSmartTracker}  style = {{width:'6%', backgroundColor: 'transparent'}} alt="BukleBeatsLogo" />
      </div>
      <div className="desktop-main-content">
        <div className="desktop-main-container">
          {renderContent()}
        </div>
        <div className="desktop-main-list">
        {/* <p><span class="text-1">y</span><span class="text-2">o</span><span class="text-3">u</span> ipsum doret two line text here</p> */}
        </div>
      </div>
    </div>
  );
};

export default DesktopProtectedPage;
