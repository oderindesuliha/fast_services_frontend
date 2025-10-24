import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types';
import { LOGO_SRC } from '../../constants';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    organizationName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: UserRole.CUSTOMER,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    setFormData({ ...formData, [name]: value });
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
      // Build user data with selected role. If registering an organization, map organizationName -> firstName
      const userData = {
        ...formData,
        firstName: formData.role === UserRole.ORG_ADMIN ? formData.organizationName : formData.firstName,
        lastName: formData.role === UserRole.ORG_ADMIN ? 'Organization' : formData.lastName,
        role: formData.role || UserRole.CUSTOMER,
      };

      await register(userData);
      // After successful registration, redirect based on role
              if (userData.role === UserRole.ORG_ADMIN) {
                navigate('/organization/offerings');
              } else {
                navigate('/customer');
              }
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Please try again.');
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
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
              Sign in
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.role === UserRole.ORG_ADMIN ? (
              <input
                name="organizationName"
                type="text"
                required
                placeholder="Organization Name"
                value={formData.organizationName}
                onChange={handleChange}
                className={inputClasses}
              />
            ) : (
              <>
                <input name="firstName" type="text" required placeholder="First Name" value={formData.firstName} onChange={handleChange} className={inputClasses} />
                <input name="lastName" type="text" required placeholder="Last Name" value={formData.lastName} onChange={handleChange} className={inputClasses} />
              </>
            )}
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Register as</label>
                    <select name="role" value={formData.role} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <option value={UserRole.CUSTOMER}>Customer</option>
                      <option value={UserRole.ORG_ADMIN}>Organization</option>
                    </select>
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
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;