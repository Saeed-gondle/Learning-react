import { NavLink } from 'react-router-dom';
import styles from './AppNav.module.css';
function AppNav() {
    return (
        <nav className={styles.nav}>
        <ul>
            <li>
                <NavLink to='cities' className={({isActive}) => isActive ? styles.active : undefined}>Cities</NavLink>
            </li>
            <li>
                <NavLink to='countries' className={({isActive}) => isActive ? styles.active : undefined}>Countries</NavLink>
            </li>
        </ul>
        </nav>
    )
}

export default AppNav
