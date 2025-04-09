import React, { useState } from 'react'
import TabHeader from '../../hooks/TabHeader'
import AllOrder from './AllOrder/AllOrder'
import DraftOrder from './DraftOrder/DraftOrder'
import AddOrder from './AddOrder/AddOrder'
import styles from './Order.module.css';


const tabs = [
    'Ladger Order',
    'Rough Order',
    'Add Order',
    'Add Order',
    'Add Order',
]

const Order = () => {
    const [selected, setSelectTab] = useState('Ladger Order')

  return (
    <div>
        <TabHeader tabs={tabs} selected={selected} setSelectTab={setSelectTab}/>
        <div className={styles.content}>
        {selected === 'Ladger Order' && <AllOrder />}
        {selected === 'Rough Order' && <DraftOrder />}
        {selected === 'Add Order' && <AddOrder />}
        </div>
        
    </div>
  )
}

export default Order