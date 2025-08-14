import { useContext, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import MainHeader from '../components/MainHeader'

const PrivateRoutes = () => {
  const auth = useContext(AuthContext)
  const admin = auth?.admin
  const sessionExpired = auth?.sessionExpired
  const checkToken = auth?.checkToken

  useEffect(() => {
    checkToken?.() 
  }, [checkToken])

  if (!admin) return <Navigate to="/login" replace />

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
