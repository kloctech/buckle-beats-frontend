import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/verify-email/verify-email.scss";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    const token = searchParams.get("token");
    if (code && token) {
      onClickVerifyEmail(code, token);
    }
  }, []);

  const onClickVerifyEmail = async (code, token) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_PRODUCTION_URL}/api/user/verify-email`, {
        token,
        code,
      });
      setVerificationStatus("success");
      setMessage(response.data.resultMessage.en);
    } catch (error) {
      setVerificationStatus("error");
      console.error(error.response ? error.response.data.resultMessage.en : error.message);
    }
  };

  return (
    <div className="verify-email-main-container">
      <div className="verify-email-container">
        <div>
          {verificationStatus === "success" ? (
            <div className="verification-message success">
              <FaCheckCircle className="verification-icon" />
              <span>{message}</span>
              <p>
                <Link className="login-after-verify" to="/signin">
                  Login
                </Link>
              </p>
            </div>
          ) : verificationStatus === "error" ? (
            <div className="verification-message error">
              <FaTimesCircle className="verification-icon" />
              <span>Verification Failed</span>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <p>LOADING</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
