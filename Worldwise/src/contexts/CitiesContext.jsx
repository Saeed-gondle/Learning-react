import { useCallback } from 'react';
import { createContext, useEffect, useContext, useReducer } from 'react';
const BASE_URL = 'http://localhost:8000';
const CitiesContext = createContext();
function CitiesProvider({ children }) {
  const initialState = {
    cities: [],
    isLoading: true,
    currentCity: {},
    error: '',
  };
  function reducer(state, action) {
    switch (action.type) {
      case 'loading':
        return { ...state, isLoading: action.payload };
      case 'cities/loaded':
        return { ...state, cities: action.payload, isLoading: false };
      case 'city/loaded':
        return { ...state, currentCity: action.payload, isLoading: false };
      case 'city/created':
        return {
          ...state,
          isLoading: false,
          cities: [...state.cities, action.payload],
        };
      case 'city/deleted':
        return {
          ...state,
          isLoading: false,
          cities: state.cities.filter(city => city.id !== action.payload),
        };
      case 'rejected':
        return {
          ...state,
          ...action.payload,
          isLoading: false,
          error: action.payload,
        };
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [currentCity, setCurrentCity] = useState({});
  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: 'loading', payload: true });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch (err) {
        dispatch({
          type: 'rejected',
          payload: 'error while fetching Cities 🤔',
        });
      }
    }

    fetchCities();
  }, []);
  const getCurrentCity = useCallback(async function (id) {
    if (currentCity.id === id) return;
    dispatch({ type: 'loading', payload: true });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: 'city/loaded', payload: data });
    } catch (err) {
      dispatch({ type: 'rejected', payload: 'error while fetching City 🤔' });
    }
  }, [currentCity.id]);
  async function createCity(city) {
    try {
      dispatch({ type: 'loading', payload: true });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(city),
      });
      const data = await res.json();
      dispatch({ type: 'city/created', payload: data });
    } catch (err) {
      dispatch({ type: 'rejected', payload: 'error while creating City 🤔' });
    }
  }
  async function deleteCity(id) {
    try {
      dispatch({ type: 'loading' });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'city/deleted', payload: id });
    } catch (err) {
      dispatch({ type: 'rejected', payload: 'error while deleting City 🤔' });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        createCity,
        getCurrentCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error('useCities must be used within a CitiesProvider');
  }
  return context;
}
export { CitiesProvider, CitiesContext, useCities };
