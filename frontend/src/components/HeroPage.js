import React from "react";
import { Link } from "react-router-dom";
import '../components/css/HeroPage.css'


const HeroPage = () => {
  return (
    <div className="hero-container">
      <h1>Welcome to Stunning Photography</h1>
      <p>Capture moments that last forever</p>
      <div className="hero-buttons">
        <Link to="/GalleryPage">
          <button className="button primary-button">Explore Gallery</button>
        </Link>
        <Link to="/Contact">
          <button className="button secondary-button">Contact Us</button>
        </Link>
      </div>
    </div>
  );
};

export default HeroPage;
