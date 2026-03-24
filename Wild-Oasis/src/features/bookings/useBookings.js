import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  // FIlter
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue, method: 'eq' };

  // Sort
  const sortValue = searchParams.get('sort') || 'startDate-desc';
  const [field, direction] = sortValue.split('-');
  const sortBy = sortValue ? { field, direction } : null;

  // Pagination
  const page = Number(searchParams?.get('page')) || 1;
  const { data: { data: bookings, count } = {}, isLoading } =
    useQuery({
      queryKey: ['bookings', filter, sortBy, page],
      queryFn: () =>
        getBookings({
          filter,
          sortBy,
          page,
        }),
    });
  // Prefetch next page
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }
  return { bookings, isLoading, count };
}
