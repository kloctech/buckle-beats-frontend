import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import '../../styles/forgot-password/forgot-password.scss';
import '../../styles/login/login.scss';
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPasswordLink = () => {
  const { register, handleSubmit,reset, formState: { errors } } = useForm();
  

  const onSubmit = async (data) => {
    const url = process.env.REACT_APP_PRODUCTION_URL
    try {
      const response = await axios.post(`${url}/api/user/forgot-password-link`, { email: data.email });
      toast.success(response?.data?.resultMessage?.en,{ duration: 5000 })
  reset()

    } catch (error) {
      toast.error(error.response?.data?.resultMessage?.en,{ duration: 5000 })
    }
  };

  return (
    <div className="forgot-password-main-container">
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
        {/* <h2 className="welcome-heading" style={{marginBottom:"40px"}}>Forgot Password</h2> */}
        <h1 className="welcome-heading">Forgot Password</h1>
    
          <div className="form-group">
            <input
              className="input-box"
              // type="email"
              id="email"
              name="email"
              placeholder="Email"
              {...register('email', {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address"
                }
              })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <button className="for-got-password-button" type="submit">
            Submit
          </button>
          <p className="Login">
            <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordLink;
