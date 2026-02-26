import React, { useState } from 'react';
import * as Icons from '../components/Icons';
import AgentTable from '../components/AgentTable';
import RightSidebar from '../components/RightSidebar';
import './Dashboard.css';

export default function Dashboard({ agents, selectedAgent, setSelectedAgent }) {
  const metricsTabs = [
    { title: "Personal Dashboard", active: false },
    { title: "Firm Dashboard", active: true },
    { title: "Firm Feed", active: false }
  ];

  return (
    <div className="dashboard-content-padding">
      <div className="title-row">
        <h1>Dashboard</h1>
      </div>

      <div className="metrics-grid">
        {/* Hours Card */}
        <div className="flup-card metric-card">
          <div className="card-top flex-between">
            <div className="mini-tabs flex-center">
              <button className="mini-tab active">Monthly</button>
              <button className="mini-tab">Yearly</button>
              <button className="mini-tab">Weekly</button>
            </div>
          </div>
          
          <div className="metric-visualization flex-center">
            <div className="circular-progress-wrap">
                <svg width="100" height="100" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                  <circle cx="60" cy="60" r="54" fill="none" stroke="var(--primary-color)" strokeWidth="10" 
                    strokeDasharray="339.29" strokeDashoffset="210" strokeLinecap="round" />
                </svg>
                <div className="progress-text flex-center flex-column">
                  <span className="label">Total</span>
                  <span className="value">08 Hr</span>
                </div>
            </div>
          </div>

          <div className="metric-legend flex-column">
            <div className="legend-row flex-between">
              <div className="label-wrap flex-center gap-xs">
                  <span className="dot teal"></span>
                  <span>Complete</span>
              </div>
              <strong>03 hour</strong>
            </div>
            <div className="legend-row flex-between mt-sm">
              <div className="label-wrap flex-center gap-xs">
                  <span className="dot gray"></span>
                  <span>Due</span>
              </div>
              <strong>05 hour</strong>
            </div>
          </div>
        </div>

        {/* Action Card */}
        <div className="flup-card action-card">
          <div className="contact-header flex-between">
            <h3>Contact Creation</h3>
            <img src="https://i.pravatar.cc/150?u=me" className="avatar-sm" alt="profile" />
          </div>
          <div className="contact-body">
            <p>Which Type of Contact Do You Want to Create?</p>
            <div className="contact-toggle flex-between">
              <button className="toggle-btn active">✓ Person</button>
              <button className="toggle-btn">Company</button>
            </div>
          </div>
        </div>

        {/* Vertical Stats */}
        <div className="stat-cols-wrapper flex-column gap-md">
          <div className="flup-card mini-stat">
            <span className="stat-title">DRAFT BILLS</span>
            <span className="stat-big-value">5</span>
          </div>
          <div className="flup-card mini-stat">
            <span className="stat-title">AWAITING PAYMENT</span>
            <span className="stat-big-value text-blue">13</span>
          </div>
        </div>

        <div className="stat-cols-wrapper flex-column gap-md">
          <div className="flup-card mini-stat">
            <span className="stat-title">TOTAL IN DRAFT</span>
            <span className="stat-big-value text-red">3</span>
          </div>
          <div className="flup-card mini-stat">
            <span className="stat-title">TOTAL AWAITING</span>
            <span className="stat-big-value text-teal">12</span>
          </div>
        </div>
      </div>

      {/* Performance + Utilization Section */}
      <div className="secondary-grid">
        <div className="flup-card performance-card">
           <div className="chart-header-row flex-between">
              <div className="flex-center gap-sm">
                 <select className="flup-select">
                   <option>Yearly</option>
                 </select>
                 <span className="chart-title">Performance Overview</span>
              </div>
              <div className="chart-units-v2 flex-center">
                 <button className="unit-tab active">Hr</button>
                 <button className="unit-tab">$</button>
              </div>
           </div>
           <div className="bar-chart-v2 flex-between items-end">
              {[35, 60, 25, 80, 45, 90, 40, 65, 55, 75, 30, 50].map((h, i) => (
                <div key={i} className="bar" style={{height: `${h}%`}}></div>
              ))}
           </div>
        </div>

        <div className="flup-card utilization-mini">
           <div className="util-circle-center flex-center">
              <div className="circular-wrap-sm">
                  <svg width="80" height="80" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="44" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                    <circle cx="50" cy="50" r="44" fill="none" stroke="var(--primary-color)" strokeWidth="8" 
                      strokeDasharray="276.46" strokeDashoffset="70" strokeLinecap="round" />
                  </svg>
                  <div className="util-overlay flex-center flex-column">
                    <span className="p">74%</span>
                  </div>
              </div>
           </div>
           <div className="util-breakdown mt-md">
              <div className="flex-between">
                <span className="u-dot blue">Billable</span>
                <strong>$12,345</strong>
              </div>
              <div className="flex-between mt-sm">
                <span className="u-dot red">Non-Billable</span>
                <strong>$1,245</strong>
              </div>
           </div>
        </div>
      </div>

      {/* Agent Table Restoration */}
      <section className="dashboard-agent-section">
        <AgentTable agents={agents} onChatClick={(a) => setSelectedAgent(a)} />
      </section>
    </div>
  );
}
