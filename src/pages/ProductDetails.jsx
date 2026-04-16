import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../data/products';
import { userCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const naviation = useNavigate();
  const { cartItems, addToCart } = userCart();

  const productInCart = cartItems.find(item => item.id === parseInt(id));
  const productQuantity = productInCart ? productInCart.quantity : 0;


  useEffect(() => {
    // Fetch product details based on the id from the URL
    // For demonstration, we will use a static product data 

    const foundProduct = getProductById(parseInt(id));
    // console.log(foundProduct);
    if (!foundProduct) {
      naviation('/');
    }
    setProduct(foundProduct);
  }, [id]);
  if (!product) {
    return <div>Loading...</div>
  }
  return (
    <div className='page'>
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product?.image} alt={product?.name} />
          </div>
          <div className="product-detail-content">``
            <h1 className='product-detail-name'>{product?.name}</h1>
            <p className='product-detail-price'>Price: ${product?.price.toFixed(2)}</p>
            <p className='product-detail-description'>{product?.description}</p>
            <button className='btn btn-primary' onClick={() => addToCart(product.id)}>
              Add to Cart {productQuantity > 0 && `(${productQuantity})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
