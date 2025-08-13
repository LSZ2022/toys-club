import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

// 模拟最近订单数据
const recentOrders = [
  {
    id: 'ORD-78945',
    date: '2023-06-15',
    status: 'delivered',
    total: 89.97
  },
  {
    id: 'ORD-65421',
    date: '2023-05-22',
    status: 'delivered',
    total: 54.99
  }
];

const AccountDashboard: React.FC = () => {
  const { user } = useAuth();
  const { items } = useCart();

  // 获取订单状态标签样式
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Pending</span>;
      case 'processing':
        return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Processing</span>;
      case 'shipped':
        return <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Shipped</span>;
      case 'delivered':
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Delivered</span>;
      case 'cancelled':
        return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Cancelled</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Unknown</span>;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Welcome back, {user?.name}!</h3>
        <p className="text-gray-600 mb-6">
          From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/account/orders" className="bg-light rounded-lg p-4 hover:bg-gray-100 transition-colors">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <i className="fa fa-shopping-bag text-primary text-xl"></i>
              </div>
              <div>
                <h4 className="font-medium">Orders</h4>
                <p className="text-gray-600 text-sm">View your orders</p>
              </div>
            </div>
          </Link>
          
          <Link to="/account/addresses" className="bg-light rounded-lg p-4 hover:bg-gray-100 transition-colors">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mr-4">
                <i className="fa fa-map-marker text-secondary text-xl"></i>
              </div>
              <div>
                <h4 className="font-medium">Addresses</h4>
                <p className="text-gray-600 text-sm">Manage your addresses</p>
              </div>
            </div>
          </Link>
          
          <Link to="/account/profile" className="bg-light rounded-lg p-4 hover:bg-gray-100 transition-colors">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                <i className="fa fa-user text-accent text-xl"></i>
              </div>
              <div>
                <h4 className="font-medium">Profile</h4>
                <p className="text-gray-600 text-sm">Edit your profile</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      
      {items.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Your Cart</h3>
            <Link to="/cart" className="text-primary hover:underline text-sm">View Cart</Link>
          </div>
          <div className="bg-light rounded-lg p-4">
            <p className="text-gray-600 mb-2">You have {items.length} items in your cart.</p>
            <Link to="/checkout" className="btn-primary inline-block text-sm py-1.5">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Recent Orders</h3>
          <Link to="/account/orders" className="text-primary hover:underline text-sm">View All</Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{order.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{order.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">${order.total.toFixed(2)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                    <Link to={`/account/orders/${order.id}`} className="text-primary hover:underline">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountDashboard;
