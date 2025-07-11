
import { Provider } from 'react-redux'
import { store } from '../app/store'
import { ShopProvider } from '../app/Context/ShopContext'


const Wrapper = ({children}:{children: any}) => {
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