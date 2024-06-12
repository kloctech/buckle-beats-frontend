import React, { useState, useEffect } from "react";
import "../../styles/lost-qrcode/lost-qrcode.scss";
import Logo from "../../assets/logo.png";
import PhoneIcon from "../../assets/phone.png";
import EmailIcon from "../../assets/email.png";
import UserIcon from "../../assets/user.png";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from 'react-router-dom';

const LostQRCode = () => {
  const [lostData, setLostdata] = useState(null);
  const { id } = useParams();
  
  useEffect(() => {
    const url = process.env.REACT_APP_PRODUCTION_URL;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/api/qrcode/owner-details/${id}`);
        setTimeout(() => {
          setLostdata(response.data);
          toast.success(response.data.resultMessage.en, { duration: 5000 });
        }, 1000);

      } catch (error) {
        toast.error(error.response?.data?.resultMessage?.en, { duration: 5000 });
      }
    };

    fetchData();
  }, []);

  return (

    <div className="lostqrcode-container">
      {lostData !== null && (
        <div className="lostqrcode-main-container">
          <div className="lostqrcode-image">
            <img src={Logo} alt="BUKLEBEATS" />
          </div>

          <h3 className="lostqrcode-title">Thank You for Your Kindness!</h3>
          {lostData.owner.qrIsLost && (
            <h4>This item has been lost.</h4>
          )}
          {lostData.owner.defaultMessage && (
            <div className="lostqrcode-box">
              <p>{lostData.owner.defaultMessage}</p>
            </div>
          )}
          <ul className="lostqrcode-list">
            {lostData.owner.name && (
              <li>
                <img src={UserIcon} alt="User Icon" />
                <span>{lostData.owner.name}</span>
              </li>
            )}
            {lostData.owner.email && (
              <li>
                <img src={EmailIcon} alt="Email Icon" />
                <span>{lostData.owner.email}</span>
              </li>
            )}
            {lostData.owner.mobileNumber && (
              <li>
                <img src={PhoneIcon} alt="Phone Icon" />
                <span>{lostData.owner.mobileNumber}</span>
              </li>
            )}
          </ul>

          <div className="lostqrcode-content">
            <p>You’re doing more than finding a lost item. Each time at BuckleBeats holds a precious story, waiting to be continued with your help.</p>
            <p>Please consent to also sharing your location, and be a hero in this happy reunion. Your kindness truly makes a difference adn strengths our caring community.</p>
          </div>
        </div>
      )}
    </div>

  );
};

export default LostQRCode;
