import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaEye } from "react-icons/fa"
import { FaEyeSlash } from "react-icons/fa"
import { useAuth } from "../hooks/useAuth"
import { api } from '../helpers/axiosInstance'

export default function LoginPage() {

    //Estados del formulario
    const [hide, setHide] = useState(true) //Control de mostrar / ocultar contraseña 
    const [email, setEmail] = useState('') //Correo ingresado por el usuario
    const [password, setPassword] = useState('') //Contraseña ingresada
    const [errors, setErrors] = useState<{email?: string, password?: string}>({}) //Errores de validacion
    const [advice, setAdvice] = useState('') //Mensaje general error de login
    
    const { admin, setAdmin } = useAuth() //Estado global de autenticacion
    const navigate = useNavigate() //Funcion para redirecciones
    
    // Función para iniciar sesión
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    
        const newErrors: typeof errors = {}
        
        //Validacion basica de campos
        if (email.trim() === '') newErrors.email = 'Ingrese el correo electrónico'
        if (password.trim() === '') newErrors.password = 'Ingrese la contraseña'
    
        setErrors(newErrors)
    
        if (Object.keys(newErrors).length > 0) return // Si hay errores, no continuar
    
        try {
            setAdvice('') //Limpiamos mensajes previos
            const res = await api.post('/api/login', { email, password })
            if (res.status === 200) {
                const { token } = res.data
                setAdmin({ token }) //Guardamos token el estado global
                navigate('/main', { replace: true }) //Redirigimos a la pantalla principal
            }
        } catch {
            // Mensaje de error genérico en caso de fallo en la autenticación
            setAdvice('El correo y/o contraseña son incorrectos. Por favor intente de nuevo.')
        }
    }
    
    //Redirige automaticamente en caso ya haya un usuario autenticado
    useEffect(() => {
        if (admin) {
          navigate('/main', { replace: true })
        }
      }, [admin, navigate])


  return (
    <div className="login">
        <div className="login__title">
            <h1>SupplyHub</h1>
        </div>
        <div className="login__container">
            <div className="login__image">
                <img src="../../img/suppliersIMG.webp" alt="Login Image" loading="lazy"/>
            </div>

            {/** FORMULARIO DE LOGIN */}
            <div className="login__form">
                <h2>Gestiona tus proveedores fácil y rápido</h2>
                <form onSubmit={handleSubmit}>

                    {/* CAMPO CORREO ELECTRONICO */}
                    <div className="login__email">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input type="email" id="email" placeholder="Ingrese su correo electrónico" 
                        value={email}
                        onChange={(e) => setEmail((e.target as HTMLInputElement).value)}/>
                        {errors.email && (
                            <div className='error'>
                                {errors.email}
                            </div>
                        )}
                    </div>

                    {/* CAMPO CONTRASEÑA CON MOSTRAR / OCULTAR */}
                    <div className="login__password">
                        <label htmlFor="password">Contraseña</label>
                        <div className="password--hidden">
                            <input type={hide ? 'password' : 'text'} id="password" placeholder="Ingrese su contraseña"
                            value={password}
                            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}/>
                            <div className="password--eye" onClick={() => setHide(!hide)}>
                                {hide ? <FaEye /> : <FaEyeSlash />}
                            </div>
                        </div>
                        {errors.password && (
                            <div className='error'>
                                {errors.password}
                            </div>
                        )}        
                    </div>

                    {/* MENSAJE GENERAL DE ERROR DE AUTENTICACIÓN */}
                    {advice && (
                        <div className='error'>
                            {advice}
                        </div>
                    )}

                    <button className="login__button">
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>   
    </div>
  )
}
