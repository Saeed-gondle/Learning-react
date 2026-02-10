import { useCities } from '../contexts/CitiesContext';
import styles from './CityList.module.css';
import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';

function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (cities.length === 0)
    return <Message message="Add your first city on the map" />;
  return (
    <ul className={styles.cityList}>
      {cities.map(city => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
