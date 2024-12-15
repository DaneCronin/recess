import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import styles from './style.module.css';

export default function Hero({ paragraph }) {
  const container = useRef(null);

  const scrollProgress = useMotionValue(0);
  const [isFullyVisible, setIsFullyVisible] = useState(false); // Tracks if text is fully in viewport
  const [scrollEnabled, setScrollEnabled] = useState(false); // To control scroll enablement

  const words = paragraph.split(" ");

  useEffect(() => {
    const checkVisibility = () => {
      const rect = container.current.getBoundingClientRect();
      const isVisible =
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
      setIsFullyVisible(isVisible);
    };

    // Observer to detect container visibility
    const observer = new ResizeObserver(checkVisibility);
    if (container.current) observer.observe(container.current);

    window.addEventListener("scroll", checkVisibility);
    return () => {
      if (container.current) observer.unobserve(container.current);
      window.removeEventListener("scroll", checkVisibility);
    };
  }, []);

  useEffect(() => {
    const handleScroll = (event) => {
      const delta = event.deltaY || event.wheelDelta || -event.detail;

      if (!isFullyVisible || scrollEnabled) {
        return; // Allow normal scrolling if the text is not fully in viewport or scroll is enabled
      }

      event.preventDefault(); // Prevent default page scroll
      const newScroll = Math.max(0, Math.min(1, scrollProgress.get() + delta * 0.001));
      scrollProgress.set(newScroll);

      // Enable regular scroll once text is fully filled
      if (newScroll === 1) {
        setScrollEnabled(true);
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [scrollProgress, isFullyVisible, scrollEnabled]);

  useEffect(() => {
    if (scrollEnabled) {
      // Re-enable default page scrolling
      const resetScroll = (event) => {
        if (!scrollEnabled) {
          event.preventDefault(); // Prevent scrolling when disabled
        }
      };
      window.addEventListener("wheel", resetScroll);
      return () => window.removeEventListener("wheel", resetScroll);
    }
  }, [scrollEnabled]);

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
