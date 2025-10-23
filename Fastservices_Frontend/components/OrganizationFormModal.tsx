import React, { useState, useEffect } from 'react';
import { Organization } from '../types';

interface OrganizationFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (organization: Partial<Organization>) => void;
    organization: Partial<Organization> | null;
}

const OrganizationFormModal: React.FC<OrganizationFormModalProps> = ({ isOpen, onClose, onSubmit, organization }) => {
    const [formData, setFormData] = useState<Partial<Organization>>({});

    useEffect(() => {
        setFormData(organization || {});
    }, [organization, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    const inputClasses = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">{organization?.id ? 'Edit Organization' : 'Add New Organization'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="name" type="text" required placeholder="Organization Name" value={formData.name || ''} onChange={handleChange} className={inputClasses} />
                    <input name="address" type="text" required placeholder="Address" value={formData.address || ''} onChange={handleChange} className={inputClasses} />
                    <input name="contactEmail" type="email" required placeholder="Contact Email" value={formData.contactEmail || ''} onChange={handleChange} className={inputClasses} />
                    <input name="contactPhone" type="tel" required placeholder="Contact Phone" value={formData.contactPhone || ''} onChange={handleChange} className={inputClasses} />
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{organization?.id ? 'Save Changes' : 'Create Organization'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrganizationFormModal;
