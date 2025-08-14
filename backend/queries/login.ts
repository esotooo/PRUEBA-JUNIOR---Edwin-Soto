import pool from '../db/connection'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt';
import { RowDataPacket } from "mysql2/promise";
import { Router } from 'express'

const router = Router()

//API para iniciar sesion en la aplicacion
router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body 

        //Busca el usuario por email y contraseña
        const query = 'SELECT id_user, email, pass FROM users WHERE email = ? '
        const [rows] = await pool.query<RowDataPacket[]>(query, [email])
        if(rows.length === 0){
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = rows[0]

        //Comparar contraseña hasheada 
        const isMatch = await bcrypt.compare(password, user.pass)
        if(!isMatch){
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        //Generar token JWT valido por 1 hora
        const token = jwt.sign(
            {id: user.id_user, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '10m'}
        )

        return res.status(200).json({
            message: 'Logged In Successfully',
            token
        })

    }catch(error){
        console.error(error)
        console.log('Something went wrong, please try again.')
    }
})



export default router