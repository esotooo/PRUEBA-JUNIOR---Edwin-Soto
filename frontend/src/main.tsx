import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* StrictMode ayuda a identificar problemas potenciales */}
    <BrowserRouter>
      {/* BrowserRouter habilita navegación por rutas */}
      <AuthProvider>
        {/* AuthProvider proporciona estado global de autenticación a toda la app */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
