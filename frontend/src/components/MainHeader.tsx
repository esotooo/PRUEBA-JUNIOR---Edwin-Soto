import { useAuth } from "../hooks/useAuth"
import { IoMdLogOut } from "react-icons/io"

export default function MainHeader() {
  
  //Importamos la funcion logout de AuthContext
  const { logout } = useAuth()

  return (
    <div className="main__title">
        <h1>SupplyHub</h1>
        <div className="button logout__button" onClick={logout}>
            <IoMdLogOut />
            <p>Cerrar Sesion</p>
        </div>
    </div>
  )
}
