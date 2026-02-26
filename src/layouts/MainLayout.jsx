import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';
import './MainLayout.css';

export default function MainLayout({ children, isCollapsed, onToggle }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  // Define agents globally to share across notification and sidebar
  const agents = [
    { id: 1, name: "Helmen Tom", role: "Programmer", avatar: "https://i.pravatar.cc/150?u=1", currentTask: "Backend API Setup", taskStatus: "Active", progress: 75 },
    { id: 2, name: "Jane Smith", role: "3D Designer", avatar: "https://i.pravatar.cc/150?u=2", currentTask: "Asset Modeling", taskStatus: "On Leave", progress: 30 },
    { id: 3, name: "Rakib Kowshar", role: "Product Designer", avatar: "https://i.pravatar.cc/150?u=3", currentTask: "UI Kit Design", taskStatus: "Active", progress: 90 },
  ];

  const handleNotifySelect = (agentId) => {
    const agent = agents.find(a => a.id === agentId);
    if (agent) setSelectedAgent(agent);
  };

  return (
    <div className={`main-layout-v2 ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
      <Sidebar 
        isCollapsed={isCollapsed} 
        onToggle={onToggle} 
        isMobileOpen={isMobileMenuOpen} 
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />
      <div className="main-viewport">
        <Header 
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          onNotifyAction={handleNotifySelect}
        />
        <div className="content-with-sidebar">
          <main className="content-container">
            {React.Children.map(children, child => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, { selectedAgent, setSelectedAgent, agents });
              }
              return child;
            })}
          </main>
          <RightSidebar agents={agents} selectedAgent={selectedAgent} />
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
    </div>
  );
}
