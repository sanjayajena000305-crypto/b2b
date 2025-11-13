
import React from 'react';
import { CompanyProfile, User } from '../types';
import { ShoppingCartIcon, UserIcon } from './icons';

interface HeaderProps {
  companyProfile: CompanyProfile;
  currentUser: User | null;
  cartCount: number;
  onNavigate: (view: string) => void;
  onLoginClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ companyProfile, currentUser, cartCount, onNavigate, onLoginClick, onLogout }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => onNavigate('home')} className="text-2xl font-bold text-primary">
              {companyProfile.name}
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('checkout')}
              className="relative p-2 rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            {currentUser ? (
              <div className="relative group">
                <button className="flex items-center p-2 rounded-full text-slate-600 hover:bg-slate-100">
                  <UserIcon className="h-6 w-6" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible">
                  <div className="px-4 py-2 text-sm text-slate-700 border-b">
                    Signed in as <br /> <span className="font-semibold">{currentUser.mobile}</span>
                  </div>
                   {currentUser.role === 'admin' && (
                    <button onClick={() => onNavigate('admin')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                      Admin Panel
                    </button>
                  )}
                  <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors text-sm font-medium"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
