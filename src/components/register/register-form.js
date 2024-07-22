import React, { useEffect, useState } from "react";
import api from "../../middleware/api";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";
import "../../styles/register/register.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import cat from "../../assets/Cat.gif";
import bag from "../../assets/bagimage.gif";
import cycle from "../../assets/Bicycle LT_1.gif";
import dog from "../../assets/dog.gif";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { CircularProgress } from "@mui/material";

const RegisterForm = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isRegistred, setIsRegistred] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    clearErrors,
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
        return "bag-gif";
      case 1:
        return "cycle-gif";
      case 2:
        return "cat-gif";
      case 3:
        return "dog-gif";
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

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    if (confirmPassword && confirmPassword !== password) {
      setError("confirmPassword", {
        type: "validate",
        message: "Passwords do not match",
      });
    } else {
      clearErrors("confirmPassword");
    }
  }, [confirmPassword, password, setError, clearErrors]);

  const onFormSubmit = async (data) => {
    const url = process.env.REACT_APP_PRODUCTION_URL;
    setLoading(true);
    try {
      const response = await api.post(`${url}/api/user`, {
        name: data.name,
        email: data.email,
        password: data.password,
        platform: "Android",
      });
      toast.success(response?.data?.resultMessage?.en, {
        duration: 5000,
      });
      reset();
      setIsRegistred(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.resultMessage.en, { duration: 5000 });
      setLoading(false);
    }
  };

  return (
    <div className="regestation-container">
      {isRegistred ? (
        <div className="form-container">
          <FaCheckCircle className="verification-message"></FaCheckCircle>
          <h6 style={{ color: "#E4E9F1" }}>Please check your email and complete the verification process to log in.</h6>
        </div>
      ) : (
        <div className="form-container">
          <div className={`${getBackgroundClassName()}`}></div>
          <h1 className="welcome-heading">Welcome!</h1>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="form-group">
              <input className="input-box" type="text" id="name" {...register("name", { required: "Name is required" })} placeholder="Name" />
              {errors.name && <span className="error">{errors.name.message}</span>}
            </div>
            <div className="form-group">
              <input
                className="input-box"
                // type="email"
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
                {passwordVisible ? <VisibilityOffTwoToneIcon /> : <VisibilityTwoToneIcon />}
              </button>
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>
            <div className={`password-container form-group ${errors?.password?.message && errors?.password.message !== "Password is required" ? "with-error" : ""}`}>
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
                {confirmPasswordVisible ? <VisibilityOffTwoToneIcon /> : <VisibilityTwoToneIcon />}
              </button>
              {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
            </div>
            <div style={{ height: "80px", position: "relative" }}>
              <img style={{ position: "absolute", bottom: "0", left: "0" }} src={images[currentImageIndex]} className={`${getClassName()}`} alt="cycling images" />
            </div>
            <button type="submit" className="register-button">
              {loading ? <CircularProgress size={25} sx={{ color: "white", display: "flex", alignItems: "center", justifyContent: "center", margin: "auto" }} /> : "SignUp"}
            </button>
            <p className="Login">
              <Link to="/Login">Already have an account? Login</Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
