import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Organization } from '../../types';
import Spinner from '../../components/Spinner';

const mockOrganizations: Organization[] = [
  { id: '1', name: 'City General Hospital', address: '123 Health St, Meditown', contactEmail: 'contact@cgh.com', contactPhone: '555-0101', code: 'CGH', createdAt: new Date().toISOString() },
  { id: '2', name: 'Downtown DMV', address: '456 Government Ave, CapCity', contactEmail: 'info@dmv.gov', contactPhone: '555-0102', code: 'DMV', createdAt: new Date().toISOString() },
  { id: '3', name: 'Tech Repair Central', address: '789 Tech Rd, Silicon Valley', contactEmail: 'support@trc.com', contactPhone: '555-0103', code: 'TRC', createdAt: new Date().toISOString() },
];

const OrganizationCard: React.FC<{ org: Organization }> = ({ org }) => {
    const location = useLocation();
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{org.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{org.address}</p>
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-300">
                    <p>Email: {org.contactEmail}</p>
                    <p>Phone: {org.contactPhone}</p>
                </div>
                 <Link to={`/organizations/${org.id}`} state={{ from: location }} className="inline-block mt-4 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    View Services
                </Link>
            </div>
        </div>
    );
};

const OrganizationsPage: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrganizations(mockOrganizations);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredOrgs = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

 return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Our Organizations</h1>

      <div className="mb-6">
          <input
            type="text"
            placeholder="Search for an organization..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOrgs.map(org => (
            <OrganizationCard key={org.id} org={org} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrganizationsPage;