import styles from './Sidebar.module.css';
import SidebarHeader from './Sidebar/SidebarHeader';
import SidebarMenu from './Sidebar/SidebarMenu';
// import SidebarHeader from './SidebarHeader';
// import SidebarMenu from './SidebarMenu';
import ThemeToggle from './ThemeToggle';

const Sidebar = ({ isOpen, toggleSidebar, darkMode, toggleMode }) => {
  return (
    <nav className={`${styles.sidebar} ${!isOpen ? styles.close : ''}`}>
      <SidebarHeader isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={styles.menuBar}>
        <SidebarMenu isOpen={isOpen} />
        <ThemeToggle darkMode={darkMode} toggleMode={toggleMode} />
      </div>
    </nav>
  );
};

export default Sidebar;