import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import type { suppliers } from "../types/types"
import axios from 'axios'
import {LeadingActions, SwipeableList, SwipeAction, SwipeableListItem, TrailingActions} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'

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

    const leadingActions = () => (
        <LeadingActions >
            <SwipeAction>
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions >
            <SwipeAction >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

  return (
    <SwipeableList>
        <SwipeableListItem
            maxSwipe={1}
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}    
        >
            <div>
                
            </div>
        </SwipeableListItem>
    </SwipeableList>
  )
}
