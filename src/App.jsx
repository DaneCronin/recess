import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styles from './style.module.css';
import Hero from "./Hero/Hero";
import WebDesign from './pages/WebDesign'

import SmoothScroll from "./components/SmoothScroll";
import MouseScaleMain from "./components/MouseScaleMain/MouseScaleMain";

import Header from "./components/header";
import ImageSlider from "./components/ImageSlideProjectGallery/ImageSlideProject";
import SlidingImage from "./components/SlidingImages";
import Contact from "./components/Contact";
import Loader from "./components/Loader";
import Home from "./Home";

const App = () => {
 
  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Simulate loading process
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Finish loading after 3 seconds (simulate resources loaded)
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Disable scrolling when header is active
  useEffect(() => {
    document.body.style.overflow = isHeaderActive ? "hidden" : "auto";
  }, [isHeaderActive]);

  

  // Render loader if still loading
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <div style={{ position: "relative" }}>
        {/* Header */}
        <Header setIsHeaderActive={setIsHeaderActive} isActive={isHeaderActive} />

        {/* Main content */}
        <main
          style={{
            opacity: isHeaderActive ? 0.3 : 1,
            transition: "opacity 0.3s",
          }}
        >
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/webdesign" element={<WebDesign/>} />

          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
