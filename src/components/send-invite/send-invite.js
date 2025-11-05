import React,{useState} from "react";
import api from "../../middleware/api";
import { useForm } from "react-hook-form";
// import Cookies from "js-cookie";
import "../../styles/send-invite/send-invite.scss";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { CircularProgress } from "@mui/material";
import { emailRegex } from "../../utils/constants";

const SendInvite = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,

    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const url = process.env.REACT_APP_PRODUCTION_URL;
    setLoading(true)
    try {
      const response = await api.post(`${url}/api/user/send-invite-link`, { ...data });
      toast.success(response.data.resultMessage.en, { duration: 5000 });
      setLoading(false)
      reset();
      navigate("/manage-profile");
    } catch (error) {
      toast.error(error.response?.data?.resultMessage?.en, { duration: 5000 });
      setLoading(false)  
    }
  };

  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="send-invite-main-container">
      <div className="send-invite-form">
        <div className="menu-wrapper-image">
         <h1 className="welcome-heading" style={{textAlign:'center' }}>Send Invite</h1>
         <div className="menu-account menu-back" onClick={handleClick}>
          <BiArrowBack  style={{ cursor:'pointer', color: "#ffffff" }} />
         </div>
       </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <h1 style={{ textAlign: "center" }}>Send Invite</h1> */}

            <div className="form-group-reg password-container">
              <input
                className="input-box"
                type="text"
                id="name"
                {...register("name", {
                  required: "Name is required",
                  pattern: {},
                })}
                placeholder="Name"
              />
              {errors.name && <span className="error">{errors.name.message}</span>}
            </div>
            <div className={`password-container form-group ${errors.password ? "with-error" : ""}`}>
              <input
                className="input-box"
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  validate: (value) => value === watch("email"),
                  pattern: {
                    value: emailRegex,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Email"
              />

              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>
            <button className="button" type="submit">
            {loading ? <CircularProgress size={25} sx={{ color: "white", display: "flex", alignItems: "center", justifyContent: "center", margin: "auto" }} /> : "Send"}
            </button>
          </form>
        
      </div>
    </div>
  );
};

export default SendInvite;
