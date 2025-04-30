import React, { useState } from 'react'
import TabHeader from '../../hooks/TabHeader'
import AllOrder from './AllOrder/AllOrder'
import DraftOrder from './DraftOrder/DraftOrder'
import AddOrder from './AddOrder/AddOrder'
import styles from './Order.module.css';


const tabs = [
    'ladger',
    'rough',
    'Add Order',    
]

const Order = () => {
    const [selected, setSelectTab] = useState('ladger');
    

  return (
    <div>
        <TabHeader tabs={tabs} selected={selected} setSelectTab={setSelectTab}/>
        <div className={styles.content}>
        {selected === 'ladger' && <AllOrder status={selected} />}
        {selected === 'rough' && <DraftOrder status={selected} />}
        {selected === 'Add Order' && <AddOrder setSelectTab={setSelectTab}/>}
        </div>
        
    </div>
  )
}

export default Order