import React from "react";
import "../../styles/survey-form/survey-form.scss";
// import { Link } from "react-router-dom";
// import Logo from "../../assets/logo.png";

const LocationShare = ({ heading, icon, showQrCodeIcon, onClose,userId,sharingLocation ,className}) => {
  return (
    <div className="login-container"> 
    
      <div className="form-animation" >
      
        <div className={`form-animation-image ${className}`}>
          {showQrCodeIcon && <span className="form-animation-bg"></span>}
          {icon && <img src={icon} alt="Icon" />}
        </div>
        {sharingLocation 
          ? (
            <p>
              Hold tight! We’re pinpointing the exact location using <span style={{ color: '#58d7b5' }}>What3Words</span>. Thank you for your patience.
            </p>
          ) 
          : (
            <p>
            Success! Location Shared. Thank you for your help! 
            </p>
          )
        }
      </div>
    </div>
  );
};

export default LocationShare 
