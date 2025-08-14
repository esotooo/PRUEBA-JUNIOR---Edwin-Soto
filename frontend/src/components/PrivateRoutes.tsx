import { useContext, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import MainHeader from '../components/MainHeader'

// Componente que protege rutas privadas según el estado de autenticación
// Muestra contenido solo si el usuario está autenticado y su sesión es válida
const PrivateRoutes = () => {
  const auth = useContext(AuthContext)
  const admin = auth?.admin
  const sessionExpired = auth?.sessionExpired
  const checkToken = auth?.checkToken

  // Comprobar validez del token al montar el componente
  useEffect(() => {
    checkToken?.() 
  }, [checkToken])

  // Redirigir al login si no hay usuario autenticado
  if (!admin) return <Navigate to="/login" replace />

  // Mostrar mensaje de sesión expirada si aplica
  if (sessionExpired) {
    return (
      <div>
        <MainHeader />
        <div className="main__content">
          <h2>{auth?.authError}</h2>
        </div>
      </div>
    )
  }

  return <Outlet />
}

export default PrivateRoutes
