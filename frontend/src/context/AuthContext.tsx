import { createContext, useState, useRef, useEffect,type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'

// Tipo que guarda el token del administrador
export type Admin = { token: string }

// Definición del contexto de autenticación
type AuthContextProps = {
  admin: Admin | null
  setAdmin: (admin: Admin | null) => void
  authError: string
  setAuthError: (msg: string) => void
  sessionExpired: boolean
  checkToken: () => void
  logout: () => void
}

// Creamos el contexto
export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

// Provider principal que envuelve la aplicación
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  
    // Estado que guarda el admin/token, inicializado desde localStorage si existe
    const [admin, setAdmin] = useState<Admin | null>(() => {
        const saved = localStorage.getItem("admin")
        return saved ? JSON.parse(saved) : null
    })

    // Estado para mensajes de error de autenticación
    const [authError, setAuthError] = useState('')
    // Estado para indicar si la sesión expiró
    const [sessionExpired, setSessionExpired] = useState(false)
    // Ref para evitar que se programe más de un reload/redirección
    const reloadScheduled = useRef(false)
    const navigate = useNavigate()

    // Cada vez que cambia admin, guardamos o eliminamos del localStorage
    useEffect(() => {
        if (admin) localStorage.setItem("admin", JSON.stringify(admin))
        else localStorage.removeItem("admin")
    }, [admin])

    // Función que valida si el token expiró y programa redirección si es necesario
    const checkToken = () => {
        if (!admin?.token) return // Si no hay token, no hacemos nada

        try {
            const decoded: any = jwtDecode(admin.token) // Decodificamos el token

            const now = Date.now().valueOf() / 1000
            const secondsLeft = decoded.exp - now // Calculamos segundos restantes

            if (!reloadScheduled.current) { // Solo programamos la redirección una vez
                reloadScheduled.current = true

                if (secondsLeft <= 0) { 
                    // Token ya expiró
                    setSessionExpired(true)
                    setAuthError('Token expirado, por favor inicie sesión de nuevo')
                    navigate('/suppliers')
                } else { 
                    // Token válido: programamos redirección cuando expire
                    setTimeout(() => {
                        setSessionExpired(true)
                        setAuthError('Token expirado, por favor inicie sesión de nuevo')
                        navigate('/suppliers')
                    }, secondsLeft * 1000)
                }
            }
        } catch {
            // Token inválido o mal formado
            if (!reloadScheduled.current) {
                reloadScheduled.current = true
                setSessionExpired(true)
                setAuthError('Token inválido')
                navigate('/suppliers')
            }
        }
    }

    // Función para cerrar sesión manualmente
    const logout = () => {
        setAdmin(null) // Limpiamos estado de admin
        setAuthError('') // Limpiamos errores
        setSessionExpired(false) // Reseteamos expiración
        reloadScheduled.current = false // Permitimos que checkToken se vuelva a programar en el futuro
        localStorage.removeItem("admin") // Limpiamos token del localStorage
        navigate('/login') // Redirigimos al login
    }
  
    // Proveemos todos los estados y funciones a la app
    return (
        <AuthContext.Provider value={{ admin, setAdmin, authError, setAuthError, sessionExpired, checkToken, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
