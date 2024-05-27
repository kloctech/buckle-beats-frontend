import React, { useState } from "react";
import axios from "axios";
import "../../styles/forgot-password/forgot-password.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:7000/api/auth/forgot-password", { email });
      setMessage("A reset link has been sent to your email address.");
      setEmail("");
      setError("");
    } catch (err) {
      setError("Error sending reset link. Please try again.");
      setMessage("");
    }
  };

  return (
    <div className="forgot-password-main-container">
      <div className="forgot-password-form">
        <h2 className="forgot-password-heading">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input className="input-box" type="email" id="email" name="email" value={email} onChange={handleChange} placeholder="Enter your email" required />
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

export default ForgotPassword;
