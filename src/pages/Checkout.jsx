import { userCart } from '../context/CartContext';


const Checkout = () => {
  const { getCartItemWithProductDetails, removeFromCart, updateCartItemQuantity, getCartTotal,clearCart } = userCart();
  const placeOrder = () => {
    alert('Order placed successfully!');
    clearCart();
  }
  const cartItems = getCartItemWithProductDetails();
  const total = getCartTotal();
  return (
    <div className='page'>
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        <div className="checkout-container">
          <div className="checkout-items">
            <h2 className="checkout-section-title">Order Summary</h2>
            {
              cartItems.map(item => (
                <div key={item.id} className="checkout-item">
                  <img src={item.image} alt={item.name} className="checkout-item-image" />
                  <div className="checkout-item-details">
                    <h3 className="checkout-item-name">{item.name}</h3>
                    <p className="checkout-item-price">Price: ${item.price}</p>
                  </div>
                  <div className="checkout-item-controls">
                    <div className="quantity-controls">
                      <button className="quantity-btn"
                        onClick={() => { updateCartItemQuantity(item.id, item.quantity - 1) }}
                      >-</button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button className="quantity-btn"
                        onClick={() => { updateCartItemQuantity(item.id, item.quantity + 1) }}
                      >+</button>
                    </div>
                    <p className="checkout-item-total">${(item.price * item.quantity).toFixed(2)}</p>
                    <button className='btn btn-secondary btn-small'
                      onClick={() => { removeFromCart(item.id) }}
                    >Remove</button>
                  </div>
                </div>
              ))}
          </div>
          <div className="checkout-summary">
            <h2 className="checkout-session-title">Order Total</h2>
            <div className="checkout-total">
              <p className="checkout-total-label">Subtotal:</p>
              <p className="checkout-total-value">${total.toFixed(2)}</p>
            </div>
            <div className="checkout-total">
              <p className="checkout-total-label">Total:</p>
              <p className="checkout-total-value checkout-total-final">${total.toFixed(2)}</p>
            </div>
            <button className="btn btn-primary btn-block btn-large" onClick={() => placeOrder()}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
