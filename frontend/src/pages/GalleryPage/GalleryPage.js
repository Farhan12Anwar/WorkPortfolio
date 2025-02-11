import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./GalleryPage.css";
import Header from "../../components/Header";

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/images");
        const data = await response.json();
        setImages(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="gallery-container">
      <Header />
      <h1>Photo Gallery</h1>
      <div className="gallery-grid">
        {images.map((image) => (
          <div key={image._id} className="gallery-item">
            <Link to={`/image/${image._id}`} className="gallery-link">
              <img src={image.url} alt={image.title} className="gallery-img" />
              <h3>{image.title}</h3>
              <p> ₹{image.price}</p>
              <button className="button primary-button">View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
