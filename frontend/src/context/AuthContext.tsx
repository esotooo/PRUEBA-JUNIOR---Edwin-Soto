import { createContext, useState, useRef, useEffect,type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'

export type Admin = { token: string }

type AuthContextProps = {
  admin: Admin | null
  setAdmin: (admin: Admin | null) => void
  authError: string
  setAuthError: (msg: string) => void
  sessionExpired: boolean
  checkToken: () => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  
    const [admin, setAdmin] = useState<Admin | null>(() => {
    const saved = localStorage.getItem("admin")
    return saved ? JSON.parse(saved) : null
  })

  const [authError, setAuthError] = useState('')
  const [sessionExpired, setSessionExpired] = useState(false)
  const reloadScheduled = useRef(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (admin) localStorage.setItem("admin", JSON.stringify(admin))
    else localStorage.removeItem("admin")
  }, [admin])

  const checkToken = () => {
    if (!admin?.token) return

    try {
      const decoded: any = jwtDecode(admin.token)

      const now = Date.now().valueOf() / 1000
      const secondsLeft = decoded.exp - now

      if (!reloadScheduled.current) {
        reloadScheduled.current = true

        if (secondsLeft <= 0) {
          setSessionExpired(true)
          setAuthError('Token expirado, por favor inicie sesión de nuevo')
          navigate('/suppliers')
        } else {
          setTimeout(() => {
            setSessionExpired(true)
            setAuthError('Token expirado, por favor inicie sesión de nuevo')
            navigate('/suppliers')
          }, secondsLeft * 1000)
        }
      }
    } catch {
      if (!reloadScheduled.current) {
        reloadScheduled.current = true
        setSessionExpired(true)
        setAuthError('Token inválido')
        navigate('/suppliers')
      }
    }
  }

  const logout = () => {
    setAdmin(null)
    setAuthError('')
    setSessionExpired(false)
    reloadScheduled.current = false 
    localStorage.removeItem("admin")
    navigate('/login') 
  }
  

  return (
    <AuthContext.Provider value={{ admin, setAdmin, authError, setAuthError, sessionExpired, checkToken, logout}}>
      {children}
    </AuthContext.Provider>
  )
}
