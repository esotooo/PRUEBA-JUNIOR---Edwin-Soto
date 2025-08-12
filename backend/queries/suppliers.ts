import pool from '../db/connection'
import {  ResultSetHeader, RowDataPacket } from "mysql2/promise"
import { Router } from 'express'
import verifyToken from '../middlewares/verifyToken'

const router = Router()

//API's PROVEEDORES

//Visualizacion de proveedores con datos especificos para visualizacion general
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
        res.status(500).json({ message: 'Server error' })
    }
})

//Agregar proveedores a la base de datos
router.post('/add-supplier', verifyToken, async(req, res) => {
    try{
        const {company_name, contact_person, email,  id_type, NIT, phone, city, created_at} = req.body

        const query = 'INSERT INTO suppliers(company_name, contact_person, email, id_type, NIT, phone, city, created_at) '+
        'VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
        const [supplier] = await pool.query<ResultSetHeader>(query, [
            company_name, contact_person, email, id_type, NIT, phone, city, created_at
        ])

        if(supplier.affectedRows > 0){
            const newSupplier = {
                id_supplier: supplier.insertId,
                company_name: company_name,
                contact_person: contact_person,
                email: email,
                id_type: id_type,
                NIT: NIT,
                phone: phone,
                city: city,
                created_at: created_at
            }
            res.status(200).json(newSupplier)
        }else{
            res.status(401).json({message: 'No records were found.'})
        }
    }catch(error){
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
})

//Actualizar proveedor tomando su ID
router.put('/edit-supplier/:id', verifyToken, async (req, res) => {
    try{
        const{id} = req.params
        const {company_name, contact_person, email, id_type, NIT, phone, city} = req.body

        const query = 'UPDATE suppliers '+
        'SET company_name = ?, contact_person = ?, email = ?, id_type = ?, NIT = ?, phone = ?, city = ? '+
        'WHERE id_supplier = ?'

        const [supplier] = await pool.query<ResultSetHeader>(query, [
            company_name, 
            contact_person, 
            email, 
            id_type, 
            NIT, 
            phone, 
            city,
            id
        ])

        if(supplier.affectedRows > 0){
            res.status(200).json({message: 'Supplier updated successfully'})
        }else{
            res.status(404).json({message: 'Supplier not found'})
        }
    }catch(error){
        console.error(error)
        res.status(500).json({message: 'Server error'})
    }
})

//Eliminar proveedor tomando su id
router.delete('/delete-supplier/:id', verifyToken, async(req, res) => {
    try{
        const {id} = req.params

        const query = 'DELETE FROM suppliers WHERE id_supplier = ?'

        const [supplier] = await pool.query<ResultSetHeader>(query, [id])

        if(supplier.affectedRows > 0){
            res.status(200).json({ message: 'Supplier deleted successfully' })
        }else{
            res.status(404).json({ message: 'Supplier not found' })
        }
    }catch(error){
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
})

//Filtrar proveedores por nombre
router.get('/suppliers/search-by-name', verifyToken, async(req, res) => {
    try{
        const {company_name} = req.query

        if(!company_name){
            return res.status(400).json({ message: 'Company name is required' })
        }

        const query = `
        SELECT s.*, t.supplier_type 
        FROM suppliers s
        INNER JOIN suppliers_type t ON s.id_type = t.id_type
        WHERE s.company_name LIKE ?
        `

        const [results] = await pool.query<RowDataPacket[]>(query, [`%${company_name}%`])

        if(results.length > 0){
            res.status(200).json(results)
        }else{
            res.status(404).json({ message: 'No records found.' })
        }
    }catch(error){
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
})

//Filtrar proveedores por tipo
router.get('/suppliers/search-by-type', verifyToken, async (req, res) => {
    try{
        const {id_type} = req.query

        if(!id_type){
            return res.status(400).json({ message: 'Supplier type id is required' })
        }

        const query = `
        SELECT s.*, t.supplier_type 
        FROM suppliers s
        INNER JOIN suppliers_type t ON s.id_type = t.id_type
        WHERE s.id_type = ?
        `

        const [results] = await pool.query<RowDataPacket[]>(query, [id_type])

        if(results.length > 0){
            res.status(200).json(results)
        }else{
            res.status(404).json({ message: 'No records found.' })
        }

    }catch(error){
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
})

export default router