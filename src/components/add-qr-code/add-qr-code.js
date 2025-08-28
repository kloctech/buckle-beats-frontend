
// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import "../../styles/add-edit-qrcode/add-edit-qrcode.scss";
// import { useNavigate, useParams } from "react-router-dom";
// import { CircularProgress } from "@mui/material";
// import SurveyForm from "../survey-form/survey-form";
// import api from "../../middleware/api";
// import countryCodes from "../../data/countryCodes.json";

// const AddQRCode = () => {
//   const [loading] = useState(false);
//   const [nextPage, setNextPage] = useState(false);
//   const [data, setData] = useState(null);
//   const [categoryList, setCategoryList] = useState([]);
//   const [query, setQuery] = useState("");
//   const [filteredCodes, setFilteredCodes] = useState(countryCodes);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   const navigate = useNavigate();
//   const { id } = useParams();

//   const onSubmitAddQRForm = async (data) => {
//     setData(data);
//     setNextPage(true);
//   };

//   const getCategories = async () => {
//     try {
//       const response = await api.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/qrcode/categories`);
//       setCategoryList(response.data.categories);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getCategories();
//   }, []);

//   useEffect(() => {
//     // Filter codes when user types
//     const filtered = countryCodes.filter(
//       (c) =>
//         c.name.toLowerCase().includes(query.toLowerCase()) ||
//         c.code.includes(query)
//     );
//     setFilteredCodes(filtered);
//   }, [query]);

//   return (
//     <div className="login-main-container add-qr">
//       {!nextPage ? (
//         <div className="login-container">
//           <form onSubmit={handleSubmit(onSubmitAddQRForm)} className="login-form">
//             <h1 className="welcome-heading">Add QR Details</h1>

//             {/* --- NAME --- */}
//             <div className="form-group-login name-group">
//               <input
//                 id="name"
//                 placeholder="Name of item"
//                 {...register("name", { required: "Name of item is required" })}
//               />
//               {errors.name && <span className="error-message">{errors.name.message}</span>}
//             </div>

//             {/* --- EMAIL --- */}
//             <div className="form-group-login email-group">
//               <input
//                 id="email"
//                 placeholder="Email"
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
//                     message: "Invalid email address",
//                   },
//                 })}
//               />
//               {errors.email && <span className="error-message">{errors.email.message}</span>}
//             </div>

//             {/* --- COUNTRY CODE + MOBILE --- */}
//             <div className="form-group-login mobile-group">
//               <div className="custom-select-wrapper">
//                 <input
//                   type="text"
//                   placeholder="+"
//                   value={query}  maxLength={5}

//                   onChange={(e) => {
//                     const value = e.target.value;
//                         if (/^\+?[0-9]*$/.test(value)) {
//                           setQuery(value); // Only update state if value is valid
//                         }
//                     // setQuery(e.target.value);
//                     setShowDropdown(true);
//                     setValue("country_code", e.target.value); // sync with form
//                   }}
//                   onFocus={() => setShowDropdown(true)}
//                   onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
//                 />
//                 {showDropdown && (
//                   <ul className="dropdown-list">
//                     {filteredCodes.map((item, index) => (
//                       <li
//                         key={index}
//                         onClick={() => {
//                           setQuery(item.code);
//                           setValue("country_code", item.code); // update react-hook-form
//                           setShowDropdown(false);
//                         }}
//                       >
//                         {item.code}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//                 {/* <input
//                   type="hidden"
//                   {...register("country_code", {
//                     // required: "Country code is required",
//                   })}
//                   value={query}
//                 />
//                 {errors.country_code && (
//                   <span className="error-message">{errors.country_code.message}</span>
//                 )} */}
//               </div>

//               <input
//                 id="mobile_number"
//                 placeholder="Mobile"
//                 {...register("mobile_number", {
//                   // required: "Mobile Number is required",
//                   pattern: {
//                     value: /^[0-9]{10}$/,
//                     message: "Invalid mobile number",
//                   },
//                 })}
//               />
//               {errors.mobile_number && (
//                 <span className="error-message">{errors.mobile_number.message}</span>
//               )}
//             </div>

//             {/* --- CATEGORY --- */}
//             <div className="form-group-login select-group">
//               <select
//                 {...register("category", { required: "Category is required" })}
//                 defaultValue=""
//               >
//                 <option value="" disabled>Category</option>
//                 {categoryList.map((category, index) => (
//                   <option key={category._id} value={category.name}>
//                     {category.name}
//                   </option>
//                 ))}
//               </select>
//               {errors.category && <span className="error-message">{errors.category.message}</span>}
//             </div>

//             {/* --- MESSAGE --- */}
//             <div>
//               <textarea
//                 rows="4"
//                 className="add-qr-box"
//                 placeholder="Leave a note here..."
//                 {...register("default_message", {
//                   required: "Default Message is required",
//                 })}
//               />
//               {errors.default_message && (
//                 <span className="error-message-add-edit-qr-code">
//                   {errors.default_message.message}
//                 </span>
//               )}
//             </div>

//             {/* --- BUTTONS --- */}
//             <div className="button-container">
//               <button
//                 onClick={() => navigate("/")}
//                 type="button"
//                 className="cta-button delete-btn"
//               >
//                 Cancel
//               </button>
//               <button type="submit" className="cta-button edit-btn">
//                 {loading ? (
//                   <CircularProgress size={25} sx={{ color: "white" }} />
//                 ) : (
//                   "Next"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       ) : (
//         <SurveyForm data={{ ...data, code: id }} />
//       )}
//     </div>
//   );
// };

// export default AddQRCode;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../../styles/add-edit-qrcode/add-edit-qrcode.scss";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import SurveyForm from "../survey-form/survey-form";
import api from "../../middleware/api";
import countryCodes from "../../data/countryCodes.json";

const AddQRCode = () => {
  const [loading] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [data, setData] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [query, setQuery] = useState(""); // for filtering + displaying
  const [filteredCodes, setFilteredCodes] = useState(countryCodes);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      country_code: "", // default value
      mobile_number: "",
      category: "",
      default_message: "",
    },
  });

  const onSubmitAddQRForm = async (formData) => {
    setData(formData);
    setNextPage(true);
  };

  const getCategories = async () => {
    try {
      const response = await api.get(
        `${process.env.REACT_APP_PRODUCTION_URL}/api/qrcode/categories`
      );
      setCategoryList(response.data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  const getExistingQR = async () => {
    if (!id) return;
    try {
      const response = await api.get(
        `${process.env.REACT_APP_PRODUCTION_URL}/api/qrcode/${id}`
      );
      const qrData = response.data;

      // Set form values
      Object.keys(qrData).forEach((key) => {
        if (qrData[key]) setValue(key, qrData[key]);
      });

      // Set query state so input shows country code
      if (qrData.country_code) {
        setQuery(qrData.country_code);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
    getExistingQR();
  }, []);

  // filter country codes when query changes
  useEffect(() => {
    const filtered = countryCodes.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.code.includes(query)
    );
    setFilteredCodes(filtered);
  }, [query]);

  const selectedCountryCode = watch("country_code");

  return (
    <div className="login-main-container add-qr">
      {!nextPage ? (
        <div className="login-container">
          <form
            onSubmit={handleSubmit(onSubmitAddQRForm)}
            className="login-form"
          >
            <h1 className="welcome-heading">Add QR Details</h1>

            {/* --- NAME --- */}
            <div className="form-group-login name-group">
              <input
                id="name"
                placeholder="Name of item"
                {...register("name", { required: "Name of item is required" })}
              />
              {errors.name && (
                <span className="error-message">{errors.name.message}</span>
              )}
            </div>

            {/* --- EMAIL --- */}
            <div className="form-group-login email-group">
              <input
                id="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>

            {/* --- COUNTRY CODE + MOBILE --- */}
            <div className="form-group-login mobile-group">
              <div className="custom-select-wrapper">
                <input
                  type="text"
                  placeholder="+"
                  value={query || selectedCountryCode}
                  maxLength={5}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\+?[0-9]*$/.test(value)) { }
                      setQuery(value);
                      setValue("country_code", value); // sync with form
                   
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
                          setValue("country_code", item.code); // update react-hook-form
                          setShowDropdown(false);
                        }}
                      >
                        {item.code}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <input
                id="mobile_number"
                placeholder="Mobile"
                {...register("mobile_number", {
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid mobile number",
                  },
                })}
              />
              {errors.mobile_number && (
                <span className="error-message">
                  {errors.mobile_number.message}
                </span>
              )}
            </div>

            {/* --- CATEGORY --- */}
            <div className="form-group-login select-group">
              <select
                {...register("category", { required: "Category is required" })}
                defaultValue=""
              >
                <option value="" disabled>
                  Category
                </option>
                {categoryList.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="error-message">
                  {errors.category.message}
                </span>
              )}
            </div>

            {/* --- MESSAGE --- */}
            <div>
              <textarea
                rows="4"
                className="add-qr-box"
                placeholder="Leave a note here..."
                {...register("default_message", {
                  required: "Default Message is required",
                })}
              />
              {errors.default_message && (
                <span className="error-message-add-edit-qr-code">
                  {errors.default_message.message}
                </span>
              )}
            </div>

            {/* --- BUTTONS --- */}
            <div className="button-container">
              <button
                onClick={() => navigate("/")}
                type="button"
                className="cta-button delete-btn"
              >
                Cancel
              </button>
              <button type="submit" className="cta-button edit-btn">
                {loading ? (
                  <CircularProgress size={25} sx={{ color: "white" }} />
                ) : (
                  "Next"
                )}
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
