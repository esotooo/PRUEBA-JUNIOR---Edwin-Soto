import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { IoMdLogOut } from "react-icons/io"
import { useSupplier } from "../hooks/useSupplier"
import SuppliersList from "../components/SuppliersList"

export default function Suppliers() {
    const { setAdmin } = useAuth()

    const {state} = useSupplier()

    const navigate = useNavigate()

    const logOut = () => {
        localStorage.removeItem("admin")
        navigate('/login')
        setAdmin(null)
    }

  return (
    <>
    <div className="main__title">
        <h1>SupplyHub</h1>
        <div className="logout__button">
            <IoMdLogOut />
            <p onClick={logOut} >Cerrar Sesion</p>
        </div>
    </div>
    <div className="main__content">
        {state.suppliers.map(supplier => (
            <SuppliersList key={supplier.id_supplier} supplier={supplier} />
        ))}
    </div>
    </>
  )
}
