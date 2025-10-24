import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FiUsers, FiBriefcase, FiBarChart2, FiMenu, FiX, FiCalendar } from 'react-icons/fi';
import BackToHomeButton from '../../../components/BackToHomeButton';
import PageTransition from '../../../components/PageTransition';

const AdminDashboard: React.FC = () => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    useEffect(() => {
        // Close sidebar on route change on mobile
        setIsSidebarOpen(false);
    }, [location.pathname]);

    const navItems = [
        { path: '/admin/stats', icon: <FiBarChart2 />, label: 'Statistics' },
        { path: '/admin/users', icon: <FiUsers />, label: 'Users' },
        { path: '/admin/organizations', icon: <FiBriefcase />, label: 'Organizations' },
        { path: '/admin/appointments', icon: <FiCalendar />, label: 'Appointments' },
    ];

    const isActive = (path: string) => location.pathname.startsWith(path);

    return (
        <div className="flex min-h-[calc(100vh-4rem)] bg-gray-100 dark:bg-gray-900">
            {/* Sidebar Overlay for mobile */}
            {isSidebarOpen && <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20" onClick={() => setIsSidebarOpen(false)}></div>}
            
            {/* Sidebar */}
            <aside className={`fixed md:relative inset-y-0 left-0 w-64 bg-gray-800 dark:bg-gray-900 text-white flex-shrink-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-30`}>
                <div className="p-4 flex justify-between items-center md:block">
                    <h2 className="text-xl font-bold">Admin Panel</h2>
                    <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
                        <FiX size={24} />
                    </button>
                </div>
                <nav>
                    <ul>
                        {navItems.map(item => (
                             <li key={item.path}>
                                <Link 
                                    to={item.path} 
                                    className={`flex items-center p-4 text-sm hover:bg-gray-700 dark:hover:bg-gray-700 ${isActive(item.path) ? 'bg-gray-900 dark:bg-gray-800' : ''}`}
                                >
                                    <span className="mr-3">{item.icon}</span>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            
            <div className="flex-1 flex flex-col">
                {/* Mobile Header */}
                <header className="md:hidden bg-white dark:bg-gray-800 shadow-md flex justify-start items-center p-4 sticky top-16 z-10">
                     <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-600 dark:text-gray-300">
                         <FiMenu size={24} />
                     </button>
                </header>

                <main className="flex-1 p-6 relative">
                    <div className="flex justify-between items-center mb-6">
                        <BackToHomeButton />
                    </div>
                    <PageTransition>
                        <Outlet />
                    </PageTransition>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;