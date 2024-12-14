import React from 'react'
import Hero from './Hero/Hero';
import About from './components/About';
import Navbar from './components/Navbar';
import Features from './components/Features';
import Projects from './components/Story';
import Contact from './components/Contact';
import SmoothScroll from './components/SmoothScroll';
import Curve from './components/SVGBezierCurve/Curve';
import MouseScaleMain from './components/MouseScaleMain/MouseScaleMain';
import TextDipserse from './components/TextDisperse/TextDisperse';
import MainComponent from './components/TextDisperse/TextDisperse';
import Footer from './components/StickyNotes/StickyFooter';

// import Footer from './components/Footer';


const App = () => {
  const paragraph ='It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ';
  
  // Add a state to track screen size
  const [isSmallScreen, setIsSmallScreen] = React.useState(window.innerWidth < 768);

  // Update the state on window resize
  React.useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
  <main>
    <Navbar/>
    <Hero paragraph={paragraph}/>
    <SmoothScroll/>
    {/* Conditionally render Curve based on screen size */}
    {!isSmallScreen && <Curve/>}
    <MouseScaleMain/>
    <MainComponent/>
    <Footer/>
  </main>
  )
}

export default App
