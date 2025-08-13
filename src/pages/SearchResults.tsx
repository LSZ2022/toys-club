import React from 'react';
import type { Product, ProductFilterOptions, SortOptions } from '../types';

interface SearchResultProps {
  products: Product[];
  loading: boolean;
  error?: string;
  filterOptions: ProductFilterOptions;
  sortOptions: SortOptions;
  onFilterChange: (filters: ProductFilterOptions) => void;
  onSortChange: (sort: SortOptions) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const SearchResult: React.FC<SearchResultProps> = ({
  products,
  loading,
  error,
  filterOptions,
  sortOptions,
  onFilterChange,
  onSortChange,
  onAddToCart
}) => {
  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (products.length === 0) return <div className="no-results">No products found</div>;

  return (
    <div className="search-results">
      <div className="results-header">
        <h2>{products.length} products found</h2>
        <select
          value={sortOptions.sortBy}
          onChange={(e) => onSortChange({ sortBy: e.target.value as SortOptions['sortBy'] })}
          className="sort-select"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="product-image"
            />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="brand">{product.brand}</p>
              <div className="price">
                {product.price.discount ? (
                  <>
                    <span className="current-price">${product.price.current.toFixed(2)}</span>
                    <span className="original-price">${product.price.msrp.toFixed(2)}</span>
                    {product.price.discountstring && (
                      <span className="discount">{product.price.discountstring}</span>
                    )}
                  </>
                ) : (
                  <span>${product.price.current.toFixed(2)}</span>
                )}
              </div>
              <div className="rating">
                ⭐ {product.ratings.average} ({product.ratings.count})
              </div>
              <button 
                className="add-to-cart"
                onClick={() => onAddToCart(product, 1)}
                disabled={product.stock <= 0}
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;