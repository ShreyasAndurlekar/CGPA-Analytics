import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import hamburger from '../images/hamburger.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Ref to track the mobile menu

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false); // Close the menu
      }
    };

    // Add event listener when the menu is open
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="navbar">
      <h1 style={{ fontWeight: 900, fontFamily: "'Bahnschrift', sans-serif", letterSpacing: 6 }}>2024 CGPA ARCHIVES</h1>
      
      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        <img src={hamburger} alt="Menu" />
      </div>

      {/* Menu Links */}
      <div className={`g ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
        
        <Link className="g1" to="/map" onClick={toggleMenu}>MAP</Link>
        <Link className="g1" to="/origin" onClick={toggleMenu}>ORIGIN</Link>
      </div>
    </div>
  );
};

export default Navbar;