import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router/router.tsx'
import Wrapper from './wrapper/Wrapper.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>    
    <Wrapper>
    <RouterProvider router={router}/>
    </Wrapper>
  </StrictMode>,
)
