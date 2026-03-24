import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, options }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...options,
      }),
    onSuccess: (data) => {
      toast.success(`Guest ${data.id} checked in successfully`);
      queryClient.invalidateQueries({
        queryKey: ['booking', data.id],
      });
      queryClient.invalidateQueries({ active: true });
      navigate('/dashboard');
    },
    onError: (err) => {
      console.error(err);
      toast.error(`${err.message} Failed to check in guest`);
    },
  });
  return { checkin, isCheckingIn };
}
