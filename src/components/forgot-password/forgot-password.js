import React, { useState } from "react";
import axios from "axios";

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
    <div className="forgot-password-form" style={{ width: "40vw", margin: "auto" }}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input className="input-box" type="email" id="email" name="email" value={email} onChange={handleChange} required />
        </div>
        <button type="submit">Send Reset Link</button>
        {message && <p className="message">{message}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
