import React, { useEffect, useState } from "react";
import axios from "axios";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";
import "../../styles/register/register.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import cat from "../../assets/Cat.gif";
import bag from "../../assets/bagimage.gif";
import dog from '../../assets/dog.gif'
import cycle from "../../assets/Bicycle LT_1.gif";
import toast from "react-hot-toast";
import { FaCheckCircle} from "react-icons/fa";

const RegisterForm = () => {
  
const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [isRegistred,setIsRegistred]  = useState(true)
const [passwordVisible, setPasswordVisible] = useState(false);
const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
const {
  register,
  handleSubmit,
  watch,
  reset,
  formState: { errors },
} = useForm();
const images = [bag, cycle, cat, dog];

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000); // Change image every 7 seconds

    return () => clearInterval(imageInterval);
  }, [images.length]);

  const getBackgroundClassName = () => {
    switch (currentImageIndex) {
      case 0:
        return "background-iamge-container-steps";
      case 1:
        return "background-iamge-container-tyres";
      case 2:
      case 3:
        return "background-iamge-container-paws";
      default:
        return "";
    }
  };

  const getClassName = () => {
    switch (currentImageIndex) {
      case 0:
        return "bag-icon";
      case 1:
        return "cycle-icon";
      case 2:
        return "cat-icon";
      case 3:
        return "dog-icon";
      default:
        return "";
    }
  };
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@$%^&*])[^\s]{8,}$/;

 
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const onformSubmit = async (data) => {
    const url = process.env.REACT_APP_PRODUCTION_URL;

    try {
      const response = await axios.post(`${url}/api/user`, {
        name: data.name,
        email: data.email,
        password: data.password,
        platform: "Android",
      });
      toast.success(response?.data?.resultMessage?.en, {
        duration: 5000, 
      });      reset();
      setIsRegistred(true)
    } catch (error) {
      toast.error(error.response.data.resultMessage.en);
    }
  };

  return (
    <div className="regestation-container">
      {isRegistred ? <div className="form-container">
        {/* <FaCheckCircle className="verification-icon" /> */}
        <FaCheckCircle className="verification-message" ></FaCheckCircle>
         <h6 style={{color:"#E4E9F1"}}>Please check your email and complete the verification process to log in.</h6> </div> : <div className="form-container">
        <div className={`${getBackgroundClassName()}`}></div>
        <h1>Welcome!</h1>
        <form onSubmit={handleSubmit(onformSubmit)}>
          <div className="form-group">
            <input className="input-box" type="text" id="name" {...register("name", { required: "Name is required" })} placeholder="Name" />
            {errors.name && <span className="error">{errors.name.message}</span>}
          </div>
          <div className="form-group">
            <input
              className="input-box"
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: emailRegex,
                  message: "Invalid email address",
                },
              })}
              placeholder="Email"
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>
          <div className="password-container form-group">
            <input
              className="input-box"
              type={passwordVisible ? "text" : "password"}
              id="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: passwordRegex,
                  message: "Password must be at least 8 characters contains a digit, an uppercase letter, and a special character.",
                },
              })}
              placeholder="Password"
            />
            <button type="button" className="show-password" onClick={togglePasswordVisibility}>
              {passwordVisible ?<VisibilityOffTwoToneIcon/> : <VisibilityTwoToneIcon />}
            </button>
            {errors.password && <span className="error">{errors.password.message}</span>}
          </div>
          <div className={`password-container form-group ${errors.password ? "with-error" : ""}`}>
            <input
              className="input-box"
              type={confirmPasswordVisible ? "text" : "password"}
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) => value === watch("password") || "Passwords do not match",
              })}
              placeholder="Confirm Password"
            />
            <button type="button" className="show-password" onClick={toggleConfirmPasswordVisibility}>
              {confirmPasswordVisible ? <VisibilityOffTwoToneIcon/> : <VisibilityTwoToneIcon />}
            </button>
            {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <img alt="dog" className={`${getClassName()}`} src={images[currentImageIndex]}></img>
          </div>
          <button type="submit" className="register-button">
            SignUp
          </button>
          <p className="Login">     
            <Link to="/Login">Already have an accout? Login</Link>
          </p>
        </form>
      </div> }
    </div>
  );
};

export default RegisterForm;
