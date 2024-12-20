import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";

export default function Hero({ paragraph }) {
  const container = useRef(null);

  const scrollProgress = useMotionValue(0);
  const smoothScrollProgress = useSpring(scrollProgress, {
    stiffness: 50,
    damping: 20,
  });
  const [isFullyVisible, setIsFullyVisible] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const words = paragraph.split(" ");

  useEffect(() => {
    const checkVisibility = () => {
      const rect = container.current.getBoundingClientRect();
      const isVisible =
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
      setIsFullyVisible(isVisible);
    };

    const observer = new ResizeObserver(checkVisibility);
    if (container.current) observer.observe(container.current);

    window.addEventListener("scroll", checkVisibility);
    return () => {
      if (container.current) observer.unobserve(container.current);
      window.removeEventListener("scroll", checkVisibility);
    };
  }, []);

  useEffect(() => {
    let startY = 0;
    let touchDelta = 0;
    let velocity = 0;

    const handleScroll = (event) => {
      const delta = event.deltaY || event.wheelDelta || -event.detail;

      if (!isFullyVisible || scrollEnabled) {
        return;
      }

      event.preventDefault();
      velocity = delta * 0.00025; // Adjust scrolling rate and initial velocity
      const newScroll = Math.max(0, Math.min(1, scrollProgress.get() + velocity));
      scrollProgress.set(newScroll);

      if (newScroll === 1) {
        setScrollEnabled(true);
      }
    };

    const handleTouchStart = (event) => {
      startY = event.touches[0].clientY;
    };

    const handleTouchMove = (event) => {
      if (!isFullyVisible || scrollEnabled) return;

      const currentY = event.touches[0].clientY;
      touchDelta = startY - currentY;

      event.preventDefault();

      velocity = touchDelta * 0.00025; // Adjust touch scrolling rate and initial velocity
      const newScroll = Math.max(0, Math.min(1, scrollProgress.get() + velocity));
      scrollProgress.set(newScroll);

      if (newScroll === 1) {
        setScrollEnabled(true);
      }
    };

    const handleTouchEnd = () => {
      touchDelta = 0;
      // Allow momentum to carry over
      scrollProgress.set(scrollProgress.get() + velocity);
    };

    const applyMomentum = () => {
      if (Math.abs(velocity) > 0.0001) {
        velocity *= 0.95; // Decay the velocity for a smoother momentum effect
        scrollProgress.set(Math.max(0, Math.min(1, scrollProgress.get() + velocity)));
        requestAnimationFrame(applyMomentum);
      }
    };

    const handleMomentum = () => {
      applyMomentum();
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("mouseup", handleMomentum);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("mouseup", handleMomentum);
    };
  }, [scrollProgress, isFullyVisible, scrollEnabled]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/video/section1video.mp4"
        autoPlay
        loop
        muted
      />

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full flex justify-center items-center">
        <p ref={container} className={`${styles.paragraph} text-xs md:text-sm`}>
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;

            return (
              <Word key={i} progress={smoothScrollProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
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
