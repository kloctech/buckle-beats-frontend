import React from "react";
import "../../styles/lost-qrcode/lost-qrcode.scss";
import Logo from "../../assets/logo.png";
import PhoneIcon from "../../assets/phone.png";
import EmailIcon from "../../assets/email.png";
import UserIcon from "../../assets/user.png";

const LostQRCode = () => {

  return (
    <div className="lostqrcode-container">
      <div className="lostqrcode-main-container">
        <div className="lostqrcode-image">
          <img src={Logo} alt="BUKLEBEATS" />
        </div>
        <h3 class="lostqrcode-title">Thank You for Your Kindness!</h3>
        <h4>This item has been lost.</h4>
        <div className="lostqrcode-box">
           <p>Hi there! If you find my passport, please contact me or send me an email. Thank you so much.</p>
        </div>
          <ul className="lostqrcode-list">
            <li>
               <img src={UserIcon} alt="User Icon" />
               <span>Romi Mathew</span>
            </li>
            <li>
              <img src={EmailIcon} alt="Email Icon" />
              <span>mathewromi@gmail.com</span>
            </li>
            <li>
              <img src={PhoneIcon} alt="Phone Icon"/>
              <span>+447534896115</span>
            </li>
          </ul>
          <div className="lostqrcode-content">
            <p>You’re doing more than finding a lost item. Each time at BuckleBeats holds a precious story, waiting to be continued with your help.</p>
              <p>Please consent to also sharing your location, and be a hero in this happy reunion. Your kindness truly makes a difference adn strengths our caring community.</p>
          </div>
      </div>
    </div>
  );
};

export default LostQRCode;
