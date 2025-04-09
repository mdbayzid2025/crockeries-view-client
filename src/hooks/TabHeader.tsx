import React from 'react';
import styles from './TabHeader.module.css';

const TabHeader = ({tabs, selected, setSelectTab}) => {
  return (
    <div>
        <div className={styles.leftItems}>
        <ul>
       {tabs && tabs.map(tab=>
       <li key={tab} onClick={()=>setSelectTab(tab)}>          
          <button  className={`${tab ===selected  ? styles.active : '' }`}><span>{tab}</span></button>
        </li>) }        
        </ul>
        </div>
    </div>
  )
}

export default TabHeader