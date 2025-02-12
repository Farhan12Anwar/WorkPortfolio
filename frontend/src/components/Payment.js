import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "../components/css/Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { imageId, amount, image } = location.state || {};

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  if (!imageId || !amount || !image) {
    return <p>Error: Image not found or invalid amount</p>;
  }

  const handlePayment = async () => {
    try {
      const response = await axios.post("https://workportfolio-ngea.onrender.com/api/payment", {
        amount,
      });

      const { id, currency, amount: razorpayAmount } = response.data;

      const options = {
        key: "rzp_test_Xkmmnp5DQoVyPn",
        amount: razorpayAmount,
        currency,
        name: "Your Business Name",
        description: "Payment for your selected image",
        image: "../../public/logo.jpg",
        order_id: id,
        handler: async function (response) {
          const { payment_id } = response;
          await axios.post("https://workportfolio-ngea.onrender.com/api/payment/success", {
            paymentId: payment_id,
            imageId,
            userName,
            userEmail,
            userPhone,
            price: amount,
          });

          navigate("/purchases");
          alert("Payment Successful!");
        },
        prefill: {
          name: userName,
          email: userEmail,
          contact: userPhone,
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Error initiating payment.");
    }
  };

  return (
    <motion.div
      className="payment-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="payment-details">
        <motion.img
          src={image.url}
          alt={image.title}
          className="product-img"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="product-info">
          <h2>{image.title}</h2>
          <p>{image.description}</p>
          <h3>Price: ₹{amount}</h3>
        </div>
      </div>

      <div className="user-details">
        {[ 
          { label: "Your Name", value: userName, setter: setUserName, type: "text" },
          { label: "Your Email", value: userEmail, setter: setUserEmail, type: "email" },
          { label: "Your Phone", value: userPhone, setter: setUserPhone, type: "tel" }
        ].map(({ label, value, setter, type }, index) => (
          <motion.div
            key={index}
            className="input-container"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <input
              type={type}
              value={value}
              onChange={(e) => setter(e.target.value)}
              required
            />
            <label className={value ? "filled" : ""}>{label}</label>
          </motion.div>
        ))}
      </div>

      <motion.button
        className="payment-btn"
        onClick={handlePayment}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Proceed to Pay ₹{amount}
      </motion.button>
    </motion.div>
  );
};

export default Payment;
