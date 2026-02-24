import React from 'react';
import './Agencies.css';

export default function Agencies() {
  const agencies = [
    { id: 1, name: 'Premier Legal Group', specialization: 'Corporate Law', rating: 4.8 },
    { id: 2, name: 'Justice & Associates', specialization: 'Criminal Defense', rating: 4.7 },
    { id: 3, name: 'Counsel International', specialization: 'Intellectual Property', rating: 4.9 },
    { id: 4, name: 'Legal Solutions Ltd', specialization: 'Family Law', rating: 4.6 },
  ];

  return (
    <div className="page">
      <div className="container">
        <h1>Agencies</h1>
        <p className="subtitle">Connect with professional legal agencies and firms</p>
        
        <div className="agencies-grid">
          {agencies.map(agency => (
            <div key={agency.id} className="agency-card">
              <h3>{agency.name}</h3>
              <p className="specialization">{agency.specialization}</p>
              <p className="rating">⭐ {agency.rating}/5.0</p>
              <button className="btn btn-primary">View Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
