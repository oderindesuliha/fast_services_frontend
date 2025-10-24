import React from 'react';
import { FiUsers, FiBriefcase, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import BarChart from '../../../components/BarChart';
import { UserRole, AppointmentStatus } from '../../../types';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
        <div className={`p-3 rounded-full mr-4 ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{value}</p>
        </div>
    </div>
);


const SystemStats: React.FC = () => {
    const usersByRoleData = {
        labels: ['CUSTOMER', 'ORGANIZATION', 'ADMIN'],
        values: [25000, 450, 15],
        colors: ['#3b82f6', '#10b981', '#ef4444']
    };

    const appointmentsByStatusData = {
        labels: ['COMPLETED', 'SCHEDULED', 'IN_PROGRESS', 'CANCELLED'],
        values: [125000, 15000, 1200, 3500],
        colors: ['#10b981', '#3b82f6', '#f59e0b', '#6b7280']
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">System Statistics</h1>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Users" value="25,465" icon={<FiUsers className="text-white" size={24}/>} color="bg-blue-500" />
                <StatCard title="Total Organizations" value="465" icon={<FiBriefcase className="text-white" size={24}/>} color="bg-green-500" />
                <StatCard title="Appointments This Month" value="15,000" icon={<FiCalendar className="text-white" size={24}/>} color="bg-yellow-500" />
                <StatCard title="Completed Appointments" value="125,000" icon={<FiCheckCircle className="text-white" size={24}/>} color="bg-purple-500" />
            </div>

            {/* Charts and Visualizations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="font-semibold text-lg mb-4">Users by Role</h3>
                    <BarChart data={usersByRoleData} />
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="font-semibold text-lg mb-4">Appointments by Status</h3>
                    <BarChart data={appointmentsByStatusData} />
                </div>
            </div>
        </div>
    );
};

export default SystemStats;