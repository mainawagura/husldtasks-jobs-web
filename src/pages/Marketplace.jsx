import React, { useState, useMemo, useEffect } from 'react';
import * as Icons from '../components/Icons';
import { supabase } from '../utils/supabaseClient';
import './Marketplace.css';

export default function Marketplace() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('Top Rated');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hiredIds, setHiredIds] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Fetch services and hired status from Supabase
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Fetch available services
        const { data: servicesData, error: servicesError } = await supabase
          .from('marketplace_services')
          .select('*')
          .order('rating', { ascending: false });

        console.log("Supabase Services Fetch result:", servicesData);
        if (servicesError) {
          console.error("Supabase Services Fetch Error:", servicesError);
          throw servicesError;
        }
        setServices(servicesData || []);

        // 2. Fetch hired IDs for current user
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: hiredData, error: hiredError } = await supabase
            .from('hired_services')
            .select('service_id')
            .eq('user_id', session.user.id);

          if (hiredError) {
            console.error("Supabase Hired Fetch Error:", hiredError);
            throw hiredError;
          }
          console.log("Supabase Hired IDs:", hiredData.map(h => h.service_id));
          setHiredIds(hiredData.map(h => h.service_id));
        }
      } catch (err) {
        console.error("Error fetching marketplace data:", err);
        setError(err.message || "Failed to connect to Supabase database.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  const handleHire = async (serviceId) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        alert("Please log in to hire services.");
        return;
      }

      if (hiredIds.includes(serviceId)) {
        // Toggle off (unhire)
        const { error } = await supabase
          .from('hired_services')
          .delete()
          .eq('user_id', session.user.id)
          .eq('service_id', serviceId);
        
        if (error) throw error;
        setHiredIds(hiredIds.filter(id => id !== serviceId));
        window.dispatchEvent(new Event('hired-agents-updated'));
      } else {
        // Toggle on (hire)
        const { error } = await supabase
          .from('hired_services')
          .insert({ user_id: session.user.id, service_id: serviceId });
        
        if (error) throw error;
        setHiredIds([...hiredIds, serviceId]);
        window.dispatchEvent(new Event('hired-agents-updated'));
      }
    } catch (err) {
      console.error("Error updating hire status:", err);
    }
  };

  return (
    <div className="professional-page">
      <header className="page-header">
        <div className="header-text">
          <h1>Marketplace</h1>
          <p className="text-muted">Browse and hire elite legal professionals and consultants ({loading ? '...' : filteredServices.length} candidates)</p>
        </div>
        <div className="header-actions">
           <div className="search-pill">
             <Icons.IconSearch className="search-icon-v2" />
             <input 
               type="text" 
               placeholder="Search services..." 
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
                <th>RATE</th>
                <th style={{textAlign: 'right'}}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {displayedServices.map(service => (
                <tr 
                  key={service.id} 
                  onClick={() => setSelectedService(service)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>
                    <div className="flex-center gap-md">
                      <div className="service-icon-mini flex-center">
                        {(() => {
                          const IconComp = Icons[service.icon_name] || Icons.IconOrders;
                          return <IconComp style={{width: '20px'}} />;
                        })()}
                      </div>
                      <div className="service-main-info-v4">
                        <div className="s-title-v4">{service.title}</div>
                        <div className="s-provider-v4 flex-center gap-xs">
                          <img src={service.avatar_url} className="avatar-xxs" alt="" />
                          {service.provider}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td><span className="cat-badge">{service.category}</span></td>
                  <td>
                    <div className="rating-badge-v4">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="#f59e0b">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      {service.rating}
                    </div>
                  </td>
                  <td>
                    <div className="price-val-v4">
                      <span className="price-label-v4">STARTING AT</span>
                      {service.price_label}
                    </div>
                  </td>
                  <td style={{textAlign: 'right'}}>
                    <div className="action-cell flex-center gap-sm" style={{justifyContent: 'flex-end'}}>
                      <button 
                        className={`btn-hire-v4 ${hiredIds.includes(service.id) ? 'hired' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleHire(service.id);
                        }}
                      >
                        {hiredIds.includes(service.id) ? '✓ Hired' : 'Hire'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

        {error && (
          <div className="empty-state-marketplace flex-center flex-column" style={{ color: '#ef4444' }}>
            <Icons.IconSearch style={{width: '48px', opacity: 0.2, marginBottom: '16px'}} />
            <h3>Connection Error</h3>
            <p>{error}</p>
            <button 
              className="btn btn-primary" 
              style={{ marginTop: '16px' }}
              onClick={() => window.location.reload()}
            >
              Retry Connection
            </button>
          </div>
        )}

        {filteredServices.length === 0 && !loading && !error && (
          <div className="empty-state-marketplace flex-center flex-column">
            <Icons.IconSearch style={{width: '48px', opacity: 0.2, marginBottom: '16px'}} />
            <p>No services found matching your criteria. Did you run the SQL inserts?</p>
          </div>
        )}

        {loading && !error && (
          <div className="empty-state-marketplace flex-center">
            <p>Loading marketplace...</p>
          </div>
        )}
      </div>

      {selectedService && (
        <div className="details-modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="details-modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-v4" onClick={() => setSelectedService(null)}>×</button>
            <div className="modal-header-v4">
              <div className="flex-center gap-md">
                <div className="service-icon-large flex-center">
                  {(() => {
                    const IconComp = Icons[selectedService.icon_name] || Icons.IconOrders;
                    return <IconComp style={{width: '32px'}} />;
                  })()}
                </div>
                <div>
                  <h2 className="modal-title-v4">{selectedService.title}</h2>
                  <div className="modal-provider-v4 flex-center gap-sm">
                    <img src={selectedService.avatar_url} className="avatar-sm" alt="" />
                    <span>{selectedService.provider}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-body-v4">
              <div className="modal-info-grid">
                <div className="info-item-v4">
                  <label>Category</label>
                  <span className="cat-badge">{selectedService.category}</span>
                </div>
                <div className="info-item-v4">
                  <label>Rating</label>
                  <div className="rating-badge-v4">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="#f59e0b">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {selectedService.rating}
                  </div>
                </div>
                <div className="info-item-v4">
                  <label>Service Rate</label>
                  <span className="modal-price-v4">{selectedService.price_label}</span>
                </div>
              </div>

              <div className="modal-description-v4">
                <label>About this Service</label>
                <p>{selectedService.description}</p>
              </div>
            </div>

            <div className="modal-footer-v4">
              <button 
                className={`btn-hire-v4 ${hiredIds.includes(selectedService.id) ? 'hired' : ''}`}
                style={{ width: '100%', padding: '16px' }}
                onClick={() => handleHire(selectedService.id)}
              >
                {hiredIds.includes(selectedService.id) ? '✓ Service Hired' : 'Hire This Professional'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
