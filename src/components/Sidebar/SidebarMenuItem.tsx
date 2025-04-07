import { Link } from 'react-router-dom';
import styles from './SidebarMenuItem.module.css';

const SidebarMenuItem = ({ icon, link, text, isOpen }) => {
  return (
    <li key={text} className={styles.navLink}>
    <Link 
      to={link} 
      className={`${styles.link} ${location.pathname === link ? styles.active : ''}`}
    >
      <i className={`${icon} ${styles.icon}`}></i>
      {isOpen && <span className={styles.text}>{text}</span>}
    </Link>
  </li>
  );
};

export default SidebarMenuItem;