export interface Product {
  [x: string]: any;
  id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  subcategory?: string;
  price: {
    [x: string]: any;
    msrp: number;
    current: number;
    discountstring?: string;
    discount?: number;
  };
  images: string[];
  attributes: {
    age: string;
    material?: string;
    features: string[];
    dimensions?: string;
    weight?: string;
  };
  stock: number;
  ratings: {
    average: number;
    count: number;
  };
  isNew?: boolean;
  isFeatured?: boolean;
  createdAt: string;
  sku: string;
  inStock: boolean;
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
