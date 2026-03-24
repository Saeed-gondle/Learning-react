// import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Empty from '../../ui/Empty';

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;
function CabinTable() {
  const { cabins, isPending } = useCabins();
  const [searchParams] = useSearchParams();
  if (isPending) return <Spinner />;
  if (cabins.length === 0) return <Empty resourceName='cabins' />;

  // Filtering logic
  const filterValue = searchParams.get('discount') || 'all';
  let filteredCabins;
  if (filterValue === 'with-discount') {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  } else if (filterValue === 'no-discount') {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  } else {
    filteredCabins = cabins;
  }

  // Sorting Logic
  const sortValue = searchParams.get('sort') || '';
  const [field, order] = sortValue.split('-');
  console.log('Sorting by:', field, 'Order:', order);
  let sortedCabins = [...filteredCabins];
  const modifier = order === 'asc' ? 1 : -1;
  sortedCabins.sort((a, b) => (a[field] - b[field]) * modifier);

  return (
    <div>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          {/* <div>Actions</div> */}
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => (
            <CabinRow key={cabin.id} cabin={cabin} />
          )}
        />
      </Table>
    </div>
  );
}
export default CabinTable;
