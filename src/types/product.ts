// src/types/Product.ts
export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  ageRange: string;
  imageUrl: string; // 保留兼容旧属性
  images: string[]; // 新增图片数组
  originalPrice: number;
  price: number;
  isNew?: boolean;
  isOnSale?: boolean;
  description: string;
  features: string[];
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpfulVotes: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  subcategories?: Category[];
}

export interface FilterOptions {
  age?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  brand?: string[];
  category?: string;
}

export type ProductFilterOptions = FilterOptions;

export interface SortOptions {
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating';
}
