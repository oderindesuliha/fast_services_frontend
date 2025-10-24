import { API_BASE_URL, USE_MOCK, SHOW_BACKEND_ERRORS } from '../constants';
import { User } from '../types';

const API_URL = API_BASE_URL;

const getToken = (): string | null => sessionStorage.getItem('token');

const authenticatedFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...authHeaders,
      ...(options.headers as Record<string, string> | undefined),
    },
    credentials: 'include',
  };

  const res = await fetch(`${API_URL}${endpoint}`, config);

  if (res.status === 401) {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    window.location.href = '/#/login';
  }

  return res;
};

const parseBackendMessage = async (res: Response) => {
  const text = await res.text();
  if (SHOW_BACKEND_ERRORS) {
    try {
      const parsed = JSON.parse(text);
      return parsed.message || parsed.error || text || `Request failed: ${res.status}`;
    } catch (_) {
      return text || `Request failed: ${res.status}`;
    }
  }

  if (res.status === 401) return 'Invalid email or password. Please check your credentials and try again.';
  if (res.status === 404) return 'Account not found. Please register first.';
  if (res.status === 403) return 'Account is locked. Please contact support.';
  if (res.status === 409) return 'Email already registered. Please use a different email address.';
  if (res.status === 400) return 'Invalid request data. Please check all fields and try again.';
  if (res.status >= 500) return 'Server error. Please try again later.';
  return text || `Request failed: ${res.status}`;
};

// Mock persistence
const MOCK_STORAGE_KEY = 'fs_mock_users_v1';
const defaultMockUsers: Record<string, any> = {
  'admin@fastservices.ng': {
    id: 'mock-admin',
    firstName: 'Adebola',
    lastName: 'Adebayo',
    email: 'admin@fastservices.ng',
    phone: '+2348012345678',
    password: 'admin123',
    role: 'SUPER_ADMIN',
    createdAt: new Date().toISOString(),
  },
  'oderindesuliha@gmail.com': {
    id: 'mock-superadmin',
    firstName: 'Suliha',
    lastName: 'Oderinde',
    email: 'oderindesuliha@gmail.com',
    phone: '08139338208',
    password: 'FastService@123',
    role: 'SUPER_ADMIN',
    createdAt: new Date().toISOString(),
  },
  'org@fastservices.ng': {
    id: 'mock-org',
    firstName: 'Aisha',
    lastName: 'Bello',
    email: 'org@fastservices.ng',
    phone: '+2348098765432',
    password: 'org123',
    role: 'ORGANIZATION',
    createdAt: new Date().toISOString(),
  },
  'staff@fastservices.ng': {
    id: 'mock-staff',
    firstName: 'Chinedu',
    lastName: 'Okafor',
    email: 'staff@fastservices.ng',
    phone: '+2348035551212',
    password: 'staff123',
    role: 'STAFF',
    createdAt: new Date().toISOString(),
  },
  'customer@fastservices.ng': {
    id: 'mock-customer',
    firstName: 'Ngozi',
    lastName: 'Nwosu',
    email: 'customer@fastservices.ng',
    phone: '+2348027654321',
    password: 'customer123',
    role: 'CUSTOMER',
    createdAt: new Date().toISOString(),
  },
};

const loadMockUsers = (): Record<string, any> => {
  try {
    const raw = localStorage.getItem(MOCK_STORAGE_KEY);
    if (!raw) return { ...defaultMockUsers };
    const parsed = JSON.parse(raw);
    return { ...defaultMockUsers, ...parsed };
  } catch (e) {
    return { ...defaultMockUsers };
  }
};

const saveMockUsers = (users: Record<string, any>) => {
  try {
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.warn('Failed to persist mock users', e);
  }
};

const mockStore: { users: Record<string, any> } = { users: loadMockUsers() };

// --- Auth API ---
export const authAPI = {
  login: async (email: string, password: string) => {
    try {
      if (USE_MOCK) {
        const key = email.toLowerCase();
        const userRecord = mockStore.users[key];
        if (!userRecord) throw new Error('Account not found. Please register first.');
        if (userRecord.password !== password) throw new Error('Invalid email or password. Please check your credentials and try again.');

        return {
          accessToken: 'mock-jwt-token-' + Date.now(),
          user: {
            id: userRecord.id,
            firstName: userRecord.firstName,
            lastName: userRecord.lastName,
            email: userRecord.email,
            phone: userRecord.phone,
            createdAt: userRecord.createdAt,
          },
          role: userRecord.role,
        };
      }

      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const message = await parseBackendMessage(res);
        throw new Error(message);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to the server. Please make sure the backend server is running and try again.');
      }
      throw error;
    }
  },

  register: async (userData: { firstName: string; lastName: string; email: string; password: string; phone: string; role: string }) => {
    try {
      const lowerEmail = userData.email.toLowerCase();

      if (USE_MOCK) {
        if (mockStore.users[lowerEmail]) {
          throw new Error('Email already registered. Please use a different email address.');
        }

        const id = 'mock-' + Date.now();
        const newUser = {
          id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: lowerEmail,
          phone: userData.phone,
          password: userData.password,
          role: userData.role,
          createdAt: new Date().toISOString(),
        };

        mockStore.users[lowerEmail] = newUser;
        saveMockUsers(mockStore.users);

        return {
          accessToken: 'mock-jwt-token-' + Date.now(),
          user: {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone,
            createdAt: newUser.createdAt,
          },
          role: newUser.role,
        };
      }

      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const message = await parseBackendMessage(res);
        throw new Error(message);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
};

// --- User API ---
export const userAPI = {
  getUserById: async (id: string) => {
    const res = await authenticatedFetch(`/api/users/${id}`);
    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || 'Failed to fetch user');
    }
    return res.json();
  },

  updateUser: async (id: string, userData: Partial<User>) => {
    const res = await authenticatedFetch(`/api/users/${id}`, { method: 'PUT', body: JSON.stringify(userData) });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || 'Failed to update user');
    }
    return res.json();
  },

  getAllUsers: async () => {
    if (USE_MOCK) {
      // Return mockStore users in the shape expected by the UI
      return Object.values(mockStore.users).map(u => ({
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        phone: u.phone,
        roles: [u.role],
        createdAt: u.createdAt,
      }));
    }

    const res = await authenticatedFetch(`/api/users`);
    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || `Failed to fetch users: ${res.status}`);
    }
    return res.json();
  },

  deleteUser: async (id: string) => {
    const res = await authenticatedFetch(`/api/users/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || 'Failed to delete user');
    }
    return res;
  },
};

// --- Organization API ---
export const organizationAPI = {
  getAllOrganizations: async () => {
    const res = await fetch(`${API_URL}/api/organizations`);
    if (!res.ok) throw new Error('Failed to fetch organizations');
    return res.json();
  },

  getOrganizationById: async (id: string) => {
    const res = await fetch(`${API_URL}/api/organizations/${id}`);
    if (!res.ok) throw new Error('Failed to fetch organization');
    return res.json();
  },

  registerOrganization: async (orgData: { name: string; address: string; contactEmail: string; contactPhone: string; password: string }) => {
    if (USE_MOCK) {
      const lowerEmail = orgData.contactEmail.toLowerCase();
      if (mockStore.users[lowerEmail]) throw new Error('Email already registered. Please use a different email address.');
      const id = 'mock-org-' + Date.now();
      const newUser = {
        id,
        firstName: orgData.name,
        lastName: 'Organization',
        email: lowerEmail,
        phone: orgData.contactPhone,
        password: orgData.password,
        role: 'ORGANIZATION',
        createdAt: new Date().toISOString(),
      };
      mockStore.users[lowerEmail] = newUser;
      saveMockUsers(mockStore.users);
      return {
        accessToken: 'mock-jwt-token-' + Date.now(),
        user: {
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          phone: newUser.phone,
          createdAt: newUser.createdAt,
        },
        role: newUser.role,
      };
    }

    const res = await fetch(`${API_URL}/api/organizations/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(orgData) });
    if (!res.ok) {
      const msg = await parseBackendMessage(res);
      throw new Error(msg);
    }
    return res.json();
  },

  deleteOrganization: async (id: string) => {
    const res = await authenticatedFetch(`/api/organizations/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete organization');
    return res;
  },
};

// --- Offering API ---
export const offeringAPI = {
  getAllOfferings: async () => {
    const res = await fetch(`${API_URL}/api/offerings`);
    if (!res.ok) throw new Error('Failed to fetch offerings');
    return res.json();
  },

  getOfferingById: async (id: string) => {
    const res = await fetch(`${API_URL}/api/offerings/${id}`);
    if (!res.ok) throw new Error('Failed to fetch offering');
    return res.json();
  },

  getOfferingsByOrganization: async (organizationId: string) => {
    const res = await fetch(`${API_URL}/api/offerings/organization/${organizationId}`);
    if (!res.ok) throw new Error('Failed to fetch offerings');
    return res.json();
  },

  createOffering: async (offeringData: any) => {
    const res = await authenticatedFetch(`/api/offerings`, { method: 'POST', body: JSON.stringify(offeringData) });
    if (!res.ok) throw new Error('Failed to create offering');
    return res.json();
  },

  updateOffering: async (id: string, offeringData: any) => {
    const res = await authenticatedFetch(`/api/offerings/${id}`, { method: 'PUT', body: JSON.stringify(offeringData) });
    if (!res.ok) throw new Error('Failed to update offering');
    return res.json();
  },

  deleteOffering: async (id: string) => {
    const res = await authenticatedFetch(`/api/offerings/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete offering');
    return res;
  },
};

// --- Queue API ---
export const queueAPI = {
  getAllQueues: async () => {
    const res = await fetch(`${API_URL}/api/queues`);
    if (!res.ok) throw new Error('Failed to fetch queues');
    return res.json();
  },

  getQueueById: async (id: string) => {
    const res = await fetch(`${API_URL}/api/queues/${id}`);
    if (!res.ok) throw new Error('Failed to fetch queue');
    return res.json();
  },

  getQueuesByOrganization: async (organizationId: string) => {
    const res = await fetch(`${API_URL}/api/queues/organization/${organizationId}`);
    if (!res.ok) throw new Error('Failed to fetch queues');
    return res.json();
  },

  createQueue: async (queueData: any) => {
    const res = await authenticatedFetch(`/api/queues`, { method: 'POST', body: JSON.stringify(queueData) });
    if (!res.ok) throw new Error('Failed to create queue');
    return res.json();
  },

  updateQueue: async (id: string, queueData: any) => {
    const res = await authenticatedFetch(`/api/queues/${id}`, { method: 'PUT', body: JSON.stringify(queueData) });
    if (!res.ok) throw new Error('Failed to update queue');
    return res.json();
  },

  deleteQueue: async (id: string) => {
    const res = await authenticatedFetch(`/api/queues/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete queue');
    return res;
  },
};

// --- Appointment API ---
export const appointmentAPI = {
  getAllAppointments: async () => {
    const res = await authenticatedFetch(`/api/appointments`);
    if (!res.ok) throw new Error('Failed to fetch appointments');
    return res.json();
  },

  getAppointmentById: async (id: string) => {
    const res = await authenticatedFetch(`/api/appointments/${id}`);
    if (!res.ok) throw new Error('Failed to fetch appointment');
    return res.json();
  },

  getAppointmentsByCustomer: async (customerId: string) => {
    const res = await authenticatedFetch(`/api/appointments/customer/${customerId}`);
    if (!res.ok) throw new Error('Failed to fetch appointments');
    return res.json();
  },

  getAppointmentsByOffering: async (offeringId: string) => {
    const res = await authenticatedFetch(`/api/appointments/offering/${offeringId}`);
    if (!res.ok) throw new Error('Failed to fetch appointments');
    return res.json();
  },

  getAppointmentsByQueue: async (queueId: string) => {
    const res = await authenticatedFetch(`/api/appointments/queue/${queueId}`);
    if (!res.ok) throw new Error('Failed to fetch appointments');
    return res.json();
  },

  createAppointment: async (appointmentData: any) => {
    const res = await authenticatedFetch(`/api/appointments`, { method: 'POST', body: JSON.stringify(appointmentData) });
    if (!res.ok) throw new Error('Failed to create appointment');
    return res.json();
  },

  updateAppointment: async (id: string, appointmentData: any) => {
    const res = await authenticatedFetch(`/api/appointments/${id}`, { method: 'PUT', body: JSON.stringify(appointmentData) });
    if (!res.ok) throw new Error('Failed to update appointment');
    return res.json();
  },

  deleteAppointment: async (id: string) => {
    const res = await authenticatedFetch(`/api/appointments/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete appointment');
    return res;
  },
};