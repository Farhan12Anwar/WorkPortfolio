import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/PurchasesAuth.css";
import Header from "./Header";

const PurchasesAuth = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/purchases/authenticate", {
        userEmail,
        password,
      });

      localStorage.setItem("purchases", JSON.stringify(response.data));
      navigate("/purchases");
    } catch (error) {
      alert(error.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div className="auth-container">
        <Header />
      <h2>Access Your Purchases</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth}>View Purchases</button>
    </div>
  );
};

export default PurchasesAuth;
