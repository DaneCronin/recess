import styles from './style.module.css';
import { motion } from 'framer-motion';
import { slide, scale } from '../../anim';
import { useNavigate } from 'react-router-dom';

export default function Link({ data, isActive, setSelectedIndicator }) {
  const { title, href, index } = data;
  const navigate = useNavigate();

  const handleClick = () => {
    setSelectedIndicator(href); // Update selected indicator state
    navigate(href); // Navigate to the new route
  };

  return (
    <motion.div
      className={styles.link}
      onMouseEnter={() => setSelectedIndicator(href)} // Update indicator on hover
      onClick={handleClick} // Handle click for navigation
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={isActive ? 'open' : 'closed'}
        className={styles.indicator}
      ></motion.div>
      <span>{title}</span> {/* Use span for styling */}
    </motion.div>
  );
}
