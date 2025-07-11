
import styles from './PageSpinner.module.css';

const PageSpinner = () => {
  return (
    <div className={styles?.spinnerOverlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default PageSpinner;
