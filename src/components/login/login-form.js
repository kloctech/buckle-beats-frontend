import React, { useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import "../../styles/login/login.scss";
import { Link, useNavigate,useSearchParams } from "react-router-dom";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";
import cat from "../../assets/catIcon.gif";
import bag from "../../assets/bagimage.gif";
import cycle from "../../assets/bicycleICon.gif";
import dog from "../../assets/dogIcon.gif";
import { CircularProgress } from "@mui/material";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import api from "../../middleware/api";
const images = [bag, cycle, cat, dog];
const classNames = ["background-steps", "background-cycle-route", "background-paws", "background-paws"];

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect');
  const navigate = useNavigate();
// console.log(redirect)
  const getImageClassName = () => {
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

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      if(redirectUrl){
        navigate('/qr-scanner')
      }
      else{
        navigate("/")
      }
    }
  }, [navigate,redirectUrl]);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(imageInterval);
  }, []);

  const onSubmitLoginForm = async (data) => {
    const API = `${process.env.REACT_APP_PRODUCTION_URL}/api/user/login`;
    setLoading(true);
    const accessTokenExpirationTime = 7;
    const refreshTokenExpirationTime = 7;

    try {
      const response = await api.post(API, data);
      const { accessToken, refreshToken } = response.data;

      toast.success(response.data.resultMessage.en, { duration: 5000 });

      Cookies.set("accessToken", accessToken, { expires: accessTokenExpirationTime });
      Cookies.set("refreshToken", refreshToken, { expires: refreshTokenExpirationTime });
      Cookies.set("userId", response.data.user._id, { expires: accessTokenExpirationTime });
      Cookies.set("userName", response?.data?.user?.name, { expires: accessTokenExpirationTime });
      Cookies.set("userEmail", response?.data?.user?.email, { expires: accessTokenExpirationTime });
      Cookies.set("loginUser", response.data.user._id, { expires: accessTokenExpirationTime });
      setLoading(false);

      // navigate("/qr-scanner", { state: { userId: response.data.user._id } });
      if (redirectUrl) {
        navigate("/qr-scanner", { state: { userId:response?.data?.user._id } });
    } else {
        // Otherwise, navigate to the homepage
        navigate("/manage-profile", { state: { userId:response?.data?.user._id } });
    }
    } catch (error) {
      toast.error(error.response?.data?.resultMessage?.en, { duration: 5000 });
      setLoading(false);
    }
  };

  return (
    <div className="login-main-container">
      <div className="login-container">
        <form onSubmit={handleSubmit(onSubmitLoginForm)} className="login-form">
          <div className={`login-container background-common-styles ${classNames[currentImageIndex]}`}></div>
          <h4 className="welcome-heading">Welcome!</h4>
          <br />
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
          <div className="form-group-login password-group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[^\s]{8,}$/,
                  message: "Password needs a number, an uppercase letter, and a symbol.",
                },
              })}
            />
            <span className="toggle-password" onClick={togglePasswordVisibility}>
              {showPassword ? <VisibilityOffTwoToneIcon /> : <VisibilityTwoToneIcon />}
            </span>
            {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>
          {errors.password && <br />}
          <p className={`forgot-password-login ${errors.password ? "error-margin" : ""}`}>
            <Link to="/forgot-password-link">Forgot password?</Link>
          </p>
          <div className="gif-image-container">
            <img src={images[currentImageIndex]} className={`${getImageClassName()}`} alt="cycling images" />
          </div>
          <button className="login-button" type="submit">
            {loading ? <CircularProgress size={25} sx={{ color: "white", display: "flex", alignItems: "center", justifyContent: "center", margin: "auto" }} /> : "SignIn"}
          </button>
          <p className="signup-navigation-text">
            <Link to="/signup">SignUp</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
