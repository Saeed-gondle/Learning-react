import { Outlet } from 'react-router-dom';
import AppNav from './AppNav';
import Logo from './Logo';
import styles from './SideBar.module.css';
function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Worldwise Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default SideBar;
