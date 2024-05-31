import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import '../../styles/register/register.scss'
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
  const [responseMessage,setResponseMessage] = useState("")

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordVisibility1 = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const onformSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:7000/api/user", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      setResponseMessage("User registered successfully! Please check your email for verification.");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      alert("User Registered");
    } catch (error) {
      console.error("Error submitting form", error);
      setResponseMessage("Error registering user");
    }
  };

  return (
    <div className="regestation-container">
      <div className="form-container">
        <h1>Welcome!</h1>
        <form onSubmit={handleSubmit(onformSubmit)}>
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
          <div className="input-container">
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
          <div className="input-container password-container">
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
          <div className="input-container password-container">
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
              onClick={togglePasswordVisibility1}
            >
              {confirmPasswordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
            {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
          </div>
          {/* <div className="dog-icon"></div> */}
          <button type="submit" className="login-button">SignUp</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
