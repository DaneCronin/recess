import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import styles from './style.module.css';

export default function Hero({ paragraph }) {
  const container = useRef(null);

  const scrollProgress = useMotionValue(0);
  const [scrollEnabled, setScrollEnabled] = useState(false); // State to toggle scrolling

  const words = paragraph.split(" ");

  useEffect(() => {
    const handleScroll = (event) => {
      const delta = event.deltaY || event.wheelDelta || -event.detail;

      if (scrollEnabled) {
        // Enable reverse custom scrolling if scrolling up and progress is not fully reversed
        if (scrollProgress.get() > 0 && delta < 0) {
          setScrollEnabled(false); // Re-enable custom scroll
        }
      } else {
        // Custom scroll logic
        event.preventDefault(); // Prevent default page scroll
        const newScroll = Math.max(0, Math.min(1, scrollProgress.get() + delta * 0.001));
        scrollProgress.set(newScroll);

        // Enable default scrolling when fully colored
        if (newScroll === 1 && delta > 0) {
          setScrollEnabled(true);
        }
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [scrollProgress, scrollEnabled]);

  return (
    <div className="w-full h-screen flex justify-center items-center overflow-hidden">
      <p ref={container} className={`${styles.paragraph} text-xs md:text-sm`}>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;

          return (
            <Word key={i} progress={scrollProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </p>
    </div>
  );
}

const Word = ({ children, progress, range }) => {
  const amount = range[1] - range[0];
  const step = amount / children.length;

  return (
    <span className={styles.word}>
      {children.split("").map((char, i) => {
        const start = range[0] + i * step;
        const end = range[0] + (i + 1) * step;

        return (
          <Char key={`c_${i}`} progress={progress} range={[start, end]}>
            {char}
          </Char>
        );
      })}
    </span>
  );
};

const Char = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span>
      <span className={styles.shadow}>{children}</span>
      <motion.span style={{ opacity: opacity }}>{children}</motion.span>
    </span>
  );
};
