import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Loader = () => {
  const pieRef = useRef(null); // Reference for the pie loader

  useEffect(() => {
    // GSAP animation to rotate the pie loader continuously
    gsap.to(pieRef.current, {
      rotation: 360, // Rotate a full circle
      duration: 3, // Duration of one complete rotation
      repeat: -1, // Infinite loop
      ease: "none", // Ensures continuous, constant speed
    });
  }, []);

  return (
    <>
      <style>
        {`
          .loader-container {
            position: fixed; /* Positioned in the center of the viewport */
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px; /* Slightly larger size */
            height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden; /* Ensure no overflow during animation */
          }

          .logo {
            position: absolute;
            width: 50%; /* Larger logo size */
            height: auto;
            z-index: 1; /* Ensure logo stays below the loader */
          }

          .loading-pie {
            position: absolute;
            width: 80%; /* Larger loader size relative to container */
            height: 80%;
            border-radius: 50%;
            z-index: 2; /* Loader stays above the logo */
            background: conic-gradient(
              black 0deg, 
              transparent 90deg
            ); /* Pie-like gradient to create the slice effect */
            transform-origin: center; /* Rotate around the center */
          }
        `}
      </style>
      <div className="loader-container">
        {/* Logo */}
        <img src="/shawnlogo.png" alt="Logo" className="logo" />
        {/* Pie Loader */}
        <div className="loading-pie" ref={pieRef}></div>
      </div>
    </>
  );
};

export default Loader;
