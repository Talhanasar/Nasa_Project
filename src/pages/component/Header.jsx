import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import '../../css/header.css';

const Header = ({ isScrolled, isLandingPage }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

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
                            <li>
                                <NavLink to="/events/conference">
                                    Conference
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/events/webinar">
                                    Webinar
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/events/workshop">
                                    Workshop
                                </NavLink>
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
