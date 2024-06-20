import React from "react";
import { useForm } from "react-hook-form";
import {Link} from "react-router-dom";
import "../../styles/survey-form/survey-form.scss";

const SurveyForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const onSubmitAddQRForm = async (data) => {
        console.log(data)
      }
      return (
      
          <div className="login-container"> 
            <div className="survey-form">
            <div className="header-title">
               <h1>Activate QR</h1>
                <Link to="/" className="close-menu">X</Link>
             </div>
           
            <form onSubmit={handleSubmit(onSubmitAddQRForm)} className="survey-form-list">
       
            <div className="form-group-login textarea-group">
            <p>Where did you buy BuckleBeats from?</p>
            <textarea
              rows="4"
              className="survey-form-text"
              name="default_message"
              placeholder="Leave a note here"
              {...register("default_message")}
            />
            {errors.default_message && <span className="error-message">{errors.default_message.message}</span>}
          </div>
             <button className="login-button save-btn">
                    Save
                </button>
            </form>
          </div>
        </div>
      
      );
};

export default SurveyForm;
