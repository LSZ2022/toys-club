import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/Toast';
import type { User, Address } from '../../types/user';
import { useAuth } from '@/contexts/AuthContext';

// 地址表单初始值
const initialAddress: Omit<Address, 'id'> = {
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    isDefault: false,
    type: 'shipping',
    fullName: '',
    name: undefined
};

const UserProfile: React.FC = () => {
  const { user, updateUser, updateAddress, addAddress, deleteAddress } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  // 状态管理
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<User>({...user});
  const [addresses, setAddresses] = useState<Address[]>(user?.addresses || []);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id'>>(initialAddress);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 处理用户信息变更
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  // 处理地址信息变更
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };

  // 保存用户信息
  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);
      await updateUser(userData);
      setIsEditing(false);
      showToast('Profile updated successfully', 'success');
    } catch (error) {
      console.error('Failed to update profile:', error);
      showToast('Failed to update profile', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // 保存新地址
  const handleSaveAddress = async () => {
    try {
      setIsLoading(true);
      const requiredFields = ['name', 'street', 'city', 'zipCode', 'phone'];
      const hasEmptyField = requiredFields.some(field => !newAddress[field as keyof Omit<Address, 'id'>]);
      
      if (hasEmptyField) {
        showToast('Please fill in all required fields', 'warning');
        return;
      }

      const savedAddress = await addAddress(newAddress);
      setAddresses(prev => [...prev, savedAddress]);
      setNewAddress(initialAddress);
      setShowAddressForm(false);
      showToast('Address added successfully', 'success');
    } catch (error) {
      console.error('Failed to add address:', error);
      showToast('Failed to add address', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // 设置默认地址
  const handleSetDefaultAddress = async (addressId: string) => {
    try {
      setIsLoading(true);
      // 更新所有地址的默认状态
      const updatedAddresses = addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
      }));
      
      await Promise.all(
        updatedAddresses.map(addr => updateAddress(addr.id, { isDefault: addr.isDefault }))
      );
      
      setAddresses(updatedAddresses);
      showToast('Default address updated', 'success');
    } catch (error) {
      console.error('Failed to update default address:', error);
      showToast('Failed to update default address', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // 删除地址
  const handleDeleteAddress = async (addressId: string) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;
    
    try {
      setIsLoading(true);
      await deleteAddress(addressId);
      setAddresses(prev => prev.filter(addr => addr.id !== addressId));
      showToast('Address deleted', 'info');
    } catch (error) {
      console.error('Failed to delete address:', error);
      showToast('Failed to delete address', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // 退出登录
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('authToken');
      navigate('/login');
      showToast('Logged out successfully', 'info');
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-600 mb-6">Please log in to view your profile</p>
        <button 
          onClick={() => navigate('/login')}
          className="btn-primary"
        >
          Log In
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 个人信息卡片 */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            {isEditing ? (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-70"
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="text-primary hover:text-primary/80 font-medium"
              >
                Edit Profile
              </button>
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-md ${
                  isEditing ? 'focus:ring-2 focus:ring-primary focus:border-primary' : 'bg-gray-50 cursor-not-allowed'
                }`}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                disabled={true} // 通常不允许直接编辑邮箱
                className="w-full px-4 py-2 border rounded-md bg-gray-50 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Email address cannot be changed</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={userData.phone || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-md ${
                  isEditing ? 'focus:ring-2 focus:ring-primary focus:border-primary' : 'bg-gray-50 cursor-not-allowed'
                }`}
                placeholder="Your phone number"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={userData.dateOfBirth || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-md ${
                  isEditing ? 'focus:ring-2 focus:ring-primary focus:border-primary' : 'bg-gray-50 cursor-not-allowed'
                }`}
              />
            </div>
          </div>
        </div>
        
        {/* 账户操作侧边栏 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Account Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/orders')}
                className="w-full flex items-center justify-between text-left px-4 py-3 border rounded-md hover:bg-gray-50"
              >
                <span>Order History</span>
                <i className="fa fa-arrow-right text-gray-400"></i>
              </button>
              
              <button
                onClick={() => navigate('/wishlist')}
                className="w-full flex items-center justify-between text-left px-4 py-3 border rounded-md hover:bg-gray-50"
              >
                <span>My Wishlist</span>
                <i className="fa fa-arrow-right text-gray-400"></i>
              </button>
              
              <button
                onClick={() => navigate('/password-reset')}
                className="w-full flex items-center justify-between text-left px-4 py-3 border rounded-md hover:bg-gray-50"
              >
                <span>Change Password</span>
                <i className="fa fa-arrow-right text-gray-400"></i>
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between text-left px-4 py-3 border border-red-200 text-red-600 rounded-md hover:bg-red-50"
              >
                <span>Log Out</span>
                <i className="fa fa-sign-out text-red-400"></i>
              </button>
            </div>
          </div>
        </div>
        
        {/* 地址管理 */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Saved Addresses</h2>
            {showAddressForm ? (
              <button
                onClick={() => {
                  setShowAddressForm(false);
                  setNewAddress(initialAddress);
                }}
                className="text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={() => setShowAddressForm(true)}
                className="text-primary hover:text-primary/80 font-medium"
              >
                Add New Address
              </button>
            )}
          </div>
          
          {showAddressForm ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg mb-6">
              <h3 className="md:col-span-2 text-lg font-medium mb-4">Add New Address</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={newAddress.name}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Recipient's name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={newAddress.phone}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="For delivery updates"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                <input
                  type="text"
                  name="street"
                  value={newAddress.street}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="House number and street"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  value={newAddress.city}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                <input
                  type="text"
                  name="state"
                  value={newAddress.state}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code *</label>
                <input
                  type="text"
                  name="zipCode"
                  value={newAddress.zipCode}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <select
                  name="country"
                  value={newAddress.country}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="CN">China</option>
                </select>
              </div>
              
              <div className="md:col-span-2 flex items-center">
                <input
                  type="checkbox"
                  id="isDefault"
                  name="isDefault"
                  checked={newAddress.isDefault}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, isDefault: e.target.checked }))}
                  className="mr-2"
                />
                <label htmlFor="isDefault" className="text-sm text-gray-700">
                  Set as default shipping address
                </label>
              </div>
              
              <div className="md:col-span-2 flex justify-end">
                <button
                  onClick={handleSaveAddress}
                  disabled={isLoading}
                  className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-70"
                >
                  {isLoading ? 'Saving...' : 'Save Address'}
                </button>
              </div>
            </div>
          ) : null}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.length === 0 ? (
              <div className="md:col-span-2 text-center p-8 border border-dashed rounded-lg">
                <p className="text-gray-500 mb-4">You don't have any saved addresses</p>
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Add Your First Address
                </button>
              </div>
            ) : (
              addresses.map(address => (
                <div 
                  key={address.id} 
                  className="p-4 border rounded-lg relative"
                >
                  {address.isDefault && (
                    <span className="absolute top-3 right-3 bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                  
                  <h3 className="font-medium mb-2">{address.name}</h3>
                  <p className="text-gray-600 text-sm mb-1">{address.street}</p>
                  <p className="text-gray-600 text-sm mb-1">
                    {address.city}{address.state ? `, ${address.state}` : ''} {address.zipCode}
                  </p>
                  <p className="text-gray-600 text-sm mb-1">{address.country}</p>
                  <p className="text-gray-600 text-sm mb-4">{address.phone}</p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSetDefaultAddress(address.id)}
                      disabled={address.isDefault || isLoading}
                      className="text-sm px-3 py-1 border rounded-md hover:bg-gray-50 disabled:opacity-50"
                    >
                      {address.isDefault ? 'Default' : 'Set as Default'}
                    </button>
                    
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      disabled={isLoading}
                      className="text-sm px-3 py-1 border border-red-200 text-red-600 rounded-md hover:bg-red-50 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
