import React from 'react';
import { Routes, Route } from 'react-router-dom';


// 布局组件
import MainLayout from '@/components/layouts/MainLayout';
import AccountLayout from '@/components/layouts/AccountLayout';
import CheckoutLayout from '@/components/layouts/CheckoutLayout';

// 页面组件
import Home from '@/pages/Home';
import ProductList from '@/pages/ProductList';
import ProductDetail from '@/pages/ProductDetail';
import SearchResults from '@/pages/SearchResults';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import OrderConfirmation from '@/pages/OrderConfirmation';
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import AccountDashboard from '@/pages/Account/Dashboard';
import OrderHistory from '@/pages/Account/OrderHistory';
import OrderDetail from '@/pages/Account/OrderDetail';
import NotFound from '@/pages/NotFound';
import ForgotPassword from './pages/Auth/ForgetPassword';
import UserProfile from './pages/Account/UserProfile';
import About from './pages/About';
import Contact from './pages/Contact';

const App: React.FC = () => {
  return (

    <Routes>
      {/* 公共页面 - 使用主布局 */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="search" element={<SearchResults />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/about" element={<About />} /> {/* 新增 */}
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* 结账流程 */}
      <Route path="checkout" element={<CheckoutLayout />}>
        <Route index element={<Checkout />} />
        <Route path="confirmation/:orderId" element={<OrderConfirmation />} />
      </Route>

      {/* 认证页面 */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />

      {/* 用户账户页面 */}
      <Route path="account" element={<AccountLayout />}>
        <Route index element={<AccountDashboard />} />
        <Route path="orders" element={<OrderHistory />} />
        <Route path="orders/:id" element={<OrderDetail />} />
        <Route path="profile" element={<UserProfile />} />
      </Route>

      {/* 404页面 */}
      <Route path="*" element={<NotFound />} />
    </Routes>

  );
};

export default App;
