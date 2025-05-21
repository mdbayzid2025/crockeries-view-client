import { useEffect, useState } from 'react';
import styles from './SidebarMenu.module.css';
import SidebarMenuItem from './SidebarMenuItem';
import { useShop } from '../../app/Context/ShopContext';
import { useSelector } from 'react-redux';



const menuItems = [
  { name: 'dashboard', icon: 'bx bx-grid-alt', text: 'Dashboard', path: '/dashboard', authRequired: true },
  { name: 'order', icon: 'bx bx-receipt', text: 'Order', path: '/order', authRequired: true },
  { name: 'customers', icon: 'bx bx-user', text: 'Customers', path: '/customers', authRequired: true },
  { name: 'settings', icon: 'bx bx-cog', text: 'Settings', path: '/settings', authRequired: true },
  { name: 'login', icon: 'bx bx-log-in', text: 'Login', path: '/login', authRequired: false },
  { name: 'signup', icon: 'bx bx-user-plus', text: 'Signup', path: '/signup', authRequired: false },
];

const SidebarMenu = ({ isOpen, setIsClose, isClose }) => {

// const {token} = useShop()
const isAuthenticated = useSelector(state=>state.auth.isAuthenticated)   


  const filteredMenuItems = menuItems.filter(item =>
    isAuthenticated ? item.authRequired : !item.authRequired
  );

  return (
    <div className={styles.menu}>
      <ul className={styles.menuLinks}>
        {filteredMenuItems.map((item) => (
          <SidebarMenuItem 
            key={item.name}
            icon={item.icon}
            text={item.text}
            link={item.path}
            isOpen={isOpen}
            setIsClose={setIsClose}
            isClose={isClose}
          />
        ))}
      </ul>
    </div>
  );
};

export default SidebarMenu;
