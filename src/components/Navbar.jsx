
import { useRef, useState, useEffect} from 'react'
import { TiLocationArrow } from 'react-icons/ti'
import Button from './Button'
import { useWindowScroll } from 'react-use'
import gsap from 'gsap'


// Define Nav Items to go in mobile/small screen Navbar
const navItems= ['Features', 'Story', 'Projects', 'About', 'Contact']





const Navbar = () => {


  // useState for last scroll Y to check when user starts scrolling back, start position is 0
  const [lastScrollY, setLastScrollY] = useState(0)
  // useState to check if Navbar is visible to use to toggle Navbar visibility, at start set to true to show NavBar
  const [ isNavVisible, setIsNavVisible] = useState (true)



// Function to play audio from audio button with new Ref to attach audio to button element
const navContainerRef = useRef(null);


// Destructure Y scroll and rename to currentScrollY and make it equal to useWindowScroll hook with react-use
const {y: currentScrollY} = useWindowScroll();

//new useEffect to change on current Scroll Y and last Y scroll position dependent on currentScrollY
useEffect(() => {
  // if current y scroll position is equal to 0, that is the top and show Navbar and remove floating bar class styling element
  if(currentScrollY ===0 ) {
    setIsNavVisible(true);
    navContainerRef.current.classList.remove('floating-nav');
    // else if to check if current scrollY is greater than last scrollY or user is scrolling down, then remove nav bar visibility and add floating bar class
  } else if(currentScrollY > lastScrollY){
    setIsNavVisible(false);
    navContainerRef.current.classList.add('floating-nav');
  }
  // another else if current Scroll Y is lower than last scroll Y, set nav bar visible to true and add floating nav to show nav bar when user scrolls up
  else if(currentScrollY < lastScrollY) {
    setIsNavVisible(true);
    navContainerRef.current.classList.add('floating-nav');
  }
  //set Last ScrollY = current scroll Y to track the scroll Y position
  setLastScrollY(currentScrollY, lastScrollY);
}, [currentScrollY])


// gsap Animation for Navbar that will change based on if Navbar is visible. if isNavbar is visible, then set it equal to 0, else set to -100, same for opacity
useEffect (() => {
  gsap.to(navContainerRef.current, {
    y: isNavVisible ? 0 : -100,
    opacity: isNavVisible ? 1 : 0,
    duration: 0.2,
  })
}, [isNavVisible])






  return (
    <div ref={navContainerRef} className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
        <header className='absolute top-1/2 w-full -translate-y-1/2'>

        <nav className="flex size-full justify-between items-center p-4">
            {/* Logo on left */}
            <div className = "flex items-center gap-7">
                <img
                src="/intro.png" alt="LOGO" className="w-10 rounded-full"/>
          
                <Button
                id="product-button"
                title="Learn More"
                rightIcon={<TiLocationArrow/>}
                containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"/>
            </div>


{/* Right-hand side of Navbar */}
            <div className="flex h-full items-center ">

      {/* Div for Navbar on small devices */}
              <div className="hidden md:block">
                {navItems.map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`}className="nav-hover-btn">
                    {item}
                  </a>
                ))}

              </div>

           

            </div>



        </nav>
        </header>
     
    </div>
  )
}

export default Navbar;
