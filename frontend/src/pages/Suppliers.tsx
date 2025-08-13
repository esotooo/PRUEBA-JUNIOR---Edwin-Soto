import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { IoMdLogOut } from "react-icons/io"
import { useSupplier } from "../hooks/useSupplier"
import { IoIosAddCircle } from "react-icons/io";
import SuppliersList from "../components/SuppliersList"
import SuppliersForm from "../components/SuppliersForm";
import ConfirmDelete from "../components/ConfirmDelete";

export default function Suppliers() {
    const { setAdmin } = useAuth()
    const {state, dispatch} = useSupplier()
    const navigate = useNavigate()
     
    
    const logOut = () => {
        localStorage.removeItem("admin")
        navigate('/login')
        setAdmin(null)
    }

    const closeForm = () => {
        dispatch({type: 'close-form'})  
    }
    

  return (
    <>
    <div className="main__title">
        <h1>SupplyHub</h1>
        <div className="button logout__button">
            <IoMdLogOut />
            <p onClick={logOut} >Cerrar Sesion</p>
        </div>
    </div>
    <div className="main__content">
        <div className="content__title">
            <h2>Proveedores</h2>
            <div className="button add__button" onClick={() => dispatch({type: 'show-form'})}>
                <IoIosAddCircle />
                <p>Agregar</p>
            </div>
        </div>
        <div>
            <div className="suppliers__card">
                {state.suppliers.map(supplier => (
                    <SuppliersList key={supplier.id_supplier} supplier={supplier} />
                ))}
            </div>
        </div>
    </div>
    <div>
        {state.form && <SuppliersForm onClose={closeForm} />}
        {state.confirmation && <ConfirmDelete />}
    </div>
    </>
  )
}
