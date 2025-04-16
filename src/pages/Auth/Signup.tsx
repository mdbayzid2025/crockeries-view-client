import { useState } from 'react';
import styles from './Signup.module.css';
import { Link } from 'react-router-dom';

const Signup = () => {

  const [formData, setFormData] = useState({    
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({
    confirmPassword: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear confirm password error when either password field changes
    if (name === 'password' || name === 'confirmPassword') {
      setErrors(prev => ({
        ...prev,
        confirmPassword: ''
      }));
    }
  };
  
  const validatePassword = () => {
    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Password do not match'
      }));
      return false;
    }
    return true;
  };
  
  const handleSignup = (e) => {
    e.preventDefault();
    
    if (validatePassword()) {
      // Form is valid, proceed with submission
      console.log('Form submitted:', formData);            
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupForm}>
        <h2 className={styles.title}>Create Account</h2>
        <form onSubmit={handleSignup}>          
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Enter your email" 
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name='password'
              onChange={handleChange}
              placeholder="Enter your password" 
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
              placeholder="Confirm your password" 
              className={styles.input}
            />
            {errors && <p className={styles.error}>{errors?.confirmPassword}</p>}
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