import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrUpdateCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const {
    isPending: isCreating,
    mutate: createCabin,
    mutateAsync: createCabinAsync,
  } = useMutation({
    mutationFn: newCabin => createOrUpdateCabin(newCabin),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      toast.success('New cabin created successfully!');
    },
    onError: err => {
      console.error(err);
      toast.error(err.message || 'New cabin could not be created!');
    },
  });
  return { isCreating, createCabin, createCabinAsync };
}
