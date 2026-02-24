import React from 'react';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="page">
      <div className="container">
        <h1>Dashboard</h1>
        <div className="dashboard-content">
          <div className="dashboard-card">
            <h3>Your Profile</h3>
            <p>Manage your professional profile and credentials.</p>
          </div>
          <div className="dashboard-card">
            <h3>Recent Activity</h3>
            <p>Track your recent activities and projects.</p>
          </div>
          <div className="dashboard-card">
            <h3>Statistics</h3>
            <p>View your performance metrics and achievements.</p>
          </div>
          <div className="dashboard-card">
            <h3>Settings</h3>
            <p>Configure your account preferences and notifications.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
