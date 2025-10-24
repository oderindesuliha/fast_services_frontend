import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { Appointment, AppointmentStatus } from '../../../types';
import Spinner from '../../../components/Spinner';
import { FiCalendar, FiClock, FiMapPin, FiInfo, FiTag } from 'react-icons/fi';
import { ThemeContext } from '../../../context/ThemeContext';
import BackButton from '../../../components/BackButton';

const mockAppointments: Appointment[] = [
    { 
        id: 'apt1', 
        userId: '1', 
        offeringId: 'o1', 
        queueId: 'q1', 
        appointmentDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), 
        status: AppointmentStatus.SCHEDULED,
        offering: { id: 'o1', name: 'General Consultation', duration: 15, organization: { id: '1', name: 'Lagos General Hospital', address: '1 Hospital Rd, Lagos Island' } } as any,
        queue: {id: 'q1', name: 'GP Queue'} as any
    },
     { 
        id: 'apt2', 
        userId: '1', 
        offeringId: 'o3', 
        queueId: 'q2', 
        appointmentDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), 
        status: AppointmentStatus.SCHEDULED,
        offering: { id: 'o3', name: 'Drivers License Renewal', duration: 10, organization: { id: '2', name: 'FRSC Licensing Office', address: '456 Government Ave, Abuja' } } as any,
        queue: {id: 'q2', name: 'License Renewal Line A'} as any
    },
];

const AppointmentDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const themeContext = useContext(ThemeContext);
    const theme = themeContext?.theme || 'light';
    const [appointment, setAppointment] = useState<Appointment | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            const apt = mockAppointments.find(a => a.id === id) || null;
            setAppointment(apt);
            setIsLoading(false);
        }, 500);
    }, [id]);

    if (isLoading) return <div className="flex justify-center mt-8"><Spinner /></div>;
    if (!appointment) return <div className="text-center mt-8 dark:text-gray-300">Appointment not found.</div>;
    
    const qrCodeBgColor = theme === 'dark' ? '#1f2937' : '#ffffff'; // gray-800 or white
    const qrCodeFgColor = theme === 'dark' ? '#f3f4f6' : '#111827'; // gray-100 or gray-900

    return (
        <div>
             <BackButton fallbackPath="/customer/upcoming" className="mb-6" />
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                         <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Appointment Details</h1>
                         <div className="space-y-3 text-gray-700 dark:text-gray-300">
                            <p className="flex items-center"><FiTag className="mr-3 text-gray-400" /> <strong>Service:</strong> <span className="ml-2">{appointment.offering?.name}</span></p>
                            <p className="flex items-center"><FiMapPin className="mr-3 text-gray-400" /> <strong>Organization:</strong> <span className="ml-2">{appointment.offering?.organization?.name}</span></p>
                            <p className="flex items-center"><FiInfo className="mr-3 text-gray-400" /> <strong>Address:</strong> <span className="ml-2">{appointment.offering?.organization?.address}</span></p>
                            <p className="flex items-center"><FiCalendar className="mr-3 text-gray-400" /> <strong>Date:</strong> <span className="ml-2">{new Date(appointment.appointmentDate).toLocaleDateString()}</span></p>
                            <p className="flex items-center"><FiClock className="mr-3 text-gray-400" /> <strong>Time:</strong> <span className="ml-2">{new Date(appointment.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></p>
                            <p><span className={`px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300`}>{appointment.status}</span></p>
                         </div>
                         <div className="mt-6 flex gap-4">
                            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Cancel Appointment</button>
                            <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">Reschedule</button>
                         </div>
                    </div>
                    <div className="text-center flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <h3 className="font-semibold mb-2">Your QR Code</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Present this at check-in</p>
                        <QRCodeCanvas 
                            value={appointment.id} 
                            size={160}
                            bgColor={qrCodeBgColor}
                            fgColor={qrCodeFgColor}
                            level={"H"}
                            includeMargin={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentDetailsPage;
