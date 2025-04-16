import styles from './Login.module.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const handleLogin = e =>{
    e.preventDefault()
    const form = e.target;

    const data = {
      email: form.email.value,
      password: form.password.value,

    }
    console.log("data", data);
  }
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name='email'
              placeholder="Enter your email" 
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name='password'
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