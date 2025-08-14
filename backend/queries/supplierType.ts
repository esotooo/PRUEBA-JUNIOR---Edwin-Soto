import pool from '../db/connection'
import { Router } from 'express'
import verifyToken from '../middlewares/verifyToken'
import { handleServerError } from '../helpers/serverError'
import { TypeQueries } from './queriesSQL'
import { SupplierType } from '../types/types'

const router = Router();

// Ruta para obtener todos los tipos de proveedores
// Protegida mediante JWT (verifyToken)
router.get('/supplier-type', verifyToken, async (req, res) => {
    try {
        // Ejecutar consulta a la base de datos
        const [types] = await pool.query<SupplierType[]>(TypeQueries.viewType);
        
        // Devolver resultados si existen, o mensaje de no registros
        if (types.length > 0) {
            res.status(200).json({ success: true, data: types });
        } else {
            res.status(200).json({ success: false, data: [], message: 'No records found.' });
        }
    } catch (error) {
        // Manejo centralizado de errores de servidor (helpers/serverError)
        handleServerError(res, error);
    }
});

export default router;
