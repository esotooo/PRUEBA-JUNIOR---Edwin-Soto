import {LeadingActions, SwipeableList, SwipeAction, SwipeableListItem, TrailingActions} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { useSupplier } from '../hooks/useSupplier'
import type { suppliers } from '../types/types'
import { MdEditSquare } from "react-icons/md"
import { MdDelete } from "react-icons/md"
import 'react-swipeable-list/dist/styles.css'

type SupplierDetailedProps = {
    supplier: suppliers
}

// Componente que representa una tarjeta de proveedor con acciones deslizables
export default function SuppliersList({supplier} : SupplierDetailedProps) {
    
    const { dispatch } = useSupplier()
    
    // Acción al deslizar hacia la derecha: actualizar proveedor
    const leadingActions = () => (
        <LeadingActions >
            <SwipeAction onClick={() => dispatch({type: 'edit-supplier', payload: {id: supplier.id_supplier}})}>
                <div className='my-leading-action'>
                    Actualizar
                </div>
            </SwipeAction>
        </LeadingActions>
    )

    // Acción al deslizar hacia la izquierda: eliminar proveedor
    const trailingActions = () => (
        <TrailingActions >
            <SwipeAction onClick={() => dispatch({type: 'show-confirmation', payload: {id: supplier.id_supplier}})}
            >
                <div className='my-trailing-action'>
                    Eliminar
                </div>
            </SwipeAction>
        </TrailingActions>
    )

    // Función para formatear la fecha de creación a 'dd-MM-YYYY'
    function formatDate(){
        const date = supplier.created_at.split('T')[0] || supplier.created_at.split('')[0]
        const  [year, month, day] = date.split('-')
        return `${day}-${month}-${year}`
    } 


  return (
    <SwipeableList>
        <SwipeableListItem
            maxSwipe={1}
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}    
        >
        <div className='supplier__card' key={supplier.id_supplier}>

            {/** NOMBRE DEL PROVEEDOR Y OPCIONES DE ACCION */}
            <div className='supplier__name'>
                <h3>{supplier.company_name}</h3>

                {/** OPCIONES VISIBLES UNICAMENTE EN TABLET Y ESCRITORIO */}
                <div className='supplier__options'>
                    <MdEditSquare className='option__edit' onClick={() => dispatch({type: 'edit-supplier', payload: {id: supplier.id_supplier}})}/>
                    <MdDelete className='option__delete' onClick={() => dispatch({type: 'show-confirmation', payload: {id: supplier.id_supplier}})}/>
                </div>
            </div>
            
            {/** INFORMACION DETALLADA DEL PROVEEDOR */}
            <div className='supplier__info'>
                <h4>{supplier.supplier_type}</h4>
                <div className='supplier__general'></div>
                <p>Contacto: <span>{supplier.contact_person}</span></p>
                <p>Email: <span>{supplier.email}</span></p>
                <p>Teléfono: <span>{supplier.phone}</span></p>
                <p>NIT: <span>{supplier.NIT}</span></p>
                <p>Dirección: <span>{supplier.city}</span></p>
                <p>Creado el: <span>{formatDate()}</span></p>
            </div>

        </div>
        </SwipeableListItem>
    </SwipeableList>
  )
}
