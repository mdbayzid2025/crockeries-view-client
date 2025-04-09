import styles from './SidebarMenu.module.css';
import SidebarMenuItem from './SidebarMenuItem';

const menuItems = [
  { name: 'dashboard', icon: 'bx bx-grid-alt', text: 'Dashboard', path: '/dashboard' },
  { name: 'home', icon: 'bx bx-home', text: 'Home', path: '/home' },
  { name: 'order', icon: 'bx bx-bar-chart-alt-2', text: 'Order', path: '/order' },
  { name: 'messages', icon: 'bx bx-message', text: 'Messages', path: '/messages' },
  { name: 'favorites', icon: 'bx bx-heart', text: 'Favorites', path: '/favorites' },
  { name: 'settings', icon: 'bx bx-cog', text: 'Settings', path: '/settings' },
  { name: 'login', icon: 'bx bx-log-in', text: 'Login', path: '/login' },
  { name: 'signup', icon: 'bx bx-user-plus', text: 'Signup', path: '/signup' },
];

const SidebarMenu = ({ isOpen }) => {
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
          />
        ))}
      </ul>
    </div>
  );
};

export default SidebarMenu;