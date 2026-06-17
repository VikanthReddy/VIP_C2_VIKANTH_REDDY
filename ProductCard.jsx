import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="card product-card">
      <div className="product-img-container">
        <img 
          src={product.mainImg || "https://via.placeholder.com/300x300?text=No+Image"} 
          alt={product.title} 
          className="product-img"
        />
        {product.discount > 0 && (
          <span className="product-badge">-{product.discount}% OFF</span>
        )}
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.title}</h3>
        <div className="product-price-row">
          <span className="product-price">${product.price}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
