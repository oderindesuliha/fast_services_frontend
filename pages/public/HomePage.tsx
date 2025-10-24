import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiUsers, FiBriefcase, FiCalendar } from 'react-icons/fi';
import BackButton from '../../components/BackButton';
import {LOGO_SRC} from "@/constants.ts";

const StatCard: React.FC<{ icon: React.ReactNode; value: string; label: string }> = ({ icon, value, label }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex items-center space-x-4">
        <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
            <p className="text-gray-500 dark:text-gray-400">{label}</p>
        </div>
    </div>
);

const HomePage: React.FC = () => {
  const location = useLocation();

  return (
    <div className="space-y-16">
      
      {/* Hero Section */}
      <section className="text-center bg-gray-100 dark:bg-gray-800 rounded-lg p-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
          Streamline Your Services, Eliminate the Wait.
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
          FastServices is the ultimate queue management solution that connects customers with organizations for seamless appointment booking and service delivery.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/register"
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Get Started
          </Link>
          <Link
            to="/organizations"
            className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105"
          >
            Browse Organizations
          </Link>
        </div>
      </section>

      {/* Statistics Section */}
      <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard icon={<FiBriefcase size={24} />} value="50+" label="Organizations" />
              <StatCard icon={<FiUsers size={24} />} value="10,000+" label="Happy Users" />
              <StatCard icon={<FiCalendar size={24} />} value="50,000+" label="Appointments Booked" />
          </div>
      </section>

      {/* Features Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Why Choose FastServices?</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">Powerful features designed for efficiency and convenience for everyone involved.</p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="font-bold text-xl text-blue-600 dark:text-blue-400">For Customers</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Effortlessly find services, book appointments from anywhere, and get real-time queue updates to save valuable time.</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="font-bold text-xl text-green-600 dark:text-green-400">For Organizations</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Manage your offerings, queues, and appointments with a powerful dashboard. Reduce wait times and improve customer satisfaction.</p>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
        <section className="bg-gray-100 dark:bg-gray-800 rounded-lg p-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">What Our Users Say</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                    <p className="text-gray-600 dark:text-gray-300 italic">"FastServices transformed how we manage appointments. Our customer satisfaction has skyrocketed!"</p>
                    <p className="mt-4 font-semibold text-right dark:text-gray-200">- Folake Adekunle, Clinic Manager</p>
                </div>
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                    <p className="text-gray-600 dark:text-gray-300 italic">"Booking an appointment has never been easier. I love that I can see my queue position in real-time."</p>
                    <p className="mt-4 font-semibold text-right dark:text-gray-200">- David Okon, Customer</p>
                </div>
            </div>
        </section>
    </div>
  );
};




export default HomePage;

































