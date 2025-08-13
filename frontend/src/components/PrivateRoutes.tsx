import { useContext, useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { jwtDecode } from 'jwt-decode'
import MainHeader from '../components/MainHeader'

const PrivateRoutes = () => {
  const auth = useContext(AuthContext)
  const [expired, setExpired] = useState(false)

  const admin = auth?.admin
  const setAuthError = auth?.setAuthError

  useEffect(() => {
    if (!admin?.token) return

    try {
      const decoded: any = jwtDecode(admin.token)
      const now = Date.now().valueOf() / 1000
      if (decoded.exp < now) {
        setExpired(true)
        setAuthError?.('Token expirado, por favor inicie sesión de nuevo')
      }
    } catch {
      setExpired(true)
      setAuthError?.('Token inválido')
    }
  }, [admin, setAuthError])

  if (!admin) return <Navigate to="/login" replace />

  if (expired) {
    return (
      <div>
        <MainHeader />
        <div className="main__content">
          <h2>Token expirado, por favor inicie sesión de nuevo</h2>
        </div>
      </div>
    )
  }

  return <Outlet />
}

export default PrivateRoutes
