import { createContext, useEffect, useState, useContext} from 'react'
import type { ReactNode } from 'react'

export type Admin = {
    token: string
}

type AuthContextProps = {
    admin: Admin | null
    setAdmin: (admin: Admin | null) => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({children} : {children: ReactNode}) => {
    const [admin, setAdmin] = useState<Admin | null>(() => {
        const saved = localStorage.getItem("Admin")
        return saved?JSON.parse(saved) : null
    })

    useEffect(() => {
        if(admin){
            localStorage.setItem("Admin", JSON.stringify(admin))
        }else{
            localStorage.removeItem("Admin")
        }
    }, [admin])

    return(
        <AuthContext.Provider value={{admin, setAdmin}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider")
    return context
}