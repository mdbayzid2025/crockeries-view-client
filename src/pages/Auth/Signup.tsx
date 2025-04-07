import styles from './Signup.module.css';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupForm}>
        <h2 className={styles.title}>Create Account</h2>
        <form>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="Enter your full name" 
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter your password" 
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              placeholder="Confirm your password" 
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>Sign Up</button>
        </form>
        <p className={styles.text}>
          Already have an account? <Link to="/login" className={styles.link}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;