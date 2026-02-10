
import { useCities } from '../contexts/CitiesContext';
import styles from './CountryList.module.css';
import Spinner from './Spinner';
import CountryItem from './CountryItem';
import Message from './Message';
function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (cities.length === 0)
    return <Message message="Add your first city on the map" />;

  const countries = cities.reduce((arr, city) => {
    if (!arr.map(c => c.city).includes(city.country)) {
      return [
        ...arr,
        {
          country: city.country,
          emoji: city.emoji,
          countryName: city.countryName,
        },
      ];
    } else {
      return arr;
    }
  }, []);
  //
  return (
    <ul className={styles.countryList}>
      {countries.map(country => (
        <CountryItem country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
