import { useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { IoMdLogOut } from "react-icons/io"
import { jwtDecode } from 'jwt-decode'

export default function MainHeader() {
  
  const { admin, setAdmin, authError, setAuthError } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
      if(admin?.token){
        try{
            const decoded: any = jwtDecode(admin?.token)
            const currentTime = Date.now() / 1000
            if(decoded.exp < currentTime){
                setAdmin(null)
                setAuthError("El token ha expirado, porfavor inicie sesión de nuevo.")
                navigate('/login', {replace: true})
            }
        }catch{
            setAdmin(null)
            setAuthError("Token inválido, porfavor inicie sesión de nuevo.")
            navigate('/login', {replace: true})
        }
      }else{
        navigate('/login', {replace: true})
      }
  }, [admin, navigate, setAdmin, setAuthError])

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
