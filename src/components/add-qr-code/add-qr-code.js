import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "../../styles/add-edit-qrcode/add-edit-qrcode.scss";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const AddQRCode = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const countryCodeRef = useRef();

  const { id } = useParams();

  const onSubmitAddQRForm = async (data) => {
    setLoading(true);
    data.mobile_number = `${countryCodeRef.current.value} ${data.mobile_number}`;
    data.code = id;

    const api = `${process.env.REACT_APP_PRODUCTION_URL}/api/qrcode/register`;
    const accessToken = Cookies.get("accessToken");

    try {
      const response = await axios.post(api, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      navigate("/");
      toast.success(response.data.resultMessage.en, { duration: 5000 });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.resultMessage.en, { duration: 5000 });
    }
  };

  return (
    <div className="login-main-container add-qr">
      <div className="login-container">
        <form onSubmit={handleSubmit(onSubmitAddQRForm)} className="login-form">
          <h1>Add QR Details</h1>
          <div className="form-group-login name-group">
            <input
              id="name"
              name="name"
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[a-zA-Z\s'-]+$/,
                  message: "Invalid name",
                },
              })}
            />
            {errors.name && <span className="error-message">{errors.name.message}</span>}
          </div>

          <div className="form-group-login email-group">
            <input
              id="email"
              name="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>
          <div className="form-group-login mobile-group">
            <select ref={countryCodeRef}>
              <option value="+44">+44</option>
              <option value="+1">+1</option>
              <option value="+971">+971</option>
            </select>
            <input
              id="mobile_number"
              placeholder="Mobile"
              {...register("mobile_number", {
                required: false,
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid mobile number",
                },
              })}
            />
            {errors.mobile_number && <span className="error-message">{errors.mobile_number.message}</span>}
          </div>
          <div className="form-group-login select-group">
            <select
              {...register("category", {
                required: false,
              })}
              defaultValue=""
            >
              <option value="" disabled>
                Category
              </option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Pets">Pets</option>
              <option value="grocery">Grocery</option>
            </select>
          </div>
          <div>
            <textarea
              rows="4"
              className="add-qr-box"
              id="default_message"
              name="default_message"
              placeholder="Leave a note here, such as allergy information or care instructions. If your item is lost, this will help the finder take proper care of it and ensure its safe return"
              {...register("default_message", { required: false })}
            />
          </div>
          <div className="button-container">
            <button onClick={() => navigate("/")} type="button" className="cta-button delete-btn">
              Cancel
            </button>
            <button type="submit" className="cta-button edit-btn">
              {loading ? <CircularProgress size={25} sx={{ color: "white" }} /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddQRCode;
