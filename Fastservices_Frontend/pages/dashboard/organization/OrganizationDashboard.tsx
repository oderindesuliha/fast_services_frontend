import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FiGrid, FiCalendar, FiDollarSign, FiUser } from 'react-icons/fi';
import BackButton from '../../../components/BackButton';

const OrganizationDashboard: React.FC = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname.startsWith(path);
    const navItems = [
        { path: '/organization/offerings', icon: <FiGrid />, label: 'Services' },
        { path: '/organization/appointments', icon: <FiCalendar />, label: 'Queue' },
        { path: '/organization/billing', icon: <FiDollarSign />, label: 'Billing' },
        { path: '/organization/profile', icon: <FiUser />, label: 'Profile' },
    ];
    return (
        <div className="flex min-h-[calc(100vh-4rem)] bg-gray-100 dark:bg-gray-900">
            <aside className="w-64 bg-gray-800 text-white p-4 hidden md:block">
                 <h2 className="text-xl font-bold mb-4">Org. Panel</h2>
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
                <div className="absolute top-0 left-0 z-10">
                    <BackButton />
                </div>
                <Outlet />
            </main>
        </div>
    );
};
export default OrganizationDashboard;
