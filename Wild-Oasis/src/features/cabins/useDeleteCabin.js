import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success('Cabin deleted successfully!');
      // Invalidate or refetch cabin data here if needed
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: err => toast.error(err.message, { type: 'error' }),
  });
  return { isDeleting, deleteCabin };
}
