import React, { useState } from "react";
import "../../styles/delete-account/delete-account.scss";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

import axios from "axios";
import { useNavigate } from "react-router-dom";
const DeleteAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm();
  const [checkboxes, setCheckboxes] = useState({
    first: false,
    second: false,
    third: false,
  });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const handleCheckboxChange = (e) => {
    setCheckboxes({
      ...checkboxes,
      [e.target.name]: e.target.checked,
    });
  };

  const allChecked = checkboxes.first && checkboxes.second && checkboxes.third;

  const togglePasswordVisibility = () => {
    if (allChecked) {
      setShowPassword(!showPassword);
    }
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@$%^&*])[^\s]{8,}$/;

  // const validatePassword = (value) => {
  //   return passwordRegex.test(value);
  // };

  const handlePasswordChange = async (e) => {
    setPassword(e.target.value);
    setValue("password", e.target.value); 
    await trigger("password"); 
  };  

  const onSubmit = async (data) => {
    const token =  Cookies.get("accessToken");

    try {
      const response = await axios.delete(
      `${process.env.REACT_APP_PRODUCTION_URL}/api/user`,
        
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            "x-user-password": password, 
          
          },
        }
      );
      if (response) {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("userId")
      Cookies.remove("userName")
      Cookies.remove("userEmail")

      toast.success(response?.data?.resultMessage?.en, { duration: 5000 });
      navigate('/register')
      }
     

    } catch (error) {
      toast.error(error?.response?.data?.resultMessage?.en);
    }
  };
  return (
    <div className="delete-account">
      <form className="account-form" onSubmit={handleSubmit(onSubmit)}>
        <p>Please read carefully: Action may be required to account deletion</p>
        <div className="form-group-login checkbox-group">
          <label className="checkbox-text">
            My Buckle Beats will no longer work and cannot be reactivated.
            <input
              type="checkbox"
              name="first"
              checked={checkboxes.first}
              onChange={handleCheckboxChange}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="form-group-login checkbox-group">
          <label className="checkbox-text">
            Deleting my BuckleBeats account is permanent,{" "}
            <span className="text-box">and cannot be undone.</span>
            <input
              type="checkbox"
              name="second"
              checked={checkboxes.second}
              onChange={handleCheckboxChange}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="form-group-login checkbox-group">
          <label className="checkbox-text text-box">
            Account deletion will remove my account details and personal
            information. Tile may need to retain certain data, see Tile's
            privacy Policy for more information.
            <input
              type="checkbox"
              name="third"
              checked={checkboxes.third}
              onChange={handleCheckboxChange}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className='input-field password-field'  style={{ marginBottom: errors.password ? '0rem' : '' }}>
        <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: passwordRegex,
                message:
                  "Password must be at least 8 characters, contain a digit, an uppercase letter, and a special character.",
              },
            })}
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            disabled={!allChecked}
          />
          {showPassword ? (
            <span className="eye-icon" onClick={togglePasswordVisibility} >
              <VisibilityOffTwoToneIcon  disabled ={!allChecked} style={{cursor: allChecked ? 'pointer' :'not-allowed'}}/>
            </span>
          ) : (
            <span className="eye-icon" onClick={togglePasswordVisibility} disabled ={!allChecked} >
              <VisibilityTwoToneIcon style={{cursor: allChecked ? 'pointer' :'not-allowed'}} />
            </span>
          )}
        </div>
        {errors.password && (
          <span className="delete-account-error">{errors.password.message}</span>
        )}
        <button
          type="submit"
          disabled={!allChecked || !password}
          style={{ cursor: allChecked && password ? "pointer" : "not-allowed" }}
        >
          I Agree. Delete.
        </button>
      </form>
    </div>
  );
};

export default DeleteAccount;
