import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <h1 className="logo">PhotoGallery</h1>
      <ul className="nav-links">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === "/GalleryPage" ? "active" : ""}>
          <Link to="/GalleryPage">Gallery</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;