import React, { useState } from "react";
import "../../styles/login/login.css";
const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmitLoginForm = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="login-main-container">
      <div className="login-container">
        <form onSubmit={onSubmitLoginForm} className="login-form">
          <div className="form-group">
            <input type="text" id="username" name="username" value={formData.username} placeholder="Username" onChange={handleInputChange} />
          </div>
          <div className="form-group password-group">
            <input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} placeholder="Password" onChange={handleInputChange} />
            <span className="toggle-password" onClick={togglePasswordVisibility}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
