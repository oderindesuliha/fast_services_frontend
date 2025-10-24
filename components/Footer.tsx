import React from 'react';
import { LOGO_SRC } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
        <img src={LOGO_SRC} alt="FastServices Logo" className="h-10 mx-auto mb-4" />
        <p>&copy; {new Date().getFullYear()} FastServices. All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-1">Smart Management System</p>
      </div>
    </footer>
  );
};

export default Footer;