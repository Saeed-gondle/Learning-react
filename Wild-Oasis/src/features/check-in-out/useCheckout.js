import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),
    onSuccess: (data) => {
      toast.success(`Guest ${data.id} checked out successfully`);
      queryClient.invalidateQueries({
        queryKey: ['booking', data.id],
      });
      queryClient.invalidateQueries({ active: true });
      navigate('/dashboard');
    },
    onError: (err) => {
      console.error(err);
      toast.error(`${err.message} Failed to check out guest`);
    },
  });
  return { checkout, isCheckingOut };
}
