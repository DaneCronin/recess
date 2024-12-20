import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import styles from './style.module.css';
import Nav from './nav';

export default function Header({ setIsHeaderActive, isActive }) {
  const location = useLocation();

  useEffect(() => {
    setIsHeaderActive(isActive);
    return () => setIsHeaderActive(false);
  }, [isActive, setIsHeaderActive]);

  return (
    <>
      <div className={styles.header}>
        <div
          onClick={() => setIsHeaderActive(!isActive)}
          className={`${styles.button} ${isActive ? styles.active : ''}`}
        >
          <div className={`${styles.burger} ${isActive ? styles.burgerActive : ''}`}></div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {isActive && <Nav />}
      </AnimatePresence>
    </>
  );
}
