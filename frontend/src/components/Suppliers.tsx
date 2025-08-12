import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import type { suppliers } from "../types/types"
import axios from 'axios'

export default function Suppliers() {
    
    const [suppliers, setSuppliers] = useState<suppliers[]>([])

    const { admin } = useAuth()

    //Funcion para mostrar los datos de la DB una vez se haya validado el token
    useEffect(() => {
        const getSuppliers = async () => {
            try {
                const res = await axios.post('http://localhost:4000/api/suppliers', {}, {
                    headers: { Authorization: `Bearer ${admin?.token}` }
                })
                setSuppliers(res.data) // Guardamos los proveedores al estado
            } catch (error) {
               console.log(error)
            }
        }

        if(admin?.token){  // Solo llama si existe el token
            getSuppliers()
        }
    }, [admin])

  return (
    <div>
      {suppliers.map(supplier => (
        <h1>{supplier.company_name}</h1>
      ))}
    </div>
  )
}
