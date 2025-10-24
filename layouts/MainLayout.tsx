
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout: React.FC = () => {
  const location = useLocation();

  // Hide header/footer on login and signup pages for a cleaner auth experience
  const hideShell = location.pathname.startsWith('/login') || location.pathname.startsWith('/register');

  return (
    <div className="flex flex-col min-h-screen">
      {!hideShell && <Header />}
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
      {!hideShell && <Footer />}
    </div>
  );
};

export default MainLayout;
