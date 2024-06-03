import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import '../../styles/forgot-password/forgot-password.scss';
import toast from "react-hot-toast";

const ForgotPasswordLink = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    console.log(data)
    const url = process.env.REACT_APP_PRODUCTION_URL
    try {
      const response = await axios.post(`${url}/api/user/forgot-password-link`, { email: data.email });
      toast.success(response?.data?.resultMessage?.en)
      setMessage(response?.data?.resultMessage?.en);
      setError("");

    } catch (err) {
      setError(error.response?.data?.resultMessage?.en);
      setMessage("");
      toast.error(error.response?.data?.resultMessage?.en)
    }
  };

  return (
    <div className="forgot-password-main-container">
      <div className="forgot-password-form">
        <h2 className="forgot-password-heading">Forgot Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              className="input-box"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              {...register('email', {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address"
                }
              })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <button className="button" type="submit">
            Submit
          </button>
          {message && <p className="message">{message}</p>}
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordLink;
