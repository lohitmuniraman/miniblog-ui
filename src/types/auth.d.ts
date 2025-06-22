export interface User {
  userId: string;
  email: string;
  username: string;
  name: string;
  isAdmin?: boolean;
  resetPassword?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
  name?: string;
  username?: string;
  isAdmin?: boolean;
}