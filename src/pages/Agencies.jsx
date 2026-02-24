import React from "react";
import "./Pages.css";

export default function Agencies() {
  const agencies = [
    {
      id: 1,
      name: "Premier Legal Group",
      specialization: "Corporate Law",
      rating: 4.8,
      reviews: 120,
      location: "New York, USA",
      verified: true,
      price: "$2,500+",
    },
    {
      id: 2,
      name: "Justice & Associates",
      specialization: "Criminal Defense",
      rating: 4.7,
      reviews: 98,
      location: "London, UK",
      verified: true,
      price: "$1,800+",
    },
    {
      id: 3,
      name: "Counsel International",
      specialization: "Intellectual Property",
      rating: 4.9,
      reviews: 150,
      location: "Toronto, Canada",
      verified: false,
      price: "$3,200+",
    },
    {
      id: 4,
      name: "Legal Solutions Ltd",
      specialization: "Family Law",
      rating: 4.6,
      reviews: 87,
      location: "Sydney, Australia",
      verified: true,
      price: "$1,200+",
    },
  ];

  return (
    <div className="agency-page">
      {/* HERO SECTION */}
      <div className="agency-hero">
        <h1>Agency Directory</h1>
        <p>Hire trusted agencies for your legal and business needs</p>

        <div className="search-bar">
          <input type="text" placeholder="Search agencies or services..." />
          <select>
            <option>All Categories</option>
            <option>Corporate Law</option>
            <option>Family Law</option>
            <option>Criminal Defense</option>
          </select>
          <button>Search</button>
        </div>
      </div>

      <div className="agency-content">
        {/* SIDEBAR */}
        <aside className="agency-sidebar">
          <h3>Filters</h3>

          <div className="filter-group">
            <label>Category</label>
            <select>
              <option>All</option>
              <option>Corporate</option>
              <option>Criminal</option>
              <option>Family</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Rating</label>
            <select>
              <option>All</option>
              <option>4.5+</option>
              <option>4.0+</option>
              <option>3.5+</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Budget</label>
            <select>
              <option>Any</option>
              <option>$1,000+</option>
              <option>$2,000+</option>
              <option>$3,000+</option>
            </select>
          </div>
        </aside>

        {/* AGENCY GRID */}
        <div className="agency-grid">
          {agencies.map((agency) => (
            <div key={agency.id} className="agency-card">
              <div className="agency-card-header">
                <div className="agency-avatar">
                  {agency.name.charAt(0)}
                </div>

                <div className="agency-info">
                  <h3>
                    {agency.name}
                    {agency.verified && (
                      <span className="verified-badge">✔ Verified</span>
                    )}
                  </h3>
                  <p className="location">{agency.location}</p>
                </div>
              </div>

              <p className="specialization">{agency.specialization}</p>

              <div className="agency-rating">
                ⭐ {agency.rating}
                <span className="reviews">({agency.reviews} reviews)</span>
              </div>

              <div className="agency-footer">
                <span className="price">Starting at {agency.price}</span>
                <button className="view-btn">View Agency</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}