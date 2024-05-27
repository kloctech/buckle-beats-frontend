// // Login.js
// import React, { useState } from 'react';
// import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
// import '../../styles/login/login.scss';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [errors, setErrors] = useState({});

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const validate = () => {
//     let errors = {};

//     if (!username) {
//       errors.username = 'Username is required';
//     }

//     if (!email) {
//       errors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       errors.email = 'Email address is invalid';
//     }

//     if (!password) {
//       errors.password = 'Password is required';
//     } else if (password.length < 6) {
//       errors.password = 'Password must be at least 6 characters';
//     }

//     if (!confirmPassword) {
//       errors.confirmPassword = 'Confirm password is required';
//     } else if (password !== confirmPassword) {
//       errors.confirmPassword = 'Passwords do not match';
//     }

//     setErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (validate()) {
//       // Perform login (this is where you would handle login logic, e.g., API call)
//       console.log('Form submitted successfully');
//     }
//   };

//   return (
//     <div className="login-container">
//       {/* <div className="paw-prints">
//         <div className="paw-print paw1"></div>
//         <div className="paw-print paw2"></div>
//         <div className="paw-print paw3"></div>
//         <div className="paw-print paw4"></div>
//       </div> */}
//       <div className="form-container">
//         <h1>Welcome!</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="input-container">
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             {errors.username && <div className="error">{errors.username}</div>}
//           </div>
//           <div className="input-container">
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             {errors.email && <div className="error">{errors.email}</div>}
//           </div>
//           <div className="input-container password-container">
//             <input
//               type={passwordVisible ? 'text' : 'password'}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button
//               type="button"
//               className="show-password"
//               onClick={togglePasswordVisibility}
//             >
//               {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
//             </button>
//             {errors.password && <div className="error">{errors.password}</div>}
//           </div>
//           <div className="input-container password-container">
//             <input
//               type={passwordVisible ? 'text' : 'password'}
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//             <button
//               type="button"
//               className="show-password"
//               onClick={togglePasswordVisibility}
//             >
//               {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
//             </button>
//             {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
//           </div>
//           <div className="forgot-password">Forgot password?</div>
//           <div className="dog-icon"></div>

//           <button type="submit" className="login-button">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import '../../styles/login/login.scss';
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
