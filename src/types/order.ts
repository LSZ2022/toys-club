import type { Address } from './user';

export interface OrderItem {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
  };
  quantity: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderSummary {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: number;
  total: number;
}

export interface CheckoutData {
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  saveInfo: boolean;
  notes?: string;
}
