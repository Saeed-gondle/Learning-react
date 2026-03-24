import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrUpdateCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const {
    isPending: isEditing,
    mutate: updateCabin,
    mutateAsync: updateCabinAsync,
  } = useMutation({
    mutationFn: ({ newCabin, id }) => createOrUpdateCabin(newCabin, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      toast.success('cabin updated successfully!');
    },
    onError: () => {
      toast.error('cabin could not be updated!');
    },
  });
  return { isEditing, updateCabin, updateCabinAsync };
}
