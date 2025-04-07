import styles from './Login.module.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h2 className={styles.title}>Login</h2>
        <form>
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
          <button type="submit" className={styles.button}>Login</button>
        </form>
        <p className={styles.text}>
          Don't have an account? <Link to="/signup" className={styles.link}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;