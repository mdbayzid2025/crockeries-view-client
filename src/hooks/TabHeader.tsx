import styles from './TabHeader.module.css';

const TabHeader = ({tabs, selected, setSelectTab}: any) => { // Type props as any
  return (
    <div>
        <div className={styles.leftItems}>
        <ul>
       {tabs && tabs.map((tab: any) => // Type tab as any
       <li key={tab} onClick={() => setSelectTab(tab)}>          
          <button className={`${tab === selected ? styles.active : '' }`}><span>{tab}</span></button>
        </li>) }        
        </ul>
        </div>
    </div>
  )
}

export default TabHeader;
