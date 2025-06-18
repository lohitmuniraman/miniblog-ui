import api from '@config/api';
import { AuthCredentials, User } from '@type/auth';

export const loginUser = async (credentials: AuthCredentials): Promise<User | null> => {
  try {
    const response = await api.post('/login', credentials);
    const { token, user } = response.data;
    localStorage.setItem('authToken', token);
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (credentials: AuthCredentials): Promise<User | null> => {
  try {
    const response = await api.post('/register', credentials);
    const { user } = response.data;
    return user;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const logoutUser = (): void => {
  localStorage.removeItem('authToken');
};

export const getProfile = async () => {
  try {
    const response = await api.get('/profile')
    return response.data
  } catch (error) {
    console.error('Get profile error:', error);
    throw error;
  }
}

export const getAllUsers = async () => {
  try {
    const response = await api.get('/userList')
    return response.data
  } catch (error) {
    console.error('Get all users error:', error);
    throw error;
  }
}

export const checkAuthStatus = async (): Promise<User | null> => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  }
  try {
    // You might have an endpoint to validate the token and get user data
    const response = await api.get('/auth/me');
    return response.data.user;
  } catch (error) {
    console.error('Token validation failed:', error);
    localStorage.removeItem('authToken');
    return null;
  }
};