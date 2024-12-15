'use client';
import styles from './style.module.css';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const anim = {
    initial: { width: 0 },
    open: { width: "auto", transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
    closed: { width: 0 },
};

export default function ImageSlider({ project }) {
    const [isActive, setIsActive] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const { title1, title2, src } = project;

    useEffect(() => {
        // Check if the device is mobile
        const mobileCheck = window.matchMedia('(max-width: 768px)');
        setIsMobile(mobileCheck.matches);

        const handleResize = () => {
            setIsMobile(mobileCheck.matches);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleClick = () => {
        if (isMobile) {
            setIsActive((prev) => !prev); // Toggle state on tap for mobile
        }
    };

    return (
        <div
            onMouseEnter={() => {
                if (!isMobile) setIsActive(true);
            }}
            onMouseLeave={() => {
                if (!isMobile) setIsActive(false);
            }}
            onClick={handleClick} // Tap trigger for mobile
            className={styles.project}
        >
            <p>{title1}</p>
            <motion.div
                variants={anim}
                animate={isActive ? 'open' : 'closed'}
                className={styles.imgContainer}
            >
                <img src={`/medias/${src}`} alt={`${title1} - ${title2}`} />
            </motion.div>
            <p>{title2}</p>
        </div>
    );
}
