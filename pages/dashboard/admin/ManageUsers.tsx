import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../../../types';
import Spinner from '../../../components/Spinner';
import { FiEdit, FiTrash2, FiSearch, FiPlus, FiMail, FiPhone } from 'react-icons/fi';
import UserFormModal from '../../../components/UserFormModal';
import { userAPI } from '../../../services/api';
import { Role } from '../../../context/AuthContext';

const mockUsers: User[] = [
    { id: '1', firstName: 'Adebola', lastName: 'Adebayo', email: 'admin@fastservices.ng', phone: '+2348012345678', roles: [UserRole.SUPER_ADMIN], createdAt: new Date().toISOString() },
    { id: '2', firstName: 'Aisha', lastName: 'Bello', email: 'org@fastservices.ng', phone: '+2348098765432', roles: [UserRole.ORG_ADMIN], createdAt: new Date().toISOString() },
    { id: '3', firstName: 'Ngozi', lastName: 'Nwosu', email: 'customer1@fastservices.ng', phone: '+2348027654321', roles: [UserRole.CUSTOMER], createdAt: new Date().toISOString() },
    { id: '4', firstName: 'Chinedu', lastName: 'Okafor', email: 'customer2@fastservices.ng', phone: '+2348035551212', roles: [UserRole.CUSTOMER], createdAt: new Date().toISOString() },
];


const ManageUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<Partial<User> | null>(null);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                console.log('Starting to fetch users...');
                setIsLoading(true);
                const response = await userAPI.getAllUsers();
                console.log('Received users response:', response);
                if (Array.isArray(response)) {
                    setUsers(response);
                } else {
                    console.error('Response is not an array:', response);
                    setUsers(mockUsers);
                }
            } catch (error) {
                console.error('Failed to fetch users:', error);
                // Fallback to mock data in case of error
                console.log('Using mock data as fallback');
                setUsers(mockUsers);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchUsers();
    }, []);

    const handleOpenModal = (user: User | null = null) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingUser(null);
        setIsModalOpen(false);
    };

    const handleFormSubmit = (formData: Partial<User>) => {
        if (formData.id) { // Update
            setUsers(users.map(u => u.id === formData.id ? { ...u, ...formData } as User : u));
        } else { // Add
            const newUser: User = {
                id: (Math.random() * 10000).toString(), // mock id
                createdAt: new Date().toISOString(),
                ...formData
            } as User;
            setUsers([newUser, ...users]);
        }
        handleCloseModal();
    };
    
    const handleDeleteUser = (userId: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(u => u.id !== userId));
        }
    };


    const filteredUsers = users.filter(user => {
        console.log('Filtering user:', user);
        return user.email?.toLowerCase().includes(filter.toLowerCase()) ||
               `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase().includes(filter.toLowerCase());
    });
    
    console.log('Filtered users:', filteredUsers);

    const getRoleClass = (roles: UserRole[]) => {
        if (roles.includes(UserRole.SUPER_ADMIN)) {
            return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
        } else if (roles.includes(UserRole.ORG_ADMIN)) {
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
        } else if (roles.includes(UserRole.STAFF)) {
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
        } else if (roles.includes(UserRole.CUSTOMER)) {
            return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
        }
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    };
    
    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold">Manage Users</h1>
                <button 
                    onClick={() => handleOpenModal()} 
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    <FiPlus />
                    Add User
                </button>
            </div>
            <div className="mb-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                        className="w-full p-2 pl-10 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FiSearch />
                    </div>
                </div>
            </div>
            
            {isLoading ? (
                <div className="flex justify-center items-center py-8">
                    <Spinner />
                </div>
            ) : users.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No users found. {filter ? 'Try adjusting your search.' : ''}
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                    {/* Desktop Table */}
                    <div className="hidden md:block">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredUsers.map(user => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{user.firstName} {user.lastName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleClass(user.roles)}`}>
                                                {user.roles[0] || 'CUSTOMER'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <button onClick={() => handleOpenModal(user)} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"><FiEdit size={18}/></button>
                                            <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"><FiTrash2 size={18}/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Mobile Cards */}
                    <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredUsers.map(user => (
                             <div key={user.id} className="p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-gray-900 dark:text-gray-100">{user.firstName} {user.lastName}</p>
                                        <span className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleClass(user.roles)}`}>
                                            {user.roles[0] || 'CUSTOMER'}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button onClick={() => handleOpenModal(user)} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1"><FiEdit size={18}/></button>
                                        <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1"><FiTrash2 size={18}/></button>
                                    </div>
                                </div>
                                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                    <p className="flex items-center gap-2"><FiMail /> {user.email}</p>
                                    <p className="flex items-center gap-2"><FiPhone /> {user.phone}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <UserFormModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleFormSubmit} user={editingUser} />
        </div>
    );
};

export default ManageUsers;