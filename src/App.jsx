import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styles from './style.module.css';
import Hero from "./Hero/Hero";
import About from "./components/About";
import Features from "./components/Features";
import Projects from "./components/Story";
import SmoothScroll from "./components/SmoothScroll";
import MouseScaleMain from "./components/MouseScaleMain/MouseScaleMain";
import MainComponent from "./components/TextDisperse/TextDisperse";
import Footer from "./components/StickyNotes/StickyFooter";
import Header from "./components/header";
import ImageSlider from "./components/ImageSlideProjectGallery/ImageSlideProject";
import SlidingImage from "./components/SlidingImages";
import Contact from "./components/Contact";
import Loader from "./components/Loader";

const App = () => {
  const paragraph =
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.";
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

  const projects = [
    { id: 1, title1: "Jomor", title2: "Design", src: "jomor_design.jpeg" },
    { id: 2, title1: "La", title2: "Grange", src: "la_grange.jpeg" },
    { id: 3, title1: "Deux Huit", title2: "Huit", src: "deux_huit_huit.jpeg" },
    { id: 4, title1: "Nothing", title2: "Design Studio", src: "nothing_design_studio.png" },
    { id: 5, title1: "Mambo", title2: "Mambo", src: "mambo_mambo.jpeg" },
  ];

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
            <Route path="/" element={<Hero paragraph={paragraph} />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>

          <SmoothScroll />
          <div className={styles.main}>
            <div className={styles.gallery}>
              <p>Featured Work</p>
              {projects.map((project) => {
                return <ImageSlider key={project.id} project={project} />;
              })}
            </div>
          </div>
          <MouseScaleMain />
          <SlidingImage />
          <Contact />
        </main>
      </div>
    </Router>
  );
};

export default App;
