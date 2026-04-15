import React from 'react'
import { getProducts } from '../data/products'
import { Link } from 'react-router-dom';
import ProductCard from '../compoments/ProductCard';
const Home = () => {
  const products = getProducts();
  return (
    <div className='page'>
     <div className='home-hero'>
      <h1 className='home-title'>Welcome to Our Store</h1>
      <p className='home-subtitle'>Discover our latest products and offers!</p>
     </div>
     <div className='container'>
      <h2 className='page-title'>Our Products</h2>
      <div className="product-grid">
        {/* Product items will be rendered here */}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>
     </div>
    </div>
  )
}

export default Home
