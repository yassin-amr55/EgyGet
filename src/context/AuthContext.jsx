import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem('ecommerce-user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('ecommerce-users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userWithoutPassword = { ...foundUser };
      delete userWithoutPassword.password;
      setUser(userWithoutPassword);
      localStorage.setItem('ecommerce-user', JSON.stringify(userWithoutPassword));
      return { success: true };
    }
    
    return { success: false, error: 'Invalid email or password' };
  };

  const register = (userData) => {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('ecommerce-users') || '[]');
    
    // Check if user already exists
    if (users.find(u => u.email === userData.email)) {
      return { success: false, error: 'User already exists with this email' };
    }

    // Add new user
    const newUser = {
      id: Date.now().toString(),
      name: userData.username, // Keep name for compatibility
      ...userData,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('ecommerce-users', JSON.stringify(users));
    
    // Auto login after registration
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    setUser(userWithoutPassword);
    localStorage.setItem('ecommerce-user', JSON.stringify(userWithoutPassword));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecommerce-user');
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('ecommerce-user', JSON.stringify(updatedUser));
    
    // Update in users array
    const users = JSON.parse(localStorage.getItem('ecommerce-users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedData };
      localStorage.setItem('ecommerce-users', JSON.stringify(users));
    }
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};