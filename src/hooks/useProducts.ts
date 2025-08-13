import { useState, useEffect, useCallback } from 'react';
import type { Product, ProductFilterOptions, SortOptions } from '../types';

// 模拟产品数据获取
const fetchProducts = async (
  filters: ProductFilterOptions, 
  sort: SortOptions
): Promise<Product[]> => {
  // 实际项目中这里会调用API
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filters, sort })
  });
  
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

export const useProduct = (
  initialFilters: ProductFilterOptions = {},
  initialSort: SortOptions = { sortBy: 'featured' }
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilterOptions>(initialFilters);
  const [sortOptions, setSortOptions] = useState<SortOptions>(initialSort);

  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchProducts(filters, sortOptions);
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [filters, sortOptions]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const updateFilters = (newFilters: ProductFilterOptions) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const updateSort = (newSort: SortOptions) => {
    setSortOptions(newSort);
  };

  return {
    products,
    loading,
    error,
    filters,
    sortOptions,
    updateFilters,
    updateSort,
    refreshProducts: getProducts
  };
};