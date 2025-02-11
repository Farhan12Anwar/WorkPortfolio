import React, { useEffect, useState } from "react";
import HeroSection from "../../components/HeroPage";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios"; // Import axios for API calls
import "./Home.css";
import Header from "../../components/Header";

const HomePage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://workportfolio-ngea.onrender.com/api/images"
        ); // Fetch from backend
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <Header />
      <HeroSection />
      <div className="home-container">
        <motion.div
          className="image-grid"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } },
          }}
        >
          {images.map((image) => (
            <motion.div
              key={image._id} // Use _id from MongoDB
              className="gallery-item"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <Link to={`/image/${image._id}`}>
                <img src={image.url} alt={image.title} className="image-item" />
              </Link>
              <h3 className="image-title">{image.title}</h3>
              <p className="image-price">₹{image.price}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
