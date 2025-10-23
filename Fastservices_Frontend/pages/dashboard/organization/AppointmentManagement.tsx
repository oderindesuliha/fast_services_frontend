import React, { useState, useEffect } from 'react';
import { Appointment, AppointmentStatus } from '../../../types';
import { FiCheckCircle, FiClock, FiXCircle, FiPlay, FiFilter } from 'react-icons/fi';

const AppointmentManagement: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [filterStatus, setFilterStatus] = useState<AppointmentStatus | 'ALL'>('ALL');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Mock appointment data
        const mockAppointments: Appointment[] = [
            {
                id: 'a1',
                userId: 'u1',
                offeringId: 'o1',
                queueId: 'q1',
                appointmentDate: new Date().toISOString(),
                status: AppointmentStatus.SCHEDULED,
                user: {
                    id: 'u1',
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john@example.com',
                    phone: '+234-555-0001',
                    role: 'CUSTOMER' as any,
                    createdAt: new Date().toISOString()
                },
                offering: {
                    id: 'o1',
                    name: 'General Consultation',
                    description: 'Consult with a General Practitioner.',
                    estimatedWaitTime: 45,
                    duration: 15,
                    organizationId: '1'
                }
            },
            {
                id: 'a2',
                userId: 'u2',
                offeringId: 'o2',
                queueId: 'q1',
                appointmentDate: new Date(Date.now() - 3600000).toISOString(),
                status: AppointmentStatus.IN_PROGRESS,
                user: {
                    id: 'u2',
                    firstName: 'Jane',
                    lastName: 'Smith',
                    email: 'jane@example.com',
                    phone: '+234-555-0002',
                    role: 'CUSTOMER' as any,
                    createdAt: new Date().toISOString()
                },
                offering: {
                    id: 'o2',
                    name: 'Emergency Services',
                    description: 'Urgent care for critical conditions.',
                    estimatedWaitTime: 10,
                    duration: 60,
                    organizationId: '1'
                }
            },
            {
                id: 'a3',
                userId: 'u3',
                offeringId: 'o1',
                queueId: 'q1',
                appointmentDate: new Date(Date.now() - 7200000).toISOString(),
                status: AppointmentStatus.COMPLETED,
                user: {
                    id: 'u3',
                    firstName: 'Mike',
                    lastName: 'Johnson',
                    email: 'mike@example.com',
                    phone: '+234-555-0003',
                    role: 'CUSTOMER' as any,
                    createdAt: new Date().toISOString()
                },
                offering: {
                    id: 'o1',
                    name: 'General Consultation',
                    description: 'Consult with a General Practitioner.',
                    estimatedWaitTime: 45,
                    duration: 15,
                    organizationId: '1'
                }
            }
        ];

        setTimeout(() => {
            setAppointments(mockAppointments);
            setIsLoading(false);
        }, 1000);
    }, []);

    const getStatusIcon = (status: AppointmentStatus) => {
        switch (status) {
            case AppointmentStatus.COMPLETED:
                return <FiCheckCircle className="text-green-500" size={20} />;
            case AppointmentStatus.IN_PROGRESS:
                return <FiPlay className="text-blue-500" size={20} />;
            case AppointmentStatus.CANCELLED:
                return <FiXCircle className="text-red-500" size={20} />;
            default:
                return <FiClock className="text-yellow-500" size={20} />;
        }
    };

    const getStatusColor = (status: AppointmentStatus) => {
        switch (status) {
            case AppointmentStatus.COMPLETED:
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case AppointmentStatus.IN_PROGRESS:
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case AppointmentStatus.CANCELLED:
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default:
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
        }
    };

    const handleStatusChange = (appointmentId: string, newStatus: AppointmentStatus) => {
        setAppointments(appointments.map(apt =>
            apt.id === appointmentId ? { ...apt, status: newStatus } : apt
        ));
    };

    const filteredAppointments = filterStatus === 'ALL'
        ? appointments
        : appointments.filter(apt => apt.status === filterStatus);

    if (isLoading) {
        return <div className="flex justify-center items-center h-64">Loading appointments...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Appointment Management</h1>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <FiFilter size={20} />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value as AppointmentStatus | 'ALL')}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value="ALL">All Status</option>
                            <option value={AppointmentStatus.SCHEDULED}>Scheduled</option>
                            <option value={AppointmentStatus.IN_PROGRESS}>In Progress</option>
                            <option value={AppointmentStatus.COMPLETED}>Completed</option>
                            <option value={AppointmentStatus.CANCELLED}>Cancelled</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {filteredAppointments.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                        <p className="text-gray-500 dark:text-gray-400">No appointments found.</p>
                    </div>
                ) : (
                    filteredAppointments.map(appointment => (
                        <div key={appointment.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        {getStatusIcon(appointment.status)}
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                            {appointment.user?.firstName} {appointment.user?.lastName}
                                        </h3>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                                            {appointment.status.replace('_', ' ')}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                                        <div>
                                            <span className="font-medium">Service:</span> {appointment.offering?.name}
                                        </div>
                                        <div>
                                            <span className="font-medium">Email:</span> {appointment.user?.email}
                                        </div>
                                        <div>
                                            <span className="font-medium">Phone:</span> {appointment.user?.phone}
                                        </div>
                                        <div>
                                            <span className="font-medium">Date:</span> {new Date(appointment.appointmentDate).toLocaleDateString('en-NG')}
                                        </div>
                                        <div>
                                            <span className="font-medium">Time:</span> {new Date(appointment.appointmentDate).toLocaleTimeString('en-NG')}
                                        </div>
                                        <div>
                                            <span className="font-medium">Duration:</span> {appointment.offering?.duration} mins
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 flex-wrap">
                                    {appointment.status === AppointmentStatus.SCHEDULED && (
                                        <button
                                            onClick={() => handleStatusChange(appointment.id, AppointmentStatus.IN_PROGRESS)}
                                            className="px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                                        >
                                            Start
                                        </button>
                                    )}
                                    {appointment.status === AppointmentStatus.IN_PROGRESS && (
                                        <button
                                            onClick={() => handleStatusChange(appointment.id, AppointmentStatus.COMPLETED)}
                                            className="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                                        >
                                            Complete
                                        </button>
                                    )}
                                    {appointment.status !== AppointmentStatus.CANCELLED && appointment.status !== AppointmentStatus.COMPLETED && (
                                        <button
                                            onClick={() => handleStatusChange(appointment.id, AppointmentStatus.CANCELLED)}
                                            className="px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="font-semibold mb-2">Quick Stats</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{appointments.filter(a => a.status === AppointmentStatus.SCHEDULED).length}</p>
                        <p className="text-gray-600 dark:text-gray-400">Scheduled</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-yellow-600">{appointments.filter(a => a.status === AppointmentStatus.IN_PROGRESS).length}</p>
                        <p className="text-gray-600 dark:text-gray-400">In Progress</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{appointments.filter(a => a.status === AppointmentStatus.COMPLETED).length}</p>
                        <p className="text-gray-600 dark:text-gray-400">Completed</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-red-600">{appointments.filter(a => a.status === AppointmentStatus.CANCELLED).length}</p>
                        <p className="text-gray-600 dark:text-gray-400">Cancelled</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentManagement;
