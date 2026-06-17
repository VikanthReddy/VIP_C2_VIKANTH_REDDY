import React, { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const { fetchCartCount } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const fetchCart = async () => {
    try {
      const res = await api.get('/cart/fetch-cart');
      setCartItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (id, type) => {
    try {
      const endpoint = type === 'inc' ? '/cart/increase-cart-quantity' : '/cart/decrease-cart-quantity';
      await api.put(endpoint, { id });
      fetchCart();
      fetchCartCount();
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (id) => {
    try {
      await api.delete(`/cart/remove-item/${id}`);
      fetchCart();
      fetchCartCount();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckout = async () => {
    if (!address.trim() || !pincode.trim()) {
      return alert('Please provide your complete shipping address and pincode.');
    }

    const confirm = window.confirm("Do you want to place the order with Cash on Delivery?");
    if (confirm) {
      try {
        await api.post('/orders/place-cart-order', {
          name: user?.username || "Guest User",
          mobile: "N/A", // We can ask for phone number here too if needed
          email: user?.email || "guest@example.com",
          address: address,
          pincode: pincode,
          paymentMethod: "COD",
          orderDate: new Date().toISOString()
        });
        alert('Order placed successfully!');
        fetchCart(); // cart should be empty now
        fetchCartCount();
      } catch (err) {
        alert('Checkout failed');
      }
    }
  };

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (loading) return <div className="main-content"><h2>Loading cart...</h2></div>;

  return (
    <div className="main-content">
      <h1 style={{ marginBottom: '2rem' }}>Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
          <h2>Your cart is empty</h2>
          <p className="text-muted">Looks like you haven't added anything yet.</p>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item._id} className="cart-item glass-panel">
                <img src={item.mainImg} alt={item.title} className="cart-item-img" />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p className="text-muted">Size: {item.size}</p>
                  <p className="cart-item-price">${item.price}</p>
                </div>
                <div className="cart-actions">
                  <div className="qty-selector">
                    <button onClick={() => updateQuantity(item._id, 'dec')} disabled={item.quantity <= 1}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, 'inc')}>+</button>
                  </div>
                  <button onClick={() => removeItem(item._id)} className="btn btn-outline" style={{ color: 'var(--danger-color)', borderColor: 'var(--danger-color)' }}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary glass-panel">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr style={{ margin: '1rem 0', borderTop: '1px solid var(--border-color)' }} />
            <div className="summary-row total-row">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Shipping Address</label>
                <textarea 
                  className="input-field" 
                  style={{ width: '100%', resize: 'vertical', minHeight: '80px' }}
                  placeholder="Enter your full street address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Pincode / Zip</label>
                <input 
                  type="text" 
                  className="input-field" 
                  style={{ width: '100%' }}
                  placeholder="e.g. 500001"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
            </div>

            <button onClick={handleCheckout} className="btn btn-primary" style={{ width: '100%', marginTop: '2rem', padding: '1rem' }}>
              Place Order (COD)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
