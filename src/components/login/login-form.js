import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../styles/login/login.css";
import { Link } from "react-router-dom";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmitLoginForm = (data) => {
    console.log(data);
  };

  return (
    <div className="login-main-container">
      <div className="login-container">
        <form onSubmit={handleSubmit(onSubmitLoginForm)} className="login-form">
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
                  message: "Password must contain at least one letter and one number",
                },
              })}
            />
            {/* //"👁️" "🙈"*/}
            <span className="toggle-password" onClick={togglePasswordVisibility}>
              {showPassword ? <VisibilityOffTwoToneIcon /> : <VisibilityTwoToneIcon />}
            </span>
            {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>
          {errors.password && <br />}
          <p className="forgot-password">
            <Link to="/forgot-password">Forgot password?</Link>
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
