import React from 'react';
import './Resources.css';

export default function Resources() {
  const resources = [
    { id: 1, title: 'Legal Templates Library', type: 'Template', downloads: 1250 },
    { id: 2, title: 'Case Law Database', type: 'Database', downloads: 890 },
    { id: 3, title: 'Legal Glossary', type: 'Guide', downloads: 2100 },
    { id: 4, title: 'Compliance Checklist', type: 'Tool', downloads: 650 },
  ];

  return (
    <div className="page">
      <div className="container">
        <h1>Resources</h1>
        <p className="subtitle">Access valuable tools and materials for your legal work</p>
        
        <div className="resources-grid">
          {resources.map(resource => (
            <div key={resource.id} className="resource-card">
              <h3>{resource.title}</h3>
              <p className="type">{resource.type}</p>
              <p className="downloads">{resource.downloads} downloads</p>
              <button className="btn btn-primary">Download</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
