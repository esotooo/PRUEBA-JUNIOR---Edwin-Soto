import pool from '../db/connection'
import {  ResultSetHeader, RowDataPacket } from "mysql2/promise"
import { Router } from 'express'
import verifyToken from '../middlewares/verifyToken'

const router = Router()

//API's TIPOS DE PROVEEDORES

//Visualización de los tipos de proveedores
router.post('/supplier-type', verifyToken, async(req, res) => {
    try{
        const query = 'SELECT id_type, supplier_type FROM suppliers_type'
        const [type] = await pool.query<RowDataPacket[]>(query)
        if(type.length > 0){
            res.status(200).json(type)
        }else{
            res.status(404).json({message: 'No records were found.'})
        }
    }catch(error){
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
})


//Buscar por tipo de proveedor