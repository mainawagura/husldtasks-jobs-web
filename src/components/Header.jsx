import React, { useState } from 'react';
import * as Icons from './Icons';
import './Header.css';

export default function Header({ onMobileMenuToggle, onNotifyAction }) {
  const [showNotifications, setShowNotifications] = useState(false);
  
  // ... rest of notifications

  const notifications = [
    { id: 1, text: "Helmen Tom completed 'Auth API'", time: "2m ago", unread: true, agentId: 1 },
    { id: 2, text: "Jane Smith is starting 'Modeling'", time: "1h ago", unread: false, agentId: 2 },
    { id: 3, text: "Rakib Kowshar shared UI Kit", time: "3h ago", unread: true, agentId: 3 },
  ];

  return (
    <header className="main-header">
      <div className="header-left flex-center">
        <button className="mobile-menu-btn" onClick={onMobileMenuToggle}>
          <Icons.IconMenu />
        </button>
        <div className="search-bar-global mobile-hidden">
          <Icons.IconSearch className="search-icon" />
          <input type="text" placeholder="Search tasks, agents, documents..." />
          <span className="search-shortcut">⌘K</span>
        </div>
      </div>

      <div className="header-right flex-center">
        <div className="header-action-btns flex-center">
           <button className="header-icon-btn">
             <Icons.IconTracking />
           </button>
           
           <div className="notification-wrapper">
             <button 
               className={`header-icon-btn ${showNotifications ? 'active' : ''}`}
               onClick={() => setShowNotifications(!showNotifications)}
             >
               <Icons.IconLedger />
               <span className="notification-badge"></span>
             </button>

             {showNotifications && (
               <div className="notification-dropdown flup-card">
                 <div className="dropdown-header flex-between">
                   <h3>Notifications</h3>
                   <button className="mark-read">Mark all as read</button>
                 </div>
                 <div className="notification-list">
                    {notifications.map(n => (
                      <div 
                        key={n.id} 
                        className={`notification-item ${n.unread ? 'unread' : ''}`}
                        onClick={() => {
                          onNotifyAction(n.agentId);
                          setShowNotifications(false);
                        }}
                      >
                         <div className="notif-content">
                            <p>{n.text}</p>
                            <span className="notif-not-caption">Click to respond</span>
                            <span className="notif-time">{n.time}</span>
                         </div>
                         {n.unread && <span className="unread-dot"></span>}
                      </div>
                    ))}
                 </div>
                 <button className="view-all-notif">View all notifications</button>
               </div>
             )}
           </div>

           <button className="header-icon-btn">
             <Icons.IconSettings />
           </button>
        </div>

        <div className="header-user flex-center">
          <div className="user-text-meta">
            <span className="u-name">Harper Nelson</span>
            <span className="u-role">Admin Manager</span>
          </div>
          <img src="https://i.pravatar.cc/150?u=harper" alt="user" className="header-avatar" />
        </div>
      </div>
    </header>
  );
}
