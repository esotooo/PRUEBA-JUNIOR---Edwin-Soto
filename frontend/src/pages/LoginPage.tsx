import { useNavigate } from "react-router-dom"

export default function LoginPage() {

    const navigate = useNavigate()

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        navigate('/main')
    }



  return (
    <>
        <div className="login">
            <h1 className="">Bienvenido!</h1>
            <div className="">
                <p>Inicio de Sesión</p>
                <div>
                    <form action="" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="">Correo Electrónico</label>
                            <input type="email" />
                        </div>
                        <div>
                            <label htmlFor="">Contraseña</label>
                            <div>
                                <input type="password" />
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
