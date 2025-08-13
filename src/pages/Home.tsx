import { useState } from 'react';
import { Link } from 'react-router-dom';
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

interface HomeProps {
  openQuickView: (product: Product) => void;
}

const Home = ({ openQuickView }: HomeProps) => {
  // 示例产品数据
  const [products] = useState<Product[]>([
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
      features: [
        "Includes Sonic character car and 5.5m track",
        "Battery-powered car with high-speed motor",
        "Easy to assemble with snap-together pieces",
        "Recommended for ages 8 and up"
      ]
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
      features: [
        "10\" tall transforming action figure",
        "20+ points of articulation",
        "Light-up features and authentic sounds",
        "Durable construction with premium materials"
      ]
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
      features: [
        "Authentic 1.5\" die-cast metal figures",
        "From Minecraft Wave 10 collection",
        "Highly detailed and articulated",
        "Perfect for collectors and fans"
      ]
    },
    {
      id: 4,
      name: "Blast & Roar Toothless Mask",
      brand: "How to Train Your Dragon",
      category: "Costumes",
      ageRange: "3+",
      imageUrl: "https://picsum.photos/id/1060/400/300",
      originalPrice: 29.99,
      price: 19.99,
      description: "Interactive Toothless mask with light-up eyes and sound effects. Adjustable strap for comfortable fit.",
      features: [
        "Interactive mask with light-up eyes",
        "Authentic sound effects",
        "Adjustable strap for comfortable fit",
        "Safe for children ages 3 and up"
      ]
    },
    {
      id: 5,
      name: "Intex Easy Set Inflatable Pool",
      brand: "Intex",
      category: "Water Toys",
      ageRange: "3+",
      imageUrl: "https://picsum.photos/id/1062/400/300",
      originalPrice: 89.99,
      price: 59.99,
      isOnSale: true,
      description: "10ft x 30in inflatable pool with easy setup. Includes filter pump and repair patch.",
      features: [
        "10ft x 30in inflatable pool",
        "Easy setup - ready in 10 minutes",
        "Includes filter pump and repair patch",
        "Durable 3-ply material"
      ]
    },
    {
      id: 6,
      name: "Mello Natural Cosmetic Set",
      brand: "Mello",
      category: "Kids' Cosmetics",
      ageRange: "6+",
      imageUrl: "https://picsum.photos/id/1066/400/300",
      originalPrice: 34.99,
      price: 24.99,
      description: "Plant-based, non-toxic kids' makeup set with lip gloss, eyeshadow, and blusher. Safe for sensitive skin.",
      features: [
        "Plant-based, non-toxic formula",
        "Includes lip gloss, eyeshadow, and blusher",
        "Safe for sensitive skin",
        "Washable and easy to remove"
      ]
    },
    {
      id: 7,
      name: "Wooden Retro Arcade Machine",
      brand: "RetroPlay",
      category: "Games",
      ageRange: "8+",
      imageUrl: "https://picsum.photos/id/1071/400/300",
      originalPrice: 129.99,
      price: 99.99,
      description: "Wooden tabletop arcade with 60 classic games. Includes joystick and buttons for authentic gameplay.",
      features: [
        "Wooden tabletop arcade with 60 classic games",
        "Authentic joystick and buttons",
        "Built-in speakers with volume control",
        "Powered by AC adapter or batteries"
      ]
    },
    {
      id: 8,
      name: "Coca-Cola Blind Box Figures",
      brand: "The Monsters",
      category: "Collectibles",
      ageRange: "12+",
      imageUrl: "https://picsum.photos/id/1074/400/300",
      originalPrice: 14.99,
      price: 11.99,
      isNew: true,
      description: "Limited edition Coca-Cola themed blind box figures. 12 different designs to collect, including rare chase pieces.",
      features: [
        "Limited edition Coca-Cola themed figures",
        "12 different designs to collect",
        "Includes rare chase pieces",
        "Perfect for adult collectors"
      ]
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

  // 应用筛选和排序
  const filteredAndSortedProducts = [...products]
    // 应用年龄筛选
    .filter(product => {
      if (!ageFilter) return true;
      return product.ageRange.includes(ageFilter);
    })
    // 应用价格筛选
    .filter(product => {
      if (!priceFilter) return true;
      const [min, max] = priceFilter.split('-').map(p => parseFloat(p.replace('$', '')));
      if (priceFilter === '100+') {
        return product.price >= 100;
      }
      return product.price >= min && product.price <= max;
    })
    // 应用排序
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return a.isNew && !b.isNew ? -1 : 1;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default: // featured
          return 0;
      }
    });

  return (
    <>
      {/* 英雄区域 */}
      <section className="relative bg-gradient-to-r from-secondary/90 to-primary/90 text-white overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-display font-bold leading-tight text-shadow mb-4">
              Discover the Perfect Toys for Every Child
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Safe, durable, and engaging toys for all ages. Shop our curated collection today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products" className="btn-primary text-center">
                Shop Now
              </Link>
              <Link to="#categories" className="btn-secondary bg-white/20 backdrop-blur-sm text-white border-none hover:bg-white/30 text-center">
                Explore Categories
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block opacity-20">
          <img src="https://picsum.photos/id/1058/800/800" alt="Children playing with toys" className="h-full w-full object-cover" />
        </div>
      </section>

      {/* 分类快捷入口 */}
      <section id="categories" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-12">Browse by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            <Link to="/products/outdoor/water" className="category-card group">
              <div className="bg-light rounded-xl p-4 text-center card-hover">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <i className="fa fa-ship text-primary text-2xl"></i>
                </div>
                <h3 className="font-medium">Water Toys</h3>
              </div>
            </Link>
            
            <Link to="/products/outdoor/ride-on" className="category-card group">
              <div className="bg-light rounded-xl p-4 text-center card-hover">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-secondary/20 transition-colors">
                  <i className="fa fa-car text-secondary text-2xl"></i>
                </div>
                <h3 className="font-medium">Ride-Ons</h3>
              </div>
            </Link>
            
            <Link to="/products/games" className="category-card group">
              <div className="bg-light rounded-xl p-4 text-center card-hover">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                  <i className="fa fa-gamepad text-accent text-2xl"></i>
                </div>
                <h3 className="font-medium">Games</h3>
              </div>
            </Link>
            
            <Link to="/products/building" className="category-card group">
              <div className="bg-light rounded-xl p-4 text-center card-hover">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
                  <i className="fa fa-cubes text-green-600 text-2xl"></i>
                </div>
                <h3 className="font-medium">Building Blocks</h3>
              </div>
            </Link>
            
            <Link to="/products/crafts" className="category-card group">
              <div className="bg-light rounded-xl p-4 text-center card-hover">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors">
                  <i className="fa fa-paint-brush text-purple-600 text-2xl"></i>
                </div>
                <h3 className="font-medium">Arts & Crafts</h3>
              </div>
            </Link>
            
            <Link to="/products/dolls" className="category-card group">
              <div className="bg-light rounded-xl p-4 text-center card-hover">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-pink-200 transition-colors">
                  <i className="fa fa-female text-pink-600 text-2xl"></i>
                </div>
                <h3 className="font-medium">Dolls</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 精选产品区 */}
      <section id="featured" className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <h2 className="text-3xl font-display font-bold mb-4 md:mb-0">Featured Products</h2>
            
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

      {/* 年龄推荐区 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-12">Toys by Age Group</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/products/age/3-5" className="group relative rounded-xl overflow-hidden h-64 card-hover">
              <img src="https://picsum.photos/id/1068/600/400" alt="Toys for 3-5 years" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Ages 3-5</h3>
                <p className="mb-4 opacity-90">Developmental toys for early learning</p>
                <span className="inline-flex items-center font-medium group-hover:underline">
                  Shop Collection
                  <i className="fa fa-arrow-right ml-2 transition-transform duration-300 group-hover:translate-x-1"></i>
                </span>
              </div>
            </Link>
            
            <Link to="/products/age/6-8" className="group relative rounded-xl overflow-hidden h-64 card-hover">
              <img src="https://picsum.photos/id/1070/600/400" alt="Toys for 6-8 years" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Ages 6-8</h3>
                <p className="mb-4 opacity-90">Creative and imaginative play</p>
                <span className="inline-flex items-center font-medium group-hover:underline">
                  Shop Collection
                  <i className="fa fa-arrow-right ml-2 transition-transform duration-300 group-hover:translate-x-1"></i>
                </span>
              </div>
            </Link>
            
            <Link to="/products/age/9+" className="group relative rounded-xl overflow-hidden h-64 card-hover">
              <img src="https://picsum.photos/id/1072/600/400" alt="Toys for 9+ years" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Ages 9+</h3>
                <p className="mb-4 opacity-90">Advanced building and gaming</p>
                <span className="inline-flex items-center font-medium group-hover:underline">
                  Shop Collection
                  <i className="fa fa-arrow-right ml-2 transition-transform duration-300 group-hover:translate-x-1"></i>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 用户评价 */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-4">What Our Customers Say</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">Read reviews from parents and toy enthusiasts who love our products</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <img src="https://picsum.photos/id/1027/100/100" alt="Emma Rodriguez" className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <h4 className="font-medium">May Fung</h4>
                  <div className="flex text-accent text-sm">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">"The Sonic race set was a huge hit with my 8-year-old! The quality is excellent and it's very easy to set up. Shipping was fast and the price was better than other retailers."</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <img src="https://picsum.photos/id/1012/100/100" alt="Liam Chen" className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <h4 className="font-medium">Brian Cheung</h4>
                  <div className="flex text-accent text-sm">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-half-o"></i>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">"As a collector, I appreciate the detailed descriptions and high-quality images. The Minecraft MetalFigs arrived in perfect condition and are exactly as described. Will definitely shop again!"</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <img src="https://picsum.photos/id/1005/100/100" alt="James Wilson" className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <h4 className="font-medium">Jerry Lee</h4>
                  <div className="flex text-accent text-sm">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-o"></i>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">"The gift guide made it easy to find the perfect presents for my niece and nephew. The Toothless mask was a big hit and the cosmetic set is safe and fun. Great service!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* 订阅区域 */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-4">Stay Updated on New Arrivals</h2>
            <p className="text-gray-600 mb-8">Subscribe to our newsletter for exclusive deals and first access to new toy releases</p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe Now
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
