import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [banner, setBanner] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, bannerRes] = await Promise.all([
          api.get('/products/fetch-products'),
          api.get('/banner')
        ]);
        setProducts(productRes.data);
        setBanner(bannerRes.data);
      } catch (err) {
        console.error('Error fetching data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="main-content"><h2>Loading SHOP-EZ...</h2></div>;

  return (
    <div className="main-content">
      {banner && (
        <div style={{ marginBottom: '3rem', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img src={banner} alt="Promotional Banner" style={{ width: '100%', display: 'block' }} />
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Featured Products</h1>
          <p className="text-muted">Discover our latest collection of premium items.</p>
        </div>
      </div>

      <div className="grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
