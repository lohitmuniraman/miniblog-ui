export interface User {
  userId: string;
  email: string;
  username: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
  username?: string;
}