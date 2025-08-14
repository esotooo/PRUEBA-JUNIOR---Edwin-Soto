import pool from '../db/connection'
import {  ResultSetHeader, RowDataPacket } from "mysql2/promise"
import { Router } from 'express'
import verifyToken from '../middlewares/verifyToken'
import { SupplierQueries } from './queriesSQL'
import { handleServerError } from '../helpers/serverError'
import { Supplier } from '../types/types'

const router = Router()


//API's PROVEEDORES
//Visualizacion de proveedores con datos especificos para visualizacion general
router.get('/suppliers', verifyToken, async (req, res) => {
    try {
      const [suppliers] = await pool.query<Supplier[]>(SupplierQueries.view)
      if (suppliers.length > 0) {
        res.status(200).json({ success: true, data: suppliers })
      } else {
        res.status(200).json({ success: false, data: [], message: 'No suppliers found.' })
      }
    } catch (error) {
        handleServerError(res, error)
    }
  })
  

//Agregar proveedores a la base de datos
router.post('/add-supplier', verifyToken, async(req, res) => {
    try{
        const {company_name, contact_person, email,  id_type, NIT, phone, city, created_at} = req.body


        const [supplier] = await pool.query<ResultSetHeader>(SupplierQueries.add, [
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
            res.status(200).json({success: true, data: newSupplier})
        }else{
            res.status(200).json({success: false, data: [], message: 'Supplier was not added.'})
        }
    }catch(error){
        handleServerError(res, error)
    }
})

//Actualizar proveedor tomando su ID
router.put('/edit-supplier/:id', verifyToken, async (req, res) => {
    try{
        const{id} = req.params
        const {company_name, contact_person, email, id_type, NIT, phone, city} = req.body

        const [supplier] = await pool.query<ResultSetHeader>(SupplierQueries.update, [
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
            res.status(200).json({success: true, message: 'Supplier updated successfully'})
        }else{
            res.status(200).json({success: false, message: 'Supplier not found'})
        }
    }catch(error){
        handleServerError(res, error)
    }
})

//Eliminar proveedor tomando su id
router.delete('/delete-supplier/:id', verifyToken, async(req, res) => {
    try{
        const {id} = req.params

        const [supplier] = await pool.query<ResultSetHeader>(SupplierQueries.delete, [id])

        if(supplier.affectedRows > 0){
            res.status(200).json({success: true, message: 'Supplier deleted successfully' })
        }else{
            res.status(200).json({success: false, message: 'Supplier not found' })
        }
    }catch(error){
        handleServerError(res, error)
    }
})

//Filtrar proveedores por nombre
router.get('/suppliers/search-by-name', verifyToken, async(req, res) => {
    try{
        const {company_name} = req.query

        if(!company_name){
            return res.status(400).json({success: false, data: [], message: 'Company name is required' })
        }

        const [results] = await pool.query<Supplier[]>(SupplierQueries.searchByName, [`%${company_name}%`])

        if(results.length > 0){
            res.status(200).json({success: true, data: results})
        }else{
            res.status(200).json({success: false, data: [], message: 'No records found.' })
        }
    }catch(error){
        handleServerError(res, error)
    }
})

//Filtrar proveedores por tipo
router.get('/suppliers/search-by-type', verifyToken, async (req, res) => {
    try{
        const {id_type} = req.query

        if(!id_type){
            return res.status(400).json({success: true, data: [], message: 'Supplier type is required' })
        }

        const [results] = await pool.query<Supplier[]>(SupplierQueries.searchByType, [id_type])

        if(results.length > 0){
            res.status(200).json({success: true, data: results})
        }else{
            res.status(200).json({ success: false, data: [], message: 'No records found.' })
        }

    }catch(error){
        handleServerError(res, error)
    }
})

export default router