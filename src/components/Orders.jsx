import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import './Orders.css';

const Orders = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { getUserOrders } = useOrders();

  if (!isOpen) return null;

  const userOrders = user ? getUserOrders() : [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'confirmed': return 'var(--green)';
      case 'shipped': return '#8b5cf6';
      case 'delivered': return '#10b981';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending Confirmation';
      case 'confirmed': return 'Confirmed';
      case 'shipped': return 'Shipped';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  return (
    <div className="orders-overlay" onClick={onClose}>
      <div className="orders-modal" onClick={(e) => e.stopPropagation()}>
        <div className="orders-header">
          <h2>My Orders</h2>
          <button className="orders-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="orders-content">
          {!user ? (
            <div className="orders-empty">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <h3>Please Sign In</h3>
              <p>You need to be signed in to view your orders.</p>
            </div>
          ) : userOrders.length === 0 ? (
            <div className="orders-empty">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l-1 7H6l-1-7z"/>
              </svg>
              <h3>No Orders Yet</h3>
              <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
              <button className="btn" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="orders-list">
              {userOrders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <h3>Order #{order.id}</h3>
                      <p className="order-date">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="order-status">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(order.status) }}
                      >
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </div>

                  <div className="order-items">
                    {order.items.map(item => (
                      <div key={item.id} className="order-item">
                        <img src={item.image} alt={item.name} />
                        <div className="item-details">
                          <h4>{item.name}</h4>
                          <p>Quantity: {item.quantity}</p>
                        </div>
                        <div className="item-price">
                          ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-details">
                    <div className="delivery-info">
                      <h4>Delivery Address:</h4>
                      <p>{order.shippingAddress.street}</p>
                      <p>{order.shippingAddress.city}, {order.shippingAddress.governorate}</p>
                      {order.shippingAddress.postalCode && (
                        <p>Postal Code: {order.shippingAddress.postalCode}</p>
                      )}
                    </div>
                    
                    <div className="order-summary">
                      <div className="summary-row">
                        <span>Payment Method:</span>
                        <span>Cash on Delivery</span>
                      </div>
                      <div className="summary-row total">
                        <span>Total:</span>
                        <span>${order.total.toFixed(2)}</span>
                      </div>
                      {order.status === 'pending' && (
                        <div className="summary-row">
                          <span>Estimated Delivery:</span>
                          <span>{new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {order.notes && (
                    <div className="order-notes">
                      <h4>Delivery Notes:</h4>
                      <p>{order.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;