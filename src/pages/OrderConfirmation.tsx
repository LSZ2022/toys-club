import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { clearCart } = useCart();

  // 模拟订单确认数据
  const orderData = {
    id: orderId || 'ORD-123456',
    date: new Date().toLocaleDateString(),
    email: 'customer@example.com',
    items: 3,
    total: 98.17,
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white rounded-lg shadow-sm p-8 text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fa fa-check text-green-600 text-2xl"></i>
        </div>
        <h1 className="text-3xl font-bold mb-2">Thank You For Your Order!</h1>
        <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
        
        <div className="bg-light rounded-lg p-6 max-w-md mx-auto mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Order Number:</span>
            <span className="font-medium">{orderData.id}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Date:</span>
            <span>{orderData.date}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Email:</span>
            <span>{orderData.email}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Total:</span>
            <span className="font-bold">${orderData.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Estimated Delivery:</span>
            <span>{orderData.estimatedDelivery}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6">
          A confirmation email has been sent to {orderData.email} with your order details.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/account/orders" className="btn-primary">
            View Order Details
          </Link>
          <Link to="/products" className="btn-secondary">
            Continue Shopping
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-light rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa fa-truck text-primary text-xl"></i>
          </div>
          <h3 className="font-medium mb-2">Track Your Order</h3>
          <p className="text-gray-600 text-sm">
            Once your order ships, you'll receive a tracking number to monitor delivery.
          </p>
        </div>
        
        <div className="bg-light rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa fa-shield text-secondary text-xl"></i>
          </div>
          <h3 className="font-medium mb-2">Secure Checkout</h3>
          <p className="text-gray-600 text-sm">
            Your payment information is encrypted and secure. We never share your data.
          </p>
        </div>
        
        <div className="bg-light rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa fa-comments text-accent text-xl"></i>
          </div>
          <h3 className="font-medium mb-2">Need Help?</h3>
          <p className="text-gray-600 text-sm">
            Our customer service team is ready to assist you with any questions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
