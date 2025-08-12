import {LeadingActions, SwipeableList, SwipeAction, SwipeableListItem, TrailingActions} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { useSupplier } from '../hooks/useSupplier'
import type { suppliers } from '../types/types'
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";


type SupplierDetailedProps = {
    supplier: suppliers
}

export default function SuppliersList({supplier} : SupplierDetailedProps) {
    const { dispatch} = useSupplier()

    const leadingActions = () => (
        <LeadingActions >
            <SwipeAction onClick={() => dispatch({type: 'edit-supplier', payload: {id: supplier.id_supplier}})}>
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions >
            <SwipeAction onClick={() => dispatch({type: 'remove-supplier', payload: {id: supplier.id_supplier}})}
                destructive={true}
            >
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
        <div className=''>
            {supplier.company_name}
        </div>
        </SwipeableListItem>
    </SwipeableList>
  )
}
