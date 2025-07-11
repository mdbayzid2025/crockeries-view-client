
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.css';
import MobileHeader from '../components/MobileHeader/MobileHeader';
import { useState } from 'react';


const MainLayout = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isClose, setIsClose] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
  
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
  
    const toggleMode = () => {
      setDarkMode(!darkMode);
      document.body.classList.toggle('dark');
    };
  

    console.log('isClose', isClose)
  return (
    <div>
    <div className={styles.sidebarContainer}>    
        <Sidebar 
        isOpen={isOpen}         
        toggleSidebar={toggleSidebar}
        darkMode={darkMode}
        toggleMode={toggleMode}
        setIsClose={setIsClose}
        isClose={isClose}
        />        
        </div>
        <div className={styles.MobileHeader}>
          <MobileHeader isClose={isClose} setIsClose={setIsClose}/>        
        </div>
        <div className={styles.content}>          
            <Outlet />
        </div>
    </div>
  )
}

export default MainLayout