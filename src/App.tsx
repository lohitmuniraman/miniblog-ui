import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Layouts
import MainLayout from '@layouts/MainLayout';
import AuthLayout from '@layouts/AuthLayout';

// Pages
import NotFoundPage from '@pages/NotFound';
import RegisterPage from '@pages/RegisterPage';
import LoginPage from '@pages/LoginPage';
import PostsPage from '@pages/PostsPage';
import ProfilePage from '@pages/ProfilePage';
import CommunityPage from '@pages/CommunityPage';
import PostDetails from '@pages/PostDetails';

// Components
import CreatePost from '@components/CreatePost';
import EditPost from '@components/EditPost';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading authentication...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      {/* Public Routes with AuthLayout */}
      <Route path="/" element={<AuthLayout />}>
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
        <Route path="posts" element={<PostsPage />} />
        <Route path="posts/:postId" element={<PostDetails />} />
        <Route path="create-post" element={<CreatePost />} />
        <Route path="edit-post/:postId" element={<EditPost />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="community" element={<CommunityPage />} />
      </Route>

      {/* Catch-all for 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;