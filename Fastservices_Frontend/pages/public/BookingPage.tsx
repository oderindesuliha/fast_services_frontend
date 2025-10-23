import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Offering } from '../../types';
import Spinner from '../../components/Spinner';
import BackButton from '../../components/BackButton';

// Mock data for offerings (since we don't have a global state for this)
const mockOfferings: Offering[] = [
    { id: 'o1', organizationId: '1', name: 'General Consultation', description: 'Consult with a General Practitioner.', estimatedWaitTime: 45, duration: 15 },
    { id: 'o2', organizationId: '1', name: 'Emergency Services', description: 'Urgent care for critical conditions.', estimatedWaitTime: 10, duration: 60 },
    { id: 'o3', organizationId: '2', name: 'New Passport Application', description: 'Apply for a new international passport.', estimatedWaitTime: 120, duration: 30 },
    { id: 'o4', organizationId: '2', name: 'Passport Renewal', description: 'Renew your existing passport.', estimatedWaitTime: 60, duration: 20 },
    { id: 'o5', organizationId: '4', name: 'New Account Opening', description: 'Open a new savings or current account.', estimatedWaitTime: 25, duration: 20 },
    { id: 'o6', organizationId: '4', name: 'Customer Service Inquiry', description: 'Speak with a customer service representative.', estimatedWaitTime: 15, duration: 10 },
];

const BookingPage: React.FC = () => {
    const { offeringId } = useParams<{ offeringId: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

    const [offering, setOffering] = useState<Offering | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    useEffect(() => {
        // Simulate fetching offering details
        setTimeout(() => {
            const foundOffering = mockOfferings.find(o => o.id === offeringId);
            setOffering(foundOffering || null);
            setIsLoading(false);
        }, 500);
    }, [offeringId]);
    
    useEffect(() => {
        // Check authentication status after auth has loaded
        if(!isAuthLoading && !isAuthenticated) {
            setShowLoginPrompt(true);
        } else {
            setShowLoginPrompt(false);
        }
    }, [isAuthenticated, isAuthLoading]);

    const handleBooking = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setShowLoginPrompt(true);
            return;
        }

        if (!selectedDate || !selectedTime) {
            alert('Please select a date and time.');
            return;
        }

        // Validate that booking date is in the future
        const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
        const now = new Date();

        if (selectedDateTime <= now) {
            alert('Please select a date and time in the future. You cannot book appointments for past dates or times.');
            return;
        }

        console.log(`Booking confirmed for ${offering?.name} on ${selectedDate} at ${selectedTime}`);
        alert('Appointment booked successfully!');
        navigate('/customer/upcoming');
    };
    
    if (isLoading || isAuthLoading) {
        return <div className="flex justify-center items-center h-64"><Spinner /></div>;
    }

    if (!offering) {
        return <div className="text-center py-10">
            <h2 className="text-2xl font-bold">Service not found</h2>
            <Link to="/organizations" className="text-blue-500 hover:underline mt-4 inline-block">Browse Organizations</Link>
        </div>;
    }

    const inputClasses = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white";

    return (
        <div className="max-w-2xl mx-auto">
             <BackButton className="mb-6" />
            <h1 className="text-3xl font-bold mb-4">Book an Appointment</h1>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{offering.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{offering.description}</p>
                <hr className="my-4 dark:border-gray-600"/>
                
                {showLoginPrompt ? (
                    <div className="p-4 bg-yellow-100 dark:bg-yellow-900/50 border border-yellow-400 text-yellow-800 dark:text-yellow-300 rounded-md text-center">
                        <p>You need to be logged in to book an appointment.</p>
                        <div className="mt-4 flex justify-center gap-4">
                            <Link to="/login" state={{ from: location.pathname }} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Login</Link>
                            <Link to="/register" className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">Register</Link>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleBooking} className="space-y-4">
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Date</label>
                            <input type="date" id="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} required className={inputClasses}/>
                        </div>
                         <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Time</label>
                            <input type="time" id="time" value={selectedTime} onChange={e => setSelectedTime(e.target.value)} required className={inputClasses}/>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                            Confirm Appointment
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default BookingPage;
