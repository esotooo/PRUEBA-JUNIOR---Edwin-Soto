import * as jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1] // Espera formato "Bearer <token>"

    if(!token){
        return res.status(403).json({message: 'Acceso denegado: no se ha proporcionado un token válido.'})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(401).json({message: 'El token es inválido o ha expirado. Por favor, inicia sesión nuevamente.'})
        }

        req.user = decoded
        next()
    } )
}

export default verifyToken