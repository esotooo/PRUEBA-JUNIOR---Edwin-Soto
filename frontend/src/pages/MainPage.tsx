import { Link } from "react-router-dom"
import { FaTruckLoading } from "react-icons/fa"
import MainHeader from "../components/MainHeader"
import { useAuth } from "../hooks/useAuth"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function MainPage() {

    const { admin } = useAuth()

    const navigate = useNavigate()

    //Redirigir en caso el usuario no haya iniciado sesión
    useEffect(() => {
        if (!admin) {
          navigate('/login', { replace: true })
        }
      }, [admin, navigate])

    return (
        <>
            {/* ENCABEZADO DE LA PAGINA */}
            <MainHeader />

            { /** CONTENEDOR PRINCIPAL */}
            <div className="main__content">
                <h2>Bienvenido!</h2>

                {/** ESPACION DISPONIBLE PARA TARJETAS DE OPCIONES */}
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
