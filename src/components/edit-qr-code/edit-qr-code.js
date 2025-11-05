import React, { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import api from "../../middleware/api";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { CircularProgress } from "@mui/material";
import EnableQRCode from "../enable-qrcode/enable-qrcode";
import "../../styles/add-edit-qrcode/add-edit-qrcode.scss";
import Preloader from "../preloader/preloader";
import Cookies from "js-cookie";
import countryCodes from "../../data/countryCodes.json";
import { emailRegex } from "../../utils/constants";

const EditQRCode = () => {
  const [qrcode, setQRcode] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [initialValues, setInitialValues] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
   const [query, setQuery] = useState("");
  const [filteredCodes, setFilteredCodes] = useState(countryCodes);
  const [showDropdown, setShowDropdown] = useState(false);

  const location = useLocation();
  const { qrCodeData } = location.state || {};
  const navigate = useNavigate();
  const LoginId = location.state?.userId || Cookies.get("loginUser");

  const url = process.env.REACT_APP_PRODUCTION_URL;

  const extractCountryCodeAndNumber = (fullNumber = "") => {
    if (!fullNumber) return { countryCode: "", mobileNumber: "" };

    const parts = fullNumber.trim().split(/\s+/);

    // if it starts with + assume country code
    if (parts[0].startsWith("+")) {
      return {
        countryCode: parts[0],
        mobileNumber: parts.slice(1).join(" ") || "",
      };
    }

    // otherwise, no country code
    return {
      countryCode: "",
      mobileNumber: fullNumber.trim(),
    };
  };

  useEffect(() => {
    const filtered = countryCodes.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.code.includes(query)
    );
    setFilteredCodes(filtered);
  }, [query]);
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
    const getCategories = async () => {
      try {
        const response = await api.get(`${url}/api/qrcode/categories`);
        setCategoryList(response.data.categories);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, [url]);


useEffect(() => {
  if (!loading && qrCodeData?.mobile_number) {
    const { countryCode: code, mobileNumber: num } = extractCountryCodeAndNumber(qrCodeData.mobile_number);

    setValue("countryCode", code);
    setValue("mobile_number", num);
    setQuery(code);

    setInitialValues({
      name: qrCodeData?.name,
      email: qrCodeData?.email,
      mobile_number: num,
      countryCode: code,
      category: qrCodeData?.category,
      default_message: qrCodeData?.default_message,
    });
  }
}, [qrCodeData, loading, setValue]);


  const watchedValues = useWatch({ control });

  const isEdited = Object.keys(initialValues).some((key) => watchedValues[key] !== initialValues[key]);

  const onSubmitAddQRForm = async (data) => {
    setLoading(false)
    const mobile_number = `${data.countryCode} ${data.mobile_number}`;
    const payload = {
      name: data?.name,
      email: data?.email,
      mobile_number: mobile_number,
      category: data?.category,
      default_message: data?.default_message || qrCodeData?.default_message,
      survey_ans: data?.survey_ans || "",
    };
    try {
      const response = await api.put(`${url}/api/qrcode/${qrCodeData?.qr_planet_id}`, payload);
      toast.success(response?.data?.resultMessage?.en, { duration: 5000 });
      setLoading(false)
      navigate("/");
    } catch (error) {
      setLoading(false)

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
      const response = await api.delete(`${url}/api/qrcode/${qrCodeData?.qr_planet_id}`);
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

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="login-main-container edit-qr">
      <div className="login-container">
        <form onSubmit={handleSubmit(onSubmitAddQRForm)} className="login-form">
          <div className="header-container">
            <BiArrowBack style={{ color: "#ffffff", fontSize: "20px", cursor: "pointer", marginBottom: "10px" }} onClick={handleClick} />
            <div style={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
              <h1 style={{ marginBottom: 10 }} className="welcome-heading">Edit QR Details</h1>
            </div>
          </div>

          <div className="form-group-login name-group">
            <input
              name="name"
              placeholder="Name of item"
              {...register("name", {
                required: "Name of item is required",
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
                  value: emailRegex,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>

     
            <div className="form-group-login mobile-group">           
            <div className="custom-select-wrapper">            
              <input  style={{fontSize:"16px"}}
              maxLength={6}

               type="text"
                placeholder="+"
                value={query}
               onChange={(e) => {
              const value = e.target.value;

              // Allow only "+", digits, and spaces
              if (/^[+\d\s]*$/.test(value)) {
                setQuery(value);
                setValue("countryCode", value);
              }

              setShowDropdown(true);
            }}

                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              />
              {showDropdown && (
                <ul className="dropdown-list">
                  {filteredCodes.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setQuery(item.code);
                        setValue("countryCode", item.code);
                        setShowDropdown(false);
                      }}
                    >
                      {item.code}
                    </li>
                  ))}
                </ul>
              )}
              <input
                type="hidden"
                {...register("countryCode")}
                value={query}
              />
              {errors.country_code && (
                <span className="error-message">{errors.country_code.message}</span>
              )}
            </div>

            <input
              id="mobile_number"
              placeholder="Mobile"
              {...register("mobile_number")}
            />
            {errors.mobile_number && (
              <span className="error-message">{errors.mobile_number.message}</span>
            )}

          </div>

          <div className="form-group-login select-group">
            <select {...register("category", {
                  required: "Category is required",
                })}>
              {categoryList?.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && <span className="error-message">{errors.category.message}</span>}

          </div>

          <div>
            <textarea rows="4" className="add-qr-box" name="default_message"                 
            placeholder="Leave a note here, such as allergy information or care instructions. If your item is lost, this will help the finder take proper care of it and ensure its safe return"
            {...register("default_message", { required: "Default Message is required" })}/>
            {errors.default_message && <span className="error-message-add-edit-qr-code">{errors.default_message.message}</span>}
          </div>

            <div className="button-row" style={{ display: 'flex', justifyContent: qrCodeData?.user_id === LoginId ? 'space-between' : 'center', alignItems: 'center' }}>
            {qrCodeData?.user_id === LoginId && (
              <button type="button" onClick={() => handleOpen("test")} className="cta-button delete-btn">
                Delete
              </button>
            )}

            <button
              type="submit"
              className="cta-button edit-btn"
              style={{
                backgroundColor: isEdited ? "" : "#8ca58f",
                cursor: isEdited ? "pointer" : "not-allowed",
              }}
              disabled={!isEdited}
            >
              {loading ? (
                <CircularProgress size={25} sx={{ color: "white", display: "flex", alignItems: "center", justifyContent: "center", margin: "auto" }} />
              ) : (
                "Update"
              )}
            </button>
          </div>

        </form>
      </div>

      <EnableQRCode handleClose={handleClose} openModal={qrcode === "test"} closeModal={() => handleOpen("test")} id="test" heading="QR Deletion" text={`Delete this QR code is permanent. Confirm action?`} buttonText="Delete" onConfirm={handleConfirmDelete} />
    </div>
  );
};

export default EditQRCode;
