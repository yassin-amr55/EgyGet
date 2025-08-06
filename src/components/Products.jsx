import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import './Products.css';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();
  const { searchQuery, searchProducts } = useSearch();

  const products = [
    {
      id: 1,
      name: "Wireless Bluetooth Earbuds",
      price: "$79.99",
      originalPrice: "$99.99",
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "electronics",
      delivery: 25,
      reviews: 128
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: "$199.99",
      originalPrice: "$249.99",
      image: "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "electronics",
      delivery: 5,
      reviews: 89
    },
    {
      id: 3,
      name: "Premium Coffee Mug",
      price: "$24.99",
      originalPrice: "$29.99",
      image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "home",
      delivery: 12,
      reviews: 56
    },
    {
      id: 4,
      name: "Designer Sunglasses",
      price: "$149.99",
      originalPrice: "$199.99",
      image: "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "fashion",
      delivery: 2,
      reviews: 234
    },
    {
      id: 5,
      name: "Laptop Stand Adjustable",
      price: "$45.99",
      originalPrice: "$59.99",
      image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400",
      category: "electronics",
      delivery: 3,
      reviews: 67
    },
    {
      id: 6,
      name: "Organic Cotton T-Shirt",
      price: "$29.99",
      originalPrice: "$39.99",
      image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "fashion",
      delivery: 44,
      reviews: 145
    },
    {
      id: 7,
      name: "Ceramic Plant Pot",
      price: "$19.99",
      originalPrice: "$24.99",
      image: "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "home",
      delivery: 12,
      reviews: 92
    },
    {
      id: 8,
      name: "Wireless Charging Pad",
      price: "$34.99",
      originalPrice: "$44.99",
      image: "https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "electronics",
      delivery: 3,
      reviews: 78
    },
    {
      id: 9,
      name: "Minimalist Backpack",
      price: "$89.99",
      originalPrice: "$119.99",
      image: "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "fashion",
      delivery: 6,
      reviews: 156
    },
    {
      id: 10,
      name: "LED Desk Lamp",
      price: "$54.99",
      originalPrice: "$69.99",
      image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "home",
      delivery: 2,
      reviews: 203
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'bath', name: 'Bath' },
    { id: 'kitchen', name: 'Kitchen' },
    { id: 'pets', name: 'Pets' },
    { id: 'sale', name: 'Sale' },
    { id: 'new', name: 'New&Trending' }
  ];

  // First filter by category
  let filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Then filter by search query
  filteredProducts = searchProducts(filteredProducts, searchQuery);

  /*const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star filled">★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">★</span>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star empty">★</span>
      );
    }

    return stars;
  };*/

  const handleAddToCart = (product) => {
    addToCart(product);
    // Optional: Show a brief success message
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Added!';
    button.style.background = '#10b981';
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = '';
    }, 1000);
  };
  return (
    <section className="products section" id="products">
      <div className="container">
        <h2 className="section-title">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Our Products'}
        </h2>
        
        {searchQuery && (
          <div className="search-info">
            <p>{filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found</p>
            {filteredProducts.length === 0 && (
              <p>Try adjusting your search terms or browse our categories below.</p>
            )}
          </div>
        )}
        
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                
                <div className="product-content">
                  <h3 className="product-name">{product.name}</h3>
                  
                  <div className="product-rating">
                    <span className="reviews">In {product.delivery} days</span>
                  </div>

                  <div className="product-price">
                    <span className="current-price">{product.price}</span>
                    <span className="original-price">{product.originalPrice}</span>
                  </div>

                  <button 
                    className="btn add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-products">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <h3>No products found</h3>
            <p>Try a different search term or browse our categories.</p>
          </div>
        )}
      </div>
      <div className="loofah-section">
        <div className="loofah-container">
          <div className="loofah-text">
            <h2><strong>BUT WHAT IS <em>LOOFAH?</em></strong></h2>
            <p>
              Egyptian natural loofahs originated in ancient Egypt, where the <em>Luffa aegyptiaca</em> plant was used as a natural sponge for bathing and exfoliation — a tradition thousands of years old.
            </p>
            <p className="highlight">
              SHOWER YOUR WAY to healthier-looking skin with Egyptian loofah by ALMOONI.
            </p>
            
          </div>
          <div className="loofah-image">
            <img src="/src/assets/loofah.png" alt="Loofah plant" />
          </div>
        </div>
      </div>
            <div className="loofah-icons">
              <img src="/src/assets/natural.png" alt="Natural" />
              <img src="/src/assets/eco-icon.png" alt="Eco Friendly" />
              <img src="/src/assets/bio-icon.png" alt="Biodegradable" />
            </div>
    </section>
  );
};

export default Products;