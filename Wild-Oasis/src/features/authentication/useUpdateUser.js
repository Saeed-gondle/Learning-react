import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('user updated successfully!');
    },
    onError: () => {
      toast.error('user could not be updated!');
    },
  });
  return { isUpdating, updateUser };
}
