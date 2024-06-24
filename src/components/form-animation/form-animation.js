import React from "react";
import { Link } from "react-router-dom";
import "../../styles/survey-form/survey-form.scss";

const FormAnimation = ({ heading, icon, showQrCodeIcon }) => {
  return (
    <div className="form-animation">
      <div style={{ justifyContent: "end" }} className="header-title">
        <Link to="/qr-scanner" className="close-menu">
          X
        </Link>
      </div>
      <div className="form-animation-image">
        {showQrCodeIcon && <span className="form-animation-bg"></span>}
        {icon && <img src={icon} alt="Icon" />}
      </div>
      {heading && <p>{heading}</p>}
    </div>
  );
};

export default FormAnimation;