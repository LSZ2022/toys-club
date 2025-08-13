import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-display font-bold mb-4">Toys<span className="text-primary">Club</span></h3>
            <p className="text-gray-400 mb-4">Providing high-quality toys and games for children of all ages. Safe, durable, and fun products you can trust.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Facebook">
                <i className="fa fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Instagram">
                <i className="fa fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Twitter">
                <i className="fa fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="YouTube">
                <i className="fa fa-youtube-play"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-400 hover:text-primary transition-colors">All Products</Link></li>
              <li><Link to="/products?new-arrivals=true" className="text-gray-400 hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link to="/products?bestseller=true" className="text-gray-400 hover:text-primary transition-colors">Best Sellers</Link></li>
              <li><Link to="/products?sale=true" className="text-gray-400 hover:text-primary transition-colors">Sale Items</Link></li>
              <li><Link to="/gift-cards" className="text-gray-400 hover:text-primary transition-colors">Gift Cards</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Help</h4>
            <ul className="space-y-2">
              <li><Link to="/shipping" className="text-gray-400 hover:text-primary transition-colors">Shipping Information</Link></li>
              <li><Link to="/returns" className="text-gray-400 hover:text-primary transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/track-order" className="text-gray-400 hover:text-primary transition-colors">Track Your Order</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fa fa-map-marker text-primary mt-1 mr-3"></i>
                <span className="text-gray-400">9th Floor, South China Building, 1-3 Wyndham Street, Central, Hong Kong</span>
              </li>
              <li className="flex items-center">
                <i className="fa fa-phone text-primary mr-3"></i>
                <span className="text-gray-400">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <i className="fa fa-envelope text-primary mr-3"></i>
                <span className="text-gray-400">info@toysclub.com</span>
              </li>
              <li className="flex items-center">
                <i className="fa fa-clock-o text-primary mr-3"></i>
                <span className="text-gray-400">Mon-Fri: 9AM-5PM EST</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} ToysClub. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-500 hover:text-primary text-sm transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-500 hover:text-primary text-sm transition-colors">Terms of Service</Link>
              <Link to="/accessibility" className="text-gray-500 hover:text-primary text-sm transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
