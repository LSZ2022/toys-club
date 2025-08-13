import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AccountLayout: React.FC = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // 如果用户未登录，重定向到登录页
  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login?redirect=/account');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // 重定向过程中不显示内容
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 侧边导航 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
            <div className="mb-6">
              <h3 className="font-medium text-lg mb-2">Hello, {user?.name}</h3>
              <p className="text-gray-600 text-sm">{user?.email}</p>
            </div>
            
            <nav>
              <ul className="space-y-1">
                <li>
                  <Link 
                    to="/account" 
                    className="block px-4 py-2 rounded-md hover:bg-light transition-colors"
                  >
                    <i className="fa fa-dashboard mr-2 text-gray-500"></i>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/account/orders" 
                    className="block px-4 py-2 rounded-md hover:bg-light transition-colors"
                  >
                    <i className="fa fa-shopping-bag mr-2 text-gray-500"></i>
                    Orders
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/account/profile" 
                    className="block px-4 py-2 rounded-md hover:bg-light transition-colors"
                  >
                    <i className="fa fa-user mr-2 text-gray-500"></i>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/account/addresses" 
                    className="block px-4 py-2 rounded-md hover:bg-light transition-colors"
                  >
                    <i className="fa fa-map-marker mr-2 text-gray-500"></i>
                    Addresses
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      // 这里应该调用logout函数
                      navigate('/');
                    }}
                    className="w-full text-left px-4 py-2 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <i className="fa fa-sign-out mr-2"></i>
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        {/* 主内容区域 */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
