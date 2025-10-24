import React, { useState, useEffect } from 'react';
import { Offering } from '../../../types';
import Spinner from '../../../components/Spinner';
import { FiEdit, FiTrash2, FiPlus, FiGrid, FiClock, FiInfo } from 'react-icons/fi';
import QRCodeModal from '../../../components/QRCodeModal';


const mockOfferings: Offering[] = [
    { id: 'o1', name: 'General Consultation', description: 'Consult with a General Practitioner.', estimatedWaitTime: 45, duration: 15, organizationId: '1' },
    { id: 'o2', name: 'Emergency Services', description: 'Urgent care for critical conditions.', estimatedWaitTime: 10, duration: 60, organizationId: '1' },
];

const ManageServices: React.FC = () => {
    const [offerings, setOfferings] = useState<Offering[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOffering, setSelectedOffering] = useState<Offering | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingOffering, setEditingOffering] = useState<Offering | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        estimatedWaitTime: 0,
        duration: 0
    });

    useEffect(() => {
        setTimeout(() => {
            setOfferings(mockOfferings);
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleGenerateQR = (offering: Offering) => {
        setSelectedOffering(offering);
        setIsModalOpen(true);
    };

    const handleCreateOffering = () => {
        setFormData({ name: '', description: '', estimatedWaitTime: 0, duration: 0 });
        setIsCreateModalOpen(true);
    };

    const handleEditOffering = (offering: Offering) => {
        setEditingOffering(offering);
        setFormData({
            name: offering.name,
            description: offering.description,
            estimatedWaitTime: offering.estimatedWaitTime,
            duration: offering.duration
        });
        setIsCreateModalOpen(true);
    };

    const handleDeleteOffering = (offeringId: string) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            setOfferings(offerings.filter(o => o.id !== offeringId));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingOffering) {
            // Update existing offering
            setOfferings(offerings.map(o =>
                o.id === editingOffering.id
                    ? { ...o, ...formData }
                    : o
            ));
            setEditingOffering(null);
        } else {
            // Create new offering
            const newOffering: Offering = {
                id: `o${Date.now()}`,
                ...formData,
                organizationId: '1' // Mock organization ID
            };
            setOfferings([...offerings, newOffering]);
        }
        setIsCreateModalOpen(false);
        setFormData({ name: '', description: '', estimatedWaitTime: 0, duration: 0 });
    };

    if (isLoading) return <Spinner />;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Offerings</h1>
                <button onClick={handleCreateOffering} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    <FiPlus /> Add Service
                </button>
            </div>

            <div className="space-y-4">
                {offerings.map(offering => (
                    <div key={offering.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{offering.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{offering.description}</p>
                            </div>
                             <div className="flex items-center gap-2 mt-4 sm:mt-0 flex-shrink-0">
                                <button onClick={() => handleGenerateQR(offering)} className="flex items-center gap-2 text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md">
                                    <FiGrid /> Generate QR
                                </button>
                                <button onClick={() => handleEditOffering(offering)} className="p-2 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"><FiEdit size={20} /></button>
                                <button onClick={() => handleDeleteOffering(offering.id)} className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"><FiTrash2 size={20} /></button>
                            </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-3 gap-4 border-t dark:border-gray-700 pt-3">
                            <span className="flex items-center gap-1"><FiClock /> Est. Wait: {offering.estimatedWaitTime} mins</span>
                            <span className="flex items-center gap-1"><FiInfo /> Duration: {offering.duration} mins</span>
                        </div>
                    </div>
                ))}
            </div>

            {selectedOffering && (
                <QRCodeModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    offering={selectedOffering}
                />
            )}

            {/* Create/Edit Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                        <h2 className="text-xl font-bold mb-4">{editingOffering ? 'Edit Service' : 'Create New Service'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    rows={3}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Estimated Wait Time (minutes)</label>
                                <input
                                    type="number"
                                    value={formData.estimatedWaitTime}
                                    onChange={e => setFormData({...formData, estimatedWaitTime: parseInt(e.target.value) || 0})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    min="0"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
                                <input
                                    type="number"
                                    value={formData.duration}
                                    onChange={e => setFormData({...formData, duration: parseInt(e.target.value) || 0})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    min="0"
                                    required
                                />
                            </div>
                            <div className="flex gap-2 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                >
                                    {editingOffering ? 'Update' : 'Create'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsCreateModalOpen(false);
                                        setEditingOffering(null);
                                        setFormData({ name: '', description: '', estimatedWaitTime: 0, duration: 0 });
                                    }}
                                    className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageServices;