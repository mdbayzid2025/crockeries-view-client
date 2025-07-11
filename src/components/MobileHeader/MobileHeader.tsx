import { RiMenu3Line } from 'react-icons/ri'
import styles from './MobileHeader.module.css'

import { useShop } from "../../app/Context/ShopContext";
import { Link } from 'react-router-dom';

const MobileHeader = ({isClose, setIsClose}: any) => {
   const { shop } = useShop();

  return (
    <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">
          <img
            src={
              shop?.logo ??
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt1PUqNjMHYFvt0o1hzlilB2YTjP1xt9zkvg&s"
            }
            alt="logo"
          />
          </Link>
        <span>{shop?.site_name ?? "Crockeries View11"} </span> 
        </div> 
        <RiMenu3Line onClick={()=>setIsClose(!isClose)} size={25}/>
    </div>
  )
}

export default MobileHeader