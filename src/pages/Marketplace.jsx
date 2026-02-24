import React from 'react';
import './Marketplace.css';

export default function Marketplace() {
  const services = [
    { id: 1, title: 'Legal Consultation', provider: 'Expert Lawyers', price: '$50/hr' },
    { id: 2, title: 'Contract Review', provider: 'Legal Advisors', price: '$100/doc' },
    { id: 3, title: 'Document Drafting', provider: 'Professional Writers', price: '$75/doc' },
    { id: 4, title: 'Legal Research', provider: 'Research Team', price: '$40/hr' },
  ];

  return (
    <div className="page">
      <div className="container">
        <h1>Marketplace</h1>
        <p className="subtitle">Browse and book legal services from trusted professionals</p>
        
        <div className="marketplace-grid">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <h3>{service.title}</h3>
              <p className="provider">{service.provider}</p>
              <p className="price">{service.price}</p>
              <button className="btn btn-primary">Book Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
