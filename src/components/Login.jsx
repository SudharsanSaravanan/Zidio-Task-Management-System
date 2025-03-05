import React, { useState } from "react";
import "../styles/Login.css";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
      <p>Login to continue</p>

      <div className="input-group">
        <label>Email</label>
        <input type="email" placeholder="Enter your email" />
      </div>

      <div className="input-group password-container">
        <label>Password</label>
        <input 
          type={passwordVisible ? "text" : "password"} 
          placeholder="Enter your password" 
        />
        <button 
          className="password-toggle" 
          onClick={() => setPasswordVisible(!passwordVisible)}
        >
          {passwordVisible ? "🙈" : "👁"}
        </button>
      </div>

      <button className="login-btn">Login</button>

      <p className="register-link">
        Don't have an account? <a href="#">Register</a>
      </p>
    </div>
  );
};

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> 7c9a654 (login)
