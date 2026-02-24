import React from 'react';
import './Pages.css';

export default function Home() {
  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Legiit</h1>
          <p>Your platform for legal services, courses, and professional networking</p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </section>

      <section className="features">
        <div className="features-grid">
          <div className="feature-card">
            <h3>Dashboard</h3>
            <p>Manage your profile, projects, and track your progress in one place.</p>
          </div>
          <div className="feature-card">
            <h3>Marketplace</h3>
            <p>Connect with legal professionals and access quality services.</p>
          </div>
          <div className="feature-card">
            <h3>Courses</h3>
            <p>Learn from industry experts through our comprehensive courses.</p>
          </div>
          <div className="feature-card">
            <h3>Resources</h3>
            <p>Access valuable resources and tools for your legal journey.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
