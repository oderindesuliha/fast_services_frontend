import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

const CustomerProfile: React.FC = () => {
    const authContext = useContext(AuthContext);
    const user = authContext?.user;
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
    });
    const [isEditing, setIsEditing] = useState(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Updating profile:", formData);
        // Add API call logic here
        setIsEditing(false);
    };

    const inputClasses = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white disabled:bg-gray-200 dark:disabled:bg-gray-600";
    
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 dark:text-gray-100">My Profile</h1>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                            <input name="firstName" type="text" value={formData.firstName} onChange={handleChange} disabled={!isEditing} className={inputClasses}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                            <input name="lastName" type="text" value={formData.lastName} onChange={handleChange} disabled={!isEditing} className={inputClasses}/>
                        </div>
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input name="email" type="email" value={formData.email} disabled className={`${inputClasses} bg-gray-100 dark:bg-gray-700 cursor-not-allowed`} />
                     </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                        <input name="phone" type="tel" value={formData.phone} onChange={handleChange} disabled={!isEditing} className={inputClasses}/>
                     </div>

                     <div className="flex justify-end gap-4 pt-4">
                        {isEditing ? (
                            <>
                                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Changes</button>
                            </>
                        ) : (
                            <button type="button" onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Edit Profile</button>
                        )}
                     </div>
                </form>
            </div>
        </div>
    );
};

export default CustomerProfile;
