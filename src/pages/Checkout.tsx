import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/Toast';

// 模拟用户地址数据
const mockAddresses = {
  shipping: {
    name: 'May Fung',
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
    country: 'United States'
  },
  billing: {
    name: 'May Fung',
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
    country: 'United States'
  }
};

// 定义地址表单类型
interface AddressFormData {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

const Checkout: React.FC = () => {
  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState<AddressFormData>(mockAddresses.shipping);
  const [billingAddress, setBillingAddress] = useState<AddressFormData>(mockAddresses.billing);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [saveInfo, setSaveInfo] = useState(true);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { items, totalAmount, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // 当勾选"与配送地址相同"时同步地址
  React.useEffect(() => {
    if (sameAsShipping) {
      setBillingAddress(shippingAddress);
    }
  }, [sameAsShipping, shippingAddress]);

  // 处理配送地址变更
  const handleShippingAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
    
    // 如果勾选了相同地址，同步更新账单地址
    if (sameAsShipping) {
      setBillingAddress(prev => ({ ...prev, [name]: value }));
    }
  };

  // 处理账单地址变更
  const handleBillingAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingAddress(prev => ({ ...prev, [name]: value }));
  };

  // 验证地址表单
  const validateAddress = (address: AddressFormData): boolean => {
    return !!address.name && 
           !!address.street && 
           !!address.city && 
           !!address.state && 
           !!address.zip && 
           !!address.country;
  };

  // 处理下一步
  const handleNext = () => {
    if (step === 1) {
      // 验证配送地址
      if (!validateAddress(shippingAddress)) {
        showToast('Please fill in all shipping address fields', 'error');
        return;
      }
      
      // 如果不使用相同地址，验证账单地址
      if (!sameAsShipping && !validateAddress(billingAddress)) {
        showToast('Please fill in all billing address fields', 'error');
        return;
      }
    }
    
    setStep(prev => prev + 1);
  };

  // 处理上一步
  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  // 处理提交订单
  const handlePlaceOrder = async () => {
    setLoading(true);
    
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 在实际应用中，这里会调用API提交订单
      const orderId = 'ORD-' + Math.floor(Math.random() * 100000);
      
      // 清空购物车
      clearCart();
      
      // 显示成功提示并跳转到确认页面
      showToast('Order placed successfully!', 'success');
      navigate(`/checkout/confirmation/${orderId}`);
    } catch (error) {
      console.error('Failed to place order:', error);
      showToast('Failed to place order. Please try again.', 'error');
      setLoading(false);
    }
  };

  // 渲染地址表单
  const renderAddressForm = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Shipping Address</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={shippingAddress.name}
            onChange={handleShippingAddressChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={shippingAddress.country}
            onChange={handleShippingAddressChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
            Street Address
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={shippingAddress.street}
            onChange={handleShippingAddressChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={shippingAddress.city}
            onChange={handleShippingAddressChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
            State/Province
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={shippingAddress.state}
            onChange={handleShippingAddressChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div>
          <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
            ZIP/Postal Code
          </label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={shippingAddress.zip}
            onChange={handleShippingAddressChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            required
          />
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="same-as-shipping"
            checked={sameAsShipping}
            onChange={(e) => setSameAsShipping(e.target.checked)}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="same-as-shipping" className="ml-2 block text-sm text-gray-700">
            Billing address is the same as shipping address
          </label>
        </div>
      </div>

      {!sameAsShipping && (
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-xl font-bold mb-4">Billing Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="billing-name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="billing-name"
                name="name"
                value={billingAddress.name}
                onChange={handleBillingAddressChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="billing-country" className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                id="billing-country"
                name="country"
                value={billingAddress.country}
                onChange={handleBillingAddressChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="billing-street" className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                id="billing-street"
                name="street"
                value={billingAddress.street}
                onChange={handleBillingAddressChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="billing-city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                id="billing-city"
                name="city"
                value={billingAddress.city}
                onChange={handleBillingAddressChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="billing-state" className="block text-sm font-medium text-gray-700 mb-1">
                State/Province
              </label>
              <input
                type="text"
                id="billing-state"
                name="state"
                value={billingAddress.state}
                onChange={handleBillingAddressChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="billing-zip" className="block text-sm font-medium text-gray-700 mb-1">
                ZIP/Postal Code
              </label>
              <input
                type="text"
                id="billing-zip"
                name="zip"
                value={billingAddress.zip}
                onChange={handleBillingAddressChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                required
              />
            </div>
          </div>
        </div>
      )}

      <div className="mt-4">
        <label htmlFor="order-notes" className="block text-sm font-medium text-gray-700 mb-1">
          Order Notes (Optional)
        </label>
        <textarea
          id="order-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          placeholder="Special instructions for delivery"
        ></textarea>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleNext}
          className="btn-primary"
        >
          Continue to Shipping
          <i className="fa fa-arrow-right ml-2"></i>
        </button>
      </div>
    </div>
  );

  // 渲染配送方式表单
  const renderShippingForm = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Shipping Method</h3>
      
      <div className="space-y-3">
        <div className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
          <div className="flex items-start">
            <input
              type="radio"
              id="standard"
              name="shipping"
              defaultChecked
              className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300"
            />
            <div className="ml-3">
              <label htmlFor="standard" className="block text-sm font-medium text-gray-900">
                Standard Shipping
              </label>
              <p className="mt-1 text-sm text-gray-600">
                Delivery in 5-7 business days
              </p>
              <p className="mt-1 text-sm font-medium text-primary">
                $10.00
              </p>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
          <div className="flex items-start">
            <input
              type="radio"
              id="express"
              name="shipping"
              className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300"
            />
            <div className="ml-3">
              <label htmlFor="express" className="block text-sm font-medium text-gray-900">
                Express Shipping
              </label>
              <p className="mt-1 text-sm text-gray-600">
                Delivery in 2-3 business days
              </p>
              <p className="mt-1 text-sm font-medium text-primary">
                $20.00
              </p>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
          <div className="flex items-start">
            <input
              type="radio"
              id="overnight"
              name="shipping"
              className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300"
            />
            <div className="ml-3">
              <label htmlFor="overnight" className="block text-sm font-medium text-gray-900">
                Overnight Shipping
              </label>
              <p className="mt-1 text-sm text-gray-600">
                Delivery in 1 business day
              </p>
              <p className="mt-1 text-sm font-medium text-primary">
                $35.00
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="btn-secondary"
        >
          <i className="fa fa-arrow-left mr-2"></i>
          Back to Information
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="btn-primary"
        >
          Continue to Payment
          <i className="fa fa-arrow-right ml-2"></i>
        </button>
      </div>
    </div>
  );

  // 渲染支付方式表单
  const renderPaymentForm = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Payment Method</h3>
      
      <div className="space-y-3">
        <div 
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            paymentMethod === 'credit' ? 'border-primary bg-primary/5' : 'hover:border-primary'
          }`}
          onClick={() => setPaymentMethod('credit')}
        >
          <div className="flex items-start">
            <input
              type="radio"
              id="credit"
              name="payment"
              checked={paymentMethod === 'credit'}
              onChange={() => setPaymentMethod('credit')}
              className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300"
            />
            <div className="ml-3">
              <label htmlFor="credit" className="block text-sm font-medium text-gray-900">
                Credit / Debit Card
              </label>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="card-name" className="block text-xs font-medium text-gray-700 mb-1">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="card-name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm"
                    placeholder="May Fung"
                  />
                </div>
                <div>
                  <label htmlFor="card-number" className="block text-xs font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="card-number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div>
                  <label htmlFor="expiry" className="block text-xs font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label htmlFor="cvc" className="block text-xs font-medium text-gray-700 mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cvc"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div 
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : 'hover:border-primary'
          }`}
          onClick={() => setPaymentMethod('paypal')}
        >
          <div className="flex items-start">
            <input
              type="radio"
              id="paypal"
              name="payment"
              checked={paymentMethod === 'paypal'}
              onChange={() => setPaymentMethod('paypal')}
              className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300"
            />
            <div className="ml-3">
              <label htmlFor="paypal" className="block text-sm font-medium text-gray-900">
                PayPal
              </label>
              <p className="mt-1 text-sm text-gray-600">
                Pay with your PayPal account
              </p>
            </div>
          </div>
        </div>
        
        <div 
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            paymentMethod === 'apple' ? 'border-primary bg-primary/5' : 'hover:border-primary'
          }`}
          onClick={() => setPaymentMethod('apple')}
        >
          <div className="flex items-start">
            <input
              type="radio"
              id="apple"
              name="payment"
              checked={paymentMethod === 'apple'}
              onChange={() => setPaymentMethod('apple')}
              className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300"
            />
            <div className="ml-3">
              <label htmlFor="apple" className="block text-sm font-medium text-gray-900">
                Apple Pay
              </label>
              <p className="mt-1 text-sm text-gray-600">
                Pay with Apple Pay
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="save-info"
            checked={saveInfo}
            onChange={(e) => setSaveInfo(e.target.checked)}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="save-info" className="ml-2 block text-sm text-gray-700">
            Save this payment method for future orders
          </label>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="btn-secondary"
        >
          <i className="fa fa-arrow-left mr-2"></i>
          Back to Shipping
        </button>
        <button
          type="button"
          onClick={handlePlaceOrder}
          disabled={loading}
          className="btn-primary disabled:opacity-70"
        >
          {loading ? (
            <span className="flex items-center">
              <i className="fa fa-spinner fa-spin mr-2"></i> Processing...
            </span>
          ) : (
            <span className="flex items-center">
              Place Order
              <i className="fa fa-check ml-2"></i>
            </span>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {step === 1 && renderAddressForm()}
      {step === 2 && renderShippingForm()}
      {step === 3 && renderPaymentForm()}
    </div>
  );
};

export default Checkout;
