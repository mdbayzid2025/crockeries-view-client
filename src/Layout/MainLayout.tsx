import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

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
        <div  style={{ marginLeft: '250px', padding: '20px' }}>
            <Outlet />
        </div>
    </div>
  )
}

export default MainLayout