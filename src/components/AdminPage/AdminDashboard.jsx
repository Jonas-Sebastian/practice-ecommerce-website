import React from 'react';

export default function AdminDashboard() {
  return (
    // Placeholder Code
    <div className="admin-dashboard">
      <h1>Welcome, Admin!</h1>
      <div className="dashboard-overview">
        <h2>Overview</h2>
        <p>Total Sales: $5,000</p>
        <p>New Orders: 10</p>
        <p>Products in Stock: 50</p>
      </div>

      <div className="dashboard-actions">
        <button>Manage Orders</button>
        <button>Manage Products</button>
      </div>
    </div>
  );
};