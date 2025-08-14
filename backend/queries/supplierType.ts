import pool from '../db/connection'
import { RowDataPacket } from "mysql2/promise"
import { Router } from 'express'
import verifyToken from '../middlewares/verifyToken'
import { handleServerError } from '../helpers/serverError'
import { TypeQueries } from './queriesSQL'
import { SupplierType } from '../types/types'

const router = Router();

// Visualización de los tipos de proveedores
router.get('/supplier-type', verifyToken, async (req, res) => {
    try {
        const [types] = await pool.query<SupplierType[]>(TypeQueries.viewType);

        if (types.length > 0) {
            res.status(200).json({ success: true, data: types });
        } else {
            res.status(200).json({ success: false, data: [], message: 'No records found.' });
        }
    } catch (error) {
        handleServerError(res, error);
    }
});

export default router;
