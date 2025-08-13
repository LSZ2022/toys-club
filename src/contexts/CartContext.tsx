import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product } from '../types/product';
import { useToast } from '@/components/ui/Toast';

// 定义购物车商品类型
interface CartItem {
  product: Product;
  quantity: number;
}

// 定义购物车上下文类型
interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalAmount: number;
}

// 创建上下文
export const CartContext = createContext<CartContextType | undefined>(undefined);

// 购物车提供者组件
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { showToast } = useToast();

  // 从本地存储加载购物车
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, []);

  // 保存购物车到本地存储
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // 添加商品到购物车
  const addItem = (product: Product, quantity = 1) => {
    setItems(prevItems => {
      // 检查商品是否已在购物车中
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // 如果已存在，更新数量
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // 如果不存在，添加新商品
        showToast(`${product.name} 已添加到购物车`, 'success');
        return [...prevItems, { product, quantity }];
      }
    });
  };

  // 从购物车移除商品
  const removeItem = (productId: string) => {
    const itemToRemove = items.find(item => item.product.id === productId);
    if (itemToRemove) {
      showToast(`${itemToRemove.product.name} 已从购物车移除`, 'info');
    }
    
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  // 更新商品数量
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }

    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  // 清空购物车
  const clearCart = () => {
    setItems([]);
    showToast('购物车已清空', 'info');
  };

  // 计算商品总数
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  // 计算总金额
  const totalAmount = items.reduce(
    (total, item) => total + item.product.price.current * item.quantity, 
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        totalAmount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 自定义钩子，方便使用购物车上下文
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
