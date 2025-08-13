import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, user, logout } = useAuth();
  const { items } = useCart();
  const location = useLocation();

  // 监听滚动事件，用于导航栏样式变化
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 处理搜索提交
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // 跳转到搜索结果页
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  // 计算购物车商品总数
  const cartItemCount = items.reduce((total: any, item: { quantity: any; }) => total + item.quantity, 0);

  return (
    // 关键：使用w-full确保宽度占满浏览器
    <header 
      className={`w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      {/* 内部容器使用max-w-7xl和mx-auto限制内容最大宽度并居中 */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* 品牌Logo */}
          <Link to="/" className="text-2xl font-bold text-primary flex items-center">
            <i className="fa fa-toys mr-2"></i>
            <span>ToyClub</span>
          </Link>

          {/* 桌面导航 - 中等屏幕以上显示 */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium ${location.pathname === '/' ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`font-medium ${location.pathname.startsWith('/products') ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
            >
              Shop
            </Link>
            <Link 
              to="/about" 
              className={`font-medium ${location.pathname === '/about' ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium ${location.pathname === '/contact' ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
            >
              Contact
            </Link>
          </nav>

          {/* 搜索框 - 中等屏幕以上显示 */}
          <div className="hidden md:block w-1/3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search toys..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
              >
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>

          {/* 用户功能区 */}
          <div className="flex items-center space-x-4">
            {/* 购物车图标 */}
            <Link to="/cart" className="relative text-gray-700 hover:text-primary">
              <i className="fa fa-shopping-cart text-xl"></i>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* 用户菜单 */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-primary">
                  <i className="fa fa-user-circle text-xl mr-1"></i>
                  <span className="hidden md:inline font-medium">
                    {user?.firstName || 'Account'}
                  </span>
                  <i className="fa fa-chevron-down ml-1 text-xs"></i>
                </button>
                {/* 用户下拉菜单 */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                  <Link 
                    to="/account" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Account
                  </Link>
                  <Link 
                    to="/account/orders" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-primary">
                <i className="fa fa-user-circle text-xl"></i>
                <span className="hidden md:inline font-medium ml-1">Login</span>
              </Link>
            )}

            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-primary"
              aria-label="Toggle menu"
            >
              <i className={`fa ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            {/* 移动端搜索框 */}
            <form onSubmit={handleSearch} className="mb-4 relative">
              <input
                type="text"
                placeholder="Search toys..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
              >
                <i className="fa fa-search"></i>
              </button>
            </form>

            {/* 移动端导航链接 */}
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`py-2 ${location.pathname === '/' ? 'text-primary font-medium' : 'text-gray-700'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className={`py-2 ${location.pathname.startsWith('/products') ? 'text-primary font-medium' : 'text-gray-700'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/about" 
                className={`py-2 ${location.pathname === '/about' ? 'text-primary font-medium' : 'text-gray-700'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`py-2 ${location.pathname === '/contact' ? 'text-primary font-medium' : 'text-gray-700'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
