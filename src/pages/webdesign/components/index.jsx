import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import Picture1 from "/medias/4.jpg";
import Picture2 from "/medias/5.jpg";
import Picture3 from "/medias/6.jpg";
import "./styles.css";
const word = "with framer-motion";

export default function FramerMotionGsap() {
    const container = useRef(null);

    // Scroll progress
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"],
    });

    // Parallax transforms
    const sm = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const md = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const lg = useTransform(scrollYProgress, [0, 1], [0, -250]);

    const images = [
        {
            src: Picture1,
            y: 0,
        },
        {
            src: Picture2,
            y: lg,
        },
        {
            src: Picture3,
            y: md,
        },
    ];

    return (
        <div ref={container} className="container">
            <div className="body">
                <motion.h1 style={{ y: sm }}>Parallax</motion.h1>
                <h1>Scroll</h1>
                <div className="word">
                    <p>
                        {word.split("").map((letter, i) => {
                            const y = useTransform(
                                scrollYProgress,
                                [0, 1],
                                [0, Math.floor(Math.random() * -75) - 25]
                            );
                            return (
                                <motion.span style={{ top: y }} key={`l_${i}`}>
                                    {letter}
                                </motion.span>
                            );
                        })}
                    </p>
                </div>
            </div>
            <div className="images">
                {images.map(({ src, y }, i) => {
                    return (
                        <motion.div
                            style={{ y }}
                            key={`i_${i}`}
                            className="imageContainer"
                        >
                            <img src={src} alt={`image-${i}`} />
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
