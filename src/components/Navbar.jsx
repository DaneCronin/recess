import { useRef, useState, useEffect } from 'react';
import { TiLocationArrow } from 'react-icons/ti';
import { FiAlignJustify } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import Button from './Button';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';

const navItems = ['Features', 'Story', 'Projects', 'About', 'Contact'];

const Navbar = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [menuState, setMenuState] = useState(false);
  const navContainerRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove('floating-nav');
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add('floating-nav');
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add('floating-nav');
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const toggleMenu = () => setMenuState(!menuState);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full justify-between items-center p-4">
          {/* Logo and Button */}
          <div className="flex items-center gap-7">
            <img src="/intro.png" alt="LOGO" className="w-10 rounded-full" />
            <Button
              id="product-button"
              title="Learn More"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          {/* Right-hand side of Navbar */}
          <div className="flex h-full items-center">
            {/* Mobile Menu Icon */}
            <div className="md:hidden mr-4">
              <FiAlignJustify
                color="white"
                size={36}
                onClick={toggleMenu}
                className="cursor-pointer"
              />
            </div>

            {/* Desktop Navbar */}
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Side Menu for Mobile */}
      <div
        className={`fixed top-0 md:-right-32 right-0 h-full bg-gray-800 text-white z-50 transition-transform transform ${
          menuState ? 'translate-x-0' : 'translate-x-full'
        } w-1/2 sm:w-1/3 shadow-lg`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold">Menu</h2>
          <AiOutlineClose
            size={24}
            className="cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
        <ul className="flex flex-col gap-4 p-4">
          {navItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="block text-lg hover:text-blue-400"
                onClick={toggleMenu}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
