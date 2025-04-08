import { Link, useLocation } from 'react-router-dom';
import styles from './SidebarMenuItem.module.css';


const SidebarMenuItem = ({ icon, link, text, isOpen }) => {
  const location = useLocation();

  // Enhanced path matching
  const isActive = location.pathname === link || (link !== '/' && location.pathname.startsWith(link));
  return (
    <li className={styles.navLink}>
      <Link 
        to={link} 
        className={`${styles.link} ${isActive ? styles.active : ''}`}
      >
        <i className={`${icon} ${styles.icon}`}></i>
        {isOpen && <span className={styles.text}>{text}</span>}
      </Link>
    </li>
  );
};

export default SidebarMenuItem;