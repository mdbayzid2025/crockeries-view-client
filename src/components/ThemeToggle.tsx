import styles from './ThemeToggle.module.css';

const ThemeToggle = ({ darkMode, toggleMode }) => {
  return (
    <div className={styles.mode}>
      <div className={styles.sunMoon}>
        <i className={`bx ${darkMode ? 'bx-sun' : 'bx-moon'} ${styles.icon}`}></i>
      </div>
      {!darkMode && <span className={styles.modeText}>Dark mode</span>}
      {darkMode && <span className={styles.modeText}>Light mode</span>}
      <div className={styles.toggleSwitch} onClick={toggleMode}>
        <span className={styles.switch}></span>
      </div>
    </div>
  );
};

export default ThemeToggle;