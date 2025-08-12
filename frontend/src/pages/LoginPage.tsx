import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaEye } from "react-icons/fa"
import { FaEyeSlash } from "react-icons/fa"
import axios from 'axios'
import { useAuth } from "../context/AuthContext"

export default function LoginPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hide, setHide] = useState(true)
    const [errors, setErrors] = useState<{email?: string, password?: string}>({})
    const [errorAnim, setErrorAnim] = useState<{ email?: string; password?: string }>({});
    const [advice, setAdvice] = useState('')
    const [adviceAnim, setAdviceAnim] = useState('')

    const { admin, setAdmin } = useAuth()

    const navigate = useNavigate()

    // Función para mostrar mensaje con animación temporal
    const showAnimatedMessage = (
        setMsg: React.Dispatch<React.SetStateAction<any>>,
        setAnim: React.Dispatch<React.SetStateAction<any>>,
        msgValue: any,
        fadeInClass = 'animate__animated animate__fadeIn',
        fadeOutClass = 'animate__animated animate__fadeOut',
        duration = 2000
    ) => {
        setMsg(msgValue)
        setAnim(fadeInClass)

        setTimeout(() => setAnim(fadeOutClass), duration)
        setTimeout(() => {
            setMsg(typeof msgValue === 'object' ? {} : '')
            setAnim(typeof msgValue === 'object' ? {} : '')
        }, duration + 1000)
    }

    //Funcion para iniciar sesión
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newErrors: typeof errors = {}

        if(email.trim() === '') newErrors.email = 'Ingrese el correo electrónico'
        if(password.trim() === '') newErrors.password = 'Ingrese la contraseña'

        setErrors(newErrors)

        if(Object.keys(newErrors).length > 0 ){
            showAnimatedMessage(
                setErrors,
                setErrorAnim,
                {
                    email: newErrors.email ? 'Ingrese el correo electrónico' : '',
                    password: newErrors.password ? 'Ingrese la contraseña' : ''
                }
            )            
            //En caso los inputs no se encuentre llenos, detenemos el codigo posterior
            return
        }

        try{
            setAdvice('')
            const res = await axios.post('http://localhost:4000/api/login', {email, password})
            if(res.status === 200){
                const {token} = res.data
                setAdmin({token})
                navigate('/main', {replace: true})
            }
        }catch{
            showAnimatedMessage(
                setAdvice,
                setAdviceAnim,
                'El correo y/o contraseña son incorrectos. Por favor intente de nuevo.'
            )
        }
    }

    //Proteger rutas en caso el usuario no este loggeado aun
    useEffect(() => {
        if(admin){
            navigate('/main')
        }else{
            navigate('/login', {replace: true})
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
                                <div className={`error ${errorAnim.email || ''}`}>
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
                                <div className={`error ${errorAnim.password || ''}`}>
                                    {errors.password}
                                </div>
                            )}        
                        </div>

                        {/* Mensaje general de error */}
                        {advice && (
                            <div className={`error ${adviceAnim}`}>
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
