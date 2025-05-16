import styles from './SidebarMenu.module.css';
import SidebarMenuItem from './SidebarMenuItem';

const menuItems = [
  { name: 'dashboard', icon: 'bx bx-grid-alt', text: 'Dashboard', path: '/dashboard' },  
   { name: 'order', icon: 'bx bx-receipt', text: 'Order', path: '/order' },
  { name: 'customers', icon: 'bx bx-user', text: 'Customers', path: '/customers' },
  { name: 'settings', icon: 'bx bx-cog', text: 'Settings', path: '/settings' },
  { name: 'login', icon: 'bx bx-log-in', text: 'Login', path: '/login' },
  { name: 'signup', icon: 'bx bx-user-plus', text: 'Signup', path: '/signup' },
];

const SidebarMenu = ({ isOpen, setIsClose, isClose }) => {
  return (
    <div className={styles.menu}>
      <ul className={styles.menuLinks}>
        {menuItems.map((item) => (
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