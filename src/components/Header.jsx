import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">LEGIIT</Link>
        </div>
                <nav className="nav-menu">

          <Link to="/marketplace" className="nav-item">Marketplace</Link>
          <Link to="/courses" className="nav-item">Courses</Link>
          <Link to="/resources" className="nav-item">Resources</Link>
          <Link to="/agencies" className="nav-item">Agencies</Link>
        </nav>

        <div className="auth-buttons">
          <Link to="/login" className="btn btn-login">Log In</Link>
          <Link to="/signup" className="btn btn-signup">Sign Up</Link>
        </div>
      </div>
    </header>
  );
}
