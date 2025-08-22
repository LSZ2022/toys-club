import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// 模拟订单详情数据（实际项目中会删除，此处保留用于对比）
const mockOrderDetails = {
  id: 'ORD-78945',
  date: '2023-06-15',
  status: 'delivered',
  email: 'customer@example.com',
  items: [
    {
      id: '1',
      name: 'Sonic Super Loop Race Set',
      image: 'https://picsum.photos/id/169/100/100',
      price: 59.99,
      quantity: 1,
      total: 59.99
    },
    {
      id: '2',
      name: 'Minecraft Nano MetalFigs Wave 10',
      image: 'https://picsum.photos/id/1059/100/100',
      price: 9.99,
      quantity: 2,
      total: 19.98
    }
  ],
  shippingAddress: {
    name: 'May Fung',
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
    country: 'United States'
  },
  billingAddress: {
    name: 'May Fung',
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
    country: 'United States'
  },
  paymentMethod: 'Credit Card (Visa ending in 4242)',
  subtotal: 79.97,
  shipping: 10.00,
  tax: 8.20,
  total: 98.17,
  trackingNumber: 'TRK123456789'
};

// 骨架屏组件：用于模拟加载中的内容占位
const Skeleton = ({ height, width, radius = '0.375rem' }: { height: string; width: string; radius?: string }) => (
  <div 
    className="bg-gray-100 animate-pulse" 
    style={{ height, width, borderRadius: radius }}
  ></div>
);

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 模拟API请求
  useEffect(() => {
    const fetchOrderDetails = async () => {
      // 模拟网络延迟（实际项目中会调用真实API）
      await new Promise(resolve => setTimeout(resolve, 1200));
      setOrder(mockOrderDetails);
      setLoading(false);
    };

    fetchOrderDetails();
  }, [id]);

  // 获取订单状态标签样式
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pending</span>;
      case 'processing':
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Processing</span>;
      case 'shipped':
        return <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Shipped</span>;
      case 'delivered':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Delivered</span>;
      case 'cancelled':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded">Cancelled</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">Unknown</span>;
    }
  };

  // 优化后的加载状态：结合精致动画和骨架屏
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* 顶部标题区域骨架 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <Skeleton height="2rem" width="200px" />
            <Skeleton height="1rem" width="120px" className="mt-2" />
          </div>
          <Skeleton height="2rem" width="100px" className="mt-4 sm:mt-0" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2 space-y-8">
            {/* 订单商品区域骨架 */}
            <div>
              <Skeleton height="1.5rem" width="150px" />
              <div className="border rounded-lg overflow-hidden mt-4">
                {/* 模拟2个商品的骨架 */}
                {[1, 2].map((item) => (
                  <div key={item} className="flex items-center p-4 border-b last:border-0">
                    <Skeleton height="4rem" width="4rem" radius="0.5rem" />
                    <div className="flex-1 ml-4 space-y-2">
                      <Skeleton height="1rem" width="60%" />
                      <Skeleton height="0.875rem" width="30%" />
                    </div>
                    <Skeleton height="1rem" width="40px" />
                  </div>
                ))}
              </div>
            </div>

            {/* 配送地址骨架 */}
            <div>
              <Skeleton height="1.5rem" width="150px" />
              <div className="bg-light p-4 rounded-lg mt-4 space-y-2">
                <Skeleton height="1rem" width="40%" />
                <Skeleton height="1rem" width="60%" />
                <Skeleton height="1rem" width="80%" />
                <Skeleton height="1rem" width="50%" />
              </div>
            </div>

            {/* 账单地址骨架（复用配送地址结构） */}
            <div>
              <Skeleton height="1.5rem" width="150px" />
              <div className="bg-light p-4 rounded-lg mt-4 space-y-2">
                <Skeleton height="1rem" width="40%" />
                <Skeleton height="1rem" width="60%" />
                <Skeleton height="1rem" width="80%" />
                <Skeleton height="1rem" width="50%" />
              </div>
            </div>

            {/* 支付方式骨架 */}
            <div>
              <Skeleton height="1.5rem" width="150px" />
              <div className="bg-light p-4 rounded-lg mt-4">
                <Skeleton height="1rem" width="70%" />
              </div>
            </div>
          </div>

          {/* 订单摘要骨架 */}
          <div>
            <Skeleton height="1.5rem" width="150px" />
            <div className="bg-light p-4 rounded-lg mt-4">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <Skeleton height="1rem" width="30%" />
                  <Skeleton height="1rem" width="20%" />
                </div>
                <div className="flex justify-between">
                  <Skeleton height="1rem" width="30%" />
                  <Skeleton height="1rem" width="20%" />
                </div>
                <div className="flex justify-between">
                  <Skeleton height="1rem" width="30%" />
                  <Skeleton height="1rem" width="20%" />
                </div>
              </div>
              
              <div className="flex justify-between pt-4 border-t border-gray-200 mb-6">
                <Skeleton height="1.25rem" width="25%" />
                <Skeleton height="1.25rem" width="20%" />
              </div>
              
              <div className="mb-6 space-y-2">
                <Skeleton height="1rem" width="40%" />
                <Skeleton height="1rem" width="60%" />
                <Skeleton height="1rem" width="30%" className="mt-3" />
              </div>
              
              <div className="space-y-3">
                <Skeleton height="2.5rem" width="100%" radius="0.375rem" />
                <Skeleton height="2.5rem" width="100%" radius="0.375rem" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-4">Order not found</h3>
        <p className="text-gray-600 mb-6">We couldn't find the order you're looking for.</p>
        <Link to="/account/orders" className="btn-primary">
          View All Orders
        </Link>
      </div>
    );
  }

  // 原有渲染逻辑（保持不变）
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Order {order.id}</h2>
          <p className="text-gray-600">Placed on {order.date}</p>
        </div>
        <div className="mt-4 sm:mt-0">
          {getStatusBadge(order.status)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2 space-y-8">
          {/* 订单商品 */}
          <div>
            <h3 className="text-lg font-medium mb-4">Order Items</h3>
            <div className="border rounded-lg overflow-hidden">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex items-center p-4 border-b last:border-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${item.total.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 配送地址 */}
          <div>
            <h3 className="text-lg font-medium mb-4">Shipping Address</h3>
            <div className="bg-light p-4 rounded-lg">
              <p>{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          {/* 账单地址 */}
          <div>
            <h3 className="text-lg font-medium mb-4">Billing Address</h3>
            <div className="bg-light p-4 rounded-lg">
              <p>{order.billingAddress.name}</p>
              <p>{order.billingAddress.street}</p>
              <p>
                {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zip}
              </p>
              <p>{order.billingAddress.country}</p>
            </div>
          </div>

          {/* 支付方式 */}
          <div>
            <h3 className="text-lg font-medium mb-4">Payment Method</h3>
            <div className="bg-light p-4 rounded-lg">
              <p>{order.paymentMethod}</p>
            </div>
          </div>
        </div>

        {/* 订单摘要 */}
        <div>
          <h3 className="text-lg font-medium mb-4">Order Summary</h3>
          <div className="bg-light p-4 rounded-lg">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>${order.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex justify-between font-bold pt-4 border-t border-gray-200 mb-6">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            
            {order.trackingNumber && (
              <div className="mb-6">
                <h4 className="font-medium mb-2">Tracking Information</h4>
                <p className="text-gray-600 mb-2">Tracking Number: {order.trackingNumber}</p>
                <button className="text-primary hover:underline text-sm">
                  Track Package <i className="fa fa-external-link ml-1 text-xs"></i>
                </button>
              </div>
            )}
            
            <div className="space-y-3">
              <button className="w-full py-2 px-4 bg-light border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
                <i className="fa fa-print mr-2"></i> Print Invoice
              </button>
              <Link to="/account/orders" className="block text-center py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                Back to Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;