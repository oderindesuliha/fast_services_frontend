
import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Organization, Offering } from '../../types';
import Spinner from '../../components/Spinner';
import { FiMapPin, FiMail, FiPhone, FiClock, FiInfo } from 'react-icons/fi';
import BackButton from '../../components/BackButton';

// Mock data - in a real app, this would come from an API
const mockOrganizations: Organization[] = [
  { id: '1', name: 'Lagos General Hospital', address: '123 Health St, Ikeja, Lagos', contactEmail: 'contact@lgh.ng', contactPhone: '0801-234-5678', code: 'LGH', createdAt: new Date().toISOString() },
  { id: '2', name: 'Abuja Regional Passport Office', address: '456 Government Ave, Garki, Abuja', contactEmail: 'info@passports.gov.ng', contactPhone: '0909-876-5432', code: 'ARPO', createdAt: new Date().toISOString() },
  { id: '3', name: 'Tech Innovations Hub', address: '789 Tech Rd, Yaba, Lagos', contactEmail: 'support@techhub.ng', contactPhone: '0703-456-7890', code: 'TIH', createdAt: new Date().toISOString() },
  { id: '4', name: 'FirstBank Nigeria - Marina Branch', address: '1 Financial Street, Lagos Island', contactEmail: 'marina@firstbank.ng', contactPhone: '0805-555-0103', code: 'FBN', createdAt: new Date().toISOString() },
  { id: '5', name: 'Enugu State University Teaching Hospital', address: '22 University Rd, Enugu', contactEmail: 'info@esuth.edu.ng', contactPhone: '0812-345-6789', code: 'ESUTH', createdAt: new Date().toISOString() },
];

const mockOfferings: Offering[] = [
    { id: 'o1', organizationId: '1', name: 'General Consultation', description: 'Consult with a General Practitioner.', estimatedWaitTime: 45, duration: 15 },
    { id: 'o2', organizationId: '1', name: 'Emergency Services', description: 'Urgent care for critical conditions.', estimatedWaitTime: 10, duration: 60 },
    { id: 'o3', organizationId: '2', name: 'New Passport Application', description: 'Apply for a new international passport.', estimatedWaitTime: 120, duration: 30 },
    { id: 'o4', organizationId: '2', name: 'Passport Renewal', description: 'Renew your existing passport.', estimatedWaitTime: 60, duration: 20 },
    { id: 'o5', organizationId: '4', name: 'New Account Opening', description: 'Open a new savings or current account.', estimatedWaitTime: 25, duration: 20 },
    { id: 'o6', organizationId: '4', name: 'Customer Service Inquiry', description: 'Speak with a customer service representative.', estimatedWaitTime: 15, duration: 10 },
];

const OrganizationDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const [organization, setOrganization] = useState<Organization | null>(null);
    const [offerings, setOfferings] = useState<Offering[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            const org = mockOrganizations.find(o => o.id === id);
            const orgOfferings = mockOfferings.filter(off => off.organizationId === id);
            setOrganization(org || null);
            setOfferings(orgOfferings);
            setIsLoading(false);
        }, 500);
    }, [id]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-64"><Spinner /></div>;
    }

    if (!organization) {
        return <div className="text-center py-10">
            <h2 className="text-2xl font-bold">Organization not found</h2>
            <Link to="/organizations" className="text-blue-500 hover:underline mt-4 inline-block">Back to list</Link>
        </div>;
    }

    return (
        <div className="space-y-8">
            <BackButton />

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{organization.name}</h1>
                <div className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
                    <p className="flex items-center gap-2"><FiMapPin /> {organization.address}</p>
                    <p className="flex items-center gap-2"><FiMail /> {organization.contactEmail}</p>
                    <p className="flex items-center gap-2"><FiPhone /> {organization.contactPhone}</p>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">Available Services</h2>
                {offerings.length > 0 ? (
                    <div className="space-y-4">
                        {offerings.map(offering => (
                            <div key={offering.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between sm:items-center">
                                <div className="flex-grow">
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{offering.name}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{offering.description}</p>
                                    <div className="flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 mt-2 gap-x-4 gap-y-1">
                                        <span className="flex items-center gap-1"><FiClock /> Est. Wait: {offering.estimatedWaitTime} mins</span>
                                        <span className="flex items-center gap-1"><FiInfo /> Duration: {offering.duration} mins</span>
                                    </div>
                                </div>
                                <div className="mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
                                    <Link to={`/book/${offering.id}`} state={{ from: location }} className="w-full sm:w-auto text-center inline-block bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors">
                                        Book Appointment
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center text-gray-500 dark:text-gray-400">No services are currently available for this organization.</p>
                )}
            </div>
        </div>
    );
};

export default OrganizationDetailsPage;
