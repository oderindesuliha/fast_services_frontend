import React, { useState, useEffect } from 'react';
import { Organization } from '../../../types';
import { FiEdit, FiSave, FiX } from 'react-icons/fi';

const OrganizationProfile: React.FC = () => {
    const [organization, setOrganization] = useState<Organization | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        contactEmail: '',
        contactPhone: ''
    });

    useEffect(() => {
        // Mock organization data - in real app, this would come from API
        const mockOrg: Organization = {
            id: '1',
            name: 'City General Hospital',
            address: '123 Health St, Meditown, Nigeria',
            contactEmail: 'contact@cgh.ng',
            contactPhone: '+234-555-0101',
            code: 'CGH',
            createdAt: new Date().toISOString()
        };
        setOrganization(mockOrg);
        setFormData({
            name: mockOrg.name,
            address: mockOrg.address,
            contactEmail: mockOrg.contactEmail,
            contactPhone: mockOrg.contactPhone
        });
    }, []);

    const handleSave = () => {
        if (organization) {
            setOrganization({
                ...organization,
                ...formData
            });
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        if (organization) {
            setFormData({
                name: organization.name,
                address: organization.address,
                contactEmail: organization.contactEmail,
                contactPhone: organization.contactPhone
            });
        }
        setIsEditing(false);
    };

    if (!organization) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Organization Profile</h1>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        <FiEdit /> Edit Profile
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                        >
                            <FiSave /> Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                            <FiX /> Cancel
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Organization Name
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        ) : (
                            <p className="text-gray-900 dark:text-gray-100">{organization.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Organization Code
                        </label>
                        <p className="text-gray-900 dark:text-gray-100">{organization.code}</p>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Address
                        </label>
                        {isEditing ? (
                            <textarea
                                value={formData.address}
                                onChange={(e) => setFormData({...formData, address: e.target.value})}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        ) : (
                            <p className="text-gray-900 dark:text-gray-100">{organization.address}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Contact Email
                        </label>
                        {isEditing ? (
                            <input
                                type="email"
                                value={formData.contactEmail}
                                onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        ) : (
                            <p className="text-gray-900 dark:text-gray-100">{organization.contactEmail}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Contact Phone
                        </label>
                        {isEditing ? (
                            <input
                                type="tel"
                                value={formData.contactPhone}
                                onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        ) : (
                            <p className="text-gray-900 dark:text-gray-100">{organization.contactPhone}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Member Since
                        </label>
                        <p className="text-gray-900 dark:text-gray-100">
                            {new Date(organization.createdAt).toLocaleDateString('en-NG', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizationProfile;
