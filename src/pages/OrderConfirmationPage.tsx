import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatters';

const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();
  const { orderNumber, total } = location.state || { 
    orderNumber: `ORD-${Date.now()}`, 
    total: 0 
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fa fa-check text-green-600 text-2xl"></i>
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Thank You for Your Order!</h1>
        <p className="text-gray-600 mb-8">Your order has been placed successfully.</p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <h2 className="text-lg font-semibold mb-4">Order Details</h2>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium">{orderNumber}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Total:</span>
              <span className="font-medium">{formatCurrency(total)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="text-green-600">Processing</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6">
          We've sent a confirmation email with all your order details. 
          You can track your order in your account.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
          >
            Continue Shopping
          </Link>
          
          <Link 
            to="/profile" 
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-md transition-colors"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
    