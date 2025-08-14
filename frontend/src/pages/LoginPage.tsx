import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaEye } from "react-icons/fa"
import { FaEyeSlash } from "react-icons/fa"
import axios from 'axios'
import { useAuth } from "../hooks/useAuth"

export default function LoginPage() {

    const [hide, setHide] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<{email?: string, password?: string}>({})
    const [advice, setAdvice] = useState('')
    
    const { admin, setAdmin } = useAuth()
    const navigate = useNavigate()
    
    // Función para iniciar sesión
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    
        const newErrors: typeof errors = {}
    
        if (email.trim() === '') newErrors.email = 'Ingrese el correo electrónico'
        if (password.trim() === '') newErrors.password = 'Ingrese la contraseña'
    
        setErrors(newErrors)
    
        if (Object.keys(newErrors).length > 0) {
            // Si hay errores, mostramos los mensajes
            return
        }
    
        try {
            setAdvice('')
            const res = await axios.post('http://localhost:4000/api/login', { email, password })
            if (res.status === 200) {
                const { token } = res.data
                setAdmin({ token })
                navigate('/main', { replace: true })
            }
        } catch {
            setAdvice('El correo y/o contraseña son incorrectos. Por favor intente de nuevo.')
        }
    }
    

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

                        {/* CAMPO CONTRASEÑA */}
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

                        {/* Mensaje general de error */}
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
