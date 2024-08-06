import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../../styles/add-edit-qrcode/add-edit-qrcode.scss";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import SurveyForm from "../survey-form/survey-form";
import api from "../../middleware/api";

const AddQRCode = () => {
  const [loading] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [data, setData] = useState(null);
  const [categoryList, setCategoryList] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { id } = useParams();

  const onSubmitAddQRForm = async (data) => {
    setData(data);
    setNextPage(true);
  };

  const getCategories = async () => {
    try {
      const response = await api.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/qrcode/categories`);
      setCategoryList(response.data.categories);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="login-main-container add-qr">
      {!nextPage ? (
        <div className="login-container">
          <form onSubmit={handleSubmit(onSubmitAddQRForm)} className="login-form">
            <h1 className="welcome-heading">Add QR Details</h1>
            <div className="form-group-login name-group">
              <input
                id="name"
                name="name"
                placeholder="Name"
                {...register("name", {
                  required: "Name is required",
                  // pattern: {
                  //   value: /^[a-zA-Z\s'-]+$/,
                  //   message: "Invalid name",
                  // },
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
              <select
                {...register("country_code", {
                  required: "Country code is required",
                })}
              >
                <option value="+91">+91</option>
                <option value="+44">+44</option>
                <option value="+1">+1</option>
                <option value="+971">+971</option>
              </select>
              <input
                id="mobile_number"
                placeholder="Mobile"
                {...register("mobile_number", {
                  required: "Mobile Number is required",
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
                  required: "Category is required",
                })}
                defaultValue=""
              >
                <option value="" disabled>
                  Category
                </option>
                {categoryList.map((category, index) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && <span className="error-message">{errors.category.message}</span>}

            </div>
            <div>
              <textarea
                rows="4"
                className="add-qr-box"
                id="default_message"
                name="default_message"
                placeholder="Leave a note here, such as allergy information or care instructions. If your item is lost, this will help the finder take proper care of it and ensure its safe return"
                {...register("default_message", { required: "Default Message is required" })}
              />

            </div>
            {errors?.default_message && <span className="error-message-add-edit-qr-code">{errors.default_message.message}</span>}

            <div className="button-container">
              <button onClick={() => navigate("/")} type="button" className="cta-button delete-btn">
                Cancel
              </button>
              <button type="submit" className="cta-button edit-btn">
                {loading ? <CircularProgress size={25} sx={{ color: "white" }} /> : "Next"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <SurveyForm data={{ ...data, code: id }} />
      )}
    </div>
  );
};
export default AddQRCode;
