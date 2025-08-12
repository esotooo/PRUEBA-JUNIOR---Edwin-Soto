import pool from '../db/connection'
import {  RowDataPacket } from "mysql2/promise";
import { Router } from 'express'
import verifyToken from '../middlewares/verifyToken';

const router = Router()

router.post('/suppliers', verifyToken,  async(req, res) => {
    try{
        const query = 'SELECT s.id_supplier, s.company_name, s.contact_person, s.email, s.phone, ' +
            ' t.supplier_type AS supplier_type '+
            ' FROM suppliers s '+
            ' INNER JOIN suppliers_type t ON s.id_type = t.id_type;'
        const [suppliers] = await pool.query<RowDataPacket[]>(query)
        if(suppliers.length > 0){
            res.status(200).json(suppliers)
        }else{
            res.status(404).json({message: 'No records were found.'})
        }
    }
    catch(error){
        console.error(error)
        res.status(500).json({ message: 'Server error' });
    }
})

export default router