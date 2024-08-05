import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "../../styles/survey-form/survey-form.scss";
import api from "../../middleware/api";
import FormAnimation from "../form-animation/form-animation";
import Heart from "../../assets/done_heart.gif";
import Failed from "../../assets/failed.gif";
import { CircularProgress } from "@mui/material";

const SurveyForm = ({ data }) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [apiStatus, setApiStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitAddQRForm = async (formData) => {
    data.mobile_number = `${data.country_code} ${data.mobile_number}`;
    data.survey_ans = formData.default_message;
    delete data.country_code;

    const API = `${process.env.REACT_APP_PRODUCTION_URL}/api/qrcode/register`;
    setLoading(true);

    try {
      const response = await api.post(API, data);

      setMessage("Your are all set - hooray!");
      setApiStatus(200);
      setLoading(false);
    } catch (error) {
      console.log(error);

      setMessage("Something has gone wrong,don't worry. let's try again.");
      setApiStatus(500);
      setLoading(false);
    }

    setIsFormSubmitted(true);
  };

  return (
    <div className="login-container">
      {isFormSubmitted ? (
        <FormAnimation icon={apiStatus === 200 ? Heart : Failed} heading={message} showQrCodeIcon={apiStatus === 200 ? false : true} />
      ) : (
        <div>
          <div className="survey-form">
            <div className="header-title">
              <h1>Activate QR</h1>
              <Link to="/qr-scanner" className="close-menu">
                X
              </Link>
            </div>

            <form onSubmit={handleSubmit(onSubmitAddQRForm)} className="survey-form-list">
              <div className="form-group-login textarea-group">
                <p>Where did you buy BuckleBeats from?</p>
                <textarea rows="4" className="survey-form-text" name="default_message" placeholder="Leave a note here" {...register("default_message")} />
                {errors.default_message && <span className="error-message">{errors.default_message.message}</span>}
              </div>
              <button className="login-button"> {loading ? <CircularProgress size={25} sx={{ color: "white", display: "flex", alignItems: "center", justifyContent: "center", margin: "auto" }} /> : "Save"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyForm;
