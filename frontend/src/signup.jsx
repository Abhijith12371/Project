import React, { useState } from 'react';
import './signup.css';  // Import the CSS file
import Axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

import CheckIcon from '@mui/icons-material/Check';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
  
    try {
      const response = await Axios.post("http://localhost:3000/signup", { username, email, password });
      console.log(response.data);
      if (response.data.status) {
        console.log("Signup successful, showing alert");
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
          navigate("/login");
        }, 3000);
      } else {
        console.log("Signup not successful:", response.data.message);
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };
  
  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Signup</h2>
        {alertVisible && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            You have successfully signed up
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
          <button type="submit">Signup</button>
          <Link
            to="/login"
            style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", marginTop: "2%" }}
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
