'use client';
import { useEffect } from 'react';
import Index from './Intro/Intro';
import Description from './Description/Description';
import Projects from './Projects/Projects';


export default function SmoothScroll() {

  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();
      }
    )()
  }, [])

  return (
      <main className='flex flex-col gap-0' >
        <Index />
        <Description />
        <Projects/>
      </main>
  )
}
