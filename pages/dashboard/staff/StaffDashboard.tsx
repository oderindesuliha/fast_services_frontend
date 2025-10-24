import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BackToHomeButton from '../../../components/BackToHomeButton';
import PageTransition from '../../../components/PageTransition';
import { motion } from 'framer-motion';

const StaffDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header onLogout={logout} user={user} />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <nav className="w-64 bg-white dark:bg-gray-800 shadow-md p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/staff" 
                className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Queue Management
              </Link>
            </li>
            <li>
              <Link 
                to="/staff/profile" 
                className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                My Profile
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <BackToHomeButton />
          </div>
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PageTransition>
              <Outlet />
            </PageTransition>
          </motion.div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default StaffDashboard;