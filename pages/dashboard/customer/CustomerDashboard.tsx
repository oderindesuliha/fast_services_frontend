import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import BackToHomeButton from '../../../components/BackToHomeButton';
import PageTransition from '../../../components/PageTransition';
import { motion } from 'framer-motion';

const CustomerDashboard: React.FC = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname.startsWith(path);
    const navItems = [
        { path: '/customer/upcoming', icon: <FiCalendar />, label: 'Upcoming' },
        { path: '/customer/history', icon: <FiClock />, label: 'History' },
        { path: '/customer/profile', icon: <FiUser />, label: 'Profile' },
    ];
    return (
        <div className="flex min-h-[calc(100vh-4rem)] bg-gray-100 dark:bg-gray-900">
            <aside className="w-64 bg-gray-800 text-white p-4 hidden md:block">
                <h2 className="text-xl font-bold mb-4">My Dashboard</h2>
                <nav>
                    <ul>
                        {navItems.map(item => (
                             <li key={item.path}>
                                <Link 
                                    to={item.path} 
                                    className={`flex items-center p-2 text-sm rounded-md hover:bg-gray-700 ${isActive(item.path) ? 'bg-gray-900' : ''}`}
                                >
                                    <span className="mr-3">{item.icon}</span>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 p-6 relative">
                <div className="mb-6">
                    <BackToHomeButton />
                </div>
                <motion.div
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
    );
};
export default CustomerDashboard;
