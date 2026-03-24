import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateSetting } from '../../services/apiSettings';

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateSettings } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast.success('Settings updated successfully!');
    },
    onError: () => {
      toast.error('Settings could not be updated!');
    },
  });
  return { isUpdating, updateSettings };
}
