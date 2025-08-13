import React, { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from 'react';

// 定义Toast类型
type ToastType = 'success' | 'error' | 'info' | 'warning';

// 单个Toast的接口
interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number; // 显示时长(ms)，默认3000ms
}

// 上下文接口
interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

// 创建上下文，初始值为undefined
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// 生成唯一ID
const generateId = () => Math.random().toString(36).substring(2, 11);

// Toast提供者组件
export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // 添加Toast
  const showToast = useCallback((
    message: string, 
    type: ToastType = 'info', 
    duration = 3000
  ) => {
    const id = generateId();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  }, []);

  // 移除单个Toast
  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // 清除所有Toast
  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // 自动移除Toast
  useEffect(() => {
    if (toasts.length === 0) return;

    const timers = toasts.map(toast => {
      return setTimeout(() => {
        removeToast(toast.id);
      }, toast.duration);
    });

    // 清理函数
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [toasts, removeToast]);

  // 获取Toast样式
  const getToastStyles = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  // 获取Toast图标
  const getToastIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <i className="fa fa-check-circle text-green-500 mr-3 text-lg"></i>;
      case 'error':
        return <i className="fa fa-times-circle text-red-500 mr-3 text-lg"></i>;
      case 'warning':
        return <i className="fa fa-exclamation-triangle text-yellow-500 mr-3 text-lg"></i>;
      default:
        return <i className="fa fa-info-circle text-blue-500 mr-3 text-lg"></i>;
    }
  };

  return (
    <ToastContext.Provider value={{
      toasts,
      showToast,
      removeToast,
      clearAllToasts
    }}>
      {children}
      
      {/* Toast容器 - 固定在右下角 */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 w-full max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              p-4 rounded-lg border shadow-lg flex items-start
              ${getToastStyles(toast.type)}
              animate-in slide-in-from-right-5 fade-in duration-300
              hover:shadow-xl transition-all duration-200
            `}
            role="alert"
          >
            {getToastIcon(toast.type)}
            <p className="flex-grow text-sm md:text-base">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close notification"
            >
              <i className="fa fa-times"></i>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// 自定义Hook，确保在ToastProvider中使用
export const useToast = () => {
  const context = useContext(ToastContext);
  
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context;
};
