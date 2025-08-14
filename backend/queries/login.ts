import pool from '../db/connection'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { Router } from 'express'
import { handleServerError } from '../helpers/serverError'
import { LoginQueries } from './queriesSQL'
import { User } from '../types/types'

const router = Router()

// Ruta POST para login de usuarios
router.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body

        // Validación básica: email y password son requeridos
        if(!email || !password){
            return res.status(400).json({ success: false, message: 'Correo and contraseña son requeridos' })
        }

        // Consulta a la base de datos para obtener el usuario por email
        const [rows] = await pool.query<User[]>(LoginQueries.login, [email])
        if(rows.length === 0){
            // Si no existe el usuario, retornamos error 401
            return res.status(401).json({ success: false, message: 'Correo o contraseña invalida.' })
        }

        const user = rows[0]

        // Comparamos la contraseña enviada con la contraseña hasheada en la DB
        const isMatch = await bcrypt.compare(password, user.pass)
        if(!isMatch){
            // Si no coinciden, retornamos error 401
            return res.status(401).json({ success: false, message: 'Correo o contraseña invalida.' })
        }

        // Generamos el JWT con id, email y rol del usuario
        // Se usa una clave secreta desde .env, si no, usamos 'defaultsecret'
        // El token expira en 1 hora
        const token = jwt.sign(
            { id: user.id_user, email: user.email, role: user.id_rol },
            process.env.JWT_SECRET || 'defaultsecret',
            { expiresIn: '1h' } //Nota: el token expira en 1 hora. El frontend debe validar expiración y redirigir si es necesario.
        )

        // Retornamos éxito y el token al frontend
        return res.status(200).json({
            success: true,
            message: 'Sesión iniciada exitosamente',
            token
        })

    }catch(error){
        // Manejo global de errores de servidor
        handleServerError(res, error)
    }
})

export default router
