import React from "react";
import { Link } from "react-router-dom";
import "../components/css/Header.css"; // Import the corresponding CSS file
import Logo from "../components/ui/logo.jpg";

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo">
        <Link to="/" className="logo-link">
          <img src={Logo} alt="Logo" className="logo-img" />
          <h1 className="logo-text">Photographer's Portfolio</h1>
        </Link>
      </div>
      <nav className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/gallerypage" className="nav-link">
          Gallery
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>
        <Link to="/purchases" className="nav-link">
          Purchases
        </Link>
        <Link to="/contact" className="nav-link">
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Header;
