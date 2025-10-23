import React, { useState, useEffect } from 'react';
import { Organization } from '../../../types';
import Spinner from '../../../components/Spinner';
import { FiEdit, FiTrash2, FiSearch, FiPlus, FiMail, FiPhone } from 'react-icons/fi';
import OrganizationFormModal from '../../../components/OrganizationFormModal';

const mockOrganizations: Organization[] = [
    { id: '1', name: 'City General Hospital', address: '123 Health St, Meditown', code: 'CGH', contactEmail: 'contact@cgh.com', contactPhone: '555-0101', createdAt: new Date().toISOString() },
    { id: '2', name: 'Downtown DMV', address: '456 Government Ave, CapCity', code: 'DMV', contactEmail: 'info@dmv.gov', contactPhone: '555-0102', createdAt: new Date().toISOString() },
];

const ManageOrganizations: React.FC = () => {
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOrg, setEditingOrg] = useState<Partial<Organization> | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setOrganizations(mockOrganizations);
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleOpenModal = (org: Organization | null = null) => {
        setEditingOrg(org);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingOrg(null);
        setIsModalOpen(false);
    };

    const handleFormSubmit = (formData: Partial<Organization>) => {
        if (formData.id) { // Update
            setOrganizations(orgs => orgs.map(o => o.id === formData.id ? { ...o, ...formData } as Organization : o));
        } else { // Add
            const newOrg: Organization = {
                id: (Math.random() * 10000).toString(),
                createdAt: new Date().toISOString(),
                ...formData
            } as Organization;
            setOrganizations(orgs => [newOrg, ...orgs]);
        }
        handleCloseModal();
    };

    const handleDeleteOrg = (orgId: string) => {
        if (window.confirm('Are you sure you want to delete this organization?')) {
            setOrganizations(orgs => orgs.filter(o => o.id !== orgId));
        }
    };

    const filteredOrgs = organizations.filter(org =>
        org.name.toLowerCase().includes(filter.toLowerCase()) ||
        org.contactEmail.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold">Manage Organizations</h1>
                <button 
                    onClick={() => handleOpenModal()} 
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    <FiPlus /> Add Organization
                </button>
            </div>
            <div className="mb-4 relative">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    className="w-full p-2 pl-10 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            {isLoading ? <Spinner /> : (
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                    {/* Desktop Table */}
                    <div className="hidden md:block">
                         <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Contact Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredOrgs.map(org => (
                                    <tr key={org.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{org.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{org.contactEmail}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{org.contactPhone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <button onClick={() => handleOpenModal(org)} className="text-blue-600 hover:text-blue-900 dark:text-blue-400"><FiEdit size={18}/></button>
                                            <button onClick={() => handleDeleteOrg(org.id)} className="text-red-600 hover:text-red-900 dark:text-red-400"><FiTrash2 size={18}/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                     {/* Mobile Cards */}
                    <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredOrgs.map(org => (
                             <div key={org.id} className="p-4">
                                <div className="flex justify-between items-start">
                                    <p className="font-bold text-gray-900 dark:text-gray-100">{org.name}</p>
                                    <div className="flex items-center space-x-2">
                                        <button onClick={() => handleOpenModal(org)} className="text-blue-600 p-1"><FiEdit size={18}/></button>
                                        <button onClick={() => handleDeleteOrg(org.id)} className="text-red-600 p-1"><FiTrash2 size={18}/></button>
                                    </div>
                                </div>
                                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                    <p className="flex items-center gap-2"><FiMail /> {org.contactEmail}</p>
                                    <p className="flex items-center gap-2"><FiPhone /> {org.contactPhone}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <OrganizationFormModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleFormSubmit} organization={editingOrg} />
        </div>
    );
};

export default ManageOrganizations;
