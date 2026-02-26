import React from "react";
import "./AgentCard.css";

export default function AgentCard({ agent, onChatClick, isHireCard = false, onHireClick }) {
    if (isHireCard) {
        return (
            <div className="agent-card hire-agent" onClick={onHireClick}>
                <div className="plus-icon">+</div>
                <p>Hire New Agent</p>
            </div>
        );
    }

    return (
        <div className="agent-card">
            <img src={agent.avatar} alt={agent.name} className="agent-avatar" />
            <h4>{agent.name}</h4>
            <p className="agent-role">{agent.role}</p>
            <p><strong>{agent.tasksCompleted}</strong> Tasks Completed</p>
            <p><strong>{agent.tasksPending}</strong> Tasks Pending</p>
            <span className={`task-status task-status-${agent.taskStatus.toLowerCase().replace(" ", "-")}`}>
                {agent.taskStatus}
            </span>
            <button className="btn-chat" onClick={() => onChatClick(agent)}>Chat</button>
        </div>
    );
}