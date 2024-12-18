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

        // Helper function to set scrub based on device type
        const getScrubValue = () => {
            return window.matchMedia("(pointer: coarse)").matches ? 1.5 : true; // Smoother for touch devices
        };

        // Animation for the background
        gsap.timeline({
            scrollTrigger: {
                trigger: background.current,
                scrub: getScrubValue(), // Adjust scrub value based on device
                start: "top +=100",
                end: "+=300px",
                invalidateOnRefresh: true,
            },
        })
        .fromTo(
            background.current,
            { clipPath: `inset(15%)` },
            { clipPath: `inset(0%)` }
        );

        // Animation for the introImage
        gsap.timeline({
            scrollTrigger: {
                trigger: introImage.current,
                scrub: getScrubValue(),
                start: "top center-=150",
                end: "bottom top+=300",
                invalidateOnRefresh: true,
            },
        })
        .fromTo(
            introImage.current,
            { y: "0%", opacity: 1, scale: 1 },
            { y: "-100%", opacity: 0, scale: 0.95 }
        );

        // Animation for the introText
        gsap.timeline({
            scrollTrigger: {
                trigger: introText.current,
                scrub: getScrubValue(),
                start: "top center",
                end: "bottom top+=200",
                invalidateOnRefresh: true,
            },
        })
        .fromTo(
            introText.current,
            { opacity: 1 },
            { opacity: 0 }
        );

        // Refresh ScrollTrigger to ensure animations sync with device resize or orientation change
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
