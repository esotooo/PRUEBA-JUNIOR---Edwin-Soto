import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export default function LoginPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
    <>
        <div className="login">
            <h1 className="">Bienvenido!</h1>
            <div className="">
                <p>Inicio de Sesión</p>
                <div>
                    <form action="" onSubmit={handleSubmit}>

                        {/* CAMPO CORREO ELECTRONICO */}
                        <div>
                            <label htmlFor="email">Correo Electrónico</label>
                            <input type="email" id="email" placeholder="Ingrese su correo electrónico" 
                            value={email}
                            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}/>
                        </div>

                        {/* CAMPO CONTRASEÑA */}
                        <div>
                            <label htmlFor="password">Contraseña</label>
                            <div>
                                <input type="text" id="password" placeholder="Ingrese su contraseña"
                                value={password}
                                onChange={(e) => setPassword((e.target as HTMLInputElement).value)}/>
                            </div>
                        </div>

                        <button >
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
            </div>
        </div>   
    </>
  )
}
