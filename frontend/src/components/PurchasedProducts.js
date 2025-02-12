import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/PurchasedProducts.css";

const PurchasedProducts = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    axios
      .get("https://workportfolio-ngea.onrender.com/api/purchases")
      .then((response) => {
        console.log("Fetched purchases:", response.data);
        setPurchases(response.data);
      })
      .catch((error) => console.error("Error fetching purchases:", error));
  }, []);

  return (
    <div className="purchased-products-container">
      <h2>Your Purchased Products</h2>
      {purchases.length === 0 ? (
        <p>No purchases found.</p>
      ) : (
        <div className="purchases-list">
          {purchases.map((purchase) => (
            <div className="purchase-item" key={purchase._id}>
              {purchase.imageId && purchase.imageId.url ? (
                <img src={purchase.imageId.url} alt={purchase.imageId.title} />
              ) : (
                <p>Image not available</p>
              )}
              <div className="purchase-details">
                <h3>{purchase.imageId?.title || "Unknown Title"}</h3>
                <p>Purchased by: {purchase.userName}</p>
                <p>Email: {purchase.userEmail}</p>
                <p>Phone: {purchase.userPhone || "Not Provided"}</p>
                <p>Price: ₹{purchase.price || "Not Available"}</p>
                <p>Payment ID: {purchase._id}</p>
                <p>Date: {new Date(purchase.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PurchasedProducts;
