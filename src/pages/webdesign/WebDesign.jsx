import React, { Suspense, lazy, useEffect } from "react";
import styles from "./styles.module.css"; // Adjust the path to your CSS file
import Lenis from "@studio-freight/lenis";
import FramerMotionGsap from "./components/index";
import Contact from "../../components/Contact";

const Scene = lazy(() => import("../../components/Scene/Index")); // Adjust the path as needed

function WebDesign() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Adjust smoothness (scroll duration)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
      smoothWheel: true,
      smoothTouch: false, // Adjust based on touch devices
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    // Start the animation frame
    requestAnimationFrame(raf);

    // Clean up the animation frame and Lenis instance
    return () => {
      lenis.destroy(); // Clean Lenis resources
    };
  }, []);

  return (
    <main className={styles.main}>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="h-full">
          <Scene />
        </div>
        <FramerMotionGsap/>
        <FramerMotionGsap />
        <Contact/>
      </Suspense>
    </main>
  );
}

export default WebDesign;
