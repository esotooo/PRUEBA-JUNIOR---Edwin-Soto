import { useReducer, createContext, type ReactNode, useEffect } from "react"
import { supplierReducer, initialState, type SupplierActions, type SupplierState } from "../reducers/supplier-reducer"
import { useAuth } from "../hooks/useAuth"
import axios from 'axios'
import type { SupplierDB } from "../types/types"


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

    //API para ver los datos de proveedores
    const fetchSuppliers = async () => {
        try{
            const res = await axios.post('http://localhost:4000/api/suppliers', {}, authHeader)
            dispatch({type: 'set-suppliers', payload: {suppliers: res.data}})
            dispatch({ type: 'no-results', payload: { message: '' } })
        }catch(error){
            console.error(error)
        }
    }

    //API para guardar nuevos proveedores
    const addSupplier = async (newSupplierData: Omit<SupplierDB, 'id_supplier'>) => {
        try{
            const res = await axios.post('http://localhost:4000/api/add-supplier', newSupplierData,
                {headers: {Authorization: `Bearer ${admin?.token}` }}
            )
            dispatch({type: 'add-supplier', payload: {supplier: res.data}})
            //Volver a llamar a la API suppliers luego de agregar un nuevo proveedor
            fetchSuppliers()
        }catch(error){
            console.log(error)
        }
    }

    //API para actualizar los proveedores
    const updateSupplier = async( id: number, data: SupplierDB) => {
        try{
            await axios.put(`http://localhost:4000/api/edit-supplier/${id}`, data, authHeader)
            // Volver a llamar a la API suppliers luego de actualizar un regsitro
            fetchSuppliers()
        }catch(error){
            console.error(error)
        }
    }

    //API para eliminar un proveedores
    const deleteSupplier = async (id: number) => {
        try{
            await axios.delete(`http://localhost:4000/api/delete-supplier/${id}`, authHeader)
            dispatch({ type: 'remove-supplier', payload: { id } })
            // Volver a llamar a la API suppliers luego de eliminar un regsitro
            fetchSuppliers()
        }catch(error){
            console.error(error)
        }
    }

    //API para filtrar proveedores segun el nombre que ingrese el usuario
    const searchByName = async (name: string) => {
        try {
          const res = await axios.get(`http://localhost:4000/api/suppliers/search-by-name?company_name=${name}`, authHeader)
          if(res.data.length === 0){
            dispatch({type: 'no-results', payload: {message: `OOOOPS! :(  \n No se encontraron registros con el nombre ${name}`}})
          }else{
            dispatch({ type: 'set-suppliers', payload: { suppliers: res.data } })
            dispatch({type: 'no-results', payload: {message: ''}})
          }
        } catch (error : any) {
            if(error.response?.status === 404){
                dispatch({ type: 'set-suppliers', payload: { suppliers: [] } })
                dispatch({type: 'no-results', payload: {message: `OOOOPS! :(  \n No se encontraron registros con el nombre ${name}`}})
            }
        }
    }
    
    //API para filtrar proveedores segun el nombre que ingrese el usuario
    const searchByType = async (idType: number) => {
        try {
          const res = await axios.get(`http://localhost:4000/api/suppliers/search-by-type?id_type=${idType}`, authHeader)
          if(res.data.length === 0){
            const typeName = state.supplierType.find(t => t.id_type === idType)?.supplier_type || ''
            dispatch({type: 'no-results', payload: {message: `OOOOPS! :(  \n No se encontraron registros con el tipo ${typeName}`}})
          }else{
            dispatch({ type: 'set-suppliers', payload: { suppliers: res.data } })
            dispatch({type: 'no-results', payload: {message: ''}})
          }
        } catch (error: any) {
            if(error.response?.status === 404){
                const typeName = state.supplierType.find(t => t.id_type === idType)?.supplier_type || ''
                dispatch({ type: 'set-suppliers', payload: { suppliers: [] } })
                dispatch({type: 'no-results', payload: {message: `OOOOPS! :(  \n No se encontraron registros con el tipo ${typeName}`}})
            }
        }
    }
      
      const fetchTypes = async () => {
        try {
          const res = await axios.post('http://localhost:4000/api/supplier-type', {}, authHeader)
          dispatch({type: 'set-types', payload: {supplierType: res.data}})
        } catch (error) {
          console.error(error)
        }
      }
      

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