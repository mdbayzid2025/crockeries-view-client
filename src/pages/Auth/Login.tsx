
import { useDispatch } from 'react-redux';
import { useShop } from '../../app/Context/ShopContext';
import { useLoginMutation } from '../../app/features/authService';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { setCredentials } from '../../app/features/authSlice';



const LogIn = () => {
  const {setToken} = useShop();
  const [login, {isLoading, isError}] = useLoginMutation()
  
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLogin = async e =>{
    e.preventDefault()
    const form = e.target;

    const data = {
      email: form.email.value,
      password: form.password.value,

    }
    try {
      const result = await login(data).unwrap();
      // Handle successful login
      console.log("result", result);
      setToken(true);
      localStorage.setItem("accessToken", result?.token)
      dispatch(setCredentials(result));
      navigate("/")
    } catch (err) {
      // Handle error
      // alert(err)
      console.log("rrrr", err)
    }
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

export default LogIn;