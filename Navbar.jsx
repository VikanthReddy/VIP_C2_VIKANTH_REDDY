import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar glass-panel">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          SHOP<span>EZ</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-item">Home</Link>
          {user ? (
            <>
              {user.usertype === 'admin' ? (
                <Link to="/admin" className="nav-item">Dashboard</Link>
              ) : (
                <>
                  <Link to="/cart" className="nav-item cart-link">
                    Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                  </Link>
                  <Link to="/orders" className="nav-item">Orders</Link>
                </>
              )}
              <button onClick={handleLogout} className="btn btn-outline nav-btn">Logout ({user.username})</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-item">Login</Link>
              <Link to="/register" className="btn btn-primary nav-btn">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
