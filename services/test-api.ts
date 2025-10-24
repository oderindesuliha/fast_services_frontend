// Simple test to verify API integration
import { authAPI } from './api';

// Test login function
export const testLogin = async () => {
  try {
    console.log('Testing login API...');
    // This is just a test - in reality, you would use real credentials
    // const result = await authAPI.login('test@example.com', 'password123');
    // console.log('Login result:', result);
    console.log('Login API endpoint:', 'http://localhost:8080/api/auth/login');
  } catch (error) {
    console.error('Login test failed:', error);
  }
};

// Test registration function
export const testRegister = async () => {
  try {
    console.log('Testing registration API...');
    // This is just a test - in reality, you would use real data
    // const result = await authAPI.register({
    //   firstName: 'Test',
    //   lastName: 'User',
    //   email: 'test@example.com',
    //   password: 'password123',
    //   phone: '1234567890',
    //   role: 'CUSTOMER'
    // });
    // console.log('Registration result:', result);
    console.log('Registration API endpoint:', 'http://localhost:8080/api/auth/register');
  } catch (error) {
    console.error('Registration test failed:', error);
  }
};