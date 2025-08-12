import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { IoMdLogOut } from "react-icons/io"


export default function MainPage() {
    const { admin, setAdmin } = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if(!admin){
            navigate('/login', {replace: true})
        }else{
            navigate('/main', {replace: true})
        }
    }, [admin, navigate])

    const logOut = () => {
        localStorage.removeItem("admin")
        navigate('/login')
        setAdmin(null)
    }
    
    return (
        <>
            <div className="main__title">
                <h1>Gestión de Proveedores</h1>
                <div className="logout__button">
                    <IoMdLogOut />
                    <p onClick={logOut} >Cerrar Sesion</p>
                </div>
            </div>

        </>
    )
}
