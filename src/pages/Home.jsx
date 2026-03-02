import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from '../components/Icons';
import heroImg from '../assets/images/hero.png';
import marketplaceImg from '../assets/images/marketplace.png';
import dashboardImg from '../assets/images/dashboard.png';
import workflowsImg from '../assets/images/workflows.png';
import ledgerImg from '../assets/images/ledger.png';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page">
      {/* Navigation */}
      <nav className="home-nav flex-between">
        <div className="nav-brand">HUSLD.</div>
        <div className="nav-links">
          <Link to="/marketplace">Marketplace</Link>
          <Link to="/agencies">Agencies</Link>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>
        <div className="nav-auth">
          <Link to="/login" className="btn btn-secondary nav-auth-login">Log In</Link>
          <Link to="/signup" className="btn btn-primary">Join Husld</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container flex-between container">
          <div className="hero-content text-left">
            <div className="hero-badge">Now in Beta • version 1.0.4</div>
            <h1>Empower Your Digital Hustle.</h1>
            <p>
              Connect with top-tier talent, manage your agency projects, 
              and scale your professional legal and creative services on the world's 
              most intuitive collaboration platform.
            </p>
            <div className="hero-ctas">
              <Link to="/signup" className="btn btn-primary">Start Your Journey</Link>
              <Link to="/marketplace" className="btn btn-secondary">Explore Services</Link>
            </div>
          </div>
          <div className="hero-visual">
            <img src={heroImg} alt="Husld Platform" className="floating-img" />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-value">12k+</span>
            <span className="stat-label">Active Users</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">$2.4M</span>
            <span className="stat-label">Paid to Talent</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">98%</span>
            <span className="stat-label">Success Rate</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">24/7</span>
            <span className="stat-label">Expert Support</span>
          </div>
        </div>
      </section>

      {/* Features / Benefits */}
      <section id="features" className="benefits">
        <div className="section-header">
          <h2>Everything you need to grow</h2>
          <p>A comprehensive suite of tools designed for modern legal professionals and digital agencies.</p>
        </div>
        <div className="benefits-grid">
          <div className="benefit-card flup-card">
            <div className="benefit-icon">
              <Icons.IconDashboard />
            </div>
            <h3>Smart Dashboard</h3>
            <div className="benefit-preview">
              <img src={dashboardImg} alt="Dashboard" />
            </div>
            <p>Track every project, deadline, and payment in a beautiful, unified workspace built for efficiency.</p>
          </div>
          <div className="benefit-card flup-card">
            <div className="benefit-icon">
              <Icons.IconMarketplace />
            </div>
            <h3>Top Talent Marketplace</h3>
            <div className="benefit-preview">
              <img src={marketplaceImg} alt="Marketplace" />
            </div>
            <p>Access a curated network of legal experts and agency partners ready to help you scale instantly.</p>
          </div>
          <div className="benefit-card flup-card">
            <div className="benefit-icon">
              <Icons.IconTracking />
            </div>
            <h3>Agency Workflows</h3>
            <div className="benefit-preview">
              <img src={workflowsImg} alt="Workflows" />
            </div>
            <p>Built-in tools for agency management, resource allocation, and collaborative service delivery.</p>
          </div>
          <div className="benefit-card flup-card">
            <div className="benefit-icon">
              <Icons.IconLedger />
            </div>
            <h3>Financial Ledger</h3>
            <div className="benefit-preview">
              <img src={ledgerImg} alt="Ledger" />
            </div>
            <p>Automated invoicing, tax tracking, and financial reporting specifically for service-based businesses.</p>
          </div>
        </div>
      </section>

      {/* Footer Placeholder */}
      <footer className="home-footer">
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Husld Platform. All rights reserved. Built for the modern professional.</p>
        </div>
      </footer>
    </div>
  );
}
