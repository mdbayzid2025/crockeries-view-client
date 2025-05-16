import { RxCross1 } from 'react-icons/rx';
import styles from './SidebarHeader.module.css';
import { useGetShopInfoQuery } from '../../app/features/orderService';
import { useShop } from '../../app/Context/ShopContext';

const SidebarHeader = ({ isOpen, toggleSidebar,   setIsClose, isClose }) => { 
 const {shop, loading} = useShop();
 
  if(loading){
    return <p>loading....</p>
  }


  return (
    <header className={styles.header}>
      <div className={styles.imageText}>
        <span className={styles.image}>
          <img src={shop?.logo ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt1PUqNjMHYFvt0o1hzlilB2YTjP1xt9zkvg&s"} alt="logo" />
        </span>

        {isOpen && (
          <div className={styles.text}>
            <span className={styles.name}>{shop?.site_name}</span>
            <span className={styles.profession}>{shop?.mobile}</span>
          </div>
        )}
      </div>

      <i 
        className={`bx bx-chevron-right ${styles.toggle}`} 
        onClick={toggleSidebar}
      ></i>
      <RxCross1 onClick={()=>setIsClose(!isClose)} className={styles.crossIcon} size={25} />
    </header>
  );
};

export default SidebarHeader;