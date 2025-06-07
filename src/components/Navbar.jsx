import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaShoppingBag,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBars,
} from 'react-icons/fa';
import '../style.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="logo">SaleSeller</div>

        <button className="menu-toggle" onClick={toggleMenu}>
          <FaBars />
        </button>

        <div className={`nav-links ${isOpen ? 'show' : ''}`}>
          <NavLink to="/" className="nav-link" onClick={closeMenu}>
            <FaHome className="inline-icon" /> Home
          </NavLink>
          <NavLink to="/shop" className="nav-link" onClick={closeMenu}>
            <FaShoppingBag className="inline-icon" /> Shop
          </NavLink>
          <NavLink to="/wishlist" className="nav-link" onClick={closeMenu}>
            <FaHeart className="inline-icon" /> Wishlist
          </NavLink>
          <NavLink to="/cart" className="nav-link" onClick={closeMenu}>
            <FaShoppingCart className="inline-icon" /> Cart
          </NavLink>
          <NavLink to="/account" className="nav-link" onClick={closeMenu}>
            <FaUser className="inline-icon" /> Account
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
