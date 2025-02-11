import React from "react";
import { Link } from "react-router-dom";
import '../components/css/Gallery.css'

const Gallery = ({ images }) => {
  return (
    <div>
      {images.map((img) => (
        <Link to={`/image/${img.id}`} key={img.id}>
          <img src={img.url} alt={img.title} style={{ width: "200px" }} />
        </Link>
      ))}
    </div>
  );
};

export default Gallery;