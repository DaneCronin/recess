import React from 'react'
import Hero from './Hero/Hero';
import SmoothScroll from './components/SmoothScroll';
import ImageSlider from './components/ImageSlideProjectGallery/ImageSlideProject';
import MouseScaleMain from './components/MouseScaleMain/MouseScaleMain';
import SlidingImage from './components/SlidingImages';
import Contact from './components/Contact';
import styles from './style.module.css';

const Home = () => {
    const projects = [
        { id: 1, title1: "Jomor", title2: "Design", src: "jomor_design.jpeg" },
        { id: 2, title1: "La", title2: "Grange", src: "la_grange.jpeg" },
        { id: 3, title1: "Deux Huit", title2: "Huit", src: "deux_huit_huit.jpeg" },
        { id: 4, title1: "Nothing", title2: "Design Studio", src: "nothing_design_studio.png" },
        { id: 5, title1: "Mambo", title2: "Mambo", src: "mambo_mambo.jpeg" },
      ];
     const paragraph =
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.";
  return (
    <div>
        <Hero paragraph={paragraph} />
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
    </div>
  )
}

export default Home
