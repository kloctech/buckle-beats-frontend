// import React, { useEffect, useState } from "react";
// import api from "../../middleware/api";
// import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
// import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";
// import "../../styles/register/register.scss";
// import { Link,useNavigate,useSearchParams } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import cat from "../../assets/catIcon.gif";
// import bag from "../../assets/bagimage.gif";
// import cycle from "../../assets/bicycleICon.gif";
// import dog from "../../assets/dogIcon.gif";
// import toast from "react-hot-toast";
// import { FaCheckCircle } from "react-icons/fa";
// import Cookies from 'js-cookie'
// import { CircularProgress } from "@mui/material";
// import { emailRegex } from "../../utils/constants";
// const images = [bag, cycle, cat, dog];

// const RegisterForm = () => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isRegistred, setIsRegistred] = useState(false);
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     setError,
//     clearErrors,
//     formState: { errors },
//   } = useForm();

//  const [searchParams] = useSearchParams();
//   const redirectUrl = searchParams.get('redirect');
//   // const [redirectUrl ,setRedirectUrl] = useState(redirect)
//   const navigate = useNavigate()
//   useEffect(() => {
//     const imageInterval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 4000); // Change image every 7 seconds

//     return () => clearInterval(imageInterval);
//   }, []);
//  useEffect(() => {
//     const accessToken = Cookies.get("accessToken");
//     if (accessToken  ) {
//       if(redirectUrl){
//         navigate('/qr-scanner')
//       }
//       else{
//         navigate('/')
//       }
//     }
//   }, [navigate,redirectUrl]);
//   const getBackgroundClassName = () => {
//     switch (currentImageIndex) {
//       case 0:
//         return "background-iamge-container-steps";
//       case 1:
//         return "background-iamge-container-tyres";
//       case 2:
//       case 3:
//         return "background-iamge-container-paws";
//       default:
//         return "";
//     }
//   };

//   const getClassName = () => {
//     switch (currentImageIndex) {
//       case 0:
//         return "bag-gif";
//       case 1:
//         return "cycle-gif";
//       case 2:
//         return "cat-gif";
//       case 3:
//         return "dog-gif";
//       default:
//         return "";
//     }
//   };

//   const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[^\s]{8,32}$/;

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setConfirmPasswordVisible(!confirmPasswordVisible);
//   };

//   const password = watch("password");
//   const confirmPassword = watch("confirmPassword");

//   useEffect(() => {
//     if (confirmPassword && confirmPassword !== password) {
//       setError("confirmPassword", {
//         type: "validate",
//         message: "Passwords do not match",
//       });
//     } else {
//       clearErrors("confirmPassword");
//     }
//   }, [confirmPassword, password, setError, clearErrors]);

//   const onFormSubmit = async (data) => {
//     const url = process.env.REACT_APP_PRODUCTION_URL;
//     setLoading(true);
//     try {
//       const response = await api.post(`${url}/api/user`, {
//         name: data.name,
//         email: data.email,
//         password: data.password,
//         platform: "Android",
//       });
//       toast.success(response?.data?.resultMessage?.en, {
//         duration: 5000,
//       });
//       reset();
//       setIsRegistred(true);
//       setLoading(false);
//     } catch (error) {
//       toast.error(error.response.data.resultMessage.en, { duration: 5000 });
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="regestation-container">
//       {isRegistred ? (
//         <div className="form-container">
//           <FaCheckCircle className="verification-message"></FaCheckCircle>
//           {/* <h6 className="verify-message" style={{ color: "#E4E9F1" }}>Please check your email (and your Spam/Junk folder) to complete the verification process.<br />
//       ⚠️ If our email landed in Spam/Junk, please mark it as “Not Spam” so you can receive important updates — including any lost & found alerts</h6> */}
//         <h6 className="verify-message" style={{ color: "#E4E9F1" }}>
//           Please check your email (and your Spam/Junk folder) to complete the verification process.
//         </h6>
//         <h6 className=" warning-message">
//           ⚠️ If our email landed in Spam/Junk, please mark it as “Not Spam” so you can receive important updates — including any lost & found alerts
//         </h6>

//         </div>
//       ) : (
//         <div className="form-container">
//           <div className={`background-img ${getBackgroundClassName()}`}></div>
//           <h1 className="welcome-heading">Welcome!</h1>
//           <form onSubmit={handleSubmit(onFormSubmit)}>
//             <div className="form-group">
//               <input className="input-box" type="text" id="name" {...register("name", { required: "Name is required" })} placeholder="Name" />
//               {errors.name && <span className="error">{errors.name.message}</span>}
//             </div>
//             <div className="form-group">
//               <input
//                 className="input-box"
//                 // type="email"
//                 id="email"
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: emailRegex,
//                     message: "Invalid email address",
//                   },
//                 })}
//                 placeholder="Email"
//               />
//               {errors.email && <span className="error">{errors.email.message}</span>}
//             </div>
//             <div className="password-container form-group">
//               <input
//                 className="input-box"
//                 type={passwordVisible ? "text" : "password"}
//                 id="password"
//                 {...register("password", {
//                   required: "Password is required",
//                   pattern: {
//                     value: passwordRegex,
//                     message: "Password must be at least 8 characters contains a digit, an uppercase letter, and a special character.",
//                   },
//                 })}
//                 placeholder="Password"
//               />
//               <button type="button" className="show-password" onClick={togglePasswordVisibility}>
//                 {passwordVisible ? <VisibilityOffTwoToneIcon /> : <VisibilityTwoToneIcon />}
//               </button>
//               {errors.password && <span className="error">{errors.password.message}</span>}
//             </div>
//             <div className={`password-container form-group ${errors?.password?.message && errors?.password.message !== "Password is required" ? "with-error" : ""}`}>
//               <input
//                 className="input-box"
//                 type={confirmPasswordVisible ? "text" : "password"}
//                 id="confirmPassword"
//                 {...register("confirmPassword", {
//                   required: "Confirm Password is required",
//                   validate: (value) => value === watch("password") || "Passwords do not match",
//                 })}
//                 placeholder="Confirm Password"
//               />
//               <button type="button" className="show-password" onClick={toggleConfirmPasswordVisibility}>
//                 {confirmPasswordVisible ? <VisibilityOffTwoToneIcon /> : <VisibilityTwoToneIcon />}
//               </button>
//               {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
//             </div>
//             <div className="gif-image-container">
//               <img src={images[currentImageIndex]} className={`${getClassName()}`} alt="cycling images" />
//             </div>
//             <button type="submit" className="register-button">
//               {loading ? <CircularProgress size={25} sx={{ color: "white", display: "flex", alignItems: "center", justifyContent: "center", margin: "auto" }} /> : "SignUp"}
//             </button>
//             <p className="Login">
//               <Link  to={redirectUrl ? `/signin?redirect=${redirectUrl}` : '/signin'}>Already have an accout? SignIn</Link>
//             </p>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RegisterForm;
import React, { useEffect, useState } from "react";
import api from "../../middleware/api";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";
import "../../styles/register/register.scss";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import cat from "../../assets/catIcon.gif";
import bag from "../../assets/bagimage.gif";
import cycle from "../../assets/bicycleICon.gif";
import dog from "../../assets/dogIcon.gif";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import { CircularProgress } from "@mui/material";
import { emailRegex } from "../../utils/constants";

const images = [bag, cycle, cat, dog];

const RegisterForm = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isRegistred, setIsRegistred] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const navigate = useNavigate();

  /* IMAGE ROTATION */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  /* REDIRECT IF LOGGED IN */
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      redirectUrl ? navigate("/qr-scanner") : navigate("/");
    }
  }, [navigate, redirectUrl]);

  /* PASSWORD REGEX */
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[^\s]{8,32}$/;

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  /* LIVE VALIDATE CONFIRM PASSWORD */
  useEffect(() => {
    if (confirmPassword && confirmPassword !== password) {
      setError("confirmPassword", {
        type: "validate",
        message: "Passwords do not match",
      });
    } else {
      clearErrors("confirmPassword");
    }
  }, [confirmPassword, password, setError, clearErrors]);

  /* SUBMIT */
  const onFormSubmit = async (data) => {
    const url = process.env.REACT_APP_PRODUCTION_URL;
    setLoading(true);

    try {
      const response = await api.post(`${url}/api/user`, {
        name: data.name,
        email: data.email,
        password: data.password,
        platform: "Android",
      });

      toast.success(response?.data?.resultMessage?.en, { duration: 5000 });
      reset();
      setIsRegistred(true);
    } catch (error) {
      toast.error(error.response?.data?.resultMessage?.en || "Something went wrong", {
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  /* GIF CLASS */
  const getClassName = () => {
    switch (currentImageIndex) {
      case 0:
        return "bag-gif";
      case 1:
        return "cycle-gif";
      case 2:
        return "cat-gif";
      case 3:
        return "dog-gif";
      default:
        return "";
    }
  };

  return (
    <div className="regestation-container">
      {isRegistred ? (
        <div className="form-container">
          <FaCheckCircle className="verification-message" />

          <h6 className="verify-message" style={{ color: "#E4E9F1" }}>
            Please check your email (and Spam/Junk folder) to complete verification.
          </h6>

          <h6 className="warning-message">
            ⚠️ If our email landed in Spam/Junk, mark as “Not Spam” to receive alerts.
          </h6>
        </div>
      ) : (
        <div className="form-container">
          <h1 className="welcome-heading">Welcome!</h1>

          <form onSubmit={handleSubmit(onFormSubmit)}>
            {/* NAME */}
            <div className="form-group">
              <input
                className="input-box"
                placeholder="Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <span className="error">{errors.name.message}</span>}
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <input
                className="input-box"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: emailRegex, message: "Invalid email address" },
                })}
              />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>

            {/* PASSWORD */}
            <div className="password-container form-group">
              <input
                className="input-box"
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: passwordRegex,
                    message:
                      "Password must be at least 8 characters, include one digit, one uppercase letter, and one special character.",
                  },
                })}
              />
              <button
                type="button"
                className="show-password"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <VisibilityOffTwoToneIcon /> : <VisibilityTwoToneIcon />}
              </button>

              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="password-container form-group">
              <input
                className="input-box"
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                })}
              />
              <button
                type="button"
                className="show-password"
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              >
                {confirmPasswordVisible ? (
                  <VisibilityOffTwoToneIcon />
                ) : (
                  <VisibilityTwoToneIcon />
                )}
              </button>

              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword.message}</span>
              )}
            </div>

            {/* TERMS CHECKBOX */}
            <div className="form-group terms-checkbox">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  {...register("acceptTerms", {
                    required: "Please accept the Terms & Conditions",
                  })}
                />
                <p className="terms-text">
                  I have read and accept{" "}
                  <a
                    href="https://roamsmarttracker.co.uk/pages/terms-and-conditions"
                    target="_blank"
                                          rel="noopener noreferrer"

                  >
                    BucleBeats T&C’s

                  </a>
                </p>
              </label>

              {errors.acceptTerms && (
                <span className="error">{errors.acceptTerms.message}</span>
              )}
            </div>

            {/* NEWSLETTER CHECKBOX */}
            <div className="form-group terms-checkbox">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  {...register("acceptNewsletter", {
                    required: "Please accept to proceed",
                  })}
                />
                <p className="terms-text">
                  Subscribe to latest news & offers.No, we won't spam you- {" "}
                  <a
                    href="https://roamsmarttracker.co.uk/pages/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"                  >  

                    Unsubscribe anytime
                  </a>
                </p>
              </label>

              {errors.acceptNewsletter && (
                <span className="error">{errors.acceptNewsletter.message}</span>
              )}
            </div>

            {/* GIF */}
            <div className="gif-image-container">
              <img src={images[currentImageIndex]} className={getClassName()} alt="" />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={25} sx={{ color: "white", margin: "auto" }} />
              ) : (
                "SignUp"
              )}
            </button>

            <p className="Login">
              <Link to={redirectUrl ? `/signin?redirect=${redirectUrl}` : "/signin"}>
                Already have an account? SignIn
              </Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
