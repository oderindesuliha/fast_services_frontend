import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { authAPI } from '../services/api';

// Define the new role hierarchy
export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ORG_ADMIN = 'ORG_ADMIN',
  STAFF = 'STAFF',
  CUSTOMER = 'CUSTOMER'
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  role: Role | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<Role | null>;
  logout: () => void;
  register: (userData: any) => Promise<any>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Function to decode JWT token and extract role
const decodeToken = (token: string): { role: Role } |null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    const payload = JSON.parse(jsonPayload);
    console.log('Decoded JWT payload:', payload); // Debug log
    
    // Map backend role to frontend Role enum
    let mappedRole;
    if (Array.isArray(payload.roles)) {
      // If roles is an array (from Set<Role> in backend)
      const backendRole = payload.roles[0]; // Get first role
      console.log('Backend role from array:', backendRole);
      switch (backendRole) {
        case 'SUPER_ADMIN':
          mappedRole = Role.SUPER_ADMIN;
          break;
        case 'ORGANIZATION':
          mappedRole = Role.ORG_ADMIN;
          break;
        case 'STAFF':
          mappedRole = Role.STAFF;
          break;
        default:
          mappedRole = Role.CUSTOMER;
      }
    } else {
      // If role is a single string
      console.log('Backend role from string:', payload.role);
      switch (payload.role) {
        case 'SUPER_ADMIN':
          mappedRole = Role.SUPER_ADMIN;
          break;
        case 'ORGANIZATION':
          mappedRole = Role.ORG_ADMIN;
          break;
        case 'STAFF':
          mappedRole = Role.STAFF;
          break;
        default:
          mappedRole = Role.CUSTOMER;
      }
    }
    console.log('Mapped to frontend role:', mappedRole);
    return { role: mappedRole };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = sessionStorage.getItem('token');
      const storedUser = sessionStorage.getItem('user');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        
        // Decode token to get role
        const decoded = decodeToken(storedToken);
        if (decoded) {
          setRole(decoded.role);
        }
      }
    } catch (error) {
      console.error("Failed to parse user data from session storage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<Role | null> => {
    setIsLoading(true);
    try {
      // Call the real API for login
      const response = await authAPI.login(email, password);
      const { accessToken, user: userData, role: backendRole } = response;
      
      console.log('Login response:', response); // Debug log
      
      // Map the role string directly from the response
      let userRole: Role;
      switch (backendRole) {
        case 'SUPER_ADMIN':
          userRole = Role.SUPER_ADMIN;
          break;
        case 'ORGANIZATION':
          userRole = Role.ORG_ADMIN;
          break;
        case 'STAFF':
          userRole = Role.STAFF;
          break;
        default:
          userRole = Role.CUSTOMER;
      }
      
      console.log('Mapped role:', userRole); // Debug log
      
      // Create a user object from the response
      const userRoleForUser: UserRole = userRole === Role.SUPER_ADMIN ? UserRole.SUPER_ADMIN :
        userRole === Role.ORG_ADMIN ? UserRole.ORG_ADMIN :
        userRole === Role.STAFF ? UserRole.STAFF : UserRole.CUSTOMER;

      const user: User = {
        id: userData.id || 'temp-id',
        firstName: userData.firstName || 'Unknown',
        lastName: userData.lastName || 'User',
        email: userData.email || email,
        phone: userData.phone || '',
        roles: [userRoleForUser],
        createdAt: userData.createdAt || new Date().toISOString()
      };
      
      setUser(user);
      setToken(accessToken);
      setRole(userRole);
      sessionStorage.setItem('token', accessToken);
      sessionStorage.setItem('user', JSON.stringify(user));

      // return the mapped role so callers can act immediately
      return userRole;
    } catch (error: any) {
      console.error("Login failed:", error);
      // Re-throw the original error so UI shows the most accurate message from the API or mock
      throw error;
    } finally {
      setIsLoading(false);
    }
 }, []);
  
  const logout = useCallback(async () => {
    setUser(null);
    setToken(null);
    setRole(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }, []);

  const register = useCallback(async (userData: any) => {
    try {
      // Map the role from the newsystem to what the backend expects
    // normalize email and role string handling so callers can pass either Role enum or UserRole string
    const roleInput = (userData.role || '').toString().toUpperCase();
    const mappedUserData = {
      ...userData,
      email: (userData.email || '').toString().toLowerCase(),
      // Map frontend role values (either Role enum or UserRole string) to backend expected strings
      role: roleInput === 'SUPER_ADMIN' ? 'SUPER_ADMIN' :
        roleInput === 'ORG_ADMIN' || roleInput === 'ORGANIZATION' ? 'ORGANIZATION' :
        roleInput === 'STAFF' ? 'STAFF' :
        'CUSTOMER'
    };
      
      const response = await authAPI.register(mappedUserData);

      // If backend returned an accessToken, delegate to login flow (real backend)
      if (response && response.accessToken) {
        // Use the normalized email when delegating to login so casing mismatches don't cause failures
        await login(mappedUserData.email, userData.password);
        return { success: true, data: response };
      }

      // If register returned a user object but no token, assume mock registration succeeded.
      // The mock register returns a created user object (without token). Create a mock
      // authenticated session so the app continues as if logged in.
      if (response && response.email) {
        const backendRole = response.role || mappedUserData.role;
        let userRole: Role;
        switch (backendRole) {
          case 'SUPER_ADMIN':
            userRole = Role.SUPER_ADMIN;
            break;
          case 'ORGANIZATION':
            userRole = Role.ORG_ADMIN;
            break;
          case 'STAFF':
            userRole = Role.STAFF;
            break;
          default:
            userRole = Role.CUSTOMER;
        }

        const mockToken = 'mock-jwt-token-' + Date.now();
        const userRoleForUser: UserRole = userRole === Role.SUPER_ADMIN ? UserRole.SUPER_ADMIN :
          userRole === Role.ORG_ADMIN ? UserRole.ORG_ADMIN :
          userRole === Role.STAFF ? UserRole.STAFF : UserRole.CUSTOMER;

        const createdUser: User = {
          id: response.id || 'mock-' + Date.now(),
          firstName: response.firstName || userData.firstName || 'Unknown',
          lastName: response.lastName || userData.lastName || 'User',
          email: response.email,
          phone: response.phone || userData.phone || '',
          roles: [userRoleForUser],
          createdAt: response.createdAt || new Date().toISOString()
        };

        setUser(createdUser);
        setToken(mockToken);
        setRole(userRole);
        sessionStorage.setItem('token', mockToken);
        sessionStorage.setItem('user', JSON.stringify(createdUser));

        return { success: true, data: response };
      }

      return { success: true, data: response };
    } catch (error: any) {
      console.error("Registration failed:", error);
      throw error;
    }
  }, [login]);


  const authContextValue: AuthContextType = {
    user,
    token,
    role,
    isAuthenticated: !!token,
    isLoading,
    login,
   logout,
    register
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};