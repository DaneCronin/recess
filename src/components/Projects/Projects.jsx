import React, { useState, useLayoutEffect, useRef } from 'react';
import styles from './style.module.css';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "Salar de Atacama",
        src: "salar_de_atacama.jpg",
    },
    {
        title: "Valle de la luna",
        src: "valle_de_la_muerte.jpeg",
    },
    {
        title: "Miscanti Lake",
        src: "miscani_lake.jpeg",
    },
    {
        title: "Miniques Lagoons",
        src: "miniques_lagoon.jpg",
    },
];

export default function Index() {
    const [selectedProject, setSelectedProject] = useState(0);
    const container = useRef(null);
    const imageContainer = useRef(null);

    useLayoutEffect(() => {
        const imageTrigger = ScrollTrigger.create({
            trigger: imageContainer.current,
            start: "top 120px", // Trigger image pinning slightly later
            end: "+=1100", // Extend the end to make text scrollable for longer
            pin: true,
            pinSpacing: false,
            onEnter: () => {
                gsap.to(imageContainer.current, {
                    position: "fixed",
                    top: "120px",
                    duration: 0.3,
                    ease: "power2.out",
                });
            },
            onLeave: () => {
                gsap.to(imageContainer.current, {
                    position: "relative",
                    top: "0",
                    duration: 0.3,
                    ease: "power2.out",
                });
            },
            onLeaveBack: () => {
                gsap.to(imageContainer.current, {
                    position: "relative",
                    top: "0",
                    duration: 0.3,
                    ease: "power2.out",
                });
            },
        });

        return () => {
            imageTrigger.kill();
        };
    }, []);

    return (
        <div ref={container} className={styles.projects}>
            <div className={styles.projectDescription}>
                <div ref={imageContainer} className={styles.imageContainer}>
                    <img
                        src={`/${projects[selectedProject].src}`}
                        alt="project image"
                    />
                </div>
                
                <div className={styles.column}>
                    <p>
                        The flora is characterized by the presence of high elevation wetland, as
                        well as yellow straw, broom sedge, tola de agua and tola amaia.
                    </p>
                </div>
                <div className={styles.column}>
                    <p>
                        Some, like the southern viscacha, vicuña and Darwin's rhea, are
                        classified as endangered species. Others, such as Andean goose, horned
                        coot, Andean gull, puna tinamou and the three flamingo species
                        inhabiting in Chile (Andean flamingo, Chilean flamingo, and James's
                        flamingo) are considered vulnerable.
                    </p>
                </div>
            </div>

            <div className={styles.projectList}>
                {projects.map((project, index) => (
                    <div
                        key={index}
                        onMouseOver={() => setSelectedProject(index)}
                        className={styles.projectEl}
                    >
                        <h2>{project.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}
