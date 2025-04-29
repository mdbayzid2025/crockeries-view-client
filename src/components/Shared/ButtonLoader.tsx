import React from 'react';
import styles from './ButtonLoader.module.css';

const ButtonLoader = () => {
  return (
    <div className={styles?.loaderContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default ButtonLoader;
