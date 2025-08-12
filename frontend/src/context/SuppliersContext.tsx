import { useReducer, createContext, type ReactNode, useMemo, useEffect } from "react"
import { supplierReducer, initialState, type SupplierActions, type SupplierState } from "../reducers/supplier-reducer"
import { useAuth } from "../hooks/useAuth"
import axios from 'axios'


type SupplierContextProps = {
    state: SupplierState
    dispatch: React.Dispatch<SupplierActions>
}

type SupplierProviderProps = {
    children: ReactNode
}

export const SupplierContext = createContext<SupplierContextProps>(null!)

export const SupplierProvider = ({children} : SupplierProviderProps) => {

    const [state, dispatch] = useReducer(supplierReducer, initialState)
    const { admin } = useAuth() //Utilizamos el estado global donde esta nuestro token

    useEffect(() => {
        const getSuppliers = async () => {
            try {
                const res = await axios.post('http://localhost:4000/api/suppliers', {}, {
                    headers: { Authorization: `Bearer ${admin?.token}` }
                })
                dispatch({ type: 'set-suppliers', payload: { suppliers: res.data } })
            } catch (error) {
                console.error(error)
            }
        }

        if(admin?.token){
            getSuppliers()
        }
    }, [admin])

    return(
        <SupplierContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </SupplierContext.Provider>
    )
}