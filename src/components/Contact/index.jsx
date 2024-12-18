import styles from './style.module.css';

import Rounded from '../../common/RoundedButton';
import { useRef } from 'react';
import { useScroll, motion, useTransform, useSpring } from 'framer-motion';
import Magnetic from '../../common/Magnetic';

export default function Contact() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"]
    })
    const x = useTransform(scrollYProgress, [0, 1], [0, 100])
    const y = useTransform(scrollYProgress, [0, 1], [-500, 0])
    const rotate = useTransform(scrollYProgress, [0, 1], [120, 90])
    return (
        <motion.div style={{y}} ref={container} className={styles.contact}>
            <div className={styles.body}>
                <div className={styles.title}>
                    <span>
                        <div className={styles.imageContainer}>
                            <img
                           object-fit={"fill"}
                            alt={"image"}
                            src={`/images/background.jpg`}
                            />
                        </div>
                        <div className='flex flex-col ml-6 align-center justify-center '> 
                        <h2>Let's work Together</h2>
                        <h5 className='ml-1 md:ml-4 text-sm relative'>Let's work</h5>
                        </div>
                        
                    </span>
                    
                    <motion.div style={{x}} className={styles.buttonContainer}>
                        <Rounded  backgroundColor={"#334BD3"} className={styles.button}>
                            <p>Get in touch</p>
                        </Rounded>
                    </motion.div>
                    
                </div>
                <div className={styles.nav}>
                        <Rounded>
                            <p>info@dennissnellenberg.com</p>
                        </Rounded>
                        <Rounded>
                            <p>+31 6 27 84 74 30</p>
                        </Rounded>
                </div>
               
            
                
            </div>
        </motion.div>
    )
}
