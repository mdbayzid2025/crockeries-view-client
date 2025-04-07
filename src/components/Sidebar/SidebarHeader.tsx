import styles from './SidebarHeader.module.css';

const SidebarHeader = ({ isOpen, toggleSidebar }) => {
  return (
    <header className={styles.header}>
      <div className={styles.imageText}>
        <span className={styles.image}>
          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="logo" />
        </span>

        {isOpen && (
          <div className={styles.text}>
            <span className={styles.name}>Crockeries</span>
            <span className={styles.profession}>View</span>
          </div>
        )}
      </div>

      <i 
        className={`bx bx-chevron-right ${styles.toggle}`} 
        onClick={toggleSidebar}
      ></i>
    </header>
  );
};

export default SidebarHeader;