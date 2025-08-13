import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/Toast';

// 开发环境模拟购物车数据（生产环境会被真实数据覆盖）
const mockCartItems = [
  {
    product: {
      id: 'p1001',
      name: 'LEGO City Police Station',
      brand: 'LEGO',
      category: 'Building Blocks',
      ageRange: '6-12 years',
      imageUrl: '/images/lego-police.jpg',
      originalPrice: 349.99,
      price: 299.99,
      images: ['/images/lego-police.jpg'],
      description: 'Includes police headquarters and 3 minifigures'
    },
    quantity: 1
  },
  {
    product: {
      id: 'p1003',
      name: 'Plush Teddy Bear',
      brand: 'Build-A-Bear',
      category: 'Plush Toys',
      ageRange: '3+ years',
      imageUrl: '/images/teddy-bear.jpg',
      originalPrice: 109.99,
      price: 89.99,
      images: ['/images/teddy-bear.jpg'],
      description: 'Soft short plush material'
    },
    quantity: 2
  }
];

const CheckoutLayout: React.FC = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { items: cartItems, loading: cartLoading } = useCart(); // 从购物车上下文获取数据
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const isDevelopment = process.env.NODE_ENV === 'development';

  // 合并加载状态（用户认证 + 购物车数据）
  const isLoading = authLoading || cartLoading;

  // 处理开发环境模拟数据（仅开发模式生效）
  const items = isDevelopment 
    ? cartItems.length > 0 ? cartItems : mockCartItems 
    : cartItems;

  // 计算订单金额（兼容模拟数据和真实数据）
  const calculateSubtotal = () => {
    return items.reduce(
      (sum, item) => sum + (item.product.price * item.quantity), 
      0
    );
  };

  // 校验并处理页面跳转逻辑
  React.useEffect(() => {
    // 加载中不执行跳转
    if (isLoading) return;

    // 生产环境：购物车为空则跳转
    if (!isDevelopment && items.length === 0) {
      showToast('Your cart is empty. Please add items to continue.', 'warning');
      navigate('/cart');
      return;
    }

    // 未登录则跳转至登录页（附带重定向参数）
    if (!isAuthenticated) {
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
      showToast('Please log in to continue checkout.', 'info');
    }
  }, [isAuthenticated, items.length, isLoading, isDevelopment, navigate, location.pathname, showToast]);

  // 加载状态显示
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-4 text-gray-600">Preparing your checkout...</p>
      </div>
    );
  }

  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      {/* 结账步骤指示器 */}
      <div className="mb-10">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {/* 步骤1：信息 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mb-2">1</div>
            <span className="text-sm font-medium">Information</span>
          </div>
          <div className="flex-1 h-1 mx-4 bg-gray-200">
            <div className="h-full bg-primary" style={{ width: '33%' }}></div>
          </div>
          
          {/* 步骤2：配送 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mb-2">2</div>
            <span className="text-sm font-medium">Shipping</span>
          </div>
          <div className="flex-1 h-1 mx-4 bg-gray-200"></div>
          
          {/* 步骤3：支付 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mb-2">3</div>
            <span className="text-sm font-medium">Payment</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 主内容区域（步骤表单） */}
        <div className="lg:col-span-2">
          <Outlet />
        </div>
        
        {/* 订单摘要侧边栏 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            {/* 购物车商品列表 */}
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm line-clamp-1">{item.product.name}</h3>
                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                    <p className="font-medium text-primary">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 价格明细 */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Calculated at next step</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8%)</span>
                <span>${(calculateSubtotal() * 0.08).toFixed(2)}</span>
              </div>
            </div>
            
            {/* 总计 */}
            <div className="flex justify-between font-bold text-lg pt-4 border-t border-gray-200">
              <span>Total</span>
              <span className="text-primary">
                ${(calculateSubtotal() * 1.08).toFixed(2)}
              </span>
            </div>
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutLayout;