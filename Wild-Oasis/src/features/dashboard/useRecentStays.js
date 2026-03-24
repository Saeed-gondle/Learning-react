import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '../../services/apiBookings';
import { subDays } from 'date-fns';

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get('last')
    ? 7
    : parseInt(searchParams.get('last'));
  const queryDate = subDays(new Date(), numDays).toISOString();
  const {
    data: stays,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['stays', `last-${numDays}-days`],
    queryFn: () => getStaysAfterDate(queryDate),
    keepPreviousData: true,
  });
  const confirmedStays = stays?.filter(
    (stay) =>
      stay.status === 'checked-in' || stay.status === 'checked-out'
  );
  return { stays, confirmedStays, error, isLoading, numDays };
}
