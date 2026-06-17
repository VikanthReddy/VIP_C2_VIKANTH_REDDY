import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  
  // Banner State
  const [bannerUrl, setBannerUrl] = useState('');
  
  // Orders State
  const [orders, setOrders] = useState([]);
  
  // Product Form State
  const [productData, setProductData] = useState({
    productName: '',
    productDescription: '',
    productMainImg: '',
    productCarousel: [],
    productSizes: ['S', 'M', 'L', 'XL'],
    productGender: 'Unisex',
    productCategory: 'new category',
    productNewCategory: '',
    productPrice: '',
    productDiscount: 0
  });

  useEffect(() => {
    fetchBanner();
    fetchOrders();
  }, []);

  const fetchBanner = async () => {
    try {
      const res = await api.get('/admin/fetch-banner');
      setBannerUrl(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders/fetch-orders');
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBannerUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/update-banner', { banner: bannerUrl });
      alert('Banner updated successfully!');
    } catch (err) {
      alert('Failed to update banner');
    }
  };

  const handleOrderStatusUpdate = async (id, status) => {
    try {
      await api.put('/orders/update-order-status', { id, updateStatus: status });
      fetchOrders();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products/add-new-product', productData);
      alert('Product added successfully!');
      // Reset form logic could go here
    } catch (err) {
      alert('Failed to add product');
    }
  };

  const handleProductChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  return (
    <div className="main-content">
      <h1 style={{ marginBottom: '2rem' }}>Admin Dashboard</h1>
      
      <div className="admin-tabs">
        <button className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>Add Product</button>
        <button className={`tab-btn ${activeTab === 'banner' ? 'active' : ''}`} onClick={() => setActiveTab('banner')}>Manage Banner</button>
        <button className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>Manage Orders</button>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        
        {/* ADD PRODUCT TAB */}
        {activeTab === 'products' && (
          <div>
            <h2>Add New Product</h2>
            <form onSubmit={handleProductSubmit} className="admin-form" style={{ marginTop: '1.5rem' }}>
              <div className="form-group">
                <label>Product Title</label>
                <input type="text" name="productName" className="input-field" value={productData.productName} onChange={handleProductChange} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="productDescription" className="input-field" value={productData.productDescription} onChange={handleProductChange} required />
              </div>
              <div className="form-group">
                <label>Main Image URL</label>
                <input type="text" name="productMainImg" className="input-field" value={productData.productMainImg} onChange={handleProductChange} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Price</label>
                  <input type="number" name="productPrice" className="input-field" value={productData.productPrice} onChange={handleProductChange} required />
                </div>
                <div className="form-group">
                  <label>Discount %</label>
                  <input type="number" name="productDiscount" className="input-field" value={productData.productDiscount} onChange={handleProductChange} />
                </div>
              </div>
              <div className="form-group">
                <label>Category</label>
                <input type="text" name="productNewCategory" className="input-field" placeholder="Enter new category" value={productData.productNewCategory} onChange={handleProductChange} required />
              </div>
              <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
          </div>
        )}

        {/* BANNER TAB */}
        {activeTab === 'banner' && (
          <div>
            <h2>Update Main Banner</h2>
            <form onSubmit={handleBannerUpdate} className="admin-form" style={{ marginTop: '1.5rem' }}>
              <div className="form-group">
                <label>Banner Image URL</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={bannerUrl} 
                  onChange={(e) => setBannerUrl(e.target.value)} 
                  required 
                />
              </div>
              {bannerUrl && (
                <div style={{ marginBottom: '1.5rem', borderRadius: '10px', overflow: 'hidden' }}>
                  <img src={bannerUrl} alt="Banner Preview" style={{ width: '100%' }} />
                </div>
              )}
              <button type="submit" className="btn btn-primary">Save Banner</button>
            </form>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div>
            <h2>All Orders</h2>
            <div style={{ marginTop: '1.5rem', overflowX: 'auto' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>User</th>
                    <th>Item</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id}>
                      <td>{order._id.substring(0, 8)}...</td>
                      <td>{order.email}</td>
                      <td>{order.title} (x{order.quantity})</td>
                      <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                      <td><strong>{order.orderStatus}</strong></td>
                      <td>
                        <select 
                          className="input-field" 
                          style={{ padding: '0.5rem', width: 'auto' }}
                          value={order.orderStatus}
                          onChange={(e) => handleOrderStatusUpdate(order._id, e.target.value)}
                        >
                          <option value="order placed">Order Placed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
