import React from 'react'
import gsap from 'gsap';
import {useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/all';


gsap.registerPlugin(ScrollTrigger);


// use Props to make animated title reusable with Title and ContainerClass
const AnimatedTitle = ({title, containerClass}) => {
    const containerRef = useRef(null);


    // create new useEffect hook which allows to perform actions when the page changes (ctx short for context to clean up useEffect on unmount)
    useEffect (() => {
        const ctx = gsap.context(() => {
            const titleAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: '100 bottom',
                    end: 'center bottom',
                    toggleActions: 'play none none reverse',
                }
            });
            titleAnimation.to('.animated-word',{
                opacity: 1,
                transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
                ease: "power2.inOut",
                stagger: 0.02,
              },
              0 );
            //   since within useEffect, clean useEffect up with new callback function to clean it up on unmount of component
            return () => ctx.revert();



        }, containerRef)

        // 


        // leave dependency array [] second argument empty to allow to happen on start
    }, []);


    return (
        <div ref={containerRef} className={`animated-title ${containerClass}`}>
          {title.split("<br />").map((line, index) => (
            <div
              key={index}
              className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
            >
              {line.split(" ").map((word, idx) => (
                <span
                  key={idx}
                  className="animated-word"
                  dangerouslySetInnerHTML={{ __html: word }}
                />
              ))}
            </div>
          ))}
        </div>
      );
    };
    
export default AnimatedTitle;
