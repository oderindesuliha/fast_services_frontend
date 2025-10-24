import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

const BackToHomeButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  const getDashboardPath = () => {
    switch (user?.role) {
      case 'SUPER_ADMIN':
        return '/admin';
      case 'ORG_ADMIN':
        return '/organization';
      case 'STAFF':
        return '/staff';
      case 'CUSTOMER':
        return '/customer';
      default:
        return '/';
    }
  };

  return (
    <button
      onClick={() => navigate('/', { replace: true, state: { from: { pathname: isAuthenticated ? getDashboardPath() : location.pathname, search: location.search } } })}
      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
      aria-label="Back to Home"
    >
  <FiHome size={20} />
      <span>Back to Home</span>
    </button>
  );
};

export default BackToHomeButton;