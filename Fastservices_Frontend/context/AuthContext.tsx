
import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { User, UserRole } from '../types';

// Mock API functions for demonstration
// FIX: Updated mockLogin to return user data based on role for a better demo experience.
const mockLogin = async (email: string, role: UserRole): Promise<{ token: string; user: User }> => {
    console.log(`Logging in ${email} as ${role}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let user: User;

    switch(role) {
        case UserRole.ADMIN:
            user = {
                id: '1',
                firstName: 'Admin',
                lastName: 'User',
                email: email,
                phone: '111-222-3333',
                role: role,
                createdAt: new Date().toISOString()
            };
            break;
        case UserRole.ORGANIZATION:
            user = {
                id: '2',
                firstName: 'Folake',
                lastName: 'Adekunle',
                email: email,
                phone: '444-555-6666',
                role: role,
                createdAt: new Date().toISOString()
            };
            break;
        case UserRole.CUSTOMER:
        default:
             user = {
                id: '3',
                firstName: 'Chidi',
                lastName: 'Okoro',
                email: email,
                phone: '777-888-9999',
                role: role,
                createdAt: new Date().toISOString()
            };
            break;
    }

    return { token: `mock-jwt-token-for-${role}`, user };
};

const mockLogout = async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
};

interface AuthContextType {
  user: User | null;
  token: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role: UserRole) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<any>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = sessionStorage.getItem('token');
      const storedUser = sessionStorage.getItem('user');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user data from session storage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, role: UserRole) => {
    setIsLoading(true);
    try {
        const { token, user } = await mockLogin(email, role);
        setUser(user);
        setToken(token);
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    } finally {
        setIsLoading(false);
    }
  }, []);
  
  const logout = useCallback(async () => {
    await mockLogout();
    setUser(null);
    setToken(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }, []);

  const register = useCallback(async (userData: any) => {
    console.log("Registering user:", userData);
    await new Promise(resolve => setTimeout(resolve, 500));
    // Simulate registration and login
    await login(userData.email, userData.role);
    return { success: true };
  }, [login]);


  const authContextValue: AuthContextType = {
    user,
    token,
    role: user?.role || null,
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
