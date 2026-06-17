import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders/fetch-orders');
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await api.put('/orders/cancel-order', { orderId });
        fetchOrders();
      } catch (err) {
        alert('Failed to cancel order');
      }
    }
  };

  if (loading) return <div className="main-content"><h2>Loading orders...</h2></div>;

  return (
    <div className="main-content">
      <h1 style={{ marginBottom: '2rem' }}>My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
          <h2>No orders found</h2>
          <p className="text-muted">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card glass-panel">
              <div className="order-header">
                <div>
                  <p className="text-muted">Order ID: {order._id}</p>
                  <p className="text-muted">Placed on: {new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className={`status-badge status-${order.orderStatus.toLowerCase().replace(' ', '-')}`}>
                    {order.orderStatus}
                  </span>
                </div>
              </div>
              
              <div className="order-body">
                <img src={order.mainImg} alt={order.title} className="order-img" />
                <div className="order-details">
                  <h3>{order.title}</h3>
                  <p>Size: {order.size} | Qty: {order.quantity}</p>
                  <p className="order-price">${order.price}</p>
                </div>
                <div className="order-actions">
                  {order.orderStatus !== 'Cancelled' && order.orderStatus !== 'Delivered' && (
                    <button onClick={() => handleCancel(order._id)} className="btn btn-danger">Cancel Order</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
