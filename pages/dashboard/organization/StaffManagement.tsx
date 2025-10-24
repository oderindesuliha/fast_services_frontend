import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';

interface Staff {
  id: string;
  name: string;
  email: string;
  role: string;
  services: string[];
}

const StaffManagement: React.FC = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    services: [] as string[]
  });
  const { organization } = useAuth();

  useEffect(() => {
    // TODO: Fetch staff members for the organization
    fetchStaffMembers();
  }, []);

  const fetchStaffMembers = async () => {
    try {
      // TODO: Implement API call to fetch staff members
      // const response = await api.getOrganizationStaff(organization.id);
      // setStaff(response.data);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement API call to add staff member
      // const response = await api.addStaffMember(organization.id, newStaff);
      // setStaff([...staff, response.data]);
      setNewStaff({ name: '', email: '', services: [] });
    } catch (error) {
      console.error('Error adding staff:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Staff Management</h2>

      {/* Add Staff Form */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Add New Staff Member</h3>
        <form onSubmit={handleAddStaff} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={newStaff.name}
              onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={newStaff.email}
              onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Staff Member
          </button>
        </form>
      </div>

      {/* Staff List */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Current Staff</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Services</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((member) => (
                <tr key={member.id}>
                  <td className="border px-4 py-2">{member.name}</td>
                  <td className="border px-4 py-2">{member.email}</td>
                  <td className="border px-4 py-2">{member.role}</td>
                  <td className="border px-4 py-2">
                    {member.services.join(', ')}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="text-red-600 hover:text-red-800 mr-2"
                      onClick={() => {
                        // TODO: Implement remove staff member
                      }}
                    >
                      Remove
                    </button>
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        // TODO: Implement edit staff member
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;