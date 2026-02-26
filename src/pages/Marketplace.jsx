import React, { useState, useMemo, useEffect } from 'react';
import * as Icons from '../components/Icons';
import './Marketplace.css';

export default function Marketplace() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('Top Rated');
  const [hiredIds, setHiredIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Generate 1000 high-quality mock services
  const baseServices = [
    { id: 1, title: 'Legal Consultation', provider: 'Sarah Jenkins', price: 150, priceLabel: '$150/hr', rating: 4.9, category: 'Legal', Icon: Icons.IconOrders, avatar: "https://i.pravatar.cc/150?u=sarah" },
    { id: 2, title: 'Contract Review', provider: 'Michael Chen', price: 200, priceLabel: '$200/doc', rating: 4.7, category: 'Legal', Icon: Icons.IconLedger, avatar: "https://i.pravatar.cc/150?u=michael" },
    { id: 3, title: 'Growth Strategy', provider: 'Elena Rodriguez', price: 175, priceLabel: '$175/hr', rating: 4.8, category: 'Business', Icon: Icons.IconDashboard, avatar: "https://i.pravatar.cc/150?u=elena" },
    { id: 4, title: 'Tax Optimization', provider: 'David Wilson', price: 120, priceLabel: '$120/hr', rating: 4.6, category: 'Business', Icon: Icons.IconSearch, avatar: "https://i.pravatar.cc/150?u=david" },
    { id: 5, title: 'M&A Advisory', provider: 'LegalCorp Inc.', price: 2500, priceLabel: '$2,500', rating: 5.0, category: 'Legal', Icon: Icons.IconCustomers, avatar: "https://i.pravatar.cc/150?u=legalcorp" },
    { id: 6, title: 'Brand IP Protection', provider: 'IP Tech Group', price: 400, priceLabel: '$400/hr', rating: 4.9, category: 'Legal', Icon: Icons.IconDiscounts, avatar: "https://i.pravatar.cc/150?u=iptech" },
  ];

  const services = useMemo(() => {
    const bigList = [...baseServices];
    for (let i = 7; i <= 1000; i++) {
       bigList.push({
          ...baseServices[i % 6],
          id: i,
          title: `${baseServices[i % 6].title} #${i}`,
          price: baseServices[i % 6].price + (i % 50),
          rating: (4 + Math.random()).toFixed(1)
       });
    }
    return bigList;
  }, []);

  const filteredServices = useMemo(() => {
    return services
      .filter(s => {
        const matchesCategory = filter === 'All' || s.category === filter;
        const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) || 
                              s.provider.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'Top Rated') return b.rating - a.rating;
        if (sortBy === 'Price: Low to High') return a.price - b.price;
        if (sortBy === 'Price: High to Low') return b.price - a.price;
        return 0;
      });
  }, [services, filter, search, sortBy]);

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const displayedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, search, sortBy]);

  const handleHire = (id) => {
    if (!hiredIds.includes(id)) {
      setHiredIds([...hiredIds, id]);
    }
  };

  return (
    <div className="professional-page">
      <header className="page-header">
        <div className="header-text">
          <h1>Marketplace</h1>
          <p className="text-muted">Browse and hire elite legal professionals and consultants ({filteredServices.length} candidates)</p>
        </div>
        <div className="header-actions">
           <div className="search-pill">
             <Icons.IconSearch className="search-icon-v2" />
             <input 
               type="text" 
               placeholder="Search services or providers..." 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
             />
           </div>
        </div>
      </header>

      <div className="page-content">
        <div className="filter-bar-v2 flex-between">
          <div className="pill-group-v2">
            {['All', 'Legal', 'Business'].map(cat => (
              <button 
                key={cat}
                className={`pill-v2 ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat === 'All' ? 'All Services' : cat}
              </button>
            ))}
          </div>
          <div className="sort-group flex-center gap-sm">
            <span className="sort-label">Sort by:</span>
            <select 
              className="flup-select-v2" 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option>Top Rated</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flup-card table-card-v4">
          <table className="flup-table-v4">
            <thead>
              <tr>
                <th>SERVICE & PROVIDER</th>
                <th>CATEGORY</th>
                <th>RATING</th>
                <th>STATUS</th>
                <th>RATE</th>
                <th style={{textAlign: 'right'}}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {displayedServices.map(service => (
                <tr key={service.id}>
                  <td>
                    <div className="flex-center gap-md">
                      <div className="service-icon-mini flex-center">
                        <service.Icon style={{width: '16px'}} />
                      </div>
                      <div className="service-main-info-v4">
                        <div className="s-title-v4">{service.title}</div>
                        <div className="s-provider-v4 flex-center gap-xs">
                          <img src={service.avatar} className="avatar-xxs" alt="" />
                          {service.provider}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td><span className="cat-badge">{service.category}</span></td>
                  <td><div className="rating-val-v4">⭐ {service.rating}</div></td>
                  <td>
                    <div className="status-val-v4 flex-center gap-xs">
                      <span className="a-dot online"></span>
                      Available
                    </div>
                  </td>
                  <td>
                    <div className="price-val-v4">
                      <span className="price-label-v4">STARTING AT</span>
                      {service.priceLabel}
                    </div>
                  </td>
                  <td style={{textAlign: 'right'}}>
                    <button 
                      className={`btn-hire-v4 ${hiredIds.includes(service.id) ? 'hired' : ''}`}
                      onClick={() => handleHire(service.id)}
                    >
                      {hiredIds.includes(service.id) ? '✓ Hired' : 'Hire'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredServices.length > 0 && (
            <div className="pagination-v4 flex-between">
              <div className="pagination-info">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredServices.length)} of {filteredServices.length} results
              </div>
              <div className="pagination-controls flex-center gap-sm">
                <button 
                  className="btn-p-control" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                >
                  Previous
                </button>
                <div className="page-numbers flex-center gap-xs">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    let pageNum;
                    if (totalPages <= 5) pageNum = i + 1;
                    else if (currentPage <= 3) pageNum = i + 1;
                    else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                    else pageNum = currentPage - 2 + i;

                    return (
                      <button 
                        key={pageNum}
                        className={`btn-page ${currentPage === pageNum ? 'active' : ''}`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button 
                  className="btn-p-control" 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {filteredServices.length === 0 && (
            <div className="empty-state-marketplace flex-center flex-column">
              <Icons.IconSearch style={{width: '48px', opacity: 0.2, marginBottom: '16px'}} />
              <p>No services found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
