import React from "react";
import { Link } from "react-router-dom";
import '../components/css/ImageCard.css';

const ImageCard = ({ image }) => {
  return (
    <div className="image-card">
      <Link to={`/image/${image.id}`}>
        <img src={image.url} alt={image.title} className="image-card-img" />
      </Link>
      <h3>{image.title}</h3>
      <p>${image.price}</p>
    </div>
  );
};

export default ImageCard;