import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";
import { useNavigate } from "react-router-dom";
import '../../styles/update-passwor/update-password.scss'

const UpdatePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const newPassword = watch("newPassword", "");

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@$%^&*])[^\s]{8,}$/;

  const handlePasswordUpdate = async (data) => {
    const payload = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    const accessToken = Cookies.get("accessToken");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PRODUCTION_URL}/api/user/change-password`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success(response.data.resultMessage.en, { duration: 5000 });
      reset();
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.resultMessage?.en, { duration: 5000 });
    }
  };
  return (
    <div  className="update-password">
      <h1>Update Password</h1>
      <form onSubmit={handleSubmit(handlePasswordUpdate)}>
        <div className="input-field password-field form-group">
          <input
            type={showOldPassword ? "text" : "password"}
            placeholder="Old Password"
            {...register("oldPassword", { required: "Old Password is required" })}
          />
          <div className="eye-icon" onClick={() => setShowOldPassword(!showOldPassword)}>
            {showOldPassword ? <VisibilityOffTwoToneIcon /> : <VisibilityTwoToneIcon />}
          </div>
          {errors.oldPassword && <p className="err-msg">{errors.oldPassword.message}</p>}
        </div>
        <div className="input-field password-field">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
            {...register("newPassword", {
              required: "New Password is required",
              pattern: {
                value: passwordRegex,
                message: "Password must be at least 8 characters long and contain a digit, an uppercase letter, and a special character.",
              },
            })}
          />
          <div className="eye-icon" onClick={() => setShowNewPassword(!showNewPassword)}>
            {showNewPassword ? <VisibilityOffTwoToneIcon /> : <VisibilityTwoToneIcon />}
          </div>
          {errors.newPassword && <p className="err-msg">{errors.newPassword.message}</p>}
        </div>
        <div
          className={`input-field password-field ${
            errors?.newPassword  && errors.newPassword.message !=="New Password is required" ? "error-margin-top" : ""
          }`}
        >
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) => value === newPassword || "The passwords do not match",
            })}
          />
          <div className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <VisibilityOffTwoToneIcon /> : <VisibilityTwoToneIcon />}
          </div>
          {errors.confirmPassword && <p className="err-msg">{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdatePassword;
