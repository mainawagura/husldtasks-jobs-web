import React from "react";
import "./AgentSummary.css";
import AgentCard from "./AgentCard";

export default function AgentSummary({ agents, onChatClick, onHireClick }) {
    return (
        <section className="agent-summary-cards">
            {agents.map(agent => (
                <AgentCard key={agent.id} agent={agent} onChatClick={onChatClick} />
            ))}
            <AgentCard isHireCard onHireClick={onHireClick} />
        </section>
    );
}