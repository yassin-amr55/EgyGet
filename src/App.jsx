import React from 'react';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import Header from './components/Header';
import FeaturedProducts from './components/FeaturedProducts';
import Products from './components/Products';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App-new.css';

function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <CartProvider>
          <SearchProvider>
            <div className="App">
              <Header />
              <main>
                <FeaturedProducts />
                <Products />
                <Contact />
              </main>
              <Footer />
            </div>
          </SearchProvider>
        </CartProvider>
      </OrderProvider>
    </AuthProvider>
  );
}

export default App;