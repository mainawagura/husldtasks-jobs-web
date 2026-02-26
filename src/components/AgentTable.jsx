import React from "react";
import * as Icons from "./Icons";
import "./AgentTable.css";

export default function AgentTable({ agents = [], onChatClick }) {
    return (
        <section className="agent-table-section flup-card">
            <div className="table-header-v2 flex-between">
                <div>
                  <h2 className="table-title">Hired Agents</h2>
                  <p className="table-subtitle">Management workforce status</p>
                </div>
                <div className="header-actions-v2">
                   <button className="btn-secondary-sm">
                      <Icons.IconFilter /> Filter
                   </button>
                </div>
            </div>
            <table className="flup-table">
                <thead>
                    <tr>
                        <th>Agent Name</th>
                        <th>Role</th>
                        <th>Current Task</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {agents.map(agent => (
                        <tr key={agent.id}>
                            <td className="agent-cell">
                              <img src={agent.avatar} alt={agent.name} className="table-avatar" />
                              <div className="agent-meta">
                                <strong>{agent.name}</strong>
                                <span className="meta-tag">Verified</span>
                              </div>
                            </td>
                            <td className="role-cell">{agent.role}</td>
                            <td className="task-cell">
                                <div className="task-info">
                                  <span>{agent.currentTask}</span>
                                  <div className="progress-bar-sm">
                                    <div className="progress-fill" style={{width: `${agent.progress}%`}}></div>
                                  </div>
                                </div>
                            </td>
                            <td>
                                <span className={`status-pill ${agent.taskStatus.toLowerCase().replace(" ", "-")}`}>
                                    {agent.taskStatus}
                                </span>
                            </td>
                            <td className="action-cell">
                                <button className="btn-chat-v2 flex-center" onClick={() => onChatClick(agent)}>
                                    <Icons.IconOrders style={{width: '14px', height: '14px', marginRight: '6px'}} /> Chat
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}