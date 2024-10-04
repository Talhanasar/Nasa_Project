import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLenis } from 'lenis/react';
import '../css/header.css';

const Header = ({ isLandingPage }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isEventsDropdownOpen, setEventsDropdownOpen] = useState(false);
  const [isPlaygroundDropdownOpen, setPlaygroundDropdownOpen] = useState(false);
  const location = useLocation();
  const lenis = useLenis();

  // Handle scroll to toggle the scrolled state
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    if (isLandingPage) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to scroll smoothly to a specific section
  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      lenis.scrollTo(element);
    }
  };

  const handleLinkClick = (id) => {
    if (isLandingPage) {
      handleScrollToSection(id); // Scroll to section if on landing page
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  const handleScrollOnClick = (path) => {
    if (path === location.pathname) {
      lenis.scrollTo(0, { duration: 0 });
    }
    else {
      navigate(path);
    }
  }

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isLandingPage ? '' : 'default'}`}>
      <div className="logo">
        <img src="/images/logo.png" alt="Logo" />
      </div>
      <HamburgerMenu handleLinkClick={handleLinkClick} handleScrollOnClick={handleScrollOnClick}
      navigate={navigate} />
      <ul className="pc-menu">
        <li onClick={() => handleScrollOnClick('/')}>
          <NavLink to="/">Home</NavLink>
        </li>
        <li
          className="dropdown"
          onMouseEnter={() => setEventsDropdownOpen(true)}
          onMouseLeave={() => setEventsDropdownOpen(false)}
        >
          Events
          <IoIosArrowDown
            style={{
              transform: isEventsDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease-in-out',
            }}
          />
          {isEventsDropdownOpen && (
            <ul className="dropdown-menu">
              <li onClick={() => handleLinkClick('page2')}>Geomagnetic..</li>
              <li onClick={() => handleLinkClick('page3')}>Earth</li>
              <li onClick={() => handleLinkClick('page4')}>Moon</li>
              <li onClick={() => handleLinkClick('page5')}>Mars</li>
              <li onClick={() => navigate('/stormforcast')}>Storm Forecast</li>
            </ul>
          )}
        </li>
        <li
          className="dropdown"
          onMouseEnter={() => setPlaygroundDropdownOpen(true)}
          onMouseLeave={() => setPlaygroundDropdownOpen(false)}
        >
          Playground
          <IoIosArrowDown
            style={{
              transform: isPlaygroundDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease-in-out',
            }}
          />
          {isPlaygroundDropdownOpen && (
            <ul className="dropdown-menu">
              <li onClick={() => handleScrollOnClick('/playground/solarsystem')}>Solar System</li>
              <li onClick={() => handleScrollOnClick('/playground/planets')}>Planets</li>
              <li onClick={() => handleScrollOnClick('/playground/geomagneticstorm')}>Geomagnetic Storm</li>
            </ul>
          )}
        </li>
        <li onClick={() => handleScrollOnClick('/about')}>
          <NavLink to="/about">About Us</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;

const HamburgerMenu = ({ handleLinkClick, handleScrollOnClick }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isEventsDropdownOpen, setEventsDropdownOpen] = useState(false);
  const [isPlaygroundDropdownOpen, setPlaygroundDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleEventsDropdown = () => {
    setEventsDropdownOpen(!isEventsDropdownOpen);
  };

  const togglePlaygroundDropdown = () => {
    setPlaygroundDropdownOpen(!isPlaygroundDropdownOpen);
  };

  const checkMenu = () => {
    toggleMenu();
    if (isEventsDropdownOpen) {
      toggleEventsDropdown();
    }
    if (isPlaygroundDropdownOpen) {
      togglePlaygroundDropdown();
    }
  }

  return (
    <div className="hamburger-container">
      <div className="hamburger-icon" onClick={checkMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`hamburger-nav-links ${isMenuOpen ? 'open' : ''}`}>
        <li onClick={() => { toggleMenu(); handleScrollOnClick('/') }}>
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="dropdown" onClick={toggleEventsDropdown}>
          <div className="dropdown-header">
            Events
            <IoIosArrowDown
              style={{
                transform: isEventsDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease-in-out',
              }}
            />
          </div>
          {isEventsDropdownOpen && (
            <ul className="dropdown-menu">
              <li onClick={() => { toggleMenu(); handleLinkClick('page2'); }}>Geomagnetic Storm</li>
              <li onClick={() => { toggleMenu(); handleLinkClick('page3'); }}>Earth</li>
              <li onClick={() => { toggleMenu(); handleLinkClick('page4'); }}>Moon</li>
              <li onClick={() => { toggleMenu(); handleLinkClick('page5'); }}>Mars</li>
              <li onClick={() => { toggleMenu(); navigate('/stormforcast'); }}>Storm Forecast</li>
            </ul>
          )}
        </li>
        <li className="dropdown" onClick={togglePlaygroundDropdown}>
          <div className="dropdown-header">
            Playground
            <IoIosArrowDown
              style={{
                transform: isPlaygroundDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease-in-out',
              }}
            />
          </div>
          {isPlaygroundDropdownOpen && (
            <ul className="dropdown-menu">
              <li onClick={() => { toggleMenu(); handleScrollOnClick('/playground/solarsystem'); }}>Solar System</li>
              <li onClick={() => { toggleMenu(); handleScrollOnClick('/playground/planets'); }}>Planets</li>
            </ul>
          )}
        </li>
        <li onClick={() => { toggleMenu(); handleScrollOnClick('/about') }}>
          <NavLink to="/about">About Us</NavLink>
        </li>
      </ul>
    </div>
  );
};