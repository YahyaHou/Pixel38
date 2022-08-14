import React from 'react'
import "../Styles/Header.css";
import {Link} from "react-router-dom";

function Header() {
  return (
    <>
    <div className="header">
    <div className="logo">
      <span className="pixel-title">Pixel38</span>
    </div>
    <ul className="links">
      <li>Home</li>
      <li>About</li>
      <li>Services</li>
      <li>Portfolio</li>
      <li>Contact</li>
      <li>Blog</li>
      <Link to="/login"><li>Login</li></Link>
    </ul>
  </div>
  </>
  )
}

export default Header;