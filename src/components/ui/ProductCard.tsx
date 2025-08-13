// src/components/ProductCard.tsx
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext, useCart } from '../../contexts/CartContext';
import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();
  // 模拟异步添加购物车（比如调用 API）
  const handleAddToCart = async () => {
    setIsAdding(true);

    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 800));

    // 调用 Context 的添加方法
    addItem(product);

    setIsAdding(false);
  };

  // 快速预览（可扩展为弹窗或新页面）
  const handleQuickView = () => {
    console.log('预览商品:', product);
    // 这里可以扩展为：打开模态框展示商品详情
  };

  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm transition-shadow hover:shadow-lg">
        <div className="relative">
          <Link to={`/products/${product.id}`}>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover" />
          </Link>

          <span className="absolute top-3 left-3 bg-accent text-dark text-xs font-bold px-2 py-1 rounded">
            {product.ageRange}
          </span>

          {product.isNew && (
            <span className="absolute top-3 right-3 bg-secondary text-white text-xs font-bold px-2 py-1 rounded">
              New
            </span>
          )}

          {product.isOnSale && !product.isNew && (
            <span className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
              Sale
            </span>
          )}

          <button
            className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
            aria-label="Add to wishlist"
          >
            <i className="fa fa-heart-o text-gray-600"></i>
          </button>
        </div><div className="p-4">
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <span>{product.brand}</span>
            <span className="mx-2">•</span>
            <span>{product.category}</span>
          </div>

          <Link to={`/products/${product.id}`}>
            <h3 className="font-medium text-lg mb-2 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>

          <div className="mb-3">
            <span className="text-gray-500 line-through text-sm mr-2">
              MSRP: ${product.originalPrice.toFixed(2)}
            </span>
            <span className="text-primary font-bold text-lg">
              Now: ${product.price.toFixed(2)}
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex gap-2">
            <button
              className="btn-primary flex-1 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleAddToCart}
              disabled={isAdding}
            >
              {isAdding ? 'Adding...' : 'Add to Cart'}
            </button>
            <button
              className="btn-secondary p-2"
              aria-label="Quick view"
              onClick={handleQuickView}
            >
              <i className="fa fa-eye"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;