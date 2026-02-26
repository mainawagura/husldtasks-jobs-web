import React from 'react';
import * as Icons from '../components/Icons';
import './Tracking.css';

const tasks = [
  { id: 1, name: "Backend API Setup", agent: "Helmen Tom", progress: 75, status: "active", deadline: "Oct 24, 2026" },
  { id: 2, name: "UI Kit Design", agent: "Rakib Kowshar", progress: 90, status: "active", deadline: "Oct 26, 2026" },
  { id: 3, name: "Asset Modeling", agent: "Jane Smith", progress: 30, status: "on-leave", deadline: "Nov 02, 2026" },
  { id: 4, name: "Landing Page Copy", agent: "Peter Maina", progress: 100, status: "completed", deadline: "Oct 20, 2026" },
];

export default function Tracking() {
  return (
    <div className="tracking-page">
      <header className="page-header-v2">
        <h1 className="flex-center gap-sm">
           <Icons.IconTracking style={{width: '24px'}} /> Task Progress Tracking
        </h1>
        <p>Monitor your workforce productivity in real-time</p>
      </header>

      <div className="tracking-grid">
         {tasks.map(task => (
           <div key={task.id} className="flup-card task-track-card">
              <div className="card-top flex-between">
                 <div className="task-main-info">
                   <span className={`status-tag-v2 ${task.status}`}>{task.status}</span>
                   <h3>{task.name}</h3>
                 </div>
                 <button className="icon-btn-v2"><Icons.IconOrders /></button>
              </div>

              <div className="task-agent-meta flex-center gap-sm">
                 <img src={`https://i.pravatar.cc/100?u=${task.agent}`} alt="avatar" className="mini-avatar-v2" />
                 <div className="meta-text">
                   <span className="label-v2">Assigned to</span>
                   <span className="name-v2">{task.agent}</span>
                 </div>
              </div>

              <div className="task-progress-section">
                 <div className="progress-labels flex-between">
                    <span>Progress</span>
                    <strong>{task.progress}%</strong>
                 </div>
                 <div className="main-progress-bar">
                    <div className="fill" style={{width: `${task.progress}%`}}></div>
                 </div>
              </div>

              <div className="card-footer-v2 flex-between">
                 <div className="footer-item">
                    <span className="label-v2">Deadline</span>
                    <span className="val-v2">{task.deadline}</span>
                 </div>
                 <button className="btn-details">View Details</button>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}
