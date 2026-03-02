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
              <div className="brand-logo-wrap">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="28" height="28" rx="8" fill="var(--primary-color)"/>
                  <path d="M8 8H12V20H8V8Z" fill="white"/>
                  <path d="M16 8H20V20H16V8Z" fill="white" fillOpacity="0.6"/>
                  <path d="M12 12H16V16H12V12Z" fill="white"/>
                </svg>
              </div>
              {!isCollapsed && <span className="brand-name">HUSLD.</span>}
            </div>
            <button className="collapse-toggle" onClick={onToggle}>
              {isCollapsed ? <Icons.IconDashboard style={{width: '12px', transform: 'rotate(90deg)'}} /> : "❮"}
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