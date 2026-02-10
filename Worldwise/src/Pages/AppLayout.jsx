import AppNav from '../components/AppNav';
import SideBar from '../components/SideBar';
import styles from './AppLayout.module.css';
import Map from '../components/Map';
import { useEffect } from 'react';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import User from '../components/User';
function AppLayout() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  useEffect;
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
