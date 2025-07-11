import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../app/features/authService';
import styles from './Login.module.css';
import {  useNavigate } from 'react-router-dom';
import { setCredentials } from '../../app/features/authSlice';
import { RootState } from '../../app/store';
import { useEffect } from 'react';

const LogIn = () => {  
  const [login, {isLoading, isError}] = useLoginMutation();
  
  const dispatch = useDispatch();

  const navigate = useNavigate();
  

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const data: any = {
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
    };

    try {
      const result = await login(data).unwrap();      
      dispatch(setCredentials(result));
      navigate("/");
    } catch (err: any) {
      console.log("rrrr", err);
    }
  };

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
          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? "Logging In..." : "Login / Signup"}
          </button>
          {isError && <p className={styles.errorText}>Login failed. Please check your credentials.</p>}
        </form>        
      </div>
    </div>
  );
};

export default LogIn;
