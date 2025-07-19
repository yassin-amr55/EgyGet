import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = localStorage.getItem('ecommerce-orders');
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        setOrders(parsedOrders);
      } catch (error) {
        console.error('Error loading orders from localStorage:', error);
      }
    }
  }, []);

  const createOrder = async (orderData) => {
    const newOrder = {
      id: Date.now().toString(),
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days from now
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('ecommerce-orders', JSON.stringify(updatedOrders));

    // Send email notification
    try {
      await sendOrderEmail(newOrder);
    } catch (error) {
      console.error('Failed to send order email:', error);
    }

    return newOrder;
  };

  const sendOrderEmail = async (order) => {
    // In a real application, this would call your backend API
    // For demo purposes, we'll simulate the email sending
    console.log(`
📧 EMAIL SETUP REQUIRED FOR NOTIFICATIONS:

To receive order emails at yassin5amr55@gmail.com, you need to:

OPTION 1 - EmailJS (Frontend Solution):
1. Go to https://www.emailjs.com/
2. Create a free account
3. Set up an email service (Gmail, Outlook, etc.)
4. Create an email template
5. Install: npm install @emailjs/browser
6. Replace the code below with EmailJS implementation

OPTION 2 - Backend API:
1. Create a backend server (Node.js, Python, etc.)
2. Set up email service (SendGrid, Nodemailer, etc.)
3. Create an API endpoint for sending emails
4. Call your API from this function

OPTION 3 - Netlify Functions:
1. Create a Netlify function for email sending
2. Use environment variables for email credentials
3. Call the function from this code

Current order data that would be sent:
    `);
    
    const emailData = {
      to: 'yassin5amr55@gmail.com',
      subject: `New Order #${order.id}`,
      html: `
        <h2>New Order Received</h2>
        <p><strong>Order ID:</strong> ${order.id}</p>
        <p><strong>Customer:</strong> ${order.customerInfo.name}</p>
        <p><strong>Email:</strong> ${order.customerInfo.email}</p>
        <p><strong>Phone:</strong> ${order.customerInfo.phone}</p>
        <p><strong>Address:</strong> ${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.governorate}</p>
        <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
        
        <h3>Items:</h3>
        <ul>
          ${order.items.map(item => `
            <li>${item.name} - Quantity: ${item.quantity} - Price: ${item.price}</li>
          `).join('')}
        </ul>
        
        <p><strong>Payment Method:</strong> Cash on Delivery (COD)</p>
        <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
      `
    };

    // Simulate API call
    console.log('Order email would be sent:', emailData);
    
    // In production, you would use a service like EmailJS, SendGrid, or your backend API
    // Example with EmailJS:
    // await emailjs.send('service_id', 'template_id', emailData, 'public_key');
  };

  const updateOrderStatus = (orderId, status) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('ecommerce-orders', JSON.stringify(updatedOrders));
  };

  const getUserOrders = (userId) => {
    return orders.filter(order => order.userId === userId);
  };

  const value = {
    orders,
    createOrder,
    updateOrderStatus,
    getUserOrders
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};