import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { IoMdLogOut } from "react-icons/io"

export default function MainHeader() {
  
  const { setAdmin } = useAuth()

  const navigate = useNavigate()


  const logOut = () => {
      localStorage.removeItem("admin")
      navigate('/login')
      setAdmin(null)
  }
  
  return (
    <div className="main__title">
        <h1>SupplyHub</h1>
        <div className="button logout__button" onClick={logOut}>
            <IoMdLogOut />
            <p>Cerrar Sesion</p>
        </div>
    </div>
  )
}
