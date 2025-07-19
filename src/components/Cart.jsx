import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Checkout from './Checkout';
import './Cart.css';

const Cart = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { user } = useAuth();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isOpen) return null;

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <div className="cart-overlay" onClick={onClose}>
        <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
          <div className="cart-header">
            <h2>Shopping Cart</h2>
            <button className="cart-close" onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="cart-content">
            {items.length === 0 ? (
              <div className="cart-empty">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"/>
                  <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"/>
                  <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"/>
                </svg>
                <p>Your cart is empty</p>
                <button className="btn" onClick={onClose}>Continue Shopping</button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {items.map((item) => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} className="cart-item-image" />
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <p className="cart-item-price">{item.price}</p>
                        <div className="cart-item-controls">
                          <button 
                            className="quantity-btn"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button 
                            className="quantity-btn"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                          <button 
                            className="remove-btn"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-footer">
                  <div className="cart-total">
                    <strong>Total: ${getCartTotal().toFixed(2)}</strong>
                  </div>
                  <div className="cart-actions">
                    <button className="btn btn-secondary" onClick={clearCart}>
                      Clear Cart
                    </button>
                    <button className="btn" onClick={handleCheckout}>
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <Checkout 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
    </>
  );
};

export default Cart;