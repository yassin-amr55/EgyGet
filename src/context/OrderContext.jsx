import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  // Fetch orders for the current user from Firestore
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setOrders([]);
        return;
      }
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const userOrders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(userOrders);
    };

    fetchOrders();
  }, [user]);

  // Create a new order in Firestore
  const createOrder = async (orderData) => {
    if (!user) throw new Error('User not logged in');
    const newOrder = {
      ...orderData,
      userId: user.uid,
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
    };
    const docRef = await addDoc(collection(db, 'orders'), newOrder);
    setOrders(prev => [{ id: docRef.id, ...newOrder }, ...prev]);
    return { id: docRef.id, ...newOrder };
  };

  // Update order status (optional, requires Firestore update logic)
  const updateOrderStatus = async (orderId, status) => {
    // You can implement this with Firestore's updateDoc if needed
  };

  // Get orders for the current user
  const getUserOrders = () => {
    return orders;
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