import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      console.log('Signup successful:', data);
      toast.success(
        'Signup successful! Please check your email to confirm your account.'
      );
    },
    onError: (error) => {
      toast.error('Signup failed: ' + error.message);
      console.error('Signup error:', error);
    },
  });
  return { signup, isLoading };
}
