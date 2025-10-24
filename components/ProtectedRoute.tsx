import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Spinner from './Spinner';
import { Role } from '../context/AuthContext';

interface ProtectedRouteProps {
  allowedRoles: Role[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, role, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (role && !allowedRoles.includes(role)) {
    // If not authorized and trying to access dashboard, redirect to home
    if (location.pathname.includes('/admin') || 
        location.pathname.includes('/organization') || 
        location.pathname.includes('/staff') || 
        location.pathname.includes('/customer')) {
      return <Navigate to="/" replace />;
    }
    // For other unauthorized access, go to their appropriate dashboard
    switch (role) {
      case Role.SUPER_ADMIN:
        return <Navigate to="/admin" replace />;
      case Role.ORG_ADMIN:
        return <Navigate to="/organization" replace />;
      case Role.STAFF:
        return <Navigate to="/staff" replace />;
      default:
        return <Navigate to="/customer" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;