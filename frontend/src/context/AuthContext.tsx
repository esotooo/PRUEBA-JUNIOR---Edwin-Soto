import { createContext, useEffect, useState} from 'react'
import type { ReactNode } from 'react'

export type Admin = {
    token: string
}

type AuthContextProps = {
    admin: Admin | null
    setAdmin: (admin: Admin | null) => void
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({children} : {children: ReactNode}) => {
    const [admin, setAdmin] = useState<Admin | null>(() => {
        const saved = localStorage.getItem("admin")
        return saved?JSON.parse(saved) : null
    })

    useEffect(() => {
        if(admin){
            localStorage.setItem("admin", JSON.stringify(admin))
        }else{
            localStorage.removeItem("admin")
        }
    }, [admin])

    return(
        <AuthContext.Provider value={{admin, setAdmin}}>
            {children}
        </AuthContext.Provider>
    )
}

