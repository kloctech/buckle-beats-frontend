import React from "react";
import "../../styles/desktop-login-page/desktop-login-page.scss";
// import DesktopLogo from "../../assets/desktoplogo.png";
// import RoamSmartTracker from "../../../src/assets/Icon.svg";
import Logo1 from '../../assets/Logo and describer white.png'
import { useLocation, useParams ,Link } from "react-router-dom";
import LoginPage from "../login/login-form";
import RegisterForm from "../register/register-form";
import VerifyEmail from "../verify-email/verify-email";
import ForgotPasswordLink from "../forget-password-link/forgot-password-link";
import ForgotPassword from "../forgot-password/forgot-password";
import LostQRCode from "../lost-qrcode/lost-qrcode";
import SetPassword from "../set-password/set-password";
import LinkingCoowner from "../linking-co-owner/linking-co-owner";
import NotFound from "../not-found/not-found";
import DesktopVideo from "../../assets/DesktopVideo.mp4";

const DesktopPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const renderContent = () => {
    switch (location.pathname) {
      case '/signin':
        return <LoginPage />;
      case '/signup':
        return <RegisterForm />;
      case '/account':
        return <VerifyEmail />;
      case '/forgot-password-link':
        return <ForgotPasswordLink />;
      case '/forgot-password':
        return <ForgotPassword />;
      case `/qr-code/${id}`:
        return <LostQRCode />;
      case '/set-password':
        return <SetPassword />;
      case '/additional-user':
        return <LinkingCoowner />;
      default:
        return <NotFound />;
    }
  };

  return (
    <div className="desktop-main-page">
      <div className="desktop-video">
        <video autoPlay muted loop playsInline>
          <source src={DesktopVideo} type="video/mp4" />
           </video>
        </div>
      <div className="desktop-header">
        <Link to="/">
        <img 
  src={Logo1} 
  alt="RoamSmartTracker" 
  style={{
   
    // backgroundColor: 'transparent',
  }} 
/>
        </Link>
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

export default DesktopPage;
