import { useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { IoMdLogOut } from "react-icons/io"
import { Link } from "react-router-dom"
import { FaTruckLoading } from "react-icons/fa";

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
                <h1>SupplyHub</h1>
                <div className="logout__button">
                    <IoMdLogOut />
                    <p onClick={logOut} >Cerrar Sesion</p>
                </div>
            </div>
            <div className="main__content">
                <h2>Bienvenido!</h2>
                <p></p>
                <div className="cards__options">
                    <Link to="/suppliers" className="card__option">
                    <div className="card__icon">
                        <FaTruckLoading />
                    </div>
                    <div className="card__info">
                        <h1>Proveedores</h1>
                        <p>Haga click para ingresar al registro de proveedores</p>
                    </div>
                    </Link>
                </div>
            </div>

        </>
    )
}
