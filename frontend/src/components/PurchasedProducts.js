// Frontend (PurchasedProducts.js)
import React, { useState } from "react";
import axios from "axios";
import "../components/css/PurchasedProducts.css";
import Header from "./Header";

const PurchasedProducts = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "https://workportfolio-ngea.onrender.com/api/purchases/authenticate",
        { userEmail: email, password }
      );
      setPurchases(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div className="purchased-products-container">
      <Header />
      <h2>Purchased Products</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="purchases-list">
        {purchases.length > 0 ? purchases.map((purchase) => (
          <div key={purchase._id} className="purchase-item">
            <img className="img" src={purchase.imageId.url} alt={purchase.imageId.title} />
            <p>{purchase.imageId.title}</p>
            <p>Price: ₹{purchase.price}</p>
            <p>Purchased on: {new Date(purchase.timestamp).toLocaleString()}</p>
          </div>
        )) : <p>No purchases found.</p>}
      </div>
    </div>
  );
};

export default PurchasedProducts;