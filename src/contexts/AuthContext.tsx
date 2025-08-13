import React, { createContext, useState, useEffect, useContext, type ReactNode } from 'react';

// 定义用户类型
export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

// 定义认证上下文类型
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

// 创建上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 认证提供者组件
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 初始化 - 从localStorage加载用户
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // 登录功能
  const login = async (email: string, password: string): Promise<boolean> => {
    // 模拟API调用
    setLoading(true);
    try {
      // 在实际应用中，这里会调用后端API进行验证
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 模拟成功登录 - 在实际应用中使用API返回的数据
      const mockUser: User = {
        id: '1',
        name: 'May Fung',
        email: email,
        isAdmin: email === 'admin@example.com'
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 注册功能
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // 模拟API调用
    setLoading(true);
    try {
      // 在实际应用中，这里会调用后端API进行注册
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟成功注册并自动登录
      const newUser: User = {
        id: '2',
        name: name,
        email: email
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration failed', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 登出功能
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 自定义钩子，用于在组件中使用认证上下文
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
