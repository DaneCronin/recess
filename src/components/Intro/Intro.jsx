'use client';
import React, { useLayoutEffect, useRef } from 'react';
import styles from './style.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Index() {
    const background = useRef(null);
    const introImage = useRef(null);
    const introText = useRef(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Adjust ScrollTrigger to limit animation to its parent viewport
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: background.current, // Target background div
                scrub: true, // Sync with scroll
                start: "top-=100px", // Animation starts when the top of the element hits the center of the viewport
                end: "bottom bottom", // Animation ends when the bottom of the element hits the center
                markers: true, // Optional for debugging
            },
        });

        timeline
            // Expand background to cover only the viewport it's visible in
            .fromTo(
                background.current,
                { clipPath: `inset(15%)` }, // Initial state
                { clipPath: `inset(0%)` } // Final state
            )
            // Slide intro image up
            .fromTo(
                introImage.current,
                { y: "0%",opacity:1 }, // Initial position
                { y: "-100%",opacity:0 }, // Slide up
                0 // Synchronized with background animation
            )
            // Fade out intro text
            .fromTo(
                introText.current,
                { opacity: 1 },
                { opacity: 0 },
                "<" // Start with the previous animation
            );
    }, []);

    return (
        <div className={styles.homeHeader}>
            <div className={styles.backgroundImage} ref={background}>
                <img src={'/images/background.jpeg'} alt="background image" />
            </div>
            <div className={styles.intro}>
                <div
                    ref={introImage}
                    data-scroll
                    data-scroll-speed="0.9"
                    className={styles.introImage}
                >
                    <img src={'/images/intro.png'} alt="intro image" />
                </div>
                <h1
                    ref={introText}
                    data-scroll
                    data-scroll-speed="0.9"
                >
                    SMOOTH SCROLL
                </h1>
            </div>
        </div>
    );
}
