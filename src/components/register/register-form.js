import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../../styles/register/register.css";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:7000/api/user", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      alert("User registered successfully! Please check your email for verification.");
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Error registering user");
    }
  };

  return (
    <div className="register-form" style={{ width: "40vw", margin: "auto" }}>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input className="input-box" type="text" id="name" {...register("name", { required: "Name is required" })} />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            className="input-box"
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email is invalid",
              },
            })}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="password-input-container">
            <input
              className="input-box"
              type={showPassword ? "text" : "password"}
              id="password"
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
          </div>
          {errors.password && <span className="error">{errors.password.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            className="input-box"
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) => value === getValues("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
