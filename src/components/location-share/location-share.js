import React from "react";
import "../../styles/survey-form/survey-form.scss";
// import { Link } from "react-router-dom";
// import Logo from "../../assets/logo.png";
import Logo from "../../assets/roam tracker logo.svg"
import { useMediaQuery } from 'react-responsive';

const LocationShare = ({ heading, icon, showQrCodeIcon, onClose,userId,sharingLocation ,className}) => {
  const isDesktop = useMediaQuery({ minWidth: 767 })

  return (
    <div className="login-container"> 
    
      <div className="form-animation" >
        {!isDesktop ? <div className="location-image-logo">
                <img src={Logo} alt="BUKLEBEATS" />
              </div> : null}
      
        <div className={`form-animation-image ${className}`}>
          {showQrCodeIcon && <span className="form-animation-bg"></span>}
          {icon && <img src={icon} alt="Icon" />}
        </div>
        {sharingLocation 
          ? (
            <p>
              Hold tight! We’re pinpointing the exact location using <span style={{ color: '#93B8A1' }}>What3Words</span>. Thank you for your patience.
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
