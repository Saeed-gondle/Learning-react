import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: login,
    isLoading,
    error,
  } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      toast.success('Login successful');
      // queryClient.setQueryData(['user'], user);
      queryClient.setQueriesData(['user'], (old) => ({
        ...old,
        role: user.role,
      }));
      navigate('/dashboard', { replace: true });
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || 'Login failed');
    },
  });
  return { login, isLoading, error };
}
