import React from 'react'
import "./style.css"
import logo from './assets/images/DIT_logo.jpg';
import {Link} from "react-router-dom"

const Nav = () => {
    return (
        <nav className="navbar">
            {/* Logo Section */}
            <div className="navbar-logo">
                <img src={logo} alt="DIT University Logo" /> {/* Replace with the correct path to your logo */}
                <span style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>DIT University</span>
            </div>

            {/* Menu Section */}
            <ul className="navbar-menu">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Student Progress</a></li>
                <li><a href="#">Contact Us</a></li>
            </ul>

            {/* Search and Authentication Section */}
            <div className="navbar-right">
                {/* Search Bar */}
                <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                    <button>Search</button>
                </div>

                {/* Authentication Buttons */}
                <div className="auth-buttons">
                    <a href="/login">Login</a>
                    <a href="/signup">Sign Up</a>
                </div>
            </div>
        </nav>
    )
}

export default Nav
