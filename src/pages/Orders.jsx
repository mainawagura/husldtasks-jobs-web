import React, { useState } from 'react';
import * as Icons from '../components/Icons';
import './Orders.css';

const ordersData = [
  { id: 'AKF12875', products: 'Morpheus', departure: '21 July 2022 08:00 PM', deliveryDate: '22 July 2022 05:00 PM', status: 'In progress', deliveryStatus: 'In checking', destination: 'Av. de los Guindos, 4,...', price: '$1,659.99' },
  { id: 'HGK12987', products: 'Vortex, Earth,...', departure: '18 July 2022 07:00 PM', deliveryDate: '20 July 2022 04:00 PM', status: 'Completed', deliveryStatus: 'Picked up', destination: 'Del Pintor Rosales, 1,...', price: '$14,457.25' },
  { id: 'FTR36158', products: 'Measure', departure: '17 July 2022 05:00 AM', deliveryDate: '-', status: 'Returned', deliveryStatus: '-', destination: 'Grzegorzecka 79, 31-55...', price: '$7,100.00' },
  { id: 'DSD15879', products: 'Warm, Earth', departure: '16 July 2022 07:00 AM', deliveryDate: '17 July 2022 08:00 PM', status: 'In progress', deliveryStatus: 'In transport', destination: 'Via Enrico Fermi, 71,...', price: '$3,763.20' },
  { id: 'SDO12669', products: 'Wait, Circus', departure: '05 July 2022 08:00 PM', deliveryDate: '10 July 2022 11:00 PM', status: 'Canceled', deliveryStatus: 'Canceled', destination: 'Stanislawa Konarskie go...', price: '$2,129.99' },
  { id: 'AKK51698', products: 'Brace', departure: '01 July 2022 11:00 PM', deliveryDate: '07 July 2022 01:00 AM', status: 'Returned', deliveryStatus: 'In transport', destination: 'Fitelberga 17, 40-567...', price: '$3,615.00' },
  { id: 'DSD45125', products: 'Simplicity', departure: '23 June 2022 08:00 AM', deliveryDate: '28 June 2022 09:00 AM', status: 'In progress', deliveryStatus: 'Ready to pickup', destination: 'Franz-Jacob-Straße 4,...', price: '$450.75' },
  { id: 'GFH12387', products: 'Wong, Warm', departure: '13 June 2022 12:00 PM', deliveryDate: '-', status: 'Completed', deliveryStatus: 'Ready to pickup', destination: 'Tyboren Allé 64, 2720...', price: '$1,585.99' },
  { id: 'ADS12457', products: 'Tias', departure: '03 June 2022 04:00 PM', deliveryDate: '07 June 2022 01:00 PM', status: 'Completed', deliveryStatus: 'Picked up', destination: 'Tavelsjövägen 10, 120 5...', price: '$5,458.00' },
];

export default function Orders() {
  const [activeTab, setActiveTab] = useState('all');

  const getStatusClass = (status) => {
    switch(status) {
      case 'In progress': return 'status-in-progress';
      case 'Completed': return 'status-completed';
      case 'Returned': return 'status-returned';
      case 'Canceled': return 'status-canceled';
      default: return '';
    }
  };

  const getDeliveryDotColor = (status) => {
    switch(status) {
      case 'In checking': return '#10b981';
      case 'Picked up': return '#9ca3af';
      case 'In transport': return '#a855f7';
      case 'Ready to pickup': return '#22c55e';
      case 'Canceled': return '#ef4444';
      default: return '#e5e7eb';
    }
  };

  return (
    <div className="orders-page">
      <header className="orders-header flex-between">
        <div className="title-area">
          <h1>Orders <span className="subtitle">152 orders</span></h1>
        </div>
      </header>

      <div className="orders-filters-tabs flex-between">
        <div className="status-tabs">
          <button className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
            All orders <span className="count">152</span>
          </button>
          <button className="tab">In progress <span className="count">54</span></button>
          <button className="tab">Completed <span className="count">77</span></button>
          <button className="tab">Returned <span className="count">15</span></button>
          <button className="tab">Canceled <span className="count">6</span></button>
        </div>
      </div>

      <div className="orders-actions-bar flex-between">
        <div className="search-box">
          <Icons.IconSearch className="search-icon-svg" />
          <input type="text" placeholder="Search for order ID, customer, order status" />
        </div>
        <div className="action-buttons flex-center gap-md">
           <button className="btn-filter">
             <Icons.IconFilter /> Filters
           </button>
           <button className="btn-export">
             <Icons.IconExport /> Export
           </button>
        </div>
      </div>

      <div className="orders-table-container flup-card">
        <table className="orders-table">
          <thead>
            <tr>
              <th className="checkbox-col"><input type="checkbox" /></th>
              <th>Order ID ⇅</th>
              <th>Products ⇅</th>
              <th className="active-sort">Departure date ⇅</th>
              <th>Delivery date ⇅</th>
              <th>Order status ⇅</th>
              <th>Delivery status ⇅</th>
              <th>Destination ⇅</th>
              <th>Price ⇅</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order) => (
              <tr key={order.id}>
                <td><input type="checkbox" /></td>
                <td className="order-id">{order.id}</td>
                <td className="product-name">{order.products}</td>
                <td className="departure-date">
                   <strong>{order.departure.split(' ').slice(0, 3).join(' ')}</strong>
                   <span className="time">{order.departure.split(' ').slice(3).join(' ')}</span>
                </td>
                <td className="delivery-date">{order.deliveryDate}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <div className="delivery-status">
                    <span className="dot" style={{backgroundColor: getDeliveryDotColor(order.deliveryStatus)}}></span>
                    {order.deliveryStatus}
                  </div>
                </td>
                <td className="destination">{order.destination}</td>
                <td className="price-cell">{order.price}</td>
                <td className="actions-cell">
                   <button className="icon-btn-v3">
                     <Icons.IconExport style={{width: '14px'}} />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
