import { AiOutlineLogout } from 'react-icons/ai';
import styles from './ThemeToggle.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useShop } from '../app/Context/ShopContext';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../app/features/authSlice';
import { useSignOutMutation } from '../app/features/authService';






const ThemeToggle = () => {
  const [signOut, { isLoading, isError, error }] = useSignOutMutation();

const isAuthenticated = useSelector(state=>state.auth.isAuthenticated);
const dispatch = useDispatch()

const navigate = useNavigate();
const handleLogout = async () =>{
   await signOut().unwrap();
  console.log("signout")
  dispatch(logout())
  navigate("/login");
}

  return (
    <div className={styles.mode}>
      {isAuthenticated && 
      <div onClick={()=>handleLogout()} className={styles.logOutBtn}>
         <button> Log Out </button>
        <AiOutlineLogout size={20}/>
      </div> }
      {/* <div className={styles.sunMoon}>
        <i className={`bx ${darkMode ? 'bx-sun' : 'bx-moon'} ${styles.icon}`}></i>
      </div>
      {!darkMode && <span className={styles.modeText}>Dark mode</span>}
      {darkMode && <span className={styles.modeText}>Light mode</span>}
      <div className={styles.toggleSwitch} onClick={toggleMode}>
        <span className={styles.switch}></span>
      </div> */}
    </div>
  );
};

export default ThemeToggle;