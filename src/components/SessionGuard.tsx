import React, { Suspense } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import AuthLoader from './AuthLoader';

interface SessionGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export const SessionGuard: React.FC<SessionGuardProps> = ({
  children,
  requireAuth = true,
  redirectTo = '/login'
}) => {
  const { isLoading, isInitialized, user } = useAuth();
  const location = useLocation();

  // Show nothing until auth is initialized
  if (!isInitialized) {
    return null;
  }

  // Show loading spinner while checking auth state
  if (isLoading) {
    return <AuthLoader />;
  }

  // Handle authentication requirements
  if (requireAuth && !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Handle authenticated users trying to access auth pages
  if (!requireAuth && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Suspense fallback={<AuthLoader />}>{children}</Suspense>;
};

export default SessionGuard;