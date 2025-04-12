
import styles from './ImageUploadSpinner.module.css'; // The component we created above

const ImageUploadSpinner = () => {
    return (
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}></div>
          <p className={styles.uploadText}>Uploading Image...</p>
        </div>)
};

export default ImageUploadSpinner;