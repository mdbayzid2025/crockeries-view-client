import React from 'react'
import { Provider } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { store } from '../app/store'


const Wrapper = ({children}) => {
  return (<div>
    <Provider store={store}>
    {children}
    </Provider>
    </div>
  )
}

export default Wrapper