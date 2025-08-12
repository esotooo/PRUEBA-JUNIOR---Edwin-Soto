import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaEye } from "react-icons/fa"
import { FaEyeSlash } from "react-icons/fa"

import axios from 'axios'

export default function LoginPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hide, setHide] = useState(true)

    const navigate = useNavigate()

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(email.trim() === '' || password.trim() === ''){
            return
        }

        try{
            const res = await axios.post('http://localhost:4000/api/login', {email, password})
            if(res.status === 200){
                console.log(res.data)
                navigate('/main', {replace: true})
            }
        }catch(error){
            console.log(error)
        }
    }


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
                        </div>

                        <button className="login__button">
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
        </div>   
    </div>
  )
}
