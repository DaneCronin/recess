'use client';
import styles from './style.module.css';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { disperse } from './anim';
import gsap from 'gsap';

export default function MainComponent() { // Renamed from TextDipserse for clarity

  const background = useRef(null);

  const setBackground = (isActive) => {
    gsap.to(background.current, { opacity: isActive ? 0.8 : 0 });
  };

  return (
    <main className={styles.main}>
      <div className={styles.body}>
        <div className={styles.introLine}>
          <p>Olivier</p>
          <p>Larose</p>
        </div>

        <div className={styles.introLine}>
          <p>Design</p>
          <p>&</p>
        </div>

        <div className={styles.introLine}>
          <p>Art</p>
          <p>Direction</p>
        </div>

        <TextDisperseChild setBackground={setBackground}>
          <p>+447533063596</p>
        </TextDisperseChild>

        <TextDisperseChild setBackground={setBackground}>
          <p>→Email</p>
        </TextDisperseChild>

        <TextDisperseChild setBackground={setBackground}>
          <p>→Insta</p>
        </TextDisperseChild>
      </div>
      <div ref={background} className={styles.background}></div>
    </main>
  );
}

function TextDisperseChild(props) { // Renamed to avoid conflicts
  const { children, setBackground } = props;
  const [isAnimated, setIsAnimated] = useState(false);

  const getChars = (element) => {
    let chars = [];
    if (children.length) {
      children.forEach((el, i) => {
        chars.push(splitWord(el.props.children, i));
      });
    } else {
      chars.push(splitWord(element.props.children, 1));
    }
    return chars;
  };

  const splitWord = (word, indexOfWord) => {
    let chars = [];
    word.split("").forEach((char, i) => {
      chars.push(
        <motion.span
          custom={indexOfWord * i}
          variants={disperse}
          animate={isAnimated ? "open" : "closed"}
          key={char + i}
        >
          {char}
        </motion.span>
      );
    });
    return chars;
  };

  const manageMouseEnter = () => {
    setBackground(true);
    setIsAnimated(true);
  };
  const manageMouseLeave = () => {
    setBackground(false);
    setIsAnimated(false);
  };

  return (
    <div
      style={{ cursor: "pointer" }}
      onMouseEnter={manageMouseEnter}
      onMouseLeave={manageMouseLeave}
      className={styles.introLine}
    >
      {getChars(children)}
    </div>
  );
}
