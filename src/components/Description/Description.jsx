import React, { useLayoutEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import styles from './style.module.css';

const phrases = [
  "Los Flamencos National Reserve",
  "is a nature reserve located",
  "in the commune of San Pedro de Atacama",
  "The reserve covers a total area",
  "of 740 square kilometres (290 sq mi)"
];

export default function Description() {
  return (
    <div className={styles.description}>
      {phrases.map((phrase, index) => {
        return <AnimatedText key={index}>{phrase}</AnimatedText>;
      })}
    </div>
  );
}

function AnimatedText({ children }) {
  const text = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      text.current,
      { opacity: 0, x: -200 }, // Initial state
      {
        opacity: 1,
        x: 0,
        ease: "power3.out",
        duration: 1.5, // Smooth animation duration
        scrollTrigger: {
          trigger: text.current,
          scrub: 1, // Smooth scrubbing
          start: "top bottom", // When the element enters the viewport
          end: "top top", // When the element aligns with the top of the viewport
          toggleActions: "play none none reverse", // Ensures smooth playback
        },
      }
    );
  }, []);

  return <p ref={text}>{children}</p>;
}
