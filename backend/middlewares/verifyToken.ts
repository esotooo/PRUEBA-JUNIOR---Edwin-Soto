import * as jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1] // Espera formato "Bearer <token>"

    if(!token){
        return res.status(403).json({message: 'No token provided.'})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(401).json({message: 'Invalid or expired token'})
        }

        req.user = decoded
        next()
    } )
}

export default verifyToken