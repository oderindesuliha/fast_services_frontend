import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrganizationFormModal from '../../components/OrganizationFormModal';
import { useAuth } from '../../hooks/useAuth';

const OrganizationRegistrationPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (formData: any) => {
    try {
      // TODO: Implement organization registration API call
      // const response = await api.registerOrganization(formData);
      
      // After successful registration, redirect to login
      // or if user is already logged in, to their dashboard
      if (user) {
        navigate('/organization/profile');
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Failed to register organization:', error);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <OrganizationFormModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        title="Register Your Organization"
        submitLabel="Register"
      />
    </div>
  );
};

export default OrganizationRegistrationPage;