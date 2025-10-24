import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LOGO_SRC } from '../../constants';
import { Offering } from '../../types';

const GuestQueuePage: React.FC = () => {
    const { offeringId } = useParams<{ offeringId: string }>();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [offering, setOffering] = useState<Offering | null>(null);
    const [queuePosition, setQueuePosition] = useState<number | null>(null);
    const [currentAttendee, setCurrentAttendee] = useState<string | null>(null);
    const [peopleAhead, setPeopleAhead] = useState<number>(0);

    useEffect(() => {
        // Mock offering data
        const mockOfferings: Offering[] = [
            { id: 'o1', organizationId: '1', name: 'General Consultation', description: 'Consult with a General Practitioner.', estimatedWaitTime: 45, duration: 15 },
            { id: 'o2', organizationId: '1', name: 'Emergency Services', description: 'Urgent care for critical conditions.', estimatedWaitTime: 10, duration: 60 },
        ];

        const foundOffering = mockOfferings.find(o => o.id === offeringId);
        setOffering(foundOffering || null);

        // Mock queue data
        setCurrentAttendee('John Doe');
        setPeopleAhead(3);
    }, [offeringId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(`Guest with email ${email} joining queue for offering ${offeringId}`);

        // Simulate API call
        setTimeout(() => {
            setQueuePosition(peopleAhead + 1);
            setIsLoading(false);
        }, 1000);
    };

    if (queuePosition !== null) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-gray-800 shadow-lg rounded-xl text-center">
                    <img className="mx-auto h-24 w-auto" src={LOGO_SRC} alt="FastServices Logo" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">You're in the Queue!</h2>

                    <div className="space-y-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">#{queuePosition}</p>
                            <p className="text-gray-600 dark:text-gray-400">Your position in queue</p>
                        </div>

                        {offering && (
                            <div className="text-left">
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{offering.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{offering.description}</p>
                            </div>
                        )}

                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Currently serving:</p>
                            <p className="font-semibold text-green-600 dark:text-green-400">{currentAttendee}</p>
                        </div>

                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-400">People ahead of you:</p>
                            <p className="font-semibold text-yellow-600 dark:text-yellow-400">{peopleAhead}</p>
                        </div>

                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Estimated wait time:</p>
                            <p className="font-semibold text-purple-600 dark:text-purple-400">
                                {offering ? `${Math.ceil((queuePosition - 1) * offering.duration)} minutes` : 'Calculating...'}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 space-y-3">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            You'll receive notifications when it's your turn. Stay nearby!
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
              <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
                  <img className="mx-auto h-24 w-auto" src={LOGO_SRC} alt="FastServices Logo" />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">Join the Queue</h2>
                <p className="text-center text-gray-600 dark:text-gray-400">Enter your email to get your spot. No account needed.</p>

                {offering && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{offering.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{offering.description}</p>
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <p>Duration: {offering.duration} mins</p>
                            <p>Est. wait time: {offering.estimatedWaitTime} mins</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email address"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
                    >
                        {isLoading ? 'Joining...' : 'Join Queue'}
                    </button>
                </form>
              </div>
        </div>
    );
};

export default GuestQueuePage;
