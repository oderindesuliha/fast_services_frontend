import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';
import { FiLogIn, FiUserPlus, FiLogOut, FiLayout } from 'react-icons/fi';
import { LOGO_SRC } from '../constants';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If the user navigated to Home from their dashboard, show Home as if unauthenticated
  // (hide Dashboard/Logout on the Home view). This uses the navigation state we set when
  // directing authenticated users to Home so Home can offer a "back to dashboard" flow.
  const hideAuthOnHome = location.pathname === '/' && !!location.state?.from?.pathname;

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const getDashboardPath = () => {
    switch(user?.role) {
      case UserRole.SUPER_ADMIN: return '/admin';
      case UserRole.ORG_ADMIN: return '/organization';
      case UserRole.CUSTOMER: return '/customer';
      default: return '/';
    }
  }

  return (
    <header className="bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" state={isAuthenticated ? { from: { pathname: getDashboardPath(), search: '' } } : undefined} className="flex items-center">
              <img src={LOGO_SRC} alt="FastServices Logo" className="h-16 w-auto" />
            </Link>
          </div>
          <nav className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className="text-white hover:text-blue-500 transition-colors">Home</Link>
            <Link to="/organizations" className="text-white hover:text-blue-500 transition-colors">Browse Organizations</Link>
          </nav>
          <div className="flex items-center space-x-4">
            {isAuthenticated && !hideAuthOnHome ? (
              <>
                <Link to={getDashboardPath()} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm font-medium">
                  <FiLayout />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-sm font-medium"
                >
                  <FiLogOut />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-2 text-white hover:text-blue-500 transition-colors">
                  <FiLogIn />
                  Login
                </Link>
                <Link to="/register" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                  <FiUserPlus />
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
