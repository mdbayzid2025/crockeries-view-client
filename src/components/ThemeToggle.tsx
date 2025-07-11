import { AiOutlineLogout } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import styles from './ThemeToggle.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { useSignOutMutation } from '../app/features/authService';
import { logout } from '../app/features/authSlice';
import { RootState } from '../app/store';






const ThemeToggle = () => {
  const [signOut ] = useSignOutMutation();

const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
const dispatch = useDispatch()

const navigate = useNavigate();
const handleLogout = async () =>{
   await signOut(null).unwrap();  
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