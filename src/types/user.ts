export interface User {
  dateOfBirth: string;
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  addresses?: Address[];
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  name: ReactNode;
  id: string;
  type: 'shipping' | 'billing';
  isDefault: boolean;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  confirmPassword: string;
}
