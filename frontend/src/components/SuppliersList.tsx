import {LeadingActions, SwipeableList, SwipeAction, SwipeableListItem, TrailingActions} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { useSupplier } from '../hooks/useSupplier'
import type { suppliers } from '../types/types'
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import 'react-swipeable-list/dist/styles.css';

type SupplierDetailedProps = {
    supplier: suppliers
}

export default function SuppliersList({supplier} : SupplierDetailedProps) {
    const { dispatch} = useSupplier()

    const leadingActions = () => (
        <LeadingActions >
            <SwipeAction onClick={() => dispatch({type: 'edit-supplier', payload: {id: supplier.id_supplier}})}>
                <div className='my-leading-action'>
                    Actualizar
                </div>
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions >
            <SwipeAction onClick={() => dispatch({type: 'remove-supplier', payload: {id: supplier.id_supplier}})}
                destructive={true}
            >
                <div className='my-trailing-action'>
                    Eliminar
                </div>
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
        <div className='supplier__card' key={supplier.id_supplier}>
            <div className='supplier__name'>
                <h3>{supplier.company_name}</h3>
                <div className='supplier__options'>
                    <MdEditSquare className='option__edit' onClick={() => dispatch({type: 'edit-supplier', payload: {id: supplier.id_supplier}})}/>
                    <MdDelete className='option__delete' onClick={() => dispatch({type: 'remove-supplier', payload: {id: supplier.id_supplier}})}/>
                </div>
            </div>
            <div className='supplier__info'>
                <h4>{supplier.supplier_type}</h4>
                <p>Contacto: <span>{supplier.contact_person}</span></p>
                <p>Email: <span>{supplier.email}</span></p>
                <p>Teléfono: <span>{supplier.phone}</span></p>
            </div>
        </div>
        </SwipeableListItem>
    </SwipeableList>
  )
}
