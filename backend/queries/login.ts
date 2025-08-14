import pool from '../db/connection'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt';
import { RowDataPacket } from "mysql2/promise";
import { Router } from 'express'
import { handleServerError } from '../helpers/serverError'
import { LoginQueries } from './queriesSQL';
import { User } from '../types/types';


const router = Router();



router.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ success: false, message: 'Correo and contraseña son requeridos' });
        }

        const [rows] = await pool.query<User[]>(LoginQueries.login, [email]);
        if(rows.length === 0){
            return res.status(401).json({ success: false, message: 'Correo o contraseña invalida.' });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.pass);
        if(!isMatch){
            return res.status(401).json({ success: false, message: 'Correo o contraseña invalida.' });
        }

        const token = jwt.sign(
            { id: user.id_user, email: user.email, role: user.id_rol },
            process.env.JWT_SECRET || 'defaultsecret',
            { expiresIn: '10s' }
        );

        return res.status(200).json({
            success: true,
            message: 'Sesión iniciada exitosamente',
            token
        });

    }catch(error){
        handleServerError(res, error);
    }
});

export default router;
