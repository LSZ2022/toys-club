import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { OrderSummary } from '../../types/order';
import { formatCurrency, formatDate } from '../../utils/formatters';

const OrderHistory: React.FC = () => {
  // 显式指定状态类型为OrderSummary数组
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟API请求
    const fetchOrders = async () => {
      try {
        // 模拟订单数据
        const mockOrders: OrderSummary[] = [
          {
            id: 'ORD-7821',
            date: '2023-06-15T10:30:00Z',
            status: 'delivered',
            items: 3,
            total: 89.97
          },
          {
            id: 'ORD-6412',
            date: '2023-05-22T14:45:00Z',
            status: 'delivered',
            items: 1,
            total: 29.99
          },
          {
            id: 'ORD-5932',
            date: '2023-04-08T09:15:00Z',
            status: 'cancelled',
            items: 2,
            total: 54.98
          }
        ];

        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // 现在TypeScript会识别类型匹配
        setOrders(mockOrders);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // 获取订单状态的样式类
  const getStatusClass = (status: OrderSummary['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) {
    return (
      <div className="py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-center text-gray-600">Loading your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-light rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fa fa-file-text-o text-gray-400 text-xl"></i>
        </div>
        <h3 className="text-xl font-bold mb-2">No orders found</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          You haven't placed any orders yet. Browse our collection and find the perfect toys for your kids!
        </p>
        <Link to="/products" className="btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Order History</h1>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(order.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.items}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(order.total)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link to={`/account/orders/${order.id}`} className="text-primary hover:text-primary/80">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
