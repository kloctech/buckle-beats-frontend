import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/survey-form/survey-form.scss";

const FormAnimation = ({ heading, icon, showQrCodeIcon }) => {
  const navigate  = useNavigate()
  return (
    <div className="form-animation">
      <div style={{ justifyContent: "end" }} className="header-title">
        <Link to={showQrCodeIcon ? '/qr-scanner' :  "/"} className="close-menu">
          X
        </Link>
       
      </div>
      <div className="form-animation-image">
        {showQrCodeIcon && <span className="form-animation-bg"></span>}
        {icon && <img src={icon} alt="Icon" />}
      </div>
      {heading && <p>{heading}</p>}
      {!showQrCodeIcon ?  <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <button onClick={()=>navigate('/')}>Done</button>
        </div> : null}
    </div>
  );
};

export default FormAnimation;
