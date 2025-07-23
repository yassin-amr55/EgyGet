import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import './Checkout.css';

const Checkout = ({ isOpen, onClose }) => {
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    governorate: '',
    postalCode: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const egyptianGovernorates = [
    'Cairo', 'Alexandria', 'Giza', 'Shubra El Kheima', 'Port Said', 'Suez',
    'Luxor', 'Mansoura', 'El Mahalla El Kubra', 'Tanta', 'Asyut', 'Ismailia',
    'Fayyum', 'Zagazig', 'Aswan', 'Damietta', 'Damanhur', 'Minya', 'Beni Suef',
    'Qena', 'Sohag', 'Hurghada', 'Shibin El Kom', 'Banha', 'Kafr El Sheikh',
    'Arish', 'Mallawi', 'Bilbays', 'Marsa Matruh', 'Idfu'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData = {
        userId: user?.uid || 'guest',
        items: items,
        total: getCartTotal(),
        customerInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        },
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          governorate: formData.governorate,
          postalCode: formData.postalCode
        },
        notes: formData.notes,
        paymentMethod: 'cod'
      };

      const order = await createOrder(orderData);

      // Send order info to your email via Netlify Function
      await fetch('/.netlify/functions/send-order-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const orderInfo = JSON.stringify(order, null, 2)
      console.log(orderInfo); // <-- Add this line
      setCompletedOrder(order);
      setOrderComplete(true);
      clearCart();
      
    } catch (error) {
      console.error('Order submission failed:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setOrderComplete(false);
    setCompletedOrder(null);
    setFormData({
      name: user?.name || user?.username || '',
      email: user?.email || '',
      phone: '',
      street: '',
      city: '',
      governorate: '',
      postalCode: '',
      notes: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  if (orderComplete && completedOrder) {
    return (
      <div className="checkout-overlay" onClick={handleClose}>
        <div className="checkout-modal order-success" onClick={(e) => e.stopPropagation()}>
          <div className="success-header">
            <div className="success-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
            </div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your order. We'll contact you soon to confirm delivery details.</p>
          </div>

          <div className="order-details">
            <div className="order-info">
              <h3>Order #{completedOrder.id}</h3>
              <p><strong>Total:</strong> ${completedOrder.total.toFixed(2)}</p>
              <p><strong>Payment:</strong> Cash on Delivery (COD)</p>
              <p><strong>Estimated Delivery:</strong> {new Date(completedOrder.estimatedDelivery).toLocaleDateString()}</p>
            </div>

            <div className="delivery-info">
              <h4>Delivery Address:</h4>
              <p>{completedOrder.shippingAddress.street}</p>
              <p>{completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.governorate}</p>
              {completedOrder.shippingAddress.postalCode && (
                <p>Postal Code: {completedOrder.shippingAddress.postalCode}</p>
              )}
            </div>
          </div>

          <div className="success-actions">
            <button className="btn" onClick={handleClose}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-overlay" onClick={handleClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <div className="checkout-header">
          <h2>Checkout - Cash on Delivery</h2>
          <button className="checkout-close" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="checkout-content">
          <div className="checkout-sections">
            <div className="checkout-form">
              <form onSubmit={handleSubmit}>
                <div className="form-section">
                  <h3>Contact Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+20 xxx xxx xxxx"
                      required
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h3>Delivery Address (Egypt Only)</h3>
                  <div className="form-group">
                    <label>Street Address *</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      placeholder="Building number, street name"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Governorate *</label>
                      <select
                        name="governorate"
                        value={formData.governorate}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Governorate</option>
                        {egyptianGovernorates.map(gov => (
                          <option key={gov} value={gov}>{gov}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Postal Code (Optional)</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Delivery Notes (Optional)</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Any special delivery instructions..."
                      rows="3"
                    ></textarea>
                  </div>
                </div>

                <div className="payment-section">
                  <h3>Payment Method</h3>
                  <div className="payment-option selected">
                    <div className="payment-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                        <line x1="1" y1="10" x2="23" y2="10"/>
                      </svg>
                    </div>
                    <div className="payment-details">
                      <h4>Cash on Delivery (COD)</h4>
                      <p>Pay when your order is delivered to your doorstep</p>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn checkout-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Placing Order...' : `Place Order - $${getCartTotal().toFixed(2)}`}
                </button>
              </form>
            </div>

            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-items">
                {items.map(item => (
                  <div key={item.id} className="summary-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Qty: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="summary-totals">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Delivery:</span>
                  <span>Free</span>
                </div>
                <div className="total-row final-total">
                  <span>Total:</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;