import { StrictMode } from 'react'//destructing
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'//componente App,



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

