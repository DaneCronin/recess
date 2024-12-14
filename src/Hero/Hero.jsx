import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import styles from './style.module.css';
import { div } from "framer-motion/client";

export default function Hero({ paragraph }) {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start 0.2", "start 0.1"],
  });

  const words = paragraph.split(" ");

  return (
    <div className="w-full h-screen md:w-3/4 md:h-screen lg:h-screen flex justify-center items-center">
      <p ref={container} className={`${styles.paragraph} text-xs md:text-sm`}>
        {words.map((word, i) => {
          const start = i / words.length;

        const end = start + 1 / words.length;

        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
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
