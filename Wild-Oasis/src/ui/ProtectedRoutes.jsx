import { useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useEffect } from 'react';

function ProtectedRoutes({ children }) {
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login');
  }, [isAuthenticated, isLoading, navigate]);
  if (isLoading) {
    return <Spinner />;
  }
  if (isAuthenticated) return children;
}

export default ProtectedRoutes;
