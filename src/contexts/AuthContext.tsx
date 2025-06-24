import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import {
  loginUser,
  registerUser,
  logoutUser,
  getAllUsers,
  checkAuthStatus,
  getProfile,
  resetPassword,
} from "@services/authService";
import { AuthCredentials, User } from "@type/auth";
import { ERROR_CODE } from "@constants/index";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (credentials: AuthCredentials) => Promise<{
    success: boolean;
    resetPassword?: boolean;
    isSuspended?: boolean;
    message?: string;
  }>;
  register: (credentials: AuthCredentials) => Promise<boolean>;
  logout: () => void;
  getCommunityUsers: () => Promise<User[]>;
  callResetPassword: (credentials: AuthCredentials) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Indicate initial auth check

  useEffect(() => {
    const isValid = checkAuthStatus();

    if (isValid) {
      setIsAuthenticated(true);
      getProfile()
        .then((profile) => {
          setUser(profile);
        })
        .catch(() => {
          setUser(null);
        });
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = async (credentials: AuthCredentials) => {
    setLoading(true);
    try {
      const { success, data } = await loginUser(credentials);
      switch (success) {
        case false: {
          if (data.errorCode === ERROR_CODE.USER_SUSPENDED) {
            return { success: false, isSuspended: true, message: data?.message };
          }
          if (data.errorCode === ERROR_CODE.RESET_PASSWORD) {
            return { success: false, resetPassword: true, message: data?.message };
          }
          if (data.errorCode === ERROR_CODE.INVALID_CREDENTIALS) {
            return { success: false, message: data?.message };
          }
          break;
        }
        case true: {
          localStorage.setItem("authToken", data.token);
          setIsAuthenticated(true);
          setUser(data.user);
          return { success: true };
        }
        default:
          return { success: false };
      }
      return { success: false };
    } catch (error) {
      console.error("Login failed:", error);
      setIsAuthenticated(false);
      setUser(null);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: AuthCredentials) => {
    setLoading(true);
    try {
      const newUser = await registerUser(credentials);
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

  const getCommunityUsers = async () => {
    try {
      const users = await getAllUsers();
      return users;
    } catch (error) {
      console.error("Failed to fetch community users:", error);
      throw error;
    }
  };

  const callResetPassword = async (credentials: AuthCredentials) => {
    try {
      const response = await resetPassword(credentials);
      return response;
    } catch (error) {
      console.error("Failed to fetch community users:", error);
      throw error;
    }
  };

  const logout = () => {
    logoutUser(); // Clear token/session
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        register,
        logout,
        getCommunityUsers,
        callResetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
