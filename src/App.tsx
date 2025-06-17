import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext'; // Custom auth hook

// Layouts
import MainLayout from '@layouts/MainLayout';
import AuthLayout from '@layouts/AuthLayout';

// Pages
import HomePage from '@pages/Home';
import NotFoundPage from '@pages/NotFound';
import RegisterPage from '@pages/RegisterPage';
import LoginPage from '@pages/LoginPage';
import DashboardPage from '@pages/DashboardPage';
import ProfilePage from '@pages/ProfilePage';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading authentication...</div>; // Or a dedicated LoadingSpinner component
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      {/* Public Routes with AuthLayout */}
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Private Routes with MainLayout */}
      <Route
        path="/app"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        {/* <Route index element={<DashboardPage />} /> */}
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
        {/* Add more private routes here */}
      </Route>

      {/* Catch-all for 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;