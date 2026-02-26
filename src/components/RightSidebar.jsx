import React from "react";
import * as Icons from "./Icons";
import "./RightSidebar.css";

export default function RightSidebar({ agents = [], selectedAgent }) {
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
                <section className="side-card chat-side-v2">
                    <div className="side-header">
                      <h3 className="side-title">Direct Chat</h3>
                    </div>
                    {selectedAgent ? (
                      <div className="side-chat-container">
                        <div className="chat-info-v2 flex-center gap-sm">
                            <img src={selectedAgent.avatar} className="avatar-chat" alt="avatar" />
                            <div>
                                <div className="name-v2">{selectedAgent.name}</div>
                                <div className="status-v2">Online</div>
                            </div>
                        </div>
                        <div className="chat-msgs-v2">
                            <div className="msg received-v2">Hello! Ready to work on the {selectedAgent.currentTask}.</div>
                            <div className="msg system-v2">Task in progress: {selectedAgent.progress}%</div>
                        </div>
                        <div className="chat-input-v2 flex-center">
                            <input type="text" placeholder="Send message..." />
                            <button className="send-btn-v2"><Icons.IconOrders /></button>
                        </div>
                      </div>
                    ) : (
                      <div className="no-agent-msg">
                        <Icons.IconCustomers style={{width: '24px', opacity: 0.3, marginBottom: '12px'}} />
                        <p>Select an agent to start chat</p>
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