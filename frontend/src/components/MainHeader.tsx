import { useAuth } from "../hooks/useAuth"
import { IoMdLogOut } from "react-icons/io"

// Componente de encabezado principal de la aplicación
// Muestra el título y un botón de cierre de sesión
export default function MainHeader() {
  
  // Función para cerrar sesión obtenida del contexto de autenticación
  const { logout } = useAuth()

  return (
    <div className="main__title">
        <h1>SupplyHub</h1>

        {/** BOTON DE CIERRE DE SESIÓN */}
        <div className="button logout__button" onClick={logout}>
            <IoMdLogOut />
            <p>Cerrar Sesion</p>
        </div>
    </div>
  )
}
