import React, { createContext, useContext, useState, type ReactNode } from 'react';

// 定义提示信息类型
interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

// 定义上下文类型 - 修复：移除接口中函数参数的默认值
interface ToastContextType {
  // 原错误写法：showToast: (message: string, type: 'success' | 'error' | 'info' = 'info') => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void; // 修正：用?表示可选参数
  toasts: Toast[];
  removeToast: (id: string) => void;
}

// 创建上下文
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// 生成唯一ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// 提供者组件
export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // 添加提示 - 在函数实现中设置默认值（正确位置）
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = generateId();
    setToasts(prev => [...prev, { id, message, type }]);
    
    // 3秒后自动移除
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  // 移除提示
  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, toasts, removeToast }}>
      {children}
      {/* 提示组件渲染 */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className={`px-4 py-3 rounded-md shadow-lg flex items-center ${
              toast.type === 'success' ? 'bg-green-50 text-green-800' :
              toast.type === 'error' ? 'bg-red-50 text-red-800' :
              'bg-blue-50 text-blue-800'
            }`}
          >
            {toast.type === 'success' && <i className="fa fa-check-circle mr-2"></i>}
            {toast.type === 'error' && <i className="fa fa-times-circle mr-2"></i>}
            {toast.type === 'info' && <i className="fa fa-info-circle mr-2"></i>}
            <span>{toast.message}</span>
            <button 
              onClick={() => removeToast(toast.id)}
              className="ml-4 text-gray-500 hover:text-gray-700"
            >
              <i className="fa fa-close"></i>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// 自定义钩子，方便使用
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
    