import React, { useState } from 'react'
import styles from './style.module.css';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { menuSlide } from '../anim';
import Link from './Link';
import Curve from './Curve';
import Footer from './Footer';

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Web Design",
    href: "/webdesign",
  },
  {
  title: "Product Photography",
    href: "/productphotography",
  },
  {
    title: "Marketing",
    href: "/marketing",
  },
]

export default function Nav() {

  const location = useLocation();
  const [selectedIndicator, setSelectedIndicator] = useState(location.pathname);

  return (
    <motion.div variants={menuSlide} initial="initial" animate="enter" exit="exit" className={styles.menu}>
       <div className={styles.body}>
            <div onMouseLeave={() => {setSelectedIndicator(location.pathname)}} className={styles.nav}>
                    <div className={styles.header}>
                        <p>Navigation</p>
                    </div>
                    {
                      navItems.map( (data, index) => {
                        return <Link key={index} data={{...data, index}} isActive={selectedIndicator === data.href} setSelectedIndicator={setSelectedIndicator}></Link>
                      })
                    }
            </div>
            <Footer />
        </div>
        <Curve />
    </motion.div>
  )
}