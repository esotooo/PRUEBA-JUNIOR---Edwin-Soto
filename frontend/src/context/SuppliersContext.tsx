import { useReducer, createContext, type ReactNode, useEffect } from "react"
import { supplierReducer, initialState, type SupplierActions, type SupplierState } from "../reducers/supplier-reducer"
import { useAuth } from "../hooks/useAuth"
import axios from 'axios'
import type { SupplierDB } from "../types/types"
import { useNavigate } from "react-router-dom"


type SupplierContextProps = {
    state: SupplierState
    dispatch: React.Dispatch<SupplierActions>
    fetchSuppliers: () => Promise<void>
    fetchTypes: () => Promise<void>
    addSupplier: (data: Omit<SupplierDB, 'id_supplier'>) => Promise<void>
    updateSupplier: (id: number, data: SupplierDB) => Promise<void>
    deleteSupplier: (id: number) => Promise<void>
    searchByName: (name: string) => Promise<void>
    searchByType: (idType: number) => Promise<void>
}

type SupplierProviderProps = {
    children: ReactNode
}

export const SupplierContext = createContext<SupplierContextProps>(null!)

export const SupplierProvider = ({children} : SupplierProviderProps) => {

    const [state, dispatch] = useReducer(supplierReducer, initialState)
    const { admin } = useAuth() //Utilizamos el estado global donde esta nuestro token
    

    const authHeader = { headers: { Authorization: `Bearer ${admin?.token}` }}

    
    const handleAuthError = (error: any) => {
        const message = error.response?.data?.message || 'Error en el servidor'
        dispatch({ type: 'set-message', payload: { type: 'error', text: message } })
    }
    
    //API para ver los datos de proveedores
    const fetchSuppliers = async () => {
        try{
            const res = await axios.get('http://localhost:4000/api/suppliers', authHeader)
            if(res.data.success){
                dispatch({type: 'set-suppliers', payload: {suppliers: res.data.data}})
                dispatch({ type: 'no-results', payload: { message: '' } })
            }else{
                dispatch({ type: 'set-suppliers', payload: { suppliers: [] } })
                dispatch({ type: 'no-results', payload: { message: res.data.message } })
            }
        }catch(error : any){
            handleAuthError(error)
        }
    }

    //API para guardar nuevos proveedores
    const addSupplier = async (newSupplierData: Omit<SupplierDB, 'id_supplier'>) => {
        try{
            const res = await axios.post('http://localhost:4000/api/add-supplier', newSupplierData, authHeader )
            if(!res.data.success){
                dispatch({ type: 'set-message', payload: { type: 'error', text: res.data.message || 'Error al agregar proveedor' } })
            }
            //Volver a llamar a la API suppliers luego de agregar un nuevo proveedor
            fetchSuppliers()
            dispatch({type: 'close-form'})
        }catch(error: any){
            handleAuthError(error)
        }
    }

    //API para actualizar los proveedores
    const updateSupplier = async( id: number, data: SupplierDB) => {
        try{
            const res = await axios.put(`http://localhost:4000/api/edit-supplier/${id}`, data, authHeader)
            if(!res.data.success){
                dispatch({ type: 'set-message', payload: { type: 'error', text: res.data.message || 'Error al actualizar proveedor' } })  
            }
            // Volver a llamar a la API suppliers luego de actualizar un regsitro
            fetchSuppliers()
            dispatch({type: 'close-form'})
        }catch(error: any){
            handleAuthError(error)
        }
    }

    //API para eliminar un proveedores
    const deleteSupplier = async (id: number) => {
        try{
            await axios.delete(`http://localhost:4000/api/delete-supplier/${id}`, authHeader)
            dispatch({ type: 'remove-supplier', payload: { id } })
            dispatch({type: 'close-confirmation', payload: { id }})

            // Volver a llamar a la API suppliers luego de eliminar un regsitro
            fetchSuppliers()
        }catch(error){
            handleAuthError(error)
        }
    }

    //API para filtrar proveedores segun el nombre que ingrese el usuario
    const searchByName = async (name: string) => {
        try {
            const res = await axios.get(`http://localhost:4000/api/suppliers/search-by-name?company_name=${name}`, authHeader)
          if(res.data.success && res.data.data.length > 0){
            dispatch({ type: 'set-suppliers', payload: { suppliers: res.data.data } })
            dispatch({ type: 'no-results', payload: { message: '' } })
          } else {
            dispatch({ type: 'set-suppliers', payload: { suppliers: [] } })
            dispatch({ type: 'no-results', payload: { message: res.data.message } })
          }
        } catch (error: any) {
            handleAuthError(error)
        }
    }
    
    //API para filtrar proveedores segun el nombre que ingrese el usuario
    const searchByType = async (idType: number) => {
        try {
             const res = await axios.get(`http://localhost:4000/api/suppliers/search-by-type?id_type=${idType}`, authHeader)
          if(res.data.success && res.data.data.length > 0){
            dispatch({ type: 'set-suppliers', payload: { suppliers: res.data.data } })
            dispatch({ type: 'no-results', payload: { message: '' } })
          } else {
            dispatch({ type: 'set-suppliers', payload: { suppliers: [] } })
            dispatch({ type: 'no-results', payload: { message: res.data.message } })
          }
        } catch (error: any) {
            handleAuthError(error)
        }
    }
      
    //API para visualizar todos los tipos de proveedores
    const fetchTypes = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/supplier-type', authHeader)
          if(res.data.success){
            dispatch({ type: 'set-types', payload: { supplierType: res.data.data } })
          } else {
            dispatch({ type: 'set-types', payload: { supplierType: [] } })
          }
        } catch (error) {
            handleAuthError(error)
        }
    }
    
    //Renderizar los proveedores y tipos de proveedores
    useEffect(() => {
        if (admin?.token){
            fetchTypes()
            fetchSuppliers()
        } 
    }, [admin])


    return(
        <SupplierContext.Provider
            value={{
                state,
                dispatch,
                fetchSuppliers,
                addSupplier,
                updateSupplier,
                deleteSupplier,
                searchByName,
                searchByType,
                fetchTypes
            }}
        >
            {children}
        </SupplierContext.Provider>
    )
}