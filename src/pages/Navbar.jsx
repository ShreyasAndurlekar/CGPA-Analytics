import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the corresponding CSS file

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <h1 style={{ fontWeight: 900, fontFamily: "'Bahnschrift', sans-serif", letterSpacing: 6 }}>
        2024 CGPA ARCHIVES
      </h1>

      <div className="hamburger" onClick={toggleMenu}>
        &#9776; {/* Unicode for hamburger icon */}
      </div>

      <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link className="g1" to="/map">MAP</Link>
        <Link className="g1" to="/origin">ORIGIN</Link>
        {/* Add more links here */}
      </div>

      <div className="g">
        <Link className="g1" to="/map">MAP</Link>
        <Link className="g1" to="/origin">ORIGIN</Link>
        {/* Add more links here if necessary */}
      </div>
    </div>
  );
};

export default Navbar;
