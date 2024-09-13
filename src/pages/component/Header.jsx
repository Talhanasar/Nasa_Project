import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../css/header.css';

const Header = ({ isScrolled, isLandingPage }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleScroll = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleLinkClick = (id) => {
        if (isLandingPage) {
            // If on the landing page, scroll to the section
            handleScroll(id);
        } else {
            // Navigate to landing page and pass the section id as state
            navigate("/", { state: { scrollTo: id } });
        }
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isLandingPage ? '' : 'default'}`}>
            <div className="name">
                Zenith
            </div>
            <div className="logo">
                <img src="/assets/logo.png" alt="Logo" />
            </div>
            <ul>
                <li>
                    <NavLink to="/" >
                        Home
                    </NavLink>
                </li>
                <li
                    className="dropdown"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                >
                    Events
                    <IoIosArrowDown
                        style={{
                            transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease-in-out',
                        }}
                    />
                    {isDropdownOpen && (
                        <ul className="dropdown-menu">
                            <li onClick={() => handleLinkClick('page2')} >
                                Conference
                            </li>
                            <li onClick={() => handleLinkClick('page3')}>
                                Webinar
                            </li>
                            <li onClick={() => handleLinkClick('page4')}>
                                Workshop
                            </li>
                        </ul>
                    )}
                </li>
                <li>
                    <NavLink to="/about">
                        About Us
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Header;
