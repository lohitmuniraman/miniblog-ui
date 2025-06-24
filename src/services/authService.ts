import api from '@config/api';
import { AuthCredentials, User } from '@type/auth';

export const loginUser = async (credentials: AuthCredentials): Promise<{ success: boolean, data: any }> => {
  try {
    const response = await api.post('/login', credentials);
    const { token, user } = response.data;
    return { success: true, data: { token, user } };
  } catch (error: any) {
    if (error.status === 400 || error.status === 403 || error.status === 404) { return { success: false, data: error.response.data } }
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

export const getProfile = async (): Promise<User> => {
  try {
    const response = await api.get('/user')
    return response.data
  } catch (error) {
    console.error('Get profile error:', error);
    throw error;
  }
}

export const getUser = async (userId: string = ""): Promise<User> => {
  try {
    const response = await api.get(`/user/${userId}`)
    return response.data
  } catch (error) {
    console.error('Get profile error:', error);
    throw error;
  }
}

export const updateUser = async (userData: User) => {
  try {
    const response = await api.patch(`/user`, userData);
    return response.data;
  } catch (error) {
    console.error('Update user error:', error);
    throw error;
  }
}

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get('/users')
    return response.data
  } catch (error) {
    console.error('Get all users error:', error);
    throw error;
  }
}

export const checkAuthStatus = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return null;
  } else {
    return true
  }
};

export const resetPassword = async (userCredentials: AuthCredentials) => {
  try {
    const response = await api.patch(`/reset-password`, userCredentials);
    return response.data;
  } catch (error) {
    console.error('Update user error:', error);
    throw error;
  }
}