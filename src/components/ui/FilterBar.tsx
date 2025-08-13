import React, { useState, useEffect } from 'react';
import type { ProductFilterOptions, Category } from '../../types';

interface FilterBarProps {
  filterOptions: ProductFilterOptions;
  onFilterChange: (filters: ProductFilterOptions) => void;
  availableCategories: Category[];
  availableBrands: string[];
  availableAges: string[];
  priceRange: { min: number; max: number };
}

const FilterBar: React.FC<FilterBarProps> = ({
  filterOptions,
  onFilterChange,
  availableCategories,
  availableBrands,
  availableAges,
  priceRange
}) => {
  const [localFilters, setLocalFilters] = useState<ProductFilterOptions>(filterOptions);

  useEffect(() => {
    setLocalFilters(filterOptions);
  }, [filterOptions]);

  const handleFilterChange = () => {
    onFilterChange(localFilters);
  };

  const handleAgeChange = (age: string) => {
    setLocalFilters(prev => {
      const ages = prev.age ? [...prev.age] : [];
      const index = ages.indexOf(age);
      
      if (index > -1) {
        ages.splice(index, 1);
      } else {
        ages.push(age);
      }
      
      return { ...prev, age: ages.length > 0 ? ages : undefined };
    });
  };

  const handleBrandChange = (brand: string) => {
    setLocalFilters(prev => {
      const brands = prev.brand ? [...prev.brand] : [];
      const index = brands.indexOf(brand);
      
      if (index > -1) {
        brands.splice(index, 1);
      } else {
        brands.push(brand);
      }
      
      return { ...prev, brand: brands.length > 0 ? brands : undefined };
    });
  };

  const handleCategoryChange = (category: string) => {
    setLocalFilters(prev => ({ ...prev, category: category || undefined }));
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setLocalFilters(prev => ({
      ...prev,
      priceRange: min !== priceRange.min || max !== priceRange.max 
        ? { min, max } 
        : undefined
    }));
  };

  const resetFilters = () => {
    setLocalFilters({});
    onFilterChange({});
  };

  return (
    <div className="filter-bar">
      <h3>Filters</h3>
      
      <div className="filter-section">
        <h4>Category</h4>
        <select
          value={localFilters.category || ''}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="filter-select"
        >
          <option value="">All Categories</option>
          {availableCategories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <h4>Age</h4>
        <div className="checkbox-group">
          {availableAges.map(age => (
            <label key={age} className="checkbox-label">
              <input
                type="checkbox"
                checked={localFilters.age?.includes(age) || false}
                onChange={() => handleAgeChange(age)}
              />
              {age}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Brand</h4>
        <div className="checkbox-group">
          {availableBrands.map(brand => (
            <label key={brand} className="checkbox-label">
              <input
                type="checkbox"
                checked={localFilters.brand?.includes(brand) || false}
                onChange={() => handleBrandChange(brand)}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Price Range</h4>
        <div className="price-range">
          <input
            type="number"
            min={priceRange.min}
            max={priceRange.max}
            value={localFilters.priceRange?.min || priceRange.min}
            onChange={(e) => handlePriceRangeChange(
              Number(e.target.value), 
              localFilters.priceRange?.max || priceRange.max
            )}
            className="price-input"
          />
          <span> - </span>
          <input
            type="number"
            min={priceRange.min}
            max={priceRange.max}
            value={localFilters.priceRange?.max || priceRange.max}
            onChange={(e) => handlePriceRangeChange(
              localFilters.priceRange?.min || priceRange.min,
              Number(e.target.value)
            )}
            className="price-input"
          />
        </div>
      </div>

      <div className="filter-actions">
        <button 
          className="apply-filters"
          onClick={handleFilterChange}
        >
          Apply Filters
        </button>
        <button 
          className="reset-filters"
          onClick={resetFilters}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterBar;