import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

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

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  // 获取产品详情数据
  useEffect(() => {
    // 在实际应用中，这里会是API调用
    // 这里使用示例数据
    const sampleProducts: Product[] = [
      {
        id: 1,
        name: "Sonic Super Loop Race Set",
        brand: "Sonic",
        category: "Outdoor",
        ageRange: "8+",
        imageUrl: "https://picsum.photos/id/169/600/600",
        originalPrice: 79.99,
        price: 59.99,
        description: "Experience high-speed racing action with the Sonic Super Loop Race Set! This exciting track set features a 5.5 meter loop design that challenges Sonic to defy gravity as he races through the loop.",
        features: [
          "Includes Sonic character car and 5.5m track",
          "Battery-powered car with high-speed motor",
          "Easy to assemble with snap-together pieces",
          "Recommended for ages 8 and up"
        ]
      }
    ];

    // 查找匹配ID的产品
    const foundProduct = sampleProducts.find(p => p.id === parseInt(id || ''));
    setProduct(foundProduct || null);
  }, [id]);

  // 处理数量增减
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // 新增：处理添加到购物车
  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity); // 调用上下文方法添加商品
    }
  };

  // 如果产品不存在，显示加载中或错误信息
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading product details...</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-light p-6 md:p-10 flex items-center justify-center">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="max-h-[500px] object-contain"
              />
            </div>
            
            <div className="p-6 md:p-10">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Link to={`/products/brand/${product.brand.toLowerCase()}`} className="hover:text-primary transition-colors">
                  {product.brand}
                </Link>
                <span className="mx-2">•</span>
                <Link to={`/products/category/${product.category.toLowerCase()}`} className="hover:text-primary transition-colors">
                  {product.category}
                </Link>
                <span className="mx-2">•</span>
                <Link to={`/products/age/${product.ageRange}`} className="hover:text-primary transition-colors">
                  {product.ageRange}
                </Link>
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              <div className="mb-6">
                <span className="text-gray-500 line-through mr-2">
                  MSRP: ${product.originalPrice.toFixed(2)}
                </span>
                <span className="text-primary font-bold text-2xl">
                  Now: ${product.price.toFixed(2)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="ml-2 bg-accent/20 text-dark text-sm px-2 py-1 rounded">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
                {product.isNew && (
                  <span className="ml-2 bg-secondary/20 text-secondary text-sm px-2 py-1 rounded">
                    New
                  </span>
                )}
              </div>
              
              <div className="mb-8">
                <h2 className="font-medium text-lg mb-3">Description</h2>
                <p className="text-gray-600 mb-6">{product.description}</p>
                
                <h3 className="font-medium mb-2">Features</h3>
                <ul className="text-gray-600 space-y-2 mb-6">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fa fa-check text-green-500 mt-1 mr-2"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="font-medium mb-3">Quantity</h3>
                <div className="flex items-center w-36 border border-gray-300 rounded-md">
                  <button 
                    className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors" 
                    aria-label="Decrease quantity"
                    onClick={decrementQuantity}
                  >
                    <i className="fa fa-minus"></i>
                  </button>
                  <input 
                    type="number" 
                    value={quantity} 
                    min="1" 
                    className="w-full text-center py-3 focus:outline-none"
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                  <button 
                    className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors" 
                    aria-label="Increase quantity"
                    onClick={incrementQuantity}
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary flex-1 py-3 text-lg"
                        onClick={handleAddToCart}>
                  <i className="fa fa-shopping-cart mr-2"></i>
                  Add to Cart
                </button>
                <button className="btn-secondary py-3 px-6">
                  <i className="fa fa-heart-o mr-2"></i>
                  Wishlist
                </button>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center">
                    <i className="fa fa-truck text-primary mr-2"></i>
                    <span>Free shipping over $50</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fa fa-refresh text-primary mr-2"></i>
                    <span>30-day returns</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fa fa-lock text-primary mr-2"></i>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fa fa-shield text-primary mr-2"></i>
                    <span>Quality guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
