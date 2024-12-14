import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './Hero/Hero';
import About from './components/About';
import Features from './components/Features';
import Projects from './components/Story';
import Contact from './components/Contact';
import SmoothScroll from './components/SmoothScroll';
import Curve from './components/SVGBezierCurve/Curve';
import MouseScaleMain from './components/MouseScaleMain/MouseScaleMain';
import MainComponent from './components/TextDisperse/TextDisperse';
import Footer from './components/StickyNotes/StickyFooter';
import Header from './components/header';


const App = () => {
  const paragraph =
    'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.';
  const [isHeaderActive, setIsHeaderActive] = React.useState(false);

  // Effect to disable scrolling when header is active
  React.useEffect(() => {
    document.body.style.overflow = isHeaderActive ? 'hidden' : 'auto';
  }, [isHeaderActive]);

  return (
    <Router>
      <div style={{ position: 'relative' }}>
        {/* Header */}
        <Header setIsHeaderActive={setIsHeaderActive} isActive={isHeaderActive} />

        {/* Main content */}
        <main style={{ opacity: isHeaderActive ? 0.3 : 1, transition: 'opacity 0.3s' }}>
          <Routes>
            <Route path="/" element={<Hero paragraph={paragraph} />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <SmoothScroll />
          <Curve />
          <MouseScaleMain />
          <MainComponent />
          <Footer />
        </main>
      </div>
    </Router>
  );
};

export default App;
