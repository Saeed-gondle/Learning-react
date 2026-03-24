import TableOperaions from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
function CabinTableOperations() {
  return (
    <div>
      <TableOperaions>
        <Filter
          filterField='discount'
          options={[
            {
              value: 'all',
              label: 'All',
            },
            {
              value: 'no-discount',
              label: 'No Discount',
            },
            {
              value: 'with-discount',
              label: 'With Discount',
            },
          ]}
        ></Filter>
        <SortBy
          options={[
            { value: 'name-asc', label: 'Name (A-Z)' },
            { value: 'name-desc', label: 'Name (Z-A)' },
            {
              value: 'regularPrice-asc',
              label: 'Price (Low to High)',
            },
            {
              value: 'regularPrice-desc',
              label: 'Price (High to Low)',
            },
            {
              value: 'maxCapacity-desc',
              label: 'Capacity (High to Low)',
            },
            {
              value: 'maxCapacity-asc',
              label: 'Capacity (Low to High)',
            },
          ]}
        />
      </TableOperaions>
    </div>
  );
}

export default CabinTableOperations;
