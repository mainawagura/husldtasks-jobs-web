import React from "react";
import { NavLink } from "react-router-dom";
import * as Icons from "./Icons";
import "./Sidebar.css";

export default function Sidebar({ isCollapsed, onToggle, isMobileOpen, onCloseMobile }) {
  const sections = [
    {
      title: "MARKETING",
      items: [
        { id: "dashboard", label: "Dashboard", Icon: Icons.IconDashboard, path: "/dashboard" },
        { id: "marketplace", label: "Marketplace", Icon: Icons.IconMarketplace, path: "/marketplace" },
        { id: "orders", label: "Orders", Icon: Icons.IconOrders, path: "/orders" },
        { id: "tracking", label: "Tracking", Icon: Icons.IconTracking, path: "/tracking" },
        { id: "customers", label: "Customers", Icon: Icons.IconCustomers, path: "/agencies" },
        { id: "discounts", label: "Discounts", Icon: Icons.IconDiscounts, path: "/discounts" },
      ]
    },
    {
      title: "PAYMENTS",
      items: [
        { id: "ledger", label: "Ledger", Icon: Icons.IconLedger, path: "/ledger" },
        { id: "taxes", label: "Taxes", Icon: Icons.IconTaxes, path: "/taxes" },
      ]
    },
    {
      title: "SYSTEM",
      items: [
        { id: "settings", label: "Settings", Icon: Icons.IconSettings, path: "/settings" },
      ]
    }
  ];

  return (
    <nav className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-scroll">
        <div className="sidebar-top">
          <div className="brand flex-between">
            <div className="brand-content flex-center">
              <div className="brand-icon flex-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8Z" fill="currentColor"/>
                </svg>
              </div>
              {!isCollapsed && <span className="brand-name">Flup</span>}
            </div>
            <button className="collapse-toggle" onClick={onToggle}>
              {isCollapsed ? "❯" : "❮"}
            </button>
          </div>
          
          <div className="sidebar-nav">
            {sections.map((section) => (
              <div key={section.title} className="nav-section">
                {!isCollapsed && <h4 className="section-title">{section.title}</h4>}
                <ul className="menu">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <NavLink 
                        to={item.path} 
                        className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
                        onClick={onCloseMobile}
                      >
                        <span className="menu-icon"><item.Icon /></span>
                        {!isCollapsed && <span className="menu-label">{item.label}</span>}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="sidebar-footer">
        <div className="system-actions">
           <div className={`dark-mode-toggle flex-between ${isCollapsed ? 'centered' : ''}`}>
              {!isCollapsed && (
                <div className="toggle-label flex-center gap-sm">
                  <Icons.IconMoon />
                  <span className="text-sm">Dark mode</span>
                </div>
              )}
              <div className="toggle-switch">
                <input type="checkbox" id="dark-mode" />
                <label htmlFor="dark-mode"></label>
              </div>
           </div>
        </div>

        <div className="user-profile">
          <img src="https://i.pravatar.cc/150?u=harper" alt="user" className="user-avatar" />
          {!isCollapsed && (
            <div className="user-info">
              <span className="user-name">Harper Nelson</span>
              <span className="user-role">Admin Manager</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}