import { useNavigate } from 'react-router-dom';
import { useGeolocation } from '../hooks/useGeolocation';
import styles from './Map.module.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useCities } from '../contexts/CitiesContext';
import { useEffect, useState } from 'react';
import Button from './Button';
import { useUrlPosition } from '../hooks/useUrlPositiion';
import User from './User';
import { useAuth } from '../contexts/authContext';
function Map() {
  const [mapPosition, setMapPostition] = useState([40.73061, -73.935242]);
  const [lat, lng, setSearchParams] = useUrlPosition();
  const { cities } = useCities();
  const { isAuthenticated } = useAuth();
  const {
    isLoading: isLoadingPosition,
    getPosition,
    position: geoLocationPosition,
  } = useGeolocation();
  useEffect(() => {
    if (lat && lng) {
      setMapPostition([parseFloat(lat), parseFloat(lng)]);
    }
  }, [lat, lng]);
  useEffect(() => {
    if (geoLocationPosition) {
      setMapPostition([geoLocationPosition.lat, geoLocationPosition.lng]);
      setSearchParams('');
    }
  }, [geoLocationPosition]);
  return (
    <div className={styles.mapContainer}>
      
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use my position'}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(city => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>
                  {city.name} {city.emoji}
                </span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: e => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
export default Map;
