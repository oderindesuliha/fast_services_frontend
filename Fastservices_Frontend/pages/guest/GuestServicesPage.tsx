import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LOGO_SRC } from '../../constants';
import { Offering, Organization } from '../../types';
import { FiClock, FiInfo } from 'react-icons/fi';

const GuestServicesPage: React.FC = () => {
    const { orgId } = useParams<{ orgId: string }>();
    const navigate = useNavigate();
    const [organization, setOrganization] = useState<Organization | null>(null);
    const [offerings, setOfferings] = useState<Offering[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Mock organization data
        const mockOrganizations: Organization[] = [
            {
                id: '1',
                name: 'FastServices Medical Center',
                address: '123 Health Street, Lagos',
                contactEmail: 'info@fastservices.com',
                contactPhone: '+234-555-0123',
                code: 'FSMC',
                createdAt: new Date().toISOString()
            }
        ];

        // Mock offerings data
        const mockOfferings: Offering[] = [
            { id: 'o1', organizationId: '1', name: 'General Consultation', description: 'Consult with a General Practitioner.', estimatedWaitTime: 45, duration: 15 },
            { id: 'o2', organizationId: '1', name: 'Emergency Services', description: 'Urgent care for critical conditions.', estimatedWaitTime: 10, duration: 60 },
            { id: 'o3', organizationId: '1', name: 'Dental Checkup', description: 'Complete dental examination and cleaning.', estimatedWaitTime: 30, duration: 45 },
        ];

        const foundOrg = mockOrganizations.find(o => o.id === orgId);
        setOrganization(foundOrg || null);

        const orgOfferings = mockOfferings.filter(o => o.organizationId === orgId);
        setOfferings(orgOfferings);

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [orgId]);

    const handleJoinQueue = (offeringId: string) => {
        navigate(`/join-queue/${offeringId}`);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <img className="mx-auto h-24 w-auto mb-4" src={LOGO_SRC} alt="FastServices Logo" />
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading services...</p>
                </div>
            </div>
        );
    }

    if (!organization) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="max-w-md w-full space-y-8 p-10 bg-white dark:bg-gray-800 shadow-lg rounded-xl text-center">
                    <img className="mx-auto h-24 w-auto" src={LOGO_SRC} alt="FastServices Logo" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Organization Not Found</h2>
                    <p className="text-gray-600 dark:text-gray-400">The organization you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <img className="mx-auto h-16 w-auto mb-4" src={LOGO_SRC} alt="FastServices Logo" />
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{organization.name}</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">{organization.address}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {organization.contactPhone} | {organization.contactEmail}
                    </p>
                </div>

                {/* Services */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Available Services</h2>

                    {offerings.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
                            <p className="text-gray-500 dark:text-gray-400">No services available at the moment.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {offerings.map(offering => (
                                <div key={offering.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <div className="flex flex-col h-full">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                                {offering.name}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                                {offering.description}
                                            </p>

                                            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-2">
                                                    <FiClock size={16} />
                                                    <span>Duration: {offering.duration} minutes</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FiInfo size={16} />
                                                    <span>Est. wait: {offering.estimatedWaitTime} minutes</span>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleJoinQueue(offering.id)}
                                            className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                                        >
                                            Join Queue
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="bg-gray-600 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition-colors"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GuestServicesPage;