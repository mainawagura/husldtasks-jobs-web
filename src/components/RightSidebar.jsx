import React from "react";
import * as Icons from "./Icons";
import "./RightSidebar.css";

export default function RightSidebar({ agents = [], selectedAgent }) {
    const [messages, setMessages] = React.useState({
      1: [{ text: "Hello! Ready to work on the Backend API Setup.", type: "received", time: "10:30 AM" }],
      2: [{ text: "I'm currently asset modeling for the 3D scene.", type: "received", time: "11:15 AM" }],
      3: [{ text: "UI Kit is shared. Let me know if you need changes.", type: "received", time: "11:45 AM" }]
    });
    const [inputValue, setInputValue] = React.useState("");
    const [isTyping, setIsTyping] = React.useState(false);

    // Trigger typing animation when agent changes
    React.useEffect(() => {
      if (selectedAgent) {
        setIsTyping(true);
        const timer = setTimeout(() => setIsTyping(false), 800);
        return () => clearTimeout(timer);
      }
    }, [selectedAgent?.id]);

    const handleSend = () => {
      if (!inputValue.trim() || !selectedAgent) return;
      
      const agentId = selectedAgent.id;
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newMsg = { text: inputValue, type: "sent", time: timeStr };
      
      setMessages(prev => ({
        ...prev,
        [agentId]: prev[agentId] ? [...prev[agentId], newMsg] : [newMsg]
      }));
      setInputValue("");
    };

    const currentMessages = selectedAgent ? (messages[selectedAgent.id] || []) : [];

    return (
        <aside className="right-sidebar">
            <div className="right-sidebar-scroll">
                {/* Hired Agents Section */}
                <section className="side-card">
                    <div className="side-header flex-between">
                      <h3 className="side-title">Hired Agents</h3>
                      <button className="icon-btn-tiny"><Icons.IconExport style={{width: '12px'}} /></button>
                    </div>
                    <ul className="agent-list-mini">
                        {agents.map(agent => (
                            <li key={agent.id} className={`agent-item-mini ${selectedAgent?.id === agent.id ? "active" : ""}`}>
                                <div className="avatar-mini-wrap">
                                  <img src={agent.avatar} alt={agent.name} />
                                  <span className={`status-dot-mini ${agent.taskStatus === 'Active' ? 'online' : 'away'}`}></span>
                                </div>
                                <div className="agent-mini-info">
                                    <strong>{agent.name}</strong>
                                    <p>{agent.taskStatus}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Chat Section */}
                <section className="side-card chat-side-v3">
                    <div className="side-header">
                      <h3 className="side-title">Direct Chat</h3>
                    </div>
                    {selectedAgent ? (
                      <div className="side-chat-wrapper">
                        <div className="chat-agent-header flex-between gap-sm">
                            <div className="flex-center gap-sm">
                              <img src={selectedAgent.avatar} className="avatar-chat-v3" alt="avatar" />
                              <div>
                                  <div className="name-v3">{selectedAgent.name}</div>
                                  <div className="status-v3">Cloud Native Agent</div>
                              </div>
                            </div>
                            <div className="chat-header-actions flex-center gap-xs">
                               <button className="icon-btn-chat"><Icons.IconTracking style={{width: '14px'}} /></button>
                               <button className="icon-btn-chat"><Icons.IconSettings style={{width: '14px'}} /></button>
                            </div>
                        </div>
                        
                        <div className="chat-feed-v3">
                            {currentMessages.map((m, idx) => (
                              <div key={idx} className={`chat-bubble-v3 ${m.type}`}>
                                <div className="bubble-text">{m.text}</div>
                                <span className="bubble-time">{m.time}</span>
                              </div>
                            ))}
                            {isTyping && (
                              <div className="typing-indicator-v3">
                                <span></span><span></span><span></span>
                              </div>
                            )}
                        </div>

                        <div className="chat-controls-v3 flex-center">
                            <input 
                              type="text" 
                              placeholder="Type a message..." 
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button className="send-btn-v3" onClick={handleSend}>
                                <Icons.IconOrders style={{width: '14px'}} />
                            </button>
                        </div>
                      </div>
                    ) : (
                      <div className="no-agent-empty flex-center flex-column">
                        <div className="empty-chat-illustration">
                           <div className="illustration-circle">
                             <Icons.IconCustomers />
                           </div>
                        </div>
                        <h4>Collaborate Instantly</h4>
                        <p>Select a hired agent from your list to start a secure conversation and track progress.</p>
                      </div>
                    )}
                </section>

                {/* Performance Mini Card */}
                <section className="side-card performance-mini">
                    <div className="side-header flex-between">
                      <h3 className="side-title">Weekly Productivity</h3>
                      <span className="growth-tag">+12%</span>
                    </div>
                    <div className="mini-bars-v2 items-end flex-between">
                      {[30, 50, 40, 70, 60, 80, 50].map((h, i) => (
                        <div key={i} className="m-bar" style={{height: `${h}%`, opacity: i === 5 ? 1 : 0.4}}></div>
                      ))}
                    </div>
                </section>
            </div>
        </aside>
    );
}