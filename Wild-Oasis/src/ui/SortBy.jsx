import Select from './Select';
import { useSearchParams } from 'react-router-dom';
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortby = searchParams.get('sort') || '';
  function handleChange(e) {
    searchParams.set('sort', e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      value={sortby}
      onChange={handleChange}
    />
  );
}

export default SortBy;
