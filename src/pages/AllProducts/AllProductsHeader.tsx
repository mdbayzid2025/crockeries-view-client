import React from 'react'
import styles from './AllProductsHeader.module.css'


const AllProductsHeader = ({selected, setSelectTab}) => {
    const tabs = [
        'All Products',
        'Add Product',        
    ]
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

export default AllProductsHeader