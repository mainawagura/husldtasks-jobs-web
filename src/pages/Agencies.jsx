import * as Icons from '../components/Icons';
import './Agencies.css';

export default function Agencies() {
  const agencies = [
    { id: 1, name: "Premier Legal Group", spec: "Corporate Law", rating: 4.8, members: 120, location: "New York", verified: true, price: "$2,500+", Icon: Icons.IconDashboard },
    { id: 2, name: "Justice & Associates", spec: "Criminal Defense", rating: 4.7, members: 98, location: "London", verified: true, price: "$1,800+", Icon: Icons.IconOrders },
    { id: 3, name: "Counsel International", spec: "Intellectual Property", rating: 4.9, members: 150, location: "Toronto", verified: false, price: "$3,200+", Icon: Icons.IconCustomers },
    { id: 4, name: "Legal Solutions Ltd", spec: "Family Law", rating: 4.6, members: 87, location: "Sydney", verified: true, price: "$1,200+", Icon: Icons.IconOrders },
  ];

  return (
    <div className="professional-page">
      <header className="page-header">
        <div className="header-text">
          <h1>Agencies</h1>
          <p className="text-muted">Hire top-tier specialized legal agencies for large-scale operations</p>
        </div>
        <button className="btn-primary-v2">+ Register Agency</button>
      </header>

      <div className="page-content">
        <div className="agency-list-v3">
           {agencies.map(agency => (
             <div key={agency.id} className="flup-card agency-row-v2 flex-between">
                <div className="agency-main-info flex-center gap-md">
                   <div className="agency-avatar-v2 flex-center">
                     <agency.Icon className="a-icon" />
                   </div>
                   <div className="agency-details-v2">
                      <div className="flex-center gap-sm">
                        <h3>{agency.name}</h3>
                        {agency.verified && <span className="verified-check">✓</span>}
                      </div>
                      <p className="spec-label">{agency.spec} • {agency.location}</p>
                   </div>
                </div>
                
                <div className="agency-stats-v2 flex-center gap-lg">
                   <div className="stat-v">
                      <span className="stat-l">Rating</span>
                      <strong>⭐ {agency.rating}</strong>
                   </div>
                   <div className="stat-v">
                      <span className="stat-l">Members</span>
                      <strong>{agency.members}</strong>
                   </div>
                   <div className="stat-v">
                      <span className="stat-l">Pricing</span>
                      <strong>{agency.price}</strong>
                   </div>
                   <button className="btn-outline-sm">View Profile</button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
