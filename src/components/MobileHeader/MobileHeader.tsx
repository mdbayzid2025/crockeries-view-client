import React from 'react'
import { RiMenu3Line } from 'react-icons/ri'
import styles from './MobileHeader.module.css'



const MobileHeader = ({isClose, setIsClose}) => {
  return (
    <div className={styles.container}>
        <div className={styles.logo}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt1PUqNjMHYFvt0o1hzlilB2YTjP1xt9zkvg&s" alt="" srcset="" />
        <span>Crockeries View</span> 
        </div>
        <RiMenu3Line onClick={()=>setIsClose(!isClose)} size={25}/>
    </div>
  )
}

export default MobileHeader