import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Appointment, AppointmentStatus } from '../../../types';
import Spinner from '../../../components/Spinner';

const mockAppointments: Appointment[] = [
    { 
        id: 'apt1', 
        userId: '1', 
        offeringId: 'o1', 
        queueId: 'q1', 
        appointmentDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), 
        status: AppointmentStatus.SCHEDULED,
        offering: { id: 'o1', name: 'General Consultation', organization: { name: 'Lagos General Hospital' } } as any,
    },
     { 
        id: 'apt2', 
        userId: '1', 
        offeringId: 'o3', 
        queueId: 'q2', 
        appointmentDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), 
        status: AppointmentStatus.SCHEDULED,
        offering: { id: 'o3', name: 'Drivers License Renewal', organization: { name: 'FRSC Licensing Office' } } as any,
    },
];

const UpcomingAppointments: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            setAppointments(mockAppointments);
            setIsLoading(false);
        }, 500);
    }, []);

    if(isLoading) return <div className="flex justify-center items-center h-64"><Spinner /></div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Upcoming Appointments</h1>
            {appointments.length > 0 ? (
                <div className="space-y-4">
                    {appointments.map(apt => (
                        <div key={apt.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between sm:items-center">
                            <div>
                                <p className="font-bold text-lg">{apt.offering?.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{apt.offering?.organization?.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{new Date(apt.appointmentDate).toLocaleString()}</p>
                            </div>
                            <Link to={`/customer/upcoming/${apt.id}`} state={{ from: location }} className="mt-2 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-center">View Details</Link>
                        </div>
                    ))}
                </div>
            ) : (
                 <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                    <p className="text-gray-500 dark:text-gray-400">You have no upcoming appointments.</p>
                 </div>
            )}
        </div>
    );
};
export default UpcomingAppointments;
