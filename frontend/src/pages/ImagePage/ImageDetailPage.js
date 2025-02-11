import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import "./ImageDetailPage.css";
import Header from "../../components/Header";

const ImageDetailPage = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirectToPayment, setRedirectToPayment] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/images/${id}`);
        const data = await response.json();
        setImage(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching image:", error);
        setLoading(false);
      }
    };

    fetchImage();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!image) {
    return <h2>Image not found</h2>;
  }

  // Handle redirect on button click
  const handleRedirect = () => {
    setRedirectToPayment(true);
  };

  // Redirect if necessary
  if (redirectToPayment) {
    return (
      <Navigate
        to="/payment"
        state={{
          imageId: image._id,
          amount: image.price,
          image: {
            url: image.url,
            title: image.title,
            description: image.description,
          },
        }}
      />
    );
  }

  return (
    <div className="detail-container">
      <Header />
      <img src={image.url} alt={image.title} className="detail-img" />
      <h2>{image.title}</h2>
      <p>{image.description || "No description available"}</p>
      <h3>Price: ₹{image.price}</h3>

      <button className="buy-btn" onClick={handleRedirect}>
        Buy Now
      </button>
    </div>
  );
};

export default ImageDetailPage;
