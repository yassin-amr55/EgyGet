import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { useAuth } from '../context/AuthContext';
import Cart from './Cart';
import Auth from './Auth';
import Orders from './Orders';
import './Header-new.css';

const Header = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const { getCartItemsCount } = useCart();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by the Products component through context
    // Close mobile menu if open
    setIsMenuOpen(false);
  };

  const handleAccountClick = () => {
    if (user) {
      setShowAccountMenu(!showAccountMenu);
    } else {
      setAuthMode('login');
      setIsAuthOpen(true);
    }
  };

  const handleLogout = () => {
    logout();
    setShowAccountMenu(false);
  };

  const handleOrdersClick = () => {
    setIsOrdersOpen(true);
    setShowAccountMenu(false);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h1>HydroNative</h1>
            </div>
            
            <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
              <button className="header-btn bold">Bath</button>
              <button className="header-btn bold">Kitchen</button>
              <button className="header-btn bold">pets</button>
              <button className="header-btn">sale</button>
              <button className="header-btn">new&trending</button>
            </nav>

            <div className="header-right">
              <div className="search-container">
                <form onSubmit={handleSearch} className="search-form">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <button type="submit" className="search-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="m21 21-4.35-4.35"/>
                    </svg>
                  </button>
                </form>
              </div>

              <div className="header-actions">
                <div className="account-dropdown">
                  <button className="action-btn" onClick={handleAccountClick}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span>
                      {user ? (user.displayName || user.email || 'Account').split(' ')[0] : 'Account'}
                    </span>
                  </button>
                  
                  {showAccountMenu && user && (
                    <div className="account-menu">
                      <div className="account-info">
                        <p className="account-name">{user.displayName}</p>
                        <p className="account-email">{user.email}</p>
                      </div>
                      <button onClick={handleOrdersClick} className="menu-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l-1 7H6l-1-7z"/>
                        </svg>
                        My Orders
                      </button>
                      <button onClick={handleLogout} className="menu-item logout">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                          <polyline points="16,17 21,12 16,7"/>
                          <line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
                
                <button className="action-btn cart-btn" onClick={() => setIsCartOpen(true)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"/>
                    <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"/>
                    <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"/>
                  </svg>
                  {getCartItemsCount() > 0 && (
                    <span className="cart-count">{getCartItemsCount()}</span>
                  )}
                </button>
              </div>
            </div>

            <button 
              className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>
      
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Auth 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialMode={authMode}
      />
      <Orders 
        isOpen={isOrdersOpen} 
        onClose={() => setIsOrdersOpen(false)}
      />
    </>
  );
};

export default Header;