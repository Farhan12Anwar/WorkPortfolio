import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { motion } from "framer-motion"; // For animations
import "../components/css/Payment.css"; // Assuming you have a separate CSS file for payment styles

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Get the navigate function

  const { imageId, amount, image } = location.state || {};

  // Log to see if data is passed correctly
  console.log("Location State:", location.state);

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
        currency: currency,
        name: "Your Business Name",
        description: "Payment for your selected image",
        image: "../../public/logo.jpg",
        order_id: id,
        handler: async function (response) {
          const { payment_id } = response;
          await axios.post("https://workportfolio-ngea.onrender.com/api/payment/success", {
            paymentId: payment_id,
            imageId,
            userEmail: "user@example.com",
          });
          navigate("/"); // Use navigate to go to the home page
          alert("Payment Successful!");
        },
        prefill: {
          name: "User",
          email: "user@example.com",
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.log("Payment initiation failed:", error);
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

      <motion.button
        className="payment-btn"
        onClick={handlePayment}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        Proceed to Pay ₹{amount}
      </motion.button>
    </motion.div>
  );
};

export default Payment;
