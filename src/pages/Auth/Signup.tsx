import { useState } from 'react';
import styles from './Signup.module.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useRegisterMutation } from '../../app/features/authService';

const Signup = () => {
  const [register, {isLoading, isError, error: registerError}] = useRegisterMutation(); // Destructure error as registerError to avoid conflict with local 'errors' state
  const navigate = useNavigate(); // Initialize useNavigate
  
  const [formData, setFormData] = useState<any>({     // Type formData as any
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<any>({       // Type errors as any
    confirmPassword: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Explicitly type 'e' as React.ChangeEvent<HTMLInputElement>
    const { name, value } = e.target;
    setFormData((prev: any) => ({ // Type prev as any
      ...prev,
      [name]: value
    }));
    
    // Clear confirm password error when either password field changes
    if (name === 'password' || name === 'confirmPassword') {
      setErrors((prev: any) => ({ // Type prev as any
        ...prev,
        confirmPassword: ''
      }));
    }
  };
  
  const validatePassword = (): boolean => { // Explicitly type return as boolean
    if (formData.password !== formData.confirmPassword) {
      setErrors((prev: any) => ({ // Type prev as any
        ...prev,
        confirmPassword: 'Passwords do not match' // Corrected typo: "do not match"
      }));
      return false;
    }
    return true;
  };
  
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => { // Explicitly type 'e' as React.FormEvent<HTMLFormElement>
    e.preventDefault();
    
    if (validatePassword()) {
      // Form is valid, proceed with submission
      console.log('Form submitted:', formData);       
      try {
        const result = await register({
          email: formData?.email,
          password: formData?.password,
        }).unwrap(); // Use unwrap to handle errors
        console.log('Registration success:', result);
        // Optionally, redirect to login or dashboard on successful signup
        navigate("/login"); 
      } catch (err: any) { // Explicitly type 'err' as any
        console.log('Registration error:', err?.data?.message || err?.message || 'Unknown error'); // Improved error logging
        setErrors((prev: any) => ({ // Set a general error or specific error from API
          ...prev,
          apiError: err?.data?.message || 'Registration failed. Please try again.'
        }));
      }       
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
              required // Added required attribute
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
              required // Added required attribute
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
              required // Added required attribute
            />
            {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>} {/* Display specific password mismatch error */}
          </div>
          <button type="submit" className={styles.button} disabled={isLoading}> {/* Disable button when loading */}
            {isLoading ? "Signing Up..." : "Sign Up"} {/* Show loading state */}
          </button>
          {isError && registerError && ( // Display general API error
            <p className={styles.errorText}>
              {(registerError as any)?.data?.message || "Registration failed. Please try again."}
            </p>
          )}
        </form>
        <p className={styles.text}>
          Already have an account? <Link to="/login" className={styles.link}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
