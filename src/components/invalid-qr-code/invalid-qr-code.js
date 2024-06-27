import React from "react";
import "../../styles/survey-form/survey-form.scss";
import { Link } from "react-router-dom";

const InvalidQrCode = ({ heading, icon, showQrCodeIcon, onClose,userId }) => {
  return (
    <div className="login-container"> 
      <div className="form-animation">
        <div className="header-title">
          <h1>Activate QR</h1>
          <Link className="close-menu" onClick={onClose}>X</Link>
        </div>
        <div className="form-animation-image">
          {showQrCodeIcon && <span className="form-animation-bg"></span>}
          {icon && <img src={icon} alt="Icon" />}
        </div>
        {heading && <p>{heading}</p>}
      </div>
    </div>
  );
};

export default InvalidQrCode
