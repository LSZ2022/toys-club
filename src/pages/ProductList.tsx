import { useState } from 'react';
import ProductCard from '@/components/ui/ProductCard';

// 产品数据类型定义
interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  ageRange: string;
  imageUrl: string;
  originalPrice: number;
  price: number;
  isNew?: boolean;
  isOnSale?: boolean;
  description: string;
  features: string[];
}

interface ProductListProps {
  openQuickView: (product: Product) => void;
}

const ProductList = ({ openQuickView }: ProductListProps) => {
  // 示例产品数据
  const [products] = useState<Product[]>([
    // 这里可以放更多产品数据，与首页类似
    {
      id: 1,
      name: "Sonic Super Loop Race Set",
      brand: "Sonic",
      category: "Outdoor",
      ageRange: "8+",
      imageUrl: "https://picsum.photos/id/169/400/300",
      originalPrice: 79.99,
      price: 59.99,
      description: "Exciting race track with 5.5m loop design and Sonic character car. Battery-powered for high-speed action.",
      features: []
    },
    {
      id: 2,
      name: "Transformers Optimus Prime",
      brand: "Transformers",
      category: "Action Figures",
      ageRange: "5+",
      imageUrl: "https://picsum.photos/id/111/400/300",
      originalPrice: 49.99,
      price: 34.99,
      description: "10\" tall transforming action figure with 20+ points of articulation and light-up features.",
      features: []
    },
    {
      id: 3,
      name: "Minecraft Nano MetalFigs Wave 10",
      brand: "Minecraft",
      category: "Collectibles",
      ageRange: "6+",
      imageUrl: "https://picsum.photos/id/1059/400/300",
      originalPrice: 12.99,
      price: 9.99,
      isNew: true,
      description: "Authentic 1.5\" die-cast metal figures from Minecraft. Collect all characters from Wave 10.",
      features: []
    }
  ]);

  // 筛选和排序状态
  const [ageFilter, setAgeFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // 处理筛选和排序变化
  const handleAgeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAgeFilter(e.target.value);
  };

  const handlePriceFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceFilter(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  // 应用筛选和排序（与首页逻辑相同）
  const filteredAndSortedProducts = [...products]
    .filter(product => !ageFilter || product.ageRange.includes(ageFilter))
    .filter(product => {
      if (!priceFilter) return true;
      const [min, max] = priceFilter.split('-').map(p => parseFloat(p.replace('$', '')));
      if (priceFilter === '100+') return product.price >= 100;
      return product.price >= min && product.price <= max;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return a.isNew && !b.isNew ? -1 : 1;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });

  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <h2 className="text-3xl font-display font-bold mb-4 md:mb-0">All Products</h2>
          
          {/* 筛选和排序 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <select 
                id="filter-age" 
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={ageFilter}
                onChange={handleAgeFilterChange}
              >
                <option value="">Age Group</option>
                <option value="3+">3+ Years</option>
                <option value="5+">5+ Years</option>
                <option value="8+">8+ Years</option>
                <option value="12+">12+ Years</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <i className="fa fa-chevron-down text-xs"></i>
              </div>
            </div>
            
            <div className="relative">
              <select 
                id="filter-price" 
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={priceFilter}
                onChange={handlePriceFilterChange}
              >
                <option value="">Price Range</option>
                <option value="0-25">$0 - $25</option>
                <option value="25-50">$25 - $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="100+">$100+</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <i className="fa fa-chevron-down text-xs"></i>
              </div>
            </div>
            
            <div className="relative">
              <select 
                id="sort-by" 
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <i className="fa fa-chevron-down text-xs"></i>
              </div>
            </div>
          </div>
        </div>
        
        {/* 产品网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickView={() => openQuickView(product)} 
            />
          ))}
        </div>
        
        {/* 加载更多按钮 */}
        <div className="text-center mt-12">
          <button className="btn-secondary px-8 py-3">
            Load More Products
            <i className="fa fa-refresh ml-2"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
