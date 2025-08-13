import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/Toast';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});
  const { showToast } = useToast();
  const navigate = useNavigate();

  // 表单验证
  const validateForm = (): boolean => {
    const newErrors: { email?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      
      // 模拟API请求 - 实际项目中替换为真实的密码重置请求
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 显示成功提示
      showToast(
        'Password reset link has been sent to your email', 
        'success', 
        5000
      );
      
      // 3秒后跳转到登录页
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (error) {
      showToast(
        'Failed to send reset link. Please try again later.', 
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* 背景图 */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/public/auth-background.png)', // 假设背景图放在public/images目录
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* 半透明遮罩增强文字可读性 */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
      
      {/* 表单卡片 */}
      <div className="relative z-20 w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
            <p className="text-gray-600">
              Enter your email and we'll send you a link to reset your password
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.email 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-primary focus:border-primary'
                }`}
                placeholder="your.email@example.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></div>
                  Sending...
                </div>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link 
              to="/login" 
              className="text-primary hover:text-primary/80 font-medium text-sm hover:underline"
            >
              Remember your password? Sign in
            </Link>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-primary hover:text-primary/80 font-medium hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
    