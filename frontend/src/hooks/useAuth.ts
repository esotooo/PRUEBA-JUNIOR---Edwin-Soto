import { useContext } from "react"
import { AuthContext } from '../context/AuthContext'

// Hook personalizado para acceder al contexto de autenticación
// Permite usar el estado y funciones de AuthContext en cualquier componente
export const useAuth = () => {
    const context = useContext(AuthContext)

    // Validación: asegurar que el hook se use dentro de un AuthProvider
    if (!context) {
        throw new Error("useAuth debe usarse dentro de AuthProvider")
    }

    // Retorna el contexto completo (estado + funciones)
    return context
}