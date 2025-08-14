import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Extendemos la interfaz Request para agregar `user`
interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload
}

// Middleware para proteger rutas y validar JWT
const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]

    // Si no se proporciona token, se deniega el acceso
    if (!token) {
        return res.status(403).json({
        message: 'Acceso denegado: no se ha proporcionado un token válido.',
        })
    }

    // Verifica la validez del token usando la clave secreta
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET no está definido en las variables de entorno')
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            // Token inválido o expirado
        return res.status(401).json({
            message: 'El token es inválido o ha expirado. Por favor, inicia sesión nuevamente.',
        })
        }

        // Guardamos los datos decodificados en req.user
        req.user = decoded
        next()
    })
}

export default verifyToken
