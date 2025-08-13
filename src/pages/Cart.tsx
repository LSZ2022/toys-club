import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/formatters';
import { useCart } from '../contexts/CartContext';

// Mock product type definition (consistent with product.ts)
interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  ageRange: string;
  imageUrl: string;
  originalPrice: number;
  price: number;
  description: string;
  isNew?: boolean;
  isOnSale?: boolean;
}

// Shopping cart item type
interface CartItem {
  product: Product;
  quantity: number;
}


const CartPage: React.FC = () => {
  // Local state management for cart data
  const { items: cartItems, removeItem, updateQuantity, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate cart statistics
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shippingFee = subtotal >= 500 ? 0 : 49;
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + shippingFee + tax;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  // 修复：使用上下文的removeItem方法
  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
  };

  // 修复：使用上下文的clearCart方法
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  // Proceed to checkout
const handleCheckout = () => {
  // 临时去掉复杂逻辑，只保留跳转
  if (cartItems.length === 0) {
    alert('购物车为空');
    return;
  }
  navigate('/checkout'); // 直接跳转，不传递数据
};

  // Display when cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fa fa-shopping-cart text-gray-400 text-3xl"></i>
        </div>
        <h1 className="text-2xl font-bold mb-3">Your cart is empty</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          It seems you haven't added any toys to your cart yet. Browse our collection to find something perfect!
        </p>
        <Link 
          to="/products" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items list */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Desktop header */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 border-b font-medium text-gray-500">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Subtotal</div>
            </div>
            
            {/* Cart items list */}
            {cartItems.map((item) => (
              <div 
                key={item.product.id} 
                className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 hover:bg-gray-50 transition-colors"
              >
                {/* Product information */}
                <div className="col-span-12 md:col-span-6 flex items-center">
                  <img 
                    src={item.product.imageUrl} 
                    alt={item.product.name} 
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h3 className="font-medium mb-1">{item.product.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span>{item.product.brand}</span>
                      <span className="mx-2">•</span>
                      <span>{item.product.ageRange}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.product.id)}
                      className="text-red-600 hover:text-red-800 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                
                {/* Unit price */}
                <div className="col-span-6 md:col-span-2 flex items-center md:justify-center">
                  <div>
                    <span className="font-medium">{formatCurrency(item.product.price)}</span>
                    {item.product.isOnSale && (
                      <span className="text-gray-500 line-through text-xs ml-2">
                        {formatCurrency(item.product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Quantity adjustment */}
                <div className="col-span-6 md:col-span-2 flex items-center md:justify-center">
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                      aria-label="Decrease quantity"
                      disabled={item.quantity <= 1}
                    >
                      <i className="fa fa-minus text-xs"></i>
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          handleQuantityChange(item.product.id, value);
                        }
                      }}
                      className="w-12 text-center py-1 focus:outline-none"
                      min="1"
                    />
                    <button
                      onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <i className="fa fa-plus text-xs"></i>
                    </button>
                  </div>
                </div>
                
                {/* Subtotal */}
                <div className="col-span-12 md:col-span-2 flex items-center md:justify-end">
                  <span className="font-medium text-right">
                    {formatCurrency(item.product.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Action buttons */}
            <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <Link 
                to="/products" 
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                <i className="fa fa-arrow-left mr-2"></i>
                Continue Shopping
              </Link>
              
              <button
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
        
        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>
                  {shippingFee === 0 
                    ? 'Free' 
                    : formatCurrency(shippingFee)
                  }
                </span>
              </div>
              
              {shippingFee > 0 && (
                <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
                  Spend {formatCurrency(500 - subtotal)} more for free shipping
                </div>
              )}
              
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
            
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition-colors disabled:opacity-70"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : 'Proceed to Checkout'}
            </button>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              <i className="fa fa-lock mr-1"></i>
              Secure payment powered by Stripe
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
