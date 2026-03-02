import React, { useState } from 'react';
import * as Icons from './Icons';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header({ onMobileMenuToggle, onNotifyAction }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  
  // ... rest of notifications

  const [notifications, setNotifications] = useState([
    { id: 1, text: "Helmen Tom completed 'Auth API'", time: "2m ago", unread: true, agentId: 1, avatar: "https://i.pravatar.cc/150?u=1" },
    { id: 2, text: "Jane Smith is starting 'Modeling'", time: "1h ago", unread: false, agentId: 2, avatar: "https://i.pravatar.cc/150?u=2" },
    { id: 3, text: "Rakib Kowshar shared UI Kit", time: "3h ago", unread: true, agentId: 3, avatar: "https://i.pravatar.cc/150?u=3" },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const clearAll = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  const handleNotifClick = (n) => {
    setNotifications(notifications.map(notif => 
      notif.id === n.id ? { ...notif, unread: false } : notif
    ));
    onNotifyAction(n.agentId);
    setShowNotifications(false);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login');
    } catch (err) {
      console.error("Error signing out:", err);
      alert("Failed to sign out. Please try again.");
    }
  };

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
                    <button className="mark-read" onClick={markAllRead}>Mark all as read</button>
                  </div>
                 <div className="notification-list">
                    {notifications.map(n => (
                       <div 
                         key={n.id} 
                         className={`notification-item ${n.unread ? 'unread' : ''}`}
                         onClick={() => handleNotifClick(n)}
                       >
                          <img src={n.avatar} alt="" className="notif-avatar" />
                          <div className="notif-content">
                             <p>{n.text}</p>
                             <div className="notif-meta-row flex-between">
                                <span className="notif-time">{n.time}</span>
                                <span className="notif-action-hint">Reply now</span>
                             </div>
                          </div>
                          {n.unread && <span className="unread-dot"></span>}
                       </div>
                    ))}
                 </div>
                  <button className="view-all-notif" onClick={clearAll}>Clear all notifications</button>
                </div>
              )}
            </div>

           <button className="header-icon-btn">
             <Icons.IconSettings />
           </button>
        </div>

        <div className="header-user-wrapper">
          <div className={`header-user flex-center ${showUserMenu ? 'active' : ''}`} onClick={() => setShowUserMenu(!showUserMenu)}>
            <div className="user-text-meta">
              <span className="u-name">Harper Nelson</span>
              <span className="u-role">Admin Manager</span>
            </div>
            <div className="avatar-wrapper">
              <img src="https://i.pravatar.cc/150?u=harper" alt="user" className="header-avatar" />
              <div className="status-indicator online"></div>
            </div>
          </div>

          {showUserMenu && (
            <div className="user-dropdown flup-card">
              <div className="dropdown-section">
                <div className="dropdown-item"><Icons.IconCustomers /> My Profile</div>
                <div className="dropdown-item"><Icons.IconTracking /> My Activity</div>
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-section">
                <div className="dropdown-item"><Icons.IconSettings /> Settings</div>
                <div className="dropdown-item danger" onClick={handleLogout}><Icons.IconMenu /> Logout</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
