import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/verify-email/verify-email.scss";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const VerifyEmail = () => {
  const [verificationStatus, setVerificationStatus] = useState(null);

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
      // toast.success(response.data.resultMessage.en, { duration: 5000 });
      console.log(response.data.resultMessage.en);
    } catch (error) {
      setVerificationStatus("error");
      // toast.error(error.response.data.resultMessage.en, { duration: 5000 });
      console.error(error.response ? error.response.data.resultMessage.en : error.message);
    }
  };

  return (
    <div className="verify-email-main-container">
      <div className="verify-email-container">
        <div>
          {/* <h4 className="verify-email-heading">Verify Email</h4> */}
          {verificationStatus === "success" ? (
            <div className="verification-message success">
              <FaCheckCircle className="verification-icon" />
              <span>Successfully Verified</span>
            </div>
          ) : verificationStatus === "error" ? (
            <div className="verification-message error">
              <FaTimesCircle className="verification-icon" />
              <span>Verification Failed</span>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <p>LOADING</p>
              {/* <CircularProgress sx={{ color: "#58d7b5" }} /> */}
              {/* <Preloader /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
