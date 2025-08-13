import { useSupplier } from "../hooks/useSupplier"
import { IoIosAddCircle } from "react-icons/io";
import SuppliersList from "../components/SuppliersList"
import SuppliersForm from "../components/SuppliersForm";
import ConfirmDelete from "../components/ConfirmDelete";
import SupplierSearchBar from "../components/SupplierSearchBar";
import MainHeader from "../components/MainHeader";


export default function Suppliers() {
    const {state, dispatch} = useSupplier()
     


    const closeForm = () => {
        dispatch({type: 'close-form'})  
    }
    

  return (
    <>
    <MainHeader />
    <div className="main__content">
        <div className="content__title">
            <h2>Proveedores</h2>
            <div className="button add__button" onClick={() => dispatch({type: 'show-form'})}>
                <IoIosAddCircle />
                <p>Agregar</p>
            </div>
        </div>

        <SupplierSearchBar />

        <div className="suppliers__card">

            {state.suppliers.length > 0 ? (
                    state.suppliers.map(supplier => (
                        <SuppliersList key={supplier.id_supplier} supplier={supplier} />))
                    
            ) :  (
                state.noResultsMessage && <p>{state.noResultsMessage}</p>
            )}
        </div>

        </div>
        <div>
            {state.form && <SuppliersForm onClose={closeForm} />}
            {state.confirmation && <ConfirmDelete />}
        </div>
    </>
  )
}
