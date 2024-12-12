import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP} from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";


// Need to register ScrollTrigger to work as plugin
gsap.registerPlugin(ScrollTrigger);



const Hero = () => {
    //UseState to know which video is playing and which is clicked
    const [currentIndex, setCurrentIndex] = useState( 1);
    //check if user has clicked anything.  Start of has clicked is false, as user hasn't clicked 
    const [hasClicked, setHasClicked] = useState( false);
    //useState to see if video is loading
    const [isLoading, setIsLoading] = useState(true);
    // use state for number of videos loaded
    const [loadedVideos, setLoadedVideos] = useState( 0);

    
// Define Number of videos in array to be played
    const totalVideos = 4;
 //useRef to target a specific dom element like the div or the id within which to play video
    const nextVideoRef = useRef( null);

    const handleVideoLoad = () => {
        setLoadedVideos( (prev) => prev +1);

    }
    

 // use Modulo operator to prevent continually incrementing beyond the total number of videos in the list: divides current index number by total number and returns the remainder and then we increment by 1 to continue to loop through to next video in index
 const upcomingVideoIndex = (currentIndex % totalVideos) +1


    // Function to handle mini video player when clicked
    const handleMiniVdClick = () => {
        setHasClicked( true);
      
// checking current index of which video is playing and set it equal to the new upcomingVideoIndex
        setCurrentIndex(upcomingVideoIndex);
}

// Create useEffect to check if videos loaded successfully and changed
useEffect (() => {
    if(loadedVideos === totalVideos -1) {
        setIsLoading(false);
    }

}, [loadedVideos])






// ///
// Use GSAP to handle animations by passing callback function and some dependencies on when function will run- that will be second paramter after comma
// /////
useGSAP(()=> {
    if(hasClicked) {
        // if video has been clicked, enable gsap properties to set with ID of element to animate, then use gsap.to to set what to animate to
        gsap.set('#next-video', {visibility: 'visible'});
        gsap.to('#next-video',{
            transformOrigin: 'center center',
            scale: 1,
            width: '100%',
            height: '100%',
            duration: 1,
            ease: 'power1.inOut',
            onStart: () => nextVideoRef.current.play(),

        } )
    gsap.from('#current-video', {
        transformOrigin: 'center center',
        scale: 0,
        duration: 1.5,
        ease: 'power1.inOut'
    })
    }
}, {dependencies:[currentIndex], revertOnUpdate: true})


// Use GSAP hook to animate rotatation of video into rectangular clip path from css clip-path maker
useGSAP(() => {
    gsap.set('#video-frame',  {
        clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
        borderRadius: "0% 0% 40% 10%",
    });

    gsap.from('#video-frame', {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        borderRadius: '0% 0% 0% 0%',
        ease: 'power1.inOut',
        // set scroll trigger for when animation should happen
        scrollTrigger: {
            trigger: '#video-frame',
            start: 'center center',
            end: 'bottom center',
            scrub: true,
        },
    })
});





    // Function to get video source and index of video playing and automatically return a path of source videos
    const getVideoSrc = (index) => `videos/hero-${index}.mp4`;


  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
        {/* check if isLoading is true and if so render div */}
        {isLoading && (
            <div className="flex-center absolute z-100 h-dvh w-screen overflow-hiddne bg-violet-50">
            <div className="three-body">
                <div className="three-body__dot"/>
                <div className="three-body__dot"/>
                <div className="three-body__dot"/>

                </div>
            </div>
        )}

        <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-violet-500">
        <div>
            <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                <div onClick={handleMiniVdClick} className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
                   <video ref={nextVideoRef} src={getVideoSrc( upcomingVideoIndex)}
                   loop muted id="current-video" className="size-64 origin-center scale-150 object-cover object-center"
                //  onLoadedData special handler to call a function once the data loads and handle loaded video function above
                onLoadedData={handleVideoLoad}
                />
                </div>
            </div>
{/* Main video background player */}
            <video ref={nextVideoRef} src={getVideoSrc(currentIndex)} loop muted id="next-video" className="absolute-center absolute invisible z-20 size-64 object-cover  object-center" onLoadedData={handleVideoLoad} />

            <video src={getVideoSrc(currentIndex === totalVideos -1 ? 1 : currentIndex)} autoPlay loop muted className="absolute left-0 top-0 size-full object-cover object-center" onLoadedData={handleVideoLoad}/>


        </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">RECESS</h1>

        <div className="absolute left-0 top-0 z-40 size-full">
            <div className="mt-24 px-5 sm:px-10">
                <h1 className="special-font hero-heading text-blue-100">RECESS</h1>
                <p className="mb-5 max-w-64 font-robert-regular text-blue-100">Welcome to ... <br/> Something new is coming..</p>
                <Button id="learn-more" title="Learn More" leftIcon={<TiLocationArrow/>} containerClass="!bg-yellow-300 flex-center gap-1"/>

            </div>

        </div>

        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5  text-black">RECESS</h1>
    </div>
  )
}

export default Hero
