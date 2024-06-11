import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";
import '../../styles/forgot-password/forgot-password.scss';
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [token, setToken] = useState("");
  
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setToken(searchParams.get("token"));
  }, []);
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const onSubmit = async (data) => {
    const url = process.env.REACT_APP_PRODUCTION_URL
   
    
    try {
      const response = await axios.post(
        `${url}/api/user/forgot-password`,
        { password: data.password },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success(response.data.resultMessage.en,{ duration: 5000 });

      reset()

    } catch (error) {
      
      toast.error(error.response?.data?.resultMessage?.en,{ duration: 5000 });
    }
  };

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@$%^&*])[^\s]{8,}$/;

  return (
    <div className="forgot-password-main-container">
      <div className="forgot-password-form">
        <h2 className="forgot-password-heading">Forgot Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group-reg password-container">
            <input
              className="input-box"
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: passwordRegex,
                  message: 'Password must be at least 8 characters long, contain a digit, an uppercase letter, a lowercase letter, and a special character',
                },
              })}
              placeholder="New Password"
            />
            <button
              type="button"
              className="show-password"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <VisibilityOffTwoToneIcon /> : < VisibilityTwoToneIcon />}
            </button>
            {errors.password && <span className="error">{errors.password.message}</span>}
          </div>
          <div className={`password-container form-group ${errors.password ? "with-error" : ""}`}>
            <input
              className="input-box"
              type={confirmPasswordVisible ? 'text' : 'password'}
              id="confirmPassword"
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: value => value === watch('password') || 'Passwords do not match',
              })}
              placeholder="Confirm Password"
            />
            <button
              type="button"
              className="show-password"
              onClick={toggleConfirmPasswordVisibility}
            >
              {confirmPasswordVisible ? <VisibilityOffTwoToneIcon /> : < VisibilityTwoToneIcon />}
            </button>
            {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
          </div>
          <button className="button" type="submit">
            Submit
          </button>
         
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
