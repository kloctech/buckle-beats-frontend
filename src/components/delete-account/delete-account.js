import React, { useState } from "react";
import "../../styles/delete-account/delete-account.scss";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { CircularProgress } from "@mui/material";

import axios from "axios";
import { useNavigate } from "react-router-dom";
const DeleteAccount = () => {
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      checkboxes: {
        first: false,
        second: false,
        third: false,
      },
    },
  });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checkboxError, setcheckboxError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const watchedCheckboxes = watch('checkboxes');

  const allChecked = watchedCheckboxes.first && watchedCheckboxes.second && watchedCheckboxes.third;

  const togglePasswordVisibility = () => {
    if (allChecked) {
      setShowPassword(!showPassword);
    }
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[^\s]{8,}$/;

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
    setLoading(true)
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
      setLoading(false)
      navigate('/signup')
      }
     

    } catch (error) {
      toast.error(error?.response?.data?.resultMessage?.en);
      setLoading(false)
    }
  };
  const onError =  () => {
    if(!allChecked){
      setcheckboxError(true);
    }
  }
  return (
    <div className="delete-account">
      <form className="account-form" onSubmit={handleSubmit(onSubmit, onError)}>
        <p>Please read carefully: Action may be required to account deletion</p>
        {checkboxError && !allChecked && <span className="delete-account-error checkbox-error">Please check all the boxes</span>}
        <Controller
        name="checkboxes.first"
        control={control}
        render={({ field }) => (
          <div className="form-group-login checkbox-group">
          <label className="checkbox-text">
            My Roam Smart Tracker will no longer work and cannot be reactivated.
            <input
              type="checkbox"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
            <span className="checkmark"></span>
          </label>
        </div>
           
        )}
      />
        <Controller
        name="checkboxes.second"
        control={control}
        render={({ field }) => (
          <div className="form-group-login checkbox-group">
          <label className="checkbox-text">
            Deleting my Roam Smart Tracker account is permanent,{" "}
            <span className="text-box">and cannot be undone.</span>
            <input
              type="checkbox"
              name="second"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        )}
      />
      <Controller
        name="checkboxes.third"
        control={control}
        render={({ field }) => (
          <div className="form-group-login checkbox-group">
          <label className="checkbox-text text-box">
            Account deletion will remove my account details and personal
            information. Tile may need to retain certain data, see Tile's
            privacy Policy for more information.
            <input
              type="checkbox"
              name="third"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        )}
      />
        <div className='input-field password-field'  style={{ marginBottom: errors.password ? '0rem' : '' }}>
        <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: passwordRegex,
                message:
                  "Password must be at least 8 characters, contains a digit, an uppercase letter, and a special character.",
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
        >
          {loading ? <CircularProgress size={25} sx={{ color: "white", display: "flex", alignItems: "center", justifyContent: "center", margin: "auto" }} /> : "I Agree. Delete"}
        </button>
      </form>
    </div>
  );
};

export default DeleteAccount;
