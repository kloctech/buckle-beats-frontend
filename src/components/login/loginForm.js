import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../styles/login/login.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
const [responseMessage, setResponseMessage] = useState("")
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmitLoginForm = async(data) => {
    const url =  process.env.REACT_APP_PRODUCTION_URL
    try {
      const response = await axios.post(`${url}/api/user/login`, {
        
        email: data.email,
        password: data.password,
        
      });

      setResponseMessage("User registered successfully! Please check your email for verification.");
      // setFormData({
      //   name: "",
      //   email: "",
      //   password: "",
      //   confirmPassword: "",
      // });
      alert(response.resultMessage.en);
    } catch (error) {
      console.log(error.response.data.resultMessage.en)
      setResponseMessage("Error registering user");
      alert(error.response.data.resultMessage.en);
    }
  };

  return (
    <div className="login-main-containera">
      <div className="login-container">
        <form onSubmit={handleSubmit(onSubmitLoginForm)} className="login-form">
          <h4 className="welcome-heading">Welcome!</h4>
          <br />
          <div className="form-group email-group">
            <input
              type="email"
              style={{backgroundColor:'white'}}
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
              style={{backgroundColor:'white'}}
              
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@$%^&*])[^\s]{8,}$/,
                  message: "Password must contain at least one letter and one number",
                },
              })}
            />
            <span className="toggle-password" onClick={togglePasswordVisibility}>
              {showPassword ? <AiFillEye/> : <AiFillEyeInvisible />}
            </span>
            {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>
          {errors.password && <br />}
          <p className="forgot-password">
            <Link to="/forgot-password-link">Forgot password?</Link>
          </p>
          <button className="button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;