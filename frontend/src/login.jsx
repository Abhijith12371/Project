import React, { useState } from "react";
import "./login.css"; // Import the CSS file
import Axios from "axios";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    
    try {
      const response = await Axios.post("http://localhost:3000/login", { email, password });
      console.log(response);
      if (response.data.status) {
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
          navigate("/");
        }, 3000); 
      }
    } catch (error) {
      console.error("Login failed:", error);
      
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {alertVisible && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            You have successfully logged in
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
          <Link
            to="/signup"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: "2%",
            }}
          >
            Sign up
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
