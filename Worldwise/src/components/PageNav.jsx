import { NavLink } from "react-router-dom";
import styles from './PageNav.module.css';
import Logo from './Logo';
import { useAuth } from "../contexts/authContext";
function PageNav() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/Pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/Product">Product</NavLink>
        </li>
        {/* <li>
          <NavLink to="/app">App</NavLink>
        </li> */}
        <li>
          <NavLink to="/login" className={styles.ctaLink} onClick={isAuthenticated ? logout : undefined}>
            {isAuthenticated ? 'Logout' : 'Login'}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
