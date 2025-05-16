import React from 'react'
import { Provider } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { store } from '../app/store'
import { ShopProvider } from '../app/Context/ShopContext'


const Wrapper = ({children}) => {
  return (<div>
    <Provider store={store}>
      <ShopProvider>
    {children}
    </ShopProvider>
    </Provider>
    </div>
  )
}

export default Wrapper