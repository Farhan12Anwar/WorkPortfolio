// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import ImageDetailPage from "./pages/ImagePage/ImageDetailPage";
import Contact from "./pages/contact/Contact";
import Payment from "./components/Payment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/gallerypage" element={<GalleryPage />} />
        <Route path="/image/:id" element={<ImageDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
