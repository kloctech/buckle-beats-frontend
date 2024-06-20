import React, { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import EnableQRCode from "../enable-qrcode/enable-qrcode";
import "../../styles/add-edit-qrcode/add-edit-qrcode.scss";

const EditQRCode = () => {
  const [qrcode, setQRcode] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [initialValues, setInitialValues] = useState({});

  const location = useLocation();
  const { qrCodeData } = location.state || {};
  const navigate = useNavigate();

  const url = process.env.REACT_APP_PRODUCTION_URL;
  const token = Cookies.get("accessToken");
  const categories = ["Electronics", "Fashion", "Pets", "Grocery"];
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
    control,
  } = useForm({
    defaultValues: {
      ...qrCodeData,
      mobile_number: mobileNumber,
      countryCode: countryCode,
    },
    mode: "onChange",
  });

  useEffect(() => {
    setValue("countryCode", countryCode);
    setValue("mobile_number", mobileNumber);
    setInitialValues({
      name: qrCodeData?.name,
      email: qrCodeData?.email,
      mobile_number: mobileNumber,
      countryCode: countryCode,
      category: qrCodeData?.category,
      default_message: qrCodeData?.default_message,
    });
  }, [countryCode, mobileNumber, setValue, qrCodeData]);

  const watchedValues = useWatch({ control });

  const isEdited = Object.keys(initialValues).some((key) => watchedValues[key] !== initialValues[key]);

  const onSubmitAddQRForm = async (data) => {
    const mobile_number = `${data.countryCode} ${data.mobile_number}`;
    const payload = {
      name: data?.name,
      email: data?.email,
      mobile_number: mobile_number,
      category: data?.category,
      default_message: data?.default_message || qrCodeData?.default_message,
    };
    try {
      const response = await axios.put(`${url}/api/qrcode/${qrCodeData?.qr_planet_id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success(response?.data?.resultMessage?.en, { duration: 5000 });
      navigate('/');
    } catch (error) {
      toast.error(error?.response?.data?.resultMessage?.en);
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
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.resultMessage.en);
    }
  };

  const handleConfirmDelete = () => {
    handleDeleteQRCode(); // Call delete function here
    handleClose(); // Close modal after deletion
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="login-main-container edit-qr">
      <div className="login-container">
        <form onSubmit={handleSubmit(onSubmitAddQRForm)} className="login-form">
          <div className="header-container">
            <BiArrowBack style={{ color: "#ffffff", fontSize: "20px", cursor: "pointer", marginBottom: "10px" }} onClick={handleClick} />
            <div style={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
              <h1 style={{ marginBottom: 10 }}>Edit QR Details</h1>
            </div>
          </div>

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
              type="tel"
              inputMode="numeric"
            />
            {errors.mobile_number && <span className="error-message">{errors.mobile_number.message}</span>}
          </div>

          <div className="form-group-login select-group">
            <select {...register("category")}>
              {categories?.map(
                (
                  category,
                  index // Ensure to use 'index' for unique keys
                ) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <textarea rows="4" className="add-qr-box" name="default_message" placeholder="Default Message" {...register("default_message")} />
            {errors.default_message && <span className="error-message">{errors.default_message.message}</span>}
          </div>

          <div className="button-row">
            <button type="button" onClick={() => handleOpen("test")} className="cta-button delete-btn">
              Delete
            </button>
            <button
              type="submit"
              className="cta-button edit-btn"
              style={{
                backgroundColor: isEdited ? "" : "#5aa895",
                cursor: isEdited ? "pointer" : "not-allowed",
              }}
              disabled={!isEdited}
            >
              Edit
            </button>
          </div>
        </form>
      </div>

      <EnableQRCode handleClose={handleClose} openModal={qrcode === "test"} closeModal={() => handleOpen("test")} id="test" heading="QR Deletion" text={`Delete this QR code is permanent. Confirm action?`} buttonText="Delete" onConfirm={handleConfirmDelete} />
    </div>
  );
};

export default EditQRCode;
