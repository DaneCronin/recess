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

        // Animation for the background
        gsap.timeline({
            scrollTrigger: {
                trigger: background.current, // Target background div
                scrub: true, // Sync with scroll
                start: "top +=100", // Start when top of the element hits the center
                end: "+=300px", // End when bottom of the element hits the top
                invalidateOnRefresh: true, // Refresh on resize
            },
        })
        .fromTo(
            background.current,
            { clipPath: `inset(15%)` }, // Initial state
            { clipPath: `inset(0%)` } // Final state
        );

        // Animation for the introImage
        gsap.timeline({
            scrollTrigger: {
                trigger: introImage.current, // Target introImage div
                scrub: true, // Sync with scroll
                start: "top center-=150", // Start when top of the element enters the viewport
                end: "bottom top+=300", // End when top of the element reaches the top
                invalidateOnRefresh: true, // Refresh on resize
            },
        })
        .fromTo(
            introImage.current,
            { y: "0%", opacity: 1, scale: 1 }, // Initial position
            { y: "-100%", opacity: 0, scale: 0.95 } // Final state
        );

        // Animation for the introText
        gsap.timeline({
            scrollTrigger: {
                trigger: introText.current, // Target introText
                scrub: true, // Sync with scroll
                start: "top center", // Start when top of the element enters the viewport
                end: "bottom top+=200", // End when top of the element reaches the center
                invalidateOnRefresh: true, // Refresh on resize
            },
        })
        .fromTo(
            introText.current,
            { opacity: 1 }, // Initial state
            { opacity: 0 } // Final state
        );

        // Ensure the animations sync properly with the scroll
        ScrollTrigger.refresh();
    }, []);

    return (
        <div className={styles.homeHeader}>
            <div className={styles.backgroundImage} ref={background}>
                <img src={'/background.jpeg'} alt="background image" />
            </div>
            <div className={styles.intro}>
                <div
                    ref={introImage}
                    className={styles.introImage}
                >
                    <img src={'/intro.png'} alt="intro image" />
                </div>
                <h1
                    ref={introText}
                >
                    SMOOTH SCROLL
                </h1>
            </div>
        </div>
    );
}
