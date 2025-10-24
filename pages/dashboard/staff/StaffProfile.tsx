import React from 'react';
import { useAuth } from '../../../hooks/useAuth';

const StaffProfile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Staff Profile</h1>
      {user && (
        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
              <p className="mt-1 p-2 bg-white dark:bg-gray-600 rounded">{user.firstName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
              <p className="mt-1 p-2 bg-white dark:bg-gray-600 rounded">{user.lastName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <p className="mt-1 p-2 bg-white dark:bg-gray-600 rounded">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
              <p className="mt-1 p-2 bg-white dark:bg-gray-600 rounded">{user.phone}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffProfile;