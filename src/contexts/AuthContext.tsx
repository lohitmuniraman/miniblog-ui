import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { loginUser, registerUser, logoutUser, checkAuthStatus } from '@services/authService';
import { AuthCredentials, User } from '@type/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (credentials: AuthCredentials) => Promise<boolean>;
  register: (credentials: AuthCredentials) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Indicate initial auth check

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await checkAuthStatus(); // Check token/session
        if (currentUser) {
          setIsAuthenticated(true);
          setUser(currentUser);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to check auth status:", error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (credentials: AuthCredentials) => {
    setLoading(true);
    try {
      const loggedInUser = await loginUser(credentials);
      if (loggedInUser) {
        setIsAuthenticated(true);
        setUser(loggedInUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      setIsAuthenticated(false);
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: AuthCredentials) => {
    setLoading(true);
    try {
      const newUser = await registerUser(credentials);
      console.log("newUser: ", newUser);
      if (newUser) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Registration failed:", error);
      setIsAuthenticated(false);
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutUser(); // Clear token/session
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
