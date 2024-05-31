import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../../styles/login/login.scss";
import { Link, useNavigate } from "react-router-dom";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";
import axios from "axios";
import backGroundSteps from "../../assets/Bag Steps@512p-25fps.gif";
import cat from "../../assets/cat@1x-25fps.gif";
import bag from "../../assets/bagimage.gif";
import cycle from "../../assets/cycle.gif";
import dog from "../../assets/dog.gif";
import { CircularProgress } from "@mui/material";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const images = [bag, cycle, cat, dog];
const classNames = ["background-steps", "background-cycle-route", "background-paws", "background-paws"];

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500);

    return () => clearInterval(imageInterval);
  }, []);

  const onSubmitLoginForm = async (data) => {
    const api = `${process.env.REACT_APP_PRODUCTION_URL}/api/user/login`;
    setLoading(true);
    setMessage("");
    const accessTokenExpirationTime = 1;
    const refreshTokenExpirationTime = 30;

    try {
      const response = await axios.post(api, data);
      const { accessToken, refreshToken } = response.data;

      console.log(response.data.resultMessage.en);
      toast.success(response.data.resultMessage.en);
      setMessage(response.data.resultMessage.en);

      Cookies.set("accessToken", accessToken, { expires: accessTokenExpirationTime });
      Cookies.set("refreshToken", refreshToken, { expires: refreshTokenExpirationTime });
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error(error.response ? error.response.data.resultMessage.en : error.message);
      setMessage(error.response.data.resultMessage.en);
      toast.error(error.response.data.resultMessage.en);
      setLoading(false);
    }
  };
  //className={`${classNames[currentImageIndex]}`}
  return (
    <div className="login-main-container">
      <div className="login-container">
        <form onSubmit={handleSubmit(onSubmitLoginForm)} className="login-form">
          <div className={`login-container background-common-styles ${classNames[currentImageIndex]}`}></div>
          <h4 className="welcome-heading">Welcome!</h4>
          <br />
          <div className="form-group email-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>
          <div className="form-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@$%^&*])[^\s]{8,}$/,
                  // message: "Password must contain at least one letter and one number",
                  message: "Password must contain at least one digit,one uppercase letter, and one special character",
                },
              })}
            />
            <span className="toggle-password" onClick={togglePasswordVisibility}>
              {showPassword ? <VisibilityOffTwoToneIcon /> : <VisibilityTwoToneIcon />}
            </span>
            {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>
          {errors.password && <br />}
          <p className="forgot-password">
            <Link to="/forgot-password">Forgot password?</Link>
          </p>
          <img src={images[currentImageIndex]} alt="cycling images" style={{ height: "110px", marginBottom: "-22px", marginLeft: "18%" }} />
          <button className="button" type="submit">
            {loading ? <CircularProgress size={25} sx={{ color: "white" }} /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
