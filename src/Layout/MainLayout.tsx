import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.css';


const MainLayout = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
  
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
  
    const toggleMode = () => {
      setDarkMode(!darkMode);
      document.body.classList.toggle('dark');
    };
  
  return (
    <div>
        <Sidebar 
        isOpen={isOpen} 
        toggleSidebar={toggleSidebar}
        darkMode={darkMode}
        toggleMode={toggleMode}
        />
        <div className={styles.content}  style={{padding: '20px' }}>
            <Outlet />
        </div>
    </div>
  )
}

export default MainLayout