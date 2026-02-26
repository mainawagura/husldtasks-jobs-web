import React from "react";
import "./DashboardHeader.css";

export default function DashboardHeader({ user = { name: "Rakib" } }) {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1>Hello, {user.name} 👋</h1>
      </div>
      <div className="header-right">
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <i className="search-icon">🔍</i>
        </div>
        <div className="header-actions">
          <button className="icon-btn chat-icon">💬</button>
          <div className="user-profile">
            <img src="https://ui-avatars.com/api/?name=Peter+Maina&background=7b61ff&color=fff" alt="Profile" />
          </div>
        </div>
      </div>
    </header>
  );
}
