import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface UserFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (user: Partial<User>) => void;
    user: Partial<User> | null;
}

const UserFormModal: React.FC<UserFormModalProps> = ({ isOpen, onClose, onSubmit, user }) => {
    const [formData, setFormData] = useState<Partial<User>>({});

    useEffect(() => {
        setFormData(user || { role: UserRole.CUSTOMER });
    }, [user, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                <h2 className="text-2xl font-bold mb-6">{user?.id ? 'Edit User' : 'Add New User'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="firstName" type="text" required placeholder="First Name" value={formData.firstName || ''} onChange={handleChange} className={inputClasses} />
                        <input name="lastName" type="text" required placeholder="Last Name" value={formData.lastName || ''} onChange={handleChange} className={inputClasses} />
                    </div>
                    <input name="email" type="email" required placeholder="Email Address" value={formData.email || ''} onChange={handleChange} className={inputClasses} />
                    <input name="phone" type="tel" required placeholder="Phone Number" value={formData.phone || ''} onChange={handleChange} className={inputClasses} />
                    {!user?.id && (
                         <input name="password" type="password" required minLength={6} placeholder="Password" onChange={handleChange} className={inputClasses} />
                    )}
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                        <select id="role" name="role" value={formData.role} onChange={handleChange} className={`mt-1 block w-full pl-3 pr-10 py-2 text-base sm:text-sm rounded-md ${inputClasses}`}>
                            <option value={UserRole.CUSTOMER}>Customer</option>
                            <option value={UserRole.ORGANIZATION}>Organization</option>
                            <option value={UserRole.ADMIN}>Admin</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{user?.id ? 'Save Changes' : 'Create User'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserFormModal;