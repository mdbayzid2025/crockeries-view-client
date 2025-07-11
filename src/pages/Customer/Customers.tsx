import  { useState } from 'react'
import TabHeader from '../../hooks/TabHeader'
import AddCustomer from './AddCustomer'
import AllCustomer from './AllCustomer'

const Customers = () => {
      const [selected, setSelectTab] = useState('All Customer')
      const tabs = [
        'All Customer',
        'Add Customer',    
    ]

  return (
    <div>
    <h1>AllCustomer</h1>
      <TabHeader tabs={tabs} selected={selected} setSelectTab={setSelectTab}/>
      {selected === 'All Customer' && <AllCustomer />}
      {selected === 'Add Customer' && <AddCustomer  setSelectTab={setSelectTab}/>}
      </div>
  )
}

export default Customers