import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/verify-email/verify-email.scss";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const [code, setCode] = useState(null);
  const [token, setToken] = useState(null);
  // const [message, setMessage] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setCode(searchParams.get("code"));
    setToken(searchParams.get("token"));
  }, []);

  const onClickVerifyEmail = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_PRODUCTION_URL}/api/user/verify-email`, {
        token,
        code,
      });
      toast.success(response.data.resultMessage.en);
      console.log(response.data.resultMessage.en);
      // setMessage(response.data.resultMessage.en);
    } catch (error) {
      toast.error(error.response.data.resultMessage.en);
      console.error(error.response ? error.response.data.resultMessage.en : error.message);
      // setMessage(error.response ? error.response.data.resultMessage.en : error.message);
    }
  };

  return (
    <div className="verify-email-main-container">
      <div className="verify-email-container">
        <div>
          <h4 className="verify-email-heading">Verify Email</h4>
          <button onClick={onClickVerifyEmail} className="button">
            Verify
          </button>
          {/* {message && <p>{message}</p>} */}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
