import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import '../../styles/register/register.scss'
import { useForm } from "react-hook-form";
import cat from '../../assets/cat@1x-25fps.gif';
import footprints from '../../assets/Bag Steps@512p-25fps.gif'
import bag from '../../assets/bagimage.gif'
import dog from '../../assets/dog.gif'
import cycle from '../../assets/cycle.gif'
import paws from '../../assets/paws work@512p-25fps.gif'
import tyres from '../../assets/tyre path@512p-25fps.gif'
import steps from '../../assets/Bag Steps@512p-25fps.gif'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [bag,cycle,cat,dog];

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000); // Change image every 7 seconds

    return () => clearInterval(imageInterval);
  }, []);

  const getClassName1 = () => {
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
  const getBackgroundClassName = () => {
    switch (currentImageIndex) {
      case 0:
        return "background-image-steps";
      case 1:
        return "background-image-tyres";
      case 2:
      case 3:
        return "background-image-paws";
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
        return 'cat-icon'
      case 3:
        return "dog-icon";
      default:
        return "";
    }
  };
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@$%^&*])[^\s]{8,}$/;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

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

      setResponseMessage("User registered successfully! Please check your email for verification.");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      alert(response.data.resultMessage.en);
    } catch (error) {
      setResponseMessage("Error registering user");
      alert(error.response.data.resultMessage.en);
    }
  };

  return (
    <div className="regestation-container">
      {/* <div className={`form-container ${getClassName1()}`}> */}
      <div className="form-container">
        {/* <div className={`${getClassName1()}`}> </div> */}
        <div className={`${getClassName1()}`}></div>

        <h1>Welcome!</h1>
        <form onSubmit={handleSubmit(onformSubmit)} >
          <div className="input-container">
            <input
              className="input-box"
              type="text"
              id="name"
              {...register('name', { required: 'Name is required' })}
              placeholder="Name"
            />
            {errors.name && <span className="error">{errors.name.message}</span>}    
            </div>
            <div>
            <input
              className="input-box"
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: emailRegex,
                  message: 'Invalid email address'
                }
              })}
              placeholder="Email"
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
            </div>
          <div className="password-container">
            <input
              className="input-box"
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: passwordRegex,
                  message: 'Password must be at least 8 characters long, contain a digit, an uppercase letter, a lowercase letter, and a special character'
                }
              })}
              placeholder="Password"
            />
            <button
              type="button"
              className="show-password"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
            {errors.password && <span className="error">{errors.password.message}</span>}
          </div>
          <div className="password-container">
            <input
              className="input-box"
              type={confirmPasswordVisible ? 'text' : 'password'}
              id="confirmPassword"
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: value => value === watch('password') || 'Passwords do not match'
              })}
              placeholder="Confirm Password"
            />
            <button
              type="button"
              className="show-password"
              onClick={toggleConfirmPasswordVisibility}
            >
              {confirmPasswordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
            {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
          </div>
          <div style={{display:'flex',flexDirection:'column'}}>
 <img alt="image" className={`${getClassName()}`} src={images[currentImageIndex]}></img>
          {/* <img src={images[currentImageIndex]} alt="cycling images" style={{ height: "110px", marginBottom: "0px", marginLeft: "23px" }} /> */}

         
          </div>
          <button type="submit" className="login-button">SignUp</button>
        </form>
      </div>
    </div>
  
  );
};

export default RegisterForm;
