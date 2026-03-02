import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import * as Icons from '../components/Icons';

export default function SeedDatabase() {
  const [status, setStatus] = useState('Idle');
  const [loading, setLoading] = useState(false);

  const seed = async () => {
    setLoading(true);
    setStatus('Seeding...');
    try {
      const baseServices = [
        { title: 'Legal Consultation', provider: 'Sarah Jenkins', price: 150, price_label: '$150/hr', rating: 4.9, category: 'Legal', icon_name: 'IconOrders', avatar_url: "https://i.pravatar.cc/150?u=sarah", description: "Expert guidance on corporate law and regulatory compliance for growing startups." },
        { title: 'Contract Review', provider: 'Michael Chen', price: 200, price_label: '$200/doc', rating: 4.7, category: 'Legal', icon_name: 'IconLedger', avatar_url: "https://i.pravatar.cc/150?u=michael", description: "Comprehensive review of service agreements and partnership contracts." },
        { title: 'Growth Strategy', provider: 'Elena Rodriguez', price: 175, price_label: '$175/hr', rating: 4.8, category: 'Business', icon_name: 'IconDashboard', avatar_url: "https://i.pravatar.cc/150?u=elena", description: "Data-driven business scaling strategies focused on market penetration." },
        { title: 'Tax Optimization', provider: 'David Wilson', price: 120, price_label: '$120/hr', rating: 4.6, category: 'Business', icon_name: 'IconSearch', avatar_url: "https://i.pravatar.cc/150?u=david", description: "Professional tax planning to maximize efficiency and ensure compliance." },
        { title: 'M&A Advisory', provider: 'LegalCorp Inc.', price: 2500, price_label: '$2,500', rating: 5.0, category: 'Legal', icon_name: 'IconCustomers', avatar_url: "https://i.pravatar.cc/150?u=legalcorp", description: "Strategic advice for mergers, acquisitions, and private equity deals." },
        { title: 'Brand IP Protection', provider: 'IP Tech Group', price: 400, price_label: '$400/hr', rating: 4.9, category: 'Legal', icon_name: 'IconDiscounts', avatar_url: "https://i.pravatar.cc/150?u=iptech", description: "Protect your intellectual property with comprehensive trademark services." },
      ];

      const bigList = [];
      // Seed first 100 to avoid request size limits or long waits, can do more if needed
      for (let i = 0; i < 100; i++) {
        const base = baseServices[i % 6];
        bigList.push({
          ...base,
          title: i < 6 ? base.title : `${base.title} #${i + 1}`,
          rating: i < 6 ? base.rating : (4 + Math.random()).toFixed(1),
          price: base.price + (i % 50)
        });
      }

      const { error } = await supabase
        .from('marketplace_services')
        .insert(bigList);

      if (error) throw error;
      setStatus('Successfully seeded 100 agents!');
    } catch (err) {
      console.error(err);
      setStatus('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Database Seeder</h1>
      <p>Click the button below to populate the `marketplace_services` table.</p>
      <button 
        onClick={seed} 
        disabled={loading}
        style={{
          padding: '12px 24px',
          background: 'var(--primary-color, #008080)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        {loading ? 'Seeding...' : 'Seed 100 Agents'}
      </button>
      <div style={{ marginTop: '20px', fontWeight: 'bold' }}>{status}</div>
    </div>
  );
}
