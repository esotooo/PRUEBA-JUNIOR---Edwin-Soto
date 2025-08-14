import * as jwt from 'jsonwebtoken'

// Middleware para proteger rutas y validar JWT
const verifyToken = (req, res, next) => {
    // Extrae el token del encabezado Authorization (formato "Bearer <token>")
    const token = req.headers['authorization']?.split(' ')[1] 
    
    // Si no se proporciona token, se deniega el acceso
    if(!token){
        return res.status(403).json({message: 'Acceso denegado: no se ha proporcionado un token válido.'})
    }

    // Verifica la validez del token usando la clave secreta
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            // Token inválido o expirado
            return res.status(401).json({message: 'El token es inválido o ha expirado. Por favor, inicia sesión nuevamente.'})
        }
        
        // Almacena los datos decodificados en la request para usarlos en la ruta
        req.user = decoded
        next()
    } )
}

export default verifyToken