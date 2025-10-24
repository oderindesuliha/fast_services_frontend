import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Role } from '../../context/AuthContext';
import { LOGO_SRC } from '../../constants';
import { UserRole } from '../../types';

const AdminRegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: UserRole.ORG_ADMIN, // Default to organization admin (safer than SUPER_ADMIN)
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  // Protect this page: only allow access to existing SUPER_ADMIN users
  const { isAuthenticated, role } = useAuth();

  useEffect(() => {
    // If user is not authenticated or not a super admin, redirect to login
    if (!isAuthenticated || role !== Role.SUPER_ADMIN) {
      navigate('/login');
    }
  }, [isAuthenticated, role, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      await register(formData);
      // After successful registration, redirect to login page
      navigate('/login');
    } catch (err: any) {
      console.error('Admin registration error:', err);
      setError(err.message || 'Admin registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white";

  return (
    <div className="flex items-center justify-center min-h-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
        <div>
          <img className="mx-auto h-24 w-auto" src={LOGO_SRC} alt="FastServices Logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Admin Registration (Development Only)
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            For testing purposes only. In production, admins are created internally.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="firstName" type="text" required placeholder="First Name" onChange={handleChange} className={inputClasses} />
              <input name="lastName" type="text" required placeholder="Last Name" onChange={handleChange} className={inputClasses} />
          </div>
           <input name="email" type="email" required placeholder="Email Address" onChange={handleChange} className={inputClasses} />
           <input name="phone" type="tel" required placeholder="Phone Number" onChange={handleChange} className={inputClasses} />
           <input name="password" type="password" required minLength={6} placeholder="Password" onChange={handleChange} className={inputClasses} />
           <input name="confirmPassword" type="password" required placeholder="Confirm Password" onChange={handleChange} className={inputClasses} />
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 dark:disabled:bg-blue-800"
            >
              {isLoading ? 'Creating account...' : 'Create Admin Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminRegisterPage;