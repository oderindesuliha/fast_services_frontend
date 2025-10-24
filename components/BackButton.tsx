import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

interface BackButtonProps {
  fallbackPath?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ fallbackPath = '/organizations', className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.state?.from?.pathname) {
      navigate(location.state.from.pathname + location.state.from.search);
    } else {
      navigate(fallbackPath);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-semibold ${className}`}
    >
      <FiArrowLeft /> Back
    </button>
  );
};

export default BackButton;
