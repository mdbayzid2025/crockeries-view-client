
import styles from './Sidebar.module.css';
import SidebarHeader from './Sidebar/SidebarHeader';
import SidebarMenu from './Sidebar/SidebarMenu';

import ThemeToggle from './ThemeToggle';

const Sidebar = ({ isOpen, toggleSidebar, setIsClose, isClose } : any) => {
 
  return (
    <nav className={`${styles.sidebar} ${isClose ? styles.hide : styles.show} ${!isOpen ? styles.close : ''}`}>
      <SidebarHeader isOpen={isOpen} setIsClose={setIsClose} isClose={isClose} toggleSidebar={toggleSidebar} />
      <div className={styles.menuBar}>
        <SidebarMenu isOpen={isOpen}  setIsClose={setIsClose} isClose={isClose}/>
        <ThemeToggle  />
        
      </div>
    </nav>
  );
};

export default Sidebar;