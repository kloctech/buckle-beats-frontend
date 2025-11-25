import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";
import '../../styles/forgot-password/forgot-password.scss';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [token, setToken] = useState("");

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  // ⭐ FIX: define missing variables
  const passwordHasValue = !!password;
  const confirmPasswordHasValue = !!confirmPassword;

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setToken(searchParams.get("token"));
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (confirmPassword && confirmPassword !== password) {
      setError("confirmPassword", {
        type: "validate",
        message: "Passwords do not match"
      });
    } else {
      clearErrors("confirmPassword");
    }
  }, [confirmPassword, password, setError, clearErrors]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const onSubmit = async (data) => {
    const url = process.env.REACT_APP_PRODUCTION_URL;

    try {
      const response = await axios.post(
        `${url}/api/user/forgot-password`,
        { password: data.password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.resultMessage.en, { duration: 5000 });
      reset();
      navigate("/signin");
    } catch (error) {
      toast.error(error.response?.data?.resultMessage?.en, {
        duration: 5000,
      });
    }
  };

  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[^\s]{8,}$/;

  return (
    <div className="forgot-password-main-container">
      <div className="forgot-password-form">
        <h1 className="welcome-heading">Forgot Password</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Password */}
          <div className="form-group-reg password-container">
            <input
              className="input-box"
              type={passwordVisible ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: passwordRegex,
                  message:
                    "Password must be at least 8 characters long, contain a digit, an uppercase letter, a lowercase letter, and a special character",
                },
              })}
              placeholder="New Password"
            />

            <button
              type="button"
              className="show-password"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible || !passwordHasValue ? (
                <VisibilityTwoToneIcon />
              ) : (
                <VisibilityOffTwoToneIcon />
              )}
            </button>

            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="password-container form-group">
            <input
              className="input-box"
              type={confirmPasswordVisible ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              placeholder="Confirm Password"
            />

            <button
              type="button"
              className="show-password"
              onClick={toggleConfirmPasswordVisibility}
            >
              {confirmPasswordVisible || !confirmPasswordHasValue ? (
                <VisibilityTwoToneIcon />
              ) : (
                <VisibilityOffTwoToneIcon />
              )}
            </button>

            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword.message}</span>
            )}
          </div>

          <button className="for-got-password-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
