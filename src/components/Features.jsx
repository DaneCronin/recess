import React from 'react'
import { TiLocationArrow } from 'react-icons/ti'
import { useState, useRef } from 'react';


// Bento Tilt component to add tilt animation to BentoCard elements
const BentoTilt = ({children, className =''}) => {
  // useState to handle tilt style and new Ref to move the elements
  const [transformStyle, setTransformStyle] = useState('');
  const itemRef = useRef();

  //Function to handle and track mouse move taking event and execute once mouse is over element and when return transform to normal when mouse leaves the card
  // pass this to div in BentoTilt return 
  const handleMouseMove = (e) => {
    // figure out which card mouse is interacting with - if no item card is currently selected just return/exit function
    if(!itemRef.current) return;

    //finds current referenct to element being clicked and gets its relative position properties
    const {left, top, width, height } = itemRef.current.getBoundingClientRect();
    
    //find relative difference between mouse and the card element
    const relativeX = (e.clientX - left) /width;
    const relativeY = (e.clientY - top) /height;

    //
    const tiltX= (relativeY -0.5) * 6;
    const tiltY = (relativeX -0.5) * -6;
    const newTranform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98) `

    setTransformStyle(newTranform);


  }

  const handleMouseLeave = () => {
    setTransformStyle('');
  }

  return (
    <div ref={itemRef} className={className} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} 
    style ={{ transform: transformStyle}}>
      {children}
    </div>
  )
};

// Bento Card Component
const BentoCard = ({src, title, description }) => {
  return (
    <div className="relative size-full">
      <video
      src={src}
      autoPlay
      loop
      muted
      className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between text-blue-50 p-5">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {/* some cards will have descripion, some will not so if description exists then render description */}
          {description && ( 
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        </div>
      
    </div>
  )
}
  






const Features = () => {
  return (
   <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">Check back soon</p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">Site under construction.
        </p>
      </div> 

{/* Bento Card reusable component for Features */}
      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard 
        src="videos/feature-1.mp4"
        title={<> Info 1</>}
        description="Lorem ipsum dolor amet mustache knausgaard +1, blue bottle waistcoat tbh semiotics."
        // isComingSoon prop 
       />
    </BentoTilt>

      {/* Column/grid Div */}
      <div className='grid h-[135vh] w-full gap-7 grid-cols-2 grid-rows-3 '>
        <BentoTilt className=" bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
          src="videos/feature-2.mp4"
          title={<>Project 1</>}
          description="Lorem ipsum dolor amet mustache knausgaard +1, blue bottle waistcoat tbh semiotics.."
           />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0 ">
          <BentoCard
          src="videos/feature-3.mp4"
          title={<>Project 2</>}
          description="Lorem ipsum dolor amet mustache knausgaard +1, blue bottle waistcoat tbh semiotics.."/>
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
          src="videos/feature-4.mp4"
          title={<>Project 3</>}
          description="Lorem ipsum dolor amet mustache knausgaard +1, blue bottle waistcoat tbh semiotics."/>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex flex-col size-full justify-between bg-violet-300 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">More Coming Soon!</h1>
            <TiLocationArrow className="m-5 scale-[5] self-end"/>

          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2 ">
          <video
          src="videos/feature-5.mp4"
          autoPlay
          muted
          loop
          className="size-full object-cover object-center"/>

        </BentoTilt>

      </div>

    </div>


   </section>
  )
}

export default Features
