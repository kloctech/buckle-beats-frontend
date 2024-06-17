import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../../styles/add-edit-qrcode/add-edit-qrcode.scss";
import EnableQRCode from "../enable-qrcode/enable-qrcode";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditQRCode = () => {
  const [qrcode, setQRcode] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const location = useLocation();
  const { qrCodeData } = location.state || {};
  const navigate = useNavigate();
  const url = process.env.REACT_APP_PRODUCTION_URL;
  const token = Cookies.get("accessToken");

  const extractCountryCodeAndNumber = (mobileNumber) => {
    const match = mobileNumber.match(/^(\+\d{1,4})\s*(\d{10})$/);
    if (match) {
      return {
        countryCode: match[1],
        mobileNumber: match[2],
      };
    }
    return {
      countryCode: "",
      mobileNumber: mobileNumber,
    };
  };

  const { countryCode, mobileNumber } = extractCountryCodeAndNumber(qrCodeData?.mobile_number || "");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      ...qrCodeData,
      mobile_number: mobileNumber,
      countryCode: countryCode,
    },
    mode: "onChange", // Set validation mode to onChange
  });

  useEffect(() => {
    setValue("countryCode", countryCode);
    setValue("mobile_number", mobileNumber);
  }, [countryCode, mobileNumber, setValue]);

  const onSubmitAddQRForm = async (data) => {
    const mobile_number = `${data.countryCode} ${data.mobile_number}`;
    const payload = {
      name: data.name,
      email: data.email,
      mobile_number: mobile_number,
      category: data.category,
      default_message: data.default_message || qrCodeData?.default_message,
    };
    try {
      const response = await axios.put(`${url}/api/qrcode/${qrCodeData?.qr_planet_id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      toast.success(response.data.resultMessage.en, { duration: 5000 });
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.resultMessage.en)
    }
  };

  const handleOpen = async (id) => {
    if (activeId !== id) {
      setQRcode(id);
      setActiveId(id);
    } else {
      setQRcode(null);
      setActiveId(null);
    }
  };

  const handleClose = () => {
    setQRcode(null);
    setActiveId(null);
  };

  const handleDeleteQRCode = async () => {
    try {
      const response = await axios.delete(`${url}/api/qrcode/${qrCodeData?.qr_planet_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.resultMessage.en, { duration: 5000 });
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.resultMessage.en)
    }
  };

  const handleConfirmDelete = () => {
    handleDeleteQRCode(); // Call delete function here
    handleClose(); // Close modal after deletion
  };

  return (
    <div className="login-main-container edit-qr">
      <div className="login-container">
        <form onSubmit={handleSubmit(onSubmitAddQRForm)} className="login-form">
          <h1>Edit QR Details</h1>
          <div className="form-group-login name-group">
            <input
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
            <select {...register("countryCode")}>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+971">+971</option>
            </select>
            <input
              id="mobile_number"
              name="mobile_number"
              placeholder="Mobile"
              {...register("mobile_number", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid mobile number",
                },
              })}
              type="tel" // Specify input type as tel to trigger numeric keyboard on mobile
              inputMode="numeric" // Set input mode to numeric to restrict keyboard to numbers
            />
            {errors.mobile_number && <span className="error-message">{errors.mobile_number.message}</span>}
          </div>

          <div className="form-group-login select-group">
            <select {...register("category")}>
              <option value="" disabled>Category</option>
              <option value="A">Category A</option>
              <option value="B">Category B</option>
            </select>
          </div>

          <div>
            <textarea
              rows="4"
              className="add-qr-box"
              name="default_message"
              placeholder="Default Message"
              {...register("default_message", {
                required: "Default message is required",
              })}
            />
            {errors.default_message && <span className="error-message">{errors.default_message.message}</span>}
          </div>

          <div className="button-row">
            <button type="button" onClick={() => handleOpen("test")} className="cta-button delete-btn">Delete</button>
            <button type="submit" className="cta-button edit-btn">Edit</button>
          </div>
        </form>
      </div>

      {/* Modal for QR deletion */}
      <EnableQRCode
        handleClose={handleClose}
        openModal={qrcode === "test"}
        closeModal={() => handleOpen("test")}
        id="test"
        heading="QR Deletion"
        text={`Delete this QR code is permanent. Confirm action?`}
        buttonText="Delete"
        onConfirm={handleConfirmDelete} // Add onConfirm prop to handle delete
      />
    </div>
  );
};

export default EditQRCode;
