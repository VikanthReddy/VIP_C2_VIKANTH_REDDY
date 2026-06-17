import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { fetchCartCount } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/fetch-product-details/${id}`);
        setProduct(res.data);
        if (res.data.sizes && res.data.sizes.length > 0) {
          setSelectedSize(res.data.sizes[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) return navigate('/login');
    try {
      await api.post('/cart/add-to-cart', {
        title: product.title,
        description: product.description,
        mainImg: product.mainImg,
        size: selectedSize,
        quantity: quantity,
        price: product.price,
        discount: product.discount
      });
      fetchCartCount();
      alert('Added to cart!');
    } catch (err) {
      alert('Failed to add to cart');
    }
  };

  const handleBuyNow = () => {
    if (!user) return navigate('/login');
    // For Buy Now, we could pass state to an order checkout page
    // but the backend buyProduct route accepts the order direct.
    // Ideally we need address info. To keep it simple, we'll alert.
    alert('Buy Now feature requires checkout form! Add to cart first.');
  };

  if (loading) return <div className="main-content"><h2>Loading product...</h2></div>;
  if (!product) return <div className="main-content"><h2>Product not found</h2></div>;

  return (
    <div className="main-content product-details-container">
      <div className="product-image-gallery">
        <img src={product.mainImg} alt={product.title} className="main-image" />
        <div className="carousel-images">
          {product.carousel?.map((img, idx) => (
            <img key={idx} src={img} alt={`${product.title} ${idx}`} className="thumbnail" />
          ))}
        </div>
      </div>
      
      <div className="product-info-panel">
        <p className="category-label">{product.category} &bull; {product.gender}</p>
        <h1 className="product-title-lg">{product.title}</h1>
        <p className="product-desc">{product.description}</p>
        
        <div className="price-section">
          <span className="current-price">${product.price}</span>
          {product.discount > 0 && <span className="discount-badge">-{product.discount}%</span>}
        </div>

        <div className="options-section">
          <div className="form-group">
            <label>Select Size</label>
            <div className="size-selector">
              {product.sizes?.map(size => (
                <button 
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <div className="qty-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={handleAddToCart} className="btn btn-outline flex-1">Add to Cart</button>
          <button onClick={handleBuyNow} className="btn btn-primary flex-1">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
