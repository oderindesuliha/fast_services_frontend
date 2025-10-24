import React, { useState, useEffect } from 'react';
import { Appointment, AppointmentStatus, UserRole } from '../../../types';
import Spinner from '../../../components/Spinner';

const mockAppointments: Appointment[] = [
    { 
        id: 'apt1', 
        userId: '3', 
        offeringId: 'o1', 
        queueId: 'q1', 
        appointmentDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), 
        status: AppointmentStatus.SCHEDULED,
        user: { id: '3', firstName: 'Ngozi', lastName: 'Nwosu', email: 'customer1@fastservices.ng', role: UserRole.CUSTOMER } as any,
        offering: { id: 'o1', name: 'General Consultation', organization: { id: '1', name: 'City General Hospital' } } as any,
    },
    { 
        id: 'apt2', 
        userId: '4', 
        offeringId: 'o3', 
        queueId: 'q2', 
        appointmentDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), 
        status: AppointmentStatus.COMPLETED,
    user: { id: '4', firstName: 'Chinedu', lastName: 'Okafor', email: 'customer2@fastservices.ng', role: UserRole.CUSTOMER } as any,
        offering: { id: 'o3', name: 'Drivers License Renewal', organization: { id: '2', name: 'Downtown DMV' } } as any,
    },
    { 
        id: 'apt3', 
        userId: '3', 
        offeringId: 'o2', 
        queueId: 'q1', 
        appointmentDate: new Date().toISOString(), 
        status: AppointmentStatus.IN_PROGRESS,
        user: { id: '3', firstName: 'Customer', lastName: 'One', email: 'customer1@example.com', role: UserRole.CUSTOMER } as any,
        offering: { id: 'o2', name: 'Emergency Services', organization: { id: '1', name: 'City General Hospital' } } as any,
    },
];

const ManageAppointments: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<AppointmentStatus | 'ALL'>('ALL');

    useEffect(() => {
        setTimeout(() => {
            setAppointments(mockAppointments);
            setIsLoading(false);
        }, 1000);
    }, []);

    const filteredAppointments = appointments.filter(apt => 
        filter === 'ALL' || apt.status === filter
    );

    const getStatusClass = (status: AppointmentStatus) => {
        switch (status) {
            case AppointmentStatus.SCHEDULED: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
            case AppointmentStatus.COMPLETED: return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
            case AppointmentStatus.CANCELLED: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
            case AppointmentStatus.IN_PROGRESS: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
            default: return '';
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manage Appointments</h1>
            <div className="mb-4">
                <select 
                    value={filter} 
                    onChange={e => setFilter(e.target.value as any)}
                    className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600"
                >
                    <option value="ALL">All Statuses</option>
                    {Object.values(AppointmentStatus).map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>
            {isLoading ? <Spinner /> : (
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Service</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Organization</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredAppointments.map(apt => (
                                <tr key={apt.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{apt.user?.firstName} {apt.user?.lastName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{apt.offering?.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{apt.offering?.organization?.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(apt.appointmentDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(apt.status)}`}>
                                            {apt.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageAppointments;
