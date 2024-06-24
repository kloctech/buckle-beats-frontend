import React from "react";
import api from "../../middleware/api";
import { useForm } from "react-hook-form";
import "../../styles/forgot-password/forgot-password.scss";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SendInvite = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,

    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const onSubmit = async (data) => {
    const url = process.env.REACT_APP_PRODUCTION_URL;
    try {
      const response = await api.post(`${url}/api/user/send-invite-link`, { ...data });
      toast.success(response.data.resultMessage.en, { duration: 5000 });
      reset();
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.resultMessage?.en, { duration: 5000 });
    }
  };

  return (
    <div className="forgot-password-main-container">
      <div className="forgot-password-form">
        <h2 className="forgot-password-heading">Send Invite</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group-reg password-container">
            <input
              className="input-box"
              type="text"
              id="name"
              {...register("name", {
                required: "name is required",
                pattern: {},
              })}
              placeholder="name"
            />
            {errors.name && <span className="error">{errors.name.message}</span>}
          </div>
          <div className={`password-container form-group ${errors.password ? "with-error" : ""}`}>
            <input
              className="input-box"
              type="email"
              id="email"
              {...register("email", {
                required: "email is required",
                validate: (value) => value === watch("email"),
                pattern: {
                  value: emailRegex,
                  message: "Invalid email address",
                },
              })}
              placeholder="email"
            />

            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>
          <button className="button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendInvite;
